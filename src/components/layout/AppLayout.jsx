import { AnimatePresence, motion as Motion } from 'framer-motion'
import { Outlet } from 'react-router-dom'
import { useState } from 'react'
import { Header } from './Header'
import { Sidebar } from './Sidebar'
import '../../styles/layout.css'
import { useMediaQuery } from '../../hooks/useMediaQuery'

export function AppLayout() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const isDesktop = useMediaQuery('(min-width: 1100px)')

  const handleClose = () => setMobileOpen(false)

  return (
    <div className="app-shell">
      {(isDesktop || mobileOpen) && (
        <AnimatePresence initial={false}>
          {(isDesktop || mobileOpen) && (
            <Motion.div
              key="sidebar"
              className="app-shell__sidebar"
              initial={{ x: isDesktop ? 0 : -24, opacity: isDesktop ? 1 : 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: isDesktop ? 0 : -24, opacity: isDesktop ? 1 : 0 }}
              transition={{ type: 'spring', stiffness: 260, damping: 28 }}
            >
              <Sidebar onNavigate={handleClose} isDesktop={isDesktop} />
            </Motion.div>
          )}
        </AnimatePresence>
      )}

      <div className="app-shell__content">
        <Header onToggleSidebar={() => setMobileOpen((prev) => !prev)} isSidebarOpen={mobileOpen} />
        <main className="app-shell__main" role="main">
          <Outlet />
        </main>
      </div>

      <AnimatePresence>
        {!isDesktop && mobileOpen && (
          <Motion.button
            className="app-shell__overlay"
            type="button"
            aria-label="Close navigation"
            onClick={handleClose}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

