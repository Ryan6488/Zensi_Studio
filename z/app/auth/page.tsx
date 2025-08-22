"use client"

import React from "react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/client"
import { toast } from "sonner"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function AuthPage() {
  const router = useRouter()
  const supabase = createClient()

  const [loginEmail, setLoginEmail] = React.useState("")
  const [loginPassword, setLoginPassword] = React.useState("")
  const [loginLoading, setLoginLoading] = React.useState(false)

  const [signupName, setSignupName] = React.useState("")
  const [signupEmail, setSignupEmail] = React.useState("")
  const [signupPassword, setSignupPassword] = React.useState("")
  const [signupLoading, setSignupLoading] = React.useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoginLoading(true)
    const { data, error } = await supabase.auth.signInWithPassword({
      email: loginEmail,
      password: loginPassword,
    })

    if (error) {
      toast.error(error.message)
    } else if (data.user) {
      toast.success("Logged in successfully!")
      router.push("/profile")
    }
    setLoginLoading(false)
  }

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setSignupLoading(true)
    const { data, error } = await supabase.auth.signUp({
      email: signupEmail,
      password: signupPassword,
      options: {
        data: {
          full_name: signupName,
        },
      },
    })

    if (error) {
      toast.error(error.message)
    } else if (data.user) {
      toast.success("Account created! Please check your email for verification.")
      router.push("/profile")
    }
    setSignupLoading(false)
  }

  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-background p-4 font-serif">
      <Card className="w-full max-w-md bg-card border border-border shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-extrabold text-foreground">Welcome to Zensi</CardTitle>
          <CardDescription className="text-muted-foreground">Login or create an account to continue.</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="login" className="w-full">
            <TabsList className="grid w-full grid-cols-2 bg-secondary border border-border">
              <TabsTrigger
                value="login"
                className="data-[state=active]:bg-primary data-[state=active]:text-background font-bold uppercase transition-colors duration-300"
              >
                Login
              </TabsTrigger>
              <TabsTrigger
                value="signup"
                className="data-[state=active]:bg-primary data-[state=active]:text-background font-bold uppercase transition-colors duration-300"
              >
                Sign Up
              </TabsTrigger>
            </TabsList>
            <TabsContent value="login" className="mt-6">
              <form onSubmit={handleLogin} className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="login-email" className="text-foreground">
                    Email
                  </Label>
                  <Input
                    id="login-email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                    className="bg-input border-border text-foreground focus:ring-primary"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="login-password" className="text-foreground">
                    Password
                  </Label>
                  <Input
                    id="login-password"
                    type="password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                    className="bg-input border-border text-foreground focus:ring-primary"
                  />
                </div>
                <div className="text-right text-sm">
                  <Link href="/auth/forgot-password" className="underline hover:text-primary text-muted-foreground">
                    Forgot password?
                  </Link>
                </div>
                <Button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 font-bold uppercase"
                  disabled={loginLoading}
                >
                  {loginLoading ? "Logging in..." : "Login"}
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="signup" className="mt-6">
              <form onSubmit={handleSignUp} className="grid gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="signup-name" className="text-foreground">
                    Name
                  </Label>
                  <Input
                    id="signup-name"
                    type="text"
                    placeholder="John Doe"
                    required
                    value={signupName}
                    onChange={(e) => setSignupName(e.target.value)}
                    className="bg-input border-border text-foreground focus:ring-primary"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="signup-email" className="text-foreground">
                    Email
                  </Label>
                  <Input
                    id="signup-email"
                    type="email"
                    placeholder="m@example.com"
                    required
                    value={signupEmail}
                    onChange={(e) => setSignupEmail(e.target.value)}
                    className="bg-input border-border text-foreground focus:ring-primary"
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="signup-password" className="text-foreground">
                    Password
                  </Label>
                  <Input
                    id="signup-password"
                    type="password"
                    required
                    value={signupPassword}
                    onChange={(e) => setSignupPassword(e.target.value)}
                    className="bg-input border-border text-foreground focus:ring-primary"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-300 font-bold uppercase"
                  disabled={signupLoading}
                >
                  {signupLoading ? "Signing up..." : "Sign Up"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  )
}
