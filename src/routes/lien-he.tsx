import { createFileRoute } from "@tanstack/react-router";
import { getAll } from "@/lib/public-api";
import { ContactPage } from "@/components/public-pages";

export const Route = createFileRoute("/lien-he")({
  loader: getAll,
  component: () => <ContactPage data={Route.useLoaderData()} />,
});
