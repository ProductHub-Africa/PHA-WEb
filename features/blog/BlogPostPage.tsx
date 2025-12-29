
import React, { useState, useEffect } from 'react';
// Fix: Ensure useParams and Link are correctly imported from react-router-dom
import { useParams, Link } from 'react-router-dom';
import { TYPOGRAPHY } from '../../constants';
import { Clock, User, ArrowLeft, Loader2, Calendar, Share2 } from 'lucide-react';
import { BlogService } from '../../services/blogService';
import { BlogPost } from '../../types';

export const BlogPostPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      loadPost(slug);
    }
  }, [slug]);

  const loadPost = async (slug: string) => {
    setIsLoading(true);
    const fetchedPost = await BlogService.getPostBySlug(slug);
    setPost(fetchedPost);
    setIsLoading(false);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
         <Loader2 size={40} className="text-[#135291] animate-spin" />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen pt-40 container mx-auto px-6 text-center">
        <h2 className={TYPOGRAPHY.header02}>Article not found</h2>
        <p className="text-gray-500 mb-6 mt-2">The article you are looking for does not exist or has been moved.</p>
        <Link to="/blog" className="inline-flex items-center justify-center px-8 py-3 bg-[#135291] text-white rounded-full font-bold hover:bg-[#0d3a67] transition-colors">
          Return to Blog
        </Link>
      </div>
    );
  }

  return (
    <article className="pt-[140px] md:pt-[200px] pb-[100px] bg-white min-h-screen">
      <div className="container mx-auto px-6 max-w-4xl">
        
        {/* Breadcrumb & Back */}
        <div className="flex justify-between items-center mb-10">
           <Link to="/blog" className="inline-flex items-center text-gray-500 hover:text-[#135291] font-bold transition-colors group">
              <ArrowLeft size={20} className="mr-2 group-hover:-translate-x-1 transition-transform" /> Back to Articles
           </Link>
           <div className="text-xs md:text-sm font-bold text-[#135291] bg-blue-50 px-4 py-2 rounded-full border border-blue-100">
             {post.category}
           </div>
        </div>

        {/* Header */}
        <div className="text-center mb-12">
           <h1 className={`${TYPOGRAPHY.header01} text-[#08223d] mb-8 leading-tight`}>{post.title}</h1>
           
           <div className="flex flex-wrap items-center justify-center gap-4 md:gap-8 text-gray-500 text-sm md:text-base">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden border border-gray-200 flex items-center justify-center">
                    {post.authorImage ? (
                        <img src={post.authorImage} alt={post.author} className="w-full h-full object-cover" />
                    ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400"><User size={20} /></div>
                    )}
                 </div>
                 <span className="font-bold text-gray-900">{post.author}</span>
              </div>
              <div className="hidden md:block w-1 h-1 bg-gray-300 rounded-full"></div>
              <div className="flex items-center gap-2">
                 <Calendar size={18} className="text-[#daa728]" />
                 <span>{post.date}</span>
              </div>
              <div className="hidden md:block w-1 h-1 bg-gray-300 rounded-full"></div>
              <div className="flex items-center gap-2">
                 <Clock size={18} className="text-[#daa728]" />
                 <span>{post.readTime}</span>
              </div>
           </div>
        </div>

        {/* Featured Image */}
        <div className="w-full aspect-video md:h-[500px] rounded-2xl md:rounded-[32px] overflow-hidden mb-16 shadow-lg border border-gray-100">
           <img 
             src={post.image} 
             alt={post.title} 
             className="w-full h-full object-cover"
             onError={(e) => e.currentTarget.src = 'https://via.placeholder.com/1200x600?text=No+Image'}
           />
        </div>

        {/* Content Body */}
        <div className="prose prose-lg md:prose-xl max-w-none text-gray-600">
           <p className="text-lg leading-relaxed mb-6">{post.content}</p>
           {/* In a real app with CMS, this would be rich text. For mock, we use a string. */}
        </div>

        {/* Footer / Share */}
        <div className="mt-20 pt-10 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-6">
           <div className="text-center md:text-left">
             <p className="font-bold text-[#08223d] mb-1">Share this article</p>
             <p className="text-sm text-gray-500">Spread the knowledge with your network</p>
           </div>
           <div className="flex gap-4">
              <button className="p-3 rounded-full bg-gray-50 hover:bg-[#135291] hover:text-white transition-all text-gray-500 border border-gray-200 hover:border-[#135291]" aria-label="Share">
                 <Share2 size={20} />
              </button>
           </div>
        </div>

      </div>
    </article>
  );
};