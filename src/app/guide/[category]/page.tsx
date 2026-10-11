import { notFound } from "next/navigation";
import {
  RECYCLE_CATEGORIES,
  ScrapGuideCategory,
} from "@/lib/recycleGuideData";
import CategoryGuideInteractive from "@/components/CategoryGuideInteractive";

// Static params for all 6 categories
export function generateStaticParams() {
  return Object.keys(RECYCLE_CATEGORIES).map((slug) => ({
    category: slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category } = await params;
  const data = RECYCLE_CATEGORIES[category?.toLowerCase()];
  if (!data) return { title: "Recycling Guide – ScrapHop" };

  return {
    title: `${data.name} Recycling Guide & India Waste Stats – ScrapHop`,
    description: `Discover how much ${data.name.toLowerCase()} waste India generates per hour, step-by-step industrial recycling processes, transformed circular products, and calculate value on ScrapHop.`,
  };
}

export default async function ScrapCategoryGuidePage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: rawCategory } = await params;
  const categorySlug = rawCategory?.toLowerCase();
  const data: ScrapGuideCategory = RECYCLE_CATEGORIES[categorySlug];

  if (!data) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <CategoryGuideInteractive data={data} />
      </div>
    </div>
  );
}
