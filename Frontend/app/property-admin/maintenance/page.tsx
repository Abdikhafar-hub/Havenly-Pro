"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Wrench, 
  AlertTriangle,
  Clock,
  CheckCircle,
  XCircle,
  Filter,
  Search,
  Plus,
  Eye,
  Edit,
  Trash2,
  Calendar,
  User,
  Building2,
  Camera,
  FileText,
  MessageSquare,
  Bell,
  Settings,
  RefreshCw,
  ChevronDown,
  MoreHorizontal,
  Target,
  Zap,
  Users,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Circle,
  Star,
  Phone,
  Mail,
  MapPin,
  Timer,
  Award,
  BarChart3,
  PieChart,
  Activity,
  Send,
  Download,
  Upload,
  Image,
  Video,
  Paperclip
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Progress } from '@/components/ui/progress'
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

// Mock data for maintenance requests
const maintenanceRequests = [
  {
    id: 1,
    tenant: 'John Doe',
    unit: 'A101',
    category: 'Plumbing',
    description: 'Kitchen sink is leaking and water is pooling under the cabinet',
    priority: 'High',
    status: 'In Progress',
    dateReported: '2024-01-15',
    assignedTo: 'Mike Johnson (Plumber)',
    estimatedCost: 15000,
    actualCost: 12000,
    completionDate: null,
    photos: ['leak1.jpg', 'leak2.jpg'],
    tenantRating: null,
    notes: 'Water damage to cabinet base, needs replacement'
  },
  {
    id: 2,
    tenant: 'Jane Smith',
    unit: 'B203',
    category: 'Electrical',
    description: 'Power outlet in living room is not working',
    priority: 'Medium',
    status: 'Pending',
    dateReported: '2024-01-16',
    assignedTo: null,
    estimatedCost: 8000,
    actualCost: null,
    completionDate: null,
    photos: ['outlet1.jpg'],
    tenantRating: null,
    notes: 'Tenant reported intermittent power issues'
  },
  {
    id: 3,
    tenant: 'Mike Johnson',
    unit: 'C305',
    category: 'HVAC',
    description: 'Air conditioning unit is making loud noise and not cooling properly',
    priority: 'Urgent',
    status: 'Resolved',
    dateReported: '2024-01-10',
    assignedTo: 'Sarah Wilson (HVAC Tech)',
    estimatedCost: 25000,
    actualCost: 22000,
    completionDate: '2024-01-14',
    photos: ['ac1.jpg', 'ac2.jpg', 'ac3.jpg'],
    tenantRating: 5,
    notes: 'Compressor was faulty, replaced with new unit. Tenant satisfied.'
  },
  {
    id: 4,
    tenant: 'Sarah Wilson',
    unit: 'D401',
    category: 'General',
    description: 'Door lock is jammed and key is not turning',
    priority: 'High',
    status: 'Assigned',
    dateReported: '2024-01-17',
    assignedTo: 'David Brown (Locksmith)',
    estimatedCost: 12000,
    actualCost: null,
    completionDate: null,
    photos: ['lock1.jpg'],
    tenantRating: null,
    notes: 'Tenant locked out, emergency repair needed'
  },
  {
    id: 5,
    tenant: 'David Brown',
    unit: 'E502',
    category: 'Pest Control',
    description: 'Cockroaches spotted in kitchen area',
    priority: 'Medium',
    status: 'Completed',
    dateReported: '2024-01-12',
    assignedTo: 'Pest Control Services',
    estimatedCost: 10000,
    actualCost: 9500,
    completionDate: '2024-01-15',
    photos: ['pest1.jpg'],
    tenantRating: 4,
    notes: 'Treatment applied, follow-up scheduled in 2 weeks'
  }
]

