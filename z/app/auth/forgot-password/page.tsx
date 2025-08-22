'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { createClient } from '@/lib/client'
import { toast } from 'sonner'

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const supabase = createClient()

  const accessToken = searchParams.get('access_token')
  const type = searchParams.get('type')

  useEffect(() => {
    // If an access_token and type=recovery are present, it means the user clicked the reset link
    if (accessToken && type === 'recovery') {
      // Supabase automatically handles session for recovery links,
      // so we just need to ensure the user can update their password.
      // No explicit session setting is needed here.
    }
  }, [accessToken, type])

  const handleResetPasswordRequest = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth/forgot-password`, // Redirect back to this page with token
    })

    if (error) {
      toast.error(error.message)
    } else {
      setEmailSent(true)
      toast.success('Password reset email sent! Check your inbox.')
    }
    setLoading(false)
  }

  const handleUpdatePassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    const { error } = await supabase.auth.updateUser({ password: newPassword })

    if (error) {
      toast.error(error.message)
    } else {
      toast.success('Your password has been updated successfully!')
      router.push('/profile') // Redirect to profile or login page
    }
    setLoading(false)
  }

  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-background px-4 py-12 font-serif">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">
            {accessToken && type === 'recovery' ? 'Set New Password' : 'Forgot Password'}
          </CardTitle>
          <CardDescription>
            {accessToken && type === 'recovery'
              ? 'Enter your new password below.'
              : 'Enter your email to receive a password reset link.'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {accessToken && type === 'recovery' ? (
            <form onSubmit={handleUpdatePassword} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="new-password">New Password</Label>
                <Input
                  id="new-password"
                  type="password"
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Updating Password...' : 'Update Password'}
              </Button>
            </form>
          ) : (
            <form onSubmit={handleResetPasswordRequest} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={emailSent}
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading || emailSent}>
                {loading ? 'Sending Link...' : emailSent ? 'Link Sent!' : 'Send Reset Link'}
              </Button>
              {emailSent && (
                <p className="text-sm text-center text-muted-foreground">
                  If an account with that email exists, a password reset link has been sent.
                </p>
              )}
            </form>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
