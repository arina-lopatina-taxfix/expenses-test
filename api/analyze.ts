import type {
  AnalysisInput,
  AnalysisResponse,
} from '../src/shared/analysis';
import {
  INCOME_SOURCE_LABELS,
  LANDLORD_CATEGORIES,
  PERSONAL_DETAIL_CATEGORIES,
  PERSONAL_DETAIL_LABELS,
  SELF_EMPLOYED_CATEGORIES,
} from '../src/shared/categories';

export const config = { runtime: 'edge' };

const ALLOWED_ORIGINS = [
  'https://expenses-test.vercel.app',
  'https://taxfix.com',
  'https://www.taxfix.com',
];

const MAX_BODY_SIZE = 50_000; // ~50 KB

function isAllowedOrigin(origin: string | null): boolean {
  if (!origin) return false;
  // Allow any localhost port for local development
  if (/^https?:\/\/localhost(:\d+)?$/.test(origin)) return true;
  // Allow all Vercel preview deployments for this project
  if (/^https:\/\/expenses-test[a-z0-9-]*\.vercel\.app$/.test(origin)) return true;
  return ALLOWED_ORIGINS.some((allowed) => origin.startsWith(allowed));
}

function isValidInput(body: unknown): body is AnalysisInput {
  if (!body || typeof body !== 'object') return false;
  const b = body as Record<string, unknown>;
  if (!Array.isArray(b.incomes)) return false;
  if (typeof b.annualIncome !== 'string' && b.annualIncome !== undefined) return false;
  if (!Array.isArray(b.selfEmployedExpenses)) return false;
  if (!Array.isArray(b.landlordExpenses)) return false;
  if (!Array.isArray(b.personalDetails)) return false;
  return true;
}

const MODEL = process.env.GEMINI_MODEL || 'gemini-2.0-flash';

const RESPONSE_SCHEMA = {
  type: 'object',
  properties: {
    totalAdditionalSavings: {
      type: 'string',
      description:
        'Formatted GBP amount such as "£6,034" representing the maximum plausible tax-deductible amount across all selected categories, scaled to the stated annual income.',
    },
    profile: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description:
            'The user-provided first name (verbatim). Fall back to "You" only if empty.',
        },
        role: {
          type: 'string',
          description:
            'Short uppercase role label, e.g. "SELF-EMPLOYED", "LANDLORD", or "SELF-EMPLOYED LANDLORD".',
        },
        chips: {
          type: 'array',
          items: { type: 'string' },
          description:
            '2-5 short tags summarising the user. Always include the annual income (e.g. "£45,000"), business nature if provided, and any personal details that affect tax (Married, Dependants, Student loan, Homeowner, Renter).',
        },
      },
      required: ['name', 'role', 'chips'],
    },
    improvements: {
      type: 'array',
      description:
        'One entry per selected expense category the user is eligible for. Omit categories where the user is clearly ineligible (e.g. income too high, replaced benefit). Each entry must use the exact categoryId, emoji and title supplied.',
      items: {
        type: 'object',
        properties: {
          categoryId: {
            type: 'string',
            description: 'The exact id string supplied for this category.',
          },
          emoji: { type: 'string' },
          title: { type: 'string' },
          description: {
            type: 'string',
            description:
              '1-2 sentences describing what this expense category covers for UK self-assessment.',
          },
          advice: {
            type: 'string',
            description:
              'Specific, actionable UK self-assessment advice tailored to this user\'s income level, business nature, and personal situation. Never write "Lorem ipsum" or filler.',
          },
          deductibles: {
            type: 'array',
            description: '3-5 example items claimable in this category with realistic GBP amounts.',
            items: {
              type: 'object',
              properties: {
                label: { type: 'string' },
                amount: {
                  type: 'string',
                  description: 'Formatted GBP amount, e.g. "~£45".',
                },
              },
              required: ['label', 'amount'],
            },
          },
        },
        required: ['categoryId', 'emoji', 'title', 'description', 'advice', 'deductibles'],
      },
    },
  },
  required: ['totalAdditionalSavings', 'profile', 'improvements'],
};

function resolveContext(input: AnalysisInput) {
  const incomeLabels = input.incomes.map((id) => INCOME_SOURCE_LABELS[id] ?? id);
  const isSelfEmployed = input.incomes.includes('self-employment');
  const isLandlord = input.incomes.includes('rental');

  const selectedCategories = [
    ...(isSelfEmployed
      ? input.selfEmployedExpenses
          .map((id) => SELF_EMPLOYED_CATEGORIES.find((c) => c.id === id))
          .filter((c): c is NonNullable<typeof c> => Boolean(c))
      : []),
    ...(isLandlord
      ? input.landlordExpenses
          .map((id) => LANDLORD_CATEGORIES.find((c) => c.id === id))
          .filter((c): c is NonNullable<typeof c> => Boolean(c))
      : []),
    ...input.personalDetails.flatMap((id) => PERSONAL_DETAIL_CATEGORIES[id] ?? []),
  ];

  const personalDetailLabels = input.personalDetails
    .map((id) => PERSONAL_DETAIL_LABELS[id] ?? id)
    .join(', ');

  return { isSelfEmployed, isLandlord, incomeLabels, selectedCategories, personalDetailLabels };
}

