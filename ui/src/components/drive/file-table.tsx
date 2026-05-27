import { Check, Users, User, Lock, MoreHorizontal, ChevronUp } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useDrive } from '@/lib/drive-context'
import { NAOS_FILES } from '@/lib/drive-data'
import { FileTile } from './file-tile'
import * as React from 'react'

export function FileTable() {
  const { selectedId, setSelectedId, setShowDetail, searchQuery } = useDrive()
  const [checked, setChecked] = React.useState<Record<string, boolean>>({})

  const filtered = React.useMemo(() => {
    if (!searchQuery.trim()) return NAOS_FILES
    const q = searchQuery.toLowerCase()
    return NAOS_FILES.filter((f) => f.name.toLowerCase().includes(q))
  }, [searchQuery])

  const checkedCount = Object.values(checked).filter(Boolean).length
  const allChecked = checkedCount > 0 && checkedCount === filtered.length

  function toggleAll() {
    if (allChecked) {
      setChecked({})
    } else {
      const next: Record<string, boolean> = {}
      filtered.forEach((f) => { next[f.id] = true })
      setChecked(next)
    }
  }

  function selectFile(id: string) {
    setSelectedId(id)
    setShowDetail(true)
  }

  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-[0_1px_3px_oklch(0.18_0.06_264_/_0.05)]">
      {/* Scrollable wrapper */}
      <div style={{ minWidth: 720 }}>
        {/* Header */}
        <div
          className="grid items-center gap-3 border-b border-border px-4"
          style={{ gridTemplateColumns: '28px minmax(220px,1fr) 150px 120px 130px 40px', height: 40 }}
        >
          <button
            className={cn(
              'inline-flex h-4 w-4 items-center justify-center rounded border border-border bg-card transition-all',
              allChecked && 'border-primary bg-primary text-primary-foreground',
            )}
            onClick={toggleAll}
            role="checkbox"
            aria-checked={allChecked}
          >
            {allChecked && <Check size={11} />}
          </button>
          <button className="inline-flex cursor-pointer items-center gap-1 text-[11.5px] font-medium uppercase tracking-[0.08em] text-muted-foreground hover:text-foreground">
            Name <ChevronUp size={12} />
          </button>
          <span className="text-[11.5px] font-medium uppercase tracking-[0.08em] text-muted-foreground">Access</span>
          <span className="text-[11.5px] font-medium uppercase tracking-[0.08em] text-muted-foreground">Encryption</span>
          <span className="text-[11.5px] font-medium uppercase tracking-[0.08em] text-muted-foreground">Modified</span>
          <span />
        </div>

        {/* Rows */}
        {filtered.map((file) => (
          <button
            key={file.id}
            className={cn(
              'naos-table-row grid w-full cursor-pointer items-center gap-3 border-b border-border/60 px-4 text-left text-[13.5px] transition-colors last:border-b-0',
              selectedId === file.id
                ? 'bg-[oklch(0.48_0.24_264_/_0.06)] hover:bg-[oklch(0.48_0.24_264_/_0.09)]'
                : 'hover:bg-[color-mix(in_oklab,var(--muted)_60%,transparent)]',
            )}
            style={{ gridTemplateColumns: '28px minmax(220px,1fr) 150px 120px 130px 40px' }}
            onClick={() => selectFile(file.id)}
          >
            {/* Check */}
            <span
              className={cn(
                'inline-flex h-4 w-4 items-center justify-center rounded border border-border bg-card transition-all hover:border-primary',
                checked[file.id] && 'border-primary bg-primary text-primary-foreground',
              )}
              onClick={(e) => {
                e.stopPropagation()
                setChecked((c) => ({ ...c, [file.id]: !c[file.id] }))
              }}
              role="checkbox"
              aria-checked={!!checked[file.id]}
            >
              {checked[file.id] && <Check size={11} />}
            </span>

            {/* Name */}
            <span className="flex min-w-0 items-center gap-3">
              <FileTile kind={file.kind} size={32} />
              <span className="min-w-0">
                <div className="overflow-hidden text-ellipsis whitespace-nowrap font-medium text-foreground">
                  {file.name}
                </div>
                <div className="font-mono text-[11.5px] tabular-nums text-muted-foreground">
                  {file.sizeLabel}
                </div>
              </span>
            </span>

            {/* Access */}
            <span className="inline-flex items-center gap-1.5 text-muted-foreground">
              {file.access.type === 'private'
                ? <User size={14} />
                : <Users size={14} />}
              <span>{file.access.label}</span>
            </span>

            {/* Encryption */}
            <span
              className="inline-flex items-center gap-1.5 text-[13px]"
              style={{ color: 'var(--naos-secure)' }}
            >
              <Lock size={13} />
              <span>{file.encryption}</span>
            </span>

            {/* Modified */}
            <span className="font-mono text-[13px] tabular-nums text-muted-foreground">
              {file.modified}
            </span>

            {/* More */}
            <span
              className="inline-flex items-center justify-center text-muted-foreground"
              onClick={(e) => e.stopPropagation()}
            >
              <MoreHorizontal size={16} />
            </span>
          </button>
        ))}
      </div>
    </div>
  )
}
