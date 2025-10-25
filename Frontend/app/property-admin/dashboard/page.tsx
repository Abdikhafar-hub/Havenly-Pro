"use client"

import { useState, useEffect } from 'react'
import { 
  Building2, 
  Users, 
  DollarSign, 
  Wrench, 
  TrendingUp, 
  AlertCircle,
  Plus,
  Calendar,
  FileText,
  Bell,
  Eye,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Home,
  CreditCard,
  Settings,
  PieChart,
  LineChart
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  LineChart as RechartsLineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell
} from 'recharts'

// Mock data for demonstration
const rentCollectionData = [
  { month: 'Jan', amount: 45000, target: 50000 },
  { month: 'Feb', amount: 52000, target: 50000 },
  { month: 'Mar', amount: 48000, target: 50000 },
  { month: 'Apr', amount: 55000, target: 50000 },
  { month: 'May', amount: 60000, target: 50000 },
  { month: 'Jun', amount: 58000, target: 50000 },
]

const occupancyData = [
  { name: 'Occupied', value: 85, color: '#10B981' },
  { name: 'Vacant', value: 15, color: '#EF4444' },
]


const recentActivities = [
  { id: 1, type: 'payment', message: 'John Doe paid rent for Unit 101', time: '2 hours ago', amount: '$1,200' },
  { id: 2, type: 'maintenance', message: 'Maintenance request #1234 completed', time: '4 hours ago', status: 'completed' },
  { id: 3, type: 'tenant', message: 'New tenant added: Sarah Wilson', time: '1 day ago', unit: 'Unit 205' },
  { id: 4, type: 'payment', message: 'Mike Johnson paid rent for Unit 302', time: '2 days ago', amount: '$1,500' },
  { id: 5, type: 'maintenance', message: 'Maintenance request #1235 created', time: '3 days ago', status: 'pending' },
]

const upcomingEvents = [
  { id: 1, title: 'Rent Collection Due', date: '2024-01-15', type: 'rent', priority: 'high' },
  { id: 2, title: 'Property Inspection', date: '2024-01-20', type: 'inspection', priority: 'medium' },
  { id: 3, title: 'Maintenance Schedule', date: '2024-01-25', type: 'maintenance', priority: 'low' },
]

const notifications = [
  { id: 1, title: 'Rent Overdue', message: '3 tenants have overdue rent payments', type: 'warning', time: '1 hour ago' },
  { id: 2, title: 'Maintenance Alert', message: 'HVAC system needs attention in Building A', type: 'alert', time: '3 hours ago' },
  { id: 3, title: 'New Application', message: 'New tenant application received', type: 'info', time: '5 hours ago' },
]

