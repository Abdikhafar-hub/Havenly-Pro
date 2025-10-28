"use client"

import { useState, useEffect } from 'react'
import { 
  CreditCard, 
  Calendar,
  Wrench,
  Bell,
  AlertCircle,
  CheckCircle,
  Clock,
  TrendingUp,
  DollarSign,
  Home,
  User,
  FileText,
  MessageSquare,
  ArrowUpRight,
  ArrowDownRight,
  Eye,
  Plus,
  Phone
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { 
  LineChart as RechartsLineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts'

// Mock data for rent history
const rentHistoryData = [
  { month: 'Oct', paid: 1200, due: 1200 },
  { month: 'Nov', paid: 1200, due: 1200 },
  { month: 'Dec', paid: 1200, due: 1200 },
  { month: 'Jan', paid: 0, due: 1200 },
]

const upcomingMaintenance = [
  { id: 1, title: 'Annual HVAC Inspection', date: '2024-01-25', type: 'inspection', status: 'scheduled' },
  { id: 2, title: 'Carpet Cleaning', date: '2024-01-30', type: 'cleaning', status: 'scheduled' },
]

const notifications = [
  { id: 1, title: 'Rent Due Reminder', message: 'Your rent payment of $1,200 is due on January 5th', type: 'info', time: '2 hours ago', read: false },
  { id: 2, title: 'Maintenance Update', message: 'Your request #1234 has been completed', type: 'success', time: '1 day ago', read: false },
  { id: 3, title: 'Community Notice', message: 'Monthly community meeting scheduled for Jan 15th', type: 'announcement', time: '3 days ago', read: true },
]

export default function TenantDashboard() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Dashboard Overview</h1>
          <p className="text-slate-400 mt-2">Welcome back, John! Here's your overview for Unit 101.</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Pay Rent Now
          </Button>
          <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
            <Eye className="w-4 h-4 mr-2" />
            View Lease
          </Button>
        </div>
      </div>

      {/* Rent Overview - Top Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Rent Payment Status Card */}
        <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Rent Due</CardTitle>
            <Calendar className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-white mb-2">$1,200</div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs text-slate-400">Due Date</span>
              <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-400">
                Jan 5, 2024
              </Badge>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <AlertCircle className="h-4 w-4 text-yellow-400" />
                <span className="text-sm text-yellow-400 font-medium">Pending</span>
              </div>
              <Button size="sm" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">
                Pay Now
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Lease Summary Card */}
        <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 hover:border-green-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Lease Summary</CardTitle>
            <FileText className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <Home className="h-4 w-4 text-slate-400" />
                <div>
                  <p className="text-sm text-slate-400">Property</p>
                  <p className="text-white font-semibold">Sunset Apartments</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <User className="h-4 w-4 text-slate-400" />
                <div>
                  <p className="text-sm text-slate-400">Unit</p>
                  <p className="text-white font-semibold">Unit 101 - 2 Bedroom</p>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-slate-400" />
                <div>
                  <p className="text-sm text-slate-400">Contract Period</p>
                  <p className="text-white font-semibold">Jan 1, 2023 - Dec 31, 2024</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions Card */}
        <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 hover:border-purple-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/10">
          <CardHeader>
            <CardTitle className="text-sm font-medium text-slate-300">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <button className="w-full group relative overflow-hidden flex items-center px-4 py-3 rounded-xl bg-gradient-to-r from-green-500/10 to-blue-500/10 border border-green-500/20 hover:border-green-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-green-500/20">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/0 to-blue-500/0 group-hover:from-green-500/10 group-hover:to-blue-500/10 transition-all duration-300"></div>
              <CreditCard className="w-5 h-5 mr-3 text-green-400 group-hover:scale-110 transition-transform duration-300 relative z-10" />
              <span className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors duration-300 relative z-10">Pay Rent</span>
              <ArrowUpRight className="w-4 h-4 ml-auto text-slate-400 group-hover:text-green-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 relative z-10" />
            </button>
            
            <button className="w-full group relative overflow-hidden flex items-center px-4 py-3 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 hover:border-blue-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/20">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/0 to-purple-500/0 group-hover:from-blue-500/10 group-hover:to-purple-500/10 transition-all duration-300"></div>
              <Wrench className="w-5 h-5 mr-3 text-blue-400 group-hover:scale-110 transition-transform duration-300 relative z-10" />
              <span className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors duration-300 relative z-10">Submit Request</span>
              <ArrowUpRight className="w-4 h-4 ml-auto text-slate-400 group-hover:text-blue-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 relative z-10" />
            </button>
            
            <button className="w-full group relative overflow-hidden flex items-center px-4 py-3 rounded-xl bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 hover:border-purple-500/40 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 to-pink-500/0 group-hover:from-purple-500/10 group-hover:to-pink-500/10 transition-all duration-300"></div>
              <Phone className="w-5 h-5 mr-3 text-purple-400 group-hover:scale-110 transition-transform duration-300 relative z-10" />
              <span className="text-sm font-medium text-slate-200 group-hover:text-white transition-colors duration-300 relative z-10">Contact Admin</span>
              <ArrowUpRight className="w-4 h-4 ml-auto text-slate-400 group-hover:text-purple-400 group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 relative z-10" />
            </button>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Notifications - Middle Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Rent Payment History */}
        <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-blue-400" />
              Rent Payment History
            </CardTitle>
            <CardDescription className="text-slate-400">
              Your payment history over the past months
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsLineChart data={rentHistoryData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="month" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#F9FAFB'
                    }} 
                  />
                  <Line 
                    type="monotone" 
                    dataKey="paid" 
                    stroke="#10B981" 
                    strokeWidth={3}
                    dot={{ fill: '#10B981', strokeWidth: 2, r: 6 }}
                    activeDot={{ r: 8, stroke: '#10B981', strokeWidth: 2 }}
                    name="Paid"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="due" 
                    stroke="#EF4444" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={{ fill: '#EF4444', strokeWidth: 2, r: 4 }}
                    name="Due"
                  />
                </RechartsLineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center space-x-6 mt-4">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span className="text-sm text-slate-300">Paid</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                <span className="text-sm text-slate-300">Due</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Upcoming Maintenance & Inspections */}
        <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-purple-400" />
              Upcoming Maintenance & Inspections
            </CardTitle>
            <CardDescription className="text-slate-400">
              Scheduled service appointments
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingMaintenance.map((item) => (
                <div key={item.id} className="flex items-start space-x-3 p-3 rounded-lg bg-slate-700/50 hover:bg-slate-700/70 transition-colors">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    item.type === 'inspection' ? 'bg-blue-500/20' : 'bg-purple-500/20'
                  }`}>
                    <Wrench className={`w-5 h-5 ${
                      item.type === 'inspection' ? 'text-blue-400' : 'text-purple-400'
                    }`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white">{item.title}</p>
                    <p className="text-xs text-slate-400 mt-1">{item.date}</p>
                    <Badge variant="secondary" className="bg-green-500/20 text-green-400 mt-2">
                      {item.status}
                    </Badge>
                  </div>
                </div>
              ))}
              <Button variant="outline" className="w-full border-slate-600 text-slate-300 hover:bg-slate-700">
                View All Maintenance
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notifications Summary - Bottom Section */}
      <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-white flex items-center">
              <Bell className="w-5 h-5 mr-2 text-yellow-400" />
              Notifications & Announcements
            </CardTitle>
            <CardDescription className="text-slate-400">
              Latest updates and important information
            </CardDescription>
          </div>
          <Button variant="ghost" className="text-slate-300 hover:text-white hover:bg-slate-700">
            View All
          </Button>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {notifications.map((notification) => (
              <div key={notification.id} className={`flex items-start space-x-3 p-4 rounded-lg ${
                notification.read ? 'bg-slate-700/30' : 'bg-slate-700/50 hover:bg-slate-700/70'
              } transition-colors border-l-4 ${
                notification.type === 'success' ? 'border-green-500' :
                notification.type === 'info' ? 'border-blue-500' :
                'border-purple-500'
              }`}>
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  notification.type === 'success' ? 'bg-green-500/20' :
                  notification.type === 'info' ? 'bg-blue-500/20' :
                  'bg-purple-500/20'
                }`}>
                  {notification.type === 'success' ? (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  ) : notification.type === 'info' ? (
                    <AlertCircle className="w-5 h-5 text-blue-400" />
                  ) : (
                    <Bell className="w-5 h-5 text-purple-400" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white">{notification.title}</p>
                  <p className="text-xs text-slate-400 mt-1 line-clamp-2">{notification.message}</p>
                  <p className="text-xs text-slate-500 mt-2">{notification.time}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activities Summary */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 hover:border-green-500/50 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Payment Status</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white mb-2">3/4</div>
            <p className="text-xs text-green-400">On-time payments this quarter</p>
            <Progress value={75} className="mt-3" />
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 hover:border-blue-500/50 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Open Requests</CardTitle>
            <Wrench className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white mb-2">1</div>
            <p className="text-xs text-blue-400">Active maintenance requests</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 hover:border-purple-500/50 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Unread Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white mb-2">2</div>
            <p className="text-xs text-purple-400">New messages from property manager</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

