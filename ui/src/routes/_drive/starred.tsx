import { createFileRoute } from '@tanstack/react-router'
import { Star } from 'lucide-react'

export const Route = createFileRoute('/_drive/starred')({
  component: StarredPage,
})

function StarredPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted text-muted-foreground">
        <Star size={24} />
      </div>
      <h2
        className="text-[22px] font-medium text-foreground"
        style={{ fontFamily: 'var(--font-serif)' }}
      >
        Starred
      </h2>
      <p className="max-w-xs text-sm text-muted-foreground">
        Star files to find them quickly later.
      </p>
    </div>
  )
}
