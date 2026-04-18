import {defineType, defineField} from 'sanity'

export const vipPage = defineType({
  name: 'vipPage',
  title: 'VIP Page',
  type: 'document',
  groups: [
    {name: 'hero', title: 'Hero'},
    {name: 'form', title: 'Form'},
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
      name: 'heroSubtitle',
      title: 'Hero Subtitle',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'heroDescription',
      title: 'Hero Description',
      type: 'text',
      rows: 4,
      group: 'hero',
    }),
    defineField({
      name: 'discountPercent',
      title: 'Discount Percent',
      type: 'number',
      initialValue: 15,
      validation: (Rule) => Rule.min(0).max(100).integer(),
      group: 'form',
    }),
    defineField({
      name: 'emailConsentLabel',
      title: 'Email Consent Label',
      type: 'string',
      description: 'Checkbox label for email marketing consent',
      group: 'form',
    }),
    defineField({
      name: 'smsConsentLabel',
      title: 'SMS Consent Label',
      type: 'string',
      description: 'Checkbox label for SMS marketing consent',
      group: 'form',
    }),
    defineField({
      name: 'submitButtonLabel',
      title: 'Submit Button Label',
      type: 'string',
      initialValue: 'Join the VIP Club',
      group: 'form',
    }),
    defineField({
      name: 'thankYouTitle',
      title: 'Thank You Title',
      type: 'string',
      group: 'thanks',
    }),
    defineField({
      name: 'thankYouMessage',
      title: 'Thank You Message',
      type: 'text',
      rows: 3,
      group: 'thanks',
    }),
    defineField({
      name: 'thankYouButtonLabel',
      title: 'Thank You Button Label',
      type: 'string',
      group: 'thanks',
    }),
    defineField({
      name: 'thankYouButtonHref',
      title: 'Thank You Button Link',
      type: 'string',
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
      return {title: 'VIP Page'}
    },
  },
})
