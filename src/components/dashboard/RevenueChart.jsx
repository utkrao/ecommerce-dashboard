import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null
  const [current, previous] = payload

  return (
    <div className="chart-tooltip">
      <strong>{current.payload.month}</strong>
      <div className="chart-tooltip__item">
        <span className="chart-tooltip__dot chart-tooltip__dot--current" aria-hidden="true" />
        <span>Current week ${current.value.toFixed(1)}k</span>
      </div>
      <div className="chart-tooltip__item">
        <span className="chart-tooltip__dot chart-tooltip__dot--previous" aria-hidden="true" />
        <span>Previous week ${previous.value.toFixed(1)}k</span>
      </div>
    </div>
  )
}

export function RevenueChart({ data }) {
  return (
    <ResponsiveContainer width="100%" height={260}>
      <ComposedChart data={data} margin={{ top: 12, right: 8, bottom: 0, left: 0 }}>
        <defs>
          <linearGradient id="currentArea" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#bfd6ff" stopOpacity={0.55} />
            <stop offset="95%" stopColor="#d9e7ff" stopOpacity={0.05} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} stroke="rgba(148, 163, 184, 0.28)" strokeDasharray="6 8" />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          dy={8}
          fontSize={12}
          fill="rgba(71, 84, 103, 0.78)"
        />
        <YAxis hide domain={[0, "dataMax + 10"]} />
        <Tooltip cursor={{ stroke: "rgba(148, 163, 184, 0.32)", strokeWidth: 2 }} content={<CustomTooltip />} />
        <Area type="monotone" dataKey="current" fill="url(#currentArea)" stroke="none" />
        <Line
          type="monotone"
          dataKey="current"
          stroke="#2563eb"
          strokeWidth={3}
          dot={{ r: 4, strokeWidth: 2, stroke: "#ffffff" }}
          activeDot={{ r: 6 }}
        />
        <Line
          type="monotone"
          dataKey="previous"
          stroke="#111827"
          strokeWidth={2}
          strokeDasharray="5 6"
          dot={false}
        />
      </ComposedChart>
    </ResponsiveContainer>
  )
}
