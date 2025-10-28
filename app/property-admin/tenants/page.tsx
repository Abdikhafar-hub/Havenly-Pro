"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Users, 
  FileText, 
  DollarSign,
  AlertCircle,
  Calendar,
  Search,
  Filter,
  Plus,
  Edit,
  Eye,
  Trash2,
  Phone,
  Mail,
  MessageSquare,
  Send,
  Download,
  Upload,
  Clock,
  CheckCircle,
  XCircle,
  User,
  Home,
  CreditCard,
  Bell,
  Settings,
  TrendingUp,
  TrendingDown,
  Building2
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

// Mock data
const tenantStats = [
  {
    title: 'Total Tenants',
    value: '38',
    icon: Users,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30',
    change: '+5 this month',
    trend: 'up'
  },
  {
    title: 'Active Leases',
    value: '36',
    icon: FileText,
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/30',
    change: '94.7% occupancy',
    trend: 'up'
  },
  {
    title: 'Pending Payments',
    value: '3',
    icon: Clock,
    color: 'text-yellow-400',
    bgColor: 'bg-yellow-500/10',
    borderColor: 'border-yellow-500/30',
    change: '$1,200 total',
    trend: 'down'
  },
  {
    title: 'Late Payments',
    value: '2',
    icon: AlertCircle,
    color: 'text-red-400',
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500/30',
    change: '$800 overdue',
    trend: 'down'
  },
  {
    title: 'Vacating Soon',
    value: '4',
    icon: Calendar,
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/30',
    change: 'Next 30 days',
    trend: 'neutral'
  }
]

const tenantsData = [
  {
    id: 1,
    name: 'Sarah Johnson',
    unit: '101',
    phone: '(555) 123-4567',
    email: 'sarah.johnson@email.com',
    leaseStart: '2023-06-01',
    leaseEnd: '2024-06-01',
    monthlyRent: 1200,
    paymentStatus: 'Paid',
    balance: 0,
    status: 'Active',
    avatar: null
  },
  {
    id: 2,
    name: 'Mike Wilson',
    unit: '102',
    phone: '(555) 234-5678',
    email: 'mike.wilson@email.com',
    leaseStart: '2023-08-15',
    leaseEnd: '2024-08-15',
    monthlyRent: 1200,
    paymentStatus: 'Pending',
    balance: 1200,
    status: 'Active',
    avatar: null
  },
  {
    id: 3,
    name: 'Emily Davis',
    unit: '201',
    phone: '(555) 345-6789',
    email: 'emily.davis@email.com',
    leaseStart: '2023-09-01',
    leaseEnd: '2024-09-01',
    monthlyRent: 1500,
    paymentStatus: 'Overdue',
    balance: 1500,
    status: 'Active',
    avatar: null
  },
  {
    id: 4,
    name: 'Lisa Brown',
    unit: '301',
    phone: '(555) 456-7890',
    email: 'lisa.brown@email.com',
    leaseStart: '2023-07-01',
    leaseEnd: '2024-07-01',
    monthlyRent: 1800,
    paymentStatus: 'Paid',
    balance: 0,
    status: 'Vacating',
    avatar: null
  },
  {
    id: 5,
    name: 'John Smith',
    unit: '202',
    phone: '(555) 567-8901',
    email: 'john.smith@email.com',
    leaseStart: '2023-10-01',
    leaseEnd: '2024-10-01',
    monthlyRent: 1200,
    paymentStatus: 'Paid',
    balance: 0,
    status: 'Active',
    avatar: null
  }
]

const paymentHistoryData = [
  { month: 'Jan', amount: 4500 },
  { month: 'Feb', amount: 4800 },
  { month: 'Mar', amount: 4600 },
  { month: 'Apr', amount: 4900 },
  { month: 'May', amount: 5100 },
  { month: 'Jun', amount: 4950 }
]

