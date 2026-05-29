import type { Metadata } from "next";
import Navbar from "@/components/common/Navbar";
import PortfolioCreativeGrid from "@/components/sections/PortfolioCreativeGrid";
import Footer from "@/components/sections/Footer";
import { getPortfolioItems } from "@/lib/content";

export const metadata: Metadata = {
  title: "Portfolio | TBM STUDIOZ",
  description: "Explore our creative portfolio of commercials, social content, brand films, and short-form edits.",
};

export const revalidate = 300;

export default async function PortfolioPage() {
  const items = await getPortfolioItems();

  return (
    <main>
      <Navbar />
      <PortfolioCreativeGrid items={items} />
      <Footer />
    </main>
  );
}
