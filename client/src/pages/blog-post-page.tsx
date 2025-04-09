import React from 'react';
import { useLocation, useRoute } from 'wouter';
import { blogPosts, BlogPost } from '@/data/blogPosts';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ChevronLeft, Clock, Calendar, User } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { formatBlogDate, getRelatedPosts } from '@/lib/blog-utils';
import SEO from '@/components/SEO';
import { motion } from 'framer-motion';

export default function BlogPostPage() {
  const [, navigate] = useLocation();
  const [, params] = useRoute('/blog/:slug');
  const slug = params?.slug;
  
  const post = blogPosts.find(post => post.slug === slug);
  
  if (!post) {
    return (
      <div className="container mx-auto py-16 px-4">
        <Card className="w-full max-w-lg mx-auto">
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-semibold mb-2">Blog Post Not Found</h2>
            <p className="text-slate-600 mb-6">
              Sorry, the blog post you are looking for doesn't exist or has been moved.
            </p>
            <Button onClick={() => navigate('/blog')}>
              <ChevronLeft className="mr-2 h-4 w-4" /> Back to Blog
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  // Get related posts
  const relatedPosts = getRelatedPosts(post, blogPosts, 3);

  return (
    <div>
      <SEO 
        title={`${post.title} | Recipe Snap Blog`}
        description={post.excerpt}
        canonical={`/blog/${post.slug}`}
        image={post.imageUrl}
        schema={{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": post.title,
          "image": post.imageUrl,
          "datePublished": post.date,
          "dateModified": post.date,
          "author": {
            "@type": "Person",
            "name": post.author
          },
          "publisher": {
            "@type": "Organization",
            "name": "Recipe Snap",
            "logo": {
              "@type": "ImageObject",
              "url": "/logo.png"
            }
          },
          "description": post.excerpt,
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `/blog/${post.slug}`
          },
          "keywords": post.tags.join(", ")
        }}
      />
      
      {/* Hero Section */}
      <div className="w-full h-[40vh] md:h-[50vh] relative">
        <div className="absolute inset-0 bg-black/40 z-10"></div>
        <img 
          src={post.imageUrl} 
          alt={post.title} 
          className="w-full h-full object-cover" 
        />
        <div className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/80 to-transparent pt-16 pb-8 px-4">
          <div className="container mx-auto">
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map(tag => (
                <Badge key={tag} className="bg-white/20 hover:bg-white/30 text-white backdrop-blur-sm">
                  {tag}
                </Badge>
              ))}
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 max-w-4xl">
              {post.title}
            </h1>
            
            <div className="flex flex-wrap items-center text-white/80 gap-x-4 gap-y-2">
              <div className="flex items-center">
                <User className="h-4 w-4 mr-2" />
                <span>{post.author}, {post.authorTitle}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{formatBlogDate(post.date)}</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-2" />
                <span>{post.readTime} min read</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Blog Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-lg max-w-none">
            <ReactMarkdown>
              {post.content}
            </ReactMarkdown>
          </div>
          
          {/* Author Box */}
          <div className="border-t border-b border-gray-200 my-12 py-8">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-teal-600 rounded-full flex items-center justify-center text-white text-xl font-bold">
                {post.author.split(' ').map(part => part[0]).join('')}
              </div>
              <div>
                <h3 className="text-xl font-bold">{post.author}</h3>
                <p className="text-slate-600 mb-3">{post.authorTitle}</p>
                <p className="text-sm text-slate-600">
                  Culinary expert sharing insights and knowledge to help you become a better cook and food enthusiast.
                </p>
              </div>
            </div>
          </div>
          
          {/* Back to Blog */}
          <Button 
            onClick={() => navigate('/blog')} 
            variant="outline" 
            className="mb-12"
          >
            <ChevronLeft className="mr-2 h-4 w-4" /> Back to Blog
          </Button>
        </div>
      </div>
      
      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="bg-slate-50 py-16 px-4">
          <div className="container mx-auto">
            <h2 className="text-3xl font-bold mb-8 text-center">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {relatedPosts.map((relatedPost, index) => (
                <RelatedPostCard 
                  key={relatedPost.id} 
                  post={relatedPost} 
                  index={index}
                  onClick={() => {
                    window.scrollTo(0, 0);
                    navigate(`/blog/${relatedPost.slug}`);
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

interface RelatedPostCardProps {
  post: BlogPost;
  index: number;
  onClick: () => void;
}

function RelatedPostCard({ post, index, onClick }: RelatedPostCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="h-full"
    >
      <Card className="overflow-hidden h-full flex flex-col hover:shadow-lg transition-shadow duration-300">
        <div className="relative aspect-video overflow-hidden">
          <img 
            src={post.imageUrl} 
            alt={post.title} 
            className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
          />
        </div>
        
        <CardContent className="p-5 flex-grow flex flex-col">
          <div className="flex items-center text-sm text-slate-500 mb-3">
            <span>{formatBlogDate(post.date)}</span>
            <span className="mx-2">•</span>
            <span>{post.readTime} min read</span>
          </div>
          
          <h3 className="text-lg font-bold mb-2 line-clamp-2">{post.title}</h3>
          <p className="text-slate-600 mb-4 text-sm line-clamp-2 flex-grow">
            {post.excerpt}
          </p>
          
          <Button onClick={onClick} variant="outline" size="sm" className="mt-auto">
            Read article
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}