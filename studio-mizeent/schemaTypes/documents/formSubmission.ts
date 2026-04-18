import {defineType, defineField} from 'sanity'

// Unified inbox for contact + VIP form submissions. Written by the Next.js
// API routes via a server-only write client. Carlos triages these in the
// Studio: mark status, leave notes. Abuse-tracking fields (ipHash,
// userAgent) are hidden from the default list view.
export const formSubmission = defineType({
  name: 'formSubmission',
  title: 'Form Submission',
  type: 'document',
  groups: [
    {name: 'submission', title: 'Submission', default: true},
    {name: 'followUp', title: 'Follow-up'},
    {name: 'meta', title: 'Metadata'},
  ],
  fields: [
    defineField({
      name: 'formType',
      title: 'Form Type',
      type: 'string',
      options: {
        list: [
          {title: 'Contact', value: 'contact'},
          {title: 'VIP', value: 'vip'},
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
      group: 'submission',
    }),
    defineField({
      name: 'submittedAt',
      title: 'Submitted At',
      type: 'datetime',
      readOnly: true,
      validation: (Rule) => Rule.required(),
      group: 'submission',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: [
          {title: 'New', value: 'new'},
          {title: 'Contacted', value: 'contacted'},
          {title: 'Archived', value: 'archived'},
        ],
        layout: 'radio',
      },
      initialValue: 'new',
      validation: (Rule) => Rule.required(),
      group: 'followUp',
    }),
    defineField({
      name: 'notes',
      title: 'Follow-up Notes',
      type: 'text',
      rows: 4,
      description: 'Private notes for tracking follow-up.',
      group: 'followUp',
    }),

    // Shared
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (Rule) => Rule.required().email(),
      group: 'submission',
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
      group: 'submission',
      validation: (Rule) =>
        Rule.custom((phone, context) => {
          const doc = context.document as {formType?: string} | undefined
          if (doc?.formType === 'vip' && !phone) return 'Phone is required for VIP submissions.'
          return true
        }),
    }),

    // Contact-only
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      group: 'submission',
      hidden: ({document}) => document?.formType !== 'contact',
      validation: (Rule) =>
        Rule.custom((name, context) => {
          const doc = context.document as {formType?: string} | undefined
          if (doc?.formType === 'contact' && !name) return 'Name is required for contact submissions.'
          return true
        }),
    }),
    defineField({
      name: 'message',
      title: 'Message',
      type: 'text',
      rows: 6,
      group: 'submission',
      hidden: ({document}) => document?.formType !== 'contact',
      validation: (Rule) =>
        Rule.custom((message, context) => {
          const doc = context.document as {formType?: string} | undefined
          if (doc?.formType === 'contact' && !message) return 'Message is required for contact submissions.'
          return true
        }),
    }),
    defineField({
      name: 'inquiryType',
      title: 'Inquiry Type',
      type: 'string',
      options: {
        list: [
          {title: 'Guest Inquiry', value: 'guest'},
          {title: 'Property Owner', value: 'owner'},
          {title: 'Service Inquiry', value: 'service'},
        ],
      },
      group: 'submission',
      hidden: ({document}) => document?.formType !== 'contact',
    }),

    // VIP-only
    defineField({
      name: 'firstName',
      title: 'First Name',
      type: 'string',
      group: 'submission',
      hidden: ({document}) => document?.formType !== 'vip',
      validation: (Rule) =>
        Rule.custom((firstName, context) => {
          const doc = context.document as {formType?: string} | undefined
          if (doc?.formType === 'vip' && !firstName) return 'First name is required for VIP submissions.'
          return true
        }),
    }),
    defineField({
      name: 'emailConsent',
      title: 'Email Consent',
      type: 'boolean',
      initialValue: false,
      group: 'submission',
      hidden: ({document}) => document?.formType !== 'vip',
    }),
    defineField({
      name: 'smsConsent',
      title: 'SMS Consent',
      type: 'boolean',
      initialValue: false,
      group: 'submission',
      hidden: ({document}) => document?.formType !== 'vip',
    }),

    // Abuse tracking
    defineField({
      name: 'ipHash',
      title: 'IP Hash',
      type: 'string',
      description: 'SHA-256 hash of submitter IP (with salt). Used for rate limiting.',
      readOnly: true,
      group: 'meta',
    }),
    defineField({
      name: 'userAgent',
      title: 'User Agent',
      type: 'string',
      readOnly: true,
      group: 'meta',
    }),
  ],
  orderings: [
    {
      title: 'Newest first',
      name: 'submittedAtDesc',
      by: [{field: 'submittedAt', direction: 'desc'}],
    },
    {
      title: 'Status then newest',
      name: 'statusThenNewest',
      by: [
        {field: 'status', direction: 'asc'},
        {field: 'submittedAt', direction: 'desc'},
      ],
    },
  ],
  preview: {
    select: {
      name: 'name',
      firstName: 'firstName',
      email: 'email',
      formType: 'formType',
      status: 'status',
      submittedAt: 'submittedAt',
    },
    prepare({name, firstName, email, formType, status, submittedAt}) {
      const display = name || firstName || email || 'Submission'
      const date = submittedAt
        ? new Date(submittedAt as string).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
          })
        : ''
      const statusPill = status === 'new' ? '● new' : status === 'contacted' ? '✓ contacted' : '— archived'
      return {
        title: display,
        subtitle: `${formType?.toUpperCase() ?? '?'} · ${statusPill}${date ? ` · ${date}` : ''}`,
      }
    },
  },
})
