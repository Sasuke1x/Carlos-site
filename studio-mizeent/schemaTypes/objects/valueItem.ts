import {defineType, defineField} from 'sanity'
import {ICON_OPTIONS} from './serviceCard'

export const valueItem = defineType({
  name: 'valueItem',
  title: 'Value',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      options: {list: ICON_OPTIONS, layout: 'dropdown'},
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'icon'},
  },
})
