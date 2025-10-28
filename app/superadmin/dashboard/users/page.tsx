"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Search, Plus, Eye, Edit, Trash2, MoreVertical, Users, Building, Phone, Mail, Calendar, DollarSign, FileText, UserCheck, UserX } from 'lucide-react'

// Mock data for Property Admins
const adminsData = [
  {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah@havenly.com',
    phone: '+1 (555) 123-4567',
    assignedProperties: ['Sunrise Apartments', 'Oak Manor'],
    totalTenants: 45,
    status: 'Active',
    lastLogin: '2024-01-15',
    role: 'Property Manager',
    dateCreated: '2023-06-15',
    avatar: null
  },
  {
    id: 2,
    name: 'Mike Wilson',
    email: 'mike@havenly.com',
    phone: '+1 (555) 234-5678',
    assignedProperties: ['Riverside Plaza'],
    totalTenants: 78,
    status: 'Active',
    lastLogin: '2024-01-14',
    role: 'Building Supervisor',
    dateCreated: '2023-08-20',
    avatar: null
  },
  {
    id: 3,
    name: 'Emily Davis',
    email: 'emily@havenly.com',
    phone: '+1 (555) 345-6789',
    assignedProperties: ['Garden Heights', 'Metro Tower'],
    totalTenants: 190,
    status: 'Suspended',
    lastLogin: '2024-01-10',
    role: 'Property Manager',
    dateCreated: '2023-04-10',
    avatar: null
  },
  {
    id: 4,
    name: 'David Brown',
    email: 'david@havenly.com',
    phone: '+1 (555) 456-7890',
    assignedProperties: ['Sunrise Apartments'],
    totalTenants: 92,
    status: 'Active',
    lastLogin: '2024-01-15',
    role: 'Leasing Agent',
    dateCreated: '2023-09-05',
    avatar: null
  }
]

// Mock data for Tenants
const tenantsData = [
  {
    id: 1,
    name: 'John Smith',
    email: 'john.smith@email.com',
    phone: '+1 (555) 111-2222',
    propertyName: 'Sunrise Apartments',
    unitNumber: 'Apt 201',
    rentAmount: 1200,
    paymentStatus: 'Paid',
    leaseStart: '2023-09-01',
    leaseEnd: '2024-08-31',
    status: 'Active',
    dateCreated: '2023-08-15',
    avatar: null
  },
  {
    id: 2,
    name: 'Maria Garcia',
    email: 'maria.garcia@email.com',
    phone: '+1 (555) 222-3333',
    propertyName: 'Oak Manor',
    unitNumber: 'Unit 5B',
    rentAmount: 950,
    paymentStatus: 'Pending',
    leaseStart: '2023-10-01',
    leaseEnd: '2024-09-30',
    status: 'Active',
    dateCreated: '2023-09-20',
    avatar: null
  },
  {
    id: 3,
    name: 'Robert Johnson',
    email: 'robert.johnson@email.com',
    phone: '+1 (555) 333-4444',
    propertyName: 'Riverside Plaza',
    unitNumber: 'Suite 301',
    rentAmount: 1800,
    paymentStatus: 'Overdue',
    leaseStart: '2023-07-01',
    leaseEnd: '2024-06-30',
    status: 'Active',
    dateCreated: '2023-06-15',
    avatar: null
  },
  {
    id: 4,
    name: 'Lisa Chen',
    email: 'lisa.chen@email.com',
    phone: '+1 (555) 444-5555',
    propertyName: 'Garden Heights',
    unitNumber: 'Apt 102',
    rentAmount: 1100,
    paymentStatus: 'Paid',
    leaseStart: '2023-11-01',
    leaseEnd: '2024-10-31',
    status: 'Active',
    dateCreated: '2023-10-15',
    avatar: null
  },
  {
    id: 5,
    name: 'Michael Brown',
    email: 'michael.brown@email.com',
    phone: '+1 (555) 555-6666',
    propertyName: 'Metro Tower',
    unitNumber: 'Unit 15A',
    rentAmount: 2200,
    paymentStatus: 'Paid',
    leaseStart: '2023-05-01',
    leaseEnd: '2024-04-30',
    status: 'Vacated',
    dateCreated: '2023-04-20',
    avatar: null
  }
]

