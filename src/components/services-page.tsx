"use client";

import { useMemo, useState } from "react";
import {
  Ambulance,
  ArrowLeft,
  ArrowRight,
  Baby,
  Bone,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FlaskConical,
  HeartPulse,
  MapPin,
  Menu,
  Microscope,
  Phone,
  ScanLine,
  Search,
  ShieldCheck,
} from "lucide-react";
import { Link } from "@tanstack/react-router";

import type { Service } from "../../lib/mockData";
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

const serviceIcons = {
  heart: HeartPulse,
  baby: Baby,
  bone: Bone,
  scan: ScanLine,
  flask: FlaskConical,
  ambulance: Ambulance,
};

function normalizeText(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d");
}

export function SubPageBrand({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link to="/" className="group flex min-w-0 items-center gap-3" aria-label="Về trang chủ">
      <span className="relative grid size-11 shrink-0 place-items-center rounded-lg bg-primary text-primary-foreground shadow-brand transition-transform group-hover:-translate-y-0.5">
        <span className="absolute h-6 w-2.5 rounded-sm bg-current" />
        <span className="absolute h-2.5 w-6 rounded-sm bg-current" />
        <span className="absolute -right-0.5 -top-1 h-3 w-5 rotate-[-28deg] rounded-full bg-hospital-green" />
      </span>
      <span className="min-w-0 max-w-52 leading-tight">
        <span className={cn("block truncate text-xs font-bold uppercase", inverse ? "text-hospital-mint" : "text-primary")}>Bệnh viện đa khoa</span>
        <span className={cn("block truncate font-display text-base font-bold sm:text-lg", inverse ? "text-footer-foreground" : "text-foreground")}>
          Châu Thành Nam Tân Uyên
        </span>
      </span>
    </Link>
  );
}

const navItems = [
  { label: "Trang chủ", href: "/" },
  { label: "Dịch vụ", href: "/dich-vu" },
  { label: "Bác sĩ", href: "/#bac-si" },
];

export function SubPageHeader({ active }: { active?: string }) {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
        <SubPageBrand />
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Điều hướng chính">
          {navItems.map((item) => (
            <a key={item.href} className={cn("nav-link", active === item.href && "text-primary")} href={item.href}>
              {item.label}
            </a>
          ))}
        </nav>
        <div className="hidden lg:block">
          <Button asChild size="lg" className="h-11 rounded-lg px-6 shadow-brand">
            <a href="/#lien-he"><CalendarDays /> Đặt lịch khám</a>
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
              <SheetTitle><SubPageBrand /></SheetTitle>
              <SheetDescription className="sr-only">Điều hướng website bệnh viện</SheetDescription>
            </SheetHeader>
            <nav className="mt-8 flex flex-col gap-2" aria-label="Điều hướng di động">
              {navItems.map((item) => (
                <SheetClose asChild key={item.href}>
                  <a href={item.href} className="rounded-lg px-4 py-3 text-base font-semibold text-foreground hover:bg-muted">
                    {item.label}
                  </a>
                </SheetClose>
              ))}
            </nav>
            <SheetClose asChild>
              <Button asChild size="lg" className="mt-6 h-12 w-full rounded-lg">
                <a href="/#lien-he"><CalendarDays /> Đặt lịch khám</a>
              </Button>
            </SheetClose>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}

