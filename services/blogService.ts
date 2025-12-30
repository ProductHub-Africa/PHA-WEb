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
            if (mark.type === 'link') text = `<a href="${mark.attrs.href}" class="text-blue-600 hover:underline" target="_blank">${text}</a>`;
          });
        }
        return text;
      }
      if (node.type === 'image') {
        return `<img src="${node.attrs.src}" alt="${node.attrs.alt || ''}" class="rounded-2xl my-8 w-full shadow-lg" />`;
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
        return `<h${level} class="text-2xl font-bold mt-10 mb-4 text-[#08223d]">${renderNodes(node.content)}</h${level}>`;
      case 'paragraph':
        return `<p class="mb-6 leading-relaxed">${renderNodes(node.content)}</p>`;
      case 'bullet_list':
        return `<ul class="list-disc pl-6 mb-6 space-y-2">${node.content.map((item: any) => `<li class="pl-2">${renderRichText(item)}</li>`).join('')}</ul>`;
      case 'list_item':
        return renderNodes(node.content);
      case 'blockquote':
        return `<blockquote class="border-l-4 border-[#daa728] pl-6 py-2 italic text-gray-600 my-8 text-xl">${renderNodes(node.content)}</blockquote>`;
      case 'code_block':
        return `<pre class="bg-gray-900 text-gray-100 p-6 rounded-xl overflow-x-auto my-6"><code>${node.content?.[0]?.text || ''}</code></pre>`;
      case 'horizontal_rule':
        return `<hr class="my-12 border-gray-100" />`;
      default:
        return '';
    }
  }).join('');
};

const mapStoryToPost = (story: any): BlogPost => {
  const { content, created_at, id, tag_list } = story;
  
  // Use first_published_at if available, otherwise created_at
  const date = story.first_published_at || created_at;
  
  return {
    id: id.toString(),
    slug: story.full_slug, // This will be "blog/my-post" or "Articles/my-post"
    title: content.title || story.name,
    excerpt: content.subtitle || content.excerpt || '',
    content: renderRichText(content.content || content.body),
    author: content.author || 'PHA Team',
    date: new Date(date).toISOString(),
    readTime: `${Math.max(1, Math.ceil((JSON.stringify(content).length) / 1000))} min read`,
    category: content.category || 'Technology',
    image: content.image?.filename || content.featured_image?.filename || 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=1000',
    isFeatured: tag_list?.includes('featured') || false,
    tags: tag_list || []
  };
};

export const BlogService = {
  getAllPosts: async (): Promise<BlogPost[]> => {
    try {
      // We check for "blog" folder first as per latest prompt
      let url = `${STORYBLOK_BASE_URL}?token=${STORYBLOK_TOKEN}&starts_with=blog&version=draft&cv=${Date.now()}`;
      let response = await fetch(url);
      let data = await response.json();
      
      // If no stories in "blog", try "Articles" as per your folder naming instruction
      if (!data.stories || data.stories.length === 0) {
        url = `${STORYBLOK_BASE_URL}?token=${STORYBLOK_TOKEN}&starts_with=Articles&version=draft&cv=${Date.now()}`;
        response = await fetch(url);
        data = await response.json();
      }
      
      if (!data.stories || data.stories.length === 0) {
        console.warn("Storyblok returned no articles in 'blog' or 'Articles' folders.");
        return [];
      }
      
      return data.stories
        .filter((s: any) => s.is_startpage !== true) // Filter out folder root stories
        .map(mapStoryToPost);
    } catch (error) {
      console.error("Storyblok Error:", error);
      return [];
    }
  },

  getPostBySlug: async (fullSlug: string): Promise<BlogPost | null> => {
    try {
      // The API expects the full path like "blog/my-article"
      const response = await fetch(
        `${STORYBLOK_BASE_URL}/${fullSlug}?token=${STORYBLOK_TOKEN}&version=draft`
      );
      
      if (!response.ok) {
        console.error(`Post not found: ${fullSlug}`);
        return null;
      }
      
      const data = await response.json();
      return mapStoryToPost(data.story);
    } catch (error) {
      console.error("Error fetching single post:", error);
      return null;
    }
  }
};