import { createFileRoute } from '@tanstack/react-router'
import { ChevronDown } from 'lucide-react'
import { useDrive } from '@/lib/drive-context'
import { Toolbar } from '@/components/drive/toolbar'
import { FileTable } from '@/components/drive/file-table'
import { FileGrid } from '@/components/drive/file-grid'
import { StorageStrip } from '@/components/drive/storage-strip'
import { DetailPanel } from '@/components/drive/detail-panel'

export const Route = createFileRoute('/_drive/')({
  component: MyDrivePage,
})

function MyDrivePage() {
  const { view, showDetail } = useDrive()

  return (
    <div
      className="relative flex min-h-0 min-w-0 flex-1 overflow-hidden"
      style={{
        display: 'grid',
        gridTemplateColumns: showDetail ? 'minmax(0, 1fr) 360px' : 'minmax(0, 1fr)',
      }}
    >
      {/* Content */}
      <div className="naos-body flex min-h-0 min-w-0 flex-col gap-[18px] overflow-x-hidden overflow-y-auto px-7 py-7">
        {/* Page head */}
        <div style={{ animation: 'naos-fade-up 400ms cubic-bezier(0.22,1,0.36,1)' }}>
          <h1
            className="m-0 flex items-baseline gap-2 text-[38px] font-medium leading-[1.05] tracking-[-0.012em]"
            style={{ fontFamily: 'var(--font-serif)' }}
          >
            My{' '}
            <span className="italic text-primary">Drive</span>
            <ChevronDown
              size={20}
              className="self-center text-muted-foreground"
            />
          </h1>
          <p className="mt-1 text-[13.5px] text-muted-foreground">
            Private by default. Encrypted end-to-end.
          </p>
        </div>

        <Toolbar />

        {view === 'list' ? <FileTable /> : <FileGrid />}

        <StorageStrip />
      </div>

      {/* Detail panel */}
      {showDetail && (
        <aside
          className="naos-detail-col min-w-0 overflow-y-auto border-l border-border px-5 py-5 pb-6"
          style={{ background: 'color-mix(in oklab, var(--card) 70%, var(--background))' }}
        >
          <DetailPanel />
        </aside>
      )}
    </div>
  )
}
