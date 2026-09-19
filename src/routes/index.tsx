import { createFileRoute } from "@tanstack/react-router";
import { getBanners, getDoctors, getServices } from "../../lib/api";
import { HospitalHome } from "@/components/hospital-home";

export const Route = createFileRoute("/")({
  loader: async () => {
    const [banners, services, doctors] = await Promise.all([
      getBanners(),
      getServices(),
      getDoctors(),
    ]);
    return { banners, services, doctors };
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
  return <HospitalHome {...data} />;
}
