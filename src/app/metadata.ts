import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Muhammad Danu Seta Wiardana - Portfolio | Full Stack Developer',
  description: 'Portfolio Muhammad Danu Seta Wiardana (Danu Seta) - Experienced Full Stack Developer, Web Developer, and Software Engineer. Specializing in modern web development and user experience design.',
  keywords: [
    'Muhammad Danu Seta Wiardana',
    'Danu Seta',
    'M Danu Seta W',
    'Muhammad Danu',
    'Danu Seta Wiardana',
    'Full Stack Developer',
    'Web Developer',
    'Software Engineer',
    'Web Developer',
    'Frontend Developer',
    'Backend Developer',
    'React Developer',
    'Next.js Developer',
    'Portfolio',
    'Indonesian Developer',
    'Programmer Indonesia'
  ],
  authors: [{ name: 'Muhammad Danu Seta Wiardana', url: 'https://www.danuseta.my.id' }],
  creator: 'Muhammad Danu Seta Wiardana',
  publisher: 'Muhammad Danu Seta Wiardana',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://www.danuseta.my.id'),
  alternates: {
    canonical: '/',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.danuseta.my.id',
    title: 'Muhammad Danu Seta Wiardana - Portfolio | Full Stack Developer & Web Developer',
    description: 'Portfolio Muhammad Danu Seta Wiardana (Danu Seta) - Experienced Full Stack Developer, Web Developer, and Software Engineer. Specializing in modern web development, mobile applications, and user experience design.',
    siteName: 'Muhammad Danu Seta Wiardana Portfolio',
    images: [
      {
        url: 'https://www.danuseta.my.id/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Muhammad Danu Seta Wiardana - Full Stack Developer Portfolio',
      },
    ],
  },


  category: 'technology',
};
