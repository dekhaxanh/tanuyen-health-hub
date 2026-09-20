import { Helmet } from "react-helmet-async";
import type { AllData, Doctor, Service, Specialty } from "@/lib/public-api";

const siteUrl = "http://localhost:5173";
function setting(data: AllData, key: string, fallback: string) { return data.settings.find((item) => item.ma_cai_dat === key)?.gia_tri || fallback; }
function summary(value?: string, fallback = "Chăm sóc sức khỏe tận tâm với đội ngũ chuyên môn và dịch vụ y tế toàn diện tại Tân Uyên.") { return (value || fallback).replace(/\s+/g, " ").slice(0, 160); }

export function Seo({ data, title, description, image, schema = [] }: { data: AllData; title: string; description?: string; image?: string; schema?: Record<string, unknown>[] }) {
  const hospitalName = setting(data, "ten_benh_vien", "Bệnh viện Đa khoa Tân Uyên");
  const descriptionText = summary(description);
  const imageUrl = image?.startsWith("http") ? image : `${siteUrl}${image || "/og-hospital.jpg"}`;
  const hospitalSchema = { "@context": "https://schema.org", "@type": "Hospital", name: hospitalName, url: siteUrl, telephone: setting(data, "sdt_hotline", ""), address: { "@type": "PostalAddress", streetAddress: setting(data, "dia_chi", "Tân Uyên, Bình Dương") } };
  return <Helmet><title>{title}</title><meta name="description" content={descriptionText} /><meta property="og:type" content="website" /><meta property="og:title" content={title} /><meta property="og:description" content={descriptionText} /><meta property="og:image" content={imageUrl} /><meta property="og:url" content={siteUrl} /><meta name="twitter:card" content="summary_large_image" /><script type="application/ld+json">{JSON.stringify([hospitalSchema, ...schema])}</script></Helmet>;
}

export function doctorSchema(doctor?: Doctor) { return doctor ? [{ "@context": "https://schema.org", "@type": "Physician", name: doctor.ten, jobTitle: doctor.chuc_danh, telephone: doctor.sdt, medicalSpecialty: doctor.ten_chuyen_khoa, image: doctor.hinh_anh || doctor.anh }] : []; }
export function specialtySchema(item?: Specialty) { return item ? [{ "@context": "https://schema.org", "@type": "MedicalSpecialty", name: item.ten_chuyen_khoa, description: item.mo_ta }] : []; }
export function faqSchema() { return [{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: [{ "@type": "Question", name: "Bệnh viện có nhận đặt lịch trực tuyến không?", acceptedAnswer: { "@type": "Answer", text: "Có. Người bệnh có thể gửi yêu cầu đặt lịch trực tuyến và bệnh viện sẽ gọi lại xác nhận." } }, { "@type": "Question", name: "Bệnh viện làm việc vào thời gian nào?", acceptedAnswer: { "@type": "Answer", text: "Bệnh viện tiếp nhận khám theo giờ làm việc hiển thị trên website và cấp cứu 24/7." } }] }]; }