function buildPrompt(input: AnalysisInput): string {
  const ctx = resolveContext(input);

  const categoryList = ctx.selectedCategories
    .map((c) => `  - categoryId: "${c.id}", emoji: ${c.emoji}, title: "${c.title}"`)
    .join('\n');

  return `You are a UK self-assessment tax expert assisting Taxfix.

The user has just completed a short questionnaire. Produce a personalised
expense analysis for the 2024/25 UK tax year.

Critical rules:
- profile.name MUST be exactly "${input.firstName || 'You'}".
- profile.role MUST reflect their income types: ${ctx.incomeLabels.join(', ') || 'none'}.
- profile.chips must include the annual income (£${input.annualIncome || 'unspecified'})${ctx.personalDetailLabels ? `, life events (${ctx.personalDetailLabels})` : ''}${input.businessNature ? `, and a 1-2 word industry chip from "${input.businessNature}"` : ''}.
- improvements MUST contain one entry per selected expense category the user is plausibly ELIGIBLE for.
  If the user is clearly ineligible for a category given their income/situation (e.g. Working Tax Credit is replaced by Universal Credit for most earners; high earners are ineligible for certain credits), OMIT that category entirely — do NOT return a £0 entry for it.
  For each included entry use the exact categoryId, emoji and title supplied; do NOT alter them.
  Write a real description, specific advice, and 3-5 deductible examples.
  Deductible amounts MUST be realistic for someone earning £${input.annualIncome || 'unknown'}/year with the business nature "${input.businessNature || 'general'}".
  Use specific pound figures a real accountant would quote (e.g. "~£1,200" not "~£45" for mortgage interest on a £25k income).
  NEVER write "Lorem ipsum" or placeholder text.

Selected expense categories (${ctx.selectedCategories.length}):
${categoryList || '  (none selected)'}

User context:
- Annual income: £${input.annualIncome || 'unspecified'}
- Business nature: ${input.businessNature || 'n/a'}
- Personal details: ${ctx.personalDetailLabels || 'none'}

Return JSON only, exactly matching the supplied schema.`;
}

const FALLBACK = (input: AnalysisInput): AnalysisResponse => {
  const ctx = resolveContext(input);
  return {
    totalAdditionalSavings: '—',
    profile: {
      name: input.firstName || 'You',
      role:
        ctx.isSelfEmployed && ctx.isLandlord
          ? 'SELF-EMPLOYED LANDLORD'
          : ctx.isSelfEmployed
            ? 'SELF-EMPLOYED'
            : ctx.isLandlord
              ? 'LANDLORD'
              : 'TAXPAYER',
      chips: [
        input.annualIncome ? `£${input.annualIncome}` : '',
        input.businessNature?.slice(0, 24) ?? '',
        ...input.personalDetails.map((id) => PERSONAL_DETAIL_LABELS[id] ?? id),
      ].filter(Boolean),
    },
    improvements: ctx.selectedCategories.map((c) => ({
      categoryId: c.id,
      emoji: c.emoji,
      title: c.title,
      description: '',
      advice: 'We could not reach the AI advisor — try refreshing for personalised guidance.',
      deductibles: [],
    })),
  };
};

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return Response.json({ error: 'Method not allowed' }, { status: 405 });
  }

  const origin = req.headers.get('origin') ?? req.headers.get('referer');
  if (!isAllowedOrigin(origin)) {
    return Response.json({ error: 'Forbidden' }, { status: 403 });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: 'GEMINI_API_KEY is not configured on the server.' },
      { status: 500 },
    );
  }

  const rawBody = await req.text();
  if (rawBody.length > MAX_BODY_SIZE) {
    return Response.json({ error: 'Request body too large' }, { status: 413 });
  }

  let input: AnalysisInput;
  try {
    const parsed: unknown = JSON.parse(rawBody);
    if (!isValidInput(parsed)) {
      return Response.json({ error: 'Invalid request' }, { status: 400 });
    }
    input = parsed;
  } catch {
    return Response.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const url = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent?key=${apiKey}`;

  let geminiRes: globalThis.Response;
  try {
    geminiRes = await fetch(url, {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        contents: [{ role: 'user', parts: [{ text: buildPrompt(input) }] }],
        generationConfig: {
          responseMimeType: 'application/json',
          responseSchema: RESPONSE_SCHEMA,
          temperature: 0.6,
        },
      }),
    });
  } catch (err) {
    return Response.json(
      {
        error: 'Failed to reach Gemini API',
        detail: String(err),
        fallback: FALLBACK(input),
      },
      { status: 502 },
    );
  }

  if (!geminiRes.ok) {
    const text = await geminiRes.text();
    return Response.json(
      {
        error: `Gemini returned ${geminiRes.status}`,
        detail: text.slice(0, 500),
        fallback: FALLBACK(input),
      },
      { status: 502 },
    );
  }

  const payload = (await geminiRes.json()) as {
    candidates?: { content?: { parts?: { text?: string }[] } }[];
  };
  const text = payload.candidates?.[0]?.content?.parts?.[0]?.text ?? '';

  let parsed: AnalysisResponse;
  try {
    parsed = JSON.parse(text) as AnalysisResponse;
  } catch {
    return Response.json(
      {
        error: 'Gemini did not return valid JSON',
        raw: text.slice(0, 500),
        fallback: FALLBACK(input),
      },
      { status: 502 },
    );
  }

  return Response.json(parsed satisfies AnalysisResponse);
}
