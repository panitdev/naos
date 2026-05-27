import * as React from 'react'
import { X, ChevronDown, Link, Copy, Calendar } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useDrive } from '@/lib/drive-context'
import { NAOS_FILES } from '@/lib/drive-data'
import { FileTile } from './file-tile'
import { Avatar } from './avatar'
import { EncryptionCard } from './encryption-card'
import { InviteDialog } from './invite-dialog'
import type { Person } from '@/lib/drive-data'

type Tab = 'details' | 'access' | 'activity'

interface PersonRowProps {
  p: Person
}

function PersonRow({ p }: PersonRowProps) {
  const label = p.role === 'edit' ? 'Can edit' : p.role === 'owner' ? 'Owner' : 'Can view'
  return (
    <div className="flex items-center gap-2.5 px-1 py-2">
      <Avatar name={p.name} tone={p.tone} />
      <div className="min-w-0 flex-1">
        <div className="overflow-hidden text-ellipsis whitespace-nowrap text-[13px] font-medium text-foreground">
          {p.name}
        </div>
        <div className="overflow-hidden text-ellipsis whitespace-nowrap text-[11px] text-muted-foreground">
          {p.email}
        </div>
      </div>
      {p.role === 'owner' ? (
        <span className="text-[12px] text-muted-foreground">Owner</span>
      ) : (
        <button className="inline-flex items-center gap-1 rounded-lg border border-border bg-card px-2.5 py-[5px] text-[12px] text-foreground hover:border-foreground/25">
          <span>{label}</span>
          <ChevronDown size={13} className="text-muted-foreground" />
        </button>
      )}
    </div>
  )
}

