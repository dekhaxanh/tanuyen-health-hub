import { useEffect, useMemo, useState } from "react";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowRight,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Clock3,
  MapPin,
  Menu,
  Phone,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";
import { Link } from "@tanstack/react-router";
import {
  createAppointment,
  assetUrl,
  type AllData,
  type Banner,
  type News,
  type Service,
  type Setting,
} from "@/lib/public-api";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import DoiNguThongKe from "@/components/DoiNguThongKe";
import type { StaffStat } from "@/lib/public-api";
import { PremiumAppointmentForm } from "@/components/PremiumAppointmentForm";

type PublicShellProps = {
  children?: React.ReactNode;
  data: AllData;
  banners?: Banner[];
  services?: Service[];
  news?: News[];
  staffStats?: StaffStat[];
};

function value(settings: Setting[], key: string, fallback: string) {
  return settings.find((item) => item.ma_cai_dat === key)?.gia_tri || fallback;
}

function Brand({ settings, inverse = false }: { settings: Setting[]; inverse?: boolean }) {
  const name = value(settings, "ten_benh_vien", "Bệnh Viện Đa Khoa Tân Uyên");
  return (
    <Link to="/" className="group flex min-w-0 items-center gap-3" aria-label="Trang chủ">
      <span className="relative grid size-11 shrink-0 place-items-center rounded-xl bg-primary text-primary-foreground shadow-brand">
        <span className="absolute h-6 w-2.5 rounded-sm bg-current" />
        <span className="absolute h-2.5 w-6 rounded-sm bg-current" />
        <span className="absolute -right-0.5 -top-1 h-3 w-5 rotate-[-28deg] rounded-full bg-hospital-green" />
      </span>
      <span className="min-w-0 leading-tight">
        <span
          className={cn(
            "block text-[10px] font-bold uppercase tracking-[.14em]",
            inverse ? "text-hospital-mint" : "text-primary",
          )}
        >
          Bệnh viện đa khoa
        </span>
        <span
          className={cn(
            "block whitespace-nowrap font-display text-sm font-bold leading-tight sm:text-base",
            inverse ? "text-footer-foreground" : "text-foreground",
          )}
        >
          {name}
        </span>
      </span>
    </Link>
  );
}

function menuChildren(items: AllData["menu"], parentId: number) {
  return items.filter((item) => item.parent_id === parentId).sort((a, b) => (a.thu_tu ?? 0) - (b.thu_tu ?? 0));
}

