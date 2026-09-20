import { createFileRoute } from "@tanstack/react-router";
import { getAll, getService } from "@/lib/public-api";
import { ServiceDetailPage } from "@/components/public-pages";

export const Route = createFileRoute("/dich-vu/$slug")({
  loader: async ({ params }) => { const [data, service] = await Promise.all([getAll(), getService(params.slug)]); return { data, item: service.data[0] }; },
  component: () => <ServiceDetailPage {...Route.useLoaderData()} />,
});
