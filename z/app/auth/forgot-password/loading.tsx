import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Loading() {
  return (
    <div className="flex min-h-[calc(100vh-64px)] items-center justify-center bg-background px-4 py-12 font-serif">
      <Card className="w-full max-w-md animate-pulse">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-bold">Loading...</CardTitle>
          <CardDescription>Please wait.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="h-10 bg-muted rounded-md w-full" />
          <div className="h-10 bg-muted rounded-md w-full" />
          <div className="h-10 bg-muted rounded-md w-1/2" />
        </CardContent>
      </Card>
    </div>
  )
}
