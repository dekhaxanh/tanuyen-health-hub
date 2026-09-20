import { createFileRoute } from "@tanstack/react-router";
import { getAll, getDoctor } from "@/lib/public-api";
import { DoctorDetailPage } from "@/components/public-pages";
import { Seo, doctorSchema } from "@/components/Seo";

export const Route = createFileRoute("/bac-si/$id")({
  loader: async ({ params }) => {
    const [data, doctor] = await Promise.all([getAll(), getDoctor(params.id)]);
    const specialty = data.chuyenkhoa.find((item) => item.id === doctor.chuyen_khoa_id);
    return { data, doctor: { ...doctor, ten_chuyen_khoa: specialty?.ten_chuyen_khoa ?? doctor.ten_chuyen_khoa } };
  },
  component: () => { const page = Route.useLoaderData(); return <><Seo data={page.data} title={`BS. ${page.doctor.ten} - ${page.doctor.ten_chuyen_khoa || "Bác sĩ"} | Bệnh viện Tân Uyên`} description={page.doctor.mo_ta || page.doctor.kinh_nghiem} schema={doctorSchema(page.doctor)} /><DoctorDetailPage {...page} /></>; },
});
