"use client"

import { useState, useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
import { 
  Home, 
  Building2, 
  Users, 
  CreditCard, 
  Wrench, 
  FileText,
  FileCheck,
  Settings, 
  Menu, 
  X, 
  Search, 
  Bell,
  ChevronDown,
  LogOut,
  TrendingUp,
  DollarSign,
  Calendar,
  AlertCircle,
  Calculator,
  Package,
  MessageSquare
} from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface PropertyAdminLayoutProps {
  children: React.ReactNode
}

const navigationItems = [
  { name: 'Dashboard', href: '/property-admin/dashboard', icon: Home },
  { name: 'Properties', href: '/property-admin/properties', icon: Building2 },
  { name: 'Tenants', href: '/property-admin/tenants', icon: Users },
  { name: 'Leases', href: '/property-admin/leases', icon: FileCheck },
  { name: 'Payments', href: '/property-admin/payments', icon: CreditCard },
  { name: 'Finance', href: '/property-admin/finance', icon: Calculator },
  { name: 'Maintenance', href: '/property-admin/maintenance', icon: Wrench },
  { name: 'Inventory', href: '/property-admin/inventory', icon: Package },
  { name: 'Communications', href: '/property-admin/communications', icon: MessageSquare },
  { name: 'Staff & Roles', href: '/property-admin/staff', icon: Users },
  
  { name: 'Settings', href: '/property-admin/settings', icon: Settings },
]

export default function PropertyAdminLayout({ children }: PropertyAdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-72 bg-gradient-to-b from-slate-800 to-slate-900 border-r border-slate-700/50 backdrop-blur-xl transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}>
        <div className="flex items-center justify-between h-20 px-6 border-b border-slate-700/50">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Building2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">HAVENLY PRO</span>
              <p className="text-xs text-slate-400 font-medium">Property Management</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden text-slate-300 hover:text-white hover:bg-slate-700/50"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <nav className="mt-8 px-4">
          <div className="space-y-2">
            {navigationItems.map((item, index) => {
              const Icon = item.icon
              const isActive = pathname === item.href || (pathname === '/property-admin' && item.href === '/property-admin/dashboard')
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-4 py-3 text-sm font-medium rounded-xl transition-all duration-200 ${
                    isActive 
                      ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 text-blue-400 border-l-4 border-blue-400 shadow-lg hover:from-blue-500/30 hover:to-purple-500/30 hover:shadow-xl' 
                      : 'text-slate-300 hover:bg-slate-700/50 hover:text-white hover:shadow-md'
                  }`}
                >
                      <Icon className={`mr-4 w-5 h-5 ${
                        isActive ? 'text-blue-400 group-hover:text-blue-300' : 'text-blue-400/70 group-hover:text-blue-300'
                      }`} />
                  {item.name}
                </a>
              )
            })}
          </div>
        </nav>

        
        

        {/* Logout Button */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-6">
          <Button
            variant="ghost"
            className="w-full justify-start text-slate-300 hover:text-red-400 hover:bg-red-500/10 border border-slate-700/50 hover:border-red-500/30 rounded-xl"
            onClick={() => {
              localStorage.removeItem('token')
              localStorage.removeItem('user')
              sessionStorage.clear()
              router.push('/login')
            }}
          >
            <LogOut className="mr-3 w-5 h-5" />
            Logout
          </Button>
        </div>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="lg:ml-72">
        {/* Top navbar */}
        <header className="bg-slate-800/80 backdrop-blur-xl border-b border-slate-700/50 sticky top-0 z-40">
          <div className="flex items-center justify-between h-20 px-8">
            <div className="flex items-center space-x-6">
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden text-slate-300 hover:text-white hover:bg-slate-700/50"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="w-6 h-6" />
              </Button>
              
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <Input
                  type="text"
                  placeholder="Search properties, tenants, payments..."
                  className="pl-12 w-96 h-12 text-sm bg-slate-700/50 border-slate-600/50 text-white placeholder-slate-400 rounded-xl focus:ring-2 focus:ring-blue-500/50"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="relative text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-xl">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs flex items-center justify-center text-white font-bold">3</span>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-3 text-slate-300 hover:text-white hover:bg-slate-700/50 rounded-xl">
                    <Avatar className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600">
                      <AvatarImage src="" />
                      <AvatarFallback className="text-white font-bold">PA</AvatarFallback>
                    </Avatar>
                    <div className="hidden sm:block text-left">
                      <span className="text-sm font-semibold text-white">Property Admin</span>
                      <p className="text-xs text-slate-400">admin@property.com</p>
                    </div>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-64 bg-slate-800/95 backdrop-blur-xl border-slate-700/50 rounded-xl">
                  <DropdownMenuLabel className="text-slate-300 font-semibold">My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-slate-700/50" />
                  <DropdownMenuItem className="text-slate-300 hover:bg-slate-700/50 rounded-lg">Profile</DropdownMenuItem>
                  <DropdownMenuItem className="text-slate-300 hover:bg-slate-700/50 rounded-lg">Settings</DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-slate-700/50" />
                  <DropdownMenuItem className="text-slate-300 hover:bg-slate-700/50 rounded-lg">Logout</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        {/* Main content area */}
        <main className="p-6 bg-slate-900 min-h-screen">
          {children}
        </main>
      </div>
    </div>
  )
}
