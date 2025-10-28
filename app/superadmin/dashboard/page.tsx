"use client"

import { 
  Building2, 
  UserCheck, 
  Users, 
  DollarSign,
  TrendingUp,
  TrendingDown,
  Plus,
  FileText,
  BarChart3,
  Receipt
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

// Mock data for charts
const monthlyRentData = [
  { month: 'Jan', amount: 8500 },
  { month: 'Feb', amount: 9200 },
  { month: 'Mar', amount: 8800 },
  { month: 'Apr', amount: 9600 },
  { month: 'May', amount: 10200 },
  { month: 'Jun', amount: 9800 },
  { month: 'Jul', amount: 10500 },
  { month: 'Aug', amount: 11200 },
  { month: 'Sep', amount: 10800 },
  { month: 'Oct', amount: 11600 },
  { month: 'Nov', amount: 12400 },
  { month: 'Dec', amount: 12000 },
]

const subscriptionPlansData = [
  { name: 'Basic', value: 2, color: '#10B981' },
  { name: 'Pro', value: 1, color: '#3B82F6' },
  { name: 'Enterprise', value: 2, color: '#8B5CF6' },
]

const recentActivities = [
  {
    id: 1,
    description: 'New property added – Sunrise Apartments',
    date: '2024-01-15',
    user: 'John Smith',
    status: 'Success'
  },
  {
    id: 2,
    description: 'Property admin created – Sarah Johnson',
    date: '2024-01-14',
    user: 'Admin System',
    status: 'Success'
  },
  {
    id: 3,
    description: 'Tenant payment received – Unit 3A',
    date: '2024-01-14',
    user: 'Payment System',
    status: 'Success'
  },
  {
    id: 4,
    description: 'Property maintenance scheduled – Oak Manor',
    date: '2024-01-13',
    user: 'Mike Wilson',
    status: 'Pending'
  },
  {
    id: 5,
    description: 'Failed to process payment – Unit 2B',
    date: '2024-01-12',
    user: 'Payment System',
    status: 'Error'
  },
]

const analyticsCards = [
  {
    title: 'Total Properties',
    value: '5',
    icon: Building2,
    trend: '+5 new this month',
    trendDirection: 'up',
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30'
  },
  {
    title: 'Total Users',
    value: '133',
    icon: Users,
    trend: '+108 new this month',
    trendDirection: 'up',
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/30'
  },
  {
    title: 'Monthly Revenue',
    value: '$955',
    icon: DollarSign,
    trend: '5 active subscriptions',
    trendDirection: 'up',
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/30'
  },
  {
    title: 'Conversion Rate',
    value: '100%',
    icon: BarChart3,
    trend: 'Active properties',
    trendDirection: 'up',
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/10',
    borderColor: 'border-yellow-500/30'
  },
]

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'Success':
      return <Badge className="bg-green-100 text-green-800 hover:bg-green-100">Success</Badge>
    case 'Pending':
      return <Badge className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>
    case 'Error':
      return <Badge className="bg-red-100 text-red-800 hover:bg-red-100">Error</Badge>
    default:
      return <Badge variant="secondary">{status}</Badge>
  }
}

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-blue-400">Super Admin Dashboard</h1>
        <p className="text-slate-400 mt-2">Comprehensive platform overview and analytics</p>
      </div>

      {/* Analytics Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {analyticsCards.map((card, index) => {
          const Icon = card.icon
          return (
            <div key={index} className={`bg-slate-800 border-l-4 ${card.borderColor} rounded-lg p-4 hover:bg-slate-750 transition-colors duration-200`}>
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <p className="text-xs font-medium text-slate-400 mb-1">{card.title}</p>
                  <p className="text-2xl font-bold text-white mb-1">{card.value}</p>
                  <p className="text-xs text-slate-500">{card.trend}</p>
                </div>
                <div className={`p-2 rounded-lg ${card.bgColor}`}>
                  <Icon className={`w-5 h-5 ${card.color}`} />
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart */}
        <Card className="bg-slate-800 border-slate-700 border-2 border-blue-500/20">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-blue-400">User Growth 2025</CardTitle>
            <p className="text-sm text-slate-400">User registration trends by month</p>
          </CardHeader>
          <CardContent className="pt-0">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyRentData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#4b5563" strokeOpacity={0.6} />
                <XAxis 
                  dataKey="month" 
                  tick={{ fontSize: 12, fill: '#9ca3af' }}
                  axisLine={true}
                  tickLine={true}
                  tickMargin={8}
                  stroke="#6b7280"
                />
                <YAxis 
                  tick={{ fontSize: 12, fill: '#9ca3af' }}
                  axisLine={true}
                  tickLine={true}
                  tickMargin={8}
                  stroke="#6b7280"
                  tickFormatter={(value) => `${value}`}
                />
                <Tooltip 
                  formatter={(value) => [`${value}`, 'Users']}
                  labelStyle={{ color: '#f9fafb', fontSize: '12px', fontWeight: '500' }}
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3)',
                    fontSize: '12px',
                    padding: '8px 12px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="amount" 
                  stroke="#fbbf24" 
                  strokeWidth={3}
                  dot={{ fill: '#fbbf24', strokeWidth: 0, r: 5 }}
                  activeDot={{ r: 7, stroke: '#fbbf24', strokeWidth: 3, fill: '#1f2937' }}
                  connectNulls={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Pie Chart */}
        <Card className="bg-slate-800 border-slate-700 border-2 border-blue-500/20">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-blue-400">Subscription Plans</CardTitle>
            <p className="text-sm text-slate-400">Distribution of properties across plans</p>
          </CardHeader>
          <CardContent className="pt-0">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={subscriptionPlansData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {subscriptionPlansData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value}`, 'Properties']}
                  labelStyle={{ color: '#f9fafb', fontSize: '12px' }}
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3)',
                    fontSize: '12px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center space-x-6 mt-4">
              {subscriptionPlansData.map((item, index) => (
                <div key={index} className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-slate-400">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Properties */}
        <Card className="bg-slate-800 border-slate-700 border-2 border-blue-500/20">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-blue-400">Top Properties</CardTitle>
            <p className="text-sm text-slate-400">Most active properties by tenant count</p>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-slate-700 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h4 className="text-white font-medium">Sunrise Apartments</h4>
                    <p className="text-sm text-slate-400">92 tenants</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">BASIC</Badge>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">active</Badge>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="bg-slate-800 border-slate-700 border-2 border-blue-500/20">
          <CardHeader className="pb-4">
            <CardTitle className="text-lg font-semibold text-blue-400">Quick Actions</CardTitle>
            <p className="text-sm text-slate-400">Common tasks and shortcuts</p>
          </CardHeader>
          <CardContent className="pt-0">
            <div className="space-y-3">
              <Button className="w-full h-12 bg-slate-700 hover:bg-slate-600 text-white text-sm font-medium justify-start">
                <Building2 className="w-5 h-5 mr-3" />
                Manage Properties
              </Button>
              <Button className="w-full h-12 bg-slate-700 hover:bg-slate-600 text-white text-sm font-medium justify-start">
                <Users className="w-5 h-5 mr-3" />
                View All Tenants
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
