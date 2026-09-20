import { createFileRoute } from "@tanstack/react-router";
import { getAll, getDoctors, getSpecialty } from "@/lib/public-api";
import { SpecialtyDetailPage } from "@/components/public-pages";
import { Seo, specialtySchema } from "@/components/Seo";

export const Route = createFileRoute("/chuyen-khoa/$slug")({
  loader: async ({ params }) => {
    const [data, specialty, doctors] = await Promise.all([getAll(), getSpecialty(params.slug), getDoctors()]);
    return { data, item: specialty.data[0], doctors: doctors.data.filter((doctor) => doctor.chuyen_khoa_id === specialty.data[0]?.id) };
  },
  component: () => { const page = Route.useLoaderData(); return <><Seo data={page.data} title={`${page.item?.ten_chuyen_khoa || "Chuyên khoa"} | Bệnh viện Tân Uyên`} description={page.item?.mo_ta} schema={specialtySchema(page.item)} /><SpecialtyDetailPage {...page} /></>; },
});
