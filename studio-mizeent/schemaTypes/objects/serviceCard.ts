import {defineType, defineField} from 'sanity'

export const ICON_OPTIONS = [
  {title: 'Home', value: 'home'},
  {title: 'Key', value: 'key'},
  {title: 'Hard Hat', value: 'hardhat'},
  {title: 'Building', value: 'building'},
  {title: 'Wrench', value: 'wrench'},
  {title: 'Tools', value: 'tools'},
  {title: 'Sparkles', value: 'sparkles'},
  {title: 'Shield', value: 'shield'},
  {title: 'Chart', value: 'chart'},
  {title: 'Heart', value: 'heart'},
  {title: 'Star', value: 'star'},
  {title: 'Phone', value: 'phone'},
  {title: 'Mail', value: 'mail'},
  {title: 'Map Pin', value: 'mappin'},
  {title: 'Bot / AI', value: 'bot'},
  {title: 'Cog', value: 'cog'},
]

export const serviceCard = defineType({
  name: 'serviceCard',
  title: 'Service Card',
  type: 'object',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Icon displayed at the top of the card',
      options: {list: ICON_OPTIONS, layout: 'dropdown'},
    }),
    defineField({
      name: 'bullets',
      title: 'Bullet Points',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Short benefit statements displayed under the title',
      validation: (Rule) => Rule.max(6),
    }),
    defineField({
      name: 'buttonLabel',
      title: 'Button Label',
      type: 'string',
      description: 'Text for the call-to-action button',
    }),
    defineField({
      name: 'buttonHref',
      title: 'Button Link',
      type: 'string',
      description: 'Where clicking the button takes the visitor (path or full URL)',
    }),
  ],
  preview: {
    select: {title: 'title', subtitle: 'icon'},
    prepare({title, subtitle}) {
      return {
        title: title || 'Untitled service',
        subtitle: subtitle ? `Icon: ${subtitle}` : undefined,
      }
    },
  },
})
