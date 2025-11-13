import { Badge } from "@/components/ui/badge"
import { Card, CardHeader, CardTitle } from "@/components/ui/card"

export interface Post {
  id: string
  title: string
  content: string
  author: string
  date: string
  categories: string[]
}

interface PostListProps {
  posts: Post[]
}

export function PostList({ posts }: PostListProps) {
  return (
    <div>
      <h2 className="text-2xl font-bold mb-6 mt-6">Old Posts</h2>
      <div className="space-y-4">
        {posts.map((post) => (
          <Card key={post.id} className="card pb-2">
            <CardHeader>
              <div className="flex justify-between items-start w-full">
                <div>
                  <CardTitle className="text-xl font-bold mb-2">{post.title}</CardTitle>
                  <p className="text-sm text-zinc-400 leading-tight">by {post.author}</p>
                  <p className="text-sm text-zinc-400 leading-tight">{post.date}</p>
                </div>

                <div className="flex gap-1 ml-4">
                  {post.categories.map((category) => (
                    <Badge key={category} variant="secondary" className="badge">
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  )
}
