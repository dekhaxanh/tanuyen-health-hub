import { Link } from "@tanstack/react-router";
import CountUpModule from "react-countup";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const CountUp = CountUpModule.default;
const statsContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const statCard = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: "easeOut" } },
};

export default function DoiNguThongKe({ stats = [], primaryColor = "#0091E0" }) {
  return (
    <section className="relative isolate overflow-hidden py-14 sm:py-16" style={{ backgroundColor: "#f8fafc" }} aria-labelledby="doi-ngu-title">
      <div aria-hidden="true" className="pointer-events-none absolute -left-24 top-8 -z-10 size-64 rounded-full blur-3xl" style={{ backgroundColor: primaryColor, opacity: 0.09 }} />
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 bottom-0 -z-10 size-72 rounded-full blur-3xl" style={{ backgroundColor: primaryColor, opacity: 0.07 }} />
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-kicker" style={{ color: primaryColor }}>Đội ngũ nhân sự</p>
          <h2 id="doi-ngu-title" className="section-title">Đội ngũ nhân sự giàu kinh nghiệm</h2>
        </div>
        <motion.div
          className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6 lg:gap-4"
          variants={statsContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {stats.map((item) => (
            <motion.article key={`${item.label}-${item.so}`} variants={statCard} whileHover={{ scale: 1.03 }} className="staff-stat-card">
                <strong className="staff-stat-number" style={{ color: primaryColor }}>
                  <CountUp end={Number(item.so)} duration={2.5} easing="easeOut" enableScrollSpy scrollSpyOnce suffix="+" />
                </strong>
                <span className="staff-stat-label">{item.label}</span>
            </motion.article>
          ))}
        </motion.div>
        <div className="mt-9 flex justify-center">
          <Button asChild variant="outline" className="rounded-lg border-primary px-5" style={{ color: primaryColor }}>
            <Link to="/bac-si">Xem các chuyên gia <ArrowRight /></Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
