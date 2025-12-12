# Sanity Studio Setup Guide

You have connected your React App to Sanity, but now you need to configure the database structure (Schemas) and add content.

## Step 1: Initialize the Studio
Run this command in your main project folder (or a separate terminal). It will create a new folder called `studio` inside your project.

```bash
# Initialize a new Sanity project using your existing Project ID
npm create sanity@latest -- --project m47z9y0m --dataset production --output-path studio
```

**When prompted:**
1.  **Log in** if asked.
2.  **TypeScript?** You can say **No** (JavaScript is easier for simple schemas) or Yes (if you prefer).
3.  **Project template?** Select **Clean project with no predefined schemas**.

## Step 2: Add the Schemas
Once the installation finishes, you will see a `studio` folder.
1.  Navigate to `studio/schemas/`
2.  Copy the `post.js`, `author.js`, and `category.js` files from the `sanity-setup/schemas/` folder (in this project) into `studio/schemas/`.
3.  Open `studio/schemas/index.js` (or `index.ts`) and register them:

```javascript
import post from './post'
import author from './author'
import category from './category'

export const schemaTypes = [post, author, category]
```

## Step 3: Run the Studio
```bash
cd studio
npm run dev
```
Open `http://localhost:3333` in your browser.

## Step 4: Add Content
1.  **Create an Author**: Go to the "Author" tab and create a profile (e.g., "Victoria Oladosu").
2.  **Create a Category**: Create a category called "Product Management".
3.  **Create a Post**:
    *   **Title**: "The Future of Product Management"
    *   **Slug**: Click "Generate" (Important! The website looks for this).
    *   **Author**: Select the author you created.
    *   **Category**: Select the category.
    *   **Published At**: Set to today/now.
    *   **Main Image**: Upload an image.
    *   **Body**: Type some text.
4.  **Publish**: Click the green "Publish" button at the bottom.

## Step 5: Refresh Website
Go back to your React website (`http://localhost:5173`). It should now fetch and display your new blog post instead of the mock data!
