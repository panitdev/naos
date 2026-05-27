import * as React from 'react'
import { Shield } from 'lucide-react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/responsive-dialog'
import { AnimatedField } from '@/components/ui/animated-field'

interface NewVaultDialogProps {
  trigger: React.ReactNode
}

export function NewVaultDialog({ trigger }: NewVaultDialogProps) {
  const [name, setName] = React.useState('')
  const [open, setOpen] = React.useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setOpen(false)
    setName('')
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-[oklch(0.92_0.04_155)]">
            <Shield size={20} className="text-[oklch(0.55_0.13_155)]" />
          </div>
          <DialogTitle>New vault</DialogTitle>
          <DialogDescription>
            A vault encrypts its contents with a separate key under your master key.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <AnimatedField
            id="vault-name"
            label="Vault name"
            value={name}
            onChange={setName}
            placeholder="e.g. Medical records"
            required
            validate={(v) => (v.trim().length < 2 ? 'Name must be at least 2 characters' : null)}
          />

          <DialogFooter showCloseButton>
            <button
              type="submit"
              disabled={name.trim().length < 2}
              className="inline-flex h-9 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground shadow-[0_6px_18px_-10px_oklch(0.48_0.24_264_/_0.55)] transition-all hover:-translate-y-px hover:bg-[oklch(0.43_0.22_264)] disabled:pointer-events-none disabled:opacity-50"
            >
              Create vault
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
