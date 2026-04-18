import {defineType, defineField} from 'sanity'

export const contactPage = defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  groups: [
    {name: 'hero', title: 'Hero'},
    {name: 'info', title: 'Info Cards'},
    {name: 'form', title: 'Form'},
    {name: 'thanks', title: 'Thank You'},
    {name: 'map', title: 'Map'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    defineField({
      name: 'heroTitle',
      title: 'Hero Title',
      type: 'string',
      group: 'hero',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'heroDescription',
      title: 'Hero Description',
      type: 'text',
      rows: 4,
      group: 'hero',
    }),
    defineField({
      name: 'infoCards',
      title: 'Info Cards',
      type: 'array',
      of: [{type: 'infoCard'}],
      description: 'Contact method cards (phone, email, etc.)',
      group: 'info',
    }),
    defineField({
      name: 'formTitle',
      title: 'Form Title',
      type: 'string',
      group: 'form',
    }),
    defineField({
      name: 'formDescription',
      title: 'Form Description',
      type: 'text',
      rows: 3,
      group: 'form',
    }),
    defineField({
      name: 'responseTimeMessage',
      title: 'Response Time Message',
      type: 'string',
      description: 'e.g. "We typically respond within 24 hours"',
      group: 'form',
    }),
    defineField({
      name: 'thankYouTitle',
      title: 'Thank You Title',
      type: 'string',
      description: 'Shown after the contact form is submitted successfully.',
      group: 'thanks',
    }),
    defineField({
      name: 'thankYouMessage',
      title: 'Thank You Message',
      type: 'text',
      rows: 3,
      description: 'Shown below the title after a successful submission.',
      group: 'thanks',
    }),
    defineField({
      name: 'mapEmbedUrl',
      title: 'Map Embed URL',
      type: 'url',
      description: 'Optional Google Maps iframe URL for the contact page',
      group: 'map',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: 'seo',
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Contact Page'}
    },
  },
})
