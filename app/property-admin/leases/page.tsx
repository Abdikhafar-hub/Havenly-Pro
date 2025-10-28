"use client"

import { useState, useEffect } from 'react'
import { 
  FileText, 
  Plus, 
  Search, 
  Filter, 
  Download, 
  Eye, 
  Edit, 
  Trash2, 
  Calendar,
  DollarSign,
  User,
  Building2,
  Clock,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Upload,
  File,
  MoreHorizontal,
  SortAsc,
  SortDesc,
  FileCheck
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
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
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'

// Mock data for demonstration
const leasesData = [
  {
    id: 1,
    leaseNumber: 'L-2024-001',
    tenant: 'John Doe',
    property: 'Sunset Apartments - Unit 101',
    startDate: '2024-01-01',
    endDate: '2024-12-31',
    rentAmount: 1200,
    status: 'active',
    renewalDate: '2024-11-01',
    documentUrl: '/documents/lease-001.pdf',
    paymentSchedule: 'monthly',
    deposit: 1200,
    lastPayment: '2024-01-15',
    nextPayment: '2024-02-01'
  },
  {
    id: 2,
    leaseNumber: 'L-2024-002',
    tenant: 'Sarah Wilson',
    property: 'Downtown Plaza - Unit 205',
    startDate: '2023-06-01',
    endDate: '2024-05-31',
    rentAmount: 1500,
    status: 'expiring',
    renewalDate: '2024-04-01',
    documentUrl: '/documents/lease-002.pdf',
    paymentSchedule: 'monthly',
    deposit: 1500,
    lastPayment: '2024-01-15',
    nextPayment: '2024-02-01'
  },
  {
    id: 3,
    leaseNumber: 'L-2024-003',
    tenant: 'Mike Johnson',
    property: 'Garden View - Unit 302',
    startDate: '2024-02-01',
    endDate: '2025-01-31',
    rentAmount: 1800,
    status: 'active',
    renewalDate: '2024-12-01',
    documentUrl: '/documents/lease-003.pdf',
    paymentSchedule: 'monthly',
    deposit: 1800,
    lastPayment: '2024-01-15',
    nextPayment: '2024-02-01'
  },
  {
    id: 4,
    leaseNumber: 'L-2023-004',
    tenant: 'Emily Davis',
    property: 'Riverside Complex - Unit 108',
    startDate: '2023-01-01',
    endDate: '2023-12-31',
    rentAmount: 1100,
    status: 'expired',
    renewalDate: null,
    documentUrl: '/documents/lease-004.pdf',
    paymentSchedule: 'monthly',
    deposit: 1100,
    lastPayment: '2023-12-15',
    nextPayment: null
  },
  {
    id: 5,
    leaseNumber: 'L-2024-005',
    tenant: 'Robert Brown',
    property: 'Mountain View - Unit 401',
    startDate: '2024-03-01',
    endDate: '2025-02-28',
    rentAmount: 2000,
    status: 'pending',
    renewalDate: '2025-01-01',
    documentUrl: null,
    paymentSchedule: 'monthly',
    deposit: 2000,
    lastPayment: null,
    nextPayment: '2024-03-01'
  }
]

const properties = [
  { id: 1, name: 'Sunset Apartments - Unit 101', address: '123 Sunset Blvd' },
  { id: 2, name: 'Downtown Plaza - Unit 205', address: '456 Main St' },
  { id: 3, name: 'Garden View - Unit 302', address: '789 Garden Ave' },
  { id: 4, name: 'Riverside Complex - Unit 108', address: '321 River Rd' },
  { id: 5, name: 'Mountain View - Unit 401', address: '654 Mountain Dr' }
]

const tenants = [
  { id: 1, name: 'John Doe', email: 'john@email.com', phone: '+1-555-0123' },
  { id: 2, name: 'Sarah Wilson', email: 'sarah@email.com', phone: '+1-555-0124' },
  { id: 3, name: 'Mike Johnson', email: 'mike@email.com', phone: '+1-555-0125' },
  { id: 4, name: 'Emily Davis', email: 'emily@email.com', phone: '+1-555-0126' },
  { id: 5, name: 'Robert Brown', email: 'robert@email.com', phone: '+1-555-0127' }
]

export default function LeasesPage() {
  const [mounted, setMounted] = useState(false)
  const [leases, setLeases] = useState(leasesData)
  const [filteredLeases, setFilteredLeases] = useState(leasesData)
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [sortBy, setSortBy] = useState('endDate')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [selectedLease, setSelectedLease] = useState<any>(null)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isRenewModalOpen, setIsRenewModalOpen] = useState(false)
  const [isTerminateModalOpen, setIsTerminateModalOpen] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    let filtered = leases.filter(lease => {
      const matchesSearch = lease.tenant.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           lease.property.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           lease.leaseNumber.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === 'all' || lease.status === statusFilter
      return matchesSearch && matchesStatus
    })

    // Sort the filtered results
    filtered.sort((a, b) => {
      let aValue = a[sortBy]
      let bValue = b[sortBy]
      
      if (sortBy === 'endDate' || sortBy === 'startDate') {
        aValue = new Date(aValue).getTime()
        bValue = new Date(bValue).getTime()
      }
      
      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : -1
      } else {
        return aValue < bValue ? 1 : -1
      }
    })

    setFilteredLeases(filtered)
  }, [leases, searchTerm, statusFilter, sortBy, sortOrder])

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      active: { color: 'bg-green-500/20 text-green-400', icon: CheckCircle },
      expiring: { color: 'bg-yellow-500/20 text-yellow-400', icon: AlertTriangle },
      expired: { color: 'bg-red-500/20 text-red-400', icon: XCircle },
      pending: { color: 'bg-blue-500/20 text-blue-400', icon: Clock }
    }
    
    const config = statusConfig[status as keyof typeof statusConfig]
    const Icon = config.icon
    
    return (
      <Badge className={`${config.color} border-0`}>
        <Icon className="w-3 h-3 mr-1" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  const getDaysUntilExpiry = (endDate: string) => {
    const today = new Date()
    const expiry = new Date(endDate)
    const diffTime = expiry.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  const handleSort = (column: string) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
    } else {
      setSortBy(column)
      setSortOrder('asc')
    }
  }

  const handleAddLease = (formData: any) => {
    const newLease = {
      id: leases.length + 1,
      leaseNumber: formData.leaseNumber,
      tenant: formData.tenant,
      property: formData.property,
      startDate: formData.startDate,
      endDate: formData.endDate,
      rentAmount: parseInt(formData.rentAmount),
      deposit: parseInt(formData.deposit),
      paymentSchedule: formData.paymentSchedule,
      status: 'pending',
      renewalDate: formData.endDate,
      documentUrl: formData.document ? '/documents/lease-' + (leases.length + 1) + '.pdf' : null,
      lastPayment: null,
      nextPayment: formData.startDate
    }
    setLeases([...leases, newLease])
    setIsAddModalOpen(false)
  }

  const handleEditLease = (formData: any) => {
    const updatedLeases = leases.map(lease => 
      lease.id === selectedLease.id 
        ? { ...lease, ...formData, rentAmount: parseInt(formData.rentAmount), deposit: parseInt(formData.deposit) }
        : lease
    )
    setLeases(updatedLeases)
    setIsEditModalOpen(false)
    setSelectedLease(null)
  }

  const handleRenewLease = (formData: any) => {
    const renewedLease = {
      ...selectedLease,
      startDate: formData.newStartDate,
      endDate: formData.newEndDate,
      rentAmount: parseInt(formData.newRentAmount),
      status: 'active',
      renewalDate: formData.newEndDate,
      lastPayment: null,
      nextPayment: formData.newStartDate
    }
    const updatedLeases = leases.map(lease => 
      lease.id === selectedLease.id ? renewedLease : lease
    )
    setLeases(updatedLeases)
    setIsRenewModalOpen(false)
    setSelectedLease(null)
  }

  const handleTerminateLease = (reason: string) => {
    const updatedLeases = leases.map(lease => 
      lease.id === selectedLease.id 
        ? { ...lease, status: 'expired', endDate: new Date().toISOString().split('T')[0] }
        : lease
    )
    setLeases(updatedLeases)
    setIsTerminateModalOpen(false)
    setSelectedLease(null)
    // Here you would typically send the termination reason to your backend
    console.log('Lease terminated:', selectedLease.id, 'Reason:', reason)
  }

  const handleDeleteLease = (leaseId: number) => {
    const updatedLeases = leases.filter(lease => lease.id !== leaseId)
    setLeases(updatedLeases)
  }

  const handleDownloadDocument = (lease: any) => {
    if (lease.documentUrl) {
      // Simulate document download
      const link = document.createElement('a')
      link.href = lease.documentUrl
      link.download = `lease-${lease.leaseNumber}.pdf`
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    }
  }

  if (!mounted) {
    return null
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2 text-sm text-slate-400 mb-2">
            <span>Dashboard</span>
            <span>/</span>
            <span className="text-slate-300">Leases & Contracts</span>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Lease Management</h1>
        </div>
        <Button 
          className="bg-slate-700 hover:bg-slate-600 text-white"
          onClick={() => setIsAddModalOpen(true)}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add New Lease
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-slate-800 border-l-4 border-blue-500/30 rounded-lg p-4 hover:bg-slate-750 transition-all duration-300">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 rounded-lg bg-blue-500/10">
              <FileText className="w-4 h-4 text-blue-400" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold text-white mb-1">{leases.length}</p>
            <p className="text-xs font-medium text-slate-400">Total Leases</p>
          </div>
        </div>

        <div className="bg-slate-800 border-l-4 border-emerald-500/30 rounded-lg p-4 hover:bg-slate-750 transition-all duration-300">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 rounded-lg bg-emerald-500/10">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold text-white mb-1">
              {leases.filter(l => l.status === 'active').length}
            </p>
            <p className="text-xs font-medium text-slate-400">Active Leases</p>
          </div>
        </div>

        <div className="bg-slate-800 border-l-4 border-orange-500/30 rounded-lg p-4 hover:bg-slate-750 transition-all duration-300">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 rounded-lg bg-orange-500/10">
              <AlertTriangle className="w-4 h-4 text-orange-400" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold text-white mb-1">
              {leases.filter(l => l.status === 'expiring').length}
            </p>
            <p className="text-xs font-medium text-slate-400">Expiring Soon</p>
          </div>
        </div>

        <div className="bg-slate-800 border-l-4 border-purple-500/30 rounded-lg p-4 hover:bg-slate-750 transition-all duration-300">
          <div className="flex items-center justify-between mb-2">
            <div className="p-2 rounded-lg bg-purple-500/10">
              <DollarSign className="w-4 h-4 text-purple-400" />
            </div>
          </div>
          <div>
            <p className="text-2xl font-bold text-white mb-1">
              ${leases.filter(l => l.status === 'active').reduce((sum, l) => sum + l.rentAmount, 0).toLocaleString()}
            </p>
            <p className="text-xs font-medium text-slate-400">Monthly Revenue</p>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
          <Input
            placeholder="Search leases, tenants, or properties..."
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
            <SelectItem value="expiring">Expiring</SelectItem>
            <SelectItem value="expired">Expired</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Leases Table */}
      <Card className="bg-slate-800 border-slate-700 border-2 border-blue-500/20 rounded-xl">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-bold text-blue-400 flex items-center">
            <FileCheck className="w-5 h-5 mr-2" />
            Lease Agreements
          </CardTitle>
          <p className="text-sm text-slate-400">Manage and track all lease agreements</p>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700">
                  <th 
                    className="text-left text-sm font-medium text-slate-400 py-3 cursor-pointer hover:text-white"
                    onClick={() => handleSort('leaseNumber')}
                  >
                    <div className="flex items-center">
                      Lease #
                      {sortBy === 'leaseNumber' && (
                        sortOrder === 'asc' ? <SortAsc className="w-4 h-4 ml-1" /> : <SortDesc className="w-4 h-4 ml-1" />
                      )}
                    </div>
                  </th>
                  <th 
                    className="text-left text-sm font-medium text-slate-400 py-3 cursor-pointer hover:text-white"
                    onClick={() => handleSort('tenant')}
                  >
                    <div className="flex items-center">
                      Tenant
                      {sortBy === 'tenant' && (
                        sortOrder === 'asc' ? <SortAsc className="w-4 h-4 ml-1" /> : <SortDesc className="w-4 h-4 ml-1" />
                      )}
                    </div>
                  </th>
                  <th className="text-left text-sm font-medium text-slate-400 py-3">Property</th>
                  <th 
                    className="text-left text-sm font-medium text-slate-400 py-3 cursor-pointer hover:text-white"
                    onClick={() => handleSort('endDate')}
                  >
                    <div className="flex items-center">
                      End Date
                      {sortBy === 'endDate' && (
                        sortOrder === 'asc' ? <SortAsc className="w-4 h-4 ml-1" /> : <SortDesc className="w-4 h-4 ml-1" />
                      )}
                    </div>
                  </th>
                  <th 
                    className="text-left text-sm font-medium text-slate-400 py-3 cursor-pointer hover:text-white"
                    onClick={() => handleSort('rentAmount')}
                  >
                    <div className="flex items-center">
                      Rent
                      {sortBy === 'rentAmount' && (
                        sortOrder === 'asc' ? <SortAsc className="w-4 h-4 ml-1" /> : <SortDesc className="w-4 h-4 ml-1" />
                      )}
                    </div>
                  </th>
                  <th className="text-left text-sm font-medium text-slate-400 py-3">Status</th>
                  <th className="text-left text-sm font-medium text-slate-400 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredLeases.map((lease) => (
                  <tr key={lease.id} className="border-b border-slate-700/50 hover:bg-slate-700/30">
                    <td className="py-3">
                      <span className="text-white font-medium">{lease.leaseNumber}</span>
                    </td>
                    <td className="py-3">
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-2 text-slate-400" />
                        <span className="text-slate-300">{lease.tenant}</span>
                      </div>
                    </td>
                    <td className="py-3">
                      <div className="flex items-center">
                        <Building2 className="w-4 h-4 mr-2 text-slate-400" />
                        <span className="text-slate-300">{lease.property}</span>
                      </div>
                    </td>
                    <td className="py-3">
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-2 text-slate-400" />
                        <span className="text-slate-300">{new Date(lease.endDate).toLocaleDateString()}</span>
                        {lease.status === 'expiring' && (
                          <span className="ml-2 text-xs text-yellow-400">
                            ({getDaysUntilExpiry(lease.endDate)} days)
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="py-3">
                      <div className="flex items-center">
                        <DollarSign className="w-4 h-4 mr-2 text-slate-400" />
                        <span className="text-white font-medium">${lease.rentAmount.toLocaleString()}</span>
                      </div>
                    </td>
                    <td className="py-3">
                      {getStatusBadge(lease.status)}
                    </td>
                    <td className="py-3">
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white"
                          onClick={() => {
                            setSelectedLease(lease)
                            setIsViewModalOpen(true)
                          }}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white"
                          onClick={() => {
                            setSelectedLease(lease)
                            setIsEditModalOpen(true)
                          }}
                        >
                          <Edit className="w-4 h-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-slate-800 border-slate-700">
                            <DropdownMenuLabel className="text-slate-300">Actions</DropdownMenuLabel>
                            <DropdownMenuSeparator className="bg-slate-700" />
                            {lease.documentUrl && (
                              <DropdownMenuItem 
                                className="text-slate-300 hover:bg-slate-700"
                                onClick={() => handleDownloadDocument(lease)}
                              >
                                <Download className="mr-2 h-4 w-4" />
                                Download PDF
                              </DropdownMenuItem>
                            )}
                            {lease.status === 'active' && (
                              <DropdownMenuItem 
                                className="text-slate-300 hover:bg-slate-700"
                                onClick={() => {
                                  setSelectedLease(lease)
                                  setIsRenewModalOpen(true)
                                }}
                              >
                                <Calendar className="mr-2 h-4 w-4" />
                                Renew Lease
                              </DropdownMenuItem>
                            )}
                            <DropdownMenuSeparator className="bg-slate-700" />
                            <DropdownMenuItem 
                              className="text-red-400 hover:bg-red-500/10"
                              onClick={() => {
                                setSelectedLease(lease)
                                setIsTerminateModalOpen(true)
                              }}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Terminate
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

          {filteredLeases.length === 0 && (
            <div className="text-center py-8">
              <FileText className="w-12 h-12 text-slate-500 mx-auto mb-4" />
              <p className="text-slate-400">No leases found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add Lease Modal */}
      <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
        <DialogContent className="bg-slate-800 border-slate-700 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-white">Add New Lease Agreement</DialogTitle>
            <DialogDescription className="text-slate-400">
              Create a new lease agreement with all necessary details.
            </DialogDescription>
          </DialogHeader>
          <AddLeaseForm onSubmit={handleAddLease} onCancel={() => setIsAddModalOpen(false)} />
        </DialogContent>
      </Dialog>

      {/* View Lease Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="bg-slate-800 border-slate-700 max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-white">Lease Details</DialogTitle>
            <DialogDescription className="text-slate-400">
              Complete information about the selected lease agreement.
            </DialogDescription>
          </DialogHeader>
          {selectedLease && <ViewLeaseDetails lease={selectedLease} />}
        </DialogContent>
      </Dialog>

      {/* Edit Lease Modal */}
      <Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
        <DialogContent className="bg-slate-800 border-slate-700 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-white">Edit Lease Agreement</DialogTitle>
            <DialogDescription className="text-slate-400">
              Update the lease agreement details.
            </DialogDescription>
          </DialogHeader>
          {selectedLease && <EditLeaseForm lease={selectedLease} onSubmit={handleEditLease} onCancel={() => setIsEditModalOpen(false)} />}
        </DialogContent>
      </Dialog>

      {/* Renew Lease Modal */}
      <Dialog open={isRenewModalOpen} onOpenChange={setIsRenewModalOpen}>
        <DialogContent className="bg-slate-800 border-slate-700 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-white">Renew Lease Agreement</DialogTitle>
            <DialogDescription className="text-slate-400">
              Create a new lease term for the existing tenant.
            </DialogDescription>
          </DialogHeader>
          {selectedLease && <RenewLeaseForm lease={selectedLease} onSubmit={handleRenewLease} onCancel={() => setIsRenewModalOpen(false)} />}
        </DialogContent>
      </Dialog>

      {/* Terminate Lease Modal */}
      <Dialog open={isTerminateModalOpen} onOpenChange={setIsTerminateModalOpen}>
        <DialogContent className="bg-slate-800 border-slate-700 max-w-lg">
          <DialogHeader>
            <DialogTitle className="text-white">Terminate Lease Agreement</DialogTitle>
            <DialogDescription className="text-slate-400">
              This action will mark the lease as expired. Please provide a reason.
            </DialogDescription>
          </DialogHeader>
          {selectedLease && <TerminateLeaseForm lease={selectedLease} onSubmit={handleTerminateLease} onCancel={() => setIsTerminateModalOpen(false)} />}
        </DialogContent>
      </Dialog>
    </div>
  )
}

// Add Lease Form Component
function AddLeaseForm({ onSubmit, onCancel }: { onSubmit: (data: any) => void, onCancel: () => void }) {
  const [formData, setFormData] = useState({
    leaseNumber: '',
    tenant: '',
    property: '',
    startDate: '',
    endDate: '',
    rentAmount: '',
    deposit: '',
    paymentSchedule: 'monthly',
    document: null
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="leaseNumber" className="text-slate-300">Lease Number</Label>
          <Input
            id="leaseNumber"
            value={formData.leaseNumber}
            onChange={(e) => setFormData({...formData, leaseNumber: e.target.value})}
            className="bg-slate-700 border-slate-600 text-white"
            required
          />
        </div>
        <div>
          <Label htmlFor="tenant" className="text-slate-300">Tenant</Label>
          <Select value={formData.tenant} onValueChange={(value) => setFormData({...formData, tenant: value})}>
            <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
              <SelectValue placeholder="Select tenant" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              {tenants.map(tenant => (
                <SelectItem key={tenant.id} value={tenant.name}>{tenant.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="property" className="text-slate-300">Property</Label>
          <Select value={formData.property} onValueChange={(value) => setFormData({...formData, property: value})}>
            <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
              <SelectValue placeholder="Select property" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              {properties.map(property => (
                <SelectItem key={property.id} value={property.name}>{property.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="rentAmount" className="text-slate-300">Rent Amount</Label>
          <Input
            id="rentAmount"
            type="number"
            value={formData.rentAmount}
            onChange={(e) => setFormData({...formData, rentAmount: e.target.value})}
            className="bg-slate-700 border-slate-600 text-white"
            required
          />
        </div>
        <div>
          <Label htmlFor="startDate" className="text-slate-300">Start Date</Label>
          <Input
            id="startDate"
            type="date"
            value={formData.startDate}
            onChange={(e) => setFormData({...formData, startDate: e.target.value})}
            className="bg-slate-700 border-slate-600 text-white"
            required
          />
        </div>
        <div>
          <Label htmlFor="endDate" className="text-slate-300">End Date</Label>
          <Input
            id="endDate"
            type="date"
            value={formData.endDate}
            onChange={(e) => setFormData({...formData, endDate: e.target.value})}
            className="bg-slate-700 border-slate-600 text-white"
            required
          />
        </div>
        <div>
          <Label htmlFor="deposit" className="text-slate-300">Security Deposit</Label>
          <Input
            id="deposit"
            type="number"
            value={formData.deposit}
            onChange={(e) => setFormData({...formData, deposit: e.target.value})}
            className="bg-slate-700 border-slate-600 text-white"
            required
          />
        </div>
        <div>
          <Label htmlFor="paymentSchedule" className="text-slate-300">Payment Schedule</Label>
          <Select value={formData.paymentSchedule} onValueChange={(value) => setFormData({...formData, paymentSchedule: value})}>
            <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
              <SelectItem value="annually">Annually</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div>
        <Label htmlFor="document" className="text-slate-300">Lease Document (PDF)</Label>
        <div className="mt-2 flex justify-center px-6 pt-5 pb-6 border-2 border-dashed border-slate-600 rounded-lg hover:border-slate-500 transition-colors">
          <div className="space-y-1 text-center">
            <Upload className="mx-auto h-12 w-12 text-slate-400" />
            <div className="flex text-sm text-slate-400">
              <label htmlFor="document" className="relative cursor-pointer bg-slate-800 rounded-md font-medium text-blue-400 hover:text-blue-300 focus-within:outline-none">
                <span>Upload a file</span>
                <input id="document" name="document" type="file" className="sr-only" accept=".pdf" />
              </label>
              <p className="pl-1">or drag and drop</p>
            </div>
            <p className="text-xs text-slate-500">PDF files only</p>
          </div>
        </div>
      </div>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel} className="border-slate-600 text-slate-300 hover:bg-slate-700">
          Cancel
        </Button>
        <Button type="submit" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">
          Create Lease
        </Button>
      </DialogFooter>
    </form>
  )
}

// View Lease Details Component
function ViewLeaseDetails({ lease }: { lease: any }) {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="bg-slate-700/50 border-slate-600">
          <CardHeader>
            <CardTitle className="text-white text-lg">Lease Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-slate-400">Lease Number:</span>
              <span className="text-white font-medium">{lease.leaseNumber}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Tenant:</span>
              <span className="text-white font-medium">{lease.tenant}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Property:</span>
              <span className="text-white font-medium">{lease.property}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Start Date:</span>
              <span className="text-white font-medium">{new Date(lease.startDate).toLocaleDateString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">End Date:</span>
              <span className="text-white font-medium">{new Date(lease.endDate).toLocaleDateString()}</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-700/50 border-slate-600">
          <CardHeader>
            <CardTitle className="text-white text-lg">Financial Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between">
              <span className="text-slate-400">Monthly Rent:</span>
              <span className="text-white font-medium">${lease.rentAmount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Security Deposit:</span>
              <span className="text-white font-medium">${lease.deposit.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Payment Schedule:</span>
              <span className="text-white font-medium capitalize">{lease.paymentSchedule}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Last Payment:</span>
              <span className="text-white font-medium">
                {lease.lastPayment ? new Date(lease.lastPayment).toLocaleDateString() : 'No payments yet'}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-slate-400">Next Payment:</span>
              <span className="text-white font-medium">
                {lease.nextPayment ? new Date(lease.nextPayment).toLocaleDateString() : 'N/A'}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {lease.documentUrl && (
        <Card className="bg-slate-700/50 border-slate-600">
          <CardHeader>
            <CardTitle className="text-white text-lg">Lease Document</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 bg-slate-600/50 rounded-lg">
              <div className="flex items-center">
                <File className="w-8 h-8 text-red-400 mr-3" />
                <div>
                  <p className="text-white font-medium">Lease Agreement.pdf</p>
                  <p className="text-slate-400 text-sm">PDF Document</p>
                </div>
              </div>
              <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

// Edit Lease Form Component
function EditLeaseForm({ lease, onSubmit, onCancel }: { lease: any, onSubmit: (data: any) => void, onCancel: () => void }) {
  const [formData, setFormData] = useState({
    leaseNumber: lease.leaseNumber,
    tenant: lease.tenant,
    property: lease.property,
    startDate: lease.startDate,
    endDate: lease.endDate,
    rentAmount: lease.rentAmount.toString(),
    deposit: lease.deposit.toString(),
    paymentSchedule: lease.paymentSchedule
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="leaseNumber" className="text-slate-300">Lease Number</Label>
          <Input
            id="leaseNumber"
            value={formData.leaseNumber}
            onChange={(e) => setFormData({...formData, leaseNumber: e.target.value})}
            className="bg-slate-700 border-slate-600 text-white"
            required
          />
        </div>
        <div>
          <Label htmlFor="tenant" className="text-slate-300">Tenant</Label>
          <Select value={formData.tenant} onValueChange={(value) => setFormData({...formData, tenant: value})}>
            <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
              <SelectValue placeholder="Select tenant" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              {tenants.map(tenant => (
                <SelectItem key={tenant.id} value={tenant.name}>{tenant.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="property" className="text-slate-300">Property</Label>
          <Select value={formData.property} onValueChange={(value) => setFormData({...formData, property: value})}>
            <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
              <SelectValue placeholder="Select property" />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              {properties.map(property => (
                <SelectItem key={property.id} value={property.name}>{property.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor="rentAmount" className="text-slate-300">Rent Amount</Label>
          <Input
            id="rentAmount"
            type="number"
            value={formData.rentAmount}
            onChange={(e) => setFormData({...formData, rentAmount: e.target.value})}
            className="bg-slate-700 border-slate-600 text-white"
            required
          />
        </div>
        <div>
          <Label htmlFor="startDate" className="text-slate-300">Start Date</Label>
          <Input
            id="startDate"
            type="date"
            value={formData.startDate}
            onChange={(e) => setFormData({...formData, startDate: e.target.value})}
            className="bg-slate-700 border-slate-600 text-white"
            required
          />
        </div>
        <div>
          <Label htmlFor="endDate" className="text-slate-300">End Date</Label>
          <Input
            id="endDate"
            type="date"
            value={formData.endDate}
            onChange={(e) => setFormData({...formData, endDate: e.target.value})}
            className="bg-slate-700 border-slate-600 text-white"
            required
          />
        </div>
        <div>
          <Label htmlFor="deposit" className="text-slate-300">Security Deposit</Label>
          <Input
            id="deposit"
            type="number"
            value={formData.deposit}
            onChange={(e) => setFormData({...formData, deposit: e.target.value})}
            className="bg-slate-700 border-slate-600 text-white"
            required
          />
        </div>
        <div>
          <Label htmlFor="paymentSchedule" className="text-slate-300">Payment Schedule</Label>
          <Select value={formData.paymentSchedule} onValueChange={(value) => setFormData({...formData, paymentSchedule: value})}>
            <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-700">
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="quarterly">Quarterly</SelectItem>
              <SelectItem value="annually">Annually</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel} className="border-slate-600 text-slate-300 hover:bg-slate-700">
          Cancel
        </Button>
        <Button type="submit" className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">
          Update Lease
        </Button>
      </DialogFooter>
    </form>
  )
}

// Renew Lease Form Component
function RenewLeaseForm({ lease, onSubmit, onCancel }: { lease: any, onSubmit: (data: any) => void, onCancel: () => void }) {
  const [formData, setFormData] = useState({
    newStartDate: '',
    newEndDate: '',
    newRentAmount: lease.rentAmount.toString()
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-slate-700/50 p-4 rounded-lg">
        <h4 className="text-white font-medium mb-2">Current Lease Information</h4>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-slate-400">Current End Date:</span>
            <span className="text-white ml-2">{new Date(lease.endDate).toLocaleDateString()}</span>
          </div>
          <div>
            <span className="text-slate-400">Current Rent:</span>
            <span className="text-white ml-2">${lease.rentAmount.toLocaleString()}</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="newStartDate" className="text-slate-300">New Start Date</Label>
          <Input
            id="newStartDate"
            type="date"
            value={formData.newStartDate}
            onChange={(e) => setFormData({...formData, newStartDate: e.target.value})}
            className="bg-slate-700 border-slate-600 text-white"
            required
          />
        </div>
        <div>
          <Label htmlFor="newEndDate" className="text-slate-300">New End Date</Label>
          <Input
            id="newEndDate"
            type="date"
            value={formData.newEndDate}
            onChange={(e) => setFormData({...formData, newEndDate: e.target.value})}
            className="bg-slate-700 border-slate-600 text-white"
            required
          />
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="newRentAmount" className="text-slate-300">New Rent Amount</Label>
          <Input
            id="newRentAmount"
            type="number"
            value={formData.newRentAmount}
            onChange={(e) => setFormData({...formData, newRentAmount: e.target.value})}
            className="bg-slate-700 border-slate-600 text-white"
            required
          />
        </div>
      </div>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel} className="border-slate-600 text-slate-300 hover:bg-slate-700">
          Cancel
        </Button>
        <Button type="submit" className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white">
          Renew Lease
        </Button>
      </DialogFooter>
    </form>
  )
}

// Terminate Lease Form Component
function TerminateLeaseForm({ lease, onSubmit, onCancel }: { lease: any, onSubmit: (reason: string) => void, onCancel: () => void }) {
  const [reason, setReason] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(reason)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-lg">
        <div className="flex items-center mb-2">
          <AlertTriangle className="w-5 h-5 text-red-400 mr-2" />
          <h4 className="text-red-400 font-medium">Warning</h4>
        </div>
        <p className="text-slate-300 text-sm">
          This action will immediately terminate the lease agreement for <strong>{lease.tenant}</strong> at <strong>{lease.property}</strong>.
        </p>
      </div>

      <div>
        <Label htmlFor="reason" className="text-slate-300">Termination Reason</Label>
        <Textarea
          id="reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          className="bg-slate-700 border-slate-600 text-white"
          placeholder="Please provide a reason for terminating this lease..."
          required
        />
      </div>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onCancel} className="border-slate-600 text-slate-300 hover:bg-slate-700">
          Cancel
        </Button>
        <Button type="submit" className="bg-red-500 hover:bg-red-600 text-white">
          Terminate Lease
        </Button>
      </DialogFooter>
    </form>
  )
}