export default function PropertyAdminDashboard() {
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
          <h1 className="text-3xl font-bold text-white">Dashboard Overview</h1>
          <p className="text-slate-400 mt-2">Welcome back! Here's what's happening with your properties.</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Quick Add
          </Button>
          <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Properties Managed</CardTitle>
            <Building2 className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">24</div>
            <p className="text-xs text-green-400 flex items-center">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              +2 from last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 hover:border-green-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Total Tenants</CardTitle>
            <Users className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">156</div>
            <p className="text-xs text-green-400 flex items-center">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              +8 new tenants
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 hover:border-yellow-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-yellow-500/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Rent Collected (Month)</CardTitle>
            <DollarSign className="h-4 w-4 text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">$58,000</div>
            <p className="text-xs text-green-400 flex items-center">
              <ArrowUpRight className="h-3 w-3 mr-1" />
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 hover:border-red-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-red-500/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Open Maintenance</CardTitle>
            <Wrench className="h-4 w-4 text-red-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">7</div>
            <p className="text-xs text-red-400 flex items-center">
              <ArrowDownRight className="h-3 w-3 mr-1" />
              3 urgent requests
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Rent Collection Trend */}
        <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <LineChart className="w-5 h-5 mr-2 text-blue-400" />
              Rent Collection Trend
            </CardTitle>
            <CardDescription className="text-slate-400">
              Monthly rent collection performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsLineChart data={rentCollectionData}>
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
                    dataKey="amount" 
                    stroke="#3B82F6" 
                    strokeWidth={3}
                    dot={{ fill: '#3B82F6', strokeWidth: 2, r: 6 }}
                    activeDot={{ r: 8, stroke: '#3B82F6', strokeWidth: 2 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="target" 
                    stroke="#10B981" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
                  />
                </RechartsLineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Occupancy Rate */}
        <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <PieChart className="w-5 h-5 mr-2 text-green-400" />
              Occupancy Rate
            </CardTitle>
            <CardDescription className="text-slate-400">
              Current property occupancy status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={occupancyData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {occupancyData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#F9FAFB'
                    }} 
                  />
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center space-x-6 mt-4">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                <span className="text-sm text-slate-300">Occupied (85%)</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-red-500 rounded-full mr-2"></div>
                <span className="text-sm text-slate-300">Vacant (15%)</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>


      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Activity className="w-5 h-5 mr-2 text-blue-400" />
              Quick Actions
            </CardTitle>
            <CardDescription className="text-slate-400">
              Common tasks and shortcuts
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full justify-start bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
              <Users className="w-4 h-4 mr-3" />
              Add New Tenant
            </Button>
            <Button variant="outline" className="w-full justify-start border-slate-600 text-slate-300 hover:bg-slate-700">
              <CreditCard className="w-4 h-4 mr-3" />
              Record Payment
            </Button>
            <Button variant="outline" className="w-full justify-start border-slate-600 text-slate-300 hover:bg-slate-700">
              <Wrench className="w-4 h-4 mr-3" />
              Create Maintenance Request
            </Button>
            <Button variant="outline" className="w-full justify-start border-slate-600 text-slate-300 hover:bg-slate-700">
              <FileText className="w-4 h-4 mr-3" />
              Generate Report
            </Button>
          </CardContent>
        </Card>

        {/* Recent Activities */}
        <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Activity className="w-5 h-5 mr-2 text-green-400" />
              Recent Activities
            </CardTitle>
            <CardDescription className="text-slate-400">
              Latest property management activities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div key={activity.id} className="flex items-start space-x-3 p-3 rounded-lg bg-slate-700/50 hover:bg-slate-700/70 transition-colors">
                  <div className={`w-2 h-2 rounded-full mt-2 ${
                    activity.type === 'payment' ? 'bg-green-500' :
                    activity.type === 'maintenance' ? 'bg-yellow-500' :
                    'bg-blue-500'
                  }`}></div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white">{activity.message}</p>
                    <p className="text-xs text-slate-400 mt-1">{activity.time}</p>
                  </div>
                  {activity.amount && (
                    <Badge variant="secondary" className="bg-green-500/20 text-green-400">
                      {activity.amount}
                    </Badge>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <Bell className="w-5 h-5 mr-2 text-red-400" />
              Notifications
            </CardTitle>
            <CardDescription className="text-slate-400">
              Important alerts and updates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {notifications.map((notification) => (
                <div key={notification.id} className="flex items-start space-x-3 p-3 rounded-lg bg-slate-700/50 hover:bg-slate-700/70 transition-colors">
                  <AlertCircle className={`w-5 h-5 mt-0.5 ${
                    notification.type === 'warning' ? 'text-yellow-500' :
                    notification.type === 'alert' ? 'text-red-500' :
                    'text-blue-500'
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white">{notification.title}</p>
                    <p className="text-xs text-slate-400 mt-1">{notification.message}</p>
                    <p className="text-xs text-slate-500 mt-1">{notification.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Upcoming Events */}
      <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Calendar className="w-5 h-5 mr-2 text-purple-400" />
            Upcoming Events & Deadlines
          </CardTitle>
          <CardDescription className="text-slate-400">
            Important dates and scheduled activities
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="p-4 rounded-lg bg-slate-700/50 hover:bg-slate-700/70 transition-colors">
                <div className="flex items-center justify-between mb-2">
                  <h4 className="text-sm font-medium text-white">{event.title}</h4>
                  <Badge 
                    variant="secondary" 
                    className={`${
                      event.priority === 'high' ? 'bg-red-500/20 text-red-400' :
                      event.priority === 'medium' ? 'bg-yellow-500/20 text-yellow-400' :
                      'bg-green-500/20 text-green-400'
                    }`}
                  >
                    {event.priority}
                  </Badge>
                </div>
                <p className="text-xs text-slate-400 mb-2">{event.date}</p>
                <div className="flex items-center text-xs text-slate-500">
                  <Calendar className="w-3 h-3 mr-1" />
                  {event.type}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}