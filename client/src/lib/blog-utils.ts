import { format, parseISO } from 'date-fns';
import { BlogPost } from '@/data/blogPosts';

/**
 * Format a date string (YYYY-MM-DD) to a readable format (Month DD, YYYY)
 */
export function formatBlogDate(dateString: string): string {
  try {
    const date = parseISO(dateString);
    return format(date, 'MMMM dd, yyyy');
  } catch (error) {
    console.error('Error parsing date:', error);
    return dateString;
  }
}

/**
 * Calculate reading time for blog content
 */
export function calculateReadingTime(content: string): number {
  // Average reading speed: 225 words per minute
  const wordsPerMinute = 225;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

/**
 * Extracts the first paragraph from markdown content
 */
export function getExcerptFromContent(content: string, maxLength = 160): string {
  // Find the first paragraph after headings and images
  const paragraphMatch = content.match(/(?:^|\n)(?!#|!\[)([^\n]+)/);
  if (paragraphMatch && paragraphMatch[1]) {
    const excerpt = paragraphMatch[1].trim();
    if (excerpt.length <= maxLength) return excerpt;
    return excerpt.substring(0, maxLength).trim() + '...';
  }
  
  // Fallback: just get the first X characters if no paragraph found
  return content.substring(0, maxLength).trim() + '...';
}

/**
 * Get a list of all categories from blog posts
 */
export function getAllCategories(posts: BlogPost[]): string[] {
  const categories = new Set<string>();
  posts.forEach(post => {
    if (post.category) categories.add(post.category);
  });
  return Array.from(categories).sort();
}

/**
 * Get a list of all tags from blog posts
 */
export function getAllTags(posts: BlogPost[]): string[] {
  const tags = new Set<string>();
  posts.forEach(post => {
    post.tags?.forEach(tag => tags.add(tag));
  });
  return Array.from(tags).sort();
}

/**
 * Convert a string to a URL-friendly slug
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
}

/**
 * Get related posts based on tags and categories
 */
export function getRelatedPosts(
  currentPost: BlogPost,
  allPosts: BlogPost[],
  limit = 3
): BlogPost[] {
  // Filter out the current post
  const otherPosts = allPosts.filter(post => post.id !== currentPost.id);
  
  // Calculate relevance score for each post
  const scoredPosts = otherPosts.map(post => {
    let score = 0;
    
    // Score based on matching category
    if (post.category === currentPost.category) {
      score += 3;
    }
    
    // Score based on matching tags
    const matchingTags = post.tags.filter(tag => 
      currentPost.tags.includes(tag)
    );
    score += matchingTags.length * 2;
    
    return { post, score };
  });
  
  // Sort by score (highest first) and return the posts
  return scoredPosts
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.post);
}