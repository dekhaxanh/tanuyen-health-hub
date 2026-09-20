import { motion } from "framer-motion";
import { useRef, type ReactNode } from "react";

export function PremiumCard({ children, className = "" }: { children: ReactNode; className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null);
  function tilt(event: React.MouseEvent<HTMLDivElement>) {
    const card = cardRef.current;
    if (!card) return;
    const bounds = card.getBoundingClientRect();
    const rotateX = ((event.clientY - bounds.top) / bounds.height - 0.5) * -5;
    const rotateY = ((event.clientX - bounds.left) / bounds.width - 0.5) * 5;
    card.style.setProperty("--tilt-x", `${rotateX}deg`);
    card.style.setProperty("--tilt-y", `${rotateY}deg`);
  }
  function reset() {
    cardRef.current?.style.setProperty("--tilt-x", "0deg");
    cardRef.current?.style.setProperty("--tilt-y", "0deg");
  }
  return <motion.div ref={cardRef} onMouseMove={tilt} onMouseLeave={reset} whileHover={{ y: -6 }} transition={{ duration: 0.25 }} className={`premium-card ${className}`}>{children}</motion.div>;
}
