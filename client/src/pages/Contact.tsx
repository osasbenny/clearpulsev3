import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <nav className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <Link href="/">
            <Button variant="ghost"><ArrowLeft className="mr-2 h-4 w-4" /> Back</Button>
          </Link>
        </div>
      </nav>
      <div className="container mx-auto px-4 py-16 max-w-4xl">
        <h1 className="text-5xl font-bold mb-8">Contact Us</h1>
      </div>
    </div>
  );
}