export function PublicHeader({ data }: { data: AllData }) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () =>
      document
        .querySelector("header")
        ?.classList.toggle("site-header-scrolled", window.scrollY > 50);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const menu = data.menu.filter((item) => item.vi_tri !== "footer" && item.hien_thi !== 0);
  const links = menu.length
    ? menu.filter((item) => !item.parent_id).sort((a, b) => (a.thu_tu ?? 0) - (b.thu_tu ?? 0)).slice(0, 6)
    : [
        { id: 1, ten_menu: "Trang chủ", link: "/" },
        { id: 2, ten_menu: "Chuyên khoa", link: "/chuyen-khoa" },
        { id: 3, ten_menu: "Bác sĩ", link: "/bac-si" },
        { id: 4, ten_menu: "Dịch vụ", link: "/dich-vu" },
      ];
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center gap-6 px-5 lg:gap-10 lg:px-8">
        <div className="min-w-0 shrink-0 lg:w-[18rem]"><Brand settings={data.settings} /></div>
        <nav className="hidden flex-1 items-center justify-center gap-5 lg:flex xl:gap-8">
          {links.map((item) => (
            <div key={item.id} className="group relative flex items-center gap-1">
              <Link to={item.link as never} className="nav-link">{item.ten_menu}</Link>
              {menuChildren(menu, item.id).length > 0 && <><ChevronDown className="size-3 text-muted-foreground transition-transform group-hover:rotate-180" /><div className="invisible absolute left-0 top-full min-w-52 translate-y-2 rounded-xl border border-slate-100 bg-white p-2 opacity-0 shadow-xl transition-all group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">{menuChildren(menu, item.id).map((child) => <Link key={child.id} to={child.link as never} className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-slate-700 transition-colors hover:bg-slate-50 hover:text-primary">{child.ten_menu}</Link>)}</div></>}
            </div>
          ))}
        </nav>
        <div className="ml-2 hidden shrink-0 lg:block xl:ml-4">
          <Button asChild size="lg" className="h-11 rounded-lg px-6 shadow-brand">
            <Link to="/dat-lich">
              <CalendarDays /> Đặt lịch khám
            </Link>
          </Button>
        </div>
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Mở menu">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>
                <Brand settings={data.settings} />
              </SheetTitle>
              <SheetDescription className="sr-only">Điều hướng website</SheetDescription>
            </SheetHeader>
            <nav className="mt-8 flex flex-col gap-1">
              {links.map((item) => (
                <div key={item.id} className="rounded-lg hover:bg-muted">
                  <SheetClose asChild><Link to={item.link as never} className="block px-4 py-3 font-semibold">{item.ten_menu}</Link></SheetClose>
                  {menuChildren(menu, item.id).length > 0 && <div className="mb-2 ml-4 border-l border-border pl-2">{menuChildren(menu, item.id).map((child) => <SheetClose asChild key={child.id}><Link to={child.link as never} className="block px-4 py-2 text-sm text-muted-foreground hover:text-primary">{child.ten_menu}</Link></SheetClose>)}</div>}
                </div>
              ))}
            </nav>
            <SheetClose asChild>
              <Button asChild className="mt-6 h-12 w-full">
                <Link to="/dat-lich">
                  <CalendarDays /> Đặt lịch khám
                </Link>
              </Button>
            </SheetClose>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

function LegacyPublicFooter({ data }: { data: AllData }) {
  const settings = data.settings;
  const phone = value(settings, "sdt_hotline", "0274 365 1234");
  const address = value(settings, "dia_chi", "Tân Uyên, Bình Dương");
  const email = value(settings, "email", "contact@benhvientanuyen.vn");
  const hours = value(settings, "gio_lam_viec", "Thứ 2 - Thứ 7, 07:00 - 17:00");
  return (
    <footer className="bg-footer text-footer-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr] lg:px-8">
        <div>
          <Brand settings={settings} inverse />
          <p className="mt-5 max-w-md text-sm leading-7 text-footer-muted">
            Chăm sóc sức khỏe bằng sự tận tâm, chuyên môn và trách nhiệm với cộng đồng.
          </p>
          <div className="mt-5 flex items-center gap-2 text-sm font-bold text-hospital-mint">
            <ShieldCheck className="size-5" /> An toàn · Tận tâm · Chuyên nghiệp
          </div>
        </div>
        <div>
          <h3 className="footer-title">Thông tin liên hệ</h3>
          <ul className="mt-5 space-y-4 text-sm text-footer-muted">
            <li className="flex gap-3">
              <MapPin className="size-5 shrink-0 text-hospital-mint" />
              {address}
            </li>
            <li className="flex gap-3">
              <Phone className="size-5 shrink-0 text-hospital-mint" />
              <a href={`tel:${phone}`}>{phone}</a>
            </li>
            <li>{email}</li>
          </ul>
        </div>
        <div>
          <h3 className="footer-title">Giờ làm việc</h3>
          <p className="mt-5 flex gap-3 text-sm text-footer-muted">
            <Clock3 className="size-5 shrink-0 text-hospital-mint" />
            {hours}
          </p>
          <Link
            to="/lien-he"
            className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-hospital-mint"
          >
            Liên hệ bệnh viện <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
      <div className="border-t border-footer-border">
        <div className="mx-auto max-w-7xl px-5 py-5 text-xs text-footer-muted lg:px-8">
          © 2026 {value(settings, "ten_benh_vien", "Bệnh Viện Đa Khoa Tân Uyên")}
        </div>
      </div>
    </footer>
  );
}

export function PublicFooter({ data }: { data: AllData }) {
  return (
    <div className="footer-wave-wrap">
      <svg
        className="footer-wave"
        viewBox="0 0 1440 90"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path d="M0 48C240 92 480 4 720 48S1200 92 1440 48V90H0Z" />
      </svg>
      <LegacyPublicFooter data={data} />
    </div>
  );
}

export function AppointmentForm({ specialties }: { specialties: AllData["chuyenkhoa"] }) {
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    const form = new FormData(event.currentTarget);
    await createAppointment(Object.fromEntries(form.entries()));
    setLoading(false);
    setSent(true);
    event.currentTarget.reset();
  }
  return <PremiumAppointmentForm specialties={specialties} />;
}

function LegacyHomeHero({ banners }: { banners: Banner[] }) {
  const [active, setActive] = useState(0);
  useEffect(() => {
    if (banners.length < 2) return;
    const timer = window.setInterval(
      () => setActive((current) => (current + 1) % banners.length),
      5000,
    );
    return () => window.clearInterval(timer);
  }, [banners.length]);
  const current = banners[active];
  if (!current)
    return (
      <section className="bg-hero py-32 text-white">
        <div className="container">
          <h1 className="text-5xl font-bold">Chăm sóc sức khỏe tận tâm</h1>
        </div>
      </section>
    );
  return (
    <section className="relative min-h-[600px] overflow-hidden bg-hero text-white">
      {banners.map((banner, index) => (
        <img
          key={banner.id}
          src={assetUrl(banner.anh)}
          alt={banner.tieu_de || "Bệnh viện"}
          loading={index === 0 ? "eager" : "lazy"}
          className={cn(
            "absolute inset-0 h-full w-full object-cover transition-opacity duration-700",
            index === active ? "opacity-100" : "opacity-0",
          )}
        />
      ))}
      <div className="absolute inset-0 bg-hero-overlay" />
      <div className="relative mx-auto flex min-h-[600px] max-w-7xl items-center px-5 py-20 lg:px-8">
        <div className="max-w-2xl">
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-sm">
            <ShieldCheck className="size-4 text-hospital-mint" /> Chăm sóc toàn diện cho gia đình
          </span>
          <h1 className="font-display text-4xl font-bold leading-tight sm:text-6xl">
            {current.tieu_de || "Chăm sóc sức khỏe tận tâm"}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-white/75">
            {current.mo_ta ||
              "Đồng hành cùng bạn bằng chuyên môn vững vàng, quy trình an toàn và sự thấu hiểu."}
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button asChild size="lg" className="h-12 bg-white px-6 text-primary hover:bg-white/90">
              <Link to="/dat-lich">
                Đặt lịch ngay <ArrowRight />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-12 border-white/30 bg-white/10 text-white hover:bg-white/20 hover:text-white"
            >
              <a href="tel:02743651234">
                <Phone /> Gọi hotline
              </a>
            </Button>
          </div>
        </div>
      </div>
      <div className="absolute bottom-7 left-1/2 flex w-full max-w-7xl -translate-x-1/2 justify-between px-5 lg:px-8">
        <div className="flex gap-2">
          {banners.map((banner, index) => (
            <button
              key={banner.id}
              type="button"
              aria-label={`Banner ${index + 1}`}
              onClick={() => setActive(index)}
              className={cn(
                "h-1.5 rounded-full bg-white/40 transition-all",
                index === active ? "w-10 bg-white" : "w-5",
              )}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setActive((active - 1 + banners.length) % banners.length)}
            className="rounded-full border-white/30 bg-white/10 text-white hover:bg-white/20"
          >
            <ChevronLeft />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setActive((active + 1) % banners.length)}
            className="rounded-full border-white/30 bg-white/10 text-white hover:bg-white/20"
          >
            <ChevronRight />
          </Button>
        </div>
      </div>
    </section>
  );
}

function HomeHero({ banners }: { banners: Banner[] }) {
  const [active, setActive] = useState(0);
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start end", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["-8%", "8%"]);

  useEffect(() => {
    if (banners.length < 2) return;
    const timer = window.setInterval(
      () => setActive((current) => (current + 1) % banners.length),
      5000,
    );
    return () => window.clearInterval(timer);
  }, [banners.length]);

  const current = banners[active];
  if (!current)
    return (
      <section className="bg-hero py-32 text-white">
        <div className="container">
          <h1 className="text-5xl font-bold">Chăm sóc sức khỏe tận tâm</h1>
        </div>
      </section>
    );

  const changeSlide = (next: number) => setActive((next + banners.length) % banners.length);
  return (
    <section
      ref={heroRef}
      className="relative min-h-[620px] overflow-hidden bg-hero text-white lg:min-h-[700px]"
    >
      {banners.map((banner, index) => (
        <motion.img
          key={banner.id}
          src={assetUrl(banner.anh)}
          alt={banner.tieu_de || "Bệnh viện"}
          style={{ y: index === active ? imageY : 0 }}
          initial={{ opacity: 0, scale: 1.06 }}
          animate={{ opacity: index === active ? 1 : 0, scale: index === active ? 1 : 1.06 }}
          transition={{ opacity: { duration: 0.8 }, scale: { duration: 1.2, ease: "easeOut" } }}
          className="absolute inset-0 h-[116%] w-full object-cover"
        />
      ))}
      <div className="absolute inset-0 bg-hero-overlay" />
      <div className="relative mx-auto flex min-h-[620px] max-w-7xl items-center px-5 py-20 lg:min-h-[700px] lg:px-8">
        <motion.div
          key={current.id}
          initial={{ opacity: 0, y: 22 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="max-w-2xl rounded-2xl border border-white/20 bg-white/[0.15] p-6 shadow-2xl backdrop-blur-md sm:p-9"
        >
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm">
            <ShieldCheck className="size-4 text-hospital-mint" /> Chăm sóc toàn diện cho gia đình
          </span>
          <h1 className="font-display text-4xl font-bold leading-tight sm:text-6xl">
            {current.tieu_de || "Chăm sóc sức khỏe tận tâm"}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-white/80">
            {current.mo_ta ||
              "Đồng hành cùng bạn bằng chuyên môn vững vàng, quy trình an toàn và sự thấu hiểu."}
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button
              asChild
              size="lg"
              className="hero-cta-shine hero-cta-pulse h-12 rounded-2xl bg-white/90 px-6 text-primary shadow-xl hover:bg-white"
            >
              <Link to="/dat-lich">
                Đặt lịch ngay <ArrowRight />
              </Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="h-12 rounded-2xl border-white/30 bg-white/[0.15] text-white backdrop-blur-md hover:bg-white/25 hover:text-white"
            >
              <a href="tel:02743651234">
                <Phone /> Gọi hotline
              </a>
            </Button>
          </div>
        </motion.div>
      </div>
      <div className="absolute bottom-8 left-1/2 flex w-full max-w-7xl -translate-x-1/2 items-end justify-between px-5 lg:px-8">
        <div className="flex items-center gap-2">
          {banners.map((banner, index) => (
            <button
              key={banner.id}
              type="button"
              aria-label={`Banner ${index + 1}`}
              onClick={() => changeSlide(index)}
              className={cn("hero-dot-line", index === active && "hero-dot-line-active")}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => changeSlide(active - 1)}
            className="rounded-full border-white/30 bg-white/10 text-white hover:bg-white/20"
          >
            <ChevronLeft />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={() => changeSlide(active + 1)}
            className="rounded-full border-white/30 bg-white/10 text-white hover:bg-white/20"
          >
            <ChevronRight />
          </Button>
        </div>
      </div>
      <motion.a
        href="#dat-lich-nhanh"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="hero-scroll-indicator"
      >
        <span /> Cuộn để khám phá
      </motion.a>
    </section>
  );
}

export function PublicShell({
  children,
  data,
  banners = [],
  services = [],
  news = [],
  staffStats = [],
}: PublicShellProps) {
  const primary = value(data.settings, "mau_chu_dao", "#0E6FFF");
  const specialtyCount = data.chuyenkhoa.length;
  return (
    <div
      style={{ "--primary": primary, "--primary-color": primary } as React.CSSProperties}
      className="page-enter min-h-screen bg-background"
    >
      <PublicHeader data={data} />
      {children || (
        <>
          <HomeHero banners={banners} />
          <DoiNguThongKe stats={staffStats} primaryColor={primary} />
          <main>
            <section className="relative z-10 mx-auto -mt-10 max-w-7xl px-5 lg:px-8">
              <AppointmentForm specialties={data.chuyenkhoa} />
            </section>
            <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
              <div className="flex items-end justify-between gap-5">
                <div className="max-w-2xl">
                  <p className="section-kicker">Chuyên khoa</p>
                  <h2 className="section-title">Đồng hành cùng bạn trong mọi nhu cầu sức khỏe</h2>
                  <p className="section-copy ml-0">
                    Khám phá {specialtyCount} chuyên khoa với đội ngũ bác sĩ giàu kinh nghiệm.
                  </p>
                </div>
                <Link to="/chuyen-khoa" className="hidden items-center gap-2 font-bold text-primary sm:flex">
                  Xem tất cả <ArrowRight className="size-4" />
                </Link>
              </div>
              <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {data.chuyenkhoa.slice(0, 8).map((item) => (
                  <Link
                    key={item.id}
                    to={`/chuyen-khoa/${item.slug}`}
                    className="service-card group"
                  >
                    <Stethoscope className="size-8 text-primary" />
                    <h3 className="mt-5 font-display text-lg font-bold">{item.ten_chuyen_khoa}</h3>
                    <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-primary">
                      Xem chuyên khoa <ArrowRight className="size-4 group-hover:translate-x-1" />
                    </span>
                  </Link>
                ))}
              </div>
            </section>
            <section className="bg-muted py-20">
              <div className="mx-auto max-w-7xl px-5 lg:px-8">
                <div className="flex items-end justify-between gap-5">
                  <div>
                    <p className="section-kicker">Dịch vụ y tế</p>
                    <h2 className="section-title">Chăm sóc toàn diện</h2>
                  </div>
                  <Link
                    to="/dich-vu"
                    className="hidden items-center gap-2 font-bold text-primary sm:flex"
                  >
                    Xem tất cả <ArrowRight className="size-4" />
                  </Link>
                </div>
                <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {services.slice(0, 6).map((item) => (
                    <Link key={item.id} to={`/dich-vu/${item.slug}`} className="service-card group">
                      <h3 className="font-display text-xl font-bold">
                        {item.ten_dich_vu || item.name}
                      </h3>
                      <p className="mt-3 text-sm leading-6 text-muted-foreground">
                        {item.mo_ta || item.description || "Dịch vụ chăm sóc sức khỏe chuyên sâu."}
                      </p>
                      <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary">
                        Tìm hiểu thêm <ArrowRight className="size-4 group-hover:translate-x-1" />
                      </span>
                    </Link>
                  ))}
                </div>
              </div>
            </section>
            {news.length > 0 && (
              <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
                <p className="section-kicker">Tin tức y khoa</p>
                <h2 className="section-title">Kiến thức sức khỏe đáng tin cậy</h2>
                <div className="mt-10 grid gap-6 md:grid-cols-3">
                  {news.map((item) => (
                    <Link
                      key={item.id}
                      to={`/tin-tuc/${item.slug || item.id}`}
                      className="overflow-hidden rounded-2xl border border-border bg-card"
                    >
                      <img
                        src={assetUrl(item.anh)}
                        alt={item.tieu_de || "Tin tức"}
                        loading="lazy"
                        className="aspect-[16/9] w-full object-cover"
                      />
                      <div className="p-5">
                        <h3 className="font-display text-lg font-bold">{item.tieu_de}</h3>
                        <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-primary">
                          Đọc tiếp <ArrowRight className="size-4" />
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}
          </main>
        </>
      )}
      <PublicFooter data={data} />
    </div>
  );
}
