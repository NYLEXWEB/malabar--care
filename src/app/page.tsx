import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/hero";
import { TrustStrip } from "@/components/trust-strip";
import { Services } from "@/components/services";
import { About } from "@/components/about";
import { WhyChooseUs } from "@/components/why-choose-us";
import { Gallery } from "@/components/gallery";
import { GoogleReviews } from "@/components/google-reviews";
import { SocialMediaSection } from "@/components/social-media-section";
import { VlogsSection } from "@/components/vlogs-section";
import { ContactSection } from "@/components/contact-section";
import { Footer } from "@/components/footer";
import {
  getWebsiteContent,
  getServices,
  getVlogs,
} from "@/lib/db/repository";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [content, services, vlogs] = await Promise.all([
    getWebsiteContent(),
    getServices(true),
    getVlogs(true),
  ]);

  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Floating Modern Navbar */}
      <Navbar phone={content.contactInfo.phone} />

      {/* Hero Section with Full Background Image */}
      <Hero
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
        title={content.servicesHeading.title}
        subtitle={content.servicesHeading.subtitle}
        services={services as any}
      />

      {/* About Section */}
      <About
        title={content.about.title}
        description={content.about.description}
        bulletPoints={content.about.bulletPoints}
        ctaLabel={content.about.ctaLabel}
        image={content.about.image}
      />

      {/* Why Choose Us */}
      <WhyChooseUs
        title={content.whyChooseUs.title}
        items={content.whyChooseUs.items}
      />

      {/* Interactive Photo Showcase Gallery */}
      <Gallery
        title={content.galleryHeading.title}
        subtitle={content.galleryHeading.subtitle}
      />

      {/* Google Reviews Integration Section */}
      <GoogleReviews />

      {/* Social Media Channels Section (Google, Instagram, Facebook, WhatsApp) */}
      <SocialMediaSection />

      {/* Vlogs & Insights */}
      <VlogsSection vlogs={vlogs as any} />

      {/* Interactive Contact & Quote Section */}
      <ContactSection contactInfo={content.contactInfo} />

      {/* Footer */}
      <Footer footerData={content.footer} contactInfo={content.contactInfo} />
    </div>
  );
}
