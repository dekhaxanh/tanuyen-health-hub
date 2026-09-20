import { createFileRoute } from "@tanstack/react-router";
import { getAll, getSpecialties } from "@/lib/public-api";
import { SpecialtyListPage } from "@/components/public-pages";

export const Route = createFileRoute("/chuyen-khoa/")({
  loader: async () => {
    const [data, specialties] = await Promise.all([getAll(), getSpecialties()]);
    return { data, items: specialties.data };
  },
  component: () => <SpecialtyListPage {...Route.useLoaderData()} />,
});
