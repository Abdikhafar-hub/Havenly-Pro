"use client"

import { useState, useEffect } from 'react'
import { 
  Users, 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  Edit, 
  Trash2, 
  UserCheck, 
  UserX, 
  Shield, 
  Activity, 
  TrendingUp, 
  BarChart3,
  Settings,
  Eye,
  Clock,
  Mail,
  Phone,
  MapPin,
  Calendar,
  AlertCircle,
  CheckCircle,
  XCircle,
  UserPlus,
  Key,
  Lock,
  Unlock
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table'
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger 
} from '@/components/ui/dialog'
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Checkbox } from '@/components/ui/checkbox'
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select'
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
  BarChart as RechartsBarChart,
  Bar
} from 'recharts'

// Mock data for demonstration
const staffData = [
  {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah.johnson@havenly.com',
    phone: '+1 (555) 123-4567',
    role: 'Property Manager',
    status: 'active',
    lastLogin: '2024-01-15 09:30',
    permissions: ['view_tenants', 'manage_payments', 'view_reports'],
    avatar: '',
    joinDate: '2023-06-15',
    department: 'Property Management'
  },
  {
    id: 2,
    name: 'Michael Chen',
    email: 'michael.chen@havenly.com',
    phone: '+1 (555) 234-5678',
    role: 'Maintenance Supervisor',
    status: 'active',
    lastLogin: '2024-01-15 08:45',
    permissions: ['view_maintenance', 'manage_inventory'],
    avatar: '',
    joinDate: '2023-08-20',
    department: 'Maintenance'
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    email: 'emily.rodriguez@havenly.com',
    phone: '+1 (555) 345-6789',
    role: 'Finance Assistant',
    status: 'suspended',
    lastLogin: '2024-01-10 14:20',
    permissions: ['view_payments', 'view_reports'],
    avatar: '',
    joinDate: '2023-09-10',
    department: 'Finance'
  },
  {
    id: 4,
    name: 'David Kim',
    email: 'david.kim@havenly.com',
    phone: '+1 (555) 456-7890',
    role: 'Tenant Relations',
    status: 'active',
    lastLogin: '2024-01-15 10:15',
    permissions: ['view_tenants', 'manage_leases'],
    avatar: '',
    joinDate: '2023-11-05',
    department: 'Customer Service'
  },
  {
    id: 5,
    name: 'Lisa Thompson',
    email: 'lisa.thompson@havenly.com',
    phone: '+1 (555) 567-8901',
    role: 'Senior Property Manager',
    status: 'active',
    lastLogin: '2024-01-15 11:00',
    permissions: ['view_tenants', 'manage_payments', 'view_reports', 'manage_staff'],
    avatar: '',
    joinDate: '2022-03-12',
    department: 'Property Management'
  }
]

const roleData = [
  {
    id: 1,
    name: 'Property Manager',
    description: 'Full access to property management features',
    permissions: ['view_tenants', 'manage_payments', 'view_reports', 'manage_maintenance'],
    staffCount: 2,
    color: 'bg-blue-500'
  },
  {
    id: 2,
    name: 'Maintenance Supervisor',
    description: 'Access to maintenance and inventory management',
    permissions: ['view_maintenance', 'manage_inventory', 'view_tenants'],
    staffCount: 1,
    color: 'bg-green-500'
  },
  {
    id: 3,
    name: 'Finance Assistant',
    description: 'Limited access to financial data and reports',
    permissions: ['view_payments', 'view_reports'],
    staffCount: 1,
    color: 'bg-yellow-500'
  },
  {
    id: 4,
    name: 'Tenant Relations',
    description: 'Customer service and tenant management',
    permissions: ['view_tenants', 'manage_leases'],
    staffCount: 1,
    color: 'bg-purple-500'
  }
]

