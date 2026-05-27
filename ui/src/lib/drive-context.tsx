import * as React from 'react'

export type ViewMode = 'list' | 'grid'
export type Density = 'compact' | 'comfortable' | 'roomy'

interface DriveState {
  selectedId: string | null
  setSelectedId: (id: string | null) => void
  showDetail: boolean
  setShowDetail: (v: boolean) => void
  view: ViewMode
  setView: (v: ViewMode) => void
  density: Density
  setDensity: (v: Density) => void
  searchQuery: string
  setSearchQuery: (q: string) => void
  sidebarOpen: boolean
  setSidebarOpen: (v: boolean) => void
}

const DriveContext = React.createContext<DriveState | null>(null)

export function DriveProvider({ children }: { children: React.ReactNode }) {
  const [selectedId, setSelectedId] = React.useState<string | null>('projects')
  const [showDetail, setShowDetail] = React.useState(true)
  const [view, setView] = React.useState<ViewMode>('list')
  const [density, setDensity] = React.useState<Density>('comfortable')
  const [searchQuery, setSearchQuery] = React.useState('')
  const [sidebarOpen, setSidebarOpen] = React.useState(false)

  React.useEffect(() => {
    const root = document.documentElement
    root.style.setProperty(
      '--naos-density',
      density === 'compact' ? '0.85' : density === 'roomy' ? '1.18' : '1',
    )
  }, [density])

  return (
    <DriveContext.Provider
      value={{
        selectedId,
        setSelectedId,
        showDetail,
        setShowDetail,
        view,
        setView,
        density,
        setDensity,
        searchQuery,
        setSearchQuery,
        sidebarOpen,
        setSidebarOpen,
      }}
    >
      {children}
    </DriveContext.Provider>
  )
}

export function useDrive(): DriveState {
  const ctx = React.useContext(DriveContext)
  if (!ctx) throw new Error('useDrive must be used within DriveProvider')
  return ctx
}
