import { motion as Motion } from "framer-motion"
import { Bug, Radio, UserPlus } from "lucide-react"
import "../styles/home.css"
import "../styles/cards.css"
import {
  activities,
  contacts,
  locationRevenue,
  notifications,
  projectionsData,
  revenueTrend,
  summaryStats,
  topProducts,
  totalSalesSegments,
} from "../data/home"
import { SummaryStatCard } from "../components/dashboard/SummaryStatCard"
import { RevenueChart } from "../components/dashboard/RevenueChart"
import { ProjectionsChart } from "../components/dashboard/ProjectionsChart"
import { LocationList } from "../components/dashboard/LocationList"
import { SalesDonut } from "../components/dashboard/SalesDonut"

const sectionVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

const notificationIconMap = {
  Bug,
  UserPlus,
  Radio,
}

export default function HomePage() {
  return (
    <div className="home" aria-labelledby="home-heading">
      <div className="home__main">
      <div className="home__intro">
        <div>
          <h1 className="home__title">eCommerce</h1>
          <p className="home__subtitle">Dashboard overview</p>
        </div>
      </div>
        <Motion.section
          className="home__analytics"
          initial="hidden"
          animate="visible"
          variants={sectionVariants}
          transition={{ staggerChildren: 0.08 }}
        >
          <div className="home__top-layout">
            <div className="metrics-grid">
              {summaryStats.map((stat) => (
                <SummaryStatCard key={stat.id} {...stat} />
              ))}
            </div>

            <Motion.article
              className="card home__projections-card"
              variants={cardVariants}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 240, damping: 24 }}
            >
              <header className="card__header">
                <h2 className="card__title">Projections vs Actuals</h2>
                <p className="card__subtitle">Year to date</p>
              </header>
              <ProjectionsChart data={projectionsData} />
            </Motion.article>
          </div>

          <div className="insights-grid">
            <Motion.article
              className="card insights-grid__revenue"
              variants={cardVariants}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 240, damping: 24 }}
            >
              <header className="card__header">
                <div>
                  <h2 className="card__title">Revenue</h2>
                  <div className="card__legend" role="list">
                    <span className="card__legend-item" role="listitem">
                      <span className="card__legend-dot card__legend-dot--current" aria-hidden="true" />
                      Current Week <strong>$58,211</strong>
                    </span>
                    <span className="card__legend-divider" aria-hidden="true" />
                    <span className="card__legend-item" role="listitem">
                      <span className="card__legend-dot card__legend-dot--previous" aria-hidden="true" />
                      Previous Week <strong>$68,768</strong>
                    </span>
                  </div>
                </div>
                <div className="card__toolbar">
                  <span className="tag-pill">
                    <span className="tag-pill__dot" aria-hidden="true" /> Jan - Jun
                  </span>
                </div>
              </header>
              <RevenueChart data={revenueTrend} />
            </Motion.article>

            <Motion.article
              className="card insights-grid__location"
              variants={cardVariants}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 240, damping: 24 }}
            >
              <header className="card__header">
                <h2 className="card__title">Revenue by Location</h2>
                <p className="card__subtitle">Top performing cities</p>
              </header>
              <LocationList data={locationRevenue} />
            </Motion.article>

            <Motion.article
              className="card insights-grid__products table-card"
              variants={cardVariants}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 240, damping: 24 }}
            >
              <header className="card__header">
                <h2 className="card__title">Top Selling Products</h2>
                <p className="card__subtitle">Last 30 days</p>
              </header>
              <div className="table-wrapper">
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {topProducts.map((product) => (
                      <tr key={product.name}>
                        <td>{product.name}</td>
                        <td>${product.price.toFixed(2)}</td>
                        <td>{product.quantity}</td>
                        <td>${product.amount.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Motion.article>

            <Motion.article
              className="card insights-grid__sales"
              variants={cardVariants}
              whileHover={{ y: -4 }}
              transition={{ type: "spring", stiffness: 240, damping: 24 }}
            >
              <header className="card__header">
                <h2 className="card__title">Total Sales</h2>
                <p className="card__subtitle">Channel performance</p>
              </header>
              <SalesDonut data={totalSalesSegments} />
            </Motion.article>
          </div>
        </Motion.section>
      </div>

      <Motion.aside
        className="home__aside"
        initial={{ opacity: 0, x: 32 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.12, type: "spring", stiffness: 240, damping: 28 }}
        aria-label="Secondary information"
      >
        <section className="card aside-card">
          <header className="aside-card__header">
            <h2 className="aside-card__title">Notifications</h2>
          </header>
          <ul className="aside-list">
            {notifications.map((item) => {
              const Icon = notificationIconMap[item.icon] ?? Bug
              return (
                <li key={item.id} className="aside-list__item">
                  <span className="aside-list__icon" aria-hidden="true">
                    <Icon size={16} />
                  </span>
                  <div>
                    <span className="aside-list__title">{item.title}</span>
                    <span className="aside-list__meta">{item.time}</span>
                  </div>
                </li>
              )
            })}
          </ul>
        </section>

        <section className="card aside-card">
          <header className="aside-card__header">
            <h2 className="aside-card__title">Activities</h2>
          </header>
          <ul className="timeline-list">
            {activities.map((item, index) => (
              <li key={item.id} className="timeline-item">
                <div className="timeline-avatar" aria-hidden="true">
                  <img src={item.avatar} alt="" />
                </div>
                <div className="timeline-copy">
                  <span className="timeline-copy__title">{item.title}</span>
                  <span className="timeline-copy__meta">{item.time}</span>
                </div>
                {index < activities.length - 1 && (
                  <span className="timeline-stem" aria-hidden="true" />
                )}
              </li>
            ))}
          </ul>
        </section>

        <section className="card aside-card">
          <header className="aside-card__header">
            <h2 className="aside-card__title">Contacts</h2>
          </header>
          <ul className="contact-list">
            {contacts.map((contact) => (
              <li key={contact.id}>
                <img src={contact.avatar} alt={contact.name} loading="lazy" />
                <div>
                  <span className="contact-list__name">{contact.name}</span>
                  <span className="contact-list__role">{contact.role}</span>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </Motion.aside>
    </div>
  )
}






