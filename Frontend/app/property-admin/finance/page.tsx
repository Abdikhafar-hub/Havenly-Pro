"use client"

import { useState, useEffect } from 'react'
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown,
  Plus,
  Download,
  Filter,
  Calendar,
  Building2,
  PieChart,
  BarChart3,
  FileText,
  Calculator,
  Tag,
  Receipt,
  AlertCircle,
  CheckCircle,
  XCircle,
  Eye,
  Edit,
  Trash2,
  Search
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
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
  Cell,
  BarChart,
  Bar,
  Area,
  AreaChart
} from 'recharts'

// Mock data for demonstration
const properties = [
  { id: 1, name: 'Sunset Apartments', address: '123 Main St, City', units: 24, monthlyRent: 45000 },
  { id: 2, name: 'Garden Complex', address: '456 Oak Ave, City', units: 18, monthlyRent: 32000 },
  { id: 3, name: 'Downtown Plaza', address: '789 Business Blvd, City', units: 32, monthlyRent: 68000 },
]

const expenseCategories = [
  { id: 1, name: 'Repairs & Maintenance', color: '#EF4444', icon: '🔧' },
  { id: 2, name: 'Cleaning Services', color: '#10B981', icon: '🧹' },
  { id: 3, name: 'Insurance', color: '#3B82F6', icon: '🛡️' },
  { id: 4, name: 'Property Taxes', color: '#F59E0B', icon: '🏛️' },
  { id: 5, name: 'Utilities', color: '#8B5CF6', icon: '⚡' },
  { id: 6, name: 'Marketing', color: '#EC4899', icon: '📢' },
  { id: 7, name: 'Legal Fees', color: '#6B7280', icon: '⚖️' },
  { id: 8, name: 'Other', color: '#9CA3AF', icon: '📋' },
]

const monthlyFinancialData = [
  { month: 'Jan', income: 145000, expenses: 32000, netProfit: 113000 },
  { month: 'Feb', income: 142000, expenses: 28000, netProfit: 114000 },
  { month: 'Mar', income: 148000, expenses: 35000, netProfit: 113000 },
  { month: 'Apr', income: 150000, expenses: 31000, netProfit: 119000 },
  { month: 'May', income: 152000, expenses: 29000, netProfit: 123000 },
  { month: 'Jun', income: 155000, expenses: 33000, netProfit: 122000 },
]

const expenseBreakdownData = [
  { name: 'Repairs & Maintenance', value: 45000, color: '#EF4444' },
  { name: 'Insurance', value: 18000, color: '#3B82F6' },
  { name: 'Property Taxes', value: 15000, color: '#F59E0B' },
  { name: 'Utilities', value: 12000, color: '#8B5CF6' },
  { name: 'Cleaning Services', value: 8000, color: '#10B981' },
  { name: 'Marketing', value: 5000, color: '#EC4899' },
  { name: 'Other', value: 3000, color: '#9CA3AF' },
]

const recentExpenses = [
  { 
    id: 1, 
    description: 'HVAC repair for Unit 205', 
    amount: 1250, 
    category: 'Repairs & Maintenance', 
    property: 'Sunset Apartments',
    date: '2024-01-15',
    status: 'paid',
    tags: ['urgent', 'hvac']
  },
  { 
    id: 2, 
    description: 'Monthly cleaning service', 
    amount: 800, 
    category: 'Cleaning Services', 
    property: 'Garden Complex',
    date: '2024-01-14',
    status: 'paid',
    tags: ['recurring']
  },
  { 
    id: 3, 
    description: 'Property insurance premium', 
    amount: 2400, 
    category: 'Insurance', 
    property: 'Downtown Plaza',
    date: '2024-01-12',
    status: 'paid',
    tags: ['quarterly']
  },
  { 
    id: 4, 
    description: 'Marketing campaign for new units', 
    amount: 1500, 
    category: 'Marketing', 
    property: 'Sunset Apartments',
    date: '2024-01-10',
    status: 'pending',
    tags: ['advertising']
  },
  { 
    id: 5, 
    description: 'Property tax payment', 
    amount: 8500, 
    category: 'Property Taxes', 
    property: 'All Properties',
    date: '2024-01-08',
    status: 'paid',
    tags: ['quarterly', 'tax']
  },
]

