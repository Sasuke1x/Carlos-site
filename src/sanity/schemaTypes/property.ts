import { defineType, defineField, defineArrayMember } from "sanity";
import { HomeIcon } from "@sanity/icons";

export const property = defineType({
  name: "property",
  title: "Property",
  type: "document",
  icon: HomeIcon,
  fields: [
    defineField({
      name: "name",
      title: "Property Name",
      type: "string",
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "name", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: "tagline",
      title: "Tagline",
      type: "string",
    }),
    defineField({
      name: "address",
      title: "Address",
      type: "object",
      fields: [
        defineField({ name: "street", title: "Street", type: "string" }),
        defineField({ name: "city", title: "City", type: "string" }),
        defineField({ name: "state", title: "State", type: "string" }),
        defineField({ name: "zip", title: "ZIP Code", type: "string" }),
        defineField({ name: "lat", title: "Latitude", type: "number" }),
        defineField({ name: "lng", title: "Longitude", type: "number" }),
      ],
    }),
    defineField({
      name: "summary",
      title: "Summary",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 6,
    }),
    defineField({
      name: "bedrooms",
      title: "Bedrooms",
      type: "number",
      validation: (rule) => rule.min(0).integer(),
    }),
    defineField({
      name: "bathrooms",
      title: "Bathrooms",
      type: "number",
      validation: (rule) => rule.min(0),
    }),
    defineField({
      name: "beds",
      title: "Beds",
      type: "number",
      validation: (rule) => rule.min(0).integer(),
    }),
    defineField({
      name: "maxGuests",
      title: "Max Guests",
      type: "number",
      validation: (rule) => rule.min(1).integer(),
    }),
    defineField({
      name: "amenities",
      title: "Amenities",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "highlights",
      title: "Highlights",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "idealFor",
      title: "Ideal For",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),
    defineField({
      name: "petsAllowed",
      title: "Pets Allowed",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "smokingAllowed",
      title: "Smoking Allowed",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "eventsAllowed",
      title: "Events Allowed",
      type: "boolean",
      initialValue: false,
    }),
    defineField({
      name: "checkin",
      title: "Check-in Time",
      type: "string",
    }),
    defineField({
      name: "checkout",
      title: "Check-out Time",
      type: "string",
    }),
    defineField({
      name: "images",
      title: "Images",
      type: "array",
      of: [
        defineArrayMember({
          type: "image",
          options: { hotspot: true },
        }),
      ],
    }),
    defineField({
      name: "heroImage",
      title: "Hero Image",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "airbnbUrl",
      title: "Airbnb URL",
      type: "url",
      validation: (rule) =>
        rule.uri({ scheme: ["https"] }).warning("Must be an https URL"),
    }),
    defineField({
      name: "hospitable_id",
      title: "Hospitable ID",
      type: "string",
    }),
    defineField({
      name: "propertyType",
      title: "Property Type",
      type: "string",
      options: {
        list: [
          { title: "Entire Home", value: "Entire Home" },
          { title: "Private Room", value: "Private Room" },
          { title: "Shared Room", value: "Shared Room" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "listed",
      title: "Listed",
      type: "boolean",
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: "name",
      subtitle: "tagline",
      media: "heroImage",
    },
  },
});