export function DetailPanel() {
  const { selectedId, setShowDetail } = useDrive()
  const [tab, setTab] = React.useState<Tab>('access')
  const [linkOn, setLinkOn] = React.useState(false)
  const [showAll, setShowAll] = React.useState(false)

  const file = NAOS_FILES.find((f) => f.id === selectedId) ?? NAOS_FILES[0]

  React.useEffect(() => {
    setLinkOn(file.link.enabled)
    setShowAll(false)
    setTab('access')
  }, [file.id, file.link.enabled])

  const visiblePeople = showAll ? file.people : file.people.slice(0, 3)
  const hiddenCount = file.people.length - 3

  return (
    <div
      className="flex flex-col gap-[18px]"
      style={{ animation: 'naos-fade-up 250ms cubic-bezier(0.22,1,0.36,1)' }}
    >
      {/* File header */}
      <div className="flex items-start gap-3">
        <FileTile kind={file.kind} size={40} />
        <div className="min-w-0 flex-1">
          <h3
            className="m-0 text-[19px] font-medium leading-[1.15] tracking-[-0.01em] text-foreground"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            {file.name}
          </h3>
          <div className="mt-0.5 text-[12px] text-muted-foreground">
            {file.sizeLabel} · modified {file.modified}
          </div>
        </div>
        <button
          className="ml-auto inline-flex h-[26px] w-[26px] shrink-0 items-center justify-center rounded-md text-muted-foreground hover:bg-muted hover:text-foreground"
          onClick={() => setShowDetail(false)}
          title="Close"
        >
          <X size={15} />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex gap-[22px] border-b border-border">
        {(['details', 'access', 'activity'] as Tab[]).map((t) => (
          <button
            key={t}
            className={cn(
              'naos-tab relative pb-[9px] pt-[9px] text-[13px] font-medium capitalize text-muted-foreground hover:text-foreground',
              tab === t && 'is-on text-primary',
            )}
            onClick={() => setTab(t)}
          >
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {/* Tab content */}
      {tab === 'access' && (
        <div className="flex flex-col gap-4">
          {/* People */}
          <div>
            <div className="mb-1 flex items-center justify-between">
              <span className="text-[12px] font-medium text-foreground/75">People</span>
              <InviteDialog
                fileName={file.name}
                trigger={
                  <button className="inline-flex items-center gap-[5px] rounded-[7px] border border-[oklch(0.48_0.24_264_/_0.25)] bg-[oklch(0.48_0.24_264_/_0.10)] px-2.5 py-[5px] text-[12px] font-medium text-primary hover:bg-[oklch(0.48_0.24_264_/_0.16)]">
                    <span>+</span> Invite
                  </button>
                }
              />
            </div>
            <div>
              {visiblePeople.map((p, i) => (
                <PersonRow key={i} p={p} />
              ))}
              {hiddenCount > 0 && !showAll && (
                <button
                  className="inline-flex items-center gap-1 py-2 pl-1 text-[12px] font-medium text-primary hover:underline hover:[text-underline-offset:3px]"
                  onClick={() => setShowAll(true)}
                >
                  Show more ({hiddenCount}) <ChevronDown size={13} />
                </button>
              )}
            </div>
          </div>

          {/* Private link */}
          <div className="flex flex-col gap-2.5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <div className="text-[12.5px] font-medium text-foreground">Private link</div>
                <div className="mt-0.5 text-[11.5px] text-muted-foreground">
                  Anyone with the link gets temporary access.
                </div>
              </div>
              <button
                className="naos-toggle"
                onClick={() => setLinkOn((v) => !v)}
                role="switch"
                aria-checked={linkOn}
              />
            </div>

            <div
              className={cn(
                'flex items-center gap-2 rounded-lg border border-border bg-muted px-2.5 py-1',
                !linkOn && 'pointer-events-none opacity-45',
              )}
            >
              <Link size={13} className="text-muted-foreground" />
              <span className="min-w-0 flex-1 overflow-hidden text-ellipsis whitespace-nowrap font-mono text-[12px] text-foreground">
                {linkOn ? (file.link.url || 'naos://link/—') : 'Link access off'}
              </span>
              <button className="shrink-0 rounded-[6px] border border-border bg-card px-2.5 py-[5px] text-[11.5px] font-medium text-foreground hover:border-primary hover:text-primary">
                <Copy size={11} className="mr-1 inline" />Copy
              </button>
            </div>

            <div className={cn('flex items-center justify-between text-[12.5px]', !linkOn && 'opacity-45')}>
              <span className="text-muted-foreground">Anyone with the link</span>
              <button className="inline-flex items-center gap-1 rounded-[7px] border border-border bg-card px-2.5 py-[5px] text-[12px] text-foreground hover:border-foreground/25">
                <span>Can view</span>
                <ChevronDown size={13} className="text-muted-foreground" />
              </button>
            </div>

            <div className={cn('flex items-center justify-between text-[12.5px]', !linkOn && 'opacity-45')}>
              <span className="text-muted-foreground">Expires</span>
              <span className="inline-flex items-center gap-1.5 font-mono text-[12px] tabular-nums text-foreground">
                <Calendar size={13} className="text-muted-foreground" />
                {linkOn ? file.link.expires : '—'}
              </span>
            </div>
          </div>

          <EncryptionCard fingerprint={file.fingerprint} />
        </div>
      )}

      {tab === 'details' && (
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-1">
            {[
              { k: 'Kind',       v: file.kind === 'folder' ? 'Folder' : file.kind.toUpperCase() },
              { k: 'Size',       v: file.sizeLabel },
              { k: 'Modified',   v: file.modifiedFull },
              { k: 'Created',    v: file.created },
              { k: 'Owner',      v: file.owner },
              { k: 'Encryption', v: file.encryption, secure: true },
            ].map((row) => (
              <div
                key={row.k}
                className="flex items-baseline justify-between border-b border-border/60 py-2 last:border-b-0"
              >
                <span className="text-[12px] text-muted-foreground">{row.k}</span>
                <span
                  className="text-right font-mono text-[12.5px] tabular-nums text-foreground"
                  style={row.secure ? { color: 'var(--naos-secure)' } : undefined}
                >
                  {row.v}
                </span>
              </div>
            ))}
          </div>
          <EncryptionCard fingerprint={file.fingerprint} />
        </div>
      )}

      {tab === 'activity' && (
        <div className="flex flex-col gap-0.5">
          {file.activity.map((a, i) => (
            <div
              key={i}
              className={cn('flex gap-2.5 py-1.5 text-[12.5px]', !a.live && 'opacity-70')}
            >
              <span
                className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ background: a.live ? 'var(--primary)' : 'var(--border)' }}
              />
              <div className="flex-1">
                <div className="text-foreground">
                  <span className="font-medium">{a.who}</span> {a.what}
                </div>
                <div className="mt-0.5 text-[11px] text-muted-foreground">{a.time}</div>
              </div>
            </div>
          ))}
          <div className="mt-2.5">
            <EncryptionCard fingerprint={file.fingerprint} />
          </div>
        </div>
      )}
    </div>
  )
}
