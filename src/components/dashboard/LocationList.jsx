import { useTheme } from '../../theme/ThemeProvider'

export function LocationList({ data }) {
  const { theme } = useTheme()
  const max = Math.max(...data.map((item) => item.amount))

  const markerPositions = {
    'New York': { top: '38%', left: '29%' },
    'San Francisco': { top: '42%', left: '18%' },
    'Sydney': { top: '74%', left: '87%' },
    'Singapore': { top: '60%', left: '82%' },
  }

  const mapSrc = theme === 'dark' ? '/world-map-dark.svg' : '/world-map-light.svg'

  return (
    <div className="location-list">
      <div className="location-map" aria-hidden="true">
        <img src={mapSrc} alt="" loading="lazy" className="location-map__image" />
        {data.map((item) => {
          const coords = markerPositions[item.city]
          if (!coords) return null
          return <span key={item.city} className="location-map__marker" style={coords} />
        })}
      </div>
      <ul>
        {data.map((item) => {
          const percentage = Math.round((item.amount / max) * 100)
          return (
            <li key={item.city}>
              <span className="location-list__name">{item.city}</span>
              <span className="location-list__value">{Math.round(item.amount / 1000)}K</span>
              <div className="location-list__bar">
                <div style={{ width: `${percentage}%` }} />
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
