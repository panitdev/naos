import { createFileRoute } from '@tanstack/react-router'
import { Clock } from 'lucide-react'

export const Route = createFileRoute('/_drive/recent')({
  component: RecentPage,
})

function RecentPage() {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 text-center">
      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted text-muted-foreground">
        <Clock size={24} />
      </div>
      <h2
        className="text-[22px] font-medium text-foreground"
        style={{ fontFamily: 'var(--font-serif)' }}
      >
        Recent
      </h2>
      <p className="max-w-xs text-sm text-muted-foreground">
        Files you've recently opened or edited will appear here.
      </p>
    </div>
  )
}
