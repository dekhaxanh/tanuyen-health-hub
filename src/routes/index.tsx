import { createFileRoute } from "@tanstack/react-router";
import { getAll, getBanners, getNews, getServices, getStaffStats } from "@/lib/public-api";
import { PublicShell } from "@/components/public-shell";
import { Seo, faqSchema } from "@/components/Seo";

export const Route = createFileRoute("/")({
  loader: async () => {
    const [data, banners, services, news, staffStats] = await Promise.all([
      getAll(),
      getBanners(),
      getServices(),
      getNews(),
      getStaffStats(),
    ]);
    return { data, banners: banners.data, services: services.data, news: news.data, staffStats };
  },
  head: () => ({
    meta: [
      { title: "Bệnh Viện Đa Khoa Châu Thành Nam Tân Uyên" },
      { name: "description", content: "Bệnh viện đa khoa tại Tân Uyên, Bình Dương với đội ngũ bác sĩ tận tâm, dịch vụ y tế toàn diện và cấp cứu 24/7." },
      { property: "og:title", content: "Bệnh Viện Đa Khoa Châu Thành Nam Tân Uyên" },
      { property: "og:description", content: "Chăm sóc sức khỏe tận tâm với dịch vụ y tế toàn diện tại Tân Uyên, Bình Dương." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const data = Route.useLoaderData();
  const hospitalName = data.data.settings.find((item) => item.ma_cai_dat === "ten_benh_vien")?.gia_tri || "Bệnh viện Đa khoa Tân Uyên";
  return <><Seo data={data.data} title={`${hospitalName} - Bệnh viện Đa khoa Tân Uyên`} schema={faqSchema()} /><PublicShell {...data} /></>;
}
