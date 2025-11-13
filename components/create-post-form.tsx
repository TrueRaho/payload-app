"use client"

import { useState, useTransition } from "react"
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
import { Alert, AlertDescription } from "@/components/ui/alert"
import { createPost } from "@/app/actions/create-post"
import { AlertCircle } from "lucide-react"

export function CreatePostForm() {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState("")

  const handleSubmit = async (formData: FormData) => {
    setError("")
    
    startTransition(async () => {
      formData.append('categories', JSON.stringify(selectedCategories))
      const result = await createPost(formData)
      
      if (result.success) {
        setTitle("")
        setContent("")
        setSelectedCategories([])
      } else {
        setError(result.error || "Failed to create post")
      }
    })
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
        <form id="create-post-form" action={handleSubmit}>
          <div className="flex flex-col gap-6">
            {error && (
              <Alert variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  {error}
                </AlertDescription>
              </Alert>
            )}
            <div className="grid gap-2">
              <Label htmlFor="title" className="label">Title</Label>
              <Input
                id="title"
                name="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter post title"
                className="input"
                disabled={isPending}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="content" className="label">Content</Label>
              <Textarea
                id="content"
                name="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Enter post content"
                className="textarea resize-none min-h-40"
                disabled={isPending}
                required
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
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button
          type="submit"
          form="create-post-form"
          className="button-primary w-full"
          disabled={isPending}
        >
          {isPending ? "Creating..." : "Create Post"}
        </Button>
      </CardFooter>
    </Card>
  )
}