// Mock data for analytics
const maintenanceAnalytics = [
  { month: 'Jan', requests: 12, resolved: 10, avgTime: 3.2 },
  { month: 'Feb', requests: 8, resolved: 7, avgTime: 2.8 },
  { month: 'Mar', requests: 15, resolved: 13, avgTime: 2.5 },
  { month: 'Apr', requests: 10, resolved: 9, avgTime: 2.1 },
  { month: 'May', requests: 18, resolved: 16, avgTime: 1.8 },
  { month: 'Jun', requests: 14, resolved: 12, avgTime: 2.3 }
]

const categoryData = [
  { name: 'Plumbing', value: 35, color: '#10B981' },
  { name: 'Electrical', value: 25, color: '#F59E0B' },
  { name: 'HVAC', value: 20, color: '#3B82F6' },
  { name: 'General', value: 15, color: '#8B5CF6' },
  { name: 'Pest Control', value: 5, color: '#EF4444' }
]

const staffData = [
  { name: 'Mike Johnson', role: 'Plumber', active: 3, completed: 12, rating: 4.8 },
  { name: 'Sarah Wilson', role: 'HVAC Tech', active: 2, completed: 8, rating: 4.9 },
  { name: 'David Brown', role: 'Locksmith', active: 1, completed: 5, rating: 4.7 },
  { name: 'Pest Control', role: 'External', active: 0, completed: 3, rating: 4.5 }
]

const activityData = [
  { time: '10:30 AM', action: 'Request assigned', request: 'Kitchen sink leak', staff: 'Mike Johnson' },
  { time: '09:15 AM', action: 'Status updated', request: 'Power outlet repair', status: 'In Progress' },
  { time: '08:45 AM', action: 'Request completed', request: 'AC unit repair', staff: 'Sarah Wilson' },
  { time: 'Yesterday', action: 'New request', request: 'Door lock jammed', tenant: 'Sarah Wilson' }
]

