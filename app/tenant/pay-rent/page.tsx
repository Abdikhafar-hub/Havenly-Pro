"use client"

import { useState, useEffect } from 'react'
import { 
  CreditCard, 
  Calendar,
  DollarSign,
  Download,
  Clock,
  CheckCircle,
  XCircle,
  AlertCircle,
  Settings,
  RefreshCw,
  FileText,
  Zap,
  Smartphone,
  Building2,
  TrendingUp,
  TrendingDown,
  Filter,
  Search,
  ChevronDown,
  ChevronRight
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'

// Mock data
const currentInvoice = {
  id: 'INV-2024-001',
  property: 'Sunset Apartments - Unit 101',
  period: 'January 2024',
  dueDate: '2024-01-05',
  items: [
    { name: 'Base Rent', amount: 1000, category: 'rent' },
    { name: 'Utilities (Water & Electricity)', amount: 120, category: 'utilities' },
    { name: 'Internet', amount: 50, category: 'utilities' },
    { name: 'Maintenance Fee', amount: 30, category: 'fees' },
  ],
  total: 1200,
  status: 'pending',
  balance: 1200
}

const paymentHistory = [
  { id: 'PAY-001', date: '2023-12-05', amount: 1200, method: 'M-Pesa', status: 'completed', invoice: 'INV-2023-012', downloaded: false },
  { id: 'PAY-002', date: '2023-11-05', amount: 1200, method: 'Bank Transfer', status: 'completed', invoice: 'INV-2023-011', downloaded: true },
  { id: 'PAY-003', date: '2023-10-05', amount: 1200, method: 'M-Pesa', status: 'completed', invoice: 'INV-2023-010', downloaded: true },
  { id: 'PAY-004', date: '2023-09-05', amount: 1200, method: 'Auto-pay', status: 'completed', invoice: 'INV-2023-009', downloaded: true },
]

export default function TenantPayRent() {
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState('current')
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('')
  const [autoPayEnabled, setAutoPayEnabled] = useState(false)
  const [filterType, setFilterType] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const [paymentMethodModalOpen, setPaymentMethodModalOpen] = useState(false)
  const [mpesaModalOpen, setMpesaModalOpen] = useState(false)
  const [phoneNumber, setPhoneNumber] = useState('')

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const lateFee = currentInvoice.balance > 0 && new Date() > new Date(currentInvoice.dueDate)
    ? currentInvoice.balance * 0.05 
    : 0

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Rent & Payments</h1>
          <p className="text-slate-400 mt-2">Manage your rent payments and view payment history</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-red-500/50 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Amount Due</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">${currentInvoice.balance}</div>
            <p className="text-xs text-red-400 mt-1">Due: {currentInvoice.dueDate}</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-green-500/50 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Total Paid</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">$4,800</div>
            <p className="text-xs text-green-400 mt-1">Last 4 months</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-blue-500/50 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Payment Status</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">100%</div>
            <p className="text-xs text-blue-400 mt-1">On-time rate</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-purple-500/50 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Credit Balance</CardTitle>
            <DollarSign className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">$0</div>
            <p className="text-xs text-slate-400 mt-1">No credit available</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="current" className="space-y-6">
        <TabsList className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-1">
          <TabsTrigger value="current" className="text-slate-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white">
            Current Invoice
          </TabsTrigger>
          <TabsTrigger value="pay" className="text-slate-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white">
            Make Payment
          </TabsTrigger>
          <TabsTrigger value="history" className="text-slate-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white">
            Payment History
          </TabsTrigger>
          <TabsTrigger value="auto-pay" className="text-slate-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white">
            Auto-Pay Setup
          </TabsTrigger>
        </TabsList>

        {/* Current Invoice Tab */}
        <TabsContent value="current" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Invoice Details */}
            <Card className="lg:col-span-2 bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="text-white">Current Invoice</CardTitle>
                    <CardDescription className="text-slate-400">Invoice #{currentInvoice.id}</CardDescription>
                  </div>
                  <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-400">
                    {currentInvoice.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg bg-slate-700/50">
                  <div>
                    <p className="text-sm text-slate-400">Property</p>
                    <p className="text-white font-semibold">{currentInvoice.property}</p>
                  </div>
                  <Building2 className="w-8 h-8 text-blue-400" />
                </div>

                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-slate-300">Invoice Breakdown</h4>
                  {currentInvoice.items.map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg bg-slate-700/50 hover:bg-slate-700/70 transition-colors">
                      <div>
                        <p className="text-sm text-white">{item.name}</p>
                        <Badge variant="secondary" className="text-xs mt-1" style={{
                          backgroundColor: item.category === 'rent' ? 'rgba(34, 197, 94, 0.2)' :
                                          item.category === 'utilities' ? 'rgba(59, 130, 246, 0.2)' :
                                          'rgba(168, 85, 247, 0.2)',
                          color: item.category === 'rent' ? '#4ade80' :
                                 item.category === 'utilities' ? '#60a5fa' :
                                 '#a78bfa'
                        }}>
                          {item.category}
                        </Badge>
                      </div>
                      <span className="text-sm font-semibold text-white">${item.amount}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-slate-700">
                  <div className="flex items-center justify-between text-lg font-bold text-white">
                    <span>Total Amount</span>
                    <span>${currentInvoice.total}</span>
                  </div>
                </div>

                {lateFee > 0 && (
                  <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
                    <div className="flex items-center space-x-2 mb-2">
                      <AlertCircle className="w-5 h-5 text-red-400" />
                      <p className="text-sm font-medium text-red-400">Late Payment Fee</p>
                    </div>
                    <p className="text-xs text-slate-300">A late payment fee of ${lateFee.toFixed(2)} has been applied (5% of balance). Please settle your account to avoid additional charges.</p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Payment Summary */}
            <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Payment Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-lg bg-slate-700/50">
                  <p className="text-sm text-slate-400">Due Date</p>
                  <p className="text-white font-semibold text-lg mt-1">{currentInvoice.dueDate}</p>
                  <p className="text-xs text-red-400 mt-2">⚠️ Overdue</p>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <span className="text-sm text-slate-300">Base Amount</span>
                    <span className="text-sm font-semibold text-blue-400">${currentInvoice.total}</span>
                  </div>
                  {lateFee > 0 && (
                    <div className="flex items-center justify-between p-3 rounded-lg bg-red-500/10 border border-red-500/20">
                      <span className="text-sm text-slate-300">Late Fee</span>
                      <span className="text-sm font-semibold text-red-400">+${lateFee.toFixed(2)}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-2 border-blue-500/40">
                    <span className="text-base font-bold text-white">Total Due</span>
                    <span className="text-lg font-bold text-white">${(currentInvoice.total + lateFee).toFixed(2)}</span>
                  </div>
                </div>

                <Dialog open={paymentMethodModalOpen} onOpenChange={setPaymentMethodModalOpen}>
                  <DialogTrigger asChild>
                    <Button className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white">
                      <CreditCard className="w-4 h-4 mr-2" />
                      Pay Now
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="bg-slate-800 border-slate-700 max-w-2xl">
                    <DialogHeader>
                      <DialogTitle className="text-white text-2xl">Select Payment Method</DialogTitle>
                      <DialogDescription className="text-slate-400">
                        Choose your preferred payment option to complete your rent payment
                      </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-3 mt-4">
                      <button
                        onClick={() => {
                          setPaymentMethodModalOpen(false)
                          setMpesaModalOpen(true)
                        }}
                        className="w-full p-6 rounded-xl border-2 border-green-500/50 bg-green-500/10 hover:bg-green-500/20 transition-all duration-300 flex items-center space-x-4"
                      >
                        <div className="w-16 h-16 rounded-lg bg-green-500/20 flex items-center justify-center">
                          <Smartphone className="w-8 h-8 text-green-400" />
                        </div>
                        <div className="flex-1 text-left">
                          <p className="font-semibold text-white text-lg">M-Pesa</p>
                          <p className="text-sm text-slate-400">Mobile Money Payment - Instant</p>
                        </div>
                        <ChevronRight className="w-6 h-6 text-green-400" />
                      </button>

                      <button
                        onClick={() => {
                          setPaymentMethodModalOpen(false)
                          setActiveTab('pay')
                          setSelectedPaymentMethod('bank')
                        }}
                        className="w-full p-6 rounded-xl border-2 border-blue-500/50 bg-blue-500/10 hover:bg-blue-500/20 transition-all duration-300 flex items-center space-x-4"
                      >
                        <div className="w-16 h-16 rounded-lg bg-blue-500/20 flex items-center justify-center">
                          <Building2 className="w-8 h-8 text-blue-400" />
                        </div>
                        <div className="flex-1 text-left">
                          <p className="font-semibold text-white text-lg">Bank Transfer</p>
                          <p className="text-sm text-slate-400">Direct bank payment - 1-2 business days</p>
                        </div>
                        <ChevronRight className="w-6 h-6 text-blue-400" />
                      </button>

                      <button
                        onClick={() => {
                          setPaymentMethodModalOpen(false)
                          setActiveTab('pay')
                          setSelectedPaymentMethod('card')
                        }}
                        className="w-full p-6 rounded-xl border-2 border-purple-500/50 bg-purple-500/10 hover:bg-purple-500/20 transition-all duration-300 flex items-center space-x-4"
                      >
                        <div className="w-16 h-16 rounded-lg bg-purple-500/20 flex items-center justify-center">
                          <CreditCard className="w-8 h-8 text-purple-400" />
                        </div>
                        <div className="flex-1 text-left">
                          <p className="font-semibold text-white text-lg">Credit/Debit Card</p>
                          <p className="text-sm text-slate-400">Secure card payment - Instant</p>
                        </div>
                        <ChevronRight className="w-6 h-6 text-purple-400" />
                      </button>
                    </div>
                  </DialogContent>
                </Dialog>

                <Button variant="outline" className="w-full border-slate-600 text-slate-300 hover:bg-slate-700">
                  <Download className="w-4 h-4 mr-2" />
                  Download Invoice
                </Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Make Payment Tab */}
        <TabsContent value="pay" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Payment Methods */}
            <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Select Payment Method</CardTitle>
                <CardDescription className="text-slate-400">Choose your preferred payment option</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <button
                  onClick={() => setSelectedPaymentMethod('mpesa')}
                  className={`w-full p-4 rounded-xl border-2 transition-all duration-300 flex items-center space-x-4 ${
                    selectedPaymentMethod === 'mpesa'
                      ? 'border-green-500/50 bg-green-500/10 hover:bg-green-500/20'
                      : 'border-slate-600 bg-slate-700/50 hover:border-slate-500'
                  }`}
                >
                  <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center">
                    <Smartphone className="w-6 h-6 text-green-400" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-semibold text-white">M-Pesa</p>
                    <p className="text-xs text-slate-400">Mobile Money Payment</p>
                  </div>
                  {selectedPaymentMethod === 'mpesa' && (
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  )}
                </button>

                <button
                  onClick={() => setSelectedPaymentMethod('bank')}
                  className={`w-full p-4 rounded-xl border-2 transition-all duration-300 flex items-center space-x-4 ${
                    selectedPaymentMethod === 'bank'
                      ? 'border-blue-500/50 bg-blue-500/10 hover:bg-blue-500/20'
                      : 'border-slate-600 bg-slate-700/50 hover:border-slate-500'
                  }`}
                >
                  <div className="w-12 h-12 rounded-lg bg-blue-500/20 flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-blue-400" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-semibold text-white">Bank Transfer</p>
                    <p className="text-xs text-slate-400">Direct bank payment</p>
                  </div>
                  {selectedPaymentMethod === 'bank' && (
                    <CheckCircle className="w-5 h-5 text-blue-400" />
                  )}
                </button>

                <button
                  onClick={() => setSelectedPaymentMethod('card')}
                  className={`w-full p-4 rounded-xl border-2 transition-all duration-300 flex items-center space-x-4 ${
                    selectedPaymentMethod === 'card'
                      ? 'border-purple-500/50 bg-purple-500/10 hover:bg-purple-500/20'
                      : 'border-slate-600 bg-slate-700/50 hover:border-slate-500'
                  }`}
                >
                  <div className="w-12 h-12 rounded-lg bg-purple-500/20 flex items-center justify-center">
                    <CreditCard className="w-6 h-6 text-purple-400" />
                  </div>
                  <div className="flex-1 text-left">
                    <p className="font-semibold text-white">Card Payment</p>
                    <p className="text-xs text-slate-400">Debit or Credit Card</p>
                  </div>
                  {selectedPaymentMethod === 'card' && (
                    <CheckCircle className="w-5 h-5 text-purple-400" />
                  )}
                </button>
              </CardContent>
            </Card>

            {/* Payment Details */}
            <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Payment Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-lg bg-slate-700/50">
                  <p className="text-sm text-slate-400">Payment Amount</p>
                  <p className="text-3xl font-bold text-white mt-1">${(currentInvoice.total + lateFee).toFixed(2)}</p>
                </div>

                {selectedPaymentMethod === 'mpesa' && (
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="phone" className="text-slate-300">M-Pesa Phone Number</Label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="0700123456"
                        className="mt-2 bg-slate-700/50 border-slate-600 text-white placeholder-slate-400"
                      />
                    </div>
                    <Button className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white">
                      <Smartphone className="w-4 h-4 mr-2" />
                      Send STK Push
                    </Button>
                  </div>
                )}

                {selectedPaymentMethod === 'bank' && (
                  <div className="space-y-3">
                    <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                      <p className="text-xs text-slate-300 mb-2">Bank Details:</p>
                      <div className="space-y-1 text-sm">
                        <p className="text-white">Account Name: Sunset Apartments</p>
                        <p className="text-white">Account Number: 1234567890</p>
                        <p className="text-white">Bank: Equity Bank</p>
                        <p className="text-white">Reference: INV-2024-001</p>
                      </div>
                    </div>
                    <Button variant="outline" className="w-full border-blue-500 text-blue-400 hover:bg-blue-500/10">
                      Copy Account Details
                    </Button>
                  </div>
                )}

                {selectedPaymentMethod === 'card' && (
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="cardNumber" className="text-slate-300">Card Number</Label>
                      <Input
                        id="cardNumber"
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        className="mt-2 bg-slate-700/50 border-slate-600 text-white placeholder-slate-400"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label htmlFor="expiry" className="text-slate-300">Expiry</Label>
                        <Input
                          id="expiry"
                          type="text"
                          placeholder="MM/YY"
                          className="mt-2 bg-slate-700/50 border-slate-600 text-white"
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv" className="text-slate-300">CVV</Label>
                        <Input
                          id="cvv"
                          type="text"
                          placeholder="123"
                          className="mt-2 bg-slate-700/50 border-slate-600 text-white"
                        />
                      </div>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white">
                      <CreditCard className="w-4 h-4 mr-2" />
                      Pay ${(currentInvoice.total + lateFee).toFixed(2)}
                    </Button>
                  </div>
                )}

                {!selectedPaymentMethod && (
                  <div className="p-8 text-center">
                    <p className="text-slate-400">Please select a payment method to continue</p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Payment History Tab */}
        <TabsContent value="history" className="space-y-6">
          <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white">Payment History</CardTitle>
                  <CardDescription className="text-slate-400">View all your past payments and receipts</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Select value={filterType} onValueChange={setFilterType}>
                    <SelectTrigger className="w-40 bg-slate-700/50 border-slate-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Payments</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {paymentHistory.map((payment) => (
                  <div key={payment.id} className="flex items-center justify-between p-4 rounded-lg bg-slate-700/50 hover:bg-slate-700 transition-colors">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 rounded-lg bg-green-500/20 flex items-center justify-center">
                        {payment.status === 'completed' ? (
                          <CheckCircle className="w-6 h-6 text-green-400" />
                        ) : (
                          <Clock className="w-6 h-6 text-yellow-400" />
                        )}
                      </div>
                      <div>
                        <p className="font-semibold text-white">Payment #{payment.id}</p>
                        <p className="text-sm text-slate-400">{payment.date} • {payment.method}</p>
                        <p className="text-xs text-slate-500">Invoice: {payment.invoice}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <div className="text-right">
                        <p className="text-lg font-bold text-white">${payment.amount}</p>
                        <Badge variant="secondary" className={`mt-1 ${
                          payment.status === 'completed' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'
                        }`}>
                          {payment.status}
                        </Badge>
                      </div>
                      <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white hover:bg-slate-600">
                        <Download className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Auto-Pay Setup Tab */}
        <TabsContent value="auto-pay" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Auto-Payment Setup</CardTitle>
                <CardDescription className="text-slate-400">Automatically pay rent each month</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 rounded-lg bg-slate-700/50">
                  <div className="flex items-center space-x-3">
                    <Zap className="w-8 h-8 text-yellow-400" />
                    <div>
                      <p className="font-semibold text-white">Enable Auto-Pay</p>
                      <p className="text-sm text-slate-400">Automatic monthly rent payment</p>
                    </div>
                  </div>
                  <Switch
                    checked={autoPayEnabled}
                    onCheckedChange={setAutoPayEnabled}
                  />
                </div>

                {autoPayEnabled && (
                  <>
                    <div>
                      <Label htmlFor="autoPayMethod" className="text-slate-300">Payment Method</Label>
                      <Select defaultValue="mpesa">
                        <SelectTrigger className="mt-2 bg-slate-700/50 border-slate-600 text-white">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="mpesa">M-Pesa</SelectItem>
                          <SelectItem value="bank">Bank Transfer</SelectItem>
                          <SelectItem value="card">Credit Card</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="autoPayDate" className="text-slate-300">Auto-Pay Date</Label>
                      <Input
                        id="autoPayDate"
                        type="number"
                        min="1"
                        max="5"
                        defaultValue="5"
                        className="mt-2 bg-slate-700/50 border-slate-600 text-white"
                      />
                      <p className="text-xs text-slate-400 mt-1">Day of the month (1-5 recommended)</p>
                    </div>

                    <div className="p-4 rounded-lg bg-blue-500/10 border border-blue-500/20">
                      <div className="flex items-start space-x-2">
                        <AlertCircle className="w-5 h-5 text-blue-400 mt-0.5" />
                        <div className="text-sm text-slate-300">
                          <p className="font-medium mb-1">Important Notes:</p>
                          <ul className="list-disc list-inside space-y-1 text-xs text-slate-400">
                            <li>Payment will be processed automatically on the selected date</li>
                            <li>You'll receive a confirmation notification</li>
                            <li>You can cancel auto-pay anytime</li>
                          </ul>
                        </div>
                      </div>
                    </div>

                    <Button className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white">
                      <Zap className="w-4 h-4 mr-2" />
                      Save Auto-Pay Settings
                    </Button>
                  </>
                )}
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Auto-Pay Benefits</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-green-400" />
                  </div>
                  <div>
                    <p className="font-medium text-white">Never Miss a Payment</p>
                    <p className="text-sm text-slate-400">Automatic processing ensures on-time payments</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="font-medium text-white">No Late Fees</p>
                    <p className="text-sm text-slate-400">Avoid late payment charges</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="w-8 h-8 rounded-lg bg-purple-500/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <p className="font-medium text-white">Peace of Mind</p>
                    <p className="text-sm text-slate-400">One less thing to worry about each month</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 rounded-lg bg-yellow-500/20 flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-5 h-5 text-yellow-400" />
                  </div>
                  <div>
                    <p className="font-medium text-white">Instant Receipts</p>
                    <p className="text-sm text-slate-400">Automatic receipt generation and notification</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* M-Pesa Payment Modal */}
      <Dialog open={mpesaModalOpen} onOpenChange={setMpesaModalOpen}>
        <DialogContent className="bg-slate-800 border-slate-700 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white text-2xl flex items-center">
              <Smartphone className="w-6 h-6 mr-2 text-green-400" />
              Pay with M-Pesa
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              Enter your phone number to receive an STK push
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 mt-4">
            <div className="p-4 rounded-lg bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30">
              <div className="flex items-center justify-between">
                <span className="text-slate-300">Amount to Pay</span>
                <span className="text-2xl font-bold text-white">KSh {(currentInvoice.total + lateFee).toFixed(2)}</span>
              </div>
            </div>

            <div>
              <Label htmlFor="phone" className="text-slate-300 mb-2 block">M-Pesa Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="0700123456"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 h-12 text-lg"
              />
              <p className="text-xs text-slate-400 mt-2">You'll receive an M-Pesa prompt on this number</p>
            </div>

            <div className="flex space-x-3">
              <Button 
                variant="outline" 
                className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700"
                onClick={() => setMpesaModalOpen(false)}
              >
                Cancel
              </Button>
              <Button 
                className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white"
                onClick={() => {
                  // Handle M-Pesa payment logic here
                  alert('M-Pesa STK push sent to ' + phoneNumber)
                  setMpesaModalOpen(false)
                }}
                disabled={!phoneNumber}
              >
                <Smartphone className="w-4 h-4 mr-2" />
                Send STK Push
              </Button>
            </div>

            <div className="p-3 rounded-lg bg-slate-700/50 border border-slate-600">
              <div className="flex items-start space-x-2">
                <AlertCircle className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-slate-400">
                  Make sure you have enough M-Pesa balance and have M-Pesa PIN enabled on your phone
                </p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

