import { BlogPost } from '../types';

const MOCK_POSTS: BlogPost[] = [
  {
    id: '1',
    slug: 'future-of-product-management',
    title: 'The Future of Product Management in Africa',
    excerpt: 'Exploring how the African tech landscape is shaping the next generation of product leaders.',
    content: "The tech ecosystem in Africa is experiencing an unprecedented boom, with product management at its core. As companies scale from local solutions to global competitors, the role of a product manager has evolved from simple coordination to strategic leadership. In this article, we dive deep into the trends defining the next decade of product leadership in Nigeria, Kenya, and beyond.",
    author: 'Victoria Oladosu',
    date: 'Oct 15, 2023',
    readTime: '5 min read',
    category: 'Product Management',
    image: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: '2',
    slug: 'breaking-into-tech',
    title: 'Breaking into Tech: A Non-Coding Guide',
    excerpt: 'You do not need to write code to have a successful career in the technology industry.',
    content: "Contrary to popular belief, coding isn't the only gateway into tech. Fields like Product Management, UI/UX Design, Technical Writing, and Data Analysis offer high-impact career paths for those who prefer strategy, design, or communication over software engineering. This guide provides a step-by-step roadmap for non-engineers looking to pivot into the tech space successfully.",
    author: 'Dosunmu Aishat',
    date: 'Nov 02, 2023',
    readTime: '7 min read',
    category: 'Career',
    image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1000'
  },
  {
    id: '3',
    slug: 'ux-design-principles',
    title: 'UX Design Principles for Emerging Markets',
    excerpt: 'Designing for the next billion users requires a deep understanding of local constraints and context.',
    content: "When designing for users in emerging markets, designers must account for factors like varied internet connectivity, low-end mobile devices, and cultural nuances in iconography. User-centered design isn't just about aesthetics; it's about accessibility and solving real problems within specific environmental constraints. We explore the core principles that make digital products successful in Africa.",
    author: 'Osaite Emmanuel',
    date: 'Nov 20, 2023',
    readTime: '6 min read',
    category: 'Design',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1000'
  }
];

export const BlogService = {
  getAllPosts: async (): Promise<BlogPost[]> => {
    // Artificial delay to simulate network
    await new Promise(resolve => setTimeout(resolve, 500));
    return MOCK_POSTS;
  },

  getPostBySlug: async (slug: string): Promise<BlogPost | null> => {
    await new Promise(resolve => setTimeout(resolve, 300));
    const post = MOCK_POSTS.find(p => p.slug === slug || p.id === slug);
    return post || null;
  }
};