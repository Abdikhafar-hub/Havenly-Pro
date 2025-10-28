"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts'
import {
  DollarSign,
  Plus,
  Filter,
  Download,
  Upload,
  TrendingUp,
  TrendingDown,
  Zap,
  Droplets,
  Flame,
  Wifi,
  Wrench,
  ShoppingCart,
  Receipt,
  Calendar,
  AlertCircle,
  CheckCircle,
  RefreshCw
} from 'lucide-react'

export default function ExpensesPage() {
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')
  const [selectedMonth, setSelectedMonth] = useState('2024-02')
  const [newExpenseOpen, setNewExpenseOpen] = useState(false)
  const [syncSettingsOpen, setSyncSettingsOpen] = useState(false)
  const [filterCategory, setFilterCategory] = useState('all')

  // Mock utility bills data
  const utilityBills = [
    {
      id: 'UTIL-001',
      type: 'electricity',
      provider: 'Kenya Power',
      amount: 125.50,
      dueDate: '2024-02-15',
      paidDate: '2024-02-10',
      status: 'paid',
      consumption: '450 kWh',
      icon: Zap,
      color: 'yellow'
    },
    {
      id: 'UTIL-002',
      type: 'water',
      provider: 'Nairobi Water',
      amount: 45.30,
      dueDate: '2024-02-20',
      paidDate: '2024-02-18',
      status: 'paid',
      consumption: '12 m³',
      icon: Droplets,
      color: 'blue'
    },
    {
      id: 'UTIL-003',
      type: 'gas',
      provider: 'Total Gas',
      amount: 89.75,
      dueDate: '2024-02-25',
      paidDate: null,
      status: 'pending',
      consumption: '15 kg',
      icon: Flame,
      color: 'orange'
    },
    {
      id: 'UTIL-004',
      type: 'internet',
      provider: 'Safaricom',
      amount: 65.00,
      dueDate: '2024-02-28',
      paidDate: null,
      status: 'pending',
      consumption: 'Unlimited',
      icon: Wifi,
      color: 'purple'
    }
  ]

  // Mock personal expenses data
  const personalExpenses = [
    {
      id: 'EXP-001',
      category: 'repairs',
      description: 'Kitchen faucet repair',
      amount: 35.00,
      date: '2024-02-05',
      vendor: 'Local Plumber',
      icon: Wrench,
      color: 'red'
    },
    {
      id: 'EXP-002',
      category: 'shopping',
      description: 'Groceries',
      amount: 120.50,
      date: '2024-02-08',
      vendor: 'Nakumatt',
      icon: ShoppingCart,
      color: 'green'
    },
    {
      id: 'EXP-003',
      category: 'repairs',
      description: 'Door lock replacement',
      amount: 85.00,
      date: '2024-02-12',
      vendor: 'Security Solutions',
      icon: Wrench,
      color: 'red'
    },
    {
      id: 'EXP-004',
      category: 'shopping',
      description: 'Cleaning supplies',
      amount: 25.75,
      date: '2024-02-15',
      vendor: 'Tuskys',
      icon: ShoppingCart,
      color: 'green'
    }
  ]

  // Chart data
  const expenseChartData = [
    { name: 'Electricity', value: 125.50, color: '#fbbf24' },
    { name: 'Water', value: 45.30, color: '#3b82f6' },
    { name: 'Gas', value: 89.75, color: '#f97316' },
    { name: 'Internet', value: 65.00, color: '#8b5cf6' },
    { name: 'Repairs', value: 120.00, color: '#ef4444' },
    { name: 'Shopping', value: 146.25, color: '#10b981' }
  ]

  const monthlyTrendData = [
    { month: 'Nov', utilities: 280, personal: 180, total: 460 },
    { month: 'Dec', utilities: 295, personal: 220, total: 515 },
    { month: 'Jan', utilities: 310, personal: 195, total: 505 },
    { month: 'Feb', utilities: 325, personal: 270, total: 595 }
  ]

  const getTotalExpenses = () => {
    const utilities = utilityBills.reduce((sum, bill) => sum + bill.amount, 0)
    const personal = personalExpenses.reduce((sum, exp) => sum + exp.amount, 0)
    return { utilities, personal, total: utilities + personal }
  }

  const getPendingBills = () => {
    return utilityBills.filter(bill => bill.status === 'pending')
  }

  const getOverdueBills = () => {
    const today = new Date()
    return utilityBills.filter(bill => 
      bill.status === 'pending' && new Date(bill.dueDate) < today
    )
  }

  const getFilteredExpenses = () => {
    if (filterCategory === 'all') return personalExpenses
    return personalExpenses.filter(exp => exp.category === filterCategory)
  }

  const getCategoryColor = (category: string) => {
    const colors = {
      'repairs': 'bg-red-500/20 border-red-500/30 text-red-400',
      'shopping': 'bg-green-500/20 border-green-500/30 text-green-400',
      'utilities': 'bg-blue-500/20 border-blue-500/30 text-blue-400',
      'other': 'bg-slate-500/20 border-slate-500/30 text-slate-400'
    }
    return colors[category as keyof typeof colors]
  }

  const getStatusBadge = (status: string) => {
    const styles = {
      'paid': 'bg-green-500/20 text-green-400 border-green-500/30',
      'pending': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      'overdue': 'bg-red-500/20 text-red-400 border-red-500/30'
    }
    return (
      <Badge className={styles[status as keyof typeof styles]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  const totals = getTotalExpenses()

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Expense & Utility Tracking</h1>
          <p className="text-slate-400 mt-2">Monitor your utility bills and personal expenses</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button 
            variant="outline" 
            className="border-slate-600 text-slate-300 hover:bg-slate-700"
            onClick={() => setSyncSettingsOpen(true)}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Sync Settings
          </Button>
          <Dialog open={newExpenseOpen} onOpenChange={setNewExpenseOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Add Expense
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-slate-800 border-slate-700 max-w-md">
              <DialogHeader>
                <DialogTitle className="text-white text-2xl">Add Personal Expense</DialogTitle>
                <DialogDescription className="text-slate-400">
                  Track your personal expenses and purchases
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 mt-4">
                <div>
                  <Label htmlFor="description" className="text-slate-300 mb-2 block">Description</Label>
                  <Input
                    id="description"
                    placeholder="e.g., Groceries, Repair work"
                    className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="amount" className="text-slate-300 mb-2 block">Amount (KSh)</Label>
                    <Input
                      id="amount"
                      type="number"
                      placeholder="0.00"
                      className="bg-slate-700/50 border-slate-600 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="category" className="text-slate-300 mb-2 block">Category</Label>
                    <select
                      id="category"
                      className="w-full bg-slate-700/50 border border-slate-600 text-white rounded-lg px-3 py-2"
                    >
                      <option value="shopping">Shopping</option>
                      <option value="repairs">Repairs</option>
                      <option value="utilities">Utilities</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="vendor" className="text-slate-300 mb-2 block">Vendor/Store</Label>
                  <Input
                    id="vendor"
                    placeholder="e.g., Nakumatt, Local Plumber"
                    className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400"
                  />
                </div>

                <div>
                  <Label htmlFor="date" className="text-slate-300 mb-2 block">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    className="bg-slate-700/50 border-slate-600 text-white"
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <Button
                    variant="outline"
                    className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700"
                    onClick={() => setNewExpenseOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                    onClick={() => {
                      alert('Expense added successfully!')
                      setNewExpenseOpen(false)
                    }}
                  >
                    Add Expense
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-blue-500/50 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
            <CardTitle className="text-sm font-medium text-slate-300">Total Expenses</CardTitle>
            <DollarSign className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent className="pt-2">
            <div className="text-xl font-bold text-white">KSh {totals.total.toFixed(2)}</div>
            <p className="text-xs text-blue-400">This month</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-yellow-500/50 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
            <CardTitle className="text-sm font-medium text-slate-300">Pending Bills</CardTitle>
            <AlertCircle className="h-4 w-4 text-yellow-400" />
          </CardHeader>
          <CardContent className="pt-2">
            <div className="text-xl font-bold text-white">{getPendingBills().length}</div>
            <p className="text-xs text-yellow-400">Need payment</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-red-500/50 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
            <CardTitle className="text-sm font-medium text-slate-300">Overdue</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-400" />
          </CardHeader>
          <CardContent className="pt-2">
            <div className="text-xl font-bold text-white">{getOverdueBills().length}</div>
            <p className="text-xs text-red-400">Urgent attention</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-green-500/50 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
            <CardTitle className="text-sm font-medium text-slate-300">Savings</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent className="pt-2">
            <div className="text-xl font-bold text-white">KSh 150.00</div>
            <p className="text-xs text-green-400">vs last month</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-1">
          <TabsTrigger value="overview" className="text-slate-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white">
            Overview
          </TabsTrigger>
          <TabsTrigger value="utilities" className="text-slate-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white">
            Utility Bills
          </TabsTrigger>
          <TabsTrigger value="expenses" className="text-slate-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white">
            Personal Expenses
          </TabsTrigger>
          <TabsTrigger value="analytics" className="text-slate-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white">
            Analytics
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Expense Breakdown Chart */}
            <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Expense Breakdown</CardTitle>
                <CardDescription className="text-slate-400">Distribution of expenses by category</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={expenseChartData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {expenseChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip 
                      formatter={(value: number) => [`KSh ${value.toFixed(2)}`, 'Amount']}
                      contentStyle={{ 
                        backgroundColor: '#1e293b', 
                        border: '1px solid #475569',
                        borderRadius: '8px',
                        color: '#f1f5f9'
                      }}
                    />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Monthly Trend Chart */}
            <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Monthly Trend</CardTitle>
                <CardDescription className="text-slate-400">Expense trends over the last 4 months</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={monthlyTrendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                    <XAxis dataKey="month" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip 
                      formatter={(value: number) => [`KSh ${value.toFixed(2)}`, 'Amount']}
                      contentStyle={{ 
                        backgroundColor: '#1e293b', 
                        border: '1px solid #475569',
                        borderRadius: '8px',
                        color: '#f1f5f9'
                      }}
                    />
                    <Legend />
                    <Line type="monotone" dataKey="utilities" stroke="#3b82f6" strokeWidth={2} name="Utilities" />
                    <Line type="monotone" dataKey="personal" stroke="#10b981" strokeWidth={2} name="Personal" />
                    <Line type="monotone" dataKey="total" stroke="#8b5cf6" strokeWidth={2} name="Total" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Recent Activity</CardTitle>
              <CardDescription className="text-slate-400">Latest bills and expenses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {[...utilityBills, ...personalExpenses]
                  .sort((a, b) => new Date(b.date || b.dueDate).getTime() - new Date(a.date || a.dueDate).getTime())
                  .slice(0, 5)
                  .map((item) => {
                    const Icon = item.icon
                    return (
                      <div key={item.id} className="flex items-center justify-between p-3 rounded-lg bg-slate-700/30 border border-slate-600/50">
                        <div className="flex items-center space-x-3">
                          <div className={`w-10 h-10 rounded-full bg-${item.color}-500/20 flex items-center justify-center`}>
                            <Icon className={`w-5 h-5 text-${item.color}-400`} />
                          </div>
                          <div>
                            <h4 className="text-white font-medium">{item.description || `${item.type} Bill`}</h4>
                            <p className="text-sm text-slate-400">{item.vendor || item.provider}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-white font-semibold">KSh {item.amount.toFixed(2)}</div>
                          <div className="text-xs text-slate-400">
                            {item.date ? new Date(item.date).toLocaleDateString() : new Date(item.dueDate).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    )
                  })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Utility Bills Tab */}
        <TabsContent value="utilities" className="space-y-6">
          <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Utility Bills</CardTitle>
              <CardDescription className="text-slate-400">Track your monthly utility payments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {utilityBills.map((bill) => {
                  const Icon = bill.icon
                  return (
                    <div key={bill.id} className="p-4 rounded-lg border border-slate-600/50 bg-slate-700/30">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <div className={`w-12 h-12 rounded-lg bg-${bill.color}-500/20 flex items-center justify-center`}>
                            <Icon className={`w-6 h-6 text-${bill.color}-400`} />
                          </div>
                          <div>
                            <h4 className="text-white font-semibold capitalize">{bill.type} Bill</h4>
                            <p className="text-sm text-slate-400">{bill.provider}</p>
                            <div className="flex items-center space-x-4 mt-2">
                              <span className="text-sm text-slate-400">Consumption: {bill.consumption}</span>
                              <span className="text-sm text-slate-400">Due: {new Date(bill.dueDate).toLocaleDateString()}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-white">KSh {bill.amount.toFixed(2)}</div>
                          <div className="mt-2">
                            {getStatusBadge(bill.status)}
                          </div>
                          {bill.paidDate && (
                            <div className="text-xs text-slate-400 mt-1">
                              Paid: {new Date(bill.paidDate).toLocaleDateString()}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Personal Expenses Tab */}
        <TabsContent value="expenses" className="space-y-6">
          <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white">Personal Expenses</CardTitle>
                  <CardDescription className="text-slate-400">Track your personal spending</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Filter className="w-4 h-4 text-slate-400" />
                  <select
                    value={filterCategory}
                    onChange={(e) => setFilterCategory(e.target.value)}
                    className="bg-slate-700/50 border border-slate-600 text-white rounded-lg px-3 py-2 text-sm"
                  >
                    <option value="all">All Categories</option>
                    <option value="shopping">Shopping</option>
                    <option value="repairs">Repairs</option>
                    <option value="utilities">Utilities</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {getFilteredExpenses().map((expense) => {
                  const Icon = expense.icon
                  return (
                    <div key={expense.id} className="p-4 rounded-lg border border-slate-600/50 bg-slate-700/30">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <div className={`w-12 h-12 rounded-lg bg-${expense.color}-500/20 flex items-center justify-center`}>
                            <Icon className={`w-6 h-6 text-${expense.color}-400`} />
                          </div>
                          <div>
                            <h4 className="text-white font-semibold">{expense.description}</h4>
                            <p className="text-sm text-slate-400">{expense.vendor}</p>
                            <div className="flex items-center space-x-2 mt-2">
                              <Badge className={getCategoryColor(expense.category)}>
                                {expense.category}
                              </Badge>
                              <span className="text-sm text-slate-400">
                                {new Date(expense.date).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-white">KSh {expense.amount.toFixed(2)}</div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Category Breakdown */}
            <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Category Breakdown</CardTitle>
                <CardDescription className="text-slate-400">Spending by category this month</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={expenseChartData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                    <XAxis dataKey="name" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip 
                      formatter={(value: number) => [`KSh ${value.toFixed(2)}`, 'Amount']}
                      contentStyle={{ 
                        backgroundColor: '#1e293b', 
                        border: '1px solid #475569',
                        borderRadius: '8px',
                        color: '#f1f5f9'
                      }}
                    />
                    <Bar dataKey="value" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Monthly Comparison */}
            <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Monthly Comparison</CardTitle>
                <CardDescription className="text-slate-400">Compare with previous months</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyTrendData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#475569" />
                    <XAxis dataKey="month" stroke="#94a3b8" />
                    <YAxis stroke="#94a3b8" />
                    <Tooltip 
                      formatter={(value: number) => [`KSh ${value.toFixed(2)}`, 'Amount']}
                      contentStyle={{ 
                        backgroundColor: '#1e293b', 
                        border: '1px solid #475569',
                        borderRadius: '8px',
                        color: '#f1f5f9'
                      }}
                    />
                    <Legend />
                    <Bar dataKey="utilities" fill="#3b82f6" name="Utilities" />
                    <Bar dataKey="personal" fill="#10b981" name="Personal" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Sync Settings Dialog */}
      <Dialog open={syncSettingsOpen} onOpenChange={setSyncSettingsOpen}>
        <DialogContent className="bg-slate-800 border-slate-700 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-white text-2xl">Billing System Sync</DialogTitle>
            <DialogDescription className="text-slate-400">
              Connect with property management billing system
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 mt-4">
            {/* Auto Sync Settings */}
            <div className="space-y-4">
              <h3 className="text-white font-semibold">Automatic Sync</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-700/30 border border-slate-600/50">
                  <div className="flex items-center space-x-3">
                    <Zap className="w-5 h-5 text-yellow-400" />
                    <div>
                      <p className="text-white font-medium">Electricity Bills</p>
                      <p className="text-sm text-slate-400">Auto-sync from Kenya Power</p>
                    </div>
                  </div>
                  <Switch defaultChecked className="data-[state=checked]:bg-yellow-500" />
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-700/30 border border-slate-600/50">
                  <div className="flex items-center space-x-3">
                    <Droplets className="w-5 h-5 text-blue-400" />
                    <div>
                      <p className="text-white font-medium">Water Bills</p>
                      <p className="text-sm text-slate-400">Auto-sync from Nairobi Water</p>
                    </div>
                  </div>
                  <Switch defaultChecked className="data-[state=checked]:bg-blue-500" />
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-700/30 border border-slate-600/50">
                  <div className="flex items-center space-x-3">
                    <Wifi className="w-5 h-5 text-purple-400" />
                    <div>
                      <p className="text-white font-medium">Internet Bills</p>
                      <p className="text-sm text-slate-400">Auto-sync from Safaricom</p>
                    </div>
                  </div>
                  <Switch defaultChecked={false} className="data-[state=checked]:bg-purple-500" />
                </div>
              </div>
            </div>

            {/* Manual Import/Export */}
            <div className="space-y-4">
              <h3 className="text-white font-semibold">Manual Import/Export</h3>
              <div className="grid grid-cols-2 gap-3">
                <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                  <Download className="w-4 h-4 mr-2" />
                  Export Data
                </Button>
                <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                  <Upload className="w-4 h-4 mr-2" />
                  Import Data
                </Button>
              </div>
            </div>
          </div>

          <div className="flex space-x-3 pt-4 border-t border-slate-700">
            <Button
              variant="outline"
              className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700"
              onClick={() => setSyncSettingsOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
              onClick={() => {
                alert('Sync settings saved successfully!')
                setSyncSettingsOpen(false)
              }}
            >
              Save Settings
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
