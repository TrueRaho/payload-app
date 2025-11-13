"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function LoginForm() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    try {
      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      })

      if (response.ok) {
        router.push("/posts")
        router.refresh()
      } else {
        const data = await response.json()
        setError(data.message || "Login failed")
      }
    } catch (err) {
      setError("An error occurred. Please try again.")
    } finally {
      setLoading(false)
    }
  }
  return (
    <Card className="card w-full max-w-sm">
      <CardHeader>
        <CardTitle className="card-title">Login to your account</CardTitle>
        <CardDescription className="card-description">
          Enter your email below to login to your account
        </CardDescription>
        {/* <CardAction>
          <Button variant="link" className="button-link">Sign Up</Button>
        </CardAction> */}
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col gap-6">
            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}
            <div className="grid gap-2">
              <Label htmlFor="email" className="label">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="input"
                disabled={loading}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password" className="label">Password</Label>
              </div>
              <Input 
                id="password" 
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
                className="input"
                disabled={loading}
              />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button 
          type="submit" 
          className="button-primary w-full"
          disabled={loading}
          onClick={handleSubmit}
        >
          {loading ? "Logging in..." : "Login"}
        </Button>
      </CardFooter>
    </Card>
  )
}