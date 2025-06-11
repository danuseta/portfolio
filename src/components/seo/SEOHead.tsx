import Head from 'next/head';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogImage?: string;
  ogType?: string;
  structuredData?: any;
  noIndex?: boolean;
}

export default function SEOHead({
  title = 'Muhammad Danu Seta Wiardana - Portfolio | Full Stack Developer & Web Developer',
  description = 'Portfolio Muhammad Danu Seta Wiardana (Danu Seta) - Experienced Full Stack Developer, Web Developer, and Software Engineer. Specializing in modern web development, mobile applications, and user experience design.',
  keywords = [
    'Muhammad Danu Seta Wiardana',
    'Danu Seta', 
    'M Danu Seta W',
    'Muhammad Danu',
    'Danu Seta Wiardana',
    'Full Stack Developer',
    'Web Developer',
    'Software Engineer'
  ],
  canonicalUrl = 'https://www.danuseta.my.id',
  ogImage = 'https://www.danuseta.my.id/images/og-image.png',
  ogType = 'website',
  structuredData,
  noIndex = false
}: SEOHeadProps) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(', ')} />

      <meta name="robots" content={noIndex ? 'noindex, nofollow' : 'index, follow'} />

      <link rel="canonical" href={canonicalUrl} />

      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:site_name" content="Muhammad Danu Seta Wiardana Portfolio" />

      <meta name="author" content="Muhammad Danu Seta Wiardana" />
      <meta name="creator" content="Muhammad Danu Seta Wiardana" />
      <meta name="publisher" content="Muhammad Danu Seta Wiardana" />
      
      <meta name="language" content="English" />
      <meta name="geo.region" content="ID" />
      <meta name="geo.country" content="Indonesia" />

      {structuredData && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(structuredData)
          }}
        />
      )}
    </Head>
  );
} 