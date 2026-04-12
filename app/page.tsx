import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, BookOpen, Code, Layers, Users } from "lucide-react"

export default function DocsHomePage() {
  return (
    <div className="space-y-16">
      <section className="relative overflow-hidden rounded-3xl border border-border/60 bg-card/80 p-10 shadow-sm">
        <div className="absolute -top-24 right-0 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(16,185,129,0.25),rgba(16,185,129,0))]" />
        <div className="absolute -bottom-24 left-0 h-64 w-64 rounded-full bg-[radial-gradient(circle,rgba(249,115,22,0.22),rgba(249,115,22,0))]" />
        <div className="relative space-y-6">
          <Badge variant="secondary">Storyworld Production Studio</Badge>
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight font-[var(--font-serif)]">
            Marvox Documentation
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Build character‑aware storyworlds with CharacterOS. This documentation covers onboarding, workflows, and the
            production API.
          </p>
          <div className="flex flex-col sm:flex-row gap-3">
            <Button asChild size="lg">
              <Link href="/getting-started">
                Start Here <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/api">API Reference</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="space-y-2">
            <BookOpen className="h-6 w-6 text-primary" />
            <CardTitle>Getting Started</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Start with the canonical onboarding flow and launch your first storyworld.
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="space-y-2">
            <Users className="h-6 w-6 text-primary" />
            <CardTitle>User Guide</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Learn CharacterOS Studio workflows, collaboration, and audio preview generation.
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="space-y-2">
            <Code className="h-6 w-6 text-primary" />
            <CardTitle>API Reference</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            OpenAPI‑driven reference covering auth, projects, CharacterOS, and audio.
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="space-y-2">
            <Layers className="h-6 w-6 text-primary" />
            <CardTitle>Architecture</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground">
            Understand the agent network, storage, and retrieval stack.
          </CardContent>
        </Card>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle className="font-[var(--font-serif)]">Core Loop</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-muted-foreground space-y-2">
            <div>Upload → Analyze → Build CharacterOS → Generate Scene → Validate Continuity → Audio Preview → Export</div>
            <div>Everything in this loop is documented in the Start Here guide.</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="font-[var(--font-serif)]">Quick Links</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-2 text-sm">
            <Link href="/developers" className="text-primary hover:underline">
              Developer Guide
            </Link>
            <Link href="/deployment" className="text-primary hover:underline">
              Deployment
            </Link>
            <Link href="/roadmap" className="text-primary hover:underline">
              Roadmap
            </Link>
          </CardContent>
        </Card>
      </section>
    </div>
  )
}
