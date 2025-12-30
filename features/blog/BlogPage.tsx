import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { TYPOGRAPHY } from '../../constants';
import { Clock, User, ChevronRight, Loader2, Layers, Search, Filter, SortAsc, SortDesc, ArrowRight } from 'lucide-react';
import { Reveal } from '../../components/Reveal';
import { BlogService } from '../../services/blogService';
import { BlogPost } from '../../types';

export const BlogPage: React.FC = () => {
  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTag, setSelectedTag] = useState('All');
  const [sortBy, setSortBy] = useState<'newest' | 'oldest'>('newest');
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    const loadPosts = async () => {
      setIsLoading(true);
      const posts = await BlogService.getAllPosts();
      setAllPosts(posts);
      setIsLoading(false);
    };
    loadPosts();
  }, []);

  // Derive all unique tags from posts
  const availableTags = useMemo(() => {
    const tags = new Set<string>(['All']);
    allPosts.forEach(post => {
      post.tags?.forEach(tag => tags.add(tag));
    });
    return Array.from(tags);
  }, [allPosts]);

  // Filter and Sort Logic
  const filteredPosts = useMemo(() => {
    let result = [...allPosts];

    // Filter by Tag
    if (selectedTag !== 'All') {
      result = result.filter(post => post.tags?.includes(selectedTag));
    }

    // Search Query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(post => 
        post.title.toLowerCase().includes(query) || 
        post.excerpt.toLowerCase().includes(query)
      );
    }

    // Sort
    result.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return sortBy === 'newest' ? dateB - dateA : dateA - dateB;
    });

    return result;
  }, [allPosts, selectedTag, searchQuery, sortBy]);

  const displayedPosts = filteredPosts.slice(0, visibleCount);
  const hasMore = visibleCount < filteredPosts.length;

  return (
    <div className="w-full pb-32 pt-40 md:pt-56 bg-white min-h-screen">
      <div className="container mx-auto px-6">
        
        {/* Header Section */}
        <Reveal width="100%" className="text-center mb-16">
          <span className="text-[#daa728] font-bold tracking-widest uppercase text-xs mb-3 block">Perspective & Growth</span>
          <h1 className={`${TYPOGRAPHY.header01} text-[#08223d] mb-6`}>Knowledge Hub</h1>
          <p className={`${TYPOGRAPHY.body02} max-w-2xl mx-auto text-gray-500`}>
            Industry insights, product strategies, and technical guides from Africa's leading tech experts.
          </p>
        </Reveal>

        {/* Toolbar: Search, Filter, Sort */}
        <div className="flex flex-col lg:flex-row gap-6 items-center justify-between mb-16 p-6 bg-gray-50 rounded-[24px] border border-gray-100">
          
          {/* Search */}
          <div className="relative w-full lg:max-w-md">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input 
              type="text"
              placeholder="Search articles..."
              className="w-full pl-12 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#135291] focus:border-transparent outline-none transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center justify-center gap-3">
             <div className="flex items-center gap-2 mr-4 text-sm font-bold text-gray-400">
               <Filter size={16} /> Filters:
             </div>
             {availableTags.slice(0, 5).map(tag => (
               <button
                 key={tag}
                 onClick={() => setSelectedTag(tag)}
                 className={`px-4 py-2 rounded-lg text-xs font-bold transition-all border ${
                   selectedTag === tag 
                    ? 'bg-[#135291] text-white border-[#135291]' 
                    : 'bg-white text-gray-500 border-gray-100 hover:border-gray-300'
                 }`}
               >
                 {tag}
               </button>
             ))}
          </div>

          {/* Sort */}
          <div className="flex items-center gap-3 shrink-0">
             <button 
               onClick={() => setSortBy(sortBy === 'newest' ? 'oldest' : 'newest')}
               className="flex items-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-xl text-sm font-bold text-[#08223d] hover:bg-gray-100 transition-all"
             >
               {sortBy === 'newest' ? <SortDesc size={18} /> : <SortAsc size={18} />}
               {sortBy === 'newest' ? 'Newest First' : 'Oldest First'}
             </button>
          </div>
        </div>

        {/* Main Feed */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-32">
             <Loader2 size={48} className="text-[#135291] animate-spin mb-4" />
             <p className="text-gray-400 font-bold animate-pulse">Syncing with Storyblok...</p>
          </div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center py-32 bg-gray-50 rounded-[40px] border border-dashed border-gray-200 max-w-4xl mx-auto">
             <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-6 text-gray-300 shadow-sm">
                <Layers size={32} />
             </div>
             <h3 className="text-2xl font-bold text-[#08223d] mb-2">No matches found</h3>
             <p className="text-gray-400">Try adjusting your search or filters.</p>
          </div>
        ) : (
          <div className="space-y-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
              {displayedPosts.map((post, i) => (
                <Reveal key={post.id} width="100%" delay={i % 3 * 0.1}>
                  <Link to={`/blog/${post.slug}`} className="group flex flex-col h-full bg-white rounded-[24px] overflow-hidden border border-transparent hover:border-gray-100 hover:shadow-2xl transition-all duration-500">
                    <div className="relative h-64 overflow-hidden">
                        <img 
                          src={post.image} 
                          alt={post.title} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        <div className="absolute top-4 left-4 flex gap-2">
                           {post.tags?.slice(0, 2).map(tag => (
                             <span key={tag} className="bg-white/90 backdrop-blur-md px-3 py-1 rounded-full text-[10px] font-black text-[#135291] uppercase tracking-wider shadow-sm">
                               {tag}
                             </span>
                           ))}
                        </div>
                    </div>
                    <div className="p-8 flex flex-col flex-1">
                        <div className="flex items-center gap-3 text-[11px] font-bold text-gray-400 uppercase tracking-widest mb-4">
                          <span>{new Date(post.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                          <span className="w-1 h-1 bg-gray-200 rounded-full"></span>
                          <span>{post.readTime}</span>
                        </div>
                        <h3 className="text-xl font-bold text-[#08223d] mb-4 group-hover:text-[#135291] transition-colors leading-tight line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-gray-500 text-sm mb-8 line-clamp-3 leading-relaxed">
                          {post.excerpt}
                        </p>
                        <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center">
                                <User size={14} className="text-gray-400" />
                              </div>
                              <span className="text-xs font-bold text-gray-700">{post.author}</span>
                            </div>
                            <span className="text-[#135291] text-xs font-black uppercase tracking-widest flex items-center gap-1 group-hover:gap-2 transition-all">
                              Read <ChevronRight size={14} />
                            </span>
                        </div>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>

            {/* Pagination */}
            {hasMore && (
              <div className="flex justify-center pt-8">
                <button 
                  onClick={() => setVisibleCount(prev => prev + 6)}
                  className="px-10 py-4 bg-white border-2 border-[#135291] text-[#135291] font-bold rounded-full hover:bg-[#135291] hover:text-white transition-all shadow-lg flex items-center gap-3"
                >
                  Load More Articles <ArrowRight size={18} />
                </button>
              </div>
            )}
          </div>
        )}

        {/* Newsletter Signup Section */}
        <section className="mt-40 bg-[#08223d] rounded-[40px] p-8 md:p-20 text-white relative overflow-hidden">
           <div className="absolute top-0 right-0 w-96 h-96 bg-[#135291] rounded-full blur-[100px] opacity-20 -translate-y-1/2 translate-x-1/2"></div>
           <div className="relative z-10 max-w-4xl">
              <span className="text-[#daa728] font-bold tracking-widest uppercase text-sm mb-4 block">Weekly Briefing</span>
              <h2 className="text-3xl md:text-5xl font-bold mb-6">Stay ahead with the latest in tech & product</h2>
              <p className="text-blue-100 text-lg mb-12 max-w-2xl leading-relaxed">
                Join 10,000+ subscribers who receive our curated selection of industry news, community updates, and career opportunities every Monday.
              </p>
              <form className="flex flex-col sm:flex-row gap-4" onSubmit={e => e.preventDefault()}>
                 <input 
                   type="email" 
                   placeholder="Enter your email address"
                   className="flex-1 px-8 py-5 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-blue-200/50 outline-none focus:ring-2 focus:ring-[#daa728] transition-all"
                 />
                 <button className="px-10 py-5 bg-[#daa728] text-[#08223d] font-bold rounded-2xl hover:bg-white transition-all shadow-xl">
                   Subscribe Now
                 </button>
              </form>
              <p className="mt-6 text-sm text-blue-200/50">Zero spam. Only value. Unsubscribe anytime.</p>
           </div>
        </section>
      </div>
    </div>
  );
};