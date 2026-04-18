import {defineType, defineField} from 'sanity'

export const socialLink = defineType({
  name: 'socialLink',
  title: 'Social Link',
  type: 'object',
  fields: [
    defineField({
      name: 'platform',
      title: 'Platform',
      type: 'string',
      options: {
        list: [
          {title: 'Facebook', value: 'facebook'},
          {title: 'Instagram', value: 'instagram'},
          {title: 'Twitter / X', value: 'twitter'},
          {title: 'LinkedIn', value: 'linkedin'},
          {title: 'TikTok', value: 'tiktok'},
        ],
        layout: 'dropdown',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'url',
      title: 'Profile URL',
      type: 'url',
      validation: (Rule) => Rule.required().uri({scheme: ['http', 'https']}),
    }),
  ],
  preview: {
    select: {title: 'platform', subtitle: 'url'},
    prepare({title, subtitle}) {
      return {
        title: title ? title.charAt(0).toUpperCase() + title.slice(1) : 'Social Link',
        subtitle,
      }
    },
  },
})
