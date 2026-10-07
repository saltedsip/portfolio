import { Helmet } from "react-helmet-async";
import { personalInfo } from "@/data/portfolio";
import { resolveSeo, serializeJsonLd, type SeoInput } from "@/lib/seo";

export const SEO = (props: SeoInput) => {
  const seo = resolveSeo(props);

  return (
    <Helmet>
      {/* Standard Metadata */}
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      {seo.noindex && <meta name="robots" content="noindex" />}
      {!seo.noindex && <link rel="canonical" href={seo.url} />}

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={seo.type} />
      <meta property="og:site_name" content={personalInfo.name} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />

      {/* Structured data */}
      {seo.jsonLd.map((data, i) => (
        <script key={i} type="application/ld+json">
          {serializeJsonLd(data)}
        </script>
      ))}
    </Helmet>
  );
};
