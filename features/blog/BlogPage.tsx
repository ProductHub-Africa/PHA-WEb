
import { Search, SortAsc, SortDesc, User } from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Reveal } from '../../components/Reveal';
import { TYPOGRAPHY } from '../../constants';
import { BlogService } from '../../services/blogService';
import { BlogPost } from '../../types';

const BlogSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
    {[1, 2, 3, 4, 5, 6].map((i) => (
      <div key={i} className="bg-white card-radius border border-gray-100 overflow-hidden animate-pulse">
        <div className="aspect-[16/10] bg-gray-100" />
        <div className="p-6">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-4" />
          <div className="h-3 bg-gray-100 rounded w-full mb-2" />
          <div className="h-3 bg-gray-100 rounded w-5/6 mb-6" />
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-200" />
            <div className="h-3 bg-gray-100 rounded w-20" />
          </div>
        </div>
      </div>
    ))}
  </div>
);

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

  const availableTags = useMemo(() => {
    const tags = new Set<string>(['All']);
    allPosts.forEach(post => post.tags?.forEach(tag => tags.add(tag)));
    return Array.from(tags);
  }, [allPosts]);

  const filteredPosts = useMemo(() => {
    let result = [...allPosts];
    if (selectedTag !== 'All') result = result.filter(post => post.tags?.includes(selectedTag));
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => p.title.toLowerCase().includes(q) || p.excerpt.toLowerCase().includes(q));
    }
    result.sort((a, b) => {
      const d1 = new Date(a.date).getTime();
      const d2 = new Date(b.date).getTime();
      return sortBy === 'newest' ? d2 - d1 : d1 - d2;
    });
    return result;
  }, [allPosts, selectedTag, searchQuery, sortBy]);

  const displayedPosts = filteredPosts.slice(0, visibleCount);

  return (
    <div className="w-full pb-32 pt-40 md:pt-48 bg-white min-h-screen">
      <div className="container mx-auto px-6">
        <Reveal width="100%" className="text-center mb-16">
          <span className="text-[#daa728] font-bold tracking-widest uppercase text-xs mb-3 block">Perspective & Growth</span>
          <h1 className={`${TYPOGRAPHY.header01} text-[#08223d] mb-6`}>Knowledge Hub</h1>
          <p className={`${TYPOGRAPHY.body02} max-w-2xl mx-auto text-gray-500`}>
            Industry insights and technical guides from Africa's tech leaders.
          </p>
        </Reveal>

        <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-12 p-4 bg-gray-50 card-radius border border-gray-100">
          <div className="relative w-full md:max-w-xs">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
            <input type="text" placeholder="Search..." className="w-full pl-10 pr-4 py-2 bg-white border border-gray-200 rounded-lg outline-none text-sm" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
          </div>
          <button onClick={() => setSortBy(sortBy === 'newest' ? 'oldest' : 'newest')} className="px-4 py-2 bg-white border border-gray-200 rounded-lg text-xs font-bold text-[#08223d] flex items-center gap-2">
            {sortBy === 'newest' ? <SortDesc size={14} /> : <SortAsc size={14} />} {sortBy === 'newest' ? 'Newest' : 'Oldest'}
          </button>
        </div>

        <div className="flex gap-2 mb-10 overflow-x-auto pb-2 scrollbar-hide">
          {availableTags.map(tag => (
            <button key={tag} onClick={() => setSelectedTag(tag)} className={`px-5 py-2 rounded-full text-xs font-bold transition-all border whitespace-nowrap ${selectedTag === tag ? 'bg-[#135291] text-white border-[#135291]' : 'bg-white text-gray-500 border-gray-200'}`}>
              {tag === 'All' ? 'View all' : tag}
            </button>
          ))}
        </div>

        {isLoading ? (
          <BlogSkeleton />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedPosts.map((post) => (
              <Link key={post.id} to={`/blog/${post.slug}`} className="group bg-white card-radius overflow-hidden border border-gray-100 transition-all flex flex-col h-full shadow-none">
                <div className="aspect-[16/10] overflow-hidden relative">
                  <img src={post.image} alt={post.title} className="w-full h-full object-cover transition-transform group-hover:scale-105" />
                  <div className="absolute top-3 left-3"><span className="bg-[#135291] text-white text-[10px] font-bold px-3 py-1 rounded-full">{post.category}</span></div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <h3 className="text-lg font-bold text-gray-900 mb-2 leading-tight group-hover:text-[#135291]">{post.title}</h3>
                  <p className="text-gray-400 text-xs mb-6 line-clamp-2">{post.excerpt}</p>
                  <div className="mt-auto flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center"><User size={14} className="text-gray-400" /></div>
                    <div>
                      <p className="text-xs font-bold text-gray-900 leading-none">{post.author}</p>
                      <p className="text-[10px] text-gray-400 mt-1">{post.date} • {post.readTime}</p>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
