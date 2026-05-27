import * as React from 'react'
import { FolderPlus, Shield, Upload, Folder, Link } from 'lucide-react'
import { NewVaultDialog } from './new-vault-dialog'

interface NewMenuProps {
  onClose: () => void
}

export function NewMenu({ onClose }: NewMenuProps) {
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    function handler(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) onClose()
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [onClose])

  return (
    <div
      ref={ref}
      className="absolute left-0 top-[calc(100%+6px)] z-50 min-w-[192px] overflow-hidden rounded-xl border border-border bg-card py-1 shadow-[0_14px_40px_oklch(0_0_0_/_0.06)]"
      role="menu"
    >
      <button
        className="flex w-full items-center gap-2.5 px-4 py-2 text-[13px] text-foreground hover:bg-muted"
        role="menuitem"
        onClick={onClose}
      >
        <FolderPlus size={15} className="text-muted-foreground" />
        New folder
      </button>

      <NewVaultDialog
        trigger={
          <button
            className="flex w-full items-center gap-2.5 px-4 py-2 text-[13px] text-foreground hover:bg-muted"
            role="menuitem"
          >
            <Shield size={15} className="text-muted-foreground" />
            New vault
          </button>
        }
      />

      <div className="my-1 border-t border-border" />

      <button
        className="flex w-full items-center gap-2.5 px-4 py-2 text-[13px] text-foreground hover:bg-muted"
        role="menuitem"
        onClick={onClose}
      >
        <Upload size={15} className="text-muted-foreground" />
        Upload files
      </button>
      <button
        className="flex w-full items-center gap-2.5 px-4 py-2 text-[13px] text-foreground hover:bg-muted"
        role="menuitem"
        onClick={onClose}
      >
        <Folder size={15} className="text-muted-foreground" />
        Upload folder
      </button>

      <div className="my-1 border-t border-border" />

      <button
        className="flex w-full items-center gap-2.5 px-4 py-2 text-[13px] text-foreground hover:bg-muted"
        role="menuitem"
        onClick={onClose}
      >
        <Link size={15} className="text-muted-foreground" />
        Private link…
      </button>
    </div>
  )
}
