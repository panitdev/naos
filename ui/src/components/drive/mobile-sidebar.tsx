import { useDrive } from '@/lib/drive-context'
import { Sidebar } from './sidebar'

export function MobileSidebar() {
  const { sidebarOpen, setSidebarOpen } = useDrive()

  if (!sidebarOpen) return null

  return (
    <>
      {/* Scrim */}
      <div
        className="fixed inset-0 z-40 bg-black/30"
        onClick={() => setSidebarOpen(false)}
      />
      {/* Drawer */}
      <div className="fixed inset-y-0 left-0 z-50 animate-in slide-in-from-left duration-200">
        <Sidebar onClose={() => setSidebarOpen(false)} />
      </div>
    </>
  )
}
