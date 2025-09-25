export function LocationList({ data }) {
  const max = Math.max(...data.map((item) => item.amount))
  const markerPositions = {
    'New York': { top: '42%', left: '27%' },
    'San Francisco': { top: '45%', left: '18%' },
    'Sydney': { top: '72%', left: '86%' },
    'Singapore': { top: '58%', left: '80%' },
  }

  return (
    <div className="location-list">
      <div className="location-map" aria-hidden="true">
        {data.map((item) => {
          const coords = markerPositions[item.city]
          if (!coords) return null
          return <span key={item.city} className="location-map__marker" style={coords} />
        })}
      </div>
      <ul>
        {data.map((item) => (
          <li key={item.city}>
            <span className="location-list__name">{item.city}</span>
            <span className="location-list__value">{Math.round(item.amount / 1000)}K</span>
            <div className="location-list__bar">
              <div style={{ width: `${Math.round((item.amount / max) * 100)}%` }} />
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
