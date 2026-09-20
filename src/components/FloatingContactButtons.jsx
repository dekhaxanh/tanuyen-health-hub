import { useEffect, useState } from "react";
import { ArrowUp, MessageCircle, Phone } from "lucide-react";
import { motion } from "framer-motion";
import { getAll } from "@/lib/public-api";

const fallbackContact = {
  hotline: "1900 1234",
  facebook: "https://m.me/benhvientanuyen",
};

const contactVariants = {
  hidden: { x: 100, opacity: 0 },
  visible: (index) => ({
    x: 0,
    opacity: 1,
    transition: { delay: index * 0.1, duration: 0.45, ease: "easeOut" },
  }),
};

function settingValue(settings, key, fallback) {
  return settings.find((item) => item.ma_cai_dat === key)?.gia_tri || fallback;
}

export default function FloatingContactButtons() {
  const [settings, setSettings] = useState([]);
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    let active = true;
    getAll().then((data) => {
      if (active) setSettings(data.settings);
    }).catch(() => undefined);
    const onScroll = () => setShowTop(window.scrollY > 300);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      active = false;
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  const hotline = settingValue(settings, "sdt_hotline", fallbackContact.hotline);
  const facebook = settingValue(settings, "link_facebook", settingValue(settings, "link_zalo", fallbackContact.facebook));
  const telephone = hotline.replace(/[^\d+]/g, "");

  return <motion.div initial="hidden" animate="visible" className="floating-contact-buttons" aria-label="Liên hệ nhanh">
    <motion.div custom={0} variants={contactVariants} className="floating-contact-item group">
      <span className="floating-contact-tooltip">Gọi cấp cứu: {hotline}</span>
      <motion.a href={`tel:${telephone}`} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="floating-contact-button floating-contact-hotline" aria-label={`Gọi cấp cứu: ${hotline}`}>
        <Phone className="size-6" />
      </motion.a>
    </motion.div>
    <motion.div custom={1} variants={contactVariants} className="floating-contact-item group">
      <span className="floating-contact-tooltip">Nhắn tin Facebook</span>
      <motion.a href={facebook} target="_blank" rel="noreferrer" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="floating-contact-button floating-contact-messenger" aria-label="Nhắn tin Facebook">
        <MessageCircle className="size-6" />
        <span className="floating-contact-online" aria-label="Đang trực tuyến" />
      </motion.a>
    </motion.div>
    {showTop && <motion.button custom={2} variants={contactVariants} initial="hidden" animate="visible" whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="floating-contact-button floating-contact-top" aria-label="Lên đầu trang" title="Lên đầu trang"><ArrowUp className="size-6" /></motion.button>}
  </motion.div>;
}
