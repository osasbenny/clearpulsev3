import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Lock, Globe } from "lucide-react";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Bank", href: "/bank" },
  { name: "Save", href: "/save" },
  { name: "Borrow", href: "/borrow" },
  { name: "Wealth & Retire", href: "/wealth-retire" },
  { name: "Insure", href: "/insure" },
  { name: "Learn & Plan", href: "/learn-plan" },
  { name: "Payments", href: "/payments" },
];

const NavLink = ({ name, href }: { name: string; href: string }) => (
  <Link href={href}>
    <a className="relative py-4 px-3 text-sm font-medium uppercase tracking-wider text-white hover:text-white transition-colors duration-300 group">
      {name}
      <span className="absolute bottom-0 left-0 w-full h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
    </a>
  </Link>
);

export default function MainNavigation() {
  return (
    <nav className="bg-[#301CA0] sticky top-0 z-50 shadow-lg">
      {/* Top Bar */}
      <div className="bg-[#1e1464] text-white py-2">
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link href="/">
            <a className="flex items-center gap-2">
              {/* Assuming logo.png is the ClearPulse logo */}
              <img src="/logo.png" alt="ClearPulse" className="h-8 w-8" />
              <span className="text-xl font-bold">ClearPulse</span>
            </a>
          </Link>
          <div className="flex items-center gap-4">
            <a href="https://dashboard.clearpulsaro.com/dashboard" className="text-sm font-medium uppercase tracking-wider hover:underline">
              <Button variant="ghost" className="text-white hover:bg-white/10 px-4 py-2 rounded-none border-b-2 border-transparent hover:border-white transition-all duration-300">
                Login
              </Button>
            </a>
            <a href="https://dashboard.clearpulsaro.com/dashboard">
              <Button className="bg-[#7132CA] hover:bg-[#C47BE4] text-white uppercase tracking-wider rounded-none px-4 py-2">
                Open Account
              </Button>
            </a>
            <div className="flex items-center gap-1 text-sm">
              <Lock className="h-4 w-4" />
            </div>
            <div className="flex items-center gap-1 text-sm">
              <Globe className="h-4 w-4" />
              <span>English</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Menu Bar */}
      <div className="bg-[#301CA0] border-t border-white/20">
        <div className="container mx-auto px-4 flex justify-center">
          <div className="hidden md:flex items-center gap-4">
            {navItems.map((item) => (
              <NavLink key={item.name} name={item.name} href={item.href} />
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
