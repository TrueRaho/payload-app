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
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email" className="label">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                className="input"
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password" className="label">Password</Label>
                {/* <a
                  href="#"
                  className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a> */}
              </div>
              <Input id="password" type="password" required className="input" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Button type="submit" className="button-primary w-full">
          Login
        </Button>
      </CardFooter>
    </Card>
  )
}