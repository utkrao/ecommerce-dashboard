import { ArrowDownRight, ArrowUpRight } from "lucide-react"
import { motion as Motion } from "framer-motion"
import "../../styles/cards.css"

export function SummaryStatCard({ id, label, value, delta, trend }) {
  const isPositive = trend !== "down"
  return (
    <Motion.article
      className={`summary-card summary-card--${id}`}
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 260, damping: 26 }}
      whileHover={{ y: -4 }}
    >
      <div className="summary-card__top">
        <span className="summary-card__label">{label}</span>
        <span className={`summary-card__delta ${isPositive ? "is-positive" : "is-negative"}`}>
          {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
          {delta}
        </span>
      </div>
      <div className="summary-card__value">{value}</div>
    </Motion.article>
  )
}