const getPaymentStatusBadge = (status: string) => {
  switch (status) {
    case 'Paid':
      return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Paid</Badge>
    case 'Pending':
      return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Pending</Badge>
    case 'Overdue':
      return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Overdue</Badge>
    default:
      return <Badge variant="secondary">{status}</Badge>
  }
}

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'Active':
      return <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">Active</Badge>
    case 'Vacating':
      return <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">Vacating</Badge>
    case 'Terminated':
      return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Terminated</Badge>
    default:
      return <Badge variant="secondary">{status}</Badge>
  }
}

export default function TenantsPage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [paymentFilter, setPaymentFilter] = useState('all')
  const [isAddTenantOpen, setIsAddTenantOpen] = useState(false)
  const [isCommunicationOpen, setIsCommunicationOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)

  const filteredTenants = tenantsData.filter(tenant => {
    const matchesSearch = tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tenant.unit.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tenant.email.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || tenant.status.toLowerCase() === statusFilter.toLowerCase()
    const matchesPayment = paymentFilter === 'all' || tenant.paymentStatus.toLowerCase() === paymentFilter.toLowerCase()
    return matchesSearch && matchesStatus && matchesPayment
  })


  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2 text-sm text-slate-400 mb-2">
            <span>Dashboard</span>
            <span>/</span>
            <span className="text-slate-300">Tenants</span>
          </div>
          <h1 className="text-3xl font-bold text-white">Tenants Management</h1>
        </div>
        <div className="flex items-center space-x-3">
          <Button 
            onClick={() => setIsCommunicationOpen(true)}
            className="bg-slate-700 hover:bg-slate-600 text-white"
          >
            <MessageSquare className="w-4 h-4 mr-2" />
            Communication
          </Button>
          <Button 
            onClick={() => router.push('/property-admin/tenants/add')}
            className="bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Tenant
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {tenantStats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className={`bg-slate-800 border-l-4 ${stat.borderColor} rounded-lg p-4 hover:bg-slate-750 transition-all duration-300`}>
              <div className="flex items-center justify-between mb-2">
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`w-4 h-4 ${stat.color}`} />
                </div>
                <div className="flex items-center space-x-1">
                  {stat.trend === 'up' ? (
                    <TrendingUp className="w-3 h-3 text-green-400" />
                  ) : stat.trend === 'down' ? (
                    <TrendingDown className="w-3 h-3 text-red-400" />
                  ) : null}
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
                <p className="text-xs font-medium text-slate-400 mb-1">{stat.title}</p>
                <p className="text-xs text-slate-500">{stat.change}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Tenants Table */}
      <Card className="bg-slate-800 border-slate-700 border-2 border-emerald-500/20 rounded-xl">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-bold text-emerald-400 flex items-center">
            <Users className="w-5 h-5 mr-2" />
            Tenants Directory
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          {/* Search and Filter Controls */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Search by name, unit, or email..."
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
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="vacating">Vacating</SelectItem>
                <SelectItem value="terminated">Terminated</SelectItem>
              </SelectContent>
            </Select>
            <Select value={paymentFilter} onValueChange={setPaymentFilter}>
              <SelectTrigger className="w-full sm:w-48 bg-slate-700 border-slate-600">
                <CreditCard className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Payment status" />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                <SelectItem value="all">All Payments</SelectItem>
                <SelectItem value="paid">Paid</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
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
                  <th className="text-left text-sm font-medium text-slate-400 py-3">Contact</th>
                  <th className="text-left text-sm font-medium text-slate-400 py-3">Lease Period</th>
                  <th className="text-left text-sm font-medium text-slate-400 py-3">Rent</th>
                  <th className="text-left text-sm font-medium text-slate-400 py-3">Payment</th>
                  <th className="text-left text-sm font-medium text-slate-400 py-3">Balance</th>
                  <th className="text-left text-sm font-medium text-slate-400 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTenants.map((tenant) => (
                  <tr key={tenant.id} className={`border-b border-slate-700/50 hover:bg-slate-700/30 ${tenant.paymentStatus === 'Overdue' ? 'bg-red-500/5' : ''}`}>
                    <td className="py-3">
                      <div className="flex items-center space-x-3">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={tenant.avatar} />
                          <AvatarFallback className="bg-slate-600 text-white text-xs">
                            {tenant.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <span className="text-white font-medium">{tenant.name}</span>
                          <div className="flex items-center space-x-2 mt-1">
                            {getStatusBadge(tenant.status)}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3">
                      <span className="text-slate-300 font-medium">{tenant.unit}</span>
                    </td>
                    <td className="py-3">
                      <div className="space-y-1">
                        <div className="flex items-center text-xs text-slate-400">
                          <Phone className="w-3 h-3 mr-1" />
                          <span>{tenant.phone}</span>
                        </div>
                        <div className="flex items-center text-xs text-slate-400">
                          <Mail className="w-3 h-3 mr-1" />
                          <span>{tenant.email}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3">
                      <div className="text-sm">
                        <div className="text-slate-300">
                          {new Date(tenant.leaseStart).toLocaleDateString()}
                        </div>
                        <div className="text-xs text-slate-400">
                          to {new Date(tenant.leaseEnd).toLocaleDateString()}
                        </div>
                      </div>
                    </td>
                    <td className="py-3">
                      <span className="text-white font-medium">${tenant.monthlyRent}</span>
                    </td>
                    <td className="py-3">
                      {getPaymentStatusBadge(tenant.paymentStatus)}
                    </td>
                    <td className="py-3">
                      <span className={`font-medium ${tenant.balance > 0 ? 'text-red-400' : 'text-green-400'}`}>
                        ${tenant.balance}
                      </span>
                    </td>
                    <td className="py-3">
                      <div className="flex items-center space-x-2">
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="text-slate-400 hover:text-white"
                          onClick={() => router.push(`/property-admin/tenants/view/${tenant.id}`)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="text-slate-400 hover:text-white"
                          onClick={() => router.push(`/property-admin/tenants/edit/${tenant.id}`)}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-red-400 hover:text-red-300">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredTenants.length === 0 && (
            <div className="text-center py-8">
              <Users className="w-12 h-12 text-slate-500 mx-auto mb-4" />
              <p className="text-slate-400">No tenants found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Tenant Modal */}
      <Dialog open={isAddTenantOpen} onOpenChange={setIsAddTenantOpen}>
        <DialogContent className="bg-slate-800 border-slate-700 w-[95vw] max-w-4xl max-h-[90vh] overflow-y-auto p-6 backdrop-blur-sm">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center">
              <Plus className="w-5 h-5 mr-2" />
              Add New Tenant
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              Complete tenant onboarding with personal details, lease information, and documentation.
            </DialogDescription>
          </DialogHeader>
          
          {/* Progress Indicator */}
          <div className="mb-6">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-400">Step {currentStep} of 4</span>
              <span className="text-sm text-slate-400">{Math.round((currentStep / 4) * 100)}% Complete</span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div 
                className="bg-blue-500 h-2 rounded-full transition-all duration-300" 
                style={{ width: `${(currentStep / 4) * 100}%` }}
              />
            </div>
          </div>
          
          <Tabs value={currentStep.toString()} className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-slate-700">
              <TabsTrigger value="1" className="data-[state=active]:bg-slate-600 text-xs">Personal Info</TabsTrigger>
              <TabsTrigger value="2" className="data-[state=active]:bg-slate-600 text-xs">Lease Details</TabsTrigger>
              <TabsTrigger value="3" className="data-[state=active]:bg-slate-600 text-xs">Payment Info</TabsTrigger>
              <TabsTrigger value="4" className="data-[state=active]:bg-slate-600 text-xs">Documents & Review</TabsTrigger>
            </TabsList>
            
            {/* Step 1: Personal Details */}
            <TabsContent value="1" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <Label className="text-slate-300 text-sm font-medium">Full Name *</Label>
                    <Input className="bg-slate-700 border-slate-600 text-white h-12 mt-2" placeholder="Enter full name" />
                  </div>
                  <div>
                    <Label className="text-slate-300 text-sm font-medium">Email Address</Label>
                    <Input type="email" className="bg-slate-700 border-slate-600 text-white h-12 mt-2" placeholder="email@example.com" />
                  </div>
                  <div>
                    <Label className="text-slate-300 text-sm font-medium">Phone Number *</Label>
                    <Input className="bg-slate-700 border-slate-600 text-white h-12 mt-2" placeholder="(555) 123-4567" />
                  </div>
                  <div>
                    <Label className="text-slate-300 text-sm font-medium">National ID / Passport</Label>
                    <Input className="bg-slate-700 border-slate-600 text-white h-12 mt-2" placeholder="ID number" />
                  </div>
                </div>
                <div className="space-y-6">
                  <div>
                    <Label className="text-slate-300 text-sm font-medium">Gender</Label>
                    <Select>
                      <SelectTrigger className="bg-slate-700 border-slate-600 h-12 mt-2">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-700 border-slate-600">
                        <SelectItem value="male">Male</SelectItem>
                        <SelectItem value="female">Female</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-slate-300 text-sm font-medium">Date of Birth</Label>
                    <Input type="date" className="bg-slate-700 border-slate-600 text-white h-12 mt-2" />
                  </div>
                  <div className="bg-slate-700/30 rounded-lg p-4">
                    <h4 className="text-sm font-semibold text-slate-300 mb-2">Validation Status</h4>
                    <div className="space-y-1 text-xs text-slate-400">
                      <div className="flex items-center">
                        <CheckCircle className="w-3 h-3 text-green-400 mr-2" />
                        <span>Required fields completed</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-3 h-3 text-green-400 mr-2" />
                        <span>Email format valid</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* Step 2: Property & Lease Details */}
            <TabsContent value="2" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <Label className="text-slate-300 text-sm font-medium">Property Name</Label>
                    <Input 
                      className="bg-slate-600 border-slate-500 text-slate-300 h-12 mt-2" 
                      value="Sunrise Apartments" 
                      disabled 
                    />
                    <p className="text-xs text-slate-500 mt-1">Auto-filled based on your assigned property</p>
                  </div>
                  <div>
                    <Label className="text-slate-300">Unit / Apartment No. *</Label>
                    <Select>
                      <SelectTrigger className="bg-slate-700 border-slate-600">
                        <SelectValue placeholder="Select vacant unit" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-700 border-slate-600">
                        <SelectItem value="103">Unit 103 (Vacant)</SelectItem>
                        <SelectItem value="204">Unit 204 (Vacant)</SelectItem>
                        <SelectItem value="305">Unit 305 (Vacant)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-slate-300">Occupancy Type *</Label>
                    <Select>
                      <SelectTrigger className="bg-slate-700 border-slate-600">
                        <SelectValue placeholder="Select occupancy type" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-700 border-slate-600">
                        <SelectItem value="primary">Primary Tenant</SelectItem>
                        <SelectItem value="co-tenant">Co-tenant</SelectItem>
                        <SelectItem value="company">Company Lease</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-slate-300">Lease Status</Label>
                    <Select defaultValue="active">
                      <SelectTrigger className="bg-slate-700 border-slate-600">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-700 border-slate-600">
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="terminated">Terminated</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label className="text-slate-300">Move-in Date *</Label>
                    <Input type="date" className="bg-slate-700 border-slate-600 text-white" />
                  </div>
                  <div>
                    <Label className="text-slate-300">Move-out Date / Lease End *</Label>
                    <Input type="date" className="bg-slate-700 border-slate-600 text-white" />
                  </div>
                  <div>
                    <Label className="text-slate-300">Lease Duration</Label>
                    <Input 
                      className="bg-slate-600 border-slate-500 text-slate-300" 
                      value="12 months" 
                      disabled 
                    />
                    <p className="text-xs text-slate-500 mt-1">Auto-calculated from move-in to move-out dates</p>
                  </div>
                  <div className="bg-slate-700/30 rounded-lg p-4">
                    <h4 className="text-sm font-semibold text-slate-300 mb-2">Lease Summary</h4>
                    <div className="space-y-1 text-xs text-slate-400">
                      <div className="flex justify-between">
                        <span>Start Date:</span>
                        <span className="text-slate-300">TBD</span>
                      </div>
                      <div className="flex justify-between">
                        <span>End Date:</span>
                        <span className="text-slate-300">TBD</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Duration:</span>
                        <span className="text-slate-300">12 months</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* Step 3: Rent & Payment Details */}
            <TabsContent value="3" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div>
                    <Label className="text-slate-300">Monthly Rent Amount *</Label>
                    <Input type="number" className="bg-slate-700 border-slate-600 text-white" placeholder="1200" />
                  </div>
                  <div>
                    <Label className="text-slate-300">Security Deposit Amount</Label>
                    <Input type="number" className="bg-slate-700 border-slate-600 text-white" placeholder="2400" />
                  </div>
                  <div>
                    <Label className="text-slate-300">Payment Frequency *</Label>
                    <Select>
                      <SelectTrigger className="bg-slate-700 border-slate-600">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-700 border-slate-600">
                        <SelectItem value="monthly">Monthly</SelectItem>
                        <SelectItem value="quarterly">Quarterly</SelectItem>
                        <SelectItem value="annually">Annually</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-slate-300">Payment Method *</Label>
                    <Select>
                      <SelectTrigger className="bg-slate-700 border-slate-600">
                        <SelectValue placeholder="Select payment method" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-700 border-slate-600">
                        <SelectItem value="mpesa">M-Pesa</SelectItem>
                        <SelectItem value="bank">Bank Transfer</SelectItem>
                        <SelectItem value="cash">Cash</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-slate-300">Next Payment Due Date</Label>
                    <Input type="date" className="bg-slate-700 border-slate-600 text-white" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="late-fee" className="rounded" />
                    <Label htmlFor="late-fee" className="text-slate-300">Enable Late Fee Policy</Label>
                  </div>
                  <div>
                    <Label className="text-slate-300">Rent Status</Label>
                    <Input 
                      className="bg-slate-600 border-slate-500 text-slate-300" 
                      value="Pending" 
                      disabled 
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <Card className="bg-slate-700/50 border-slate-600">
                    <CardHeader className="pb-3">
                      <CardTitle className="text-white text-lg">Payment Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Monthly Rent:</span>
                          <span className="text-white font-semibold">$1,200</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Security Deposit:</span>
                          <span className="text-white font-semibold">$2,400</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Payment Frequency:</span>
                          <span className="text-slate-300">Monthly</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Next Due Date:</span>
                          <span className="text-slate-300">Feb 1, 2024</span>
                        </div>
                        <div className="border-t border-slate-600 pt-3">
                          <div className="flex justify-between">
                            <span className="text-slate-300 font-semibold">Total Setup:</span>
                            <span className="text-white font-bold">$3,600</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            {/* Step 4: Documents & Review */}
            <TabsContent value="4" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div>
                    <Label className="text-slate-300">Lease Agreement *</Label>
                    <div className="border-2 border-dashed border-slate-600 rounded-lg p-6 text-center">
                      <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                      <p className="text-slate-400 text-sm">Drag & drop lease agreement or click to browse</p>
                      <p className="text-slate-500 text-xs mt-1">PDF, DOC, DOCX files accepted</p>
                    </div>
                  </div>
                  <div>
                    <Label className="text-slate-300">ID / Passport Copy</Label>
                    <div className="border-2 border-dashed border-slate-600 rounded-lg p-4 text-center">
                      <Upload className="w-6 h-6 text-slate-400 mx-auto mb-1" />
                      <p className="text-slate-400 text-sm">Upload ID or passport copy</p>
                    </div>
                  </div>
                  <div>
                    <Label className="text-slate-300">Proof of Payment</Label>
                    <div className="border-2 border-dashed border-slate-600 rounded-lg p-4 text-center">
                      <Upload className="w-6 h-6 text-slate-400 mx-auto mb-1" />
                      <p className="text-slate-400 text-sm">Upload payment receipt</p>
                    </div>
                  </div>
                  <div>
                    <Label className="text-slate-300">Additional Documents</Label>
                    <div className="border-2 border-dashed border-slate-600 rounded-lg p-4 text-center">
                      <Upload className="w-6 h-6 text-slate-400 mx-auto mb-1" />
                      <p className="text-slate-400 text-sm">Upload any additional documents</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label className="text-slate-300">Preferred Notification Channel</Label>
                    <Select>
                      <SelectTrigger className="bg-slate-700 border-slate-600">
                        <SelectValue placeholder="Select notification preference" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-700 border-slate-600">
                        <SelectItem value="sms">SMS</SelectItem>
                        <SelectItem value="email">Email</SelectItem>
                        <SelectItem value="both">Both SMS & Email</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-slate-300">Emergency Contact Name</Label>
                    <Input className="bg-slate-700 border-slate-600 text-white" placeholder="Emergency contact name" />
                  </div>
                  <div>
                    <Label className="text-slate-300">Emergency Contact Phone</Label>
                    <Input className="bg-slate-700 border-slate-600 text-white" placeholder="(555) 123-4567" />
                  </div>
                  <div>
                    <Label className="text-slate-300">Internal Notes (Admin Only)</Label>
                    <Textarea 
                      className="bg-slate-700 border-slate-600 text-white" 
                      rows={4} 
                      placeholder="Add any internal notes about this tenant..." 
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="checkbox" id="send-welcome" className="rounded" />
                    <Label htmlFor="send-welcome" className="text-slate-300">Send Welcome SMS/Email</Label>
                  </div>
                </div>
              </div>
              
              {/* Review Summary */}
              <Card className="bg-slate-700/50 border-slate-600">
                <CardHeader className="pb-3">
                  <CardTitle className="text-white text-lg">Tenant Summary</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-slate-400">Tenant ID:</p>
                      <p className="text-white font-semibold">TEN-000123</p>
                    </div>
                    <div>
                      <p className="text-slate-400">Unit:</p>
                      <p className="text-white font-semibold">Unit 103</p>
                    </div>
                    <div>
                      <p className="text-slate-400">Monthly Rent:</p>
                      <p className="text-white font-semibold">$1,200</p>
                    </div>
                    <div>
                      <p className="text-slate-400">Lease Duration:</p>
                      <p className="text-white font-semibold">12 months</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          <DialogFooter className="flex justify-between">
            <div className="flex space-x-2">
              {currentStep > 1 && (
                <Button 
                  variant="outline" 
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
                >
                  Back
                </Button>
              )}
              <Button 
                variant="outline" 
                onClick={() => setIsAddTenantOpen(false)}
                className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
              >
                Cancel
              </Button>
            </div>
            <div className="flex space-x-2">
              {currentStep < 4 ? (
                <Button 
                  onClick={() => setCurrentStep(currentStep + 1)}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Next
                </Button>
              ) : (
                <Button 
                  onClick={() => {
                    // Handle form submission
                    setIsAddTenantOpen(false)
                    setCurrentStep(1)
                  }}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Create Tenant
                </Button>
              )}
            </div>
          </DialogFooter>
        </DialogContent>
      </Dialog>


      {/* Communication Center Modal */}
      <Dialog open={isCommunicationOpen} onOpenChange={setIsCommunicationOpen}>
        <DialogContent className="bg-slate-800 border-slate-700 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center">
              <MessageSquare className="w-5 h-5 mr-2" />
              Communication Center
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              Send messages and announcements to tenants
            </DialogDescription>
          </DialogHeader>
          
          <Tabs defaultValue="announcement" className="w-full">
            <TabsList className="grid w-full grid-cols-3 bg-slate-700">
              <TabsTrigger value="announcement" className="data-[state=active]:bg-slate-600">Announcement</TabsTrigger>
              <TabsTrigger value="reminder" className="data-[state=active]:bg-slate-600">Payment Reminder</TabsTrigger>
              <TabsTrigger value="inbox" className="data-[state=active]:bg-slate-600">Message Inbox</TabsTrigger>
            </TabsList>
            
            <TabsContent value="announcement" className="space-y-4">
              <div>
                <Label className="text-slate-300">Subject</Label>
                <Input className="bg-slate-700 border-slate-600 text-white" placeholder="Enter subject" />
              </div>
              <div>
                <Label className="text-slate-300">Message</Label>
                <Textarea className="bg-slate-700 border-slate-600 text-white" rows={4} placeholder="Enter your message..." />
              </div>
              <div>
                <Label className="text-slate-300">Send Via</Label>
                <div className="flex space-x-4 mt-2">
                  <Button variant="outline" className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600">
                    <Mail className="w-4 h-4 mr-2" />
                    Email
                  </Button>
                  <Button variant="outline" className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    SMS
                  </Button>
                  <Button variant="outline" className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600">
                    <Bell className="w-4 h-4 mr-2" />
                    Platform
                  </Button>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="reminder" className="space-y-4">
              <div>
                <Label className="text-slate-300">Select Tenants</Label>
                <Select>
                  <SelectTrigger className="bg-slate-700 border-slate-600">
                    <SelectValue placeholder="Choose tenants" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-700 border-slate-600">
                    <SelectItem value="all">All Tenants</SelectItem>
                    <SelectItem value="overdue">Overdue Only</SelectItem>
                    <SelectItem value="pending">Pending Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label className="text-slate-300">Reminder Type</Label>
                <Select>
                  <SelectTrigger className="bg-slate-700 border-slate-600">
                    <SelectValue placeholder="Select reminder type" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-700 border-slate-600">
                    <SelectItem value="gentle">Gentle Reminder</SelectItem>
                    <SelectItem value="urgent">Urgent Notice</SelectItem>
                    <SelectItem value="final">Final Notice</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>
            
            <TabsContent value="inbox" className="space-y-4">
              <div className="space-y-3">
                {[
                  { from: 'Sarah Johnson', subject: 'Maintenance Request', time: '2 hours ago', unread: true },
                  { from: 'Mike Wilson', subject: 'Payment Confirmation', time: '1 day ago', unread: false },
                  { from: 'Emily Davis', subject: 'Lease Renewal Inquiry', time: '2 days ago', unread: true }
                ].map((message, index) => (
                  <div key={index} className={`p-3 rounded-lg border ${message.unread ? 'bg-blue-500/10 border-blue-500/30' : 'bg-slate-700/30 border-slate-600'}`}>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className={`font-medium ${message.unread ? 'text-white' : 'text-slate-300'}`}>{message.from}</p>
                        <p className="text-sm text-slate-400">{message.subject}</p>
                      </div>
                      <div className="text-right">
                        <p className="text-xs text-slate-500">{message.time}</p>
                        {message.unread && <div className="w-2 h-2 bg-blue-400 rounded-full mt-1 ml-auto"></div>}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCommunicationOpen(false)} className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600">
              Close
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Send className="w-4 h-4 mr-2" />
              Send Message
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
