"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { PostList, type Post } from "@/components/post-list"
import { CreatePostForm } from "@/components/create-post-form"

const mockPosts: Post[] = [
  {
    id: "1",
    title: "adf",
    content: "",
    author: "Test user 1",
    date: "November 12, 2025 at 04:10 PM",
    categories: ["Education", "Tech"],
  },
]

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>(mockPosts)

  const handleCreatePost = (postData: { title: string; content: string; categories: string[] }) => {
    const newPost: Post = {
      id: Date.now().toString(),
      ...postData,
      author: "Test user 1", // Replace with actual user data
      date: new Date().toLocaleString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      }),
    }
    setPosts([newPost, ...posts])
  }

  return (
    <div className="dark min-h-screen bg-zinc-900 text-white">
      <div className="container mx-auto max-w-3xl px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-12">
          <div className="flex-1" />
          <Button variant="secondary" className="button-secondary">
            Logout
          </Button>
        </div>

        {/* Welcome Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-2">Hello, Test user 1!</h1>
          <p className="text-zinc-400">Create a new post</p>
        </div>

        {/* Create Post Form */}
        <CreatePostForm onCreatePost={handleCreatePost} />

        {/* Old Posts Section */}
        <PostList posts={posts} />
      </div>
    </div>
  )
}
