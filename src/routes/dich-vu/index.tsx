import { createFileRoute } from "@tanstack/react-router";
import { getAll, getServices } from "@/lib/public-api";
import { ServiceListPage } from "@/components/public-pages";

export const Route = createFileRoute("/dich-vu/")({
  loader: async () => { const [data, services] = await Promise.all([getAll(), getServices()]); return { data, services: services.data }; },
  component: () => <ServiceListPage data={Route.useLoaderData().data} items={Route.useLoaderData().services} />,
});
