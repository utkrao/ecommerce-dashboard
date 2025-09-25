import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"

const COLORS = {
  actual: "#7ea8ff",
  lift: "#d9e8ff",
}

function ProjectionTooltip({ active, payload }) {
  if (!active || !payload?.length) return null

  const source = payload[0]?.payload
  const actualVal = source?.actual ?? 0
  const projectedVal = source?.projectedTotal ?? actualVal

  return (
    <div className="chart-tooltip">
      <strong>{source?.label}</strong>
      <div className="chart-tooltip__item">
        <span className="chart-tooltip__dot chart-tooltip__dot--current" aria-hidden="true" />
        <span>Actual {actualVal}M</span>
      </div>
      <div className="chart-tooltip__item">
        <span className="chart-tooltip__dot chart-tooltip__dot--previous" aria-hidden="true" />
        <span>Projected {projectedVal}M</span>
      </div>
    </div>
  )
}

export function ProjectionsChart({ data }) {
  const chartData = data.map((item) => {
    const lift = Math.max(item.projected - item.actual, 0)
    return {
      label: item.label,
      actual: item.actual,
      projectionLift: lift,
      projectedTotal: item.projected,
    }
  })

  return (
    <ResponsiveContainer width="100%" height={208}>
      <BarChart data={chartData} barSize={24} barCategoryGap="40%">
        <CartesianGrid strokeDasharray="4 12" vertical={false} stroke="rgba(148, 163, 184, 0.18)" />
        <XAxis
          dataKey="label"
          axisLine={false}
          tickLine={false}
          dy={8}
          fontSize={12}
          fill="rgba(71, 84, 103, 0.72)"
        />
        <YAxis hide domain={[0, (max) => max + 6]} />
        <Tooltip cursor={{ fill: "rgba(206, 223, 255, 0.25)" }} content={<ProjectionTooltip />} />
        <Bar
          dataKey="actual"
          stackId="stack"
          radius={[10, 10, 4, 4]}
          fill={COLORS.actual}
        />
        <Bar
          dataKey="projectionLift"
          stackId="stack"
          radius={[10, 10, 10, 10]}
          fill={COLORS.lift}
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
