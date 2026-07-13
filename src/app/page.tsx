import { Navbar } from '@/components/nav/Navbar';
import { Hero } from '@/components/hero/Hero';
import { WebSection } from '@/components/sections/WebSection';
import { MobileSection } from '@/components/sections/MobileSection';
import { CustomSoftwareSection } from '@/components/sections/CustomSoftwareSection';
import { AboutSection } from '@/components/sections/AboutSection';
import { CareersTeaser } from '@/components/sections/CareersTeaser';
import { ContactSection } from '@/components/contact/ContactSection';
import { Footer } from '@/components/sections/Footer';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        <WebSection />
        <MobileSection />
        <CustomSoftwareSection />
        <AboutSection />
        <CareersTeaser />
        <ContactSection />
      </main>

      <Footer />
    </div>
  );
}
