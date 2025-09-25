import { useState } from "react"
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"
import { useTheme } from "../../theme/ThemeProvider"

const DONUT_COLORS = {
  light: {
    Direct: "#111827",
    Affiliate: "#CCEED9",
    Sponsored: "#B5C2FF",
    'E-mail': "#BEE4FF",
  },
  dark: {
    Direct: "#111111",
    Affiliate: "#BDECC6",
    Sponsored: "#A3AEFF",
    'E-mail': "#A8DEFF",
  },
}

function SalesTooltip({ active, payload, total }) {
  if (!active || !payload?.length) return null
  const item = payload[0]
  const percent = total > 0 ? ((item.value / total) * 100).toFixed(1).replace(/\.0$/, '') : '0'

  return (
    <div className="chart-tooltip chart-tooltip--solid">
      <strong>{item.name}</strong>
      <span>{percent}% - ${item.value.toFixed(2)}</span>
    </div>
  )
}

export function SalesDonut({ data }) {
  const { theme } = useTheme()
  const colorMap = DONUT_COLORS[theme] ?? DONUT_COLORS.light
  const chartData = data.map((item) => ({
    ...item,
    color: colorMap[item.name] ?? item.color,
  }))

  const total = chartData.reduce((sum, item) => sum + item.value, 0)
  const primary = chartData[0]
  const [hovered, setHovered] = useState(null)

  const focusName = hovered ?? primary?.name
  const focusEntry = focusName ? chartData.find((entry) => entry.name === focusName) : null
  const focusPercent = focusEntry && total > 0 ? ((focusEntry.value / total) * 100).toFixed(1).replace(/\.0$/, '') : '--'

  const ringStroke = theme === 'dark' ? '#0b1324' : '#f5f8ff'

  return (
    <div className="donut-chart">
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Tooltip cursor={{ fill: 'transparent' }} content={(props) => <SalesTooltip {...props} total={total} />} />
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={62}
            outerRadius={92}
            startAngle={90}
            endAngle={-270}
            paddingAngle={3}
            cornerRadius={18}
            stroke={ringStroke}
            strokeWidth={6}
            onMouseLeave={() => setHovered(null)}
            onMouseEnter={(_, index) => setHovered(chartData[index]?.name ?? null)}
          >
            {chartData.map((entry) => (
              <Cell
                key={entry.name}
                fill={entry.color}
                stroke={ringStroke}
                strokeWidth={6}
                opacity={!hovered || hovered === entry.name ? 1 : 0.35}
              />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      {focusEntry ? (
        <div className="donut-chart__callout">{focusPercent}%</div>
      ) : null}
      <ul className="donut-chart__legend">
        {chartData.map((item) => {
          const isHovered = hovered === item.name
          return (
            <li
              key={item.name}
              className={isHovered ? "is-hovered" : ""}
              onMouseEnter={() => setHovered(item.name)}
              onMouseLeave={() => setHovered(null)}
            >
              <div className="donut-chart__legend-label">
                <span className="donut-chart__legend-dot" style={{ background: item.color }} />
                <span>{item.name}</span>
              </div>
              <span className="donut-chart__legend-value">${item.value.toFixed(2)}</span>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
