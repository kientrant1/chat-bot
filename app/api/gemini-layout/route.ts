import { siteConfig } from '@/constants/siteConfig'
import { LayoutResponse } from '@/types/gemini'
import { NextRequest, NextResponse } from 'next/server'

const systemInstruction = `
Bạn là một engine layout cho AG-UI.
Hãy TRẢ VỀ DUY NHẤT JSON (không text giải thích, không markdown, không code fences).

Schema:
{
  "widgets": [
    {
      "id": "string",
      "type": "dashboard" | "table" | "chart" | "panel",
      "title": "string",
      "description": "string",
      "kpis": [
        { "label": "string", "value": "string" }
      ],
      "rows": [
        { "id": "string", "status": "string", "owner": "string" }
      ]
    }
  ]
}

Nếu user không nói gì rõ ràng, tạo ít nhất 1 "panel" generic.
Nếu user nhắc "dashboard" → tạo widget type "dashboard" + kpis.
Nếu user nhắc "tickets" hoặc "tasks" → tạo widget type "table" + rows.
Nếu user nhắc "chart" hoặc "analytics" → tạo widget type "chart".
`
export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as { prompt?: string }
    const { prompt } = body || {}

    if (!prompt) {
      return NextResponse.json({ error: 'Missing prompt' }, { status: 400 })
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${siteConfig.geminiModelName}:generateContent?key=${siteConfig.gemini.apiKey}`

    if (!siteConfig.gemini.apiKey) {
      return NextResponse.json(
        { error: 'Missing GEMINI_API_KEY in env' },
        { status: 500 }
      )
    }

    const text = `${systemInstruction}\n\nUser prompt: """${prompt}"""`

    const resp = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text }],
          },
        ],
      }),
    })

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const data = (await resp.json()) as any

    if (!resp.ok) {
      console.error('Gemini error:', data)
      return NextResponse.json(
        { error: 'Gemini API error', details: data },
        { status: 500 }
      )
    }

    const textOut: string =
      data?.candidates?.[0]?.content?.parts?.[0]?.text || '{}'

    // strip ```json ... ```
    const cleaned = textOut
      .replace(/```json/g, '')
      .replace(/```/g, '')
      .trim()

    let layout: Partial<LayoutResponse> = {}
    try {
      layout = JSON.parse(cleaned) as LayoutResponse
    } catch (e) {
      console.error('JSON parse error:', e, 'raw:', cleaned)
      return NextResponse.json(
        {
          error: 'Failed to parse Gemini JSON',
          raw: cleaned,
        },
        { status: 500 }
      )
    }

    if (!Array.isArray(layout.widgets)) {
      layout.widgets = []
    }

    // đảm bảo có id cho mỗi widget
    layout.widgets = layout.widgets.map((w, idx) => ({
      ...w,
      id: w.id || `widget-${idx}`,
    }))

    return NextResponse.json(layout, { status: 200 })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.error(err)
    return NextResponse.json(
      { error: 'Server error', details: err?.message ?? 'Unknown error' },
      { status: 500 }
    )
  }
}
