import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Clock, Users, Mic, Brain, BarChart3, Smartphone, Shield, Zap } from "lucide-react"

export default function RezumKickstarterPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Image
              src="/placeholder.svg?height=40&width=40"
              alt="Kickstarter Logo"
              width={40}
              height={40}
              className="rounded"
            />
            <span className="font-bold text-lg">Kickstarter</span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="ghost">Discover</Button>
            <Button variant="ghost">Start a project</Button>
            <Button variant="outline">Login</Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Left Column - Image */}
          <div className="md:col-span-8">
            <div className="relative aspect-video rounded-lg overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
              <div className="text-center space-y-4">
                <div className="relative h-64 w-64 mx-auto">
                  <Image
                    src="/placeholder.svg?height=256&width=256"
                    alt="Rezum Mobile App"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 max-w-md mx-auto">
                  <h3 className="font-bold text-lg">Rezum Mobile App</h3>
                  <p className="text-gray-600">Record, Analyze, Summarize</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Project Info */}
          <div className="md:col-span-4 space-y-6">
            <div>
              <h1 className="text-3xl font-bold">Rezum App</h1>
              <p className="mt-2 text-gray-700">
                Transform your conversations into concise summaries with local AI processing, keyword extraction, and
                web dashboard analytics.
              </p>
            </div>

            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-2xl font-bold">€6,343</span>
                  <span className="text-gray-500">pledged of €6,000 goal</span>
                </div>
                <Progress value={105} className="h-2" />
              </div>

              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-gray-500" />
                <div>
                  <span className="font-bold">33</span>
                  <span className="text-gray-500 ml-1">backers</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-gray-500" />
                <div>
                  <span className="font-bold">37</span>
                  <span className="text-gray-500 ml-1">hours to go</span>
                </div>
              </div>

              <Button className="w-full py-6 text-lg bg-blue-600 hover:bg-blue-700">Back this project</Button>

              <div className="bg-amber-50 border border-amber-200 p-4 rounded-lg">
                <p className="text-sm text-amber-800">
                  <strong>All or nothing.</strong> This project will only be funded if it reaches its goal by Sat, May
                  31, 2025 at 11:44 PM CEST.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Project Navigation */}
      <div className="border-t border-b">
        <div className="container mx-auto px-4">
          <Tabs defaultValue="story" className="w-full">
            <TabsList className="grid grid-cols-4 max-w-md">
              <TabsTrigger value="story">Story</TabsTrigger>
              <TabsTrigger value="faq">FAQ</TabsTrigger>
              <TabsTrigger value="updates">Updates</TabsTrigger>
              <TabsTrigger value="comments">Comments</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Main Content */}
          <div className="md:col-span-8 space-y-12">
            <section className="space-y-6">
              <h2 className="text-2xl font-bold">The Story</h2>
              <div className="prose max-w-none">
                <p>
                  Rezum is a revolutionary mobile application designed to transform how we capture and analyze
                  conversations. Using cutting-edge local AI processing, Rezum records your meetings, interviews, and
                  important discussions, then automatically generates concise summaries and extracts key insights—all
                  while keeping your data completely private.
                </p>

                <h3>Overview</h3>
                <p>
                  In today's fast-paced world, we're constantly in meetings, interviews, and important conversations.
                  Rezum streamlines this process by providing intelligent conversation analysis that runs entirely on
                  your device. No cloud processing, no privacy concerns—just powerful AI that helps you capture and
                  understand what matters most.
                </p>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-bold">Key Features</h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-blue-100 p-3 rounded-lg">
                        <Mic className="h-6 w-6 text-blue-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">Smart Recording</h3>
                        <p className="text-gray-600 mt-2">
                          High-quality audio recording with advanced noise cancellation. Easily capture conversations,
                          meetings, and interviews with crystal-clear quality.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-purple-100 p-3 rounded-lg">
                        <Brain className="h-6 w-6 text-purple-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">Local AI Processing</h3>
                        <p className="text-gray-600 mt-2">
                          Powerful AI model runs entirely on your device. Generate automatic summaries and extract key
                          insights without sending data to external servers.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-green-100 p-3 rounded-lg">
                        <BarChart3 className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">Keyword Extraction</h3>
                        <p className="text-gray-600 mt-2">
                          Automatically identify and extract important keywords and topics from your conversations.
                          Never miss crucial information again.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-amber-100 p-3 rounded-lg">
                        <Smartphone className="h-6 w-6 text-amber-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">Web Dashboard</h3>
                        <p className="text-gray-600 mt-2">
                          Access your complete conversation history through our intuitive web dashboard. View summaries,
                          search keywords, and analyze patterns over time.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-red-100 p-3 rounded-lg">
                        <Shield className="h-6 w-6 text-red-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">Privacy First</h3>
                        <p className="text-gray-600 mt-2">
                          End-to-end encryption and local processing ensure your conversations remain completely
                          private. Your data never leaves your device without your permission.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="bg-teal-100 p-3 rounded-lg">
                        <Zap className="h-6 w-6 text-teal-600" />
                      </div>
                      <div>
                        <h3 className="font-bold text-lg">Energy Efficient</h3>
                        <p className="text-gray-600 mt-2">
                          Optimized for extended recording sessions without draining your battery. Smart power
                          management keeps you recording longer.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-bold">How It Works</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center space-y-4">
                  <div className="bg-blue-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto">
                    <Mic className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-lg">Record</h3>
                  <p className="text-gray-600">
                    Use our mobile app to record your conversations or import existing audio files.
                  </p>
                </div>

                <div className="text-center space-y-4">
                  <div className="bg-blue-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto">
                    <Brain className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-lg">Analyze</h3>
                  <p className="text-gray-600">
                    Our local AI automatically analyzes the content to generate summaries and extract keywords.
                  </p>
                </div>

                <div className="text-center space-y-4">
                  <div className="bg-blue-100 h-16 w-16 rounded-full flex items-center justify-center mx-auto">
                    <BarChart3 className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="font-bold text-lg">Review</h3>
                  <p className="text-gray-600">
                    Access insights through your web dashboard and make informed decisions based on conversation data.
                  </p>
                </div>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-bold">Mobile Application</h2>
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold">Rezum Smart Recording App</h3>
                    <p className="text-gray-700">
                      Download our mobile application for seamless conversation recording and analysis on the go.
                    </p>

                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span className="text-sm">Advanced noise cancellation for crystal clear audio</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span className="text-sm">Automatic cloud synchronization with your dashboard</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span className="text-sm">Energy-efficient recording for extended sessions</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                        <span className="text-sm">End-to-end encryption for maximum privacy</span>
                      </div>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <Button className="bg-black text-white hover:bg-gray-800">
                        <Image
                          src="/placeholder.svg?height=20&width=20"
                          alt="App Store"
                          width={20}
                          height={20}
                          className="mr-2"
                        />
                        App Store
                      </Button>
                      <Button className="bg-black text-white hover:bg-gray-800">
                        <Image
                          src="/placeholder.svg?height=20&width=20"
                          alt="Google Play"
                          width={20}
                          height={20}
                          className="mr-2"
                        />
                        Google Play
                      </Button>
                    </div>
                  </div>

                  <div className="relative h-96 flex items-center justify-center">
                    <Image
                      src="/placeholder.svg?height=400&width=250"
                      alt="Rezum Mobile App Interface"
                      width={250}
                      height={400}
                      className="object-contain"
                    />
                  </div>
                </div>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-bold">What Our Users Say</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <p className="italic">
                        "Rezum has completely transformed the way we document our meetings. We save hours each week
                        thanks to automatic summaries."
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="relative h-12 w-12 rounded-full overflow-hidden">
                          <Image
                            src="/placeholder.svg?height=48&width=48"
                            alt="Sophie Martin"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-bold">Sophie Martin</p>
                          <p className="text-sm text-gray-600">Marketing Director, TechCorp</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="pt-6">
                    <div className="space-y-4">
                      <p className="italic">
                        "Keyword extraction helps us quickly identify important topics in our customer calls. An
                        indispensable tool for our sales team."
                      </p>
                      <div className="flex items-center gap-3">
                        <div className="relative h-12 w-12 rounded-full overflow-hidden">
                          <Image
                            src="/placeholder.svg?height=48&width=48"
                            alt="Thomas Dubois"
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-bold">Thomas Dubois</p>
                          <p className="text-sm text-gray-600">VP Sales, Innovate Inc.</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-bold">Our Team</h2>
              <div className="prose max-w-none">
                <p>
                  The idea for Rezum was born from the collaborative vision of Oscar FRANK, Younès BOUFRIOUA, and
                  Théotime SCHMELTZ—a small yet experienced team of developers with several years of app development
                  expertise. Together, we identified a critical gap in conversation management and analysis technology.
                </p>

                <h3>The Origin of the Idea</h3>
                <p>
                  During our professional careers, we found ourselves constantly in meetings, interviews, and important
                  conversations, but struggled to effectively capture and analyze the key insights from these
                  interactions. We realized that while recording technology existed, there was no seamless way to
                  transform these recordings into actionable insights while maintaining complete privacy. This challenge
                  inspired us to create Rezum—a solution that brings AI-powered conversation analysis directly to your
                  device.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
                <div className="flex flex-col items-center text-center">
                  <div className="relative h-32 w-32 rounded-full overflow-hidden mb-4">
                    <Image
                      src="/placeholder.svg?height=128&width=128"
                      alt="Oscar FRANK"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="font-bold text-lg">Oscar FRANK</h3>
                  <p className="text-gray-600">Co-Founder & CEO</p>
                </div>

                <div className="flex flex-col items-center text-center">
                  <div className="relative h-32 w-32 rounded-full overflow-hidden mb-4">
                    <Image
                      src="/placeholder.svg?height=128&width=128"
                      alt="Younès BOUFRIOUA"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="font-bold text-lg">Younès BOUFRIOUA</h3>
                  <p className="text-gray-600">Co-Founder & CTO</p>
                </div>

                <div className="flex flex-col items-center text-center">
                  <div className="relative h-32 w-32 rounded-full overflow-hidden mb-4">
                    <Image
                      src="/placeholder.svg?height=128&width=128"
                      alt="Théotime SCHMELTZ"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="font-bold text-lg">Théotime SCHMELTZ</h3>
                  <p className="text-gray-600">Co-Founder & Lead Developer</p>
                </div>
              </div>
            </section>

            <section className="space-y-6">
              <h2 className="text-2xl font-bold">Conclusion</h2>
              <div className="prose max-w-none">
                <p>
                  Rezum stands out as the ultimate solution for conversation analysis and management. By combining local
                  AI processing with intuitive design, we're creating a tool that respects your privacy while delivering
                  powerful insights. With our dedicated team led by Oscar FRANK, Younès BOUFRIOUA, and Théotime
                  SCHMELTZ, backed by years of app development expertise, we are committed to bringing this innovative
                  tool to market and transforming how people capture and analyze conversations.
                </p>

                <h3>Contact and Kickstarter Support</h3>
                <p>
                  We invite all interested supporters to join our Kickstarter campaign and help make Rezum a reality.
                  Your support will not only revolutionize conversation management but also enable you to be part of a
                  community that believes in the power of privacy-first AI technology. Thank you for joining us on this
                  exciting journey toward the future of conversation intelligence!
                </p>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="md:col-span-4 space-y-6">
            <div className="sticky top-6">
              <Card>
                <CardContent className="pt-6 space-y-6">
                  <h3 className="text-xl font-bold">Support this project</h3>

                  <div className="space-y-4">
                    <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                      <div className="flex justify-between">
                        <span className="font-bold">€25</span>
                        <Badge>Early Bird</Badge>
                      </div>
                      <h4 className="font-medium mt-2">Basic Access</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Get 6 months of Rezum Basic subscription when we launch. Includes mobile app and basic dashboard
                        access.
                      </p>
                      <div className="text-sm text-gray-500 mt-4">
                        <p>Estimated delivery: October 2025</p>
                        <p>12 backers</p>
                      </div>
                    </div>

                    <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                      <div className="flex justify-between">
                        <span className="font-bold">€50</span>
                        <Badge>Popular</Badge>
                      </div>
                      <h4 className="font-medium mt-2">Premium Access</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Get 12 months of Rezum Premium with unlimited recordings, advanced analytics, and priority
                        support.
                      </p>
                      <div className="text-sm text-gray-500 mt-4">
                        <p>Estimated delivery: October 2025</p>
                        <p>18 backers</p>
                      </div>
                    </div>

                    <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer transition-colors">
                      <div className="flex justify-between">
                        <span className="font-bold">€100</span>
                      </div>
                      <h4 className="font-medium mt-2">Lifetime Access</h4>
                      <p className="text-sm text-gray-600 mt-1">
                        Get lifetime access to Rezum Premium with all future updates and features.
                      </p>
                      <div className="text-sm text-gray-500 mt-4">
                        <p>Estimated delivery: October 2025</p>
                        <p>3 backers</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-100 py-12 mt-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="font-bold text-lg mb-4">Rezum</h3>
              <p className="text-gray-600">
                Transform your conversations into actionable insights with privacy-first AI.
              </p>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">About</h3>
              <ul className="space-y-2 text-gray-600">
                <li>Our Story</li>
                <li>Team</li>
                <li>Careers</li>
                <li>Press</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Support</h3>
              <ul className="space-y-2 text-gray-600">
                <li>FAQ</li>
                <li>Contact Us</li>
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Connect</h3>
              <ul className="space-y-2 text-gray-600">
                <li>Twitter</li>
                <li>Facebook</li>
                <li>Instagram</li>
                <li>LinkedIn</li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 text-center text-gray-500">
            <p>© 2025 Rezum. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
