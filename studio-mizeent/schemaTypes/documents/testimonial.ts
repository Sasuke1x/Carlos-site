import {defineType, defineField} from 'sanity'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role / Title',
      type: 'string',
      description: 'e.g. "Homeowner", "Guest", "Property Investor"',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'City/state, e.g. "Greensboro, NC"',
    }),
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      rows: 5,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'rating',
      title: 'Rating (1-5)',
      type: 'number',
      initialValue: 5,
      validation: (Rule) => Rule.min(1).max(5).integer(),
    }),
    defineField({
      name: 'propertyStayed',
      title: 'Property Stayed At',
      type: 'reference',
      to: [{type: 'property'}],
      description: 'Optional — link this testimonial to a specific property',
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'When enabled, may appear on the homepage / featured section',
      initialValue: false,
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      description: 'When the testimonial was received',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  orderings: [
    {
      title: 'Newest First',
      name: 'createdAtDesc',
      by: [{field: 'createdAt', direction: 'desc'}],
    },
    {
      title: 'Featured First',
      name: 'featuredFirst',
      by: [
        {field: 'featured', direction: 'desc'},
        {field: 'createdAt', direction: 'desc'},
      ],
    },
  ],
  preview: {
    select: {title: 'name', subtitle: 'quote', featured: 'featured', rating: 'rating'},
    prepare({title, subtitle, featured, rating}) {
      const stars = rating ? '★'.repeat(rating) : ''
      return {
        title: title || 'Untitled testimonial',
        subtitle: `${featured ? '★ ' : ''}${stars}${stars && subtitle ? ' · ' : ''}${subtitle || ''}`,
      }
    },
  },
})