export function SubPageFooter() {
  return (
    <footer className="bg-footer text-footer-foreground">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 md:grid-cols-2 lg:grid-cols-[1.3fr_1fr_1fr] lg:px-8 lg:py-16">
        <div>
          <SubPageBrand inverse />
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

export function ServicesPage({ services }: { services: Service[] }) {
  const [keyword, setKeyword] = useState("");

  const filtered = useMemo(() => {
    const query = normalizeText(keyword.trim());
    if (!query) return services;
    return services.filter((service) =>
      normalizeText(`${service.name} ${service.description}`).includes(query),
    );
  }, [keyword, services]);

  return (
    <div className="min-h-screen bg-background">
      <SubPageHeader active="/dich-vu" />
      <main>
        <section className="bg-hero py-16 text-primary-foreground lg:py-20">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <p className="text-sm font-bold uppercase tracking-widest text-hospital-mint">Dịch vụ y tế</p>
            <h1 className="mt-3 font-display text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">Toàn bộ dịch vụ của bệnh viện</h1>
            <p className="mt-4 max-w-2xl text-base leading-7 text-hero-muted">
              Tra cứu nhanh các chuyên khoa và dịch vụ, chọn đúng nhu cầu chăm sóc sức khỏe của bạn và gia đình.
            </p>
            <div className="mt-8 max-w-xl">
              <label className="relative block">
                <Search className="pointer-events-none absolute left-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="search"
                  value={keyword}
                  onChange={(event) => setKeyword(event.target.value)}
                  placeholder="Tìm dịch vụ, ví dụ: nhi khoa, xét nghiệm…"
                  aria-label="Tìm kiếm dịch vụ"
                  className="h-13 w-full rounded-lg border border-primary-foreground/25 bg-background py-3.5 pl-12 pr-4 text-base text-foreground shadow-xl outline-none placeholder:text-muted-foreground focus:border-hospital-mint"
                />
              </label>
            </div>
          </div>
        </section>

        <section className="py-14 lg:py-20">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <p className="text-sm font-semibold text-muted-foreground" aria-live="polite">
              {filtered.length > 0 ? `Tìm thấy ${filtered.length} dịch vụ` : "Không tìm thấy dịch vụ phù hợp"}
            </p>
            {filtered.length > 0 ? (
              <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {filtered.map((service) => {
                  const Icon = serviceIcons[service.icon];
                  return (
                    <Link
                      key={service.id}
                      to="/dich-vu/$slug"
                      params={{ slug: service.slug }}
                      className="service-card group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                      aria-label={`Xem chi tiết ${service.name}`}
                    >
                      <span className="service-icon"><Icon className="size-7" /></span>
                      <h2 className="mt-6 font-display text-xl font-bold text-foreground group-hover:text-primary">{service.name}</h2>
                      <p className="mt-3 text-sm leading-6 text-muted-foreground">{service.description}</p>
                      <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary">
                        Xem chi tiết <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </Link>
                  );
                })}
              </div>
            ) : (
              <div className="mt-8 rounded-xl border border-dashed border-border bg-muted px-6 py-16 text-center">
                <Search className="mx-auto size-10 text-muted-foreground" />
                <p className="mt-4 font-display text-lg font-bold text-foreground">Không có kết quả cho “{keyword.trim()}”</p>
                <p className="mt-2 text-sm text-muted-foreground">Thử từ khóa khác, ví dụ “nội”, “xương” hoặc “cấp cứu”.</p>
                <Button variant="outline" className="mt-6 rounded-lg" onClick={() => setKeyword("")}>Xóa tìm kiếm</Button>
              </div>
            )}
          </div>
        </section>
      </main>
      <SubPageFooter />
    </div>
  );
}

export function ServiceDetailPage({ service, services }: { service: Service; services: Service[] }) {
  const Icon = serviceIcons[service.icon];
  const related = services.filter((item) => item.slug !== service.slug).slice(0, 3);

  return (
    <div className="min-h-screen bg-background">
      <SubPageHeader active="/dich-vu" />
      <main>
        <section className="bg-hero py-14 text-primary-foreground lg:py-18">
          <div className="mx-auto max-w-7xl px-5 lg:px-8">
            <Link to="/dich-vu" className="inline-flex items-center gap-2 text-sm font-semibold text-hero-muted hover:text-primary-foreground">
              <ArrowLeft className="size-4" /> Tất cả dịch vụ
            </Link>
            <div className="mt-6 flex items-start gap-5">
              <span className="grid size-16 shrink-0 place-items-center rounded-xl bg-primary-foreground/12 text-hospital-mint">
                <Icon className="size-9" />
              </span>
              <div>
                <h1 className="font-display text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">{service.name}</h1>
                <p className="mt-3 max-w-2xl text-base leading-7 text-hero-muted">{service.description}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-14 lg:py-20">
          <div className="mx-auto grid max-w-7xl gap-10 px-5 lg:grid-cols-[1.6fr_1fr] lg:px-8">
            <article>
              <h2 className="font-display text-2xl font-bold text-foreground">Giới thiệu dịch vụ</h2>
              <p className="mt-4 text-base leading-8 text-muted-foreground">{service.longDescription}</p>
              <h3 className="mt-10 font-display text-xl font-bold text-foreground">Bạn được gì khi sử dụng dịch vụ?</h3>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {service.benefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-3 rounded-lg border border-border bg-card px-4 py-3.5 text-sm font-medium text-foreground">
                    <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-hospital-green" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </article>
            <aside className="h-fit rounded-xl border border-border bg-card p-6 shadow-sm lg:sticky lg:top-24">
              <h3 className="font-display text-lg font-bold text-foreground">Đặt lịch khám</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">Gọi hotline hoặc để lại thông tin, bệnh viện sẽ liên hệ sắp xếp lịch phù hợp.</p>
              <div className="mt-5 flex items-start gap-3 rounded-lg bg-muted px-4 py-3 text-sm">
                <Clock3 className="mt-0.5 size-5 shrink-0 text-primary" />
                <span className="font-semibold text-foreground">{service.schedule}</span>
              </div>
              <Button asChild size="lg" className="mt-5 h-12 w-full rounded-lg shadow-brand">
                <a href="tel:02743651234"><Phone /> Gọi 0274 365 1234</a>
              </Button>
              <Button asChild variant="outline" size="lg" className="mt-3 h-12 w-full rounded-lg">
                <a href="/#lien-he"><CalendarDays /> Đặt lịch trực tuyến</a>
              </Button>
            </aside>
          </div>
        </section>

        {related.length > 0 && (
          <section className="bg-muted py-14 lg:py-20">
            <div className="mx-auto max-w-7xl px-5 lg:px-8">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <h2 className="font-display text-2xl font-bold text-foreground">Dịch vụ liên quan</h2>
                <Link to="/dich-vu" className="inline-flex items-center gap-2 text-sm font-bold text-primary">
                  Xem tất cả <ArrowRight className="size-4" />
                </Link>
              </div>
              <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {related.map((item) => {
                  const RelatedIcon = serviceIcons[item.icon];
                  return (
                    <Link
                      key={item.id}
                      to="/dich-vu/$slug"
                      params={{ slug: item.slug }}
                      className="service-card group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    >
                      <span className="service-icon"><RelatedIcon className="size-7" /></span>
                      <h3 className="mt-6 font-display text-lg font-bold text-foreground group-hover:text-primary">{item.name}</h3>
                      <p className="mt-2 text-sm leading-6 text-muted-foreground">{item.description}</p>
                    </Link>
                  );
                })}
              </div>
            </div>
          </section>
        )}
      </main>
      <SubPageFooter />
    </div>
  );
}
