import { motion as Motion } from "framer-motion"
import {
  Bell,
  Command,
  LayoutGrid,
  Menu,
  Moon,
  RefreshCw,
  Search,
  Star,
  Sun,
  Square,
} from "lucide-react"
import { useTheme } from "../../theme/ThemeProvider"
import "../../styles/header.css"

const iconVariants = {
  initial: { scale: 1, y: 0 },
  hover: { scale: 1.05, y: -1 },
  tap: { scale: 0.96, y: 0 },
}

export function Header({ onToggleSidebar, isSidebarOpen }) {
  const { theme, toggleTheme } = useTheme()

  return (
    <header className="app-header">
      <div className="app-header__left">
        <button
          type="button"
          className="app-header__menu"
          onClick={onToggleSidebar}
          aria-expanded={isSidebarOpen}
          aria-label="Toggle navigation menu"
        >
          <Menu size={20} />
        </button>

        <div className="app-header__primary" aria-label="Primary actions">
          <Motion.button
            type="button"
            className="header-icon-button"
            variants={iconVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            aria-label="All dashboards"
          >
            <LayoutGrid size={18} />
          </Motion.button>
          <Motion.button
            type="button"
            className="header-icon-button"
            variants={iconVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            aria-label="Favorites"
          >
            <Star size={18} />
          </Motion.button>
        </div>

        <div className="app-header__breadcrumbs" aria-label="Breadcrumb">
          <span className="breadcrumb__section">Dashboards</span>
          <span className="breadcrumb__divider">/</span>
          <span className="breadcrumb__current">Default</span>
        </div>
      </div>

      <div className="app-header__right">
        <label className="search-field">
          <Search size={16} className="search-field__icon" aria-hidden="true" />
          <input
            className="search-field__input"
            placeholder="Search"
            aria-label="Search"
            type="search"
          />
          <span className="search-field__kbd">
            <Command size={13} aria-hidden="true" />
            <span>/</span>
          </span>
        </label>

        <div className="app-header__actions">
          <Motion.button
            type="button"
            className="icon-button"
            variants={iconVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            aria-label={theme === "light" ? "Switch to dark mode" : "Switch to light mode"}
            onClick={toggleTheme}
          >
            {theme === "light" ? <Sun size={18} /> : <Moon size={18} />}
          </Motion.button>

          <Motion.button
            type="button"
            className="icon-button"
            variants={iconVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            aria-label="Refresh data"
          >
            <RefreshCw size={18} />
          </Motion.button>

          <Motion.button
            type="button"
            className="icon-button"
            variants={iconVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            aria-label="Notifications"
          >
            <Bell size={18} />
          </Motion.button>

          <Motion.button
            type="button"
            className="icon-button"
            variants={iconVariants}
            initial="initial"
            whileHover="hover"
            whileTap="tap"
            aria-label="View apps"
          >
            <Square size={18} />
          </Motion.button>
        </div>
      </div>
    </header>
  )
}
