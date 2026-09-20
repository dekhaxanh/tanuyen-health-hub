import { useEffect, useRef, useState } from "react";
import { Bot, HeartPulse, MessageCircle, Send, Sparkles, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { getAll } from "@/lib/public-api";

const fallbackPrimary = "#0E6FFF";

function settingValue(settings, key, fallback) {
  return settings.find((item) => item.ma_cai_dat === key)?.gia_tri || fallback;
}

function RobotAvatar({ primaryColor, compact = false, peeking = false }) {
  return <div className={`ai-robot-avatar ${compact ? "ai-robot-avatar-compact" : ""}`} style={{ "--ai-primary": primaryColor }}>
    <span className="ai-robot-antenna ai-robot-antenna-left"><i /></span>
    <span className="ai-robot-antenna ai-robot-antenna-right"><i /></span>
    <span className="ai-robot-ear ai-robot-ear-left" />
    <span className="ai-robot-ear ai-robot-ear-right" />
    <span className="ai-robot-head">
      <span className="ai-robot-logo"><HeartPulse className="size-3.5" /></span>
      <span className={`ai-robot-eyes ${peeking ? "ai-robot-eyes-peeking" : ""}`}><i /><i /></span>
      <span className="ai-robot-mouth" />
    </span>
  </div>;
}

export default function AiPeekRobot() {
  const [settings, setSettings] = useState([]);
  const [hovered, setHovered] = useState(false);
  const [open, setOpen] = useState(false);
  const [choice, setChoice] = useState(false);
  const hoverTimeout = useRef();
  const primaryColor = settingValue(settings, "mau_chu_dao", fallbackPrimary);

  useEffect(() => {
    let active = true;
      getAll().then((data) => { if (active) setSettings(data.settings); }).catch(() => undefined);
    return () => { active = false; };
  }, []);

  function openChat() {
    setOpen(true);
    setHovered(false);
  }

  function enterPeek() {
    window.clearTimeout(hoverTimeout.current);
    setHovered(true);
  }

  function leavePeek() {
    window.clearTimeout(hoverTimeout.current);
    hoverTimeout.current = window.setTimeout(() => setHovered(false), 1000);
  }

  return <>
    <div className="ai-peek-trigger" onMouseEnter={enterPeek} onMouseLeave={leavePeek} aria-hidden="true" />
    <motion.div className={`ai-peek-wrap ${hovered ? "ai-peek-wrap-open" : ""}`} onMouseEnter={enterPeek} onMouseLeave={leavePeek} style={{ "--ai-primary": primaryColor }} animate={{ right: hovered ? 30 : -50, x: hovered ? "0%" : "60%" }} transition={{ type: "spring", stiffness: 300, damping: 15, mass: .7 }}>
      <AnimatePresence>
        {hovered && !open && <motion.div initial={{ opacity: 0, x: 12, scale: 0.85 }} animate={{ opacity: 1, x: 0, scale: 1 }} exit={{ opacity: 0, x: 12, scale: 0.85 }} transition={{ duration: 0.25 }} className="ai-peek-bubble">
          <p>Chat với tôi không? 🤖</p>
          <div className="ai-peek-actions"><button type="button" onClick={openChat}>Có chứ!</button><button type="button" onClick={() => setChoice(true)}>Để sau</button></div>
          {choice && <span className="ai-peek-dismiss">Hẹn bạn lần sau nhé!</span>}
        </motion.div>}
      </AnimatePresence>
      <motion.button type="button" onClick={openChat} aria-label="Mở chat với Châu Thành A.I" className="ai-peek-button" animate={{ rotate: hovered ? 0 : -15, x: hovered ? [0, -3, 0] : 0 }} transition={{ rotate: { type: "spring", stiffness: 260, damping: 18 }, x: { duration: 2, repeat: Infinity, ease: "easeInOut" } }}>
        <RobotAvatar primaryColor={primaryColor} peeking={false} />
        <span className={`ai-peek-chest ${hovered ? "ai-peek-body-visible" : ""}`}><span className="ai-peek-badge">Châu Thành A.I</span><Bot className="size-6" /></span>
        <AnimatePresence>{hovered && <motion.span initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="ai-peek-heart ai-peek-heart-one">♥</motion.span>}</AnimatePresence>
        <AnimatePresence>{hovered && <motion.span initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: .12 }} className="ai-peek-heart ai-peek-heart-two">♥</motion.span>}</AnimatePresence>
      </motion.button>
    </motion.div>

    <AnimatePresence>{open && <motion.div className="ai-chat-overlay" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(false)}>
      <motion.section role="dialog" aria-modal="true" aria-label="Châu Thành A.I" initial={{ opacity: 0, y: 24, scale: .94 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 24, scale: .94 }} onClick={(event) => event.stopPropagation()} className="ai-chat-modal" style={{ "--ai-primary": primaryColor }}>
        <header className="ai-chat-header"><RobotAvatar primaryColor={primaryColor} compact /><div><strong>Châu Thành A.I</strong><span><i /> Trợ lý ảo Bệnh viện Tân Uyên</span></div><button type="button" onClick={() => setOpen(false)} aria-label="Đóng chat"><X /></button></header>
        <div className="ai-chat-body"><div className="ai-chat-message"><Sparkles className="size-4" /> Chào bạn! Tôi có thể giúp gì về đặt lịch, giá dịch vụ, chuyên khoa...?</div></div>
        <form className="ai-chat-form" onSubmit={(event) => event.preventDefault()}><input aria-label="Tin nhắn" placeholder="Nhập câu hỏi của bạn..." /><button type="submit" aria-label="Gửi tin nhắn"><Send className="size-4" /></button></form>
        <p className="ai-chat-note">AI đang trong giai đoạn phát triển</p>
      </motion.section>
    </motion.div>}</AnimatePresence>
  </>;
}
