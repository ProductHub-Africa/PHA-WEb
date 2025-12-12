import { sanityClient } from '../lib/sanity';
import { BlogPost } from '../types';

// Mock data for fallback until Sanity is connected
const MOCK_POSTS: BlogPost[] = [
  {
    id: '1',
    slug: 'future-of-product-management',
    title: 'The Future of Product Management in Africa',
    excerpt: 'Exploring how the African tech landscape is shaping the next generation of product leaders.',
    content: [], // Empty for list view mock
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
    content: [],
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
    content: [],
    author: 'Osaite Emmanuel',
    date: 'Nov 20, 2023',
    readTime: '6 min read',
    category: 'Design',
    image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1000'
  }
];

// Helper to get a mock post with content for the details page
const getMockPostWithContent = (slug: string) => {
    const mock = MOCK_POSTS.find(p => p.slug === slug || p.id === slug);
    if (mock) {
        return {
            ...mock,
            content: [
                { 
                    _type: 'block', 
                    style: 'normal',
                    children: [{ _type: 'span', text: "This is a placeholder article because we couldn't fetch the real content from Sanity.io." }] 
                },
                { 
                    _type: 'block',
                    style: 'h3',
                    children: [{ _type: 'span', text: "Why am I seeing this?" }] 
                },
                { 
                    _type: 'block', 
                    style: 'normal',
                    children: [{ _type: 'span', text: "Your Sanity project is connected, but the request failed or returned no data. This usually happens if you haven't deployed the 'post' schema or created content in your Sanity Studio yet." }] 
                },
                { 
                    _type: 'block', 
                    style: 'normal',
                    children: [{ _type: 'span', text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua." }] 
                }
            ]
        };
    }
    return null;
};

export const BlogService = {
  // Get all posts from Sanity
  getAllPosts: async (): Promise<BlogPost[]> => {
    try {
        // Check if user has configured Sanity
        if (sanityClient.config().projectId === 'replace_with_your_project_id') {
            return MOCK_POSTS;
        }

        const query = `*[_type == "post"] | order(publishedAt desc) {
            _id,
            title,
            excerpt,
            "slug": slug.current,
            "author": author->name,
            "authorImage": author->image.asset->url,
            publishedAt,
            "imageUrl": mainImage.asset->url,
            "category": categories[0]->title
        }`;

        const sanityPosts = await sanityClient.fetch(query);

        // If Sanity returns empty array (e.g. new project), return Mock posts
        if (!sanityPosts || sanityPosts.length === 0) {
             return MOCK_POSTS;
        }

        return sanityPosts.map((post: any) => ({
            id: post._id,
            slug: post.slug || post._id,
            title: post.title,
            excerpt: post.excerpt || "Click to read more...",
            author: post.author || "PHA Team",
            date: post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recent',
            readTime: '5 min read',
            category: post.category || 'Tech',
            image: post.imageUrl || 'https://via.placeholder.com/800x600?text=No+Image',
            authorImage: post.authorImage
        }));

    } catch (error) {
      console.warn("Error fetching blog posts (falling back to mock data):", error);
      return MOCK_POSTS;
    }
  },

  // Get single post by Slug
  getPostBySlug: async (slug: string): Promise<BlogPost | null> => {
      try {
        if (sanityClient.config().projectId === 'replace_with_your_project_id') {
             return getMockPostWithContent(slug);
        }

        const query = `*[_type == "post" && slug.current == $slug][0] {
            _id,
            title,
            excerpt,
            body,
            "slug": slug.current,
            "author": author->name,
            "authorImage": author->image.asset->url,
            publishedAt,
            "imageUrl": mainImage.asset->url,
            "category": categories[0]->title
        }`;

        const post = await sanityClient.fetch(query, { slug });
        
        if (!post) {
            // If not found in Sanity, try finding in Mock data
            return getMockPostWithContent(slug);
        }

        return {
            id: post._id,
            slug: post.slug,
            title: post.title,
            excerpt: post.excerpt,
            content: post.body,
            author: post.author || "PHA Team",
            date: post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'Recent',
            readTime: '5 min read',
            category: post.category || 'Tech',
            image: post.imageUrl || 'https://via.placeholder.com/800x600?text=No+Image',
            authorImage: post.authorImage
        };

      } catch (error) {
          console.warn(`Error fetching post '${slug}' (falling back to mock data):`, error);
          return getMockPostWithContent(slug);
      }
  }
};