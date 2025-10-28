"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { 
  Search, 
  Download, 
  Filter, 
  Plus, 
  Eye, 
  Edit, 
  Trash2, 
  MoreVertical, 
  DollarSign, 
  Calendar, 
  AlertTriangle, 
  FileText, 
  CreditCard, 
  TrendingUp, 
  TrendingDown,
  Receipt,
  CheckCircle,
  Clock,
  XCircle,
  Building,
  User,
  Phone,
  Mail
} from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

// Mock data for transactions
const transactionsData = [
  {
    id: 'TXN-001',
    tenantName: 'John Smith',
    propertyName: 'Sunrise Apartments',
    unitNumber: 'Apt 201',
    rentAmount: 1200,
    paymentDate: '2024-01-15',
    status: 'Paid',
    paymentMethod: 'M-Pesa',
    referenceNumber: 'MP20240115001',
    tenantAvatar: null
  },
  {
    id: 'TXN-002',
    tenantName: 'Maria Garcia',
    propertyName: 'Oak Manor',
    unitNumber: 'Unit 5B',
    rentAmount: 950,
    paymentDate: '2024-01-14',
    status: 'Pending',
    paymentMethod: 'Bank Transfer',
    referenceNumber: 'BT20240114002',
    tenantAvatar: null
  },
  {
    id: 'TXN-003',
    tenantName: 'Robert Johnson',
    propertyName: 'Riverside Plaza',
    unitNumber: 'Suite 301',
    rentAmount: 1800,
    paymentDate: '2024-01-10',
    status: 'Overdue',
    paymentMethod: 'Cash',
    referenceNumber: 'CS20240110003',
    tenantAvatar: null
  },
  {
    id: 'TXN-004',
    tenantName: 'Lisa Chen',
    propertyName: 'Garden Heights',
    unitNumber: 'Apt 102',
    rentAmount: 1100,
    paymentDate: '2024-01-12',
    status: 'Paid',
    paymentMethod: 'M-Pesa',
    referenceNumber: 'MP20240112004',
    tenantAvatar: null
  },
  {
    id: 'TXN-005',
    tenantName: 'Michael Brown',
    propertyName: 'Metro Tower',
    unitNumber: 'Unit 15A',
    rentAmount: 2200,
    paymentDate: '2024-01-08',
    status: 'Failed',
    paymentMethod: 'Bank Transfer',
    referenceNumber: 'BT20240108005',
    tenantAvatar: null
  }
]

// Mock data for rent collection trend
const rentCollectionData = [
  { month: 'Jan', collected: 45000, pending: 12000 },
  { month: 'Feb', collected: 52000, pending: 8000 },
  { month: 'Mar', collected: 48000, pending: 15000 },
  { month: 'Apr', collected: 55000, pending: 10000 },
  { month: 'May', collected: 60000, pending: 5000 },
  { month: 'Jun', collected: 58000, pending: 7000 }
]

// Mock data for property performance
const propertyPerformanceData = [
  { name: 'Sunrise Apartments', value: 25000, color: '#3B82F6' },
  { name: 'Oak Manor', value: 18000, color: '#10B981' },
  { name: 'Riverside Plaza', value: 22000, color: '#F59E0B' },
  { name: 'Garden Heights', value: 15000, color: '#EF4444' },
  { name: 'Metro Tower', value: 30000, color: '#8B5CF6' }
]

const properties = ['Sunrise Apartments', 'Oak Manor', 'Riverside Plaza', 'Garden Heights', 'Metro Tower']
const paymentMethods = ['M-Pesa', 'Bank Transfer', 'Cash', 'Cheque']
const paymentStatuses = ['Paid', 'Pending', 'Overdue', 'Failed']

