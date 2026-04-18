// Objects
import {seo} from './objects/seo'
import {link} from './objects/link'
import {socialLink} from './objects/socialLink'
import {serviceCard} from './objects/serviceCard'
import {processStep} from './objects/processStep'
import {valueItem} from './objects/valueItem'
import {carouselSlide} from './objects/carouselSlide'
import {infoCard} from './objects/infoCard'
import {testimonialItem} from './objects/testimonialItem'
import {galleryItem} from './objects/galleryItem'

// Singletons
import {siteSettings} from './singletons/siteSettings'
import {footerSettings} from './singletons/footerSettings'
import {homepage} from './singletons/homepage'
import {aboutPage} from './singletons/aboutPage'
import {managementPage} from './singletons/managementPage'
import {renovationPage} from './singletons/renovationPage'
import {aiAutomationPage} from './singletons/aiAutomationPage'
import {contactPage} from './singletons/contactPage'
import {vipPage} from './singletons/vipPage'

// Documents
import {property} from './documents/property'
import {testimonial} from './documents/testimonial'
import {formSubmission} from './documents/formSubmission'

// Names of document types that should behave as singletons in the Studio.
// The custom structure uses this list to render a single editable document
// per type and disable actions that would break that invariant.
export const SINGLETON_TYPES = new Set<string>([
  'siteSettings',
  'footerSettings',
  'homepage',
  'aboutPage',
  'managementPage',
  'renovationPage',
  'aiAutomationPage',
  'contactPage',
  'vipPage',
])

export const SINGLETON_ACTIONS = new Set(['publish', 'discardChanges', 'restore'])

export const schemaTypes = [
  // Objects
  seo,
  link,
  socialLink,
  serviceCard,
  processStep,
  valueItem,
  carouselSlide,
  infoCard,
  testimonialItem,
  galleryItem,

  // Singletons
  siteSettings,
  footerSettings,
  homepage,
  aboutPage,
  managementPage,
  renovationPage,
  aiAutomationPage,
  contactPage,
  vipPage,

  // Documents
  property,
  testimonial,
  formSubmission,
]
