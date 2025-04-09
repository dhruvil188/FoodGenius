import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title?: string;
  description?: string;
  canonical?: string;
  image?: string;
  type?: string;
  schema?: Record<string, any>;
}

export default function SEO({
  title = 'Recipe Snap | Find recipes from food photos',
  description = 'Upload food photos and get instant recipes with AI-powered analysis. Find cooking instructions, recipe variations, and side dish recommendations.',
  canonical,
  image = '/assets/recipe-snap-social.jpg',
  type = 'website',
  schema,
}: SEOProps) {
  // Get the site URL - for production deployment, use the actual domain
  const siteUrl = typeof window !== 'undefined' 
    ? window.location.origin 
    : 'https://image2recipe.com'; // Fallback domain
    
  // Create the full canonical URL with the site URL
  const url = canonical 
    ? (canonical.startsWith('http') ? canonical : `${siteUrl}${canonical.startsWith('/') ? '' : '/'}${canonical}`) 
    : siteUrl;
  
  return (
    <Helmet>
      {/* Basic metadata */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {image && <meta property="og:image" content={image.startsWith('http') ? image : `${siteUrl}${image.startsWith('/') ? '' : '/'}${image}`} />}
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {image && <meta name="twitter:image" content={image.startsWith('http') ? image : `${siteUrl}${image.startsWith('/') ? '' : '/'}${image}`} />}
      
      {/* Schema.org JSON-LD */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
}