import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Cpu, Key, Lock, Server, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Home() {
  return (
    <div className="mx-auto max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
          <div className="flex gap-6 md:gap-10">
            <Link href="/" className="flex items-center space-x-2">
              <Key className="h-6 w-6" />
              <span className="inline-block font-bold">KeywordAI</span>
            </Link>
            <nav className="hidden gap-6 md:flex">
              <Link
                href="#features"
                className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Features
              </Link>
              <Link
                href="#how-it-works"
                className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                How It Works
              </Link>
              <Link
                href="#technical"
                className="flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Technical Details
              </Link>
            </nav>
          </div>
          <div className="flex flex-1 items-center justify-end space-x-4">
            <Button variant="outline" size="sm" className="hidden sm:flex">
              Documentation
            </Button>
            <Button size="sm">Get Started</Button>
          </div>
        </div>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_500px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Extract Professional Keywords with AI
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Transform professional profiles into powerful keyword lists
                    using our local AI solution running on Raspberry Pi.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button className="inline-flex h-10 items-center justify-center">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    className="inline-flex h-10 items-center justify-center"
                  >
                    Learn More
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <div className="relative h-[350px] w-[350px] rounded-lg bg-muted p-4 lg:p-8">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="space-y-2 text-center">
                      <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                        AI-Powered
                      </div>
                      <div className="flex flex-col items-center justify-center space-y-2">
                        <Sparkles className="h-12 w-12 text-primary" />
                        <p className="text-sm text-muted-foreground">
                          Input professional profile text and get relevant
                          keywords instantly
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section
          id="features"
          className="w-full py-12 md:py-24 lg:py-32 bg-muted"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  Features
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Why Choose KeywordAI?
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our solution offers powerful keyword extraction with privacy
                  and convenience in mind.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center">
                    <Lock className="mr-2 h-5 w-5" />
                    Privacy-First
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Runs completely on your local Raspberry Pi. No data ever
                    leaves your network.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center">
                    <Cpu className="mr-2 h-5 w-5" />
                    Optimized Performance
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Specially tuned to run efficiently on Raspberry Pi hardware.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center">
                    <Server className="mr-2 h-5 w-5" />
                    No Internet Required
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Works offline with no need for cloud connectivity or
                    subscriptions.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section id="how-it-works" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  How It Works
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Simple Process, Powerful Results
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Extract the most relevant keywords from any professional
                  profile in seconds.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl items-center gap-6 py-12 md:grid-cols-3">
              <div className="flex flex-col items-center space-y-2 border rounded-lg p-6 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  1
                </div>
                <h3 className="text-xl font-bold">Input Profile</h3>
                <p className="text-sm text-muted-foreground">
                  Paste a professional description or resume text into the
                  system.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border rounded-lg p-6 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  2
                </div>
                <h3 className="text-xl font-bold">AI Processing</h3>
                <p className="text-sm text-muted-foreground">
                  Our local AI model analyzes the text using advanced NLP
                  techniques.
                </p>
              </div>
              <div className="flex flex-col items-center space-y-2 border rounded-lg p-6 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary text-primary-foreground">
                  3
                </div>
                <h3 className="text-xl font-bold">Get Keywords</h3>
                <p className="text-sm text-muted-foreground">
                  Receive a curated list of relevant professional keywords and
                  phrases.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                    Example
                  </div>
                  <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                    See It In Action
                  </h2>
                  <p className="text-muted-foreground md:text-xl/relaxed">
                    Here's an example of how our system transforms a
                    professional profile into relevant keywords.
                  </p>
                </div>
              </div>
              <div className="flex flex-col space-y-4 rounded-xl border bg-background p-6">
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Input:</h3>
                  <p className="text-sm text-muted-foreground">
                    "Experienced software engineer with 8 years of expertise in
                    developing scalable web applications. Proficient in
                    JavaScript, React, Node.js, and AWS. Led multiple teams to
                    deliver enterprise solutions for financial services clients.
                    Strong background in agile methodologies and DevOps
                    practices."
                  </p>
                </div>
                <div className="space-y-2">
                  <h3 className="text-xl font-bold">Output Keywords:</h3>
                  <div className="flex flex-wrap gap-2">
                    {[
                      "software engineer",
                      "web applications",
                      "JavaScript",
                      "React",
                      "Node.js",
                      "AWS",
                      "team leadership",
                      "enterprise solutions",
                      "financial services",
                      "agile methodologies",
                      "DevOps",
                    ].map((keyword) => (
                      <div
                        key={keyword}
                        className="rounded-full bg-primary/10 px-3 py-1 text-sm text-primary"
                      >
                        {keyword}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="technical" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-primary px-3 py-1 text-sm text-primary-foreground">
                  Technical Details
                </div>
                <h2 className="text-3xl font-bold tracking-tighter md:text-4xl/tight">
                  Powered by Advanced AI
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our solution uses state-of-the-art natural language processing
                  models optimized for Raspberry Pi.
                </p>
              </div>
            </div>
            <div className="mx-auto max-w-3xl mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Model Specifications</CardTitle>
                  <CardDescription>
                    We use the keyphrase-extraction-kbir-inspec model from
                    Hugging Face
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <Image
                        src="/placeholder.svg?height=50&width=50"
                        alt="Hugging Face Logo"
                        width={50}
                        height={50}
                        className="rounded-md"
                      />
                      <div>
                        <h3 className="font-medium">
                          ml6team/keyphrase-extraction-kbir-inspec
                        </h3>
                        <p className="text-sm text-muted-foreground">
                          Token Classification, Transformers, PyTorch
                        </p>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <p className="font-medium">Base Model:</p>
                        <p className="text-muted-foreground">RoBERTa</p>
                      </div>
                      <div>
                        <p className="font-medium">Dataset:</p>
                        <p className="text-muted-foreground">midas/inspec</p>
                      </div>
                      <div>
                        <p className="font-medium">Language:</p>
                        <p className="text-muted-foreground">English</p>
                      </div>
                      <div>
                        <p className="font-medium">License:</p>
                        <p className="text-muted-foreground">MIT</p>
                      </div>
                      <div>
                        <p className="font-medium">Paper:</p>
                        <p className="text-muted-foreground">
                          arXiv:2112.08547
                        </p>
                      </div>
                      <div>
                        <p className="font-medium">Likes:</p>
                        <p className="text-muted-foreground">128</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container grid items-center justify-center gap-4 px-4 text-center md:px-6">
            <div className="space-y-3">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Ready to Get Started?
              </h2>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                Start extracting professional keywords from your local Raspberry
                Pi today.
              </p>
            </div>
            <div className="mx-auto flex flex-col gap-2 min-[400px]:flex-row justify-center">
              <Button
                size="lg"
                className="inline-flex items-center justify-center"
              >
                Download Now
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="inline-flex items-center justify-center"
              >
                View Documentation
              </Button>
            </div>
          </div>
        </section>
      </main>
      <footer className="w-full border-t py-6 md:py-0">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
          <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
            © {new Date().getFullYear()} KeywordAI. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <Link
              href="#"
              className="text-sm text-muted-foreground underline-offset-4 hover:underline"
            >
              Terms
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground underline-offset-4 hover:underline"
            >
              Privacy
            </Link>
            <Link
              href="#"
              className="text-sm text-muted-foreground underline-offset-4 hover:underline"
            >
              Contact
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
