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
        schema={post.ingredients ? {
          "@context": "https://schema.org",
          "@type": "Recipe",
          "name": post.title,
          "image": post.imageUrl,
          "datePublished": post.date,
          "description": post.excerpt,
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
          "prepTime": post.prepTime ? `PT${post.prepTime.replace(/\s+/g, '')}` : undefined,
          "cookTime": post.cookTime ? `PT${post.cookTime.replace(/\s+/g, '')}` : undefined,
          "totalTime": post.totalTime ? `PT${post.totalTime.replace(/\s+/g, '')}` : undefined,
          "recipeYield": post.servings ? `${post.servings} servings` : undefined,
          "recipeCategory": post.category,
          "recipeCuisine": post.cuisine,
          "nutrition": post.nutritionInfo ? {
            "@type": "NutritionInformation",
            "calories": `${post.nutritionInfo.calories} calories`,
            "carbohydrateContent": `${post.nutritionInfo.carbs}g`,
            "proteinContent": `${post.nutritionInfo.protein}g`,
            "fatContent": `${post.nutritionInfo.fat}g`,
            "fiberContent": `${post.nutritionInfo.fiber}g`,
            ...(post.nutritionInfo.sugar ? { "sugarContent": `${post.nutritionInfo.sugar}g` } : {}),
            ...(post.nutritionInfo.sodium ? { "sodiumContent": `${post.nutritionInfo.sodium}mg` } : {})
          } : undefined,
          "recipeIngredient": post.ingredients?.map(i => `${i.quantity} ${i.unit} ${i.name}${i.notes ? ` (${i.notes})` : ''}`),
          "recipeInstructions": post.cookingSteps?.map(step => ({
            "@type": "HowToStep",
            "text": step.instruction,
            "name": `Step ${step.step}`,
            ...(step.timeRequired ? { "performTime": `PT${step.timeRequired.replace(/\s+/g, '')}` } : {})
          })),
          "keywords": post.tags.join(", ")
        } : {
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
          {/* Recipe Info Card (if available) */}
          {(post.prepTime || post.cookTime || post.ingredients) && (
            <div className="bg-slate-50 rounded-xl p-6 mb-10 shadow-sm">
              {/* Recipe Meta */}
              {(post.prepTime || post.cookTime || post.totalTime || post.servings || post.difficulty || post.cuisine) && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6 border-b border-slate-200 pb-6">
                  {post.prepTime && (
                    <div>
                      <p className="text-sm font-medium text-slate-500">Prep Time</p>
                      <p className="font-semibold">{post.prepTime}</p>
                    </div>
                  )}
                  {post.cookTime && (
                    <div>
                      <p className="text-sm font-medium text-slate-500">Cook Time</p>
                      <p className="font-semibold">{post.cookTime}</p>
                    </div>
                  )}
                  {post.totalTime && (
                    <div>
                      <p className="text-sm font-medium text-slate-500">Total Time</p>
                      <p className="font-semibold">{post.totalTime}</p>
                    </div>
                  )}
                  {post.servings && (
                    <div>
                      <p className="text-sm font-medium text-slate-500">Servings</p>
                      <p className="font-semibold">{post.servings}</p>
                    </div>
                  )}
                  {post.difficulty && (
                    <div>
                      <p className="text-sm font-medium text-slate-500">Difficulty</p>
                      <p className="font-semibold">{post.difficulty}</p>
                    </div>
                  )}
                  {post.cuisine && (
                    <div>
                      <p className="text-sm font-medium text-slate-500">Cuisine</p>
                      <p className="font-semibold">{post.cuisine}</p>
                    </div>
                  )}
                </div>
              )}
              
              {/* Ingredients */}
              {post.ingredients && post.ingredients.length > 0 && (
                <div className="mb-6">
                  <h3 className="text-xl font-bold mb-4">Ingredients</h3>
                  <ul className="space-y-3">
                    {post.ingredients.map((ingredient, index) => (
                      <li key={index} className="flex items-start">
                        <div className="min-w-5 mt-1 mr-3">
                          <span className="inline-block w-3 h-3 bg-primary rounded-full"></span>
                        </div>
                        <div>
                          <span className="font-medium">
                            {ingredient.quantity} {ingredient.unit} {ingredient.name}
                          </span>
                          {ingredient.notes && <span className="text-slate-600 ml-2 text-sm">({ingredient.notes})</span>}
                          {ingredient.substitutes && (
                            <div className="text-sm text-slate-600 mt-1">
                              <span className="italic">Substitute: </span>
                              {ingredient.substitutes.name}
                              <span className={`ml-1 ${
                                ingredient.substitutes.costImpact === 'higher' 
                                  ? 'text-amber-600' 
                                  : ingredient.substitutes.costImpact === 'lower' 
                                    ? 'text-green-600' 
                                    : 'text-slate-600'
                              }`}>
                                ({ingredient.substitutes.costImpact === 'higher' 
                                  ? 'more expensive' 
                                  : ingredient.substitutes.costImpact === 'lower' 
                                    ? 'more affordable' 
                                    : 'similar cost'})
                              </span>
                            </div>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
          
          {/* Main Content */}
          <div className="prose prose-lg max-w-none">
            <ReactMarkdown>
              {post.content}
            </ReactMarkdown>
          </div>
          
          {/* Step by Step Cooking Instructions */}
          {post.cookingSteps && post.cookingSteps.length > 0 && (
            <div className="my-12">
              <h2 className="text-2xl font-bold mb-6">Step-by-Step Cooking Instructions</h2>
              <div className="space-y-8">
                {post.cookingSteps.map((step) => (
                  <div key={step.step} className="relative pl-12 border-l-2 border-primary/20">
                    <div className="absolute left-[-18px] top-0 w-9 h-9 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                      {step.step}
                    </div>
                    <h3 className="font-bold text-lg mb-2">Step {step.step}</h3>
                    <p className="mb-3">{step.instruction}</p>
                    {step.timeRequired && (
                      <div className="flex items-center text-sm text-slate-600 mb-2">
                        <Clock className="h-4 w-4 mr-1" />
                        <span>{step.timeRequired}</span>
                      </div>
                    )}
                    {step.tipNote && (
                      <div className="bg-amber-50 border-l-4 border-amber-400 p-3 rounded-r-lg">
                        <p className="text-sm text-amber-800 font-medium">Chef's Tip</p>
                        <p className="text-sm text-amber-700">{step.tipNote}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Nutrition Information */}
          {post.nutritionInfo && (
            <div className="my-12 bg-white border border-slate-200 rounded-xl overflow-hidden shadow-sm">
              <div className="bg-primary/10 p-4 border-b border-slate-200">
                <h2 className="text-xl font-bold">Nutrition Information</h2>
                <p className="text-sm text-slate-600">Per serving</p>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mb-4">
                  <div>
                    <p className="text-lg font-bold text-primary">{post.nutritionInfo.calories}</p>
                    <p className="text-sm text-slate-600">Calories</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-primary">{post.nutritionInfo.protein}g</p>
                    <p className="text-sm text-slate-600">Protein</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-primary">{post.nutritionInfo.carbs}g</p>
                    <p className="text-sm text-slate-600">Carbs</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-primary">{post.nutritionInfo.fat}g</p>
                    <p className="text-sm text-slate-600">Fat</p>
                  </div>
                  <div>
                    <p className="text-lg font-bold text-primary">{post.nutritionInfo.fiber}g</p>
                    <p className="text-sm text-slate-600">Fiber</p>
                  </div>
                  {post.nutritionInfo.sugar !== undefined && (
                    <div>
                      <p className="text-lg font-bold text-primary">{post.nutritionInfo.sugar}g</p>
                      <p className="text-sm text-slate-600">Sugar</p>
                    </div>
                  )}
                  {post.nutritionInfo.sodium !== undefined && (
                    <div>
                      <p className="text-lg font-bold text-primary">{post.nutritionInfo.sodium}mg</p>
                      <p className="text-sm text-slate-600">Sodium</p>
                    </div>
                  )}
                </div>
                {post.nutritionInfo.additionalInfo && (
                  <p className="text-sm text-slate-600 italic">{post.nutritionInfo.additionalInfo}</p>
                )}
              </div>
            </div>
          )}
          
          {/* Health Benefits */}
          {post.healthBenefits && post.healthBenefits.length > 0 && (
            <div className="my-12">
              <h2 className="text-2xl font-bold mb-4">Health Benefits</h2>
              <div className="bg-green-50 rounded-xl p-6">
                <ul className="space-y-3">
                  {post.healthBenefits.map((benefit, index) => (
                    <li key={index} className="flex items-start">
                      <div className="text-green-600 mr-3 mt-1">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <p>{benefit}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}
          
          {/* Cost Estimate */}
          {post.estimatedCost && (
            <div className="my-12">
              <h2 className="text-2xl font-bold mb-4">Estimated Cost</h2>
              <div className="bg-slate-100 rounded-xl p-6">
                <p className="text-lg font-semibold">{post.estimatedCost}</p>
              </div>
            </div>
          )}
          
          {/* History and Origins */}
          {post.historyAndOrigins && (
            <div className="my-12">
              <h2 className="text-2xl font-bold mb-4">History & Origins</h2>
              <div className="prose max-w-none">
                <p>{post.historyAndOrigins}</p>
              </div>
            </div>
          )}
          
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