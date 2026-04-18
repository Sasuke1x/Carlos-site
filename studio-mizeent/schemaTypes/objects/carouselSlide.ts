import {defineType, defineField} from 'sanity'

export const carouselSlide = defineType({
  name: 'carouselSlide',
  title: 'Carousel Slide',
  type: 'object',
  fields: [
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {hotspot: true},
      validation: (Rule) => Rule.required(),
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Text',
          type: 'string',
          description: 'Describes the image for screen readers and SEO',
        }),
      ],
    }),
    defineField({
      name: 'propertyName',
      title: 'Property Name',
      type: 'string',
      description: 'Displayed over the image',
    }),
    defineField({
      name: 'propertySlug',
      title: 'Property Slug',
      type: 'string',
      description:
        'The URL slug for this property (e.g. "the-aviator"). Clicking the slide links to /properties/{slug}.',
    }),
  ],
  preview: {
    select: {title: 'propertyName', subtitle: 'propertySlug', media: 'image'},
  },
})
