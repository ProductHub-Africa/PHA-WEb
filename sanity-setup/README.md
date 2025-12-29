# Product Hub Africa - Sanity CMS Setup

## Final "Go-Live" Checklist
Before you start writing content, ensure these 3 things are true:

1.  **Project IDs Match**: The ID in `/lib/sanity.ts` (React App) must be identical to the ID in `/sanity-setup/sanity.config.ts` (Studio).
2.  **CORS is Set**: In [manage.sanity.io](https://manage.sanity.io):
    - Go to **API > CORS origins**.
    - Add `http://localhost:5173`.
    - **Crucial**: Check the box "Allow credentials".
3.  **Local Studio Running**:
    - Open a new terminal.
    - `cd sanity-setup`
    - `npm install`
    - `npm run dev` (Access via http://localhost:3333)

## Managing Schemas from VS Code
You have full control. To add a new section to your website (e.g., "Events"):
1.  Create `schemas/event.js`.
2.  Define your fields (title, date, location).
3.  Add it to the `types` array in `sanity.config.ts`.

## Troubleshooting
- **Error 404/403**: Usually means the Project ID is wrong or the dataset isn't named "production".
- **CORS Error**: Usually means you forgot to add the URL in the Sanity dashboard or didn't check "Allow credentials".
- **Missing Images**: Ensure you use the `urlFor` helper provided in `lib/sanity.ts` to convert Sanity's internal references into usable URLs.