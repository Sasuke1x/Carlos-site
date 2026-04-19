import {defineType, defineField} from 'sanity'

export const managementPage = defineType({
  name: 'managementPage',
  title: 'Property Management Page',
  type: 'document',
  groups: [
    {name: 'hero', title: 'Hero'},
    {name: 'services', title: 'Services'},
    {name: 'process', title: 'Process'},
    {name: 'cta', title: 'Consultation CTA'},
    {name: 'thanks', title: 'Thank You'},
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
      name: 'heroDescription',
      title: 'Hero Description',
      type: 'text',
      rows: 4,
      group: 'hero',
    }),
    defineField({
      name: 'servicesTitle',
      title: 'Services Section Title',
      type: 'string',
      group: 'services',
    }),
    defineField({
      name: 'services',
      title: 'Services',
      type: 'array',
      of: [{type: 'valueItem'}],
      description: 'Individual property management services offered',
      group: 'services',
    }),
    defineField({
      name: 'processTitle',
      title: 'Process Section Title',
      type: 'string',
      group: 'process',
    }),
    defineField({
      name: 'processSteps',
      title: 'Process Steps',
      type: 'array',
      of: [{type: 'processStep'}],
      group: 'process',
    }),
    defineField({
      name: 'consultationCtaTitle',
      title: 'Consultation CTA Title',
      type: 'string',
      group: 'cta',
    }),
    defineField({
      name: 'consultationCtaDescription',
      title: 'Consultation CTA Description',
      type: 'text',
      rows: 3,
      group: 'cta',
    }),
    defineField({
      name: 'consultationThankYouTitle',
      title: 'Thank You Title',
      type: 'string',
      description: 'Shown after the consultation form is submitted successfully.',
      group: 'thanks',
    }),
    defineField({
      name: 'consultationThankYouMessage',
      title: 'Thank You Message',
      type: 'text',
      rows: 3,
      group: 'thanks',
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
      return {title: 'Property Management Page'}
    },
  },
})
