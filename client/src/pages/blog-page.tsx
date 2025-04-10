import React, { useState } from 'react';
import { useLocation } from 'wouter';
import { blogPosts, BlogPost } from '@/data/blogPosts';
import { finalBlogPosts } from '@/data/finalBlogPosts';
import { newBlogPosts } from '@/data/newBlogPosts';
import SEO from '@/components/SEO';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { formatBlogDate, getAllCategories, slugify } from '@/lib/blog-utils';

export default function BlogPage() {
  const [, navigate] = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Combine all blog posts from all sources
  const allBlogPosts = [...blogPosts, ...finalBlogPosts, ...newBlogPosts];
  
  const categories = ['all', ...getAllCategories(allBlogPosts)];
  
  // Filter posts based on search query and active category
  const filteredPosts = allBlogPosts.filter(post => {
    const matchesSearch = 
      searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = 
      activeCategory === 'all' || 
      post.category === activeCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <SEO 
        title="Blog | Recipe Snap"
        description="Explore our collection of food articles, cooking tips, and culinary insights to enhance your cooking skills and food knowledge."
        canonical="/blog"
        schema={{
          "@context": "https://schema.org",
          "@type": "Blog",
          "name": "Recipe Snap Blog",
          "description": "Culinary articles, recipes, and food science insights",
          "url": "/blog",
          "mainEntity": {
            "@type": "ItemList",
            "itemListElement": allBlogPosts.slice(0, 10).map((post, index) => ({
              "@type": "ListItem",
              "position": index + 1,
              "url": `/blog/${post.slug}`,
              "name": post.title
            })) || []
          }
        }}
      />
      
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-green-500 to-teal-600 text-transparent bg-clip-text">
          Recipe Snap Blog
        </h1>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Explore our collection of food articles, cooking tips, and culinary insights to enhance your cooking skills and food knowledge.
        </p>
      </div>
      
      {/* Search and filters */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <Input
            type="text"
            placeholder="Search articles..."
            value={searchQuery}
            onChange={handleSearch}
            className="max-w-md"
          />
          
          <Tabs 
            value={activeCategory} 
            onValueChange={setActiveCategory} 
            className="w-full md:w-auto"
          >
            <TabsList className="flex flex-wrap">
              {categories.map(category => (
                <TabsTrigger key={category} value={category} className="capitalize">
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </div>
      
      {/* Blog post grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPosts.map((post, index) => (
            <BlogPostCard 
              key={post.id} 
              post={post} 
              index={index} 
              onClick={() => navigate(`/blog/${post.slug}`)}
            />
          ))}
        </div>
      ) : (
        <Card className="p-8 text-center">
          <CardContent>
            <h3 className="text-xl font-medium mb-2">No articles found</h3>
            <p className="text-slate-600 mb-4">
              Try adjusting your search query or category filter.
            </p>
            <Button onClick={() => { setSearchQuery(''); setActiveCategory('all'); }}>
              Reset filters
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

interface BlogPostCardProps {
  post: BlogPost;
  index: number;
  onClick: () => void;
}

function BlogPostCard({ post, index, onClick }: BlogPostCardProps) {
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
          <div className="absolute top-2 right-2">
            <Badge variant="secondary" className="bg-white/80 text-slate-800 backdrop-blur-sm">
              {post.category}
            </Badge>
          </div>
        </div>
        
        <CardContent className="p-5 flex-grow flex flex-col">
          <div className="flex items-center text-sm text-slate-500 mb-3">
            <span>{formatBlogDate(post.date)}</span>
            <span className="mx-2">•</span>
            <span>{post.readTime} min read</span>
          </div>
          
          <h3 className="text-xl font-bold mb-2 line-clamp-2">{post.title}</h3>
          <p className="text-slate-600 mb-4 text-sm line-clamp-3 flex-grow">
            {post.excerpt}
          </p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {post.tags.slice(0, 3).map(tag => (
              <Badge key={tag} variant="outline" className="bg-slate-50">
                {tag}
              </Badge>
            ))}
            {post.tags.length > 3 && (
              <Badge variant="outline" className="bg-slate-50">
                +{post.tags.length - 3}
              </Badge>
            )}
          </div>
          
          <div className="flex items-center justify-between mt-auto">
            <div className="flex items-center">
              <div className="text-sm">
                <p className="font-medium">{post.author}</p>
              </div>
            </div>
            
            <Button onClick={onClick} variant="outline" size="sm">
              Read more
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}