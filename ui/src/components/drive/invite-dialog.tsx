import * as React from 'react'
import { UserPlus } from 'lucide-react'
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

interface InviteDialogProps {
  trigger: React.ReactNode
  fileName?: string
}

const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function InviteDialog({ trigger, fileName }: InviteDialogProps) {
  const [email, setEmail] = React.useState('')
  const [open, setOpen] = React.useState(false)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setOpen(false)
    setEmail('')
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-sm">
        <DialogHeader>
          <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-xl bg-[oklch(0.48_0.24_264_/_0.10)]">
            <UserPlus size={20} className="text-primary" />
          </div>
          <DialogTitle>Invite people</DialogTitle>
          {fileName && (
            <DialogDescription>
              Grant access to <span className="font-medium text-foreground">{fileName}</span>
            </DialogDescription>
          )}
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <AnimatedField
            id="invite-email"
            label="Email address"
            type="email"
            value={email}
            onChange={setEmail}
            placeholder="colleague@example.com"
            required
            autoComplete="email"
            validate={(v) => (v && !emailRe.test(v) ? 'Enter a valid email address' : null)}
          />

          <div className="flex flex-col gap-1.5">
            <label className="text-sm font-medium text-foreground/80">Permission</label>
            <select className="h-9 w-full rounded-lg border border-border bg-card px-3 text-sm text-foreground outline-none focus:border-primary focus:ring-4 focus:ring-primary/10">
              <option value="view">Can view</option>
              <option value="edit">Can edit</option>
            </select>
          </div>

          <DialogFooter showCloseButton>
            <button
              type="submit"
              disabled={!emailRe.test(email)}
              className="inline-flex h-9 items-center justify-center rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground shadow-[0_6px_18px_-10px_oklch(0.48_0.24_264_/_0.55)] transition-all hover:-translate-y-px hover:bg-[oklch(0.43_0.22_264)] disabled:pointer-events-none disabled:opacity-50"
            >
              Send invite
            </button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
