import { useState } from "react";
import { ArrowLeft, ArrowRight, CalendarDays, CheckCircle2, Mail, Phone } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { AppointmentForm, PublicShell } from "@/components/public-shell";
import {
  assetUrl,
  createAppointment,
  createContact,
  type AllData,
  type Doctor,
  type News,
  type Service,
  type Specialty,
} from "@/lib/public-api";
import { Button } from "@/components/ui/button";

type PageProps = { data: AllData };
function Frame({ data, children }: PageProps & { children: React.ReactNode }) {
  return (
    <PublicShell data={data}>
      <main className="page-enter mx-auto max-w-7xl px-5 py-16 lg:px-8 lg:py-24">{children}</main>
    </PublicShell>
  );
}
function Heading({ eyebrow, title, copy }: { eyebrow: string; title: string; copy?: string }) {
  return (
    <div className="max-w-3xl">
      <p className="section-kicker">{eyebrow}</p>
      <h1 className="section-title text-4xl lg:text-5xl">{title}</h1>
      {copy && <p className="section-copy ml-0 max-w-2xl">{copy}</p>}
    </div>
  );
}

export function SpecialtyListPage({ data, items }: PageProps & { items: Specialty[] }) {
  return (
    <Frame data={data}>
      <Heading
        eyebrow="Chuyên khoa"
        title="Chăm sóc chuyên sâu cho từng nhu cầu"
        copy="Đội ngũ chuyên môn phối hợp cùng hệ thống chẩn đoán hiện đại để mang đến hướng điều trị phù hợp."
      />
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <Link key={item.id} to={`/chuyen-khoa/${item.slug}`} className="service-card group">
            <span className="grid size-12 place-items-center rounded-xl bg-secondary text-primary">
              ✚
            </span>
            <h2 className="mt-6 font-display text-xl font-bold">{item.ten_chuyen_khoa}</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              {item.mo_ta || "Khám và điều trị với đội ngũ bác sĩ giàu kinh nghiệm."}
            </p>
            <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary">
              Xem chi tiết <ArrowRight className="size-4 group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </div>
    </Frame>
  );
}

export function ServiceListPage({ data, items }: PageProps & { items: Service[] }) {
  return (
    <Frame data={data}>
      <Heading
        eyebrow="Dịch vụ y tế"
        title="Giải pháp chăm sóc sức khỏe toàn diện"
        copy="Các dịch vụ được thiết kế để bạn và gia đình dễ dàng tiếp cận chăm sóc chất lượng."
      />
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <Link key={item.id} to={`/dich-vu/${item.slug}`} className="service-card group">
            <h2 className="font-display text-xl font-bold">{item.ten_dich_vu || item.name}</h2>
            <p className="mt-3 text-sm leading-6 text-muted-foreground">
              {item.mo_ta || item.description || "Dịch vụ chăm sóc sức khỏe chuyên sâu."}
            </p>
            <span className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-primary">
              Xem chi tiết <ArrowRight className="size-4 group-hover:translate-x-1" />
            </span>
          </Link>
        ))}
      </div>
    </Frame>
  );
}

