import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { TYPOGRAPHY } from '../../constants';
import { Clock, User, ChevronRight, Loader2, Layers } from 'lucide-react';
import { Reveal } from '../../components/Reveal';
import { BlogService } from '../../services/blogService';
import { BlogPost } from '../../types';

const categories = ['All', 'Product Management', 'Design', 'Engineering', 'Career', 'Tech Trends', 'Data Analytics'];
  
export const BlogPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadPosts();
  }, []);

  const loadPosts = async () => {
    setIsLoading(true);
    const allPosts = await BlogService.getAllPosts();
    setPosts(allPosts);
    setIsLoading(false);
  };

  const featuredPost = posts.find(p => p.isFeatured) || (posts.length > 0 ? posts[0] : undefined);
  
  const gridPosts = posts.filter(p => {
    const matchesCategory = activeCategory === 'All' || p.category === activeCategory;
    const isNotFeatured = featuredPost ? p.id !== featuredPost.id : true;
    return matchesCategory && (activeCategory === 'All' ? isNotFeatured : true);
  });

  return (
    <div 
      className="w-full pb-[100px] md:pb-[160px] pt-[160px] md:pt-[240px]"
      style={{
        background: 'radial-gradient(rgba(252, 211, 77, 0.2) 2px, transparent 2px), linear-gradient(to bottom, #f0f6fa, #ffffff)',
        backgroundSize: '30px 30px, 100% 100%'
      }}
    >
      <div className="container mx-auto px-6">
        <Reveal width="100%" className="text-center mb-16">
          <span className="text-[#135291] font-bold tracking-wider uppercase text-sm mb-3 block">Our Blog</span>
          <h1 className={`${TYPOGRAPHY.header01} text-[#08223d] mb-6`}>Insights & Perspectives</h1>
          <p className={`${TYPOGRAPHY.body02} max-w-2xl mx-auto text-gray-500 mb-8`}>
            Expert advice, industry trends, and success stories to help you navigate your tech career.
          </p>
        </Reveal>

        <div className="flex flex-wrap justify-center gap-4 mb-24">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-8 py-3 rounded-full font-medium transition-all duration-300 border ${
                activeCategory === cat
                  ? 'bg-[#135291] text-white border-[#135291]'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-[#135291] hover:text-[#135291]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {isLoading && (
          <div className="flex justify-center py-20">
             <Loader2 size={40} className="text-[#135291] animate-spin" />
          </div>
        )}

        {!isLoading && posts.length === 0 && (
          <div className="text-center py-32 bg-white rounded-[32px] border border-dashed border-gray-300 max-w-4xl mx-auto mb-20">
             <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6 text-gray-400">
                <Layers size={32} />
             </div>
             <h3 className="text-2xl font-bold text-[#08223d] mb-2">No articles yet</h3>
             <p className="text-gray-500">Check back later for updates.</p>
          </div>
        )}

        {!isLoading && activeCategory === 'All' && featuredPost && (
          <Reveal width="100%" className="mb-32">
            <Link to={`/blog/${featuredPost.slug || featuredPost.id}`}>
                <div className="group relative rounded-xl md:rounded-3xl overflow-hidden bg-white grid md:grid-cols-2 cursor-pointer border border-gray-100 shadow-sm hover:shadow-md transition-all duration-500">
                <div className="relative h-64 md:h-auto overflow-hidden">
                    <img 
                    src={featuredPost.image} 
                    alt={featuredPost.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
                    onError={(e) => e.currentTarget.src = 'https://via.placeholder.com/800x600?text=No+Image'}
                    />
                    <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-1 rounded-full text-xs font-bold text-[#135291] uppercase tracking-wide shadow-sm">
                    Featured
                    </div>
                </div>
                <div className="p-8 md:p-14 flex flex-col justify-center">
                    <div className="flex items-center gap-3 text-sm text-gray-500 mb-6">
                    <span className="font-bold text-[#daa728]">{featuredPost.category}</span>
                    <span>•</span>
                    <span>{featuredPost.date}</span>
                    </div>
                    <h2 className={`${TYPOGRAPHY.header02} mb-6 group-hover:text-[#135291] transition-colors leading-tight`}>
                    {featuredPost.title}
                    </h2>
                    <p className="text-gray-600 mb-10 leading-relaxed text-lg line-clamp-3">
                    {featuredPost.excerpt}
                    </p>
                    <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 overflow-hidden border border-gray-200">
                            {featuredPost.authorImage ? (
                            <img src={featuredPost.authorImage} alt={featuredPost.author} className="w-full h-full object-cover" />
                            ) : (
                            <User size={20} />
                            )}
                        </div>
                        <div>
                        <p className="font-bold text-base text-[#08223d]">{featuredPost.author}</p>
                        <p className="text-sm text-gray-500">{featuredPost.readTime}</p>
                        </div>
                    </div>
                    <div className="w-12 h-12 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 group-hover:bg-[#135291] group-hover:text-white group-hover:border-[#135291] transition-all">
                        <ChevronRight size={24} />
                    </div>
                    </div>
                </div>
                </div>
            </Link>
          </Reveal>
        )}

        {!isLoading && gridPosts.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
            {gridPosts.map((post, i) => (
              <Reveal key={post.id} width="100%" delay={i * 0.1}>
                <Link to={`/blog/${post.slug || post.id}`} className="block h-full">
                    <div className="bg-white border border-gray-100 rounded-xl md:rounded-[24px] overflow-hidden transition-all duration-300 group cursor-pointer flex flex-col h-full hover:shadow-lg">
                    <div className="relative h-64 overflow-hidden bg-gray-100">
                        <img 
                        src={post.image} 
                        alt={post.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        onError={(e) => e.currentTarget.src = 'https://via.placeholder.com/600x400?text=No+Image'} 
                        />
                        <div className="absolute top-5 left-5 bg-white/90 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-bold text-[#08223d]">
                        {post.category}
                        </div>
                    </div>
                    <div className="p-6 md:p-8 flex flex-col flex-1">
                        <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
                        <Clock size={14} />
                        <span>{post.readTime}</span>
                        <span>•</span>
                        <span>{post.date}</span>
                        </div>
                        <h3 className={`${TYPOGRAPHY.header03} text-[22px] mb-4 group-hover:text-[#135291] transition-colors leading-snug line-clamp-2`}>
                        {post.title}
                        </h3>
                        <p className="text-gray-500 text-base mb-8 line-clamp-3 leading-relaxed">
                        {post.excerpt}
                        </p>
                        <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border border-gray-100">
                            {post.authorImage ? (
                                <img src={post.authorImage} alt={post.author} className="w-full h-full object-cover" />
                            ) : (
                                <User size={14} className="text-gray-500" />
                            )}
                            </div>
                            <span className="text-sm font-medium text-gray-600 truncate max-w-[120px]">{post.author}</span>
                        </div>
                        <span className="text-[#135291] text-sm font-bold group-hover:translate-x-1 transition-transform">Read More &rarr;</span>
                        </div>
                    </div>
                    </div>
                </Link>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};