export default function MaintenancePage() {
  const router = useRouter()
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [priorityFilter, setPriorityFilter] = useState('all')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [isNewRequestOpen, setIsNewRequestOpen] = useState(false)

  const filteredRequests = maintenanceRequests.filter(request => {
    const matchesSearch = request.tenant.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.unit.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         request.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === 'all' || request.status.toLowerCase() === statusFilter.toLowerCase()
    const matchesPriority = priorityFilter === 'all' || request.priority.toLowerCase() === priorityFilter.toLowerCase()
    const matchesCategory = categoryFilter === 'all' || request.category.toLowerCase() === categoryFilter.toLowerCase()
    return matchesSearch && matchesStatus && matchesPriority && matchesCategory
  })

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case 'Urgent':
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Urgent</Badge>
      case 'High':
        return <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">High</Badge>
      case 'Medium':
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Medium</Badge>
      case 'Low':
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Low</Badge>
      default:
        return <Badge variant="secondary">{priority}</Badge>
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Resolved':
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Resolved</Badge>
      case 'In Progress':
        return <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">In Progress</Badge>
      case 'Assigned':
        return <Badge className="bg-purple-500/20 text-purple-400 border-purple-500/30">Assigned</Badge>
      case 'Pending':
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Pending</Badge>
      case 'Completed':
        return <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">Completed</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Plumbing':
        return <Wrench className="w-4 h-4 text-blue-400" />
      case 'Electrical':
        return <Zap className="w-4 h-4 text-yellow-400" />
      case 'HVAC':
        return <Building2 className="w-4 h-4 text-green-400" />
      case 'Pest Control':
        return <AlertTriangle className="w-4 h-4 text-red-400" />
      default:
        return <Wrench className="w-4 h-4 text-slate-400" />
    }
  }

  const totalRequests = maintenanceRequests.length
  const pendingRequests = maintenanceRequests.filter(r => r.status === 'Pending').length
  const inProgressRequests = maintenanceRequests.filter(r => r.status === 'In Progress').length
  const resolvedRequests = maintenanceRequests.filter(r => r.status === 'Resolved' || r.status === 'Completed').length
  const avgResolutionTime = 2.4 // days
  const totalCost = maintenanceRequests.filter(r => r.actualCost).reduce((sum, r) => sum + (r.actualCost || 0), 0)
  const avgRating = maintenanceRequests.filter(r => r.tenantRating).reduce((sum, r) => sum + (r.tenantRating || 0), 0) / maintenanceRequests.filter(r => r.tenantRating).length

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white flex items-center">
            <Wrench className="w-8 h-8 mr-3" />
            Maintenance Management
          </h1>
          <p className="text-slate-400 mt-2">Complete maintenance control center for property operations</p>
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
            onClick={() => setIsNewRequestOpen(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            New Request
          </Button>
        </div>
      </div>

      {/* Analytics Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-slate-800 border-slate-700 border-2 border-blue-500/20 rounded-xl hover:border-blue-500/40 transition-all duration-300">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-xs font-medium">Total Requests</p>
                <p className="text-xl font-bold text-white">{totalRequests}</p>
                <div className="flex items-center mt-1">
                  <TrendingUp className="w-3 h-3 text-blue-400 mr-1" />
                  <span className="text-blue-400 text-xs">+8% vs last month</span>
                </div>
              </div>
              <div className="w-8 h-8 bg-blue-500/20 rounded-full flex items-center justify-center">
                <Wrench className="w-4 h-4 text-blue-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700 border-2 border-yellow-500/20 rounded-xl hover:border-yellow-500/40 transition-all duration-300">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-xs font-medium">Pending Requests</p>
                <p className="text-xl font-bold text-white">{pendingRequests}</p>
                <div className="flex items-center mt-1">
                  <Clock className="w-3 h-3 text-yellow-400 mr-1" />
                  <span className="text-yellow-400 text-xs">Awaiting assignment</span>
                </div>
              </div>
              <div className="w-8 h-8 bg-yellow-500/20 rounded-full flex items-center justify-center">
                <Clock className="w-4 h-4 text-yellow-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700 border-2 border-green-500/20 rounded-xl hover:border-green-500/40 transition-all duration-300">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-xs font-medium">Resolved</p>
                <p className="text-xl font-bold text-white">{resolvedRequests}</p>
                <div className="flex items-center mt-1">
                  <CheckCircle className="w-3 h-3 text-green-400 mr-1" />
                  <span className="text-green-400 text-xs">{Math.round((resolvedRequests / totalRequests) * 100)}% completion</span>
                </div>
              </div>
              <div className="w-8 h-8 bg-green-500/20 rounded-full flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-green-400" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700 border-2 border-purple-500/20 rounded-xl hover:border-purple-500/40 transition-all duration-300">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-xs font-medium">Avg Resolution</p>
                <p className="text-xl font-bold text-white">{avgResolutionTime} days</p>
                <div className="flex items-center mt-1">
                  <Timer className="w-3 h-3 text-purple-400 mr-1" />
                  <span className="text-purple-400 text-xs">Response time</span>
                </div>
              </div>
              <div className="w-8 h-8 bg-purple-500/20 rounded-full flex items-center justify-center">
                <Timer className="w-4 h-4 text-purple-400" />
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
              Maintenance Trends
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={maintenanceAnalytics}>
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
                  dataKey="requests" 
                  stroke="#10B981" 
                  fill="#10B981" 
                  fillOpacity={0.3}
                  strokeWidth={2}
                />
                <Line 
                  type="monotone" 
                  dataKey="resolved" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700 border-2 border-purple-500/20 rounded-xl">
          <CardHeader className="pb-4">
            <CardTitle className="text-white text-lg flex items-center">
              <PieChart className="w-5 h-5 mr-2" />
              Issue Categories
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPieChart>
                <Pie
                  data={categoryData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {categoryData.map((entry, index) => (
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

      {/* Maintenance Requests Table */}
      <Card className="bg-slate-800 border-slate-700 border-2 border-cyan-500/20 rounded-xl">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-white text-lg flex items-center">
              <Wrench className="w-5 h-5 mr-2" />
              Maintenance Requests
            </CardTitle>
            <div className="flex items-center space-x-3">
              <Button 
                variant="outline" 
                size="sm"
                className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
              >
                <Bell className="w-4 h-4 mr-2" />
                Send Updates
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
                placeholder="Search by tenant, unit, or description..."
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
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="assigned">Assigned</SelectItem>
                <SelectItem value="in progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
            <Select value={priorityFilter} onValueChange={setPriorityFilter}>
              <SelectTrigger className="w-full sm:w-48 bg-slate-700 border-slate-600">
                <AlertTriangle className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                <SelectItem value="all">All Priority</SelectItem>
                <SelectItem value="urgent">Urgent</SelectItem>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-48 bg-slate-700 border-slate-600">
                <Wrench className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="plumbing">Plumbing</SelectItem>
                <SelectItem value="electrical">Electrical</SelectItem>
                <SelectItem value="hvac">HVAC</SelectItem>
                <SelectItem value="general">General</SelectItem>
                <SelectItem value="pest control">Pest Control</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left text-sm font-medium text-slate-400 py-3">Request</th>
                  <th className="text-left text-sm font-medium text-slate-400 py-3">Tenant</th>
                  <th className="text-left text-sm font-medium text-slate-400 py-3">Category</th>
                  <th className="text-left text-sm font-medium text-slate-400 py-3">Priority</th>
                  <th className="text-left text-sm font-medium text-slate-400 py-3">Status</th>
                  <th className="text-left text-sm font-medium text-slate-400 py-3">Assigned To</th>
                  <th className="text-left text-sm font-medium text-slate-400 py-3">Cost</th>
                  <th className="text-left text-sm font-medium text-slate-400 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRequests.map((request) => (
                  <tr key={request.id} className="border-b border-slate-700/50 hover:bg-slate-700/30">
                    <td className="py-3">
                      <div>
                        <span className="text-white font-medium">#{request.id}</span>
                        <p className="text-slate-400 text-sm truncate max-w-xs">{request.description}</p>
                        <div className="flex items-center mt-1">
                          <Calendar className="w-3 h-3 text-slate-500 mr-1" />
                          <span className="text-slate-500 text-xs">{new Date(request.dateReported).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3">
                      <div>
                        <span className="text-white font-medium">{request.tenant}</span>
                        <p className="text-slate-400 text-sm">{request.unit}</p>
                      </div>
                    </td>
                    <td className="py-3">
                      <div className="flex items-center">
                        {getCategoryIcon(request.category)}
                        <span className="text-slate-300 ml-2">{request.category}</span>
                      </div>
                    </td>
                    <td className="py-3">
                      {getPriorityBadge(request.priority)}
                    </td>
                    <td className="py-3">
                      {getStatusBadge(request.status)}
                    </td>
                    <td className="py-3">
                      <span className="text-slate-300">{request.assignedTo || 'Unassigned'}</span>
                    </td>
                    <td className="py-3">
                      <div>
                        <span className="text-white font-medium">KSh {request.actualCost?.toLocaleString() || request.estimatedCost.toLocaleString()}</span>
                        {request.actualCost && (
                          <p className="text-green-400 text-xs">Actual</p>
                        )}
                      </div>
                    </td>
                    <td className="py-3">
                      <div className="flex items-center space-x-2">
                        <Button 
                          size="sm" 
                          variant="ghost" 
                          className="text-slate-400 hover:text-white"
                          onClick={() => router.push(`/property-admin/maintenance/view/${request.id}`)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-blue-400 hover:text-blue-300">
                          <MessageSquare className="w-4 h-4" />
                        </Button>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white">
                              <MoreHorizontal className="w-4 h-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent className="bg-slate-700 border-slate-600">
                            <DropdownMenuItem className="text-white hover:bg-slate-600">
                              <User className="w-4 h-4 mr-2" />
                              Assign Staff
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-white hover:bg-slate-600">
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Mark Complete
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-white hover:bg-slate-600">
                              <FileText className="w-4 h-4 mr-2" />
                              View Details
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

      {/* Staff Performance & Activity Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Staff Performance */}
        <Card className="bg-slate-800 border-slate-700 border-2 border-indigo-500/20 rounded-xl">
          <CardHeader className="pb-4">
            <CardTitle className="text-white text-lg flex items-center">
              <Users className="w-5 h-5 mr-2" />
              Staff Performance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {staffData.map((staff, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                  <div>
                    <p className="text-white font-medium">{staff.name}</p>
                    <p className="text-slate-400 text-sm">{staff.role}</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center">
                      <Star className="w-4 h-4 text-yellow-400 mr-1" />
                      <span className="text-white font-semibold">{staff.rating}</span>
                    </div>
                    <p className="text-slate-400 text-xs">{staff.active} active, {staff.completed} completed</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Cost Summary */}
        <Card className="bg-slate-800 border-slate-700 border-2 border-green-500/20 rounded-xl">
          <CardHeader className="pb-4">
            <CardTitle className="text-white text-lg flex items-center">
              <DollarSign className="w-5 h-5 mr-2" />
              Cost Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-slate-400">Total Spent:</span>
                <span className="text-white font-semibold">KSh {totalCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Avg Cost/Request:</span>
                <span className="text-white font-semibold">KSh {Math.round(totalCost / maintenanceRequests.filter(r => r.actualCost).length).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Budget Used:</span>
                <span className="text-blue-400 font-semibold">68%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Cost Efficiency:</span>
                <span className="text-green-400 font-semibold">Good</span>
              </div>
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
                    <p className="text-slate-400 text-xs">{activity.request} - {activity.staff}</p>
                    <p className="text-slate-500 text-xs">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* New Request Modal */}
      <Dialog open={isNewRequestOpen} onOpenChange={setIsNewRequestOpen}>
        <DialogContent className="bg-slate-800 border-slate-700 max-w-4xl">
          <DialogHeader>
            <DialogTitle className="text-white text-xl">Create Maintenance Request</DialogTitle>
            <DialogDescription className="text-slate-400">
              Add a new maintenance request for a tenant
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
                <label className="text-slate-300 text-sm font-medium">Category</label>
                <Select>
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white mt-2">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-700 border-slate-600">
                    <SelectItem value="plumbing">Plumbing</SelectItem>
                    <SelectItem value="electrical">Electrical</SelectItem>
                    <SelectItem value="hvac">HVAC</SelectItem>
                    <SelectItem value="general">General</SelectItem>
                    <SelectItem value="pest">Pest Control</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-slate-300 text-sm font-medium">Priority</label>
                <Select>
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white mt-2">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent className="bg-slate-700 border-slate-600">
                    <SelectItem value="low">Low</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="high">High</SelectItem>
                    <SelectItem value="urgent">Urgent</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-slate-300 text-sm font-medium">Estimated Cost</label>
                <Input 
                  type="number" 
                  className="bg-slate-700 border-slate-600 text-white mt-2" 
                  placeholder="15000" 
                />
              </div>
            </div>
            <div>
              <label className="text-slate-300 text-sm font-medium">Description</label>
              <Textarea 
                className="bg-slate-700 border-slate-600 text-white mt-2" 
                rows={4} 
                placeholder="Describe the maintenance issue in detail..." 
              />
            </div>
            <div>
              <label className="text-slate-300 text-sm font-medium">Attach Photos/Videos</label>
              <div className="border-2 border-dashed border-slate-600 rounded-lg p-8 text-center mt-2">
                <Upload className="w-10 h-10 text-slate-400 mx-auto mb-3" />
                <p className="text-slate-400 text-sm">Drag & drop files or click to browse</p>
                <p className="text-slate-500 text-xs mt-1">Images, videos, or documents</p>
              </div>
            </div>
            <div className="flex justify-end space-x-3">
              <Button 
                variant="outline" 
                onClick={() => setIsNewRequestOpen(false)}
                className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
              >
                Cancel
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Create Request
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

    </div>
  )
}
