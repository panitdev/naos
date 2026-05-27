'use client'

import * as React from 'react'
import { Link, useRouterState } from '@tanstack/react-router'
import {
  Home,
  FolderOpen,
  Users,
  Clock,
  Star,
  Trash2,
  Settings,
  Plus,
  ChevronRight,
  X,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { NaosLogo } from '@/components/ui/logos'
import { NAOS_NAV, NAOS_VAULTS } from '@/lib/drive-data'
import { NewVaultDialog } from './new-vault-dialog'

const NAV_ICONS: Record<string, React.ComponentType<{ size?: number; className?: string }>> = {
  home:    Home,
  drive:   FolderOpen,
  shared:  Users,
  recent:  Clock,
  starred: Star,
  trash:   Trash2,
}

interface SidebarProps {
  onClose?: () => void
}

export function Sidebar({ onClose }: SidebarProps) {
  const routerState = useRouterState()
  const currentPath = routerState.location.pathname

  return (
    <aside className="flex h-dvh w-[248px] shrink-0 flex-col overflow-hidden border-r border-sidebar-border bg-sidebar">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pb-3 pt-4">
        <div className="flex items-center gap-2 text-foreground">
          <NaosLogo size={22} />
          <span
            className="text-[19px] font-medium leading-none tracking-[-0.015em]"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            Naos
          </span>
        </div>
        {onClose ? (
          <button
            onClick={onClose}
            className="inline-flex h-[26px] w-[26px] items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <X size={16} />
          </button>
        ) : (
          /* spacer so header height is consistent */
          <div className="h-[26px] w-[26px]" />
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto px-[10px] pb-[10px] pt-1">
        <div className="flex flex-col gap-px">
          {NAOS_NAV.map((item) => {
            const Icon = NAV_ICONS[item.id]
            const isActive = item.path === '/'
              ? currentPath === '/'
              : currentPath.startsWith(item.path)
            return (
              <Link
                key={item.id}
                to={item.path}
                onClick={onClose}
                className={cn(
                  'naos-nav-item flex w-full cursor-pointer items-center gap-[10px] rounded-lg px-[10px] py-[7px] text-[13.5px] text-muted-foreground transition-colors',
                  isActive
                    ? 'is-active bg-[oklch(0.48_0.24_264_/_0.08)] font-medium text-primary'
                    : 'hover:bg-[oklch(0.955_0.015_85_/_0.6)] hover:text-foreground',
                )}
              >
                {Icon && <Icon size={16} className="shrink-0" />}
                <span className="flex-1">{item.label}</span>
                {item.expandable && (
                  <ChevronRight size={14} className="opacity-50" />
                )}
              </Link>
            )
          })}
        </div>

        {/* Vaults section */}
        <div className="mt-1 px-[10px] pb-1.5 pt-[18px] text-[10.5px] font-medium uppercase tracking-[0.14em] text-muted-foreground/70">
          Vaults
        </div>
        <div className="flex flex-col gap-px">
          {NAOS_VAULTS.map((vault) => (
            <button
              key={vault.id}
              className="flex w-full cursor-pointer items-center gap-[10px] rounded-lg px-[10px] py-[7px] text-[13.5px] text-muted-foreground transition-colors hover:bg-[oklch(0.955_0.015_85_/_0.6)] hover:text-foreground"
            >
              <span
                className="inline-flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded-[5px] text-[11px] font-medium text-white"
                style={{
                  background: vault.tint,
                  fontFamily: 'var(--font-serif)',
                }}
              >
                {vault.letter}
              </span>
              <span>{vault.label}</span>
            </button>
          ))}

          <NewVaultDialog
            trigger={
              <button className="mt-1.5 flex w-full cursor-pointer items-center gap-2 rounded-lg border border-dashed border-sidebar-border px-[10px] py-[7px] text-[13px] text-muted-foreground transition-all hover:border-[oklch(0.48_0.24_264_/_0.55)] hover:bg-[oklch(0.48_0.24_264_/_0.04)] hover:text-primary">
                <Plus size={14} />
                <span>New vault</span>
              </button>
            }
          />
        </div>
      </nav>

      {/* Footer */}
      <div className="border-t border-sidebar-border px-[10px] py-2">
        <button className="flex w-full items-center gap-[10px] rounded-lg px-[10px] py-[7px] text-[13.5px] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
          <Settings size={16} className="shrink-0" />
          <span>Settings</span>
        </button>
      </div>
    </aside>
  )
}
