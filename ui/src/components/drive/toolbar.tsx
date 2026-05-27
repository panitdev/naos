import * as React from 'react'
import { Plus, Upload, MoreHorizontal, List, LayoutGrid, ChevronDown, Info } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useDrive } from '@/lib/drive-context'
import { NewMenu } from './new-menu'

export function Toolbar() {
  const { view, setView, showDetail, setShowDetail } = useDrive()
  const [menuOpen, setMenuOpen] = React.useState(false)

  return (
    <div className="flex items-center gap-2">
      {/* New button with dropdown */}
      <div className="relative">
        <button
          className="inline-flex cursor-pointer items-center gap-[7px] rounded-[9px] border border-transparent bg-primary px-3.5 py-2 pr-2 text-[13px] font-medium text-primary-foreground shadow-[0_6px_18px_-10px_oklch(0.48_0.24_264_/_0.55)] transition-all active:scale-[0.97] hover:-translate-y-px hover:bg-[oklch(0.43_0.22_264)]"
          onClick={() => setMenuOpen((v) => !v)}
        >
          <Plus size={15} />
          <span>New</span>
          <ChevronDown size={14} className="opacity-85" />
        </button>
        {menuOpen && <NewMenu onClose={() => setMenuOpen(false)} />}
      </div>

      <button className="inline-flex cursor-pointer items-center gap-[7px] rounded-[9px] border border-border bg-card px-3.5 py-2 text-[13px] font-medium text-foreground transition-all active:scale-[0.97] hover:-translate-y-px hover:border-foreground/25">
        <Upload size={15} />
        <span>Upload</span>
      </button>

      <button className="inline-flex h-[34px] w-[34px] cursor-pointer items-center justify-center rounded-[9px] border border-border bg-card text-muted-foreground transition-all active:scale-[0.97] hover:-translate-y-px hover:border-foreground/25 hover:text-foreground">
        <MoreHorizontal size={16} />
      </button>

      <div className="flex-1" />

      {/* View toggle */}
      <div
        className="inline-flex gap-0.5 rounded-[9px] border border-border bg-card p-[3px]"
        role="tablist"
        aria-label="View"
      >
        <button
          className={cn(
            'inline-flex h-7 w-7 items-center justify-center rounded-[6px] text-muted-foreground transition-colors',
            view === 'list'
              ? 'bg-[oklch(0.48_0.24_264_/_0.10)] text-primary'
              : 'hover:text-foreground',
          )}
          onClick={() => setView('list')}
          title="List view"
          role="tab"
          aria-selected={view === 'list'}
        >
          <List size={15} />
        </button>
        <button
          className={cn(
            'inline-flex h-7 w-7 items-center justify-center rounded-[6px] text-muted-foreground transition-colors',
            view === 'grid'
              ? 'bg-[oklch(0.48_0.24_264_/_0.10)] text-primary'
              : 'hover:text-foreground',
          )}
          onClick={() => setView('grid')}
          title="Grid view"
          role="tab"
          aria-selected={view === 'grid'}
        >
          <LayoutGrid size={15} />
        </button>
      </div>

      {/* Info / detail toggle */}
      <button
        className={cn(
          'inline-flex h-[34px] w-[34px] cursor-pointer items-center justify-center rounded-[9px] transition-colors',
          showDetail
            ? 'bg-[oklch(0.48_0.24_264_/_0.08)] text-primary'
            : 'text-muted-foreground hover:bg-muted hover:text-foreground',
        )}
        title={showDetail ? 'Hide details' : 'Show details'}
        onClick={() => setShowDetail(!showDetail)}
      >
        <Info size={16} />
      </button>
    </div>
  )
}
