export type WidgetType = 'dashboard' | 'table' | 'chart' | 'panel'

interface KPI {
  label: string
  value: string
}

interface Row {
  id: string
  status: string
  owner: string
  priority?: string
}

export interface Widget {
  id: string
  type: WidgetType | string
  title: string
  description: string
  kpis?: KPI[]
  rows?: Row[]
}

export interface LayoutResponse {
  widgets: Widget[]
}
