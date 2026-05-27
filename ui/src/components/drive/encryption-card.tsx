import { Shield } from 'lucide-react'

interface EncryptionCardProps {
  fingerprint: string
}

export function EncryptionCard({ fingerprint }: EncryptionCardProps) {
  return (
    <div className="flex flex-col gap-2 rounded-xl border border-border bg-card p-4">
      {/* Header */}
      <div className="flex items-center gap-2.5">
        <span
          className="inline-flex h-[30px] w-[30px] items-center justify-center rounded-lg"
          style={{ background: 'var(--naos-secure-bg)', color: 'var(--naos-secure)' }}
        >
          <Shield size={16} />
        </span>
        <span className="flex-1 text-[13.5px] font-medium text-foreground">Encryption</span>
        <span
          className="rounded-full border px-2 py-[3px] font-mono text-[10.5px] font-medium tracking-[0.04em]"
          style={{
            background: 'var(--naos-secure-bg)',
            borderColor: 'var(--naos-secure-border)',
            color: 'var(--naos-secure)',
          }}
        >
          E2EE
        </span>
      </div>

      {/* Body */}
      <p className="text-[12.5px] leading-[1.55] text-muted-foreground">
        Files are encrypted on this device with your master key. Naos never sees them in the clear.
      </p>

      {/* Key fingerprint */}
      <div className="mt-1.5 flex items-center justify-between gap-2.5 rounded-lg bg-muted px-2.5 py-2">
        <span className="text-[10.5px] font-medium uppercase tracking-[0.1em] text-muted-foreground">
          Key fingerprint
        </span>
        <span className="font-mono text-[11.5px] tracking-[0.02em] text-foreground">
          {fingerprint}
        </span>
      </div>

      <button className="self-start text-[12.5px] font-medium text-primary hover:underline hover:[text-underline-offset:3px]">
        Learn more
      </button>
    </div>
  )
}
