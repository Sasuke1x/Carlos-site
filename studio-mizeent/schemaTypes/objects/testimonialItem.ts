import {defineType, defineField} from 'sanity'

// Inline testimonial (embedded in a page). For reusable testimonials, use the
// `testimonial` document type instead.
export const testimonialItem = defineType({
  name: 'testimonialItem',
  title: 'Testimonial',
  type: 'object',
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
    }),
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'rating',
      title: 'Rating (1-5)',
      type: 'number',
      validation: (Rule) => Rule.min(1).max(5).integer(),
      initialValue: 5,
    }),
  ],
  preview: {
    select: {title: 'name', subtitle: 'quote'},
  },
})
