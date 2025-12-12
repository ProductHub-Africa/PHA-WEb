import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { TYPOGRAPHY } from '../../constants';
import { Clock, User, ArrowLeft, Loader2, Calendar, Share2 } from 'lucide-react';
import { BlogService } from '../../services/blogService';
import { BlogPost } from '../../types';
import { urlFor } from '../../lib/sanity';

// Custom renderer to avoid external dependency crashes
const SimpleBlockContent = ({ blocks }: { blocks: any[] }) => {
  if (!blocks || !Array.isArray(blocks)) {
    return <p className="text-gray-500 italic">No content to display.</p>;
  }

  return (
    <div className="space-y-6">
      {blocks.map((block, i) => {
        // Handle Standard Text Blocks
        if (block._type === 'block') {
           const children = block.children || [];
           const textContent = children.map((child: any) => {
             // Handle simple bold/italic spans if needed, for now just returning text
             return child.text; 
           }).join('');

           if (!textContent) return null;

           switch(block.style) {
             case 'h1': return <h1 key={i} className="text-3xl md:text-4xl font-bold text-[#08223d] mt-8 mb-4">{textContent}</h1>;
             case 'h2': return <h2 key={i} className="text-2xl md:text-3xl font-bold text-[#08223d] mt-8 mb-4">{textContent}</h2>;
             case 'h3': return <h3 key={i} className="text-xl md:text-2xl font-bold text-[#08223d] mt-6 mb-3">{textContent}</h3>;
             case 'h4': return <h4 key={i} className="text-lg md:text-xl font-bold text-[#08223d] mt-6 mb-3">{textContent}</h4>;
             case 'blockquote': return (
               <blockquote key={i} className="border-l-4 border-[#135291] pl-6 py-2 my-6 bg-blue-50/50 italic text-gray-700 rounded-r-lg">
                 "{textContent}"
               </blockquote>
             );
             default: return <p key={i} className="text-lg text-gray-600 leading-8 mb-4">{textContent}</p>;
           }
        }
        
        // Handle Images inserted in text
        if (block._type === 'image') {
           const imageUrl = urlFor(block);
           return (
             <figure key={i} className="my-8">
               <img 
                 src={imageUrl} 
                 alt={block.alt || 'Article image'} 
                 className="w-full h-auto rounded-2xl shadow-sm" 
                 loading="lazy"
               />
               {block.caption && <figcaption className="text-center text-sm text-gray-400 mt-2">{block.caption}</figcaption>}
             </figure>
           );
        }

        return null;
      })}
    </div>
  );
};

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
      {/* Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1.5 z-50 bg-gray-100">
         <div className="h-full bg-[#daa728] w-0 transition-all duration-100" id="reading-progress"></div>
      </div>

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
                 <div className="w-10 h-10 rounded-full bg-gray-100 overflow-hidden border border-gray-200">
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
           <SimpleBlockContent blocks={post.content} />
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