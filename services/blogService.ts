
import { BlogPost } from '../types';

const STORYBLOK_TOKEN: string = "4KBIq1aHnELTAj320fACPAtt"; 
const STORYBLOK_BASE_URL = "https://api.storyblok.com/v2/cdn/stories";

/**
 * Utility to convert Storyblok RichText JSON to HTML string
 */
const renderRichText = (nodes: any): string => {
  if (!nodes || !nodes.content) {
    return typeof nodes === 'string' ? nodes : '';
  }

  const renderNodes = (content: any[]): string => {
    if (!content) return '';
    return content.map(node => {
      if (node.type === 'text') {
        let text = node.text || '';
        if (node.marks) {
          node.marks.forEach((mark: any) => {
            if (mark.type === 'bold') text = `<strong>${text}</strong>`;
            if (mark.type === 'italic') text = `<em>${text}</em>`;
            if (mark.type === 'link') {
              const href = mark.attrs?.href || '#';
              text = `<a href="${href}" class="text-[#135291] font-bold hover:underline" target="_blank" rel="noopener noreferrer">${text}</a>`;
            }
          });
        }
        return text;
      }
      if (node.type === 'image') {
        return `<img src="${node.attrs.src}" alt="${node.attrs.alt || ''}" class="rounded-2xl my-10 w-full shadow-lg border border-gray-100" />`;
      }
      if (node.type === 'paragraph') {
        return `<p class="mb-6">${renderNodes(node.content)}</p>`;
      }
      return '';
    }).join('');
  };

  return nodes.content.map((node: any) => {
    switch (node.type) {
      case 'heading':
        const level = node.attrs.level || 2;
        const fontSize = level === 1 ? 'text-4xl' : level === 2 ? 'text-3xl' : 'text-2xl';
        return `<h${level} class="${fontSize} font-extrabold mt-12 mb-6 text-[#08223d] tracking-tight">${renderNodes(node.content)}</h${level}>`;
      case 'paragraph':
        return `<p class="mb-6 leading-[1.8] text-gray-700">${renderNodes(node.content)}</p>`;
      case 'bullet_list':
        return `<ul class="list-disc pl-6 mb-8 space-y-3 text-gray-700">${node.content.map((item: any) => `<li class="pl-2">${renderRichText(item)}</li>`).join('')}</ul>`;
      case 'list_item':
        return renderNodes(node.content);
      case 'blockquote':
        return `<blockquote class="border-l-4 border-[#daa728] pl-8 py-4 italic text-[#135291] bg-blue-50/30 rounded-r-2xl my-10 text-xl font-medium">${renderNodes(node.content)}</blockquote>`;
      case 'code_block':
        return `<pre class="bg-[#08223d] text-blue-100 p-8 rounded-2xl overflow-x-auto my-10 shadow-inner font-mono text-sm"><code>${node.content?.[0]?.text || ''}</code></pre>`;
      case 'horizontal_rule':
        return `<hr class="my-16 border-gray-100" />`;
      default:
        return '';
    }
  }).join('');
};

const mapStoryToPost = (story: any): BlogPost => {
  const { content, created_at, id, tag_list, first_published_at } = story;
  
  // Use first_published_at for the date if it exists, otherwise use creation date
  const displayDate = first_published_at || created_at;
  
  return {
    id: id.toString(),
    slug: story.full_slug, 
    title: content.title || story.name,
    excerpt: content.subtitle || content.excerpt || 'Read the latest insights from Product Hub Africa.',
    content: renderRichText(content.content || content.body),
    author: content.author || 'PHA Editorial',
    authorImage: content.author_image?.filename || null,
    date: new Date(displayDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }),
    readTime: content.read_time || `${Math.max(3, Math.ceil((JSON.stringify(content).length) / 800))} min read`,
    category: content.category || 'Insights',
    image: content.image?.filename || content.featured_image?.filename || 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1200',
    isFeatured: tag_list?.includes('featured') || false,
    tags: tag_list || []
  };
};

export const BlogService = {
  /**
   * Fetches all blog posts. 
   * Uses version='published' for live site, 'draft' for preview.
   */
  getAllPosts: async (version: 'draft' | 'published' = 'published'): Promise<BlogPost[]> => {
    try {
      // We force a cache refresh by appending a timestamp cv parameter
      const cacheBuster = Date.now();
      
      // Attempt to fetch from 'blog' folder first
      let url = `${STORYBLOK_BASE_URL}?token=${STORYBLOK_TOKEN}&starts_with=blog&version=${version}&cv=${cacheBuster}&sort_by=first_published_at:desc`;
      let response = await fetch(url);
      let data = await response.json();
      
      // Fallback to 'Articles' folder if 'blog' is empty
      if (!data.stories || data.stories.length === 0) {
        url = `${STORYBLOK_BASE_URL}?token=${STORYBLOK_TOKEN}&starts_with=Articles&version=${version}&cv=${cacheBuster}&sort_by=first_published_at:desc`;
        response = await fetch(url);
        data = await response.json();
      }
      
      if (!data.stories) return [];
      
      return data.stories
        .filter((s: any) => s.is_startpage !== true) 
        .map(mapStoryToPost);
    } catch (error) {
      console.error("Storyblok Service Error:", error);
      return [];
    }
  },

  /**
   * Fetches a single post by its full slug (e.g., 'blog/my-awesome-post')
   */
  getPostBySlug: async (fullSlug: string, version: 'draft' | 'published' = 'published'): Promise<BlogPost | null> => {
    try {
      const cacheBuster = Date.now();
      const response = await fetch(
        `${STORYBLOK_BASE_URL}/${fullSlug}?token=${STORYBLOK_TOKEN}&version=${version}&cv=${cacheBuster}`
      );
      
      if (!response.ok) return null;
      
      const data = await response.json();
      return mapStoryToPost(data.story);
    } catch (error) {
      console.error("Error fetching single post:", error);
      return null;
    }
  }
};
