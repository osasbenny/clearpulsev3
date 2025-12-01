import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Smartphone, FileText, HeadphonesIcon, ArrowRight, CheckCircle2, Zap } from "lucide-react";
import MainNavigation from "@/components/MainNavigation";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <MainNavigation />

      {/* Hero Section */}
      <section className="bg-[#301CA0] relative overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#7132CA] rounded-full opacity-10 transform translate-x-1/2 -translate-y-1/2"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#7132CA] rounded-full opacity-10 transform -translate-x-1/2 translate-y-1/2"></div>
        <div className="absolute top-1/2 right-1/4 w-32 h-32 border-4 border-[#7132CA] rounded-full opacity-20"></div>
        
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <p className="text-[#7132CA] font-semibold mb-4 tracking-wider uppercase text-sm">ClearPulse Banking</p>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                Bank With Confidence,<br />
                Harvest The Rewards
              </h1>
              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                Mutual fund from ClearPulse Asset Management that invests in Greek and international 
                corporate bonds in dollars, euros and pounds.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 items-start">
                <a href="https://dashboard.clearpulsaro.com/dashboard">
                  <Button className="bg-[#7132CA] hover:bg-[#301CA0] text-white rounded-full px-8 py-6 text-lg">
                    Open An Account Now <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </a>
                <div className="flex items-center gap-3 text-white">
                  <div className="w-12 h-12 rounded-full bg-[#7132CA]/20 flex items-center justify-center">
                    <HeadphonesIcon className="h-6 w-6 text-[#7132CA]" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Need help?</p>
                    <p className="font-semibold text-lg">+1 (313) 307-9393</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -top-8 -right-8 w-64 h-64 bg-[#7132CA] rounded-3xl transform rotate-12"></div>
              <img 
                src="/images/team-meeting.jpg" 
                alt="Banking Team" 
                className="relative z-10 rounded-3xl shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Experience Badge Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <img 
                  src="/images/team-collaboration.jpg" 
                  alt="Team Collaboration" 
                  className="rounded-2xl shadow-lg"
                />
                <img 
                  src="/images/diverse-team.jpg" 
                  alt="Diverse Team" 
                  className="rounded-2xl shadow-lg mt-8"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 bg-[#7132CA] text-white p-8 rounded-2xl shadow-xl">
                <div className="text-5xl font-bold">25</div>
                <div className="text-sm">Years Of<br />experience</div>
              </div>
            </div>
            <div>
              <p className="text-[#7132CA] font-semibold mb-4 tracking-wider uppercase text-sm">Banking With Ease</p>
              <h2 className="text-4xl font-bold text-[#301CA0] mb-6">
                Make your online transactions safely
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Find out what to look out for when transacting online and how we keep you safe. Find 
                practical tips and guidelines for safe trading.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-[#7132CA] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-[#301CA0] mb-1">Online FX Conversion</h3>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-[#7132CA] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-[#301CA0] mb-1">Shipments and Shipments</h3>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-[#7132CA] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-[#301CA0] mb-1">Bulk Payments</h3>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-[#7132CA] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-[#301CA0] mb-1">Privacy & Security Guaranteed</h3>
                  </div>
                </div>
              </div>
              <Link href="/about">
                <Button className="bg-[#7132CA] hover:bg-[#301CA0] text-white rounded-full px-8">
                  Visit Us Today
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-[#7132CA] font-semibold mb-4 tracking-wider uppercase text-sm">Bank With Us</p>
            <h2 className="text-4xl font-bold text-[#301CA0] mb-4">
              For convenience in the digital age
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-[#7132CA] rounded-xl flex items-center justify-center mb-6">
                  <Smartphone className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#301CA0] mb-3">
                  Come to ClearPulse
                </h3>
                <p className="text-gray-600 mb-6">
                  Open your first account at ClearPulse, and get a debit card and e-Banking 
                  codes from your mobile.
                </p>
                  <img 
                    src="/images/modern-bank.jpg" 
                    alt="Banking Professionals" 
                    className="rounded-xl w-full"
                  />
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-[#7132CA] rounded-xl flex items-center justify-center mb-6">
                  <Smartphone className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#301CA0] mb-3">
                  Log in to ClearPulse Web
                </h3>
                <p className="text-gray-600 mb-6">
                  Get full control of your transactions and banking products, at ClearPulse 
                  and other banks, from your computer.
                </p>
                  <img 
                    src="/images/fintech-app.jpg" 
                    alt="Web Banking" 
                    className="rounded-xl w-full"
                  />
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-[#7132CA] rounded-xl flex items-center justify-center mb-6">
                  <Shield className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#301CA0] mb-3">
                  Get ClearPulse Loan
                </h3>
                <p className="text-gray-600 mb-6">
                  Secure a consumer loan of up to $10,000 online. Apply from your mobile or 
                  computer, on the first day.
                </p>
                  <img 
                    src="/images/hero-banking.jpg" 
                    alt="Loan Services" 
                    className="rounded-xl w-full"
                  />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Business Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[#7132CA] font-semibold mb-4 tracking-wider uppercase text-sm">Our Work Process</p>
              <h2 className="text-4xl font-bold text-[#301CA0] mb-8">
                It's a pleasure doing business with you
              </h2>
              
              <div className="space-y-8">
                <div className="flex gap-4">
                  <div className="w-16 h-16 bg-[#7132CA] rounded-xl flex items-center justify-center flex-shrink-0">
                    <Shield className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#301CA0] mb-2">Banking Services</h3>
                    <p className="text-gray-600">
                      ClearPulse has a great range of products to offer you complete banking services. 
                      So ditch your old bank and switch to ClearPulse today.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-16 h-16 bg-[#7132CA] rounded-xl flex items-center justify-center flex-shrink-0">
                    <Zap className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#301CA0] mb-2">Business Transaction Accounts</h3>
                    <p className="text-gray-600">
                      We offer easy to use accounts that are designed exclusively to meet your business needs.
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="w-16 h-16 bg-[#7132CA] rounded-xl flex items-center justify-center flex-shrink-0">
                    <FileText className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-[#301CA0] mb-2">Cash Management Account</h3>
                    <p className="text-gray-600">
                      Want the flexibility of an everyday account with the interest of a term deposit? 
                      The Cash Management Account is for you!
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <img 
                src="/images/team-meeting.jpg" 
                alt="Business Banking" 
                className="rounded-3xl shadow-2xl"
              />
              <div className="absolute -bottom-8 -right-8 bg-[#7132CA] text-white p-8 rounded-2xl shadow-xl border-4 border-dashed border-white">
                <div className="text-center">
                  <div className="text-4xl font-bold">Over 500k</div>
                  <div className="text-sm mt-2">Active<br />Customers</div>
                </div>
              </div>
              <div className="absolute top-1/2 -right-12 bg-white p-6 rounded-xl shadow-lg">
                <div className="text-center">
                  <div className="text-3xl font-bold text-[#301CA0]">38k+</div>
                  <div className="text-sm text-gray-600 mt-1">Business Accounts</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-[#7132CA] to-[#C47BE4]">
        <div className="container mx-auto px-4 text-center text-white">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 text-white/90 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust ClearPulse for their banking needs. 
            Open your account today and experience the future of banking.
          </p>
          <Link href="/dashboard">
            <Button className="bg-white text-[#7132CA] hover:bg-gray-100 rounded-full px-8 py-6 text-lg font-semibold">
              Open an Account Now <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#301CA0] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src="/logo.png" alt="ClearPulse" className="h-10 w-10" />
                <span className="text-xl font-bold">ClearPulse</span>
              </div>
              <p className="text-gray-400 text-sm">
                Smart, simple, secure banking—at your fingertips
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-[#7132CA]">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/"><a className="text-gray-400 hover:text-white transition-colors">Home</a></Link></li>
                <li><Link href="/about"><a className="text-gray-400 hover:text-white transition-colors">About</a></Link></li>
                <li><Link href="/contact"><a className="text-gray-400 hover:text-white transition-colors">Contact</a></Link></li>
                <li><Link href="/faq"><a className="text-gray-400 hover:text-white transition-colors">FAQ</a></Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-[#7132CA]">Services</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Personal Banking</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Business Banking</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Loans</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Cards</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-[#7132CA]">Contact Us</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>789 Enterprise Way, Floor 2</li>
                <li>NY, New York, 10016</li>
                <li>Phone: +1 (313) 307-9393</li>
                <li>Email: info@clearpulsaro.com</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
            <p>© ClearPulse 2025 | All Rights Reserved</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
