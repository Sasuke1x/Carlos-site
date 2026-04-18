import {defineType, defineField} from 'sanity'

// Most property data (pricing, availability, photos) comes from the Hospitable
// API and lib/properties.ts. This document lets Carlos attach marketing-style
// overrides — tagline, featured flag, display order — keyed by slug.
export const property = defineType({
  name: 'property',
  title: 'Property',
  type: 'document',
  description:
    'Marketing overrides for a property. Core data (photos, pricing, availability) comes from Hospitable.',
  fields: [
    defineField({
      name: 'name',
      title: 'Property Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Must match the slug used in lib/properties.ts (e.g. "the-aviator")',
      options: {source: 'name', maxLength: 96},
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'marketingTagline',
      title: 'Marketing Tagline',
      type: 'string',
      description: 'Short phrase used in cards and listings',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      description: 'Long-form marketing description',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image Override',
      type: 'image',
      description:
        'Optional custom hero image for this property. Falls back to Hospitable data if empty.',
      options: {hotspot: true},
      fields: [defineField({name: 'alt', title: 'Alt Text', type: 'string'})],
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      description: 'When enabled, highlights this property in featured listings',
      initialValue: false,
    }),
    defineField({
      name: 'featuredOrder',
      title: 'Featured Order',
      type: 'number',
      description: 'Sort order among featured properties (lower = first)',
      validation: (Rule) => Rule.integer(),
    }),
  ],
  orderings: [
    {
      title: 'Featured Order',
      name: 'featuredOrderAsc',
      by: [{field: 'featuredOrder', direction: 'asc'}],
    },
    {
      title: 'Name A–Z',
      name: 'nameAsc',
      by: [{field: 'name', direction: 'asc'}],
    },
  ],
  preview: {
    select: {title: 'name', subtitle: 'marketingTagline', media: 'heroImage', featured: 'featured'},
    prepare({title, subtitle, media, featured}) {
      return {
        title: title || 'Untitled property',
        subtitle: featured ? `★ Featured${subtitle ? ` · ${subtitle}` : ''}` : subtitle,
        media,
      }
    },
  },
})
