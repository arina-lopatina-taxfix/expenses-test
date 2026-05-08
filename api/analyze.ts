import type { AnalysisInput, AnalysisResponse } from '../src/shared/analysis';

export const config = { runtime: 'edge' };

const MODEL =
  process.env.GEMINI_MODEL || 'gemini-2.0-flash';

const RESPONSE_SCHEMA = {
  type: 'object',
  properties: {
    totalAdditionalSavings: {
      type: 'string',
      description:
        'A formatted GBP amount such as "£6,034" representing the additional tax-deductible amount the user could plausibly claim.',
    },
    profile: {
      type: 'object',
      properties: {
        name: { type: 'string' },
        role: {
          type: 'string',
          description:
            'A short uppercase role label, e.g. "SELF-EMPLOYED" or "LANDLORD" or "SELF-EMPLOYED LANDLORD".',
        },
        chips: {
          type: 'array',
          items: { type: 'string' },
          description:
            'Up to 5 short tag strings summarising the user (annual income, sector, life events).',
        },
      },
      required: ['name', 'role', 'chips'],
    },
    alreadyExpensing: {
      type: 'array',
      description:
        'The expense categories the user has already selected, with a plausible amount and brief advice.',
      items: {
        type: 'object',
        properties: {
          emoji: { type: 'string' },
          title: { type: 'string' },
          amount: { type: 'string' },
          advice: { type: 'string' },
        },
        required: ['emoji', 'title', 'amount', 'advice'],
      },
    },
    improvements: {
      type: 'array',
      description:
        'Categories or specific deductibles the user has NOT selected yet but likely could claim.',
      items: {
        type: 'object',
        properties: {
          emoji: { type: 'string' },
          title: { type: 'string' },
          description: { type: 'string' },
          advice: { type: 'string' },
          deductibles: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                label: { type: 'string' },
                amount: { type: 'string' },
              },
              required: ['label', 'amount'],
            },
          },
        },
        required: ['emoji', 'title', 'description', 'advice', 'deductibles'],
      },
    },
  },
  required: ['totalAdditionalSavings', 'profile', 'alreadyExpensing', 'improvements'],
};

function buildPrompt(input: AnalysisInput): string {
  return `You are a UK self-assessment tax expert assisting Taxfix.

Given the user's questionnaire answers below, produce a personalised expense
analysis for the 2024/25 UK tax year. All numbers must be illustrative and
realistic for someone with the stated income and circumstances. Use British
pounds (£) with thousands separators.

Return JSON only, matching the supplied schema. Do not invent income types
the user did not select. Always include 2-4 entries in alreadyExpensing
(based on the categories they ticked) and 2-4 entries in improvements
(categories or specific deductibles they did NOT tick but plausibly could
claim). For improvements, include 3-5 deductibles each with realistic line
items and amounts.

User's answers:
${JSON.stringify(input, null, 2)}
`;
}

const FALLBACK = (input: AnalysisInput): AnalysisResponse => ({
  totalAdditionalSavings: '£1,200',
  profile: {
    name: input.firstName || 'You',
    role: input.incomes.includes('self-employment')
      ? 'SELF-EMPLOYED'
      : input.incomes.includes('rental')
        ? 'LANDLORD'
        : 'TAXPAYER',
    chips: [
      input.businessNature?.slice(0, 24) || 'Self-employed',
      input.annualIncome ? `£${input.annualIncome}` : '£45,000',
    ].filter(Boolean),
  },
  alreadyExpensing: [],
  improvements: [],
});

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
