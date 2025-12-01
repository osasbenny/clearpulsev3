import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Mail, Phone, MapPin } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-gray-50">
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
          <h1 className="text-5xl font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-white/90">We're here to help. Reach out to us anytime!</p>
        </div>
      </section>
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <Card className="border-none shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-[#7132CA] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Phone className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#301CA0] mb-3">Phone</h3>
                <p className="text-gray-600">+1 (313) 307-9393</p>
                <p className="text-sm text-gray-500 mt-2">24/7 Support</p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-[#C47BE4] rounded-full flex items-center justify-center mx-auto mb-6">
                  <Mail className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#301CA0] mb-3">Email</h3>
                <p className="text-gray-600">info@clearpulsaro.com</p>
                <p className="text-sm text-gray-500 mt-2">Response within 24 hours</p>
              </CardContent>
            </Card>
            <Card className="border-none shadow-lg">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-[#7132CA] rounded-full flex items-center justify-center mx-auto mb-6">
                  <MapPin className="h-8 w-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-[#301CA0] mb-3">Office</h3>
                <p className="text-gray-600">789 Enterprise Way, Floor 2</p>
                <p className="text-gray-600">NY, New York, 10016</p>
                <p className="text-gray-600">United States</p>
              </CardContent>
            </Card>
          </div>
          <div className="max-w-3xl mx-auto">
            <Card className="border-none shadow-xl">
              <CardContent className="p-8">
                <h2 className="text-3xl font-bold text-[#301CA0] mb-6">Send us a Message</h2>
                <form className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                      <Input placeholder="John" className="rounded-lg" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                      <Input placeholder="Doe" className="rounded-lg" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                    <Input type="email" placeholder="john.doe@example.com" className="rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Phone</label>
                    <Input type="tel" placeholder="+1 (555) 123-4567" className="rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                    <Input placeholder="How can we help you?" className="rounded-lg" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                    <Textarea placeholder="Tell us more about your inquiry..." className="rounded-lg min-h-[150px]" />
                  </div>
                  <Button className="w-full bg-[#7132CA] hover:bg-[#301CA0] text-white rounded-full py-6 text-lg">
                    Send Message
                  </Button>
                </form>
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
