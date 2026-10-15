import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { TrustStrip } from "@/components/trust-strip";
import { About } from "@/components/about";
import { Services } from "@/components/services";
import { WhyChooseUs } from "@/components/why-choose-us";
import { Gallery } from "@/components/gallery";
import { VlogsSection } from "@/components/vlogs-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";
import {
  getWebsiteContent,
  getServices,
  getVlogs,
} from "@/lib/db/repository";

export default async function HomePage() {
  const [content, services, vlogs] = await Promise.all([
    getWebsiteContent(),
    getServices(true),
    getVlogs(true),
  ]);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <Navbar phone={content.contactInfo.phone} />

      {/* Hero Section */}
      <Hero
        badge={content.hero.badge}
        headline={content.hero.headline}
        supportingText={content.hero.supportingText}
        primaryCta={content.hero.primaryCta}
        secondaryCta={content.hero.secondaryCta}
        heroImage={content.hero.heroImage}
      />

      {/* Trust Pillars */}
      <TrustStrip items={content.trustStrip} />

      {/* Services Section */}
      <Services
        badge={content.servicesHeading.badge}
        title={content.servicesHeading.title}
        subtitle={content.servicesHeading.subtitle}
        services={services}
      />

      {/* About Section */}
      <About
        badge={content.about.badge}
        title={content.about.title}
        description={content.about.description}
        bulletPoints={content.about.bulletPoints}
        ctaLabel={content.about.ctaLabel}
        image={content.about.image}
      />

      {/* Why Choose Us */}
      <WhyChooseUs
        badge={content.whyChooseUs.badge}
        title={content.whyChooseUs.title}
        items={content.whyChooseUs.items}
      />

      {/* Work Showcase Gallery */}
      <Gallery
        badge={content.galleryHeading.badge}
        title={content.galleryHeading.title}
        subtitle={content.galleryHeading.subtitle}
      />

      {/* Vlogs & Insights */}
      <VlogsSection vlogs={vlogs} />

      {/* Interactive Contact & Quote Section */}
      <ContactSection contactInfo={content.contactInfo} />

      {/* Footer */}
      <Footer footerData={content.footer} contactInfo={content.contactInfo} />
    </div>
  );
}
