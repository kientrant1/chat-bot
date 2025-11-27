import { Widget } from '@/types/gemini'

export type Mode = 'beginner' | 'expert'

interface GeneratedWidgetProps {
  widget: Widget
  panelClasses: string
  mode: Mode
}

export default function GeneratedWidget({
  widget,
  panelClasses,
  mode,
}: GeneratedWidgetProps) {
  const base =
    panelClasses + ' border rounded-2xl p-3 shadow-sm flex flex-col gap-2'

  if (widget.type === 'dashboard') {
    return (
      <article className={base}>
        <header className="flex justify-between items-center">
          <h3 className="text-sm font-semibold">{widget.title}</h3>
          <span className="text-[10px] px-2 py-0.5 rounded-full border border-emerald-400/60 text-emerald-300">
            Dashboard
          </span>
        </header>
        <p className="text-xs opacity-80">{widget.description}</p>
        <div className="grid grid-cols-3 gap-2 mt-1">
          {(widget.kpis ?? []).map(kpi => (
            <div
              key={kpi.label}
              className="rounded-xl border border-slate-600/70 px-2 py-1.5 text-[11px]"
            >
              <div className="opacity-70">{kpi.label}</div>
              <div className="font-semibold text-sm">{kpi.value}</div>
            </div>
          ))}
        </div>
      </article>
    )
  }

  if (widget.type === 'table') {
    return (
      <article className={base + ' col-span-full'}>
        <header className="flex justify-between items-center">
          <h3 className="text-sm font-semibold">{widget.title}</h3>
          <span className="text-[10px] px-2 py-0.5 rounded-full border border-sky-400/60 text-sky-300">
            List View
          </span>
        </header>
        <p className="text-xs opacity-80 mb-1">{widget.description}</p>
        <div className="border border-slate-600/60 rounded-xl overflow-hidden text-[11px]">
          <div className="grid grid-cols-4 bg-slate-800/60 px-2 py-1 font-semibold">
            <span>ID</span>
            <span>Status</span>
            <span>Owner</span>
            <span>Priority</span>
          </div>
          {(widget.rows ?? []).map(row => (
            <div
              key={row.id}
              className="grid grid-cols-4 px-2 py-1 border-t border-slate-700/60"
            >
              <span>{row.id}</span>
              <span>{row.status}</span>
              <span>{row.owner}</span>
              <span>{row.priority || '-'}</span>
            </div>
          ))}
        </div>
        {mode === 'beginner' && (
          <p className="mt-1 text-[10px] opacity-70">
            Tip: In a real AG-UI, you could ask “Add priority column” and the UI
            would regenerate this table.
          </p>
        )}
      </article>
    )
  }

  if (widget.type === 'chart') {
    return (
      <article className={base}>
        <header className="flex justify-between items-center">
          <h3 className="text-sm font-semibold">{widget.title}</h3>
          <span className="text-[10px] px-2 py-0.5 rounded-full border border-purple-400/60 text-purple-200">
            Chart
          </span>
        </header>
        <p className="text-xs opacity-80">{widget.description}</p>
        <div className="mt-2 h-20 rounded-xl border border-slate-600/70 flex items-center justify-center text-[10px] opacity-60">
          [Sparkline / Chart Placeholder]
        </div>
      </article>
    )
  }

  // generic panel
  return (
    <article className={base}>
      <header className="flex justify-between items-center">
        <h3 className="text-sm font-semibold">{widget.title}</h3>
        <span className="text-[10px] px-2 py-0.5 rounded-full border border-slate-400/60 opacity-70">
          Panel
        </span>
      </header>
      <p className="text-xs opacity-80">{widget.description}</p>
    </article>
  )
}
