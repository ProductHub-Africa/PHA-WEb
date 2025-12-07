import React, { useState } from 'react';
import { TYPOGRAPHY } from '../../constants';
import { Clock, User, ChevronRight } from 'lucide-react';
import { Button } from '../../components/Button';

const categories = ['All', 'Product Management', 'Design', 'Engineering', 'Career', 'Tech Trends'];
  
const featuredPost = {
  title: 'The Rise of Product-Led Growth in African Startups',
  excerpt: 'How local companies are leveraging user-centric product strategies to scale faster than ever before.',
  author: 'Tobi Olanrewaju',
  date: 'Oct 12, 2023',
  readTime: '8 min read',
  category: 'Product Management',
  image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&q=80&w=1200'
};

const basePosts = [
  {
    title: 'Breaking into Tech: A Non-Coder’s Guide',
    excerpt: 'You don’t need to write code to build a successful career in the technology sector. Here are 5 paths you can take.',
    author: 'Sarah Johnson',
    date: 'Oct 08, 2023',
    readTime: '5 min read',
    category: 'Career',
    image: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=600'
  },
  {
    title: 'Design Systems 101 for Startups',
    excerpt: 'Why consistency matters and how to build your first design system without breaking the bank.',
    author: 'David Okeke',
    date: 'Sep 25, 2023',
    readTime: '6 min read',
    category: 'Design',
    image: 'https://images.unsplash.com/photo-1586717791821-3f44a5638d48?auto=format&fit=crop&q=80&w=600'
  },
  {
    title: 'Understanding Cybersecurity Threats in 2024',
    excerpt: 'Key vulnerabilities that every tech professional should be aware of in the coming year.',
    author: 'Miriam Diallo',
    date: 'Sep 15, 2023',
    readTime: '7 min read',
    category: 'Engineering',
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=600'
  },
  {
    title: 'The Future of Remote Work in Africa',
    excerpt: 'Exploring the challenges and massive opportunities for distributed teams across the continent.',
    author: 'Emmanuel K.',
    date: 'Aug 30, 2023',
    readTime: '4 min read',
    category: 'Tech Trends',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=600'
  },
  {
    title: 'Data-Driven Decision Making',
    excerpt: 'Moving beyond gut feelings: how to effectively use analytics to guide your product roadmap.',
    author: 'Chioma Adebayo',
    date: 'Aug 12, 2023',
    readTime: '9 min read',
    category: 'Product Management',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=600'
  },
  {
    title: 'UX Writing: The Unsung Hero of Design',
    excerpt: 'How microcopy influences user behavior and improves conversion rates.',
    author: 'Samuel O.',
    date: 'Jul 28, 2023',
    readTime: '5 min read',
    category: 'Design',
    image: 'https://images.unsplash.com/photo-1505682634904-d7c8d95cdc50?auto=format&fit=crop&q=80&w=600'
  }
];

