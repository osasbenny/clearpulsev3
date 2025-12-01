import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import About from "./pages/About";
import FAQ from "./pages/FAQ";
import Contact from "./pages/Contact";
import Bank from "./pages/Bank";
import Save from "./pages/Save";
import Borrow from "./pages/Borrow";
import WealthAndRetire from "./pages/WealthAndRetire";
import Insure from "./pages/Insure";
import LearnAndPlan from "./pages/LearnAndPlan";
import Payments from "./pages/Payments";
import Dashboard from "./pages/Dashboard";
import Accounts from "./pages/Accounts";
import Transfers from "./pages/Transfers";
import Loans from "./pages/Loans";
import Cards from "./pages/Cards";
import KYC from "./pages/KYC";
import Notifications from "./pages/Notifications";
import Support from "./pages/Support";
import Settings from "./pages/Settings";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminKYC from "./pages/admin/AdminKYC";
import AdminLoans from "./pages/admin/AdminLoans";
import AdminTransactions from "./pages/admin/AdminTransactions";
import AdminTickets from "./pages/admin/AdminTickets";
import AdminSettings from "./pages/admin/AdminSettings";

function Router() {
  return (
    <Switch>
      {/* Public routes */}
      <Route path={"/"} component={Home} />
      <Route path={"/about"} component={About} />
      <Route path={"/faq"} component={FAQ} />
      <Route path={"/contact"} component={Contact} />
      <Route path={"/bank"} component={Bank} />
      <Route path={"/save"} component={Save} />
      <Route path={"/borrow"} component={Borrow} />
      <Route path={"/wealth-retire"} component={WealthAndRetire} />
      <Route path={"/insure"} component={Insure} />
      <Route path={"/learn-plan"} component={LearnAndPlan} />
      <Route path={"/payments"} component={Payments} />
      
      {/* User dashboard routes */}
      <Route path={"/dashboard"} component={Dashboard} />
      <Route path={"/accounts"} component={Accounts} />
      <Route path={"/transfers"} component={Transfers} />
      <Route path={"/loans"} component={Loans} />
      <Route path={"/cards"} component={Cards} />
      <Route path={"/kyc"} component={KYC} />
      <Route path={"/notifications"} component={Notifications} />
      <Route path={"/support"} component={Support} />
      <Route path={"/settings"} component={Settings} />
      
      {/* Admin routes */}
      <Route path={"/admin"} component={AdminDashboard} />
      <Route path={"/admin/users"} component={AdminUsers} />
      <Route path={"/admin/kyc"} component={AdminKYC} />
      <Route path={"/admin/loans"} component={AdminLoans} />
      <Route path={"/admin/transactions"} component={AdminTransactions} />
      <Route path={"/admin/tickets"} component={AdminTickets} />
      <Route path={"/admin/settings"} component={AdminSettings} />
      
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="light">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
