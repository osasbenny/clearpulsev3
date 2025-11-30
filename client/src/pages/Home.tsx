import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Shield,
  Smartphone,
  Eye,
  HeadphonesIcon,
  ArrowRight,
  CheckCircle2,
  CreditCard,
  Send,
  FileText,
  Clock,
} from "lucide-react";
import { getLoginUrl } from "@/const";

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/">
              <a className="flex items-center gap-3">
                <img src="/logo.png" alt="ClearPulse" className="h-10 w-10" />
                <span className="text-2xl font-bold text-gray-900">ClearPulse</span>
              </a>
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <Link href="/about"><a className="text-gray-600 hover:text-blue-600 transition-colors">About</a></Link>
              <Link href="/faq"><a className="text-gray-600 hover:text-blue-600 transition-colors">FAQ</a></Link>
              <Link href="/contact"><a className="text-gray-600 hover:text-blue-600 transition-colors">Contact</a></Link>
              <a href={getLoginUrl()} className="text-gray-600 hover:text-blue-600 transition-colors">Sign in</a>
              <Button asChild>
                <a href={getLoginUrl()}>Go to Dashboard</a>
              </Button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-blue-50 py-20 md:py-32 overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                Banking Made <span className="text-blue-600">Simple</span> and{" "}
                <span className="text-blue-600">Secure</span>
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Experience modern banking with ClearPulse. Manage your finances, transfer money globally,
                and access loans with just a few clicks.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" asChild className="text-lg px-8">
                  <a href={getLoginUrl()}>
                    Open an Account <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
                <Button size="lg" variant="outline" asChild className="text-lg px-8">
                  <Link href="/about">Learn More</Link>
                </Button>
              </div>
            </div>
            <div className="relative">
              <img
                src="/images/hero-banking.jpg"
                alt="Modern Banking"
                className="rounded-2xl shadow-2xl w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Banking That Works for You</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Discover why thousands of customers trust ClearPulse for their personal banking needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Shield className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Top-Notch Security</h3>
                <p className="text-gray-600 mb-4 font-semibold">"Bank with confidence, knowing your money is safe."</p>
                <p className="text-gray-600 text-sm">
                  Your money and data are protected with industry-leading encryption and fraud detection systems.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Smartphone className="h-8 w-8 text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Convenience at Your Fingertips</h3>
                <p className="text-gray-600 mb-4 font-semibold">"Access your funds whenever you need them."</p>
                <p className="text-gray-600 text-sm">
                  Manage your accounts anytime, anywhere, with our user-friendly online and mobile banking platforms.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Eye className="h-8 w-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Transparent Banking</h3>
                <p className="text-gray-600 mb-4 font-semibold">"What you see is what you get."</p>
                <p className="text-gray-600 text-sm">
                  No hidden fees, no surprises—just clear and honest banking with complete visibility.
                </p>
              </CardContent>
            </Card>

            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
                  <HeadphonesIcon className="h-8 w-8 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold mb-3">Personal Support</h3>
                <p className="text-gray-600 mb-4 font-semibold">"We're here to help you every step of the way."</p>
                <p className="text-gray-600 text-sm">
                  Our dedicated customer support team is here for you 24/7, providing tailored solutions.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Banking Made Easy with ClearPulse</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We provide a suite of services to simplify your financial life and meet your everyday banking needs.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <Smartphone className="h-12 w-12 text-blue-600 mb-6" />
              <h3 className="text-2xl font-bold mb-4">Online Banking</h3>
              <p className="text-gray-600 mb-6">
                Access your accounts anytime, anywhere. Monitor balances, transfer funds, and pay bills securely from any device.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-gray-600">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Convenient 24/7 access to your accounts</span>
                </li>
                <li className="flex items-start gap-2 text-gray-600">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Easy bill payments and fund transfers</span>
                </li>
                <li className="flex items-start gap-2 text-gray-600">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Secure and user-friendly interface</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <CreditCard className="h-12 w-12 text-blue-600 mb-6" />
              <h3 className="text-2xl font-bold mb-4">Debit and Credit Cards</h3>
              <p className="text-gray-600 mb-6">
                Shop, dine, and pay seamlessly with ClearPulse's debit and credit cards. Enjoy financial flexibility and exclusive rewards.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-gray-600">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Secure transactions worldwide</span>
                </li>
                <li className="flex items-start gap-2 text-gray-600">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Contactless payment options for faster checkouts</span>
                </li>
                <li className="flex items-start gap-2 text-gray-600">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Exclusive cashback and rewards on every spend</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <Send className="h-12 w-12 text-blue-600 mb-6" />
              <h3 className="text-2xl font-bold mb-4">Fund Transfers</h3>
              <p className="text-gray-600 mb-6">
                Move your money easily across accounts, whether it's within ClearPulse Bank or to other banks, locally or internationally.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-gray-600">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Real-time transfers for ClearPulse accounts</span>
                </li>
                <li className="flex items-start gap-2 text-gray-600">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Secure interbank and international transfers</span>
                </li>
                <li className="flex items-start gap-2 text-gray-600">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Intuitive tracking and notifications</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <FileText className="h-12 w-12 text-blue-600 mb-6" />
              <h3 className="text-2xl font-bold mb-4">Account Statements</h3>
              <p className="text-gray-600 mb-6">
                Keep track of your financial activity with detailed account statements available online or on demand.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-gray-600">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Monthly digital statements sent to your email</span>
                </li>
                <li className="flex items-start gap-2 text-gray-600">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Comprehensive transaction history for better budgeting</span>
                </li>
                <li className="flex items-start gap-2 text-gray-600">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Easy downloads for record-keeping</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <Clock className="h-12 w-12 text-blue-600 mb-6" />
              <h3 className="text-2xl font-bold mb-4">24/7 Customer Support</h3>
              <p className="text-gray-600 mb-6">
                Our dedicated support team is here to help with any queries or issues, anytime you need assistance.
              </p>
              <ul className="space-y-2">
                <li className="flex items-start gap-2 text-gray-600">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Round-the-clock service via chat, phone, or email</span>
                </li>
                <li className="flex items-start gap-2 text-gray-600">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Quick resolutions for any banking concerns</span>
                </li>
                <li className="flex items-start gap-2 text-gray-600">
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span>Personalized assistance tailored to your needs</span>
                </li>
              </ul>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <img src="/images/fintech-app.jpg" alt="Modern Banking App" className="w-full h-48 object-cover rounded-lg mb-6" />
              <h3 className="text-2xl font-bold mb-4">Modern Technology</h3>
              <p className="text-gray-600">
                Experience banking powered by cutting-edge technology designed to make your financial life easier and more secure.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who trust ClearPulse for their banking needs.
            Open your account today and experience the future of banking.
          </p>
          <Button size="lg" variant="secondary" asChild className="text-lg px-8">
            <a href={getLoginUrl()}>
              Open an Account Now <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-300 py-12">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <img src="/logo.png" alt="ClearPulse" className="h-8 w-8" />
                <span className="text-xl font-bold text-white">ClearPulse</span>
              </div>
              <p className="text-sm">Your trusted partner in managing finances.</p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/about"><a className="hover:text-white transition-colors">About Us</a></Link></li>
                <li><Link href="/contact"><a className="hover:text-white transition-colors">Contact</a></Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Support</h4>
              <ul className="space-y-2 text-sm">
                <li><Link href="/faq"><a className="hover:text-white transition-colors">FAQ</a></Link></li>
                <li><Link href="/support"><a className="hover:text-white transition-colors">Help Center</a></Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-4">Legal</h4>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-sm">
            <p>&copy; 2024 ClearPulse Bank. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