export const BlogPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  // Double the posts to make it more populated
  const posts = [...basePosts, ...basePosts];

  return (
    <div 
      className="w-full pb-[120px] pt-[200px]"
      style={{
        background: 'radial-gradient(rgba(252, 211, 77, 0.2) 2px, transparent 2px), linear-gradient(to bottom, #f0f6fa, #ffffff)',
        backgroundSize: '30px 30px, 100% 100%'
      }}
    >
      <div className="container mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16">
          <span className="text-[#135291] font-bold tracking-wider uppercase text-sm mb-3 block">Our Blog</span>
          <h1 className={`${TYPOGRAPHY.header01} text-[#08223d] mb-6`}>Insights & Perspectives</h1>
          <p className={`${TYPOGRAPHY.body02} max-w-2xl mx-auto text-gray-500`}>
            Expert advice, industry trends, and success stories to help you navigate your tech career.
          </p>
        </div>

        {/* Categories */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 rounded-full font-medium transition-all duration-300 border ${
                activeCategory === cat
                  ? 'bg-[#135291] text-white border-[#135291]'
                  : 'bg-white text-gray-600 border-gray-200 hover:border-[#135291] hover:text-[#135291]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Post */}
        <div className="mb-20">
          <div className="group relative rounded-3xl overflow-hidden bg-white grid md:grid-cols-2 cursor-pointer border border-gray-100">
            <div className="relative h-64 md:h-auto overflow-hidden">
               <img 
                 src={featuredPost.image} 
                 alt={featuredPost.title} 
                 className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
               />
               <div className="absolute top-6 left-6 bg-white/90 backdrop-blur-sm px-4 py-1 rounded-full text-xs font-bold text-[#135291] uppercase tracking-wide">
                 Featured
               </div>
            </div>
            <div className="p-8 md:p-12 flex flex-col justify-center">
              <div className="flex items-center gap-3 text-sm text-gray-500 mb-4">
                <span className="font-bold text-[#daa728]">{featuredPost.category}</span>
                <span>•</span>
                <span>{featuredPost.date}</span>
              </div>
              <h2 className={`${TYPOGRAPHY.header02} mb-4 group-hover:text-[#135291] transition-colors`}>
                {featuredPost.title}
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                {featuredPost.excerpt}
              </p>
              <div className="flex items-center justify-between mt-auto">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                    <User size={20} />
                  </div>
                  <div>
                    <p className="font-bold text-sm text-[#08223d]">{featuredPost.author}</p>
                    <p className="text-xs text-gray-500">{featuredPost.readTime}</p>
                  </div>
                </div>
                <div className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 group-hover:bg-[#135291] group-hover:text-white group-hover:border-[#135291] transition-all">
                  <ChevronRight size={20} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, i) => (
            <div key={i} className="bg-white border border-gray-100 rounded-[24px] overflow-hidden transition-all duration-300 group cursor-pointer flex flex-col h-full">
              <div className="relative h-60 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-lg text-xs font-bold text-[#08223d]">
                  {post.category}
                </div>
              </div>
              <div className="p-8 flex flex-col flex-1">
                <div className="flex items-center gap-2 text-xs text-gray-400 mb-4">
                  <Clock size={14} />
                  <span>{post.readTime}</span>
                  <span>•</span>
                  <span>{post.date}</span>
                </div>
                <h3 className={`${TYPOGRAPHY.header03} text-[20px] mb-3 group-hover:text-[#135291] transition-colors`}>
                  {post.title}
                </h3>
                <p className="text-gray-500 text-sm mb-6 line-clamp-2">
                  {post.excerpt}
                </p>
                <div className="mt-auto pt-6 border-t border-gray-50 flex items-center justify-between">
                   <div className="flex items-center gap-2">
                     <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center">
                       <User size={12} className="text-gray-500" />
                     </div>
                     <span className="text-xs font-medium text-gray-600">{post.author}</span>
                   </div>
                   <span className="text-[#135291] text-xs font-bold group-hover:translate-x-1 transition-transform">Read More &rarr;</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Newsletter CTA */}
        <div className="mt-24 bg-[#08223d] rounded-3xl p-10 md:p-16 text-center text-white relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[#135291] rounded-full blur-[80px] opacity-30 translate-x-1/3 -translate-y-1/3"></div>
          <div className="relative z-10 max-w-2xl mx-auto">
             <h2 className={`${TYPOGRAPHY.header02} mb-6`}>Stay in the loop</h2>
             <p className="text-blue-200 mb-10 text-lg">
               Join 10,000+ subscribers getting the best tech insights, career advice, and community updates delivered to their inbox.
             </p>
             <div className="flex flex-col sm:flex-row gap-4">
               <input 
                 type="email" 
                 placeholder="Enter your email address" 
                 className="flex-1 px-6 py-4 rounded-xl text-gray-900 focus:outline-none focus:ring-4 focus:ring-blue-500/50"
               />
               <Button size="lg" style={{ backgroundColor: '#daa728', color: '#08223d' }}>Subscribe</Button>
             </div>
          </div>
        </div>

      </div>
    </div>
  );
};