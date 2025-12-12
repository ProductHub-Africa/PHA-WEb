import { createClient } from '@sanity/client';

// ------------------------------------------------------------------
// HOW TO SET UP SANITY:
// 1. Go to https://www.sanity.io/ and create a free account.
// 2. Create a new project (or run 'npm create sanity@latest' locally if you know CLI).
// 3. Go to your Project Settings -> API.
// 4. Add your Project ID below.
// 5. Add "http://localhost:5173" (or your deployed URL) to "CORS Origins".
// ------------------------------------------------------------------

export const sanityClient = createClient({
  projectId: 'm47z9y0m', 
  dataset: 'production',
  useCdn: true, // set to `false` to bypass the edge cache
  apiVersion: '2023-05-03', // use current date (YYYY-MM-DD) to target the latest API version
});

// Helper to generate image URLs if you use Sanity Images
// (You would typically use @sanity/image-url package, but keeping it simple here)
export const urlFor = (source: any) => {
  if (!source || !source.asset || !source.asset._ref) return '';
  // Simple hack to construct Sanity CDN URL without extra package dependencies
  // Format: image-<id>-<width>x<height>-<format>
  const ref = source.asset._ref;
  const [,, dimensions, format] = ref.split('-');
  const projectId = 'm47z9y0m';
  const dataset = 'production';
  return `https://cdn.sanity.io/images/${projectId}/${dataset}/${ref.replace('image-', '')}.${format}`;
};