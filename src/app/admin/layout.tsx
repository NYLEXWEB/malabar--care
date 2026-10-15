"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
  LayoutDashboard,
  FileEdit,
  Sparkles,
  Layers,
  BookOpen,
  Image as ImageIcon,
  BarChart3,
  Inbox,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Database,
  CheckCircle2,
  AlertTriangle,
  User,
} from "lucide-react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [dbStatus, setDbStatus] = useState<{ isConnected: boolean; message: string }>({
    isConnected: false,
    message: "Checking...",
  });
  const [user, setUser] = useState<{ username: string; role: string } | null>(null);

  // If on login page, render plain without dashboard shell
  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    if (isLoginPage) return;

    fetch("/api/auth/session")
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated && data.user) {
          setUser(data.user);
        }
        if (data.database) {
          setDbStatus(data.database);
        }
      })
      .catch(() => {});
  }, [isLoginPage]);

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      router.push("/admin/login");
      router.refresh();
    } catch {
      router.push("/admin/login");
    }
  };

  if (isLoginPage) {
    return <>{children}</>;
  }

  const navItems = [
    { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { label: "Website Content", href: "/admin/content", icon: FileEdit },
    { label: "Services", href: "/admin/services", icon: Layers },
    { label: "Vlogs & Insights", href: "/admin/vlogs", icon: BookOpen },
    { label: "Media Assets", href: "/admin/media", icon: ImageIcon },
    { label: "Analytics & Views", href: "/admin/analytics", icon: BarChart3 },
    { label: "Customer Enquiries", href: "/admin/enquiries", icon: Inbox },
  ];

  return (
    <div className="min-h-screen bg-slate-100/70 flex flex-col md:flex-row">
      
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:w-64 flex-col bg-slate-900 border-r border-slate-800 text-slate-300">
        {/* Brand Header */}
        <div className="h-20 flex items-center gap-3 px-6 border-b border-slate-800">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 to-sky-400 flex items-center justify-center text-white shadow-md shadow-blue-500/20">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <span className="text-base font-extrabold text-white tracking-tight">
              MALABAR <span className="text-blue-400">CARE</span>
            </span>
            <p className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
              Admin CMS &amp; Demo
            </p>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                  active
                    ? "bg-blue-600 text-white shadow-md shadow-blue-600/30"
                    : "text-slate-400 hover:text-white hover:bg-slate-800/80"
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Database & Storage Status Indicator */}
        <div className="p-4 mx-4 mb-4 rounded-xl bg-slate-800/80 border border-slate-700/80 text-xs">
          <div className="flex items-center gap-2 mb-1">
            <Database className="w-3.5 h-3.5 text-blue-400" />
            <span className="font-bold text-white text-[11px]">Database Status</span>
          </div>
          <div className="flex items-center gap-1.5 text-[11px]">
            {dbStatus.isConnected ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                <span className="text-emerald-300 font-medium">MongoDB Atlas</span>
              </>
            ) : (
              <>
                <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                <span className="text-amber-300 font-medium">Demo In-Memory Mode</span>
              </>
            )}
          </div>
          <p className="text-[10px] text-slate-400 mt-1 leading-tight">
            {dbStatus.isConnected
              ? "All writes persist to MongoDB Atlas & GridFS."
              : "Active demo fallback mode. Configure MONGODB_URI for cloud persistence."}
          </p>
        </div>

        {/* User Badge & Logout */}
        <div className="p-4 border-t border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-slate-300">
              <User className="w-4 h-4" />
            </div>
            <div className="overflow-hidden">
              <p className="text-xs font-bold text-white truncate">{user?.username || "admin"}</p>
              <p className="text-[10px] text-slate-400 capitalize">{user?.role || "Administrator"}</p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            title="Sign out of Admin Dashboard"
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </aside>

      {/* Main Admin Area */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Top Header */}
        <header className="h-16 sm:h-20 bg-white border-b border-slate-200/80 px-4 sm:px-8 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-3">
            {/* Mobile Toggle */}
            <button
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
              className="md:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
              aria-label="Toggle admin sidebar"
            >
              {mobileNavOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>

            <h1 className="text-base sm:text-lg font-bold text-slate-900 tracking-tight">
              Malabar Care Control Center
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {/* Live website link */}
            <Link
              href="/"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors"
            >
              <span>Live Website</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </Link>

            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-xs font-bold text-slate-700 transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </header>

        {/* Mobile Navigation Drawer */}
        {mobileNavOpen && (
          <div className="md:hidden bg-slate-900 text-slate-200 p-4 space-y-1.5 border-b border-slate-800">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileNavOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-semibold ${
                    active ? "bg-blue-600 text-white" : "text-slate-300 hover:bg-slate-800"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        )}

        {/* Child Pages Content */}
        <main className="flex-1 p-4 sm:p-8 overflow-y-auto">
          {children}
        </main>

      </div>

    </div>
  );
}