export function SpecialtyDetailPage({
  data,
  item,
  doctors,
}: PageProps & { item?: Specialty; doctors: Doctor[] }) {
  return (
    <Frame data={data}>
      <Link
        to="/chuyen-khoa"
        className="inline-flex items-center gap-2 text-sm font-bold text-primary"
      >
        <ArrowLeft className="size-4" /> Tất cả chuyên khoa
      </Link>
      <div className="mt-10 grid gap-12 lg:grid-cols-[1.1fr_.9fr] lg:items-center">
        <div>
          <Heading
            eyebrow="Chuyên khoa"
            title={item?.ten_chuyen_khoa || "Chuyên khoa"}
            copy={item?.mo_ta || "Khám, tư vấn và điều trị toàn diện với quy trình an toàn."}
          />
          <Button asChild className="mt-8">
            <Link to="/dat-lich">
              <CalendarDays /> Đặt lịch với chuyên khoa
            </Link>
          </Button>
        </div>
        <img
          src={assetUrl(item?.hinh_anh)}
          alt={item?.ten_chuyen_khoa || "Hình ảnh chuyên khoa"}
          loading="lazy"
          className="aspect-[4/3] w-full rounded-3xl object-cover"
        />
      </div>
      <section className="mt-20">
        <p className="section-kicker">Đội ngũ bác sĩ</p>
        <h2 className="section-title text-3xl">Bác sĩ thuộc chuyên khoa</h2>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {doctors.map((doctor) => (
            <Link key={doctor.id} to={`/bac-si/${doctor.id}`} className="doctor-card group">
              <img
                src={assetUrl(doctor.hinh_anh || doctor.anh)}
                alt={doctor.ten}
                loading="lazy"
                className="aspect-square w-full object-cover"
              />
              <div className="p-4">
                <h3 className="font-bold">{doctor.ten}</h3>
                <p className="mt-1 text-sm text-primary">
                  {doctor.chuc_danh || doctor.ten_chuyen_khoa}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </Frame>
  );
}

export function DoctorListPage({ data, doctors }: PageProps & { doctors: Doctor[] }) {
  const [query, setQuery] = useState("");
  const filtered = doctors.filter((doctor) =>
    doctor.ten.toLowerCase().includes(query.toLowerCase()),
  );
  return (
    <Frame data={data}>
      <Heading
        eyebrow="Đội ngũ chuyên môn"
        title="Bác sĩ tận tâm, vững chuyên môn"
        copy="Tìm kiếm bác sĩ phù hợp và chủ động đặt lịch thăm khám."
      />
      <input
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder="Tìm theo tên bác sĩ"
        className="field mt-10 max-w-md"
      />
      <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {filtered.map((doctor) => (
          <Link key={doctor.id} to={`/bac-si/${doctor.id}`} className="doctor-card group">
            <img
              src={assetUrl(doctor.hinh_anh || doctor.anh)}
              alt={doctor.ten}
              loading="lazy"
              className="aspect-square w-full object-cover"
            />
            <div className="p-4">
              <h2 className="font-bold">{doctor.ten}</h2>
              <p className="mt-1 text-sm text-primary">
                {doctor.ten_chuyen_khoa || doctor.chuc_danh}
              </p>
              <span className="mt-4 inline-flex items-center gap-2 text-sm font-bold text-primary">
                Xem hồ sơ <ArrowRight className="size-4" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </Frame>
  );
}

const doctorFieldLabels: Record<string, string> = {
  id: "Mã bác sĩ",
  ten: "Họ và tên",
  chuyen_khoa_id: "Mã chuyên khoa",
  ten_chuyen_khoa: "Chuyên khoa",
  chuc_danh: "Chức danh",
  hoc_vi: "Học vị",
  sdt: "Số điện thoại",
  email: "Email",
  gia_kham: "Giá khám",
  anh: "Ảnh đại diện",
  hinh_anh: "Ảnh đại diện",
  kinh_nghiem: "Kinh nghiệm",
  mo_ta: "Giới thiệu",
  lich_kham: "Lịch khám",
  hien_thi: "Đang hiển thị",
  created_at: "Ngày tạo",
  updated_at: "Ngày cập nhật",
};
const doctorHiddenFields = new Set(["anh", "hinh_anh", "id", "slug", "chuyen_khoa_id", "hien_thi"]);
const doctorFieldOrder = [
  "ten",
  "chuc_danh",
  "ten_chuyen_khoa",
  "hoc_vi",
  "kinh_nghiem",
  "sdt",
  "gia_kham",
];
function formatDoctorValue(key: string, value: unknown) {
  if (value === null || value === undefined || value === "") return "Chưa cập nhật";
  if (key === "gia_kham" && typeof value === "number") return `${value.toLocaleString("vi-VN")} đ`;
  if ((key.endsWith("_at") || key === "ngay_sinh") && String(value).includes("T"))
    return new Date(String(value)).toLocaleDateString("vi-VN");
  return String(value);
}
export function DoctorDetailPage({ data, doctor }: PageProps & { doctor?: Doctor }) {
  const fields = Object.entries(doctor || {})
    .filter(([key, value]) => !doctorHiddenFields.has(key) && value !== undefined)
    .sort(([firstKey], [secondKey]) => {
      const firstIndex = doctorFieldOrder.indexOf(firstKey);
      const secondIndex = doctorFieldOrder.indexOf(secondKey);
      return (
        (firstIndex === -1 ? doctorFieldOrder.length : firstIndex) -
        (secondIndex === -1 ? doctorFieldOrder.length : secondIndex)
      );
    });
  const image = doctor?.hinh_anh || doctor?.anh;
  return (
    <Frame data={data}>
      <Link to="/bac-si" className="inline-flex items-center gap-2 text-sm font-bold text-primary">
        <ArrowLeft className="size-4" /> Đội ngũ bác sĩ
      </Link>
      <div className="mt-10 grid gap-10 md:grid-cols-[280px_1fr] md:items-center">
        <img
          src={assetUrl(image)}
          alt={doctor?.ten || "Bác sĩ"}
          loading="lazy"
          className="aspect-square w-full rounded-3xl object-cover"
        />
        <div>
          <p className="section-kicker">Hồ sơ chuyên môn</p>
          <h1 className="section-title text-4xl">{doctor?.ten || "Bác sĩ"}</h1>
          <p className="mt-3 text-lg font-semibold text-primary">
            {doctor?.chuc_danh || "Chức danh đang cập nhật"} - Chuyên khoa{" "}
            {doctor?.ten_chuyen_khoa || "đang cập nhật"}
          </p>
          <p className="mt-6 leading-8 text-muted-foreground">
            {doctor?.mo_ta ||
              doctor?.kinh_nghiem ||
              "Bác sĩ luôn lắng nghe, giải thích rõ ràng và đồng hành cùng người bệnh."}
          </p>
          <Button asChild className="mt-8">
            <Link to="/dat-lich">
              <CalendarDays /> Đặt lịch với bác sĩ
            </Link>
          </Button>
        </div>
      </div>
      <section className="mt-16 rounded-2xl border border-border bg-card p-6 shadow-sm sm:p-8">
        <p className="section-kicker">Thông tin bác sĩ</p>
        <h2 className="section-title text-3xl">Thông tin bác sĩ</h2>
        <dl className="mt-8 grid gap-4 sm:grid-cols-2">
          {fields.map(([key, value]) => (
            <div key={key} className="rounded-xl bg-muted/60 p-4">
              <dt className="text-xs font-bold uppercase tracking-wide text-muted-foreground">
                {doctorFieldLabels[key] || key.replaceAll("_", " ")}
              </dt>
              <dd className="mt-2 break-words font-semibold text-foreground">
                {formatDoctorValue(key, value)}
              </dd>
            </div>
          ))}
        </dl>
      </section>
    </Frame>
  );
}

export function ServiceDetailPage({ data, item }: PageProps & { item?: Service }) {
  return (
    <Frame data={data}>
      <Link to="/" className="inline-flex items-center gap-2 text-sm font-bold text-primary">
        <ArrowLeft className="size-4" /> Trang chủ
      </Link>
      <div className="mt-10 grid gap-12 lg:grid-cols-2 lg:items-center">
        <div>
          <p className="section-kicker">Dịch vụ y tế</p>
          <h1 className="section-title text-4xl">{item?.ten_dich_vu || item?.name || "Dịch vụ"}</h1>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            {item?.mo_ta || item?.description || "Dịch vụ chăm sóc sức khỏe chuyên sâu."}
          </p>
          <Button asChild className="mt-8">
            <Link to="/dat-lich">
              <CalendarDays /> Đặt lịch ngay
            </Link>
          </Button>
        </div>
        <img
          src={assetUrl(item?.anh)}
          alt={item?.ten_dich_vu || item?.name || "Dịch vụ y tế"}
          loading="lazy"
          className="aspect-[4/3] w-full rounded-3xl object-cover"
        />
      </div>
    </Frame>
  );
}

export function NewsDetailPage({ data, item }: PageProps & { item?: News }) {
  return (
    <Frame data={data}>
      <article className="mx-auto max-w-3xl">
        <p className="section-kicker">Tin tức y khoa</p>
        <h1 className="section-title text-4xl">{item?.tieu_de || "Tin tức"}</h1>
        <img
          src={assetUrl(item?.anh)}
          alt={item?.tieu_de || "Tin tức y khoa"}
          loading="lazy"
          className="mt-8 aspect-[16/9] w-full rounded-3xl object-cover"
        />
        <div
          className="prose prose-slate mt-8 max-w-none leading-8"
          dangerouslySetInnerHTML={{
            __html: item?.noi_dung || "Nội dung bài viết đang được cập nhật.",
          }}
        />
      </article>
    </Frame>
  );
}

export function AppointmentPage({ data }: PageProps) {
  return (
    <Frame data={data}>
      <Heading
        eyebrow="Đặt lịch khám"
        title="Chủ động chăm sóc sức khỏe"
        copy="Điền thông tin, bệnh viện sẽ gọi lại để xác nhận lịch hẹn phù hợp."
      />
      <div className="mt-10 max-w-4xl">
        <AppointmentForm specialties={data.chuyenkhoa} />
      </div>
    </Frame>
  );
}

export function ContactPage({ data }: PageProps) {
  const [sent, setSent] = useState(false);
  async function submit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    await createContact(Object.fromEntries(new FormData(event.currentTarget).entries()));
    setSent(true);
    event.currentTarget.reset();
  }
  return (
    <Frame data={data}>
      <Heading
        eyebrow="Liên hệ"
        title="Chúng tôi luôn sẵn sàng lắng nghe"
        copy="Gửi câu hỏi hoặc nhu cầu tư vấn, đội ngũ bệnh viện sẽ phản hồi sớm nhất."
      />
      <div className="mt-12 grid gap-10 lg:grid-cols-2">
        <form onSubmit={submit} className="grid gap-4 rounded-2xl border border-border bg-card p-6">
          <input name="ho_ten" required placeholder="Họ và tên" className="field" />
          <input name="email" type="email" required placeholder="Email" className="field" />
          <input name="sdt" placeholder="Số điện thoại" className="field" />
          <textarea
            name="noi_dung"
            required
            placeholder="Nội dung cần hỗ trợ"
            className="field min-h-36"
          />
          <Button type="submit">Gửi liên hệ</Button>
          {sent && (
            <p className="flex items-center gap-2 text-sm font-semibold text-hospital-green">
              <CheckCircle2 className="size-4" /> Đã gửi thành công.
            </p>
          )}
        </form>
        <div className="rounded-2xl bg-muted p-7">
          <h2 className="font-display text-2xl font-bold">Thông tin bệnh viện</h2>
          <div className="mt-8 space-y-5 text-muted-foreground">
            <p className="flex gap-3">
              <Phone className="size-5 text-primary" /> Hotline tư vấn
            </p>
            <p className="flex gap-3">
              <Mail className="size-5 text-primary" /> Email tiếp nhận
            </p>
            <p className="flex gap-3">
              <CalendarDays className="size-5 text-primary" /> Đặt lịch trực tuyến 24/7
            </p>
          </div>
        </div>
      </div>
    </Frame>
  );
}
