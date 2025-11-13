"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { CategoryCombobox } from "@/components/category-combobox"

interface CreatePostFormProps {
  onCreatePost: (postData: { title: string; content: string; categories: string[] }) => void;
}

export function CreatePostForm({ onCreatePost }: CreatePostFormProps) {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])

  const handleCreate = () => {
    if (!title.trim() || !content.trim()) return

    onCreatePost({
      title,
      content,
      categories: selectedCategories,
    })

    setTitle("")
    setContent("")
    setSelectedCategories([])
  }

  return (
    <Card className="card w-full max-w-2xl">
      <CardHeader>
        <CardTitle className="card-title">Create New Post</CardTitle>
        <CardDescription className="card-description">
          Fill in the details below to create a new post
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-6">
          <div className="grid gap-2">
            <Label htmlFor="title" className="label">Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter post title"
              className="input"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="content" className="label">Content</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Enter post content"
              className="textarea resize-none min-h-40"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="categories" className="label">Categories</Label>
            <CategoryCombobox
              selected={selectedCategories}
              setSelected={setSelectedCategories}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button
          onClick={handleCreate}
          className="button-primary w-full"
        >
          Create Post
        </Button>
      </CardFooter>
    </Card>
  )
}
