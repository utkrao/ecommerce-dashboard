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
import { useMemo } from "react"
import { useTheme } from "../../theme/ThemeProvider"
import { useMediaQuery } from "../../hooks/useMediaQuery"

const CHART_THEME = {
  light: {
    grid: "rgba(148, 163, 184, 0.22)",
    axis: "rgba(71, 84, 103, 0.75)",
    cursor: "rgba(148, 163, 184, 0.22)",
    area: { from: "#bfd6ff", to: "rgba(189, 214, 255, 0)" },
    current: "#2563eb",
    previous: "#1f2937",
    dotStroke: "#ffffff",
  },
  dark: {
    grid: "rgba(117, 130, 158, 0.28)",
    axis: "rgba(224, 229, 244, 0.88)",
    cursor: "rgba(150, 174, 255, 0.22)",
    area: { from: "rgba(125, 162, 255, 0.55)", to: "rgba(17, 24, 39, 0.05)" },
    current: "#94b6ff",
    previous: "#d4c6ff",
    dotStroke: "#101828",
  },
}

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
  const { theme } = useTheme()
  const palette = CHART_THEME[theme] ?? CHART_THEME.light
  const gradientId = useMemo(() => `revenue-current-${theme}`, [theme])
  const isCompact = useMediaQuery('(max-width: 900px)')
  const chartHeight = isCompact ? 210 : 260
  const axisTick = { fill: palette.axis, fontSize: isCompact ? 11 : 12 }
  const xInterval = isCompact ? 1 : 0

  return (
    <ResponsiveContainer width="100%" height={chartHeight}>
      <ComposedChart data={data} margin={{ top: 12, right: 8, bottom: isCompact ? 4 : 0, left: isCompact ? -4 : 0 }}>
        <defs>
          <linearGradient id={gradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="3%" stopColor={palette.area.from} stopOpacity={1} />
            <stop offset="75%" stopColor={palette.area.to} stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid vertical={false} stroke={palette.grid} strokeDasharray="6 8" />
        <XAxis
          dataKey="month"
          tickLine={false}
          axisLine={false}
          dy={8}
          interval={xInterval}
          tick={axisTick}
        />
        <YAxis hide domain={[0, "dataMax + 10"]} />
        <Tooltip cursor={{ stroke: palette.cursor, strokeWidth: 2 }} content={<CustomTooltip />} />
        <Area type="monotone" dataKey="current" fill={`url(#${gradientId})`} stroke="none" />
        <Line
          type="monotone"
          dataKey="current"
          stroke={palette.current}
          strokeWidth={3}
          strokeLinecap="round"
          dot={{ r: 4, strokeWidth: 2, stroke: palette.dotStroke, fill: palette.current }}
          activeDot={{ r: 6, strokeWidth: 0, fill: palette.current }}
        />
        <Line
          type="monotone"
          dataKey="previous"
          stroke={palette.previous}
          strokeWidth={2.4}
          strokeDasharray="3 6"
          strokeLinecap="round"
          dot={false}
        />
      </ComposedChart>
    </ResponsiveContainer>
  )
}
