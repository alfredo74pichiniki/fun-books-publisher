import { HeroSection } from "@/components/home/HeroSection";
import { StatsBar } from "@/components/home/StatsBar";
import { BookSlider } from "@/components/home/BookSlider";
import { CategoriesGrid } from "@/components/home/CategoriesGrid";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { NewsletterSection } from "@/components/NewsletterSection";
import { SocialSection } from "@/components/home/SocialSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <StatsBar />
      <BookSlider />
      <CategoriesGrid />
      <TestimonialsSection />
      <NewsletterSection />
      <SocialSection />
    </>
  );
}
