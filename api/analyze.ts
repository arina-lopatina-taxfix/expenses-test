import type {
  AnalysisInput,
  AnalysisResponse,
} from '../src/shared/analysis';
import {
  INCOME_SOURCE_LABELS,
  LANDLORD_CATEGORIES,
  PERSONAL_DETAIL_LABELS,
  SELF_EMPLOYED_CATEGORIES,
  resolveLandlordCategory,
  resolveSelfEmployedCategory,
} from '../src/shared/categories';

export const config = { runtime: 'edge' };

const MODEL = process.env.GEMINI_MODEL || 'gemini-2.0-flash';

const RESPONSE_SCHEMA = {
  type: 'object',
  properties: {
    totalAdditionalSavings: {
      type: 'string',
      description:
        'Formatted GBP amount such as "£6,034" representing the additional tax-deductible amount the user could plausibly claim, scaled to their stated annual income.',
    },
    profile: {
      type: 'object',
      properties: {
        name: {
          type: 'string',
          description:
            'The user-provided first name (use it verbatim). Fall back to "You" only if it is empty.',
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
            '2-5 short tags summarising the user. Always include the annual income (e.g. "£45,000"), the business nature if provided, and any personal details that affect tax (Married, Dependants, Student loan, Homeowner, Renter).',
        },
      },
      required: ['name', 'role', 'chips'],
    },
    alreadyExpensing: {
      type: 'array',
      description:
        'One entry per category the user ticked on the expenses screen. Use the exact emoji and title supplied for that category. Do NOT include any amount or numbers - only emoji, title and a short, specific piece of advice tailored to the user.',
      items: {
        type: 'object',
        properties: {
          emoji: { type: 'string' },
          title: { type: 'string' },
          advice: {
            type: 'string',
            description:
              'One or two sentences of concrete UK self-assessment advice for this category given the user\'s situation (income level, business nature, life events). Never write "Lorem ipsum" or filler text.',
          },
        },
        required: ['emoji', 'title', 'advice'],
      },
    },
    improvements: {
      type: 'array',
      description:
        '2-4 categories or specific deductibles the user did NOT tick but plausibly could claim given their answers. Each must have a real, specific advice paragraph and 3-5 example deductibles with realistic GBP amounts.',
      items: {
        type: 'object',
        properties: {
          emoji: { type: 'string' },
          title: { type: 'string' },
          description: { type: 'string' },
          advice: {
            type: 'string',
            description:
              'One or two sentences of concrete UK self-assessment advice. Never "Lorem ipsum" or filler.',
          },
          deductibles: {
            type: 'array',
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
        required: ['emoji', 'title', 'description', 'advice', 'deductibles'],
      },
    },
  },
  required: [
    'totalAdditionalSavings',
    'profile',
    'alreadyExpensing',
    'improvements',
  ],
};

function resolveContext(input: AnalysisInput) {
  const incomeLabels = input.incomes.map(
    (id) => INCOME_SOURCE_LABELS[id] ?? id,
  );

  const isSelfEmployed = input.incomes.includes('self-employment');
  const isLandlord = input.incomes.includes('rental');

  const expensesAlreadyTicked = [
    ...(isSelfEmployed
      ? input.selfEmployedExpenses.map(resolveSelfEmployedCategory)
      : []),
    ...(isLandlord
      ? input.landlordExpenses.map(resolveLandlordCategory)
      : []),
  ].filter((c): c is NonNullable<typeof c> => Boolean(c));

  const expensesNotTicked = (
    isSelfEmployed
      ? SELF_EMPLOYED_CATEGORIES.filter(
          (c) => !input.selfEmployedExpenses.includes(c.id),
        )
      : []
  ).concat(
    isLandlord
      ? LANDLORD_CATEGORIES.filter(
          (c) => !input.landlordExpenses.includes(c.id),
        )
      : [],
  );

  const personalDetailLabels = input.personalDetails
    .map((id) => PERSONAL_DETAIL_LABELS[id] ?? id)
    .join(', ');

  return {
    isSelfEmployed,
    isLandlord,
    incomeLabels,
    expensesAlreadyTicked,
    expensesNotTicked,
    personalDetailLabels,
  };
}

function buildPrompt(input: AnalysisInput): string {
  const ctx = resolveContext(input);

  return `You are a UK self-assessment tax expert assisting Taxfix.

The user has just completed a short questionnaire. Produce a personalised
expense analysis for the 2024/25 UK tax year that reflects ONLY the answers
below.

Critical rules:
- profile.name MUST be exactly "${input.firstName || 'You'}".
- profile.role MUST reflect the income types they selected: ${ctx.incomeLabels.join(', ') || 'none'}.
- profile.chips should include the income (£${input.annualIncome || 'unspecified'}) and any of these life events that apply: ${ctx.personalDetailLabels || 'none'}. If they entered a business nature ("${input.businessNature || ''}"), include a 1-2 word industry chip from it.
- alreadyExpensing MUST contain exactly one entry per category the user ticked. There are ${ctx.expensesAlreadyTicked.length} such categories: ${ctx.expensesAlreadyTicked.map((c) => `${c.emoji} ${c.title}`).join(', ') || 'none'}. Use the supplied emoji and title verbatim. Do NOT invent extra entries. Do NOT include any amount or numbers in this section.
- improvements should suggest 2-4 categories the user did NOT tick but plausibly could claim, drawn from this list: ${ctx.expensesNotTicked.map((c) => `${c.emoji} ${c.title}`).join(', ') || '(no untouched categories)'}. Use the supplied emoji and title verbatim.
- Every "advice" string must be specific, helpful, and grounded in the user's circumstances. NEVER write "Lorem ipsum", placeholders, or generic filler.
- All monetary amounts must be plausible relative to their stated annual income of £${input.annualIncome || 'unknown'}.

Raw answers JSON:
${JSON.stringify(input, null, 2)}

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
        ...input.personalDetails.map(
          (id) => PERSONAL_DETAIL_LABELS[id] ?? id,
        ),
      ].filter(Boolean),
    },
    alreadyExpensing: ctx.expensesAlreadyTicked.map((c) => ({
      emoji: c.emoji,
      title: c.title,
      advice:
        'We could not reach the AI advisor — try refreshing for personalised guidance.',
    })),
    improvements: [],
  };
};

export default async function handler(req: Request): Promise<Response> {
  if (req.method !== 'POST') {
    return Response.json({ error: 'Method not allowed' }, { status: 405 });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return Response.json(
      { error: 'GEMINI_API_KEY is not configured on the server.' },
      { status: 500 },
    );
  }

  let input: AnalysisInput;
  try {
    input = (await req.json()) as AnalysisInput;
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
