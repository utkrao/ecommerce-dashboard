import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts'

function SalesTooltip({ active, payload }) {
  if (!active || !payload?.length) return null
  const item = payload[0]
  return (
    <div className="chart-tooltip">
      <strong>{item.name}</strong>
      <span>${item.value.toLocaleString()}</span>
    </div>
  )
}

export function SalesDonut({ data }) {
  const total = data.reduce((sum, item) => sum + item.value, 0)
  const primary = data[0]
  const percentage = Math.round((primary.value / total) * 100)

  return (
    <div className="donut-chart">
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Tooltip content={<SalesTooltip />} />
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={58}
            outerRadius={86}
            paddingAngle={6}
            cornerRadius={10}
          >
            {data.map((entry) => (
              <Cell key={entry.name} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div className="donut-chart__center">
        <span className="donut-chart__value">{percentage}%</span>
        <span className="donut-chart__label">{primary.name}</span>
      </div>
      <ul className="donut-chart__legend">
        {data.map((item) => (
          <li key={item.name}>
            <span style={{ background: item.color }} />
            <div>
              <strong>{item.name}</strong>
              <span>${item.value.toFixed(2)}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
