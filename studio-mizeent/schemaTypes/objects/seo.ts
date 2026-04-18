import {defineType, defineField} from 'sanity'

export const seo = defineType({
  name: 'seo',
  title: 'SEO',
  type: 'object',
  description: 'Search engine optimization settings for this page',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description: 'Title used in browser tabs and Google results. Keep under 60 characters.',
      validation: (Rule) =>
        Rule.max(60).warning('Meta titles longer than 60 characters may be truncated in search results.'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description:
        'Short summary shown in search results and social previews. Keep under 160 characters.',
      validation: (Rule) =>
        Rule.max(160).warning(
          'Meta descriptions longer than 160 characters may be truncated in search results.',
        ),
    }),
    defineField({
      name: 'keywords',
      title: 'Keywords',
      type: 'array',
      of: [{type: 'string'}],
      options: {layout: 'tags'},
      description: 'Optional keywords for this page (mostly deprecated by search engines, but useful internally).',
    }),
    defineField({
      name: 'ogImage',
      title: 'Social Share Image',
      type: 'image',
      description: 'Image shown when the page is shared on Facebook, LinkedIn, etc. Recommended: 1200×630.',
      options: {hotspot: true},
    }),
    defineField({
      name: 'noIndex',
      title: 'Hide from Search Engines',
      type: 'boolean',
      description: 'When enabled, adds a noindex tag so this page won\'t appear in Google results.',
      initialValue: false,
    }),
  ],
})
