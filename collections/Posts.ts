import type { CollectionConfig } from 'payload'

export const Posts: CollectionConfig = {
  slug: "posts" as const,

  labels: {
    singular: "Post",
    plural: "Posts",
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
      name: "categories",
      type: "relationship",
      relationTo: "categories" as any,
      hasMany: true,
      required: true,
    },
    {
      name: "content",
      type: "textarea",
      required: true,
    },
    {
      name: "owner",
      type: "relationship",
      relationTo: "users",
      required: true,
    },
  ],

  access: {
    read: () => true,
    create: ({ req }) => Boolean(req.user),
    update: ({ req }) => Boolean(req.user),
    delete: ({ req }) => Boolean(req.user),
  },
};