import Navbar from "@/components/common/Navbar";
import HeroSection from "@/components/sections/HeroSection";
import TrustBarSection from "@/components/sections/TrustBarSection";
import ServicesSection from "@/components/sections/ServicesSection";
import HomeWorkSection from "@/components/sections/HomeWorkSection";
import ProcessSection from "@/components/sections/ProcessSection";
import PricingSection from "@/components/sections/PricingSection";
import FeaturesSection from "@/components/sections/FeaturesSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import FAQSection from "@/components/sections/FAQSection";
import CalendlySection from "@/components/sections/CalendlySection";
import Footer from "@/components/sections/Footer";
import { getHomeContent } from "@/lib/content";

export const revalidate = 300;

export default async function Home() {
  const { featuredReel, shortFormVideos } = await getHomeContent();

  return (
    <main>
      <Navbar />
      <HeroSection />
      <TrustBarSection />
      <ServicesSection featuredReel={featuredReel} />
      <HomeWorkSection shortFormVideos={shortFormVideos} />
      <ProcessSection />
      <PricingSection />
      <FeaturesSection />
      <TestimonialsSection />
      <FAQSection />
      <CalendlySection />
      <Footer />
    </main>
  );
}
