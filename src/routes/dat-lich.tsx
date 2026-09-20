import { createFileRoute } from "@tanstack/react-router";
import { getAll } from "@/lib/public-api";
import { AppointmentPage } from "@/components/public-pages";

export const Route = createFileRoute("/dat-lich")({
  loader: getAll,
  component: () => <AppointmentPage data={Route.useLoaderData()} />,
});
