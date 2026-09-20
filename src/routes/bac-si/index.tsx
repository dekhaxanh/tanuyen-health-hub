import { createFileRoute } from "@tanstack/react-router";
import { getAll, getDoctors } from "@/lib/public-api";
import { DoctorListPage } from "@/components/public-pages";

export const Route = createFileRoute("/bac-si/")({
  loader: async () => { const [data, doctors] = await Promise.all([getAll(), getDoctors()]); return { data, doctors: doctors.data }; },
  component: () => <DoctorListPage {...Route.useLoaderData()} />,
});