const activityLogs = [
  {
    id: 1,
    staffName: 'Sarah Johnson',
    action: 'Created new tenant record',
    details: 'Added John Doe to Unit 101',
    timestamp: '2024-01-15 14:30',
    type: 'create'
  },
  {
    id: 2,
    staffName: 'Michael Chen',
    action: 'Updated maintenance request',
    details: 'Completed HVAC repair in Building A',
    timestamp: '2024-01-15 13:45',
    type: 'update'
  },
  {
    id: 3,
    staffName: 'Emily Rodriguez',
    action: 'Processed payment',
    details: 'Recorded $1,200 rent payment from Unit 205',
    timestamp: '2024-01-15 12:20',
    type: 'payment'
  },
  {
    id: 4,
    staffName: 'David Kim',
    action: 'Generated report',
    details: 'Monthly occupancy report for January',
    timestamp: '2024-01-15 11:15',
    type: 'report'
  },
  {
    id: 5,
    staffName: 'Lisa Thompson',
    action: 'Suspended staff account',
    details: 'Temporarily suspended Emily Rodriguez access',
    timestamp: '2024-01-15 10:30',
    type: 'admin'
  }
]

const analyticsData = {
  staffDistribution: [
    { name: 'Property Management', value: 40, color: '#3B82F6' },
    { name: 'Maintenance', value: 20, color: '#10B981' },
    { name: 'Finance', value: 20, color: '#F59E0B' },
    { name: 'Customer Service', value: 20, color: '#8B5CF6' }
  ],
  activityTrend: [
    { month: 'Jan', logins: 45, actions: 120 },
    { month: 'Feb', logins: 52, actions: 135 },
    { month: 'Mar', logins: 48, actions: 110 },
    { month: 'Apr', logins: 61, actions: 145 },
    { month: 'May', logins: 55, actions: 130 },
    { month: 'Jun', logins: 58, actions: 140 }
  ]
}

const availablePermissions = [
  { id: 'view_tenants', name: 'View Tenants', description: 'Access tenant information and records' },
  { id: 'manage_tenants', name: 'Manage Tenants', description: 'Create, edit, and delete tenant records' },
  { id: 'view_payments', name: 'View Payments', description: 'Access payment history and financial data' },
  { id: 'manage_payments', name: 'Manage Payments', description: 'Process and record payments' },
  { id: 'view_reports', name: 'View Reports', description: 'Access analytics and reporting features' },
  { id: 'manage_reports', name: 'Generate Reports', description: 'Create and export reports' },
  { id: 'view_maintenance', name: 'View Maintenance', description: 'Access maintenance requests and history' },
  { id: 'manage_maintenance', name: 'Manage Maintenance', description: 'Create and update maintenance requests' },
  { id: 'manage_inventory', name: 'Manage Inventory', description: 'Access and update inventory records' },
  { id: 'manage_leases', name: 'Manage Leases', description: 'Create and manage lease agreements' },
  { id: 'manage_staff', name: 'Manage Staff', description: 'Add, edit, and manage staff accounts' },
  { id: 'system_admin', name: 'System Administration', description: 'Full system access and configuration' }
]

