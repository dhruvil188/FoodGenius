import { storage } from '../storage';

interface SitemapEntry {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

/**
 * Generates a sitemap XML for the application
 * @param domain The base domain for the sitemap URLs
 * @returns XML string of sitemap
 */
export async function generateSitemap(domain: string): Promise<string> {
  try {
    // Start with static pages
    const entries: SitemapEntry[] = [
      {
        loc: `${domain}/`,
        changefreq: 'weekly',
        priority: 1.0
      },
      {
        loc: `${domain}/auth`,
        changefreq: 'monthly',
        priority: 0.7
      },
      {
        loc: `${domain}/chat`,
        changefreq: 'daily',
        priority: 0.8
      },
      {
        loc: `${domain}/credits`,
        changefreq: 'monthly',
        priority: 0.6
      }
    ];

    // Add dynamic entries for public recipes
    const publicRecipes = await storage.getPublicRecipes();
    
    // Add recipe entries
    const recipeEntries = publicRecipes.map(recipe => {
      return {
        loc: `${domain}/recipes/${recipe.id}`,
        lastmod: recipe.updatedAt?.toISOString() || recipe.createdAt.toISOString(),
        changefreq: 'weekly' as const,
        priority: 0.9
      };
    });
    
    entries.push(...recipeEntries);
    
    // Generate the XML output
    const xmlItems = entries.map(entry => {
      let xml = `  <url>\n    <loc>${escapeXml(entry.loc)}</loc>`;
      
      if (entry.lastmod) {
        xml += `\n    <lastmod>${entry.lastmod}</lastmod>`;
      }
      
      if (entry.changefreq) {
        xml += `\n    <changefreq>${entry.changefreq}</changefreq>`;
      }
      
      if (entry.priority !== undefined) {
        xml += `\n    <priority>${entry.priority.toFixed(1)}</priority>`;
      }
      
      xml += '\n  </url>';
      return xml;
    }).join('\n');
    
    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${xmlItems}
</urlset>`;
  } catch (error) {
    console.error('Error generating sitemap:', error);
    throw error;
  }
}

/**
 * Escape XML special characters to prevent XML injection
 */
function escapeXml(unsafe: string): string {
  return unsafe
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}