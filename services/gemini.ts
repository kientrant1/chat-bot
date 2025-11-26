import { Widget } from '@/types/gemini'

export const localGenerateWidgets = (prompt: string): Widget[] => {
  const normalized = (prompt || '').toLowerCase()
  const widgets: Widget[] = []

  if (!prompt.trim()) {
    return [
      {
        id: 'welcome',
        type: 'panel',
        title: 'Welcome to the AG-UI Demo',
        description:
          'Describe the interface you want on the left, and this area will adapt with generated UI blocks.',
      },
    ]
  }

  if (normalized.includes('dashboard')) {
    widgets.push({
      id: 'dash',
      type: 'dashboard',
      title: 'Generated Dashboard',
      description: 'High-level KPIs generated from your request.',
      kpis: [
        { label: 'Open Tickets', value: '42' },
        { label: 'Avg. Response Time', value: '1.2h' },
        { label: 'Satisfaction', value: '94%' },
      ],
    })
  }

  if (normalized.includes('tickets') || normalized.includes('tasks')) {
    widgets.push({
      id: 'tickets',
      type: 'table',
      title: 'Tickets / Tasks List',
      description: 'A generated list view for managing items.',
      rows: [
        { id: '#1234', status: 'Open', owner: 'Alice' },
        { id: '#1235', status: 'In Progress', owner: 'Bob' },
        { id: '#1236', status: 'Blocked', owner: 'Eve' },
      ],
    })
  }

  if (normalized.includes('chart') || normalized.includes('analytics')) {
    widgets.push({
      id: 'chart',
      type: 'chart',
      title: 'Analytics Overview',
      description:
        'Placeholder sparkline / chart widget. In a real app this would be a chart library.',
    })
  }

  if (widgets.length === 0) {
    widgets.push({
      id: 'generic',
      type: 'panel',
      title: 'Generated Panel',
      description:
        "This is a generic panel created from your prompt. Add words like 'dashboard', 'tickets', or 'chart' to see more specific structures.",
    })
  }

  return widgets
}

export const fetchWidgetsFromGemini = async (
  prompt: string
): Promise<Widget[]> => {
  const res = await fetch('/api/gemini/create-layout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ prompt }),
  })

  if (!res.ok) {
    let errMsg = 'Gemini API failed'
    try {
      const errData = (await res.json()) as { error?: string }
      if (errData.error) errMsg = errData.error
    } catch {
      // ignore
    }
    throw new Error(errMsg)
  }

  const data = (await res.json()) as { widgets?: Widget[] }
  return data.widgets ?? []
}

export const updateWidgetsWithGemini = async (
  currentWidgets: Widget[],
  userPrompt: string
): Promise<Widget[]> => {
  const res = await fetch('/api/gemini/change-layout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      currentUI: { widgets: currentWidgets },
      userPrompt,
    }),
  })

  const data = await res.json()

  if (!res.ok) {
    const errMsg = (data && data.error) || 'Gemini update failed'
    throw new Error(errMsg)
  }

  return (data.widgets as Widget[]) ?? []
}
