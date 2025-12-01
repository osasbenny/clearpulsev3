import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowLeft, Shield, Users, Award, TrendingUp } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <nav className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/">
            <a className="flex items-center gap-2">
              <img src="/logo.png" alt="ClearPulse" className="h-10 w-10" />
              <span className="text-2xl font-bold text-[#301CA0]">ClearPulse</span>
            </a>
          </Link>
                    <div className="hidden md:flex items-center gap-8">
            <Link href="/"><a className="text-gray-700 hover:text-[#7132CA] transition-colors">Home</a></Link>
            <Link href="/about"><a className="text-gray-700 hover:text-[#7132CA] transition-colors">About</a></Link>
            <Link href="/faq"><a className="text-gray-700 hover:text-[#7132CA] transition-colors">FAQ</a></Link>
            <Link href="/contact"><a className="text-gray-700 hover:text-[#7132CA] transition-colors">Contact</a></Link>
            <a href="https://dashboard.clearpulsaro.com/" className="text-gray-700 hover:text-[#7132CA] transition-colors">Sign in</a>
            <a href="https://dashboard.clearpulsaro.com/">
              <Button className="bg-[#7132CA] hover:bg-[#301CA0] text-white rounded-full px-6">
                E-Banking
              </Button>
            </a>
          </div>
        </div>
      </nav>
      <section className="bg-gradient-to-r from-[#7132CA] to-[#C47BE4] text-white py-20">
        <div className="container mx-auto px-4">
          <Link href="/">
            <Button variant="ghost" className="text-white hover:bg-white/20 mb-8">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Button>
          </Link>
          <h1 className="text-5xl font-bold mb-4">About ClearPulse</h1>
          <p className="text-xl text-white/90 max-w-3xl">Empowering individuals and businesses with innovative banking solutions since 2000</p>
        </div>
      </section>
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-[#301CA0] mb-6">Our Mission</h2>
              <p className="text-gray-600 text-lg mb-4 leading-relaxed">At ClearPulse, we believe banking should be simple, transparent, and accessible to everyone. Our mission is to provide cutting-edge financial services that empower our customers to achieve their financial goals with confidence.</p>
              <p className="text-gray-600 text-lg leading-relaxed">We combine the latest technology with personalized service to deliver a banking experience that puts you first.</p>
            </div>
            <div><img src="/images/team-meeting.jpg" alt="Our Team" className="rounded-2xl shadow-2xl" /></div>
          </div>
        </div>
      </section>
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#301CA0] mb-4">Our Core Values</h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">These principles guide everything we do</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            <Card className="border-none shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-[#7132CA] rounded-full flex items-center justify-center mx-auto mb-6"><Shield className="h-8 w-8 text-white" /></div>
                <h3 className="text-xl font-bold text-[#301CA0] mb-3">Security First</h3>
                <p className="text-gray-600">Your financial security is our top priority.</p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-[#C47BE4] rounded-full flex items-center justify-center mx-auto mb-6"><Users className="h-8 w-8 text-white" /></div>
                <h3 className="text-xl font-bold text-[#301CA0] mb-3">Customer Focused</h3>
                <p className="text-gray-600">We listen to our customers and continuously improve.</p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-[#7132CA] rounded-full flex items-center justify-center mx-auto mb-6"><Award className="h-8 w-8 text-white" /></div>
                <h3 className="text-xl font-bold text-[#301CA0] mb-3">Excellence</h3>
                <p className="text-gray-600">We strive for excellence in every interaction.</p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-[#C47BE4] rounded-full flex items-center justify-center mx-auto mb-6"><TrendingUp className="h-8 w-8 text-white" /></div>
                <h3 className="text-xl font-bold text-[#301CA0] mb-3">Innovation</h3>
                <p className="text-gray-600">We embrace technology and innovation.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
      <footer className="bg-[#301CA0] text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src="/logo.png" alt="ClearPulse" className="h-10 w-10" />
                <span className="text-xl font-bold">ClearPulse</span>
              </div>
              <p className="text-gray-400 text-sm">Smart, simple, secure banking</p>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-[#C47BE4]">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/"><a className="text-gray-400 hover:text-white">Home</a></Link></li>
                <li><Link href="/about"><a className="text-gray-400 hover:text-white">About</a></Link></li>
                <li><Link href="/contact"><a className="text-gray-400 hover:text-white">Contact</a></Link></li>
                <li><Link href="/faq"><a className="text-gray-400 hover:text-white">FAQ</a></Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-[#C47BE4]">Services</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-400 hover:text-white">Personal Banking</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Business Banking</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Loans</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white">Cards</a></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-[#C47BE4]">Contact Us</h3>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>789 Enterprise Way, Floor 2</li>
                <li>NY, New York, 10016</li>
                <li>United States</li>
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
