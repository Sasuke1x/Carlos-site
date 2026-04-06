import HeroSection from "@/components/home/HeroSection";
import TriadAuthority from "@/components/home/TriadAuthority";
import ServiceCards from "@/components/home/ServiceCards";
import SmartSystems from "@/components/home/SmartSystems";
import VipClub from "@/components/home/VipClub";
import FinalCta from "@/components/home/FinalCta";

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <TriadAuthority />
      <ServiceCards />
      <SmartSystems />
      <VipClub />
      <FinalCta />
    </>
  );
};

export default HomePage;
