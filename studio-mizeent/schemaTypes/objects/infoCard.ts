import {defineType, defineField} from 'sanity'
import {ICON_OPTIONS} from './serviceCard'

export const infoCard = defineType({
  name: 'infoCard',
  title: 'Info Card',
  type: 'object',
  description: 'Small contact/info card (phone, email, address, etc.)',
  fields: [
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      options: {list: ICON_OPTIONS, layout: 'dropdown'},
    }),
    defineField({
      name: 'label',
      title: 'Label',
      type: 'string',
      description: 'e.g. "Call Us", "Email", "Visit"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'value',
      title: 'Value',
      type: 'string',
      description: 'The displayed value, e.g. "(336) 883-5635"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'href',
      title: 'Link',
      type: 'string',
      description: 'Optional link — e.g. "tel:+13368835635" or "mailto:hi@example.com"',
    }),
  ],
  preview: {
    select: {title: 'label', subtitle: 'value'},
  },
})
