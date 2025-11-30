import { useAuth } from "@/_core/hooks/useAuth";
import { trpc } from "@/lib/trpc";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { CreditCard, Send, TrendingUp, Bell, Settings, LogOut, Home, Wallet, FileText, HelpCircle } from "lucide-react";
import { getLoginUrl } from "@/const";

export default function Dashboard() {
  const { user, isAuthenticated, logout } = useAuth();
  const { data: accounts } = trpc.banking.getAccounts.useQuery(undefined, { enabled: isAuthenticated });
  
  if (!isAuthenticated) {
    window.location.href = getLoginUrl();
    return null;
  }

  const totalBalance = accounts?.reduce((sum, acc) => sum + acc.balance, 0) || 0;

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="w-64 bg-white border-r">
        <div className="p-6 border-b">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">CP</span>
            </div>
            <span className="text-xl font-bold">ClearPulse</span>
          </div>
        </div>
        <nav className="p-4 space-y-1">
          <Link href="/dashboard"><a className="flex items-center gap-3 px-4 py-3 rounded-lg bg-blue-50 text-blue-600"><Home className="h-5 w-5" />Dashboard</a></Link>
          <Link href="/accounts"><a className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100"><Wallet className="h-5 w-5" />Accounts</a></Link>
          <Link href="/transfers"><a className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100"><Send className="h-5 w-5" />Transfers</a></Link>
          <Link href="/loans"><a className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100"><TrendingUp className="h-5 w-5" />Loans</a></Link>
          <Link href="/cards"><a className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100"><CreditCard className="h-5 w-5" />Cards</a></Link>
          <Link href="/kyc"><a className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100"><FileText className="h-5 w-5" />KYC</a></Link>
          <Link href="/notifications"><a className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100"><Bell className="h-5 w-5" />Notifications</a></Link>
          <Link href="/support"><a className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100"><HelpCircle className="h-5 w-5" />Support</a></Link>
          <Link href="/settings"><a className="flex items-center gap-3 px-4 py-3 rounded-lg hover:bg-gray-100"><Settings className="h-5 w-5" />Settings</a></Link>
        </nav>
        <div className="p-4 border-t">
          <Button variant="ghost" className="w-full justify-start" onClick={() => logout()}><LogOut className="h-4 w-4 mr-2" />Logout</Button>
        </div>
      </aside>
      <main className="flex-1 p-6">
        <h1 className="text-3xl font-bold mb-6">Welcome, {user?.name}!</h1>
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card><CardHeader><CardTitle className="text-sm">Total Balance</CardTitle></CardHeader><CardContent><div className="text-3xl font-bold">${(totalBalance / 100).toFixed(2)}</div></CardContent></Card>
          <Card><CardHeader><CardTitle className="text-sm">Active Accounts</CardTitle></CardHeader><CardContent><div className="text-3xl font-bold">{accounts?.length || 0}</div></CardContent></Card>
          <Card><CardHeader><CardTitle className="text-sm">Notifications</CardTitle></CardHeader><CardContent><div className="text-3xl font-bold">0</div></CardContent></Card>
        </div>
      </main>
    </div>
  );
}