'use server'

import { getPayload } from 'payload'
import { headers as getHeaders } from 'next/headers'
import { redirect } from 'next/navigation'
import config from '@/payload.config'

export async function createPost(formData: FormData) {
  const title = formData.get('title') as string
  const content = formData.get('content') as string
  const categories = formData.get('categories') as string
  
  if (!title?.trim() || !content?.trim()) {
    throw new Error('Title and content are required')
  }

  try {
    const headers = await getHeaders()
    const payloadConfig = await config
    const payload = await getPayload({ config: payloadConfig })
    const { user } = await payload.auth({ headers })

    if (!user) {
      throw new Error('Unauthorized')
    }

    const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')

    const existingPost = await payload.find({
      collection: 'posts' as any,
      where: { slug: { equals: slug } },
      limit: 1,
    })

    if (existingPost.docs.length > 0) {
      throw new Error(`Пост с названием "${title}" уже существует. Пожалуйста, выберите другое название.`)
    }

    const categoryNames = categories ? JSON.parse(categories) : []
    const categoryIds: string[] = []

    for (const categoryName of categoryNames) {
      try {
        const categorySlug = categoryName.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '')
        
        const existingCategory = await payload.find({
          collection: 'categories' as any,
          where: { slug: { equals: categorySlug } },
          limit: 1,
        })

        let categoryId: string

        if (existingCategory.docs.length > 0) {
          categoryId = existingCategory.docs[0].id
        } else {
          const newCategory = await payload.create({
            collection: 'categories' as any,
            data: {
              title: categoryName,
              slug: categorySlug,
              content: `${categoryName} category`,
              owner: user.id,
            },
          })
          categoryId = newCategory.id
        }

        categoryIds.push(categoryId)
      } catch (error) {
        console.error(`Error handling category ${categoryName}:`, error)
      }
    }

    await payload.create({
      collection: 'posts' as any,
      data: {
        title,
        slug,
        content,
        categories: categoryIds.length > 0 ? categoryIds : undefined,
        owner: user.id,
      },
    })

  } catch (error) {
    console.error('Error creating post:', error)
    if (error && typeof error === 'object' && 'digest' in error && 
        typeof error.digest === 'string' && error.digest.includes('NEXT_REDIRECT')) {
      throw error
    }
    if (error instanceof Error) {
      throw error
    }
    throw new Error('Failed to create post')
  }

  redirect('/posts')
}
