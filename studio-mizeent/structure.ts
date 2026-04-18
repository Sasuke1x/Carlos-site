import type {StructureResolver} from 'sanity/structure'

// Custom studio structure: singletons at the top, then collections.
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      // Global
      S.listItem()
        .title('Site Settings')
        .id('siteSettings')
        .child(
          S.document()
            .schemaType('siteSettings')
            .documentId('siteSettings')
            .title('Site Settings'),
        ),
      S.listItem()
        .title('Footer Settings')
        .id('footerSettings')
        .child(
          S.document()
            .schemaType('footerSettings')
            .documentId('footerSettings')
            .title('Footer Settings'),
        ),

      S.divider(),

      // Pages
      S.listItem()
        .title('Homepage')
        .id('homepage')
        .child(S.document().schemaType('homepage').documentId('homepage').title('Homepage')),
      S.listItem()
        .title('About')
        .id('aboutPage')
        .child(S.document().schemaType('aboutPage').documentId('aboutPage').title('About Page')),
      S.listItem()
        .title('Property Management')
        .id('managementPage')
        .child(
          S.document()
            .schemaType('managementPage')
            .documentId('managementPage')
            .title('Property Management Page'),
        ),
      S.listItem()
        .title('Renovation')
        .id('renovationPage')
        .child(
          S.document()
            .schemaType('renovationPage')
            .documentId('renovationPage')
            .title('Renovation Page'),
        ),
      S.listItem()
        .title('AI & Automation')
        .id('aiAutomationPage')
        .child(
          S.document()
            .schemaType('aiAutomationPage')
            .documentId('aiAutomationPage')
            .title('AI & Automation Page'),
        ),
      S.listItem()
        .title('Contact')
        .id('contactPage')
        .child(
          S.document().schemaType('contactPage').documentId('contactPage').title('Contact Page'),
        ),
      S.listItem()
        .title('VIP')
        .id('vipPage')
        .child(S.document().schemaType('vipPage').documentId('vipPage').title('VIP Page')),

      S.divider(),

      // Collections
      S.documentTypeListItem('property').title('Properties'),
      S.documentTypeListItem('testimonial').title('Testimonials'),
    ])
