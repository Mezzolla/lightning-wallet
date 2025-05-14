import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Send, Download, Zap, Repeat } from "lucide-react"
import Link from "next/link"

export function QuickActions() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Quick Actions</CardTitle>
        <CardDescription>Common wallet operations</CardDescription>
      </CardHeader>
      <CardContent className="grid gap-4">
        <Button asChild className="w-full justify-start">
          <Link href="/send">
            <Send className="mr-2 h-4 w-4" />
            Send
          </Link>
        </Button>
        <Button asChild className="w-full justify-start">
          <Link href="/receive">
            <Download className="mr-2 h-4 w-4" />
            Receive
          </Link>
        </Button>
        <Button asChild className="w-full justify-start">
          <Link href="/lightning">
            <Zap className="mr-2 h-4 w-4" />
            Lightning
          </Link>
        </Button>
        <Button asChild variant="outline" className="w-full justify-start">
          <Link href="/swap">
            <Repeat className="mr-2 h-4 w-4" />
            Swap
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}
