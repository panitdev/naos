import { createFileRoute, Outlet } from '@tanstack/react-router'
import { DriveProvider } from '@/lib/drive-context'
import { Sidebar } from '@/components/drive/sidebar'
import { Topbar } from '@/components/drive/topbar'
import { MobileSidebar } from '@/components/drive/mobile-sidebar'

export const Route = createFileRoute('/_drive')({
  component: DriveLayout,
})

function DriveLayout() {
  return (
    <DriveProvider>
      <div className="naos-app">
        {/* Desktop sidebar */}
        <div className="naos-sidebar-desktop">
          <Sidebar />
        </div>

        {/* Mobile sidebar (drawer) */}
        <MobileSidebar />

        {/* Main area */}
        <div className="flex min-h-0 min-w-0 flex-1 flex-col overflow-hidden">
          <Topbar />
          <Outlet />
        </div>
      </div>
    </DriveProvider>
  )
}
