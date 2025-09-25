import { useMemo } from "react"
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { useTheme } from "../../theme/ThemeProvider"

const THEMES = {
  light: {
    grid: "rgba(148, 163, 184, 0.18)",
    axis: "rgba(71, 84, 103, 0.72)",
    cursorFill: "rgba(206, 223, 255, 0.22)",
    bars: {
      actual: { from: "#7ea8ff", to: "#4f6bdc" },
      lift: { from: "rgba(210, 225, 255, 0.95)", to: "rgba(210, 225, 255, 0.35)" },
    },
  },
  dark: {
    grid: "rgba(117, 129, 160, 0.3)",
    axis: "rgba(224, 229, 244, 0.88)",
    cursorFill: "rgba(145, 169, 255, 0.18)",
    bars: {
      actual: { from: "#94b6ff", to: "#495fb5" },
      lift: { from: "rgba(132, 168, 255, 0.45)", to: "rgba(132, 168, 255, 0.18)" },
    },
  },
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
  const { theme } = useTheme()
  const palette = THEMES[theme] ?? THEMES.light
  const actualGradientId = useMemo(() => `projection-actual-${theme}`, [theme])
  const liftGradientId = useMemo(() => `projection-lift-${theme}`, [theme])

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
        <defs>
          <linearGradient id={actualGradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="6%" stopColor={palette.bars.actual.from} stopOpacity={1} />
            <stop offset="100%" stopColor={palette.bars.actual.to} stopOpacity={1} />
          </linearGradient>
          <linearGradient id={liftGradientId} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={palette.bars.lift.from} stopOpacity={1} />
            <stop offset="100%" stopColor={palette.bars.lift.to} stopOpacity={1} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="4 12" vertical={false} stroke={palette.grid} />
        <XAxis
          dataKey="label"
          axisLine={false}
          tickLine={false}
          dy={8}
          tick={{ fill: palette.axis, fontSize: 12 }}
        />
        <YAxis hide domain={[0, (max) => max + 6]} />
        <Tooltip cursor={{ fill: palette.cursorFill }} content={<ProjectionTooltip />} />
        <Bar dataKey="actual" stackId="stack" radius={[12, 12, 4, 4]} fill={`url(#${actualGradientId})`} />
        <Bar dataKey="projectionLift" stackId="stack" radius={[12, 12, 12, 12]} fill={`url(#${liftGradientId})`} />
      </BarChart>
    </ResponsiveContainer>
  )
}
