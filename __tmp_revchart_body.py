from pathlib import Path
path = Path("RevenueChart.jsx")
text = path.read_text()
old = "export function RevenueChart({ data }) {\n  const { theme } = useTheme()\n  const palette = CHART_THEME[theme] ?? CHART_THEME.light\n  const gradientId = useMemo(() => `revenue-current-${theme}`, [theme])\n\n  return (\n    <ResponsiveContainer width=\"100%\" height={260}>\n      <ComposedChart data={data} margin={{ top: 12, right: 8, bottom: 0, left: 0 }}>\n"
new = "export function RevenueChart({ data }) {\n  const { theme } = useTheme()\n  const palette = CHART_THEME[theme] ?? CHART_THEME.light\n  const gradientId = useMemo(() => `revenue-current-${theme}`, [theme])\n  const isCompact = useMediaQuery('(max-width: 900px)')\n  const chartHeight = isCompact ? 210 : 260\n  const axisTick = { fill: palette.axis, fontSize: isCompact ? 11 : 12 }\n  const xInterval = isCompact ? 1 : 0\n\n  return (\n    <ResponsiveContainer width=\"100%\" height={chartHeight}>\n      <ComposedChart data={data} margin={{ top: 12, right: 8, bottom: isCompact ? 4 : 0, left: isCompact ? -4 : 0 }}>\n"
if old not in text:
    raise SystemExit('pattern missing')
text = text.replace(old, new, 1)
y_axis_old = "        <XAxis\n          dataKey=\"month\"\n          tickLine={false}\n          axisLine={false}\n          dy={8}\n          tick={{ fill: palette.axis, fontSize: 12 }}\n        />\n"
y_axis_new = "        <XAxis\n          dataKey=\"month\"\n          tickLine={false}\n          axisLine={false}\n          dy={8}\n          interval={xInterval}\n          tick={axisTick}\n        />\n"
if y_axis_old not in text:
    raise SystemExit('x axis block missing')
text = text.replace(y_axis_old, y_axis_new, 1)
path.write_text(text)
