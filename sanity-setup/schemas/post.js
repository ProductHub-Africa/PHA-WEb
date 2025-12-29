export default {
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      description: 'The main headline of the blog post.',
      validation: Rule => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'The unique URL segment for this post. Click "Generate" to create one from the title.',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: Rule => Rule.required(),
    },
    {
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      description: 'A brief summary of the post (around 150-200 characters). This appears on the blog listing page.',
      validation: Rule => Rule.max(300).warning('Keep excerpts concise for better UI presentation.'),
    },
    {
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: {type: 'author'},
      description: 'Select the person who wrote this article.',
    },
    {
      name: 'mainImage',
      title: 'Cover Image',
      type: 'image',
      description: 'The main banner image for the article.',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'categories',
      title: 'Categories',
      type: 'array',
      description: 'Assign this post to one or more categories.',
      of: [{type: 'reference', to: {type: 'category'}}],
    },
    {
      name: 'tags',
      title: 'Tags',
      type: 'array',
      description: 'Add searchable keywords or labels.',
      of: [{type: 'string'}],
      options: {
        layout: 'tags',
      },
    },
    {
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      description: 'Set the date this post should be visible on the site.',
    },
    {
      name: 'body',
      title: 'Main Content',
      type: 'array',
      description: 'The full text of your blog post. Supports rich text, images, and formatting.',
      of: [
        {
          title: 'Block',
          type: 'block',
          styles: [
            {title: 'Normal', value: 'normal'},
            {title: 'H1', value: 'h1'},
            {title: 'H2', value: 'h2'},
            {title: 'H3', value: 'h3'},
            {title: 'Quote', value: 'blockquote'},
          ],
          lists: [{title: 'Bullet', value: 'bullet'}, {title: 'Number', value: 'number'}],
          marks: {
            decorators: [
              {title: 'Strong', value: 'strong'},
              {title: 'Emphasis', value: 'em'},
            ],
          },
        },
        {
          type: 'image',
          options: {hotspot: true},
          fields: [
            {
              name: 'caption',
              type: 'string',
              title: 'Caption',
              options: { isHighlighted: true }
            },
            {
              name: 'alt',
              type: 'string',
              title: 'Alt Text',
              description: 'Important for accessibility and SEO.',
              options: { isHighlighted: true }
            }
          ]
        },
      ],
    },
  ],

  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'mainImage',
    },
    prepare(selection) {
      const {author} = selection
      return Object.assign({}, selection, {
        subtitle: author && `by ${author}`,
      })
    },
  },
}
