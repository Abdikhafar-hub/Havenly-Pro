"use client"

import { useState } from 'react'
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Filter,
  Search,
  Download,
  Send,
  Plus,
  Eye,
  Edit,
  Trash2,
  Calendar,
  CreditCard,
  Smartphone,
  Banknote,
  FileText,
  BarChart3,
  PieChart,
  Activity,
  Bell,
  Settings,
  RefreshCw,
  ChevronDown,
  MoreHorizontal,
  Target,
  Zap,
  Users,
  Building2,
  ArrowUpRight,
  ArrowDownRight,
  Circle
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart as RechartsPieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'

// Mock data for charts and analytics
const rentCollectionData = [
  { month: 'Jan', collected: 45000, target: 50000, late: 2000 },
  { month: 'Feb', collected: 48000, target: 50000, late: 1500 },
  { month: 'Mar', collected: 52000, target: 50000, late: 800 },
  { month: 'Apr', collected: 49000, target: 50000, late: 1200 },
  { month: 'May', collected: 51000, target: 50000, late: 600 },
  { month: 'Jun', collected: 53000, target: 50000, late: 400 }
]

const paymentMethodData = [
  { name: 'M-Pesa', value: 65, color: '#10B981' },
  { name: 'Bank Transfer', value: 25, color: '#3B82F6' },
  { name: 'Cash', value: 10, color: '#F59E0B' }
]

const latePaymentsData = [
  { unit: 'A101', tenant: 'John Doe', days: 5, amount: 25000 },
  { unit: 'B203', tenant: 'Jane Smith', days: 12, amount: 30000 },
  { unit: 'C305', tenant: 'Mike Johnson', days: 8, amount: 28000 },
  { unit: 'D401', tenant: 'Sarah Wilson', days: 15, amount: 32000 }
]

const paymentsData = [
  {
    id: 1,
    tenant: 'John Doe',
    unit: 'A101',
    monthlyRent: 25000,
    amountPaid: 25000,
    paymentMethod: 'M-Pesa',
    dueDate: '2024-01-01',
    status: 'Paid',
    paidDate: '2024-01-01',
    reference: 'MP240101001'
  },
  {
    id: 2,
    tenant: 'Jane Smith',
    unit: 'B203',
    monthlyRent: 30000,
    amountPaid: 15000,
    paymentMethod: 'Bank Transfer',
    dueDate: '2024-01-01',
    status: 'Partially Paid',
    paidDate: '2024-01-05',
    reference: 'BT240105002'
  },
  {
    id: 3,
    tenant: 'Mike Johnson',
    unit: 'C305',
    monthlyRent: 28000,
    amountPaid: 0,
    paymentMethod: 'M-Pesa',
    dueDate: '2024-01-01',
    status: 'Late',
    paidDate: null,
    reference: null
  },
  {
    id: 4,
    tenant: 'Sarah Wilson',
    unit: 'D401',
    monthlyRent: 32000,
    amountPaid: 32000,
    paymentMethod: 'Cash',
    dueDate: '2024-01-01',
    status: 'Paid',
    paidDate: '2024-01-02',
    reference: 'CASH240102004'
  },
  {
    id: 5,
    tenant: 'David Brown',
    unit: 'E502',
    monthlyRent: 27000,
    amountPaid: 0,
    paymentMethod: 'M-Pesa',
    dueDate: '2024-01-01',
    status: 'Pending',
    paidDate: null,
    reference: null
  }
]

const activityData = [
  { time: '10:30 AM', action: 'Payment received', tenant: 'John Doe', amount: 25000, method: 'M-Pesa' },
  { time: '09:15 AM', action: 'Reminder sent', tenant: 'Mike Johnson', amount: 28000, method: 'SMS' },
  { time: '08:45 AM', action: 'Payment recorded', tenant: 'Sarah Wilson', amount: 32000, method: 'Cash' },
  { time: 'Yesterday', action: 'Late fee applied', tenant: 'Jane Smith', amount: 500, method: 'System' }
]

