import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Smartphone, FileText, HeadphonesIcon, ArrowRight, CheckCircle2, Zap, DollarSign, Users, Award, TrendingUp, ChevronDown, ChevronUp } from "lucide-react";
import MainNavigation from "@/components/MainNavigation";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <MainNavigation />

      {/* Hero Section - Page 1 of PDF */}
      <section className="bg-[#301CA0] relative overflow-hidden">
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <p className="text-[#7132CA] font-semibold mb-4 tracking-wider uppercase text-sm">CLEARPULSE BANK</p>
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
                    Open An Account Now
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
              <img 
                src="/images/team-meeting.jpg" 
                alt="Banking Team" 
                className="relative z-10 rounded-3xl shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Experience Badge Section - Page 1 of PDF */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <img 
                src="/images/team-collaboration.jpg" 
                alt="Team Collaboration" 
                className="rounded-2xl shadow-2xl w-full"
              />
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-[#7132CA] text-white p-8 rounded-2xl shadow-xl w-48 h-48 flex flex-col items-center justify-center">
                <div className="text-5xl font-bold">25</div>
                <div className="text-sm">Years Of<br />experience</div>
              </div>
            </div>
            <div>
              <p className="text-[#7132CA] font-semibold mb-4 tracking-wider uppercase text-sm">BANKING WITH EASE</p>
              <h2 className="text-4xl font-bold text-[#301CA0] mb-6">
                Make your online transactions safely
              </h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                Find out what to look out for when transacting online and how we keep you safe. Find 
                practical tips and guidelines for safe trading.
              </p>
              <div className="grid grid-cols-2 gap-4 mb-8">
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-[#7132CA] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-[#301CA0] mb-1">ONLINE FX CONVERSION</h3>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-[#7132CA] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-[#301CA0] mb-1">BULK PAYMENTS</h3>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-[#7132CA] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-[#301CA0] mb-1">SHIPMENTS AND SHIPMENTS</h3>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 className="h-6 w-6 text-[#7132CA] flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-[#301CA0] mb-1">PRIVACY & SECURITY GUARANTEED</h3>
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

      {/* Services Section - Page 2 of PDF */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <p className="text-[#7132CA] font-semibold mb-4 tracking-wider uppercase text-sm">BANK WITH US</p>
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
                  Come to ClearPulse Bank
                </h3>
                <p className="text-gray-600 mb-6">
                  Open your first account at ClearPulse Bank, and get a debit card and e-Banking 
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
                  Log in to ClearPulse Bank Web
                </h3>
                <p className="text-gray-600 mb-6">
                  Get full control of your transactions and banking products, at ClearPulse Bank 
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
                  Get ClearPulse Bank Loan
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

      {/* Work Process Section - Page 2 of PDF */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-[#7132CA] font-semibold mb-4 tracking-wider uppercase text-sm">OUR WORK PROCESS</p>
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
                      ClearPulse Bank has a great range of products to offer you complete banking services. 
                      So ditch your old bank and switch to ClearPulse Bank today.
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
                alt="Business Meeting" 
                className="rounded-2xl shadow-2xl w-full"
              />
              <div className="absolute bottom-4 right-4 bg-[#7132CA] text-white p-4 rounded-2xl shadow-xl">
                <div className="text-2xl font-bold">500k+</div>
                <div className="text-sm">Active Customers</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ask Anything Section - Page 2 & 3 of PDF */}
      <section className="bg-[#301CA0] py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <p className="text-[#7132CA] font-semibold mb-4 tracking-wider uppercase text-sm">ASK ANYTHING</p>
              <h2 className="text-4xl font-bold mb-6">
                You can contact us for any question
              </h2>
              <p className="text-gray-300 text-lg mb-8 leading-relaxed">
                Open a new account. You can call us on to do this for you, or get 
                started now. Alternatively you can visit us at any branch.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white text-[#301CA0] p-4 rounded-xl flex items-center gap-3">
                  <DollarSign className="h-6 w-6" />
                  <div>
                    <div className="text-2xl font-bold">17</div>
                    <div className="text-sm">Banking Awards</div>
                  </div>
                </div>
                <div className="bg-white text-[#301CA0] p-4 rounded-xl flex items-center gap-3">
                  <Users className="h-6 w-6" />
                  <div>
                    <div className="text-2xl font-bold">353+</div>
                    <div className="text-sm">Physical Branches</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-2xl">
              <h3 className="text-xl font-bold text-[#301CA0] mb-4">WE SUGGEST YOU:</h3>
              <p className="text-gray-600 mb-6">
                Modernize your business and prepare for the transition to the new digital age. 
                Focus on productive uses of finance investments in electronic systems 
                that contribute to the digital transformation of your business.
              </p>
              <div className="space-y-4">
                <div className="border-b pb-2">
                  <div className="flex justify-between items-center cursor-pointer">
                    <span className="font-semibold text-[#301CA0]">Digital Transformation</span>
                    <ChevronDown className="h-5 w-5 text-[#7132CA]" />
                  </div>
                </div>
                <div className="border-b pb-2">
                  <div className="flex justify-between items-center cursor-pointer">
                    <span className="font-semibold text-[#301CA0]">Extroversion</span>
                    <ChevronDown className="h-5 w-5 text-[#7132CA]" />
                  </div>
                </div>
                <div className="border-b pb-2">
                  <div className="flex justify-between items-center cursor-pointer">
                    <span className="font-semibold text-[#301CA0]">Innovation, research and development</span>
                    <ChevronDown className="h-5 w-5 text-[#7132CA]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Page 3 of PDF */}
      <footer className="bg-[#1e1464] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src="/logo.png" alt="ClearPulse" className="h-10 w-10" />
                <span className="text-xl font-bold">ClearPulse Bank</span>
              </div>
              <p className="text-gray-400 text-sm">
                At ClearPulse, we believe banking should be simple, transparent, and accessible to everyone. Our mission 
                is to provide cutting-edge financial services that empower our customers to achieve their financial goals 
                with confidence.
              </p>
              <div className="flex gap-4 mt-4">
                {/* Placeholder for social icons */}
                <a href="#" className="text-gray-400 hover:text-white"><Users className="h-5 w-5" /></a>
                <a href="#" className="text-gray-400 hover:text-white"><Award className="h-5 w-5" /></a>
                <a href="#" className="text-gray-400 hover:text-white"><TrendingUp className="h-5 w-5" /></a>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-[#7132CA]">Quick links</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/"><a className="text-gray-400 hover:text-white">Home</a></Link></li>
                <li><Link href="/contact"><a className="text-gray-400 hover:text-white">Contact</a></Link></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Personal Account</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Corporate Account</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-[#7132CA]">Contact us</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>789 Enterprise Way, Floor 2</li>
                <li>NY, New York, 10016</li>
                <li>United States</li>
                <li className="mt-4">Phone: +1 (313) 307-9393</li>
                <li>Email: info@clearpulsaro.com</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
            <p>© ClearPulse Bank 2023 | All Rights Reserved</p>
            <div className="flex justify-center gap-4 mt-2">
              <Link href="/"><a className="text-gray-400 hover:text-white">Home</a></Link>
              <Link href="/contact"><a className="text-gray-400 hover:text-white">Contact</a></Link>
              <a href="#" className="text-gray-400 hover:text-white">Personal Account</a>
              <a href="#" className="text-gray-400 hover:text-white">Corporate Account</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
