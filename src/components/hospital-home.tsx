"use client";

import { useEffect, useState } from "react";
import {
  Ambulance,
  ArrowRight,
  Baby,
  Bone,
  CalendarDays,
  ChevronLeft,
  ChevronRight,
  Clock3,
  FlaskConical,
  HeartPulse,
  MapPin,
  Menu,
  Microscope,
  Phone,
  ScanLine,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";

import type { Banner, Doctor, Service } from "../../lib/mockData";
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

type HospitalHomeProps = {
  banners: Banner[];
  services: Service[];
  doctors: Doctor[];
};

const serviceIcons = {
  heart: HeartPulse,
  baby: Baby,
  bone: Bone,
  scan: ScanLine,
  flask: FlaskConical,
  ambulance: Ambulance,
};

function Brand({ compact = false, inverse = false }: { compact?: boolean; inverse?: boolean }) {
  return (
    <a href="#top" className="group flex min-w-0 items-center gap-3" aria-label="Về đầu trang">
      <span className="relative grid size-11 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground shadow-brand transition-transform group-hover:-translate-y-0.5">
        <span className="absolute h-6 w-2.5 rounded-sm bg-current" />
        <span className="absolute h-2.5 w-6 rounded-sm bg-current" />
        <span className="absolute -right-0.5 -top-1 h-3 w-5 rotate-[-28deg] rounded-full bg-hospital-green" />
      </span>
      <span className={cn("min-w-0 leading-tight", compact && "max-w-52")}>
        <span className={cn("block truncate text-xs font-bold uppercase", inverse ? "text-hospital-mint" : "text-primary")}>Bệnh viện đa khoa</span>
        <span className={cn("block truncate font-display text-base font-bold sm:text-lg", inverse ? "text-footer-foreground" : "text-foreground")}>
          Châu Thành Nam Tân Uyên
        </span>
      </span>
    </a>
  );
}

function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
        <Brand compact />
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Điều hướng chính">
          <a className="nav-link text-primary" href="#top">Trang chủ</a>
          <a className="nav-link" href="#dich-vu">Dịch vụ</a>
          <a className="nav-link" href="#bac-si">Bác sĩ</a>
        </nav>
        <div className="hidden lg:block">
          <Button asChild size="lg" className="h-11 rounded-lg px-6 shadow-brand">
            <a href="#lien-he"><CalendarDays /> Đặt lịch khám</a>
          </Button>
        </div>
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden" aria-label="Mở menu">
              <Menu className="size-6" />
            </Button>
          </SheetTrigger>
          <SheetContent className="w-[88%] border-border bg-background">
            <SheetHeader className="border-b border-border pb-5 text-left">
              <SheetTitle><Brand compact /></SheetTitle>
              <SheetDescription className="sr-only">Điều hướng trang chủ bệnh viện</SheetDescription>
            </SheetHeader>
            <nav className="mt-8 flex flex-col gap-2" aria-label="Điều hướng di động">
              {[
                ["Trang chủ", "#top"],
                ["Dịch vụ", "#dich-vu"],
                ["Bác sĩ", "#bac-si"],
              ].map(([label, href]) => (
                <SheetClose asChild key={href}>
                  <a href={href} className="rounded-lg px-4 py-3 text-base font-semibold text-foreground hover:bg-muted">
                    {label}
                  </a>
                </SheetClose>
              ))}
            </nav>
            <SheetClose asChild>
              <Button asChild size="lg" className="mt-6 h-12 w-full rounded-lg">
                <a href="#lien-he"><CalendarDays /> Đặt lịch khám</a>
              </Button>
            </SheetClose>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

function Hero({ banners }: { banners: Banner[] }) {
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (banners.length < 2) return;
    const timer = window.setInterval(() => setActive((current) => (current + 1) % banners.length), 6000);
    return () => window.clearInterval(timer);
  }, [banners.length]);

  if (banners.length === 0) return null;

  const show = (index: number) => setActive((index + banners.length) % banners.length);

  return (
    <section id="top" className="relative min-h-[620px] overflow-hidden bg-hero text-primary-foreground lg:min-h-[690px]">
      {banners.map((banner, index) => (
        <img
          key={banner.id}
          src={banner.image}
          alt="Không gian chăm sóc tại Bệnh Viện Đa Khoa Châu Thành Nam Tân Uyên"
          width={1920}
          height={1080}
          loading={index === 0 ? "eager" : "lazy"}
          className={cn("absolute inset-0 h-full w-full object-cover transition-opacity duration-700", index === active ? "opacity-100" : "opacity-0")}
        />
      ))}
      <div className="absolute inset-0 bg-hero-overlay" />
      <div className="relative mx-auto flex min-h-[620px] max-w-7xl items-center px-5 pb-24 pt-16 lg:min-h-[690px] lg:px-8">
        <div className="max-w-2xl animate-rise">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-primary-foreground/25 bg-hero-chip px-4 py-2 text-sm font-semibold">
            <ShieldCheck className="size-4 text-hospital-mint" />
            {banners[active]?.eyebrow}
          </div>
          <h1 className="font-display text-4xl font-bold leading-[1.12] sm:text-5xl lg:text-6xl">
            {banners[active]?.title}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-7 text-hero-muted sm:text-lg">
            {banners[active]?.description}
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button asChild size="lg" className="h-12 rounded-lg bg-primary-foreground px-6 text-primary shadow-xl hover:bg-primary-foreground/90">
              <a href="#lien-he">Đặt lịch ngay <ArrowRight /></a>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 rounded-lg border-primary-foreground/35 bg-hero-chip px-6 text-primary-foreground shadow-none hover:bg-primary-foreground/10 hover:text-primary-foreground">
              <a href="tel:02743651234"><Phone /> Gọi hotline</a>
            </Button>
          </div>
        </div>
      </div>
      <div className="absolute bottom-8 left-1/2 flex w-full max-w-7xl -translate-x-1/2 items-center justify-between px-5 lg:px-8">
        <div className="flex gap-2" aria-label="Chọn ảnh banner">
          {banners.map((banner, index) => (
            <button
              key={banner.id}
              type="button"
              onClick={() => show(index)}
              aria-label={`Xem banner ${index + 1}`}
              className={cn("h-1.5 rounded-full bg-primary-foreground/45 transition-all", index === active ? "w-10 bg-primary-foreground" : "w-5")}
            />
          ))}
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" onClick={() => show(active - 1)} aria-label="Banner trước" className="rounded-full border-primary-foreground/30 bg-hero-chip text-primary-foreground hover:bg-primary-foreground/15 hover:text-primary-foreground"><ChevronLeft /></Button>
          <Button variant="outline" size="icon" onClick={() => show(active + 1)} aria-label="Banner tiếp theo" className="rounded-full border-primary-foreground/30 bg-hero-chip text-primary-foreground hover:bg-primary-foreground/15 hover:text-primary-foreground"><ChevronRight /></Button>
        </div>
      </div>
    </section>
  );
}

