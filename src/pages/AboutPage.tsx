import Layout from "@/components/Layout";
import AboutSection from "@/components/sections/AboutSection";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import { SEO } from "@/components/SEO";
import { siteConfig } from "@/data/portfolio";

const AboutPage = () => (
  <Layout>
    <SEO
      title="About"
      description={`Learn more about ${siteConfig.title.split(" - ")[0]} — skills, experience, and client testimonials.`}
      url={`${siteConfig.url}/about`}
    />
    <AboutSection />
    <TestimonialsSection />
  </Layout>
);

export default AboutPage;
