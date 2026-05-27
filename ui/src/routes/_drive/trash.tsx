import { createFileRoute } from '@tanstack/react-router'
import { Trash2 } from 'lucide-react'

export const Route = createFileRoute('/_drive/trash')({
  component: TrashPage,
})

function TrashPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted text-muted-foreground">
        <Trash2 size={24} />
      </div>
      <h2
        className="text-[22px] font-medium text-foreground"
        style={{ fontFamily: 'var(--font-serif)' }}
      >
        Trash
      </h2>
      <p className="max-w-xs text-sm text-muted-foreground">
        Deleted files will be kept here for 30 days before permanent removal.
      </p>
    </div>
  )
}