export default function PaymentsPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [methodFilter, setMethodFilter] = useState('all')
  const [isManualPaymentOpen, setIsManualPaymentOpen] = useState(false)
  const [selectedPayments, setSelectedPayments] = useState<number[]>([])

  const filteredPayments = paymentsData.filter(payment => {
    const matchesSearch = payment.tenant.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.unit.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || payment.status.toLowerCase() === statusFilter.toLowerCase()
    const matchesMethod = methodFilter === 'all' || payment.paymentMethod.toLowerCase() === methodFilter.toLowerCase()
    return matchesSearch && matchesStatus && matchesMethod
  })

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Paid':
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Paid</Badge>
      case 'Pending':
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Pending</Badge>
      case 'Late':
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Late</Badge>
      case 'Partially Paid':
        return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">Partially Paid</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case 'M-Pesa':
        return <Smartphone className="w-4 h-4 text-green-400" />
      case 'Bank Transfer':
        return <CreditCard className="w-4 h-4 text-blue-400" />
      case 'Cash':
        return <Banknote className="w-4 h-4 text-yellow-400" />
      default:
        return <CreditCard className="w-4 h-4 text-slate-400" />
    }
  }

  const totalCollected = paymentsData.filter(p => p.status === 'Paid').reduce((sum, p) => sum + p.amountPaid, 0)
  const totalPending = paymentsData.filter(p => p.status === 'Pending').reduce((sum, p) => sum + p.monthlyRent, 0)
  const totalLate = paymentsData.filter(p => p.status === 'Late').reduce((sum, p) => sum + p.monthlyRent, 0)
  const totalOutstanding = paymentsData.filter(p => p.status !== 'Paid').reduce((sum, p) => sum + (p.monthlyRent - p.amountPaid), 0)
  const completionRate = Math.round((paymentsData.filter(p => p.status === 'Paid').length / paymentsData.length) * 100)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center">
            <DollarSign className="w-8 h-8 mr-3" />
            Payments Management
          </h1>
          <p className="text-slate-400 mt-2">Financial mission control center for rent collection and payment analytics</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button 
            variant="outline" 
            className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
          >
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => setIsManualPaymentOpen(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Record Payment
          </Button>
        </div>
      </div>

      {/* Financial Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-slate-800 border-slate-700 border-2 border-green-500/20 rounded-xl hover:border-green-500/40 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium">Total Collected</p>
                <p className="text-2xl font-bold text-white">KSh {totalCollected.toLocaleString()}</p>
                <div className="flex items-center mt-2">
                  <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                  <span className="text-green-400 text-sm">+12% vs last month</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700 border-2 border-yellow-500/20 rounded-xl hover:border-yellow-500/40 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium">Pending Payments</p>
                <p className="text-2xl font-bold text-white">KSh {totalPending.toLocaleString()}</p>
                <div className="flex items-center mt-2">
                  <Clock className="w-4 h-4 text-yellow-400 mr-1" />
                  <span className="text-yellow-400 text-sm">{paymentsData.filter(p => p.status === 'Pending').length} tenants</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-yellow-500/20 rounded-full flex items-center justify-center">
                <Clock className="w-6 h-6 text-yellow-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700 border-2 border-red-500/20 rounded-xl hover:border-red-500/40 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium">Late Payments</p>
                <p className="text-2xl font-bold text-white">KSh {totalLate.toLocaleString()}</p>
                <div className="flex items-center mt-2">
                  <AlertTriangle className="w-4 h-4 text-red-400 mr-1" />
                  <span className="text-red-400 text-sm">{paymentsData.filter(p => p.status === 'Late').length} overdue</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-red-500/20 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-6 h-6 text-red-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700 border-2 border-blue-500/20 rounded-xl hover:border-blue-500/40 transition-all duration-300">
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-sm font-medium">Completion Rate</p>
                <p className="text-2xl font-bold text-white">{completionRate}%</p>
                <div className="mt-2">
                  <Progress value={completionRate} className="h-2" />
                </div>
              </div>
              <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                <Target className="w-6 h-6 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-800 border-slate-700 border-2 border-emerald-500/20 rounded-xl">
          <CardHeader className="pb-4">
            <CardTitle className="text-white text-lg flex items-center">
              <BarChart3 className="w-5 h-5 mr-2" />
              Rent Collection Trend
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={rentCollectionData}>
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
                <Area 
                  type="monotone" 
                  dataKey="collected" 
                  stroke="#10B981" 
                  fill="#10B981" 
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
                <Line 
                  type="monotone" 
                  dataKey="target" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  strokeDasharray="5 5"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700 border-2 border-purple-500/20 rounded-xl">
          <CardHeader className="pb-4">
            <CardTitle className="text-white text-lg flex items-center">
              <PieChart className="w-5 h-5 mr-2" />
              Payment Methods Distribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={paymentMethodData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {paymentMethodData.map((entry, index) => (
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
                <Legend />
              </RechartsPieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Payment Management Table */}
      <Card className="bg-slate-800 border-slate-700 border-2 border-cyan-500/20 rounded-xl">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-white text-lg flex items-center">
              <CreditCard className="w-5 h-5 mr-2" />
              Payment Management
            </CardTitle>
            <div className="flex items-center space-x-3">
              <Button 
                variant="outline" 
                size="sm"
                className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
              >
                <Send className="w-4 h-4 mr-2" />
                Send Reminders
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
              >
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Search by tenant or unit..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-700 border-slate-600 text-white"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-48 bg-slate-700 border-slate-600">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="late">Late</SelectItem>
                <SelectItem value="partially paid">Partially Paid</SelectItem>
              </SelectContent>
            </Select>
            <Select value={methodFilter} onValueChange={setMethodFilter}>
              <SelectTrigger className="w-full sm:w-48 bg-slate-700 border-slate-600">
                <CreditCard className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Payment method" />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                <SelectItem value="all">All Methods</SelectItem>
                <SelectItem value="m-pesa">M-Pesa</SelectItem>
                <SelectItem value="bank transfer">Bank Transfer</SelectItem>
                <SelectItem value="cash">Cash</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left text-sm font-medium text-slate-400 py-3">Tenant</th>
                  <th className="text-left text-sm font-medium text-slate-400 py-3">Unit</th>
                  <th className="text-left text-sm font-medium text-slate-400 py-3">Monthly Rent</th>
                  <th className="text-left text-sm font-medium text-slate-400 py-3">Amount Paid</th>
                  <th className="text-left text-sm font-medium text-slate-400 py-3">Method</th>
                  <th className="text-left text-sm font-medium text-slate-400 py-3">Due Date</th>
                  <th className="text-left text-sm font-medium text-slate-400 py-3">Status</th>
                  <th className="text-left text-sm font-medium text-slate-400 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredPayments.map((payment) => (
                  <tr key={payment.id} className="border-b border-slate-700/50 hover:bg-slate-700/30">
                    <td className="py-3">
                      <span className="text-white font-medium">{payment.tenant}</span>
                    </td>
                    <td className="py-3">
                      <span className="text-slate-300">{payment.unit}</span>
                    </td>
                    <td className="py-3">
                      <span className="text-white font-medium">KSh {payment.monthlyRent.toLocaleString()}</span>
                    </td>
                    <td className="py-3">
                      <span className="text-white font-medium">KSh {payment.amountPaid.toLocaleString()}</span>
                    </td>
                    <td className="py-3">
                      <div className="flex items-center">
                        {getPaymentMethodIcon(payment.paymentMethod)}
                        <span className="text-slate-300 ml-2">{payment.paymentMethod}</span>
                      </div>
                    </td>
                    <td className="py-3">
                      <span className="text-slate-300">{new Date(payment.dueDate).toLocaleDateString()}</span>
                    </td>
                    <td className="py-3">
                      {getStatusBadge(payment.status)}
                    </td>
                    <td className="py-3">
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-blue-400 hover:text-blue-300">
                          <Send className="w-4 h-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="bg-slate-700 border-slate-600">
                            <DropdownMenuItem className="text-white hover:bg-slate-600">
                              <FileText className="w-4 h-4 mr-2" />
                              View Receipt
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-white hover:bg-slate-600">
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Mark as Paid
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="bg-slate-600" />
                            <DropdownMenuItem className="text-red-400 hover:bg-slate-600">
                              <Trash2 className="w-4 h-4 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Insights & Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Financial Summary */}
        <Card className="bg-slate-800 border-slate-700 border-2 border-indigo-500/20 rounded-xl">
          <CardHeader className="pb-4">
            <CardTitle className="text-white text-lg flex items-center">
              <BarChart3 className="w-5 h-5 mr-2" />
              Financial Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-slate-400">Total Revenue:</span>
                <span className="text-white font-semibold">KSh {(totalCollected + totalPending + totalLate).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Collected:</span>
                <span className="text-green-400 font-semibold">KSh {totalCollected.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Outstanding:</span>
                <span className="text-red-400 font-semibold">KSh {totalOutstanding.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Recovery Rate:</span>
                <span className="text-blue-400 font-semibold">{Math.round((totalCollected / (totalCollected + totalOutstanding)) * 100)}%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top Delinquent Tenants */}
        <Card className="bg-slate-800 border-slate-700 border-2 border-red-500/20 rounded-xl">
          <CardHeader className="pb-4">
            <CardTitle className="text-white text-lg flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2" />
              Top Delinquent Tenants
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {latePaymentsData.map((tenant, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                  <div>
                    <p className="text-white font-medium">{tenant.tenant}</p>
                    <p className="text-slate-400 text-sm">{tenant.unit}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-red-400 font-semibold">KSh {tenant.amount.toLocaleString()}</p>
                    <p className="text-slate-400 text-sm">{tenant.days} days late</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity */}
        <Card className="bg-slate-800 border-slate-700 border-2 border-teal-500/20 rounded-xl">
          <CardHeader className="pb-4">
            <CardTitle className="text-white text-lg flex items-center">
              <Activity className="w-5 h-5 mr-2" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {activityData.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mt-2"></div>
                  <div className="flex-1">
                    <p className="text-white text-sm">{activity.action}</p>
                    <p className="text-slate-400 text-xs">{activity.tenant} - KSh {activity.amount.toLocaleString()}</p>
                    <p className="text-slate-500 text-xs">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Manual Payment Modal */}
      <Dialog open={isManualPaymentOpen} onOpenChange={setIsManualPaymentOpen}>
        <DialogContent className="bg-slate-800 border-slate-700 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-white text-xl">Record Manual Payment</DialogTitle>
            <DialogDescription className="text-slate-400">
              Add a new payment record for a tenant
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-slate-300 text-sm font-medium">Tenant</label>
                <Select>
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white mt-2">
                    <SelectValue placeholder="Select tenant" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-700 border-slate-600">
                    <SelectItem value="john">John Doe - A101</SelectItem>
                    <SelectItem value="jane">Jane Smith - B203</SelectItem>
                    <SelectItem value="mike">Mike Johnson - C305</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-slate-300 text-sm font-medium">Amount</label>
                <Input 
                  type="number" 
                  className="bg-slate-700 border-slate-600 text-white mt-2" 
                  placeholder="25000" 
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-slate-300 text-sm font-medium">Payment Method</label>
                <Select>
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white mt-2">
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-700 border-slate-600">
                    <SelectItem value="mpesa">M-Pesa</SelectItem>
                    <SelectItem value="bank">Bank Transfer</SelectItem>
                    <SelectItem value="cash">Cash</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-slate-300 text-sm font-medium">Date</label>
                <Input 
                  type="date" 
                  className="bg-slate-700 border-slate-600 text-white mt-2" 
                />
              </div>
            </div>
            <div>
              <label className="text-slate-300 text-sm font-medium">Reference Number</label>
              <Input 
                className="bg-slate-700 border-slate-600 text-white mt-2" 
                placeholder="MP240101001" 
              />
            </div>
            <div className="flex justify-end space-x-3">
              <Button 
                variant="outline" 
                onClick={() => setIsManualPaymentOpen(false)}
                className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
              >
                Cancel
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Record Payment
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
