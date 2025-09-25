const statusMap = {
  'in-progress': { label: 'In Progress', color: '#6366f1' },
  complete: { label: 'Complete', color: '#10b981' },
  pending: { label: 'Pending', color: '#3b82f6' },
  approved: { label: 'Approved', color: '#f59e0b' },
  rejected: { label: 'Rejected', color: '#ef4444' },
}

export function StatusBadge({ status }) {
  const current = statusMap[status] ?? { label: status, color: 'var(--text-secondary)' }
  return (
    <span className="status-badge" style={{ '--status-color': current.color }}>
      <span aria-hidden="true" />
      {current.label}
    </span>
  )
}
