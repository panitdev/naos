import * as React from 'react'
import { Lock } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useDrive } from '@/lib/drive-context'
import { NAOS_FILES } from '@/lib/drive-data'
import { FileTile } from './file-tile'

export function FileGrid() {
  const { selectedId, setSelectedId, setShowDetail, searchQuery } = useDrive()

  const filtered = React.useMemo(() => {
    if (!searchQuery.trim()) return NAOS_FILES
    const q = searchQuery.toLowerCase()
    return NAOS_FILES.filter((f) => f.name.toLowerCase().includes(q))
  }, [searchQuery])

  return (
    <div className="grid gap-3.5" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))' }}>
      {filtered.map((file) => (
        <button
          key={file.id}
          className={cn(
            'flex cursor-pointer flex-col gap-3 rounded-xl border border-border bg-card p-4 shadow-[0_1px_2px_oklch(0.18_0.06_264_/_0.04)] transition-[transform,border-color] duration-[250ms] ease-[cubic-bezier(0.22,1,0.36,1)] hover:-translate-y-0.5 hover:border-foreground/18',
            selectedId === file.id && 'border-primary bg-[oklch(0.48_0.24_264_/_0.04)]',
          )}
          onClick={() => { setSelectedId(file.id); setShowDetail(true) }}
        >
          <FileTile kind={file.kind} size={40} />
          <div className="min-w-0">
            <div className="overflow-hidden text-ellipsis whitespace-nowrap text-left text-[13.5px] font-medium text-foreground">
              {file.name}
            </div>
            <div className="mt-1 flex items-center gap-2 text-[11.5px] text-muted-foreground">
              <span>{file.sizeLabel}</span>
              <span>·</span>
              <Lock size={11} style={{ color: 'var(--naos-secure)' }} />
            </div>
          </div>
        </button>
      ))}
    </div>
  )
}
