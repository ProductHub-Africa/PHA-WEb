
import React, { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { TYPOGRAPHY, COLORS } from '../../constants';
import { Clock, User, ArrowLeft, Loader2, Calendar, Share2 } from 'lucide-react';
import { BlogService } from '../../services/blogService';
import { BlogPost } from '../../types';

export const BlogPostPage: React.FC = () => {
  const location = useLocation();
  // Since we use wildcard routing (/blog/*), we extract the slug from the pathname
  const slug = location.pathname.replace('/blog/', '');
  
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      loadPost(slug);
    }
    window.scrollTo(0, 0);
  }, [slug]);

  const loadPost = async (postSlug: string) => {
    setIsLoading(true);
    try {
      const fetchedPost = await BlogService.getPostBySlug(postSlug);
      setPost(fetchedPost);
    } catch (error) {
      console.error("Failed to fetch post:", error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center pt-20">
         <Loader2 size={48} className="text-[#135291] animate-spin mb-4" />
         <p className="text-gray-400 font-bold animate-pulse">Fetching article...</p>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen pt-40 container mx-auto px-6 text-center">
        <h2 className={TYPOGRAPHY.header02}>Article not found</h2>
        <p className="text-gray-500 mb-8 mt-2">The article you are looking for might have been moved or deleted.</p>
        <Link to="/blog" className="inline-flex items-center justify-center px-10 py-4 bg-[#135291] text-white rounded-full font-bold hover:bg-[#0d3a67] transition-all shadow-lg">
          Return to Blog
        </Link>
      </div>
    );
  }

  return (
    <article className="pt-[140px] md:pt-[200px] pb-[100px] bg-white min-h-screen">
      <div className="container mx-auto px-6 max-w-4xl">
        
        {/* Navigation & Category */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
           <Link to="/blog" className="inline-flex items-center text-gray-500 hover:text-[#135291] font-bold transition-colors group">
              <div className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center mr-3 group-hover:bg-gray-50 transition-colors">
                <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> 
              </div>
              Back to Articles
           </Link>
           <div className="inline-block text-xs font-black text-[#135291] bg-[#135291]/5 px-5 py-2 rounded-full border border-[#135291]/10 tracking-widest uppercase">
             {post.category}
           </div>
        </div>

        {/* Header Content */}
        <div className="mb-16">
           <h1 className="text-[32px] md:text-[56px] font-extrabold text-[#08223d] mb-10 leading-[1.15] tracking-tight">
             {post.title}
           </h1>
           
           <div className="flex flex-wrap items-center gap-6 md:gap-10 text-gray-500">
              <div className="flex items-center gap-3">
                 <div className="w-12 h-12 rounded-full bg-gray-50 overflow-hidden border border-gray-100 flex items-center justify-center">
                    {post.authorImage ? (
                      <img src={post.authorImage} alt={post.author} className="w-full h-full object-cover" />
                    ) : (
                      <User size={22} className="text-gray-300" />
                    )}
                 </div>
                 <div>
                    <p className="text-[16px] font-black text-[#08223d] leading-none mb-1">{post.author}</p>
                    <p className="text-xs uppercase tracking-wider font-bold text-gray-400">Author</p>
                 </div>
              </div>
              
              <div className="h-8 w-px bg-gray-100 hidden md:block"></div>

              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 font-bold text-sm">
                   <Calendar size={18} className="text-[#daa728]" />
                   <span>{post.date}</span>
                </div>
                <div className="flex items-center gap-2 font-bold text-sm">
                   <Clock size={18} className="text-[#daa728]" />
                   <span>{post.readTime}</span>
                </div>
              </div>
           </div>
        </div>

        {/* Hero Image */}
        <div className="w-full aspect-[16/9] md:aspect-[21/9] rounded-[32px] overflow-hidden mb-20 shadow-2xl border border-gray-50">
           <img 
             src={post.image} 
             alt={post.title} 
             className="w-full h-full object-cover"
             onError={(e) => e.currentTarget.src = 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1200'}
           />
        </div>

        {/* Main Article Body */}
        <div className="cms-content-wrapper">
          <div 
            className="prose prose-lg md:prose-xl max-w-none text-[#3a3a3a] leading-[1.8]"
            dangerouslySetInnerHTML={{ __html: post.content || '' }} 
          />
        </div>

        {/* Share & Footer */}
        <div className="mt-24 p-8 md:p-12 bg-gray-50 rounded-[32px] border border-gray-100 flex flex-col md:flex-row justify-between items-center gap-8">
           <div className="text-center md:text-left">
             <h4 className="font-black text-[#08223d] text-xl mb-2">Did you find this helpful?</h4>
             <p className="text-gray-500 font-medium">Share this article with your tech circle and help others grow.</p>
           </div>
           <button 
             onClick={() => {
               if (navigator.share) {
                 navigator.share({ title: post.title, url: window.location.href });
               } else {
                 window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${window.location.href}`, '_blank');
               }
             }}
             className="flex items-center gap-3 px-8 py-4 rounded-full bg-white hover:bg-[#135291] hover:text-white transition-all text-[#135291] font-bold border-2 border-[#135291]/10 shadow-sm group"
           >
              <Share2 size={20} className="group-hover:rotate-12 transition-transform" /> 
              Share with Network
           </button>
        </div>

      </div>

      <style>{`
        .cms-content-wrapper h1, .cms-content-wrapper h2, .cms-content-wrapper h3 { 
          color: #08223d; 
          font-weight: 800; 
          margin-top: 2em; 
          margin-bottom: 1em; 
          line-height: 1.25;
          letter-spacing: -0.02em;
        }
        .cms-content-wrapper h2 { font-size: 2rem; }
        .cms-content-wrapper h3 { font-size: 1.5rem; }
        .cms-content-wrapper p { margin-bottom: 1.8em; font-size: 1.125rem; }
        .cms-content-wrapper strong { color: #08223d; font-weight: 700; }
        .cms-content-wrapper blockquote {
          border-left: 5px solid #daa728;
          padding-left: 1.5em;
          font-style: italic;
          color: #135291;
          margin: 2.5em 0;
          font-size: 1.25rem;
          font-weight: 500;
        }
        .cms-content-wrapper ul { list-style: disc; padding-left: 1.5em; margin-bottom: 1.8em; }
        .cms-content-wrapper li { margin-bottom: 0.8em; }
        .cms-content-wrapper img { border-radius: 24px; margin: 3em 0; width: 100%; box-shadow: 0 10px 30px rgba(0,0,0,0.05); }
      `}</style>
    </article>
  );
};