const properties = ['Sunrise Apartments', 'Oak Manor', 'Riverside Plaza', 'Garden Heights', 'Metro Tower']
const statusOptions = ['Active', 'Suspended', 'Vacated']
const paymentStatuses = ['Paid', 'Pending', 'Overdue']

export default function UsersManagementPage() {
  const [activeTab, setActiveTab] = useState('admins')
  const [searchTerm, setSearchTerm] = useState('')
  const [roleFilter, setRoleFilter] = useState('all')
  const [propertyFilter, setPropertyFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [paymentFilter, setPaymentFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [selectedUser, setSelectedUser] = useState<any>(null)
  const [isUserModalOpen, setIsUserModalOpen] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const getStatusBadge = (status: string) => {
    const colors = {
      'Active': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
      'Suspended': 'bg-red-500/20 text-red-400 border-red-500/30',
      'Vacated': 'bg-slate-500/20 text-slate-400 border-slate-500/30'
    }
    return <Badge className={colors[status as keyof typeof colors]}>{status}</Badge>
  }

  const getPaymentBadge = (status: string) => {
    const colors = {
      'Paid': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
      'Pending': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      'Overdue': 'bg-red-500/20 text-red-400 border-red-500/30'
    }
    return <Badge className={colors[status as keyof typeof colors]}>{status}</Badge>
  }

  const resetFilters = () => {
    setSearchTerm('')
    setRoleFilter('all')
    setPropertyFilter('all')
    setStatusFilter('all')
    setPaymentFilter('all')
  }

  const filteredAdmins = adminsData.filter(admin => {
    const matchesSearch = admin.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         admin.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         admin.phone.includes(searchTerm)
    const matchesRole = roleFilter === 'all' || roleFilter === 'admin'
    const matchesProperty = propertyFilter === 'all' || admin.assignedProperties.some(prop => prop.includes(propertyFilter))
    const matchesStatus = statusFilter === 'all' || admin.status === statusFilter
    
    return matchesSearch && matchesRole && matchesProperty && matchesStatus
  })

  const filteredTenants = tenantsData.filter(tenant => {
    const matchesSearch = tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tenant.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tenant.phone.includes(searchTerm) ||
                         tenant.propertyName.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesRole = roleFilter === 'all' || roleFilter === 'tenant'
    const matchesProperty = propertyFilter === 'all' || tenant.propertyName.includes(propertyFilter)
    const matchesStatus = statusFilter === 'all' || tenant.status === statusFilter
    const matchesPayment = paymentFilter === 'all' || tenant.paymentStatus === paymentFilter
    
    return matchesSearch && matchesRole && matchesProperty && matchesStatus && matchesPayment
  })

  const handleViewUser = (user: any, type: string) => {
    setSelectedUser({ ...user, type })
    setIsUserModalOpen(true)
  }

  const currentData = activeTab === 'admins' ? filteredAdmins : filteredTenants
  const totalPages = Math.ceil(currentData.length / rowsPerPage)
  const startIndex = (currentPage - 1) * rowsPerPage
  const endIndex = startIndex + rowsPerPage
  const currentUsers = currentData.slice(startIndex, endIndex)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-blue-400">Users Management</h1>
          <p className="text-slate-400 mt-2">View and manage all property admins and tenants in the system</p>
        </div>
        
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-blue-600 hover:bg-blue-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add User
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-slate-800 border-slate-700 max-w-2xl">
            <DialogHeader>
              <DialogTitle className="text-xl font-bold text-blue-400">Add New User</DialogTitle>
            </DialogHeader>
            <div className="p-4">
              <p className="text-slate-400">User creation form would go here...</p>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Search and Filter Bar */}
      <Card className="bg-slate-800 border-slate-700 border-2 border-blue-500/20">
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex-1 min-w-64">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  placeholder="Search by name, email, phone, property..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-slate-700 border-slate-600 text-white"
                />
              </div>
            </div>
            
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-32 bg-slate-700 border-slate-600 text-white">
                <SelectValue placeholder="Role" />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                <SelectItem value="all" className="text-white">All Roles</SelectItem>
                <SelectItem value="admin" className="text-white">Admins</SelectItem>
                <SelectItem value="tenant" className="text-white">Tenants</SelectItem>
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

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-32 bg-slate-700 border-slate-600 text-white">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                <SelectItem value="all" className="text-white">All Status</SelectItem>
                {statusOptions.map(status => (
                  <SelectItem key={status} value={status} className="text-white">{status}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            {activeTab === 'tenants' && (
              <Select value={paymentFilter} onValueChange={setPaymentFilter}>
                <SelectTrigger className="w-32 bg-slate-700 border-slate-600 text-white">
                  <SelectValue placeholder="Payment" />
                </SelectTrigger>
                <SelectContent className="bg-slate-700 border-slate-600">
                  <SelectItem value="all" className="text-white">All Payments</SelectItem>
                  {paymentStatuses.map(status => (
                    <SelectItem key={status} value={status} className="text-white">{status}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}

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

      {/* Tabbed View */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-slate-800 border-slate-700">
          <TabsTrigger value="admins" className="text-blue-400 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=inactive]:text-blue-400 data-[state=inactive]:hover:text-blue-300">
            <Users className="w-4 h-4 mr-2" />
            Property Admins ({filteredAdmins.length})
          </TabsTrigger>
          <TabsTrigger value="tenants" className="text-blue-400 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=inactive]:text-blue-400 data-[state=inactive]:hover:text-blue-300">
            <Building className="w-4 h-4 mr-2" />
            Tenants ({filteredTenants.length})
          </TabsTrigger>
        </TabsList>

        {/* Property Admins Tab */}
        <TabsContent value="admins">
          <Card className="bg-slate-800 border-slate-700 border-2 border-blue-500/20">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-700/50">
                    <tr>
                      <th className="text-left p-4 text-slate-300 font-medium">Name</th>
                      <th className="text-left p-4 text-slate-300 font-medium">Contact</th>
                      <th className="text-left p-4 text-slate-300 font-medium">Assigned Properties</th>
                      <th className="text-left p-4 text-slate-300 font-medium">Total Tenants</th>
                      <th className="text-left p-4 text-slate-300 font-medium">Status</th>
                      <th className="text-left p-4 text-slate-300 font-medium">Last Login</th>
                      <th className="text-left p-4 text-slate-300 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentUsers.map((admin: any, index) => (
                      <tr key={admin.id} className={`border-b border-slate-700 hover:bg-slate-700/30 ${index % 2 === 0 ? 'bg-slate-800/50' : 'bg-slate-800'}`}>
                        <td className="p-4">
                          <div className="flex items-center">
                            <Avatar className="w-10 h-10 mr-3">
                              <AvatarImage src={admin.avatar || ''} />
                              <AvatarFallback className="bg-yellow-500 text-slate-900 text-sm">
                                {admin.name.split(' ').map((n: string) => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium text-white">{admin.name}</div>
                              <div className="text-sm text-slate-400">{admin.role}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="space-y-1">
                            <div className="flex items-center text-slate-300 text-sm">
                              <Mail className="w-3 h-3 mr-2" />
                              {admin.email}
                            </div>
                            <div className="flex items-center text-slate-300 text-sm">
                              <Phone className="w-3 h-3 mr-2" />
                              {admin.phone}
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="space-y-1">
                            {admin.assignedProperties?.map((property: string, idx: number) => (
                              <div key={idx} className="text-slate-300 text-sm">{property}</div>
                            )) || <div className="text-slate-400 text-sm">No properties assigned</div>}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center text-slate-300">
                            <Users className="w-4 h-4 mr-2" />
                            {admin.totalTenants || 0}
                          </div>
                        </td>
                        <td className="p-4">
                          {getStatusBadge(admin.status)}
                        </td>
                        <td className="p-4">
                          <div className="flex items-center text-slate-300 text-sm">
                            <Calendar className="w-3 h-3 mr-2" />
                            {admin.lastLogin || 'Never'}
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
                              onClick={() => handleViewUser(admin, 'admin')}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white hover:bg-slate-700">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white hover:bg-slate-700">
                                  <MoreVertical className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent className="bg-slate-700 border-slate-600">
                                <DropdownMenuItem className="text-white hover:bg-slate-600">
                                  <UserCheck className="w-4 h-4 mr-2" />
                                  Activate
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-white hover:bg-slate-600">
                                  <UserX className="w-4 h-4 mr-2" />
                                  Suspend
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-400 hover:bg-red-500/10">
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
        </TabsContent>

        {/* Tenants Tab */}
        <TabsContent value="tenants">
          <Card className="bg-slate-800 border-slate-700 border-2 border-blue-500/20">
            <CardContent className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-slate-700/50">
                    <tr>
                      <th className="text-left p-4 text-slate-300 font-medium">Name</th>
                      <th className="text-left p-4 text-slate-300 font-medium">Contact</th>
                      <th className="text-left p-4 text-slate-300 font-medium">Property</th>
                      <th className="text-left p-4 text-slate-300 font-medium">Unit</th>
                      <th className="text-left p-4 text-slate-300 font-medium">Rent</th>
                      <th className="text-left p-4 text-slate-300 font-medium">Payment</th>
                      <th className="text-left p-4 text-slate-300 font-medium">Lease Period</th>
                      <th className="text-left p-4 text-slate-300 font-medium">Status</th>
                      <th className="text-left p-4 text-slate-300 font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentUsers.map((tenant: any, index) => (
                      <tr key={tenant.id} className={`border-b border-slate-700 hover:bg-slate-700/30 ${index % 2 === 0 ? 'bg-slate-800/50' : 'bg-slate-800'}`}>
                        <td className="p-4">
                          <div className="flex items-center">
                            <Avatar className="w-10 h-10 mr-3">
                              <AvatarImage src={tenant.avatar || ''} />
                              <AvatarFallback className="bg-blue-500 text-white text-sm">
                                {tenant.name.split(' ').map((n: string) => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium text-white">{tenant.name}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="space-y-1">
                            <div className="flex items-center text-slate-300 text-sm">
                              <Mail className="w-3 h-3 mr-2" />
                              {tenant.email}
                            </div>
                            <div className="flex items-center text-slate-300 text-sm">
                              <Phone className="w-3 h-3 mr-2" />
                              {tenant.phone}
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="text-slate-300">{tenant.propertyName}</div>
                        </td>
                        <td className="p-4">
                          <div className="text-slate-300">{tenant.unitNumber}</div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center text-slate-300">
                            <DollarSign className="w-4 h-4 mr-1" />
                            {tenant.rentAmount}
                          </div>
                        </td>
                        <td className="p-4">
                          {getPaymentBadge(tenant.paymentStatus)}
                        </td>
                        <td className="p-4">
                          <div className="text-slate-300 text-sm">
                            <div>{tenant.leaseStart}</div>
                            <div className="text-slate-400">to {tenant.leaseEnd}</div>
                          </div>
                        </td>
                        <td className="p-4">
                          {getStatusBadge(tenant.status)}
                        </td>
                        <td className="p-4">
                          <div className="flex items-center space-x-2">
                            <Button 
                              variant="ghost" 
                              size="sm" 
                              className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
                              onClick={() => handleViewUser(tenant, 'tenant')}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white hover:bg-slate-700">
                              <Edit className="w-4 h-4" />
                            </Button>
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white hover:bg-slate-700">
                                  <MoreVertical className="w-4 h-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent className="bg-slate-700 border-slate-600">
                                <DropdownMenuItem className="text-white hover:bg-slate-600">
                                  <FileText className="w-4 h-4 mr-2" />
                                  View Documents
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-white hover:bg-slate-600">
                                  <DollarSign className="w-4 h-4 mr-2" />
                                  Payment History
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-400 hover:bg-red-500/10">
                                  <Trash2 className="w-4 h-4 mr-2" />
                                  Remove
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
        </TabsContent>
      </Tabs>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-slate-400">
          Showing {startIndex + 1}-{Math.min(endIndex, currentData.length)} of {currentData.length} {activeTab === 'admins' ? 'Admins' : 'Tenants'}
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

      {/* User Details Modal */}
      <Dialog open={isUserModalOpen} onOpenChange={setIsUserModalOpen}>
        <DialogContent className="bg-slate-800 border-slate-700 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold text-blue-400">
              {selectedUser?.type === 'admin' ? 'Admin Details' : 'Tenant Details'}
            </DialogTitle>
          </DialogHeader>
          {selectedUser && (
            <div className="p-4 space-y-6">
              {selectedUser.type === 'admin' ? (
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={selectedUser.avatar || ''} />
                      <AvatarFallback className="bg-yellow-500 text-slate-900 text-lg">
                        {selectedUser.name.split(' ').map((n: string) => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-xl font-semibold text-white">{selectedUser.name}</h3>
                      <p className="text-slate-400">{selectedUser.role}</p>
                      <p className="text-slate-400">{selectedUser.email}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-slate-400 text-sm">Phone</label>
                      <p className="text-white">{selectedUser.phone}</p>
                    </div>
                    <div>
                      <label className="text-slate-400 text-sm">Status</label>
                      <div className="mt-1">{getStatusBadge(selectedUser.status)}</div>
                    </div>
                    <div>
                      <label className="text-slate-400 text-sm">Total Tenants</label>
                      <p className="text-white">{selectedUser.totalTenants || 0}</p>
                    </div>
                    <div>
                      <label className="text-slate-400 text-sm">Last Login</label>
                      <p className="text-white">{selectedUser.lastLogin || 'Never'}</p>
                    </div>
                  </div>
                  
                  <div>
                    <label className="text-slate-400 text-sm">Assigned Properties</label>
                    <div className="mt-1 space-y-1">
                      {selectedUser.assignedProperties?.map((property: string, idx: number) => (
                        <div key={idx} className="text-white">{property}</div>
                      )) || <div className="text-slate-400">No properties assigned</div>}
                    </div>
                  </div>
                  
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    <Building className="w-4 h-4 mr-2" />
                    View Properties Managed
                  </Button>
                </div>
              ) : (
                <div className="space-y-4">
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={selectedUser.avatar || ''} />
                      <AvatarFallback className="bg-blue-500 text-white text-lg">
                        {selectedUser.name.split(' ').map((n: string) => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="text-xl font-semibold text-white">{selectedUser.name}</h3>
                      <p className="text-slate-400">{selectedUser.email}</p>
                      <p className="text-slate-400">{selectedUser.phone}</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-slate-400 text-sm">Property</label>
                      <p className="text-white">{selectedUser.propertyName}</p>
                    </div>
                    <div>
                      <label className="text-slate-400 text-sm">Unit</label>
                      <p className="text-white">{selectedUser.unitNumber}</p>
                    </div>
                    <div>
                      <label className="text-slate-400 text-sm">Rent Amount</label>
                      <p className="text-white">${selectedUser.rentAmount}</p>
                    </div>
                    <div>
                      <label className="text-slate-400 text-sm">Payment Status</label>
                      <div className="mt-1">{getPaymentBadge(selectedUser.paymentStatus)}</div>
                    </div>
                    <div>
                      <label className="text-slate-400 text-sm">Lease Start</label>
                      <p className="text-white">{selectedUser.leaseStart}</p>
                    </div>
                    <div>
                      <label className="text-slate-400 text-sm">Lease End</label>
                      <p className="text-white">{selectedUser.leaseEnd}</p>
                    </div>
                  </div>
                  
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                    <FileText className="w-4 h-4 mr-2" />
                    View Tenant Record
                  </Button>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
