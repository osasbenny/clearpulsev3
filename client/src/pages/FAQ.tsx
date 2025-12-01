import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { ArrowLeft } from "lucide-react";

export default function FAQ() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
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

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-[#7132CA] to-[#C47BE4] text-white py-20">
        <div className="container mx-auto px-4">
          <Link href="/">
            <Button variant="ghost" className="text-white hover:bg-white/20 mb-8">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
            </Button>
          </Link>
          <h1 className="text-5xl font-bold mb-4">Frequently Asked Questions</h1>
          <p className="text-xl text-white/90">Find answers to common questions about ClearPulse banking services</p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-4xl">
          <Accordion type="single" collapsible className="space-y-4">
            {/* Account Opening */}
            <AccordionItem value="item-1" className="bg-white rounded-lg px-6 border-none shadow-sm">
              <AccordionTrigger className="text-lg font-semibold text-[#301CA0] hover:text-[#7132CA]">
                How do I open an account with ClearPulse?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Opening an account with ClearPulse is simple and can be done entirely online. Click on "Create an Account" or "E-Banking" button, fill out the registration form with your personal information, upload required KYC documents (ID and proof of address), and submit your application. Our team will review your application within 24-48 hours and notify you via email once your account is approved.
              </AccordionContent>
            </AccordionItem>

            {/* Account Types */}
            <AccordionItem value="item-2" className="bg-white rounded-lg px-6 border-none shadow-sm">
              <AccordionTrigger className="text-lg font-semibold text-[#301CA0] hover:text-[#7132CA]">
                What types of accounts does ClearPulse offer?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                ClearPulse offers several account types to meet your needs: Checking Accounts for everyday transactions with debit card access, Savings Accounts with competitive interest rates, Business Accounts designed for entrepreneurs and companies, and Cash Management Accounts that combine the flexibility of checking with the interest of savings.
              </AccordionContent>
            </AccordionItem>

            {/* Transfers */}
            <AccordionItem value="item-3" className="bg-white rounded-lg px-6 border-none shadow-sm">
              <AccordionTrigger className="text-lg font-semibold text-[#301CA0] hover:text-[#7132CA]">
                How do I transfer money to another bank?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                You can transfer money through our E-Banking platform. Log in to your account, navigate to "Transfers", select "External Transfer", enter the recipient's bank details (account number, routing number, bank name), specify the amount, and confirm the transaction. External transfers typically take 1-3 business days to process. International transfers are also available in GBP, EUR, and USD.
              </AccordionContent>
            </AccordionItem>

            {/* Fees */}
            <AccordionItem value="item-4" className="bg-white rounded-lg px-6 border-none shadow-sm">
              <AccordionTrigger className="text-lg font-semibold text-[#301CA0] hover:text-[#7132CA]">
                What are the fees for transfers and transactions?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Internal transfers between ClearPulse accounts are free. External domestic transfers have a flat fee of $2.50 per transaction. International transfers vary by currency: GBP transfers cost $15, EUR transfers cost $12, and USD international transfers cost $10. There are no monthly maintenance fees for accounts maintaining a minimum balance of $500.
              </AccordionContent>
            </AccordionItem>

            {/* Loans */}
            <AccordionItem value="item-5" className="bg-white rounded-lg px-6 border-none shadow-sm">
              <AccordionTrigger className="text-lg font-semibold text-[#301CA0] hover:text-[#7132CA]">
                How do I apply for a loan?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                You can apply for a loan directly through your E-Banking dashboard. Navigate to the "Loans" section, use our loan calculator to estimate your monthly payments, fill out the loan application form with details about the loan amount, purpose, and term length, and submit your application. Our loan officers will review your application and credit history, and you'll receive a decision within 2-3 business days.
              </AccordionContent>
            </AccordionItem>

            {/* Cards */}
            <AccordionItem value="item-6" className="bg-white rounded-lg px-6 border-none shadow-sm">
              <AccordionTrigger className="text-lg font-semibold text-[#301CA0] hover:text-[#7132CA]">
                How do I request a debit card?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Debit cards can be requested through your E-Banking portal. Go to the "Cards" section, click "Request New Card", select your preferred card type, choose your delivery address, and submit your request. Virtual cards are generated instantly for immediate online use, while physical cards are shipped within 5-7 business days.
              </AccordionContent>
            </AccordionItem>

            {/* Security */}
            <AccordionItem value="item-7" className="bg-white rounded-lg px-6 border-none shadow-sm">
              <AccordionTrigger className="text-lg font-semibold text-[#301CA0] hover:text-[#7132CA]">
                How secure is online banking with ClearPulse?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                ClearPulse uses industry-leading security measures including 256-bit SSL encryption, two-factor authentication (2FA), real-time fraud monitoring, and regular security audits. We never ask for your password via email or phone.
              </AccordionContent>
            </AccordionItem>

            {/* Customer Support */}
            <AccordionItem value="item-8" className="bg-white rounded-lg px-6 border-none shadow-sm">
              <AccordionTrigger className="text-lg font-semibold text-[#301CA0] hover:text-[#7132CA]">
                How can I contact customer support?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600">
                Our customer support team is available 24/7. You can reach us by phone at +1 (313) 307-9393, email us at info@clearpulsaro.com, or visit our office at 789 Enterprise Way, Floor 2, NY, New York, 10016, United States during business hours (Monday-Friday, 9 AM - 6 PM EST).
              </AccordionContent>
            </AccordionItem>
          </Accordion>

          {/* Still Have Questions */}
          <div className="mt-16 text-center bg-gradient-to-r from-[#7132CA] to-[#C47BE4] text-white rounded-2xl p-12">
            <h2 className="text-3xl font-bold mb-4">Still Have Questions?</h2>
            <p className="text-lg mb-8 text-white/90">
              Our support team is here to help you 24/7
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button className="bg-white text-[#7132CA] hover:bg-gray-100 rounded-full px-8">
                  Contact Us
                </Button>
              </Link>
              <a href="tel:+13133079393">
                <Button variant="outline" className="border-white text-white hover:bg-white/20 rounded-full px-8">
                  Call +1 (313) 307-9393
                </Button>
              </a>
            </div>
          </div>
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
              <h3 className="font-semibold mb-4 text-[#C47BE4]">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li><Link href="/"><a className="text-gray-400 hover:text-white transition-colors">Home</a></Link></li>
                <li><Link href="/about"><a className="text-gray-400 hover:text-white transition-colors">About</a></Link></li>
                <li><Link href="/contact"><a className="text-gray-400 hover:text-white transition-colors">Contact</a></Link></li>
                <li><Link href="/faq"><a className="text-gray-400 hover:text-white transition-colors">FAQ</a></Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-[#C47BE4]">Services</h3>
              <ul className="space-y-2 text-sm">
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Personal Banking</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Business Banking</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Loans</a></li>
                <li><a href="#" className="text-gray-400 hover:text-white transition-colors">Cards</a></li>
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
