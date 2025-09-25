from pathlib import Path
path = Path('src/components/dashboard/RevenueChart.jsx')
text = path.read_text()
old = "      <span>Current week ? ${current.value}k</span>\r\n      <span>Previous week ? ${previous.value}k</span>"
if old not in text:
    raise SystemExit(repr(text.splitlines()[17]))
new = "      <div className=\"chart-tooltip\__item\">\r\n        <span className=\"chart-tooltip\__dot chart-tooltip\__dot--current\" aria-hidden=\"true\" />\r\n        <span>Current week ${current.value.toFixed(1)}k</span>\r\n      </div>\r\n      <div className=\"chart-tooltip\__item\">\r\n        <span className=\"chart-tooltip\__dot chart-tooltip\__dot--previous\" aria-hidden=\"true\" />\r\n        <span>Previous week ${previous.value.toFixed(1)}k</span>\r\n      </div>"
text = text.replace(old, new)
path.write_text(text)
