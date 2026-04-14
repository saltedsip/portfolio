import Layout from "@/components/Layout";
import ContactSection from "@/components/sections/ContactSection";
import { SEO } from "@/components/SEO";
import { siteConfig } from "@/data/portfolio";

const ContactPage = () => (
  <Layout>
    <SEO
      title="Contact"
      description={`Get in touch with ${siteConfig.title.split(" - ")[0]}. Let's discuss your next project.`}
      url={`${siteConfig.url}/contact`}
    />
    <ContactSection />
  </Layout>
);

export default ContactPage;
