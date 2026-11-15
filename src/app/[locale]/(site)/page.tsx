import { HeroSection } from "@/components/home/HeroSection";
import { BookSlider } from "@/components/home/BookSlider";
import { CategoriesGrid } from "@/components/home/CategoriesGrid";
import { NewsletterSection } from "@/components/NewsletterSection";
import { SocialSection } from "@/components/home/SocialSection";

export default function Home() {
  return (
    <>
      <HeroSection />
      <BookSlider />
      <CategoriesGrid />
      <NewsletterSection />
      <SocialSection />
    </>
  );
}