export default function StaffManagement() {
  const [mounted, setMounted] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [selectedStaff, setSelectedStaff] = useState(null)
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false)
  const [isEditModalOpen, setIsEditModalOpen] = useState(false)
  const [isRoleModalOpen, setIsRoleModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [isEditRoleModalOpen, setIsEditRoleModalOpen] = useState(false)
  const [newStaff, setNewStaff] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    department: '',
    permissions: []
  })
  const [newRole, setNewRole] = useState({
    name: '',
    description: '',
    permissions: []
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const filteredStaff = staffData.filter(staff => {
    const matchesSearch = staff.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         staff.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         staff.role.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = filterStatus === 'all' || staff.status === filterStatus
    return matchesSearch && matchesStatus
  })

  const handleCreateStaff = () => {
    // Implementation for creating staff
    console.log('Creating staff:', newStaff)
    setIsCreateModalOpen(false)
    setNewStaff({ name: '', email: '', phone: '', role: '', department: '', permissions: [] })
  }

  const handleEditStaff = (staff) => {
    setSelectedStaff(staff)
    setIsEditModalOpen(true)
  }

  const handleDeleteStaff = (staffId) => {
    // Implementation for deleting staff
    console.log('Deleting staff:', staffId)
  }

  const handleSuspendStaff = (staffId) => {
    // Implementation for suspending staff
    console.log('Suspending staff:', staffId)
  }

  const handleCreateRole = () => {
    // Implementation for creating role
    console.log('Creating role:', newRole)
    setIsRoleModalOpen(false)
    setNewRole({ name: '', description: '', permissions: [] })
  }

  const getStatusBadge = (status) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Active</Badge>
      case 'suspended':
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Suspended</Badge>
      case 'inactive':
        return <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/30">Inactive</Badge>
      default:
        return <Badge className="bg-gray-500/20 text-gray-400 border-gray-500/30">Unknown</Badge>
    }
  }

  const getActivityIcon = (type) => {
    switch (type) {
      case 'create':
        return <UserPlus className="w-4 h-4 text-green-400" />
      case 'update':
        return <Edit className="w-4 h-4 text-blue-400" />
      case 'payment':
        return <CheckCircle className="w-4 h-4 text-green-400" />
      case 'report':
        return <BarChart3 className="w-4 h-4 text-purple-400" />
      case 'admin':
        return <Shield className="w-4 h-4 text-red-400" />
      default:
        return <Activity className="w-4 h-4 text-gray-400" />
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Staff & Roles Management</h1>
          <p className="text-slate-400 mt-2">Manage staff accounts, roles, and permissions</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button 
            onClick={() => setIsCreateModalOpen(true)}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Staff
          </Button>
          <Button 
            onClick={() => setIsRoleModalOpen(true)}
            variant="outline" 
            className="border-slate-600 text-slate-300 hover:bg-slate-700"
          >
            <Shield className="w-4 h-4 mr-2" />
            Manage Roles
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 hover:border-blue-500/50 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Total Staff</CardTitle>
            <Users className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{staffData.length}</div>
            <p className="text-xs text-green-400 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +2 this month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 hover:border-green-500/50 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Active Staff</CardTitle>
            <UserCheck className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{staffData.filter(s => s.status === 'active').length}</div>
            <p className="text-xs text-green-400">Currently working</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 hover:border-yellow-500/50 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Roles Defined</CardTitle>
            <Shield className="h-4 w-4 text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{roleData.length}</div>
            <p className="text-xs text-slate-400">Custom roles available</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 hover:border-red-500/50 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Suspended</CardTitle>
            <UserX className="h-4 w-4 text-red-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">{staffData.filter(s => s.status === 'suspended').length}</div>
            <p className="text-xs text-red-400">Access restricted</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="staff" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4 bg-slate-800/50 border-slate-700">
          <TabsTrigger value="staff" className="text-blue-400 data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400 data-[state=inactive]:text-blue-300 hover:text-blue-200">Staff Management</TabsTrigger>
          <TabsTrigger value="roles" className="text-blue-400 data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400 data-[state=inactive]:text-blue-300 hover:text-blue-200">Role Management</TabsTrigger>
          <TabsTrigger value="activity" className="text-blue-400 data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400 data-[state=inactive]:text-blue-300 hover:text-blue-200">Activity Logs</TabsTrigger>
          <TabsTrigger value="analytics" className="text-blue-400 data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400 data-[state=inactive]:text-blue-300 hover:text-blue-200">Analytics</TabsTrigger>
        </TabsList>

        {/* Staff Management Tab */}
        <TabsContent value="staff" className="space-y-6">
          {/* Search and Filters */}
          <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                  <Input
                    placeholder="Search staff by name, email, or role..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder-slate-400"
                  />
                </div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-full sm:w-48 bg-slate-700/50 border-slate-600 text-white">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="suspended">Suspended</SelectItem>
                    <SelectItem value="inactive">Inactive</SelectItem>
                  </SelectContent>
                </Select>
                <Button 
                  variant="outline" 
                  className="border-slate-600 text-slate-300 hover:bg-slate-700"
                >
                  <Filter className="w-4 h-4 mr-2" />
                  More Filters
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Staff Table */}
          <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Staff Directory</CardTitle>
              <CardDescription className="text-slate-400">
                Manage your team members and their access permissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-700">
                      <TableHead className="text-slate-300">Staff Member</TableHead>
                      <TableHead className="text-slate-300">Role</TableHead>
                      <TableHead className="text-slate-300">Department</TableHead>
                      <TableHead className="text-slate-300">Last Login</TableHead>
                      <TableHead className="text-slate-300">Status</TableHead>
                      <TableHead className="text-slate-300">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredStaff.map((staff) => (
                      <TableRow key={staff.id} className="border-slate-700 hover:bg-slate-700/50">
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar className="w-10 h-10">
                              <AvatarImage src={staff.avatar} />
                              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                                {staff.name.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium text-white">{staff.name}</div>
                              <div className="text-sm text-slate-400">{staff.email}</div>
                              <div className="text-xs text-slate-500">{staff.phone}</div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="text-white font-medium">{staff.role}</div>
                          <div className="text-sm text-slate-400">{staff.department}</div>
                        </TableCell>
                        <TableCell>
                          <div className="text-slate-300">{staff.department}</div>
                        </TableCell>
                        <TableCell>
                          <div className="text-slate-300">{staff.lastLogin}</div>
                        </TableCell>
                        <TableCell>
                          {getStatusBadge(staff.status)}
                        </TableCell>
                        <TableCell>
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                              <Button variant="ghost" className="h-8 w-8 p-0">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="bg-slate-800 border-slate-700">
                              <DropdownMenuLabel className="text-slate-300">Actions</DropdownMenuLabel>
                              <DropdownMenuSeparator className="bg-slate-700" />
                              <DropdownMenuItem 
                                onClick={() => {
                                  setSelectedStaff(staff)
                                  setIsViewModalOpen(true)
                                }}
                                className="text-slate-300 hover:bg-slate-700"
                              >
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => handleEditStaff(staff)}
                                className="text-slate-300 hover:bg-slate-700"
                              >
                                <Edit className="mr-2 h-4 w-4" />
                                Edit
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => handleSuspendStaff(staff.id)}
                                className="text-slate-300 hover:bg-slate-700"
                              >
                                <UserX className="mr-2 h-4 w-4" />
                                {staff.status === 'active' ? 'Suspend' : 'Activate'}
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                onClick={() => handleDeleteStaff(staff.id)}
                                className="text-red-400 hover:bg-red-500/10"
                              >
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Role Management Tab */}
        <TabsContent value="roles" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {roleData.map((role) => (
              <Card key={role.id} className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 hover:border-blue-500/50 transition-all duration-300">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-white flex items-center">
                      <div className={`w-3 h-3 rounded-full ${role.color} mr-3`}></div>
                      {role.name}
                    </CardTitle>
                    <div className="flex items-center space-x-2">
                      <Badge variant="secondary" className="bg-slate-700 text-slate-300">
                        {role.staffCount} staff
                      </Badge>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-slate-800 border-slate-700">
                          <DropdownMenuLabel className="text-slate-300">Actions</DropdownMenuLabel>
                          <DropdownMenuSeparator className="bg-slate-700" />
                          <DropdownMenuItem 
                            onClick={() => {
                              setNewRole({...role, permissions: role.permissions})
                              setIsEditRoleModalOpen(true)
                            }}
                            className="text-slate-300 hover:bg-slate-700"
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Role
                          </DropdownMenuItem>
                          <DropdownMenuItem 
                            onClick={() => console.log('Delete role:', role.id)}
                            className="text-red-400 hover:bg-red-500/10"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Role
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                  <CardDescription className="text-slate-400">
                    {role.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-slate-300 mb-2">Permissions:</div>
                    <div className="flex flex-wrap gap-1">
                      {role.permissions.map((permission) => (
                        <Badge key={permission} variant="outline" className="text-xs border-slate-600 text-slate-400">
                          {permission.replace('_', ' ')}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Activity Logs Tab */}
        <TabsContent value="activity" className="space-y-6">
          <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Activity className="w-5 h-5 mr-2 text-blue-400" />
                Recent Activity Logs
              </CardTitle>
              <CardDescription className="text-slate-400">
                Track all staff actions and system activities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {activityLogs.map((log) => (
                  <div key={log.id} className="flex items-start space-x-4 p-4 rounded-lg bg-slate-700/50 hover:bg-slate-700/70 transition-colors">
                    <div className="flex-shrink-0">
                      {getActivityIcon(log.type)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-white">{log.staffName}</p>
                        <p className="text-xs text-slate-400">{log.timestamp}</p>
                      </div>
                      <p className="text-sm text-slate-300 mt-1">{log.action}</p>
                      <p className="text-xs text-slate-400 mt-1">{log.details}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Staff Distribution */}
            <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <BarChart3 className="w-5 h-5 mr-2 text-blue-400" />
                  Staff Distribution
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Staff members by department
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsPieChart>
                      <Pie
                        data={analyticsData.staffDistribution}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {analyticsData.staffDistribution.map((entry, index) => (
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
                  {analyticsData.staffDistribution.map((item, index) => (
                    <div key={index} className="flex items-center">
                      <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
                      <span className="text-sm text-slate-300">{item.name} ({item.value}%)</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Activity Trends */}
            <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <TrendingUp className="w-5 h-5 mr-2 text-green-400" />
                  Activity Trends
                </CardTitle>
                <CardDescription className="text-slate-400">
                  Staff login and action trends over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <RechartsLineChart data={analyticsData.activityTrend}>
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
                        dataKey="logins" 
                        stroke="#3B82F6" 
                        strokeWidth={3}
                        dot={{ fill: '#3B82F6', strokeWidth: 2, r: 6 }}
                        name="Logins"
                      />
                      <Line 
                        type="monotone" 
                        dataKey="actions" 
                        stroke="#10B981" 
                        strokeWidth={3}
                        dot={{ fill: '#10B981', strokeWidth: 2, r: 6 }}
                        name="Actions"
                      />
                    </RechartsLineChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Create Staff Modal */}
      <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
        <DialogContent className="max-w-2xl bg-slate-800 border-slate-700">
          <DialogHeader>
            <DialogTitle className="text-white">Add New Staff Member</DialogTitle>
            <DialogDescription className="text-slate-400">
              Create a new staff account with role and permissions
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name" className="text-slate-300">Full Name</Label>
                <Input
                  id="name"
                  value={newStaff.name}
                  onChange={(e) => setNewStaff({...newStaff, name: e.target.value})}
                  className="bg-slate-700 border-slate-600 text-white"
                  placeholder="Enter full name"
                />
              </div>
              <div>
                <Label htmlFor="email" className="text-slate-300">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={newStaff.email}
                  onChange={(e) => setNewStaff({...newStaff, email: e.target.value})}
                  className="bg-slate-700 border-slate-600 text-white"
                  placeholder="Enter email address"
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone" className="text-slate-300">Phone Number</Label>
                <Input
                  id="phone"
                  value={newStaff.phone}
                  onChange={(e) => setNewStaff({...newStaff, phone: e.target.value})}
                  className="bg-slate-700 border-slate-600 text-white"
                  placeholder="Enter phone number"
                />
              </div>
              <div>
                <Label htmlFor="department" className="text-slate-300">Department</Label>
                <Select value={newStaff.department} onValueChange={(value) => setNewStaff({...newStaff, department: value})}>
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                    <SelectValue placeholder="Select department" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-800 border-slate-700">
                    <SelectItem value="property-management">Property Management</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="customer-service">Customer Service</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div>
              <Label htmlFor="role" className="text-slate-300">Role</Label>
              <Select value={newStaff.role} onValueChange={(value) => setNewStaff({...newStaff, role: value})}>
                <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                  <SelectValue placeholder="Select role" />
                </SelectTrigger>
                <SelectContent className="bg-slate-800 border-slate-700">
                  {roleData.map((role) => (
                    <SelectItem key={role.id} value={role.name}>{role.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label className="text-slate-300">Permissions</Label>
              <div className="grid grid-cols-2 gap-2 mt-2 max-h-40 overflow-y-auto">
                {availablePermissions.map((permission) => (
                  <div key={permission.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={permission.id}
                      checked={newStaff.permissions.includes(permission.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setNewStaff({...newStaff, permissions: [...newStaff.permissions, permission.id]})
                        } else {
                          setNewStaff({...newStaff, permissions: newStaff.permissions.filter(p => p !== permission.id)})
                        }
                      }}
                    />
                    <Label htmlFor={permission.id} className="text-sm text-slate-300 cursor-pointer">
                      {permission.name}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsCreateModalOpen(false)}
              className="border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleCreateStaff}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
            >
              Create Staff
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Create Role Modal */}
      <Dialog open={isRoleModalOpen} onOpenChange={setIsRoleModalOpen}>
        <DialogContent className="max-w-2xl bg-slate-800 border-slate-700">
          <DialogHeader>
            <DialogTitle className="text-white">Create New Role</DialogTitle>
            <DialogDescription className="text-slate-400">
              Define a new role with custom permissions
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div>
              <Label htmlFor="roleName" className="text-slate-300">Role Name</Label>
              <Input
                id="roleName"
                value={newRole.name}
                onChange={(e) => setNewRole({...newRole, name: e.target.value})}
                className="bg-slate-700 border-slate-600 text-white"
                placeholder="Enter role name"
              />
            </div>
            <div>
              <Label htmlFor="roleDescription" className="text-slate-300">Description</Label>
              <Textarea
                id="roleDescription"
                value={newRole.description}
                onChange={(e) => setNewRole({...newRole, description: e.target.value})}
                className="bg-slate-700 border-slate-600 text-white"
                placeholder="Enter role description"
                rows={3}
              />
            </div>
            <div>
              <Label className="text-slate-300">Permissions</Label>
              <div className="grid grid-cols-2 gap-2 mt-2 max-h-40 overflow-y-auto">
                {availablePermissions.map((permission) => (
                  <div key={permission.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`role-${permission.id}`}
                      checked={newRole.permissions.includes(permission.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setNewRole({...newRole, permissions: [...newRole.permissions, permission.id]})
                        } else {
                          setNewRole({...newRole, permissions: newRole.permissions.filter(p => p !== permission.id)})
                        }
                      }}
                    />
                    <Label htmlFor={`role-${permission.id}`} className="text-sm text-slate-300 cursor-pointer">
                      {permission.name}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsRoleModalOpen(false)}
              className="border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleCreateRole}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
            >
              Create Role
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Role Modal */}
      <Dialog open={isEditRoleModalOpen} onOpenChange={setIsEditRoleModalOpen}>
        <DialogContent className="max-w-2xl bg-slate-800 border-slate-700">
          <DialogHeader>
            <DialogTitle className="text-white">Edit Role</DialogTitle>
            <DialogDescription className="text-slate-400">
              Update role permissions and settings
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-6">
            <div>
              <Label htmlFor="editRoleName" className="text-slate-300">Role Name</Label>
              <Input
                id="editRoleName"
                value={newRole.name}
                onChange={(e) => setNewRole({...newRole, name: e.target.value})}
                className="bg-slate-700 border-slate-600 text-white"
                placeholder="Enter role name"
              />
            </div>
            <div>
              <Label htmlFor="editRoleDescription" className="text-slate-300">Description</Label>
              <Textarea
                id="editRoleDescription"
                value={newRole.description}
                onChange={(e) => setNewRole({...newRole, description: e.target.value})}
                className="bg-slate-700 border-slate-600 text-white"
                placeholder="Enter role description"
                rows={3}
              />
            </div>
            <div>
              <Label className="text-slate-300">Permissions</Label>
              <div className="grid grid-cols-2 gap-2 mt-2 max-h-40 overflow-y-auto">
                {availablePermissions.map((permission) => (
                  <div key={permission.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={`edit-role-${permission.id}`}
                      checked={newRole.permissions.includes(permission.id)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setNewRole({...newRole, permissions: [...newRole.permissions, permission.id]})
                        } else {
                          setNewRole({...newRole, permissions: newRole.permissions.filter(p => p !== permission.id)})
                        }
                      }}
                    />
                    <Label htmlFor={`edit-role-${permission.id}`} className="text-sm text-slate-300 cursor-pointer">
                      {permission.name}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsEditRoleModalOpen(false)}
              className="border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              Cancel
            </Button>
            <Button 
              onClick={() => {
                console.log('Updating role:', newRole)
                setIsEditRoleModalOpen(false)
              }}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
            >
              Update Role
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Staff Details Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="max-w-4xl bg-slate-800 border-slate-700">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center">
              <Avatar className="w-8 h-8 mr-3">
                <AvatarImage src={selectedStaff?.avatar} />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                  {selectedStaff?.name?.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              {selectedStaff?.name}
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              Staff member details and activity
            </DialogDescription>
          </DialogHeader>
          {selectedStaff && (
            <div className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-slate-700/50 border-slate-600">
                  <CardHeader>
                    <CardTitle className="text-white text-lg">Personal Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Mail className="w-4 h-4 text-slate-400" />
                      <span className="text-slate-300">{selectedStaff.email}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Phone className="w-4 h-4 text-slate-400" />
                      <span className="text-slate-300">{selectedStaff.phone}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Calendar className="w-4 h-4 text-slate-400" />
                      <span className="text-slate-300">Joined: {selectedStaff.joinDate}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock className="w-4 h-4 text-slate-400" />
                      <span className="text-slate-300">Last Login: {selectedStaff.lastLogin}</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-slate-700/50 border-slate-600">
                  <CardHeader>
                    <CardTitle className="text-white text-lg">Role & Permissions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <span className="text-slate-400 text-sm">Role:</span>
                      <div className="text-white font-medium">{selectedStaff.role}</div>
                    </div>
                    <div>
                      <span className="text-slate-400 text-sm">Department:</span>
                      <div className="text-white font-medium">{selectedStaff.department}</div>
                    </div>
                    <div>
                      <span className="text-slate-400 text-sm">Status:</span>
                      <div className="mt-1">{getStatusBadge(selectedStaff.status)}</div>
                    </div>
                    <div>
                      <span className="text-slate-400 text-sm">Permissions:</span>
                      <div className="flex flex-wrap gap-1 mt-2">
                        {selectedStaff.permissions.map((permission) => (
                          <Badge key={permission} variant="outline" className="text-xs border-slate-600 text-slate-400">
                            {permission.replace('_', ' ')}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Activity */}
              <Card className="bg-slate-700/50 border-slate-600">
                <CardHeader>
                  <CardTitle className="text-white text-lg">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {activityLogs.filter(log => log.staffName === selectedStaff.name).slice(0, 5).map((log) => (
                      <div key={log.id} className="flex items-start space-x-3 p-3 rounded-lg bg-slate-600/50">
                        <div className="flex-shrink-0 mt-1">
                          {getActivityIcon(log.type)}
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-white">{log.action}</p>
                          <p className="text-xs text-slate-400 mt-1">{log.details}</p>
                          <p className="text-xs text-slate-500 mt-1">{log.timestamp}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsViewModalOpen(false)}
              className="border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              Close
            </Button>
            <Button 
              onClick={() => {
                setIsViewModalOpen(false)
                handleEditStaff(selectedStaff)
              }}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
            >
              Edit Staff
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
