import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { getLoginUrl } from "@/const";
import { Link } from "wouter";
import {
  Shield,
  Zap,
  Globe,
  CreditCard,
  TrendingUp,
  Lock,
  Phone,
  Mail,
  ArrowRight,
} from "lucide-react";

export default function Home() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation */}
      <nav className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">CP</span>
            </div>
            <span className="text-2xl font-bold text-gray-900">ClearPulse</span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <Link href="/about" className="text-gray-600 hover:text-blue-600 transition-colors">About</Link>
            <Link href="/faq" className="text-gray-600 hover:text-blue-600 transition-colors">FAQ</Link>
            <Link href="/contact" className="text-gray-600 hover:text-blue-600 transition-colors">Contact</Link>
          </div>

          <div className="flex items-center gap-3">
            {isAuthenticated ? (
              <Link href="/dashboard">
                <Button>Go to Dashboard</Button>
              </Link>
            ) : (
              <>
                <a href={getLoginUrl()}>
                  <Button variant="ghost">Sign In</Button>
                </a>
                <a href={getLoginUrl()}>
                  <Button>Get Started</Button>
                </a>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6 leading-tight">
              Banking Made <span className="text-blue-600">Simple</span> and <span className="text-blue-600">Secure</span>
            </h1>
            <p className="text-xl text-gray-600 mb-10 max-w-2xl mx-auto">
              Experience modern banking with ClearPulse. Manage your finances, transfer money globally, and access loans with just a few clicks.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href={getLoginUrl()}>
                <Button size="lg" className="text-lg px-8 py-6">
                  Open an Account <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </a>
              <Link href="/about">
                <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose ClearPulse?</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We provide comprehensive banking services designed for the modern world.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            <Card className="border-2 hover:border-blue-500 transition-colors">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Shield className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Bank-Grade Security</h3>
                <p className="text-gray-600">
                  Your data is protected with industry-leading encryption and multi-factor authentication.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-blue-500 transition-colors">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                  <Zap className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Instant Transfers</h3>
                <p className="text-gray-600">
                  Send and receive money instantly with our fast and reliable transfer system.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-blue-500 transition-colors">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                  <Globe className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Global Reach</h3>
                <p className="text-gray-600">
                  Transfer money internationally to over 150 countries with competitive exchange rates.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-blue-500 transition-colors">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                  <CreditCard className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Virtual Cards</h3>
                <p className="text-gray-600">
                  Get instant virtual debit cards and request physical cards delivered to your door.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-blue-500 transition-colors">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
                  <TrendingUp className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">Personal Loans</h3>
                <p className="text-gray-600">
                  Apply for loans with competitive rates and flexible repayment terms.
                </p>
              </CardContent>
            </Card>

            <Card className="border-2 hover:border-blue-500 transition-colors">
              <CardContent className="p-6">
                <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                  <Lock className="h-6 w-6 text-indigo-600" />
                </div>
                <h3 className="text-xl font-bold mb-2">KYC Verification</h3>
                <p className="text-gray-600">
                  Quick and secure identity verification process to keep your account safe.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="py-20 bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Your Security is Our Priority</h2>
            <p className="text-xl mb-12 text-blue-100">
              We use the latest security technologies to protect your financial information and transactions.
            </p>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="text-5xl font-bold mb-2">256-bit</div>
                <div className="text-blue-200">SSL Encryption</div>
              </div>
              <div>
                <div className="text-5xl font-bold mb-2">2FA</div>
                <div className="text-blue-200">Authentication</div>
              </div>
              <div>
                <div className="text-5xl font-bold mb-2">24/7</div>
                <div className="text-blue-200">Monitoring</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-bold text-gray-900 mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-gray-600 mb-10">
              Join thousands of users who trust ClearPulse for their banking needs.
            </p>
            <a href={getLoginUrl()}>
              <Button size="lg" className="text-lg px-8 py-6">
                Open Your Account Today <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">CP</span>
                </div>
                <span className="text-xl font-bold">ClearPulse</span>
              </div>
              <p className="text-gray-400">Modern banking for the digital age.</p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <div className="space-y-2">
                <Link href="/about" className="block text-gray-400 hover:text-white transition-colors">About Us</Link>
                <Link href="/faq" className="block text-gray-400 hover:text-white transition-colors">FAQ</Link>
                <Link href="/contact" className="block text-gray-400 hover:text-white transition-colors">Contact</Link>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Services</h4>
              <div className="space-y-2">
                <div className="text-gray-400">Personal Banking</div>
                <div className="text-gray-400">International Transfers</div>
                <div className="text-gray-400">Loans</div>
                <div className="text-gray-400">Debit Cards</div>
              </div>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Contact</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-400">
                  <Phone className="h-4 w-4" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400">
                  <Mail className="h-4 w-4" />
                  <span>support@clearpulse.com</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2025 ClearPulse. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
