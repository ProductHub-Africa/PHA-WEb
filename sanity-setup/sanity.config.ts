import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure'; // Updated from deskTool
import { visionTool } from '@sanity/vision';
import post from './schemas/post';
import author from './schemas/author';
import category from './schemas/category';

export default defineConfig({
  name: 'default',
  title: 'Product Hub Africa Studio',

  // ----------------------------------------------------------------
  // 1. PROJECT SETTINGS
  // ----------------------------------------------------------------
  projectId: 'm47z9y0m', // <-- UPDATE THIS TO YOUR NEW PROJECT ID
  dataset: 'production',

  plugins: [
    structureTool(), 
    visionTool()
  ],

  schema: {
    /**
     * TO DELETE A SCHEMA:
     * 1. Remove the import line at the top of this file.
     * 2. Remove the name from the 'types' array below.
     * 3. Delete the corresponding file in the /schemas folder.
     */
    types: [post, author, category],
  },
});
