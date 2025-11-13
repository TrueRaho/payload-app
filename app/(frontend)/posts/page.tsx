import { headers as getHeaders } from 'next/headers.js'
import { getPayload } from 'payload'
import { redirect } from 'next/navigation'
import { Button } from "@/components/ui/button"
import { PostList, type Post } from "@/components/post-list"
import { CreatePostForm } from "@/components/create-post-form"
import config from '@/payload.config'

export default async function PostsPage() {
  const headers = await getHeaders()
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })
  const { user } = await payload.auth({ headers })

  if (!user) {
    redirect('/')
  }

  const { docs: posts } = await payload.find({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    collection: 'posts' as any,
    sort: '-createdAt',
    depth: 2,
  })

  const formattedPosts: Post[] = posts.map((post: unknown) => {
    const postData = post as Record<string, unknown>
    return {
      id: postData.id as string,
      title: postData.title as string,
      content: postData.content as string,
      author: typeof postData.owner === 'object' && postData.owner !== null 
        ? (postData.owner as Record<string, unknown>).email as string 
        : 'Unknown',
      date: new Date(postData.createdAt as string).toLocaleString("en-US", {
        month: "long",
        day: "numeric", 
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }),
      categories: Array.isArray(postData.categories) 
        ? postData.categories.map((cat: unknown) => 
            typeof cat === 'object' && cat !== null ? (cat as Record<string, unknown>).title as string : cat as string
          ) 
        : [],
    }
  })

  async function handleLogout() {
    'use server'
    const { cookies } = await import('next/headers')
    const cookieStore = await cookies()
    
    cookieStore.delete('payload-token')
    
    redirect('/')
  }

  return (
    <div className="dark min-h-screen bg-zinc-900 text-white">
      <div className="container mx-auto max-w-3xl px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex-1" />
          <form action={handleLogout}>
            <Button variant="secondary" className="button-secondary" type="submit">
              Logout
            </Button>
          </form>
        </div>

        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-2">Hello, {user.email}!</h1>
          <p className="text-zinc-400">Create a new post</p>
        </div>

        {/* Create Post Form */}
        <CreatePostForm />

        {/* Old Posts Section */}
        <PostList posts={formattedPosts} />
      </div>
    </div>
  )
}