function Services({ services }: { services: Service[] }) {
  return (
    <section id="dich-vu" className="scroll-mt-20 bg-background py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <p className="section-kicker">Dịch vụ y tế</p>
          <h2 className="section-title">Chăm sóc toàn diện, ngay gần bạn</h2>
          <p className="section-copy">Đa dạng chuyên khoa cùng quy trình thăm khám thuận tiện, đáp ứng nhu cầu chăm sóc sức khỏe của cả gia đình.</p>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services.slice(0, 6).map((service) => {
            const Icon = serviceIcons[service.icon];
            return (
              <article key={service.id} className="service-card group">
                <span className="service-icon"><Icon className="size-7" /></span>
                <h3 className="mt-6 font-display text-xl font-bold text-foreground">{service.name}</h3>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{service.description}</p>
                <a href="#lien-he" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary">Đặt lịch tư vấn <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></a>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function Doctors({ doctors }: { doctors: Doctor[] }) {
  return (
    <section id="bac-si" className="scroll-mt-20 bg-muted py-20 lg:py-28">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <div className="grid items-end gap-6 lg:grid-cols-[1fr_auto]">
          <div className="max-w-2xl">
            <p className="section-kicker">Đội ngũ chuyên môn</p>
            <h2 className="section-title">Bác sĩ tận tâm, vững chuyên môn</h2>
            <p className="section-copy ml-0">Mỗi bác sĩ luôn dành thời gian lắng nghe, giải thích rõ ràng và đồng hành cùng người bệnh trong suốt quá trình điều trị.</p>
          </div>
          <Button asChild variant="outline" size="lg" className="hidden rounded-lg bg-background lg:inline-flex">
            <a href="#lien-he">Tư vấn cùng bác sĩ <ArrowRight /></a>
          </Button>
        </div>
        <div className="mt-12 grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {doctors.slice(0, 4).map((doctor, index) => (
            <article key={doctor.id} className="doctor-card group">
              <div className="doctor-portrait">
                <img
                  src={doctor.image}
                  alt={`Bác sĩ ${doctor.name}`}
                  width={1600}
                  height={1600}
                  loading="lazy"
                  className={cn("doctor-grid-image", `doctor-grid-image-${index + 1}`)}
                />
              </div>
              <div className="px-3 pb-5 pt-4 text-center sm:px-5">
                <h3 className="font-display text-sm font-bold leading-5 text-foreground sm:text-lg">{doctor.name}</h3>
                <p className="mt-1.5 text-xs font-semibold text-primary sm:text-sm">{doctor.specialty}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer id="lien-he" className="scroll-mt-20 bg-footer text-footer-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr] lg:px-8 lg:py-16">
        <div>
          <Brand inverse />
          <p className="mt-5 max-w-md text-sm leading-6 text-footer-muted">Chăm sóc sức khỏe bằng sự tận tâm, chuyên nghiệp và trách nhiệm với cộng đồng Tân Uyên.</p>
          <div className="mt-6 flex items-center gap-2 text-sm font-bold text-hospital-mint"><ShieldCheck className="size-5" /> An toàn · Tận tâm · Chuyên nghiệp</div>
        </div>
        <div>
          <h3 className="footer-title">Thông tin liên hệ</h3>
          <ul className="mt-5 space-y-4 text-sm text-footer-muted">
            <li className="flex gap-3"><MapPin className="mt-0.5 size-5 shrink-0 text-hospital-mint" /><span>Tân Uyên, Bình Dương</span></li>
            <li className="flex gap-3"><Phone className="size-5 shrink-0 text-hospital-mint" /><a className="font-semibold text-footer-foreground hover:text-hospital-mint" href="tel:02743651234">0274 365 1234</a></li>
          </ul>
        </div>
        <div>
          <h3 className="footer-title">Giờ làm việc</h3>
          <ul className="mt-5 space-y-3 text-sm text-footer-muted">
            <li className="flex items-start gap-3"><Clock3 className="mt-0.5 size-5 shrink-0 text-hospital-mint" /><span>Thứ 2 – Thứ 7<br /><strong className="text-footer-foreground">07:00 – 17:00</strong></span></li>
            <li className="flex items-center gap-3"><Ambulance className="size-5 shrink-0 text-hospital-mint" /><span>Cấp cứu <strong className="text-footer-foreground">24/7</strong></span></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-footer-border">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-5 text-xs text-footer-muted sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <span>© 2026 Bệnh Viện Đa Khoa Châu Thành Nam Tân Uyên.</span>
          <span className="inline-flex items-center gap-2"><Microscope className="size-4" /> Vì sức khỏe cộng đồng</span>
        </div>
      </div>
    </footer>
  );
}

export function HospitalHome({ banners, services, doctors }: HospitalHomeProps) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero banners={banners} />
        <Services services={services} />
        <Doctors doctors={doctors} />
      </main>
      <Footer />
    </div>
  );
}