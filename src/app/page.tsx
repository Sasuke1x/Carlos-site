import Hero from "@/components/home/Hero";
import WhoWeServe from "@/components/home/WhoWeServe";
import FeaturedProperties from "@/components/home/FeaturedProperties";
import WhyBookDirect from "@/components/home/WhyBookDirect";
import AboutPreview from "@/components/home/AboutPreview";
import OwnerCTA from "@/components/home/OwnerCTA";

const HomePage = () => {
  return (
    <>
      <Hero />
      <WhoWeServe />
      <FeaturedProperties />
      <WhyBookDirect />
      <AboutPreview />
      <OwnerCTA />
    </>
  );
};

export default HomePage;
