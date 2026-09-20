import { createFileRoute } from "@tanstack/react-router";
import { getAll, getNewsArticle } from "@/lib/public-api";
import { NewsDetailPage } from "@/components/public-pages";

export const Route = createFileRoute("/tin-tuc/$slug")({
  loader: async ({ params }) => { const [data, article] = await Promise.all([getAll(), getNewsArticle(params.slug)]); return { data, item: article.data[0] }; },
  component: () => <NewsDetailPage {...Route.useLoaderData()} />,
});