export default function FinancePage() {
  const [mounted, setMounted] = useState(false)
  const [selectedProperty, setSelectedProperty] = useState('all')
  const [selectedMonth, setSelectedMonth] = useState('2024-01')
  const [selectedYear, setSelectedYear] = useState('2024')
  const [searchTerm, setSearchTerm] = useState('')
  const [isAddExpenseOpen, setIsAddExpenseOpen] = useState(false)
  const [isMoneyInOpen, setIsMoneyInOpen] = useState(false)
  const [isMoneyOutOpen, setIsMoneyOutOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const filteredExpenses = recentExpenses.filter(expense => {
    const matchesSearch = expense.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         expense.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         expense.property.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })

  const totalIncome = monthlyFinancialData.reduce((sum, item) => sum + item.income, 0)
  const totalExpenses = monthlyFinancialData.reduce((sum, item) => sum + item.expenses, 0)
  const totalNetProfit = totalIncome - totalExpenses

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Expense & Finance Tracking</h1>
          <p className="text-slate-400 mt-2">Track all property-related finances, expenses, and profitability.</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button 
            onClick={() => setIsMoneyInOpen(true)}
            className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
          >
            <TrendingUp className="w-4 h-4 mr-2" />
            Money In
          </Button>
          <Button 
            onClick={() => setIsMoneyOutOpen(true)}
            className="bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white"
          >
            <TrendingDown className="w-4 h-4 mr-2" />
            Money Out
          </Button>
          <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Financial Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 hover:border-green-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-green-500/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Total Income</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">${totalIncome.toLocaleString()}</div>
            <p className="text-xs text-green-400 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +8.2% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 hover:border-red-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-red-500/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Total Expenses</CardTitle>
            <TrendingDown className="h-4 w-4 text-red-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">${totalExpenses.toLocaleString()}</div>
            <p className="text-xs text-red-400 flex items-center">
              <TrendingDown className="h-3 w-3 mr-1" />
              +3.1% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 hover:border-blue-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Net Profit</CardTitle>
            <Calculator className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">${totalNetProfit.toLocaleString()}</div>
            <p className="text-xs text-green-400 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +12.5% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 hover:border-yellow-500/50 transition-all duration-300 hover:shadow-xl hover:shadow-yellow-500/10">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Profit Margin</CardTitle>
            <PieChart className="h-4 w-4 text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">78.2%</div>
            <p className="text-xs text-green-400 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +2.1% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters and Controls */}
      <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
        <CardContent className="pt-6">
          <div className="flex flex-col lg:flex-row gap-4">
            <div className="flex-1">
              <Label htmlFor="search" className="text-slate-300 mb-2 block">Search Expenses</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  id="search"
                  placeholder="Search by description, category, or property..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div>
                <Label htmlFor="property" className="text-slate-300 mb-2 block">Property</Label>
                <Select value={selectedProperty} onValueChange={setSelectedProperty}>
                  <SelectTrigger className="w-48 bg-slate-700 border-slate-600 text-white">
                    <SelectValue placeholder="Select property" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Properties</SelectItem>
                    {properties.map((property) => (
                      <SelectItem key={property.id} value={property.name}>
                        {property.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="month" className="text-slate-300 mb-2 block">Month</Label>
                <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                  <SelectTrigger className="w-32 bg-slate-700 border-slate-600 text-white">
                    <SelectValue placeholder="Month" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="2024-01">Jan 2024</SelectItem>
                    <SelectItem value="2024-02">Feb 2024</SelectItem>
                    <SelectItem value="2024-03">Mar 2024</SelectItem>
                    <SelectItem value="2024-04">Apr 2024</SelectItem>
                    <SelectItem value="2024-05">May 2024</SelectItem>
                    <SelectItem value="2024-06">Jun 2024</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Income vs Expenses Trend */}
        <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <BarChart3 className="w-5 h-5 mr-2 text-blue-400" />
              Income vs Expenses Trend
            </CardTitle>
            <CardDescription className="text-slate-400">
              Monthly financial performance overview
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsLineChart data={monthlyFinancialData}>
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
                    dataKey="income" 
                    stroke="#10B981" 
                    strokeWidth={3}
                    dot={{ fill: '#10B981', strokeWidth: 2, r: 6 }}
                    activeDot={{ r: 8, stroke: '#10B981', strokeWidth: 2 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="expenses" 
                    stroke="#EF4444" 
                    strokeWidth={3}
                    dot={{ fill: '#EF4444', strokeWidth: 2, r: 6 }}
                    activeDot={{ r: 8, stroke: '#EF4444', strokeWidth: 2 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="netProfit" 
                    stroke="#3B82F6" 
                    strokeWidth={3}
                    strokeDasharray="5 5"
                    dot={{ fill: '#3B82F6', strokeWidth: 2, r: 6 }}
                    activeDot={{ r: 8, stroke: '#3B82F6', strokeWidth: 2 }}
                  />
                </RechartsLineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Expense Breakdown */}
        <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <PieChart className="w-5 h-5 mr-2 text-green-400" />
              Expense Breakdown
            </CardTitle>
            <CardDescription className="text-slate-400">
              Distribution of expenses by category
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <RechartsPieChart>
                  <Pie
                    data={expenseBreakdownData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {expenseBreakdownData.map((entry, index) => (
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
            <div className="grid grid-cols-2 gap-2 mt-4">
              {expenseBreakdownData.map((item, index) => (
                <div key={index} className="flex items-center text-sm">
                  <div 
                    className="w-3 h-3 rounded-full mr-2" 
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <span className="text-slate-300">{item.name}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Property-wise Financial Overview */}
      <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Building2 className="w-5 h-5 mr-2 text-purple-400" />
            Property-wise Financial Overview
          </CardTitle>
          <CardDescription className="text-slate-400">
            Income, expenses, and net profit for each property
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map((property) => {
              const propertyExpenses = Math.floor(Math.random() * 15000) + 10000
              const propertyIncome = property.monthlyRent
              const netProfit = propertyIncome - propertyExpenses
              const profitMargin = ((netProfit / propertyIncome) * 100).toFixed(1)

              return (
                <div key={property.id} className="p-4 rounded-lg bg-slate-700/50 hover:bg-slate-700/70 transition-colors">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="text-lg font-semibold text-white">{property.name}</h4>
                    <Badge variant="secondary" className="bg-blue-500/20 text-blue-400">
                      {property.units} units
                    </Badge>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Monthly Income:</span>
                      <span className="text-green-400 font-medium">${propertyIncome.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Monthly Expenses:</span>
                      <span className="text-red-400 font-medium">${propertyExpenses.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Net Profit:</span>
                      <span className="text-blue-400 font-medium">${netProfit.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-400">Profit Margin:</span>
                      <span className="text-yellow-400 font-medium">{profitMargin}%</span>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recent Expenses Table */}
      <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white flex items-center">
            <Receipt className="w-5 h-5 mr-2 text-orange-400" />
            Recent Expenses
          </CardTitle>
          <CardDescription className="text-slate-400">
            Latest expense entries and their status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredExpenses.map((expense) => (
              <div key={expense.id} className="flex items-center justify-between p-4 rounded-lg bg-slate-700/50 hover:bg-slate-700/70 transition-colors">
                <div className="flex items-center space-x-4">
                  <div className={`w-3 h-3 rounded-full ${
                    expense.status === 'paid' ? 'bg-green-500' :
                    expense.status === 'pending' ? 'bg-yellow-500' :
                    'bg-red-500'
                  }`}></div>
                  <div>
                    <h4 className="text-sm font-medium text-white">{expense.description}</h4>
                    <div className="flex items-center space-x-4 text-xs text-slate-400 mt-1">
                      <span>{expense.property}</span>
                      <span>•</span>
                      <span>{expense.category}</span>
                      <span>•</span>
                      <span>{expense.date}</span>
                    </div>
                    <div className="flex items-center space-x-2 mt-2">
                      {expense.tags.map((tag, index) => (
                        <Badge key={index} variant="secondary" className="text-xs bg-slate-600 text-slate-300">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="text-right">
                    <div className="text-lg font-semibold text-white">${expense.amount.toLocaleString()}</div>
                    <Badge 
                      variant="secondary" 
                      className={`text-xs ${
                        expense.status === 'paid' ? 'bg-green-500/20 text-green-400' :
                        expense.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' :
                        'bg-red-500/20 text-red-400'
                      }`}
                    >
                      {expense.status}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white">
                      <Eye className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white">
                      <Edit className="w-4 h-4" />
                    </Button>
                    <Button size="sm" variant="ghost" className="text-slate-400 hover:text-red-400">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Money In Dialog */}
      <Dialog open={isMoneyInOpen} onOpenChange={setIsMoneyInOpen}>
        <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center">
              <TrendingUp className="w-5 h-5 mr-2 text-green-400" />
              Record Money In
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              Record income, rent payments, and other money coming in
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="income-description" className="text-slate-300 mb-2 block">Description</Label>
                <Input
                  id="income-description"
                  placeholder="e.g., Rent payment from John Doe"
                  className="bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                />
              </div>
              <div>
                <Label htmlFor="income-amount" className="text-slate-300 mb-2 block">Amount</Label>
                <Input
                  id="income-amount"
                  type="number"
                  placeholder="0.00"
                  className="bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="income-category" className="text-slate-300 mb-2 block">Income Type</Label>
                <Select>
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                    <SelectValue placeholder="Select income type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="rent">Rent Payment</SelectItem>
                    <SelectItem value="deposit">Security Deposit</SelectItem>
                    <SelectItem value="late-fee">Late Fee</SelectItem>
                    <SelectItem value="pet-fee">Pet Fee</SelectItem>
                    <SelectItem value="application-fee">Application Fee</SelectItem>
                    <SelectItem value="other">Other Income</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="income-property" className="text-slate-300 mb-2 block">Property</Label>
                <Select>
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                    <SelectValue placeholder="Select property" />
                  </SelectTrigger>
                  <SelectContent>
                    {properties.map((property) => (
                      <SelectItem key={property.id} value={property.name}>
                        {property.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="income-date" className="text-slate-300 mb-2 block">Payment Date</Label>
                <Input
                  id="income-date"
                  type="date"
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>
              <div>
                <Label htmlFor="income-tenant" className="text-slate-300 mb-2 block">Tenant/Unit</Label>
                <Input
                  id="income-tenant"
                  placeholder="e.g., John Doe - Unit 205"
                  className="bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="income-payment-method" className="text-slate-300 mb-2 block">Payment Method</Label>
              <Select>
                <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                  <SelectValue placeholder="Select payment method" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="cash">Cash</SelectItem>
                  <SelectItem value="check">Check</SelectItem>
                  <SelectItem value="bank-transfer">Bank Transfer</SelectItem>
                  <SelectItem value="credit-card">Credit Card</SelectItem>
                  <SelectItem value="online">Online Payment</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="income-notes" className="text-slate-300 mb-2 block">Notes</Label>
              <Textarea
                id="income-notes"
                placeholder="Additional notes about this income..."
                className="bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                rows={3}
              />
            </div>

            <div className="flex justify-end space-x-3">
              <Button 
                variant="outline" 
                onClick={() => setIsMoneyInOpen(false)}
                className="border-slate-600 text-slate-300 hover:bg-slate-700"
              >
                Cancel
              </Button>
              <Button 
                onClick={() => setIsMoneyInOpen(false)}
                className="bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white"
              >
                Record Income
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Money Out Dialog */}
      <Dialog open={isMoneyOutOpen} onOpenChange={setIsMoneyOutOpen}>
        <DialogContent className="bg-slate-800 border-slate-700 text-white max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center">
              <TrendingDown className="w-5 h-5 mr-2 text-red-400" />
              Record Money Out
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              Record expenses, maintenance costs, and other money going out
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expense-description" className="text-slate-300 mb-2 block">Description</Label>
                <Input
                  id="expense-description"
                  placeholder="e.g., HVAC repair for Unit 205"
                  className="bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                />
              </div>
              <div>
                <Label htmlFor="expense-amount" className="text-slate-300 mb-2 block">Amount</Label>
                <Input
                  id="expense-amount"
                  type="number"
                  placeholder="0.00"
                  className="bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expense-category" className="text-slate-300 mb-2 block">Expense Category</Label>
                <Select>
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {expenseCategories.map((category) => (
                      <SelectItem key={category.id} value={category.name}>
                        <div className="flex items-center">
                          <span className="mr-2">{category.icon}</span>
                          {category.name}
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="expense-property" className="text-slate-300 mb-2 block">Property</Label>
                <Select>
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                    <SelectValue placeholder="Select property" />
                  </SelectTrigger>
                  <SelectContent>
                    {properties.map((property) => (
                      <SelectItem key={property.id} value={property.name}>
                        {property.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expense-date" className="text-slate-300 mb-2 block">Expense Date</Label>
                <Input
                  id="expense-date"
                  type="date"
                  className="bg-slate-700 border-slate-600 text-white"
                />
              </div>
              <div>
                <Label htmlFor="expense-vendor" className="text-slate-300 mb-2 block">Vendor/Contractor</Label>
                <Input
                  id="expense-vendor"
                  placeholder="e.g., ABC Plumbing Co."
                  className="bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="expense-tags" className="text-slate-300 mb-2 block">Tags (comma separated)</Label>
              <Input
                id="expense-tags"
                placeholder="urgent, recurring, hvac, plumbing..."
                className="bg-slate-700 border-slate-600 text-white placeholder-slate-400"
              />
            </div>

            <div>
              <Label htmlFor="expense-notes" className="text-slate-300 mb-2 block">Notes</Label>
              <Textarea
                id="expense-notes"
                placeholder="Additional notes about this expense..."
                className="bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                rows={3}
              />
            </div>

            <div className="flex justify-end space-x-3">
              <Button 
                variant="outline" 
                onClick={() => setIsMoneyOutOpen(false)}
                className="border-slate-600 text-slate-300 hover:bg-slate-700"
              >
                Cancel
              </Button>
              <Button 
                onClick={() => setIsMoneyOutOpen(false)}
                className="bg-gradient-to-r from-red-500 to-rose-600 hover:from-red-600 hover:to-rose-700 text-white"
              >
                Record Expense
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
