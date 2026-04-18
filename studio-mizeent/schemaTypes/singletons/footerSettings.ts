import {defineType, defineField} from 'sanity'

export const footerSettings = defineType({
  name: 'footerSettings',
  title: 'Footer Settings',
  type: 'document',
  description: 'Content displayed in the site footer',
  fields: [
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      description: 'Short phrase below the logo in the footer',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
      description: 'Longer paragraph describing the business',
    }),
    defineField({
      name: 'servicesLinks',
      title: 'Services Links',
      type: 'array',
      of: [{type: 'link'}],
      description: 'Links shown under the "Services" column',
    }),
    defineField({
      name: 'quickLinks',
      title: 'Quick Links',
      type: 'array',
      of: [{type: 'link'}],
      description: 'Links shown under the "Quick Links" column',
    }),
    defineField({
      name: 'copyrightText',
      title: 'Copyright Text',
      type: 'string',
      description:
        'Shown at the bottom of the footer. Use {year} to auto-insert the current year, e.g. "© {year} CEO Hosting U"',
    }),
    defineField({
      name: 'showSocialLinks',
      title: 'Show Social Links',
      type: 'boolean',
      description: 'When enabled, displays the social links from Site Settings in the footer',
      initialValue: true,
    }),
  ],
  preview: {
    prepare() {
      return {title: 'Footer Settings'}
    },
  },
})
