import {defineType, defineField} from 'sanity'

export const processStep = defineType({
  name: 'processStep',
  title: 'Process Step',
  type: 'object',
  fields: [
    defineField({
      name: 'step',
      title: 'Step Number',
      type: 'number',
      description: 'Order of this step (1, 2, 3...)',
      validation: (Rule) => Rule.required().integer().positive(),
    }),
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
  ],
  preview: {
    select: {step: 'step', title: 'title'},
    prepare({step, title}) {
      return {
        title: title || 'Untitled step',
        subtitle: step ? `Step ${step}` : undefined,
      }
    },
  },
})
