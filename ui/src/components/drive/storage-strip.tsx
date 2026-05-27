export function StorageStrip() {
  const pct = 12
  return (
    <div className="flex items-center gap-[18px] rounded-xl border border-border bg-card px-[18px] py-3.5">
      <div className="flex flex-1 flex-col gap-2">
        <div className="flex items-baseline justify-between text-[12px] text-muted-foreground">
          <span className="text-[13px] font-medium text-foreground">Storage</span>
          <span>
            <span className="font-mono tabular-nums text-foreground">12.4 GB</span> of 100 GB used
          </span>
        </div>
        <div className="h-[5px] overflow-hidden rounded-full bg-muted">
          <div
            className="naos-storage-bar h-full rounded-full"
            style={{
              '--naos-pct': `${pct}%`,
              background: 'linear-gradient(90deg, var(--primary), oklch(0.62 0.20 264))',
            } as React.CSSProperties}
          />
        </div>
      </div>
      <button className="shrink-0 text-[12.5px] font-medium text-primary hover:underline hover:[text-underline-offset:3px]">
        Upgrade plan
      </button>
    </div>
  )
}
