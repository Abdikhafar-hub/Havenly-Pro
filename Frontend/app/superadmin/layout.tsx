"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Home, 
  Building2, 
  Users, 
  UserCheck, 
  CreditCard, 
  Settings, 
  Menu, 
  X, 
  Search, 
  Bell,
  ChevronDown,
  LogOut
} from 'lucide-react'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

interface SuperAdminLayoutProps {
  children: React.ReactNode
}

const navigationItems = [
  { name: 'Dashboard', href: '/superadmin/dashboard', icon: Home },
  { name: 'Properties', href: '/superadmin/dashboard/properties', icon: Building2 },
  { name: 'Users Management', href: '/superadmin/dashboard/users', icon: Users },
  { name: 'Notifications', href: '/superadmin/dashboard/notifications', icon: Bell },
  { name: 'Billing', href: '/superadmin/dashboard/billing', icon: CreditCard },
  { name: 'Settings', href: '/superadmin/dashboard/settings', icon: Settings },
]

export default function SuperAdminLayout({ children }: SuperAdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="min-h-screen bg-slate-900">
      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-slate-800 border-r border-slate-700 transform transition-transform duration-300 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}>
        <div className="flex items-center justify-between h-16 px-4 border-b border-slate-700">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-yellow-500 rounded-lg flex items-center justify-center">
              <Building2 className="w-5 h-5 text-slate-900" />
            </div>
            <div>
              <span className="text-lg font-bold text-white">HAVENLY PRO</span>
              <p className="text-xs text-slate-400">Property Management</p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden text-white hover:bg-slate-700"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <nav className="mt-6 px-3">
          <div className="space-y-1">
            {navigationItems.map((item, index) => {
              const Icon = item.icon
              const isActive = index === 0 // Dashboard is active
              return (
                <a
                  key={item.name}
                  href={item.href}
                  className={`group flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-colors duration-200 ${
                    isActive 
                      ? 'bg-yellow-500/10 text-yellow-400 border-l-4 border-yellow-500' 
                      : 'text-slate-300 hover:bg-slate-700 hover:text-white'
                  }`}
                >
                  <Icon className={`mr-3 w-5 h-5 ${
                    isActive ? 'text-yellow-400' : 'text-slate-400 group-hover:text-slate-200'
                  }`} />
                  {item.name}
                </a>
              )
            })}
          </div>
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-0 left-0 right-0 px-3 pb-6">
          <Button
            variant="ghost"
            className="w-full justify-start text-slate-300 hover:text-red-400 hover:bg-red-500/10 border border-slate-700 hover:border-red-500/30"
            onClick={() => {
              // Clear any stored authentication data
              localStorage.removeItem('token')
              localStorage.removeItem('user')
              sessionStorage.clear()
              
              // Redirect to login page
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
          className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main content */}
      <div className="lg:ml-64">
        {/* Top navbar */}
        <header className="bg-slate-800 border-b border-slate-700 sticky top-0 z-40">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </Button>
              
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search properties, users..."
                  className="pl-10 w-80 h-10 text-sm bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                />
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="relative text-slate-300 hover:text-white hover:bg-slate-700">
                <Bell className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full text-xs flex items-center justify-center text-white">3</span>
              </Button>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center space-x-2 text-slate-300 hover:text-white hover:bg-slate-700">
                    <Avatar className="w-8 h-8 bg-yellow-500">
                      <AvatarImage src="" />
                      <AvatarFallback className="text-slate-900 font-bold">SA</AvatarFallback>
                    </Avatar>
                    <div className="hidden sm:block text-left">
                      <span className="text-sm font-medium text-white">Super Administrator</span>
                      <p className="text-xs text-slate-400">superadmin@havenly.com</p>
                    </div>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-slate-800 border-slate-700">
                  <DropdownMenuLabel className="text-slate-300">My Account</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-slate-700" />
                  <DropdownMenuItem className="text-slate-300 hover:bg-slate-700">Profile</DropdownMenuItem>
                  <DropdownMenuItem className="text-slate-300 hover:bg-slate-700">Settings</DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-slate-700" />
                  <DropdownMenuItem className="text-slate-300 hover:bg-slate-700">Logout</DropdownMenuItem>
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
