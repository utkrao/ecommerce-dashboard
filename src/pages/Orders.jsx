import { useEffect, useMemo, useState } from 'react'
import { motion as Motion } from 'framer-motion'
import {
  ArrowUpDown,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Filter,
  MoreHorizontal,
  Plus,
  Search,
} from 'lucide-react'
import '../styles/orders.css'
import { orders as ordersData, orderStatusOptions } from '../data/orders'
import { StatusBadge } from '../components/common/StatusBadge'

const pageSize = 6

const tableColumns = [
  { key: 'orderId', label: 'Order ID' },
  { key: 'user', label: 'User' },
  { key: 'project', label: 'Project' },
  { key: 'address', label: 'Address' },
  { key: 'date', label: 'Date' },
  { key: 'status', label: 'Status' },
]

export default function OrdersPage() {
  const [statusFilter, setStatusFilter] = useState('all')
  const [search, setSearch] = useState('')
  const [sortConfig, setSortConfig] = useState({ key: 'date', direction: 'desc' })
  const [page, setPage] = useState(1)
  const [selected, setSelected] = useState(new Set())

  useEffect(() => {
    setPage(1)
  }, [statusFilter, search])

  const filteredOrders = useMemo(() => {
    const query = search.trim().toLowerCase()

    const filtered = ordersData.filter((order) => {
      const matchesStatus = statusFilter === 'all' || order.status === statusFilter
      const haystack = `${order.orderId} ${order.user} ${order.project} ${order.address}`.toLowerCase()
      const matchesQuery = query.length === 0 || haystack.includes(query)
      return matchesStatus && matchesQuery
    })

    const sorted = [...filtered].sort((a, b) => {
      const { key, direction } = sortConfig
      const factor = direction === 'asc' ? 1 : -1

      if (key === 'date') {
        const aDate = new Date(a.date).getTime()
        const bDate = new Date(b.date).getTime()
        return (aDate - bDate) * factor
      }

      const aValue = String(a[key]).toLowerCase()
      const bValue = String(b[key]).toLowerCase()
      if (aValue < bValue) return -1 * factor
      if (aValue > bValue) return 1 * factor
      return 0
    })

    return sorted
  }, [statusFilter, search, sortConfig])

  const totalPages = Math.max(1, Math.ceil(filteredOrders.length / pageSize))

  useEffect(() => {
    setPage((current) => Math.min(current, totalPages))
  }, [totalPages])

  const paginatedOrders = useMemo(() => {
    const start = (page - 1) * pageSize
    return filteredOrders.slice(start, start + pageSize)
  }, [filteredOrders, page])

  const allSelected = paginatedOrders.length > 0 && paginatedOrders.every((order) => selected.has(order.orderId))

  const handleToggleAll = () => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (allSelected) {
        paginatedOrders.forEach((order) => next.delete(order.orderId))
      } else {
        paginatedOrders.forEach((order) => next.add(order.orderId))
      }
      return next
    })
  }

  const handleToggleRow = (orderId) => {
    setSelected((prev) => {
      const next = new Set(prev)
      if (next.has(orderId)) next.delete(orderId)
      else next.add(orderId)
      return next
    })
  }

  const handleSort = (key) => {
    setSortConfig((prev) => {
      if (prev.key === key) {
        return { key, direction: prev.direction === 'asc' ? 'desc' : 'asc' }
      }
      return { key, direction: key === 'date' ? 'desc' : 'asc' }
    })
  }

  const handlePageChange = (nextPage) => {
    setPage(Math.max(1, Math.min(nextPage, totalPages)))
  }

  const renderSortIcon = (columnKey) => {
    if (sortConfig.key !== columnKey) return <ArrowUpDown size={14} />
    return sortConfig.direction === 'asc' ? <span className="sort-arrow">↑</span> : <span className="sort-arrow">↓</span>
  }

  const pageNumbers = useMemo(() => {
    if (totalPages <= 5) {
      return Array.from({ length: totalPages }, (_, index) => index + 1)
    }
    if (page <= 3) return [1, 2, 3, 4, '...', totalPages]
    if (page >= totalPages - 2) return [1, '...', totalPages - 3, totalPages - 2, totalPages - 1, totalPages]
    return [1, '...', page - 1, page, page + 1, '...', totalPages]
  }, [page, totalPages])

  const startIndex = filteredOrders.length === 0 ? 0 : (page - 1) * pageSize + 1
  const endIndex = Math.min(page * pageSize, filteredOrders.length)

  return (
    <div className="orders">
      <header className="orders__header">

        <h1 className="orders__title">Order List</h1>

        {selected.size > 0 ? <span className="orders__selection">Selected {selected.size}</span> : null}

      </header>



      <div className="orders__bar">

        <div className="orders__bar-actions">

          <button type="button" className="orders__tool" aria-label="Create order">

            <Plus size={16} />

          </button>

          <button type="button" className="orders__tool" aria-label="Filter orders">

            <Filter size={16} />

          </button>

          <button

            type="button"

            className="orders__tool"

            aria-label="Sort orders"

            onClick={() => handleSort(sortConfig.key)}

          >

            <ArrowUpDown size={16} />

          </button>

        </div>



        <div className="orders__filters">

          <label className="orders__search" htmlFor="orders-search">

            <Search size={16} aria-hidden="true" />

            <input

              id="orders-search"

              placeholder="Search orders"

              value={search}

              onChange={(event) => setSearch(event.target.value)}

            />

          </label>

          <select

            className="orders__select"

            value={statusFilter}

            onChange={(event) => setStatusFilter(event.target.value)}

          >

            {orderStatusOptions.map((option) => (

              <option key={option.value} value={option.value}>

                {option.label}

              </option>

            ))}

          </select>

        </div>

      </div>



      <div className="orders__table card">
        <table>
          <thead>
            <tr>
              <th>
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={handleToggleAll}
                  aria-label="Select all"
                />
              </th>
              {tableColumns.map((column) => (
                <th key={column.key}>
                  <button type="button" onClick={() => handleSort(column.key)}>
                    {column.label}
                    {renderSortIcon(column.key)}
                  </button>
                </th>
              ))}
              <th aria-label="Actions" />
            </tr>
          </thead>
          <tbody>
            {paginatedOrders.length === 0 ? (
              <tr>
                <td colSpan={tableColumns.length + 2} className="orders__empty">
                  No orders match the current filters.
                </td>
              </tr>
            ) : (
              paginatedOrders.map((order) => {
                const isChecked = selected.has(order.orderId)
                return (
                  <Motion.tr
                    key={order.orderId}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 24 }}
                    className={isChecked ? 'is-selected' : ''}
                  >
                    <td>
                      <input
                        type="checkbox"
                        checked={isChecked}
                        onChange={() => handleToggleRow(order.orderId)}
                        aria-label={`Select ${order.orderId}`}
                      />
                    </td>
                    <td className="orders__cell--id">
                      <span>{order.orderId}</span>
                    </td>
                    <td className="orders__cell--user">
                      <img src={order.avatar} alt="" aria-hidden="true" />
                      <div>
                        <span className="orders__user-name">{order.user}</span>
                        <span className="orders__user-meta">{order.project}</span>
                      </div>
                    </td>
                    <td>{order.project}</td>
                    <td>{order.address}</td>
                    <td className="orders__cell--date">
                      <Calendar size={14} aria-hidden="true" />
                      <span>{order.dateLabel}</span>
                    </td>
                    <td>
                      <StatusBadge status={order.status} />
                    </td>
                    <td className="orders__cell--actions">
                      <button type="button" className="orders__icon">
                        <MoreHorizontal size={16} />
                      </button>
                    </td>
                  </Motion.tr>
                )
              })
            )}
          </tbody>
        </table>
      </div>

      <footer className="orders__footer">
        <span>
          Showing {startIndex}-{endIndex} of {filteredOrders.length} orders
        </span>
        <div className="orders__pagination">
          <button type="button" onClick={() => handlePageChange(page - 1)} disabled={page === 1}>
            <ChevronLeft size={16} />
          </button>
          {pageNumbers.map((value) => (
            <button
              key={value}
              type="button"
              className={value === page ? 'is-active' : ''}
              onClick={() => {
                if (value === '...') return
                handlePageChange(value)
              }}
              disabled={value === '...'}
            >
              {value}
            </button>
          ))}
          <button type="button" onClick={() => handlePageChange(page + 1)} disabled={page === totalPages}>
            <ChevronRight size={16} />
          </button>
        </div>
      </footer>
    </div>
  )
}
