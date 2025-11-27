/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextRequest, NextResponse } from 'next/server'
import { siteConfig } from '@/constants/siteConfig'
import logger from '@/utils/logger'

const system = `
Bạn là AI chuyên cập nhật UI dựa trên UI hiện tại.
- Input: JSON UI hiện tại + yêu cầu chỉnh sửa của user.
- Output: JSON mới với cùng schema: { "widgets": [...] }.
- KHÔNG giải thích, KHÔNG dùng markdown, KHÔNG dùng \`code fences\`.
`

export async function POST(req: NextRequest) {
  try {
    const { currentUI, userPrompt } = (await req.json()) as {
      currentUI?: any
      userPrompt?: string
    }

    if (!currentUI || !userPrompt) {
      return NextResponse.json(
        { error: 'Missing currentUI or userPrompt' },
        { status: 400 }
      )
    }

    if (!siteConfig.gemini.apiKey) {
      return NextResponse.json(
        { error: 'Missing GEMINI_API_KEY in env' },
        { status: 500 }
      )
    }

    const url = `https://generativelanguage.googleapis.com/v1beta/models/${siteConfig.geminiModelName}:generateContent?key=${siteConfig.gemini.apiKey}`

    const text = `
      ${system}

      UI hiện tại:
      ${JSON.stringify(currentUI, null, 2)}

      Yêu cầu của user:
      "${userPrompt}"
      `

    const resp = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{ parts: [{ text }] }],
      }),
    })

    const data = (await resp.json()) as any

    if (!resp.ok) {
      logger.error('Gemini update error:', data)
      return NextResponse.json(
        { error: 'Gemini update API error', details: data },
        { status: 500 }
      )
    }

    let textOut: string =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ?? '{}'

    // strip ```json ... ```
    textOut = textOut
      .replace(/```json/g, '')
      .replace(/```/g, '')
      .trim()

    let ui: any
    try {
      ui = JSON.parse(textOut)
    } catch (e) {
      logger.error(`JSON parse error (update): ${e}, raw: ${textOut}`)
      return NextResponse.json(
        { error: 'Failed to parse Gemini JSON', raw: textOut },
        { status: 500 }
      )
    }

    // đảm bảo vẫn trả về dạng { widgets: [...] }
    if (!ui.widgets || !Array.isArray(ui.widgets)) {
      ui.widgets = []
    }

    // fallback id cho widget nếu thiếu
    ui.widgets = ui.widgets.map((w: any, idx: number) => ({
      id: w.id || `widget-updated-${idx}`,
      ...w,
    }))

    return NextResponse.json(ui, { status: 200 })
  } catch (err: any) {
    logger.error(err)
    return NextResponse.json(
      { error: 'Server error', details: err?.message ?? 'Unknown error' },
      { status: 500 }
    )
  }
}
