import HeroSection from "@/components/home/HeroSection";
import StatsBar from "@/components/home/StatsBar";
import CategoriesSection from "@/components/home/CategoriesSection";
import FarmerSection from "@/components/home/FarmerSection";
import HarvestSection from "@/components/home/HarvestSection";
import TestimonialsSection from "@/components/home/TestimonialsSection";
import NewsletterSection from "@/components/home/NewsletterSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <StatsBar />
      <CategoriesSection />
      {/* <FarmerSection /> */}
      <HarvestSection />
      <TestimonialsSection />
      <NewsletterSection />
    </>
  );
}


