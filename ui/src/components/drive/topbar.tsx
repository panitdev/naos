import { Search, Bell, ChevronDown, Lock, Menu } from 'lucide-react'
import { useDrive } from '@/lib/drive-context'

export function Topbar() {
  const { searchQuery, setSearchQuery, setSidebarOpen } = useDrive()

  return (
    <div className="flex min-w-0 items-center gap-4 border-b border-border bg-background px-6 py-[14px] max-[760px]:gap-[10px] max-[760px]:px-4 max-[760px]:py-3">
      {/* Mobile hamburger */}
      <button
        className="naos-topbar-hamburger mr-1 inline-flex h-[34px] w-[34px] items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"
        onClick={() => setSidebarOpen(true)}
      >
        <Menu size={18} />
      </button>

      {/* Search */}
      <div className="flex max-w-[640px] flex-1 items-center gap-[10px] rounded-[10px] border border-transparent bg-muted px-3 py-2 transition-all duration-[180ms] focus-within:border-primary focus-within:bg-card focus-within:shadow-[0_0_0_4px_oklch(0.48_0.24_264_/_0.10)]">
        <Search size={15} className="shrink-0 text-muted-foreground" />
        <input
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search in My Drive"
          className="naos-search-input flex-1 border-none bg-transparent text-[13.5px] text-foreground outline-none placeholder:text-muted-foreground/70"
        />
        <kbd className="naos-search-kbd inline-flex items-center gap-px rounded border border-border bg-card px-1.5 py-0.5 font-mono text-[11px] text-muted-foreground">
          ⌘K
        </kbd>
      </div>

      {/* Right side */}
      <div className="ml-auto flex items-center gap-1.5">
        {/* E2EE status pill */}
        <div
          className="inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[12px] font-medium"
          style={{
            background: 'var(--naos-secure-bg)',
            borderColor: 'var(--naos-secure-border)',
            color: 'var(--naos-secure)',
          }}
          title="Local key unlocked · session encrypted"
        >
          <Lock size={13} />
          <span className="naos-topbar-status-label">All files encrypted</span>
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{
              background: 'var(--naos-secure)',
              boxShadow: '0 0 0 3px oklch(0.55 0.13 155 / 0.15)',
            }}
          />
        </div>

        {/* Notifications */}
        <button className="relative inline-flex h-[34px] w-[34px] items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground">
          <Bell size={17} />
          <span className="absolute right-[6px] top-[6px] h-[7px] w-[7px] rounded-full border-[1.5px] border-background bg-accent" />
        </button>

        {/* Account avatar */}
        <button className="inline-flex cursor-pointer items-center gap-1.5 rounded-full px-1 py-1 pr-2 hover:bg-muted">
          <span
            className="inline-flex h-7 w-7 items-center justify-center rounded-full text-[12px] font-medium text-white"
            style={{ background: 'linear-gradient(135deg, oklch(0.55 0.16 264), oklch(0.78 0.13 75))' }}
          >
            YJ
          </span>
          <ChevronDown size={14} className="text-muted-foreground" />
        </button>
      </div>
    </div>
  )
}
