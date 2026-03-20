import { Header } from "@/components/layout/Header";
import { FloatingActions } from "@/components/layout/FloatingActions";
import { AmazingHero } from "@/components/sections/AmazingHero";
import { DirectorMessage } from "@/components/sections/DirectorMessage";
import { VideoTour } from "@/components/sections/VideoTour";
import { AboutSection } from "@/components/sections/AboutSection";
import { FacilitiesSection } from "@/components/sections/FacilitiesSection";
import { NewsSection } from "@/components/sections/NewsSection";

import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { FAQSection } from "@/components/sections/FAQSection";
import { CallToAction } from "@/components/sections/CallToAction";
import { StatsSection } from "@/components/sections/StatsSection";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { AcademicsSection } from "@/components/sections/AcademicsSection";
import { StudentLifeSection } from "@/components/sections/StudentLifeSection";
import { TeamSection } from "@/components/sections/TeamSection";
import { ContactSection } from "@/components/sections/ContactSection";
import { Footer } from "@/components/layout/Footer";

export default function Index() {
  return (
    <div className="min-h-screen bg-background relative selection:bg-primary/10 selection:text-primary overflow-x-hidden">
      <Header />

      <main className="relative z-0">
        <AmazingHero />

        {/* 2. School Introduction */}
        <AboutSection />

        {/* 4. Why Choose Our School */}
        <WhyChooseUs />

        {/* 5. School Statistics */}
        <StatsSection />

        {/* 3. Academic Programs */}
        <AcademicsSection />

        {/* 9. Facilities Section */}
        <FacilitiesSection />

        <DirectorMessage />

        {/* 10. Meet Our Teachers */}
        <TeamSection />

        <StudentLifeSection />
        <VideoTour />

        {/* 7. Photo Gallery */}


        {/* 6. Latest News / Announcements */}
        <NewsSection />

        {/* 8. Testimonials */}
        <TestimonialsSection />

        {/* 12. Contact Section */}
        <ContactSection />

        <FAQSection />
        <CallToAction />
      </main>

      <FloatingActions />
      <Footer />
    </div>
  );
}