export default function BillingPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [propertyFilter, setPropertyFilter] = useState('all')
  const [methodFilter, setMethodFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [selectedTransaction, setSelectedTransaction] = useState<any>(null)
  const [isTransactionModalOpen, setIsTransactionModalOpen] = useState(false)
  const [isManualPaymentModalOpen, setIsManualPaymentModalOpen] = useState(false)
  const [isUpgradePlanModalOpen, setIsUpgradePlanModalOpen] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState('')
  const [mounted, setMounted] = useState(false)

  // Manual payment form data
  const [manualPaymentData, setManualPaymentData] = useState({
    tenant: '',
    property: '',
    unitNumber: '',
    rentAmount: '',
    billingMonth: '',
    paymentMethod: '',
    referenceNumber: '',
    notes: ''
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const getStatusBadge = (status: string) => {
    const colors = {
      'Paid': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
      'Pending': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      'Overdue': 'bg-red-500/20 text-red-400 border-red-500/30',
      'Failed': 'bg-red-500/20 text-red-400 border-red-500/30'
    }
    return <Badge className={colors[status as keyof typeof colors]}>{status}</Badge>
  }

  const getStatusIcon = (status: string) => {
    const icons = {
      'Paid': <CheckCircle className="w-4 h-4 text-emerald-400" />,
      'Pending': <Clock className="w-4 h-4 text-yellow-400" />,
      'Overdue': <AlertTriangle className="w-4 h-4 text-red-400" />,
      'Failed': <XCircle className="w-4 h-4 text-red-400" />
    }
    return icons[status as keyof typeof icons]
  }

  const resetFilters = () => {
    setSearchTerm('')
    setStatusFilter('all')
    setPropertyFilter('all')
    setMethodFilter('all')
  }

  const filteredTransactions = transactionsData.filter(transaction => {
    const matchesSearch = transaction.tenantName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.propertyName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         transaction.referenceNumber.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || transaction.status === statusFilter
    const matchesProperty = propertyFilter === 'all' || transaction.propertyName === propertyFilter
    const matchesMethod = methodFilter === 'all' || transaction.paymentMethod === methodFilter
    
    return matchesSearch && matchesStatus && matchesProperty && matchesMethod
  })

  const handleViewTransaction = (transaction: any) => {
    setSelectedTransaction(transaction)
    setIsTransactionModalOpen(true)
  }

  const handleManualPaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log('Manual payment submitted:', manualPaymentData)
    setIsManualPaymentModalOpen(false)
    // Reset form
    setManualPaymentData({
      tenant: '',
      property: '',
      unitNumber: '',
      rentAmount: '',
      billingMonth: '',
      paymentMethod: '',
      referenceNumber: '',
      notes: ''
    })
  }

  const handleInputChange = (field: string, value: string) => {
    setManualPaymentData(prev => ({ ...prev, [field]: value }))
  }

  const totalPages = Math.ceil(filteredTransactions.length / rowsPerPage)
  const startIndex = (currentPage - 1) * rowsPerPage
  const endIndex = startIndex + rowsPerPage
  const currentTransactions = filteredTransactions.slice(startIndex, endIndex)

  // Calculate summary stats
  const totalRentCollected = transactionsData.filter(t => t.status === 'Paid').reduce((sum, t) => sum + t.rentAmount, 0)
  const pendingPayments = transactionsData.filter(t => t.status === 'Pending').length
  const overdueInvoices = transactionsData.filter(t => t.status === 'Overdue').length
  const activeInvoices = transactionsData.length
  const totalTransactions = transactionsData.length

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-blue-400">Billing & Payments</h1>
          <p className="text-slate-400 mt-2">Monitor rent payments, invoices, and financial activity across all properties</p>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
          <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
            <Filter className="w-4 h-4 mr-2" />
            Filter by Date
          </Button>
          <Dialog open={isManualPaymentModalOpen} onOpenChange={setIsManualPaymentModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Add Manual Payment
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-slate-800 border-slate-700 max-w-2xl">
              <DialogHeader>
                <DialogTitle className="text-xl font-bold text-blue-400">Add Manual Payment</DialogTitle>
              </DialogHeader>
              <form onSubmit={handleManualPaymentSubmit} className="space-y-6 p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-slate-300 font-medium">Tenant *</Label>
                    <Select value={manualPaymentData.tenant} onValueChange={(value) => handleInputChange('tenant', value)}>
                      <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                        <SelectValue placeholder="Select tenant" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-700 border-slate-600">
                        <SelectItem value="john" className="text-white">John Smith</SelectItem>
                        <SelectItem value="maria" className="text-white">Maria Garcia</SelectItem>
                        <SelectItem value="robert" className="text-white">Robert Johnson</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-300 font-medium">Property *</Label>
                    <Select value={manualPaymentData.property} onValueChange={(value) => handleInputChange('property', value)}>
                      <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                        <SelectValue placeholder="Select property" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-700 border-slate-600">
                        {properties.map(property => (
                          <SelectItem key={property} value={property} className="text-white">{property}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-slate-300 font-medium">Unit Number *</Label>
                    <Input 
                      className="bg-slate-700 border-slate-600 text-white" 
                      placeholder="Apt 201"
                      value={manualPaymentData.unitNumber}
                      onChange={(e) => handleInputChange('unitNumber', e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-300 font-medium">Rent Amount *</Label>
                    <Input 
                      type="number"
                      className="bg-slate-700 border-slate-600 text-white" 
                      placeholder="1200"
                      value={manualPaymentData.rentAmount}
                      onChange={(e) => handleInputChange('rentAmount', e.target.value)}
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-slate-300 font-medium">Billing Month *</Label>
                    <Input 
                      type="month"
                      className="bg-slate-700 border-slate-600 text-white" 
                      value={manualPaymentData.billingMonth}
                      onChange={(e) => handleInputChange('billingMonth', e.target.value)}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-slate-300 font-medium">Payment Method *</Label>
                    <Select value={manualPaymentData.paymentMethod} onValueChange={(value) => handleInputChange('paymentMethod', value)}>
                      <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                        <SelectValue placeholder="Select method" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-700 border-slate-600">
                        {paymentMethods.map(method => (
                          <SelectItem key={method} value={method} className="text-white">{method}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-300 font-medium">Reference Number</Label>
                  <Input 
                    className="bg-slate-700 border-slate-600 text-white" 
                    placeholder="MP20240115001"
                    value={manualPaymentData.referenceNumber}
                    onChange={(e) => handleInputChange('referenceNumber', e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-slate-300 font-medium">Notes</Label>
                  <Textarea 
                    className="bg-slate-700 border-slate-600 text-white" 
                    placeholder="Additional notes about this payment"
                    value={manualPaymentData.notes}
                    onChange={(e) => handleInputChange('notes', e.target.value)}
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <Button type="button" variant="outline" onClick={() => setIsManualPaymentModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">
                    Save Payment
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Global Search */}
      <Card className="bg-slate-800 border-slate-700 border-2 border-blue-500/20">
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex-1 min-w-64">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  placeholder="Search by tenant, property, transaction ID..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-slate-700 border-slate-600 text-white"
                />
              </div>
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-32 bg-slate-700 border-slate-600 text-white">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                <SelectItem value="all" className="text-white">All Status</SelectItem>
                {paymentStatuses.map(status => (
                  <SelectItem key={status} value={status} className="text-white">{status}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={propertyFilter} onValueChange={setPropertyFilter}>
              <SelectTrigger className="w-40 bg-slate-700 border-slate-600 text-white">
                <SelectValue placeholder="Property" />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                <SelectItem value="all" className="text-white">All Properties</SelectItem>
                {properties.map(property => (
                  <SelectItem key={property} value={property} className="text-white">{property}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={methodFilter} onValueChange={setMethodFilter}>
              <SelectTrigger className="w-32 bg-slate-700 border-slate-600 text-white">
                <SelectValue placeholder="Method" />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                <SelectItem value="all" className="text-white">All Methods</SelectItem>
                {paymentMethods.map(method => (
                  <SelectItem key={method} value={method} className="text-white">{method}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              onClick={resetFilters}
              className="border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              Reset Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
        <Card className="bg-slate-800 border-slate-700 border-2 border-blue-500/20 hover:bg-slate-750 transition-colors">
          <CardContent className="p-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-xs">Total Rent Collected</p>
                <p className="text-lg font-bold text-white">${totalRentCollected.toLocaleString()}</p>
                <div className="flex items-center mt-0.5">
                  <TrendingUp className="w-3 h-3 text-emerald-400 mr-1" />
                  <span className="text-emerald-400 text-xs">+12.5%</span>
                </div>
              </div>
              <DollarSign className="w-5 h-5 text-emerald-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700 border-2 border-blue-500/20 hover:bg-slate-750 transition-colors">
          <CardContent className="p-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-xs">Pending Payments</p>
                <p className="text-lg font-bold text-white">{pendingPayments}</p>
                <p className="text-slate-400 text-xs">{((pendingPayments / activeInvoices) * 100).toFixed(1)}% of total</p>
              </div>
              <Clock className="w-5 h-5 text-yellow-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700 border-2 border-blue-500/20 hover:bg-slate-750 transition-colors">
          <CardContent className="p-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-xs">Overdue Invoices</p>
                <p className="text-lg font-bold text-white">{overdueInvoices}</p>
                <div className="flex items-center mt-0.5">
                  <AlertTriangle className="w-3 h-3 text-red-400 mr-1" />
                  <span className="text-red-400 text-xs">Needs attention</span>
                </div>
              </div>
              <AlertTriangle className="w-5 h-5 text-red-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700 border-2 border-blue-500/20 hover:bg-slate-750 transition-colors">
          <CardContent className="p-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-xs">Active Invoices</p>
                <p className="text-lg font-bold text-white">{activeInvoices}</p>
                <p className="text-slate-400 text-xs">Current billing cycle</p>
              </div>
              <FileText className="w-5 h-5 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700 border-2 border-blue-500/20 hover:bg-slate-750 transition-colors">
          <CardContent className="p-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-xs">Total Transactions</p>
                <p className="text-lg font-bold text-white">{totalTransactions}</p>
                <p className="text-slate-400 text-xs">All time</p>
              </div>
              <CreditCard className="w-5 h-5 text-purple-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="bg-slate-800 border-slate-700 border-2 border-blue-500/20">
          <CardHeader className="pb-1">
            <CardTitle className="text-sm font-semibold text-blue-400">Rent Collection Trend</CardTitle>
            <p className="text-xs text-slate-400">Monthly rent collection performance</p>
          </CardHeader>
          <CardContent className="pt-0 pb-2">
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={rentCollectionData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#4b5563" strokeOpacity={0.6} />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e293b', 
                    border: '1px solid #475569', 
                    borderRadius: '8px',
                    color: '#f1f5f9'
                  }} 
                />
                <Line type="monotone" dataKey="collected" stroke="#10b981" strokeWidth={3} name="Collected" />
                <Line type="monotone" dataKey="pending" stroke="#f59e0b" strokeWidth={3} name="Pending" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700 border-2 border-blue-500/20">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-semibold text-blue-400">Property Performance</CardTitle>
            <p className="text-xs text-slate-400">Rent collection by property</p>
          </CardHeader>
          <CardContent className="pt-0">
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={propertyPerformanceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {propertyPerformanceData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1e293b', 
                    border: '1px solid #475569', 
                    borderRadius: '8px',
                    color: '#f1f5f9'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 space-y-2">
              {propertyPerformanceData.map((property, index) => (
                <div key={index} className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: property.color }}></div>
                    <span className="text-slate-300">{property.name}</span>
                  </div>
                  <span className="text-white font-medium">${property.value.toLocaleString()}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Transactions Table */}
      <Card className="bg-slate-800 border-slate-700 border-2 border-blue-500/20">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold text-blue-400">Recent Transactions</CardTitle>
          <p className="text-xs text-slate-400">All rent and billing transactions</p>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-700/50">
                <tr>
                  <th className="text-left p-3 text-slate-300 font-medium text-sm">Transaction ID</th>
                  <th className="text-left p-3 text-slate-300 font-medium text-sm">Tenant</th>
                  <th className="text-left p-3 text-slate-300 font-medium text-sm">Property</th>
                  <th className="text-left p-3 text-slate-300 font-medium text-sm">Unit</th>
                  <th className="text-left p-3 text-slate-300 font-medium text-sm">Amount</th>
                  <th className="text-left p-3 text-slate-300 font-medium text-sm">Payment Date</th>
                  <th className="text-left p-3 text-slate-300 font-medium text-sm">Status</th>
                  <th className="text-left p-3 text-slate-300 font-medium text-sm">Method</th>
                  <th className="text-left p-3 text-slate-300 font-medium text-sm">Reference</th>
                  <th className="text-left p-3 text-slate-300 font-medium text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentTransactions.map((transaction, index) => (
                  <tr key={transaction.id} className={`border-b border-slate-700 hover:bg-slate-700/30 ${index % 2 === 0 ? 'bg-slate-800/50' : 'bg-slate-800'}`}>
                    <td className="p-3">
                      <div className="font-mono text-xs text-blue-400">{transaction.id}</div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center">
                        <Avatar className="w-6 h-6 mr-2">
                          <AvatarImage src={transaction.tenantAvatar || ''} />
                          <AvatarFallback className="bg-blue-500 text-white text-xs">
                            {transaction.tenantName.split(' ').map((n: string) => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium text-white text-sm">{transaction.tenantName}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="text-slate-300 text-sm">{transaction.propertyName}</div>
                    </td>
                    <td className="p-3">
                      <div className="text-slate-300 text-sm">{transaction.unitNumber}</div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center text-white font-medium text-sm">
                        <DollarSign className="w-3 h-3 mr-1" />
                        {transaction.rentAmount}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center text-slate-300 text-xs">
                        <Calendar className="w-3 h-3 mr-1" />
                        {transaction.paymentDate}
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center">
                        {getStatusIcon(transaction.status)}
                        <span className="ml-1">{getStatusBadge(transaction.status)}</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <div className="text-slate-300 text-sm">{transaction.paymentMethod}</div>
                    </td>
                    <td className="p-3">
                      <div className="font-mono text-xs text-slate-400">{transaction.referenceNumber}</div>
                    </td>
                    <td className="p-3">
                      <div className="flex items-center space-x-1">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 h-7 w-7 p-0"
                          onClick={() => handleViewTransaction(transaction)}
                        >
                          <Eye className="w-3 h-3" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white hover:bg-slate-700 h-7 w-7 p-0">
                          <Edit className="w-3 h-3" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white hover:bg-slate-700 h-7 w-7 p-0">
                              <MoreVertical className="w-3 h-3" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="bg-slate-700 border-slate-600">
                            <DropdownMenuItem className="text-white hover:bg-slate-600 text-sm">
                              <Receipt className="w-3 h-3 mr-2" />
                              Download Receipt
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-white hover:bg-slate-600 text-sm">
                              <CheckCircle className="w-3 h-3 mr-2" />
                              Mark as Paid
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              className="text-emerald-400 hover:bg-emerald-500/10 text-sm"
                              onClick={() => setIsUpgradePlanModalOpen(true)}
                            >
                              <TrendingUp className="w-3 h-3 mr-2" />
                              Upgrade Plan
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-400 hover:bg-red-500/10 text-sm">
                              <Trash2 className="w-3 h-3 mr-2" />
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

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-slate-400">
          Showing {startIndex + 1}-{Math.min(endIndex, filteredTransactions.length)} of {filteredTransactions.length} Transactions
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-slate-400 text-sm">Rows per page:</span>
            <Select value={rowsPerPage.toString()} onValueChange={(value) => setRowsPerPage(Number(value))}>
              <SelectTrigger className="w-20 bg-slate-700 border-slate-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                <SelectItem value="10" className="text-white">10</SelectItem>
                <SelectItem value="25" className="text-white">25</SelectItem>
                <SelectItem value="50" className="text-white">50</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              Previous
            </Button>
            <span className="text-slate-400 text-sm">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              Next
            </Button>
          </div>
        </div>
      </div>

      {/* Transaction Details Modal */}
      <Dialog open={isTransactionModalOpen} onOpenChange={setIsTransactionModalOpen}>
        <DialogContent className="bg-slate-800 border-slate-700 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-blue-400">Transaction Details</DialogTitle>
          </DialogHeader>
          {selectedTransaction && (
            <div className="p-4 space-y-6">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label className="text-slate-400 text-sm">Transaction ID</label>
                  <p className="text-white font-mono">{selectedTransaction.id}</p>
                </div>
                <div>
                  <label className="text-slate-400 text-sm">Reference Number</label>
                  <p className="text-white font-mono">{selectedTransaction.referenceNumber}</p>
                </div>
                <div>
                  <label className="text-slate-400 text-sm">Tenant Name</label>
                  <p className="text-white">{selectedTransaction.tenantName}</p>
                </div>
                <div>
                  <label className="text-slate-400 text-sm">Property</label>
                  <p className="text-white">{selectedTransaction.propertyName}</p>
                </div>
                <div>
                  <label className="text-slate-400 text-sm">Unit Number</label>
                  <p className="text-white">{selectedTransaction.unitNumber}</p>
                </div>
                <div>
                  <label className="text-slate-400 text-sm">Rent Amount</label>
                  <p className="text-white font-medium">${selectedTransaction.rentAmount}</p>
                </div>
                <div>
                  <label className="text-slate-400 text-sm">Payment Date</label>
                  <p className="text-white">{selectedTransaction.paymentDate}</p>
                </div>
                <div>
                  <label className="text-slate-400 text-sm">Payment Method</label>
                  <p className="text-white">{selectedTransaction.paymentMethod}</p>
                </div>
                <div>
                  <label className="text-slate-400 text-sm">Status</label>
                  <div className="mt-1">{getStatusBadge(selectedTransaction.status)}</div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 pt-4 border-t border-slate-700">
                <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                  <Receipt className="w-4 h-4 mr-2" />
                  Download Receipt
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Mark as Paid
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Upgrade Plan Modal */}
      <Dialog open={isUpgradePlanModalOpen} onOpenChange={setIsUpgradePlanModalOpen}>
        <DialogContent className="bg-slate-800 border-slate-700 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-blue-400">Upgrade Subscription Plan</DialogTitle>
            <p className="text-slate-400 text-sm">Choose a new plan for this property</p>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="space-y-3">
              <Label className="text-slate-300 font-medium text-sm">Select Plan</Label>
              <Select value={selectedPlan} onValueChange={setSelectedPlan}>
                <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                  <SelectValue placeholder="Choose a plan" />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600">
                  <SelectItem value="basic" className="text-white hover:bg-slate-600">
                    <div className="flex items-center justify-between w-full">
                      <span>Basic Plan</span>
                      <span className="text-slate-400 text-sm ml-2">$29/month</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="pro" className="text-white hover:bg-slate-600">
                    <div className="flex items-center justify-between w-full">
                      <span>Pro Plan</span>
                      <span className="text-slate-400 text-sm ml-2">$79/month</span>
                    </div>
                  </SelectItem>
                  <SelectItem value="enterprise" className="text-white hover:bg-slate-600">
                    <div className="flex items-center justify-between w-full">
                      <span>Enterprise Plan</span>
                      <span className="text-slate-400 text-sm ml-2">$199/month</span>
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>

            {selectedPlan && (
              <div className="bg-slate-700/50 border border-slate-600 rounded-lg p-4 space-y-3">
                <h4 className="text-white font-medium">Plan Features</h4>
                {selectedPlan === 'basic' && (
                  <ul className="text-slate-300 text-sm space-y-1">
                    <li>• Up to 50 units</li>
                    <li>• Basic reporting</li>
                    <li>• Email support</li>
                    <li>• Standard features</li>
                  </ul>
                )}
                {selectedPlan === 'pro' && (
                  <ul className="text-slate-300 text-sm space-y-1">
                    <li>• Up to 200 units</li>
                    <li>• Advanced analytics</li>
                    <li>• Priority support</li>
                    <li>• Custom integrations</li>
                  </ul>
                )}
                {selectedPlan === 'enterprise' && (
                  <ul className="text-slate-300 text-sm space-y-1">
                    <li>• Unlimited units</li>
                    <li>• Full analytics suite</li>
                    <li>• 24/7 dedicated support</li>
                    <li>• White-label options</li>
                  </ul>
                )}
              </div>
            )}

            <div className="flex justify-end space-x-3 pt-4 border-t border-slate-700">
              <Button 
                variant="outline" 
                onClick={() => setIsUpgradePlanModalOpen(false)}
                className="border-slate-600 text-slate-300 hover:bg-slate-700"
              >
                Cancel
              </Button>
              <Button 
                className="bg-emerald-600 hover:bg-emerald-700 text-white"
                disabled={!selectedPlan}
                onClick={() => {
                  console.log('Upgrading to plan:', selectedPlan)
                  setIsUpgradePlanModalOpen(false)
                  setSelectedPlan('')
                }}
              >
                <TrendingUp className="w-4 h-4 mr-2" />
                Upgrade Plan
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
