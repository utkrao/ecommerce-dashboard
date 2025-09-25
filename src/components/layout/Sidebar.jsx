import { useState } from "react"
import { AnimatePresence, motion as Motion } from "framer-motion"
import {
  Building2,
  ChevronDown,
  ClipboardList,
  Folder,
  GraduationCap,
  LayoutDashboard,
  ListOrdered,
  Share2,
  ShoppingBag,
  Settings,
  Star,
  UserRound,
  Notebook,
} from "lucide-react"
import { NavLink } from "react-router-dom"
import { navigationSections } from "../../data/navigation"
import "../../styles/sidebar.css"

const iconMap = {
  Building2,
  ChevronDown,
  ClipboardList,
  Folder,
  GraduationCap,
  LayoutDashboard,
  ListOrdered,
  Share2,
  ShoppingBag,
  Settings,
  Star,
  UserRound,
  Notebook,
}

const listVariants = {
  hidden: { opacity: 0, y: 6 },
  visible: { opacity: 1, y: 0, transition: { staggerChildren: 0.05 } },
}

const itemVariants = {
  hidden: { opacity: 0, x: -8 },
  visible: (index) => ({
    opacity: 1,
    x: 0,
    transition: { delay: index * 0.03, type: "spring", stiffness: 320, damping: 24 },
  }),
}

export function Sidebar({ onNavigate, isDesktop }) {
  const [openGroups, setOpenGroups] = useState(new Set(["user-profile"]))

  const favorites = navigationSections.find((section) => section.id === "favorites")?.items ?? []
  const mainSections = navigationSections.filter((section) => section.id !== "favorites")

  const toggleGroup = (id) => {
    setOpenGroups((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  return (
    <aside className="sidebar" aria-label="Primary navigation">
      <div className="sidebar__brand">
        <img
          className="sidebar__avatar"
          src="https://i.pravatar.cc/64?img=47"
          alt="ByeWind"
          width={44}
          height={44}
        />
        <span className="sidebar__brand-name">ByeWind</span>
      </div>

      <div className="sidebar__switcher" role="tablist" aria-label="Shortcuts">
        <span className="sidebar__switcher-item is-active" role="tab" aria-selected="true">
          Favorites
        </span>
        <span className="sidebar__switcher-item" role="tab" aria-selected="false">
          Recently
        </span>
      </div>

      <nav className="sidebar__favorites" aria-label="Favourite links">
        <ul>
          {favorites.map((item) => {
            const Icon = iconMap[item.icon] ?? CircleIcon
            return (
              <li key={item.id}>
                <span className="sidebar__glyph" aria-hidden="true">
                  <Icon size={16} strokeWidth={1.8} />
                </span>
                <a href={item.href}>{item.label}</a>
              </li>
            )
          })}
        </ul>
      </nav>

      <nav className="sidebar__nav" aria-label="Navigation">
        {mainSections.map((section) => (
          <div key={section.id} className="sidebar__section">
            <span className="sidebar__section-label">{section.label}</span>
            <Motion.ul className="sidebar__list" initial="hidden" animate="visible" variants={listVariants}>
              {section.items.map((item, index) => {
                const Icon = iconMap[item.icon] ?? CircleIcon
                const hasChildren = Array.isArray(item.children) && item.children.length > 0

                if (hasChildren) {
                  const isOpen = openGroups.has(item.id)
                  return (
                    <Motion.li
                      key={item.id}
                      className="sidebar__item sidebar__item--group"
                      custom={index}
                      variants={itemVariants}
                    >
                      <button
                        type="button"
                        className="sidebar__entry sidebar__entry--group sidebar__entry--static"
                        aria-expanded={isOpen}
                        onClick={() => toggleGroup(item.id)}
                      >
                        <span className={`sidebar__caret ${isOpen ? "is-open" : ""}`} aria-hidden="true">
                          <ChevronDown size={14} strokeWidth={1.3} />
                        </span>
                        <span className="sidebar__glyph" aria-hidden="true">
                          <Icon size={18} strokeWidth={1.6} />
                        </span>
                        <span className="sidebar__label">{item.label}</span>
                      </button>
                      <AnimatePresence initial={false}>
                        {isOpen ? (
                          <Motion.ul
                            key="subnav"
                            className="sidebar__sublist"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                          >
                            {item.children.map((child) => (
                              <li key={child.id}>
                                <a className="sidebar__sublink" href={child.href}>
                                  {child.label}
                                </a>
                              </li>
                            ))}
                          </Motion.ul>
                        ) : null}
                      </AnimatePresence>
                    </Motion.li>
                  )
                }

                return (
                  <Motion.li key={item.id} className="sidebar__item" custom={index} variants={itemVariants}>
                    <NavLink
                      to={item.href ?? "#"}
                      end={item.href === "/"}
                      className={({ isActive }) => {
                        const isNavigable = Boolean(item.href && item.href !== "#")
                        const shouldHighlight = isNavigable && isActive
                        return [
                          "sidebar__entry",
                          "sidebar__entry--link",
                          shouldHighlight ? "is-active" : "",
                        ]
                          .filter(Boolean)
                          .join(" ")
                      }}
                      onClick={(event) => {
                        if (!item.href || item.href === "#") {
                          event.preventDefault()
                          return
                        }
                        if (!isDesktop) onNavigate?.()
                      }}
                    >
                      <span className="sidebar__glyph" aria-hidden="true">
                        <Icon size={18} strokeWidth={1.6} />
                      </span>
                      <span className="sidebar__label">{item.label}</span>
                    </NavLink>
                  </Motion.li>
                )
              })}
            </Motion.ul>
          </div>
        ))}
      </nav>
    </aside>
  )
}

function CircleIcon() {
  return <span className="sidebar__glyph sidebar__glyph--dot" aria-hidden="true" />
}

