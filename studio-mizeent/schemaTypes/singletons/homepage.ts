import {defineType, defineField} from 'sanity'

export const homepage = defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  description: 'Content for the main landing page',
  groups: [
    {name: 'hero', title: 'Hero'},
    {name: 'triad', title: 'Triad Authority'},
    {name: 'services', title: 'What We Do'},
    {name: 'smart', title: 'Smart Systems'},
    {name: 'vip', title: 'VIP Club'},
    {name: 'final', title: 'Final CTA'},
    {name: 'seo', title: 'SEO'},
  ],
  fields: [
    // Hero
    defineField({
      name: 'heroHeadlineStart',
      title: 'Headline — Start',
      type: 'string',
      description: 'First part of the headline, e.g. "Furnished Housing &"',
      group: 'hero',
    }),
    defineField({
      name: 'heroHeadlineGreen',
      title: 'Headline — Green Highlighted Middle',
      type: 'string',
      description: 'Middle portion, highlighted in green — e.g. "Property Management"',
      group: 'hero',
    }),
    defineField({
      name: 'heroHeadlineEnd',
      title: 'Headline — End',
      type: 'string',
      description: 'Final part of the headline, e.g. "in the Triad"',
      group: 'hero',
    }),
    defineField({
      name: 'heroSubheadline',
      title: 'Subheadline',
      type: 'string',
      group: 'hero',
    }),
    defineField({
      name: 'heroSupportLine',
      title: 'Support Line',
      type: 'string',
      description: 'Smaller line of text under the subheadline',
      group: 'hero',
    }),
    defineField({
      name: 'heroPrimaryCtaLabel',
      title: 'Primary CTA Label',
      type: 'string',
      initialValue: 'Book a Stay',
      group: 'hero',
    }),
    defineField({
      name: 'heroPrimaryCtaHref',
      title: 'Primary CTA Link',
      type: 'string',
      initialValue: '/properties',
      group: 'hero',
    }),
    defineField({
      name: 'heroSecondaryCtaLabel',
      title: 'Secondary CTA Label',
      type: 'string',
      initialValue: 'Partner With Us',
      group: 'hero',
    }),
    defineField({
      name: 'heroSecondaryCtaHref',
      title: 'Secondary CTA Link',
      type: 'string',
      initialValue: '/property-management',
      group: 'hero',
    }),
    defineField({
      name: 'heroCarouselSlides',
      title: 'Hero Carousel Slides',
      type: 'array',
      of: [{type: 'carouselSlide'}],
      description: 'Rotating hero images. Each slide links to a property page.',
      group: 'hero',
    }),

    // Triad Authority
    defineField({
      name: 'triadHeading',
      title: 'Triad Heading',
      type: 'string',
      group: 'triad',
    }),
    defineField({
      name: 'triadCities',
      title: 'Triad Cities',
      type: 'string',
      description: 'e.g. "Winston-Salem · Greensboro · High Point · Lexington"',
      group: 'triad',
    }),
    defineField({
      name: 'triadDescription',
      title: 'Triad Description',
      type: 'text',
      rows: 4,
      group: 'triad',
    }),

    // What We Do
    defineField({
      name: 'serviceCardsTitle',
      title: 'Service Cards Title',
      type: 'string',
      initialValue: 'What We Do',
      group: 'services',
    }),
    defineField({
      name: 'serviceCards',
      title: 'Service Cards',
      type: 'array',
      description: 'Up to 3 cards highlighting what the business offers',
      of: [{type: 'serviceCard'}],
      validation: (Rule) => Rule.max(3),
      group: 'services',
    }),

    // Smart Systems
    defineField({
      name: 'smartSystemsTitle',
      title: 'Smart Systems Title',
      type: 'string',
      group: 'smart',
    }),
    defineField({
      name: 'smartSystemsDescription',
      title: 'Smart Systems Description',
      type: 'text',
      rows: 4,
      group: 'smart',
    }),
    defineField({
      name: 'smartSystemsButtonLabel',
      title: 'Button Label',
      type: 'string',
      group: 'smart',
    }),
    defineField({
      name: 'smartSystemsButtonHref',
      title: 'Button Link',
      type: 'string',
      group: 'smart',
    }),

    // VIP Club
    defineField({
      name: 'vipTitle',
      title: 'VIP Club Title',
      type: 'string',
      group: 'vip',
    }),
    defineField({
      name: 'vipDescription',
      title: 'VIP Club Description',
      type: 'text',
      rows: 4,
      group: 'vip',
    }),
    defineField({
      name: 'vipButtonLabel',
      title: 'Button Label',
      type: 'string',
      group: 'vip',
    }),
    defineField({
      name: 'vipButtonHref',
      title: 'Button Link',
      type: 'string',
      group: 'vip',
    }),

    // Final CTA
    defineField({
      name: 'finalCtaTitle',
      title: 'Final CTA Title',
      type: 'string',
      group: 'final',
    }),
    defineField({
      name: 'finalCtaCallLabel',
      title: 'Call Button Label',
      type: 'string',
      initialValue: 'Call Now',
      group: 'final',
    }),
    defineField({
      name: 'finalCtaSubmitLabel',
      title: 'Submit Button Label',
      type: 'string',
      initialValue: 'Submit Property',
      group: 'final',
    }),
    defineField({
      name: 'finalCtaSubmitHref',
      title: 'Submit Button Link',
      type: 'string',
      group: 'final',
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
      return {title: 'Homepage'}
    },
  },
})
