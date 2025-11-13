import type { CollectionConfig } from 'payload'

export const Categories: CollectionConfig = {
  slug: "categories" as const,

  labels: {
    singular: "Category",
    plural: "Categories",
  },

  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "slug",
      type: "text",
      required: true,
      unique: true,
    },
    {
      name: "content",
      type: "textarea",
    },
    {
      name: "owner",
      type: "relationship",
      relationTo: "users",
      required: true,
    },
    {
      name: "posts",
      type: "join",
      collection: "posts" as any,
      on: "categories",
    },
  ],

  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
};