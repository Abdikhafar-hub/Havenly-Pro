"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Switch } from '@/components/ui/switch'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Checkbox } from '@/components/ui/checkbox'
import { 
  Search, 
  Plus, 
  Eye, 
  Edit, 
  Trash2, 
  MoreVertical, 
  Send, 
  Clock, 
  AlertTriangle, 
  CheckCircle, 
  Users, 
  Mail, 
  Smartphone, 
  Bell, 
  Calendar,
  TrendingUp,
  TrendingDown,
  FileText,
  Image,
  Link,
  Copy,
  RefreshCw,
  Filter,
  X,
  Save,
  Upload,
  Download,
  MessageSquare,
  Target,
  Zap
} from 'lucide-react'

// Mock data
const notificationsData = [
  {
    id: 1,
    title: 'Monthly Rent Reminder',
    recipientType: 'Tenants',
    deliveryMethod: 'Email',
    status: 'Sent',
    createdBy: 'Super Admin',
    dateSent: '2024-01-20 09:00',
    recipients: 137,
    successRate: 98.5,
    content: 'This is a friendly reminder that your monthly rent payment is due on the 1st of next month. Please ensure your payment is submitted on time to avoid any late fees.',
    attachments: []
  },
  {
    id: 2,
    title: 'Property Maintenance Update',
    recipientType: 'Admins',
    deliveryMethod: 'In-App',
    status: 'Sent',
    createdBy: 'Super Admin',
    dateSent: '2024-01-19 14:30',
    recipients: 4,
    successRate: 100,
    content: 'Scheduled maintenance for Sunrise Apartments will begin tomorrow at 8 AM. Please inform tenants and coordinate access.',
    attachments: ['maintenance-schedule.pdf']
  },
  {
    id: 3,
    title: 'Overdue Payment Alert',
    recipientType: 'Tenants',
    deliveryMethod: 'SMS',
    status: 'Failed',
    createdBy: 'Super Admin',
    dateSent: '2024-01-18 16:45',
    recipients: 12,
    successRate: 75,
    content: 'Your rent payment is overdue. Please contact the property management office immediately.',
    attachments: []
  },
  {
    id: 4,
    title: 'New Tenant Welcome',
    recipientType: 'Tenants',
    deliveryMethod: 'Email',
    status: 'Scheduled',
    createdBy: 'Super Admin',
    dateSent: '2024-01-25 10:00',
    recipients: 3,
    successRate: 0,
    content: 'Welcome to our property! We are excited to have you as a new tenant. Please review the attached welcome packet.',
    attachments: ['welcome-packet.pdf', 'property-rules.pdf']
  },
  {
    id: 5,
    title: 'System Maintenance Notice',
    recipientType: 'Both',
    deliveryMethod: 'In-App',
    status: 'Draft',
    createdBy: 'Super Admin',
    dateSent: null,
    recipients: 0,
    successRate: 0,
    content: 'The Havenly Pro platform will undergo scheduled maintenance this weekend. Some features may be temporarily unavailable.',
    attachments: []
  }
]

const analyticsData = {
  totalSent: 1247,
  recipientsReached: 98.2,
  failedDeliveries: 23,
  scheduledMessages: 5,
  weeklyData: [
    { week: 'Week 1', notifications: 45, success: 42, failed: 3 },
    { week: 'Week 2', notifications: 52, success: 48, failed: 4 },
    { week: 'Week 3', notifications: 38, success: 36, failed: 2 },
    { week: 'Week 4', notifications: 61, success: 58, failed: 3 }
  ],
  deliveryMethodData: [
    { name: 'Email', value: 65, color: '#3B82F6' },
    { name: 'In-App', value: 25, color: '#10B981' },
    { name: 'SMS', value: 10, color: '#F59E0B' }
  ],
  successRateData: [
    { month: 'Jan', rate: 95.2 },
    { month: 'Feb', rate: 97.1 },
    { month: 'Mar', rate: 96.8 },
    { month: 'Apr', rate: 98.5 }
  ]
}

const properties = [
  { id: 1, name: 'Sunrise Apartments' },
  { id: 2, name: 'Oak Manor' },
  { id: 3, name: 'Riverside Plaza' },
  { id: 4, name: 'Garden Heights' },
  { id: 5, name: 'Metro Tower' }
]

const users = [
  { id: 1, name: 'Sarah Johnson', email: 'sarah@example.com', type: 'Admin' },
  { id: 2, name: 'Mike Wilson', email: 'mike@example.com', type: 'Admin' },
  { id: 3, name: 'Alice Smith', email: 'alice@example.com', type: 'Tenant' },
  { id: 4, name: 'Bob Johnson', email: 'bob@example.com', type: 'Tenant' }
]

export default function NotificationsPage() {
  const [mounted, setMounted] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [deliveryFilter, setDeliveryFilter] = useState('all')
  const [recipientFilter, setRecipientFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [selectedNotification, setSelectedNotification] = useState<any>(null)
  const [isNewNotificationModalOpen, setIsNewNotificationModalOpen] = useState(false)
  const [isViewModalOpen, setIsViewModalOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)

  // New notification form data
  const [notificationForm, setNotificationForm] = useState({
    title: '',
    content: '',
    recipientType: 'all',
    specificProperty: '',
    customRecipients: [],
    deliveryMethods: [],
    scheduleType: 'now',
    scheduledDate: '',
    scheduledTime: '',
    attachments: []
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const getStatusBadge = (status: string) => {
    const colors = {
      'Sent': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
      'Scheduled': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      'Failed': 'bg-red-500/20 text-red-400 border-red-500/30',
      'Draft': 'bg-slate-500/20 text-slate-400 border-slate-500/30',
    }
    return <Badge className={colors[status as keyof typeof colors]}>{status}</Badge>
  }

  const getDeliveryMethodIcon = (method: string) => {
    switch (method) {
      case 'Email': return <Mail className="w-4 h-4 text-blue-400" />
      case 'SMS': return <Smartphone className="w-4 h-4 text-yellow-400" />
      case 'In-App': return <Bell className="w-4 h-4 text-green-400" />
      default: return <MessageSquare className="w-4 h-4 text-slate-400" />
    }
  }

  const getRecipientTypeIcon = (type: string) => {
    switch (type) {
      case 'Admins': return <Users className="w-4 h-4 text-purple-400" />
      case 'Tenants': return <Users className="w-4 h-4 text-blue-400" />
      case 'Both': return <Users className="w-4 h-4 text-emerald-400" />
      default: return <Users className="w-4 h-4 text-slate-400" />
    }
  }

  const filteredNotifications = notificationsData.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.content.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesDelivery = deliveryFilter === 'all' || notification.deliveryMethod.toLowerCase() === deliveryFilter.toLowerCase()
    const matchesRecipient = recipientFilter === 'all' || notification.recipientType.toLowerCase() === recipientFilter.toLowerCase()
    const matchesStatus = statusFilter === 'all' || notification.status.toLowerCase() === statusFilter.toLowerCase()
    
    return matchesSearch && matchesDelivery && matchesRecipient && matchesStatus
  })

  const totalPages = Math.ceil(filteredNotifications.length / rowsPerPage)
  const currentNotifications = filteredNotifications.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  )

  const handleViewNotification = (notification: any) => {
    setSelectedNotification(notification)
    setIsViewModalOpen(true)
  }

  const handleNewNotification = () => {
    setNotificationForm({
      title: '',
      content: '',
      recipientType: 'all',
      specificProperty: '',
      customRecipients: [],
      deliveryMethods: [],
      scheduleType: 'now',
      scheduledDate: '',
      scheduledTime: '',
      attachments: []
    })
    setCurrentStep(1)
    setIsNewNotificationModalOpen(true)
  }

  const handleFormUpdate = (field: string, value: any) => {
    setNotificationForm(prev => ({ ...prev, [field]: value }))
  }

  const handleDeliveryMethodToggle = (method: string) => {
    setNotificationForm(prev => ({
      ...prev,
      deliveryMethods: prev.deliveryMethods.includes(method)
        ? prev.deliveryMethods.filter(m => m !== method)
        : [...prev.deliveryMethods, method]
    }))
  }

  const handleSendNotification = () => {
    console.log('Sending notification:', notificationForm)
    setIsNewNotificationModalOpen(false)
    // Here you would implement the actual sending logic
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-blue-400">Notifications & Communication</h1>
          <p className="text-slate-400 mt-2">Create and send updates, alerts, and announcements to property admins or tenants.</p>
        </div>
        <Button 
          onClick={handleNewNotification}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          New Notification
        </Button>
      </div>

      {/* Search and Filters */}
      <Card className="bg-slate-800 border-slate-700 border-2 border-blue-500/20">
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex-1 min-w-64">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  placeholder="Search notifications by title, type, or date..."
                  className="pl-10 bg-slate-700 border-slate-600 text-white"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>

            <Select value={deliveryFilter} onValueChange={setDeliveryFilter}>
              <SelectTrigger className="w-40 bg-slate-700 border-slate-600 text-white">
                <SelectValue placeholder="Delivery Method" />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                <SelectItem value="all" className="text-white">All Methods</SelectItem>
                <SelectItem value="in-app" className="text-white">In-App</SelectItem>
                <SelectItem value="email" className="text-white">Email</SelectItem>
                <SelectItem value="sms" className="text-white">SMS</SelectItem>
              </SelectContent>
            </Select>

            <Select value={recipientFilter} onValueChange={setRecipientFilter}>
              <SelectTrigger className="w-40 bg-slate-700 border-slate-600 text-white">
                <SelectValue placeholder="Recipient Type" />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                <SelectItem value="all" className="text-white">All Recipients</SelectItem>
                <SelectItem value="admins" className="text-white">Admins</SelectItem>
                <SelectItem value="tenants" className="text-white">Tenants</SelectItem>
                <SelectItem value="both" className="text-white">Both</SelectItem>
              </SelectContent>
            </Select>

            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40 bg-slate-700 border-slate-600 text-white">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                <SelectItem value="all" className="text-white">All Status</SelectItem>
                <SelectItem value="sent" className="text-white">Sent</SelectItem>
                <SelectItem value="scheduled" className="text-white">Scheduled</SelectItem>
                <SelectItem value="failed" className="text-white">Failed</SelectItem>
                <SelectItem value="draft" className="text-white">Draft</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm('')
                setDeliveryFilter('all')
                setRecipientFilter('all')
                setStatusFilter('all')
                setCurrentPage(1)
              }}
              className="border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              <X className="w-4 h-4 mr-2" />
              Reset Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-slate-800 border-slate-700 border-2 border-blue-500/20 hover:bg-slate-750 transition-colors">
          <CardContent className="p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-xs">Total Notifications Sent</p>
                <p className="text-xl font-bold text-white">{analyticsData.totalSent.toLocaleString()}</p>
                <div className="flex items-center mt-0.5">
                  <TrendingUp className="w-3 h-3 text-emerald-400 mr-1" />
                  <span className="text-emerald-400 text-xs">+12.5%</span>
                </div>
              </div>
              <MessageSquare className="w-6 h-6 text-blue-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700 border-2 border-blue-500/20 hover:bg-slate-750 transition-colors">
          <CardContent className="p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-xs">Recipients Reached</p>
                <p className="text-xl font-bold text-white">{analyticsData.recipientsReached}%</p>
                <div className="flex items-center mt-0.5">
                  <TrendingUp className="w-3 h-3 text-emerald-400 mr-1" />
                  <span className="text-emerald-400 text-xs">+2.1%</span>
                </div>
              </div>
              <Target className="w-6 h-6 text-emerald-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700 border-2 border-blue-500/20 hover:bg-slate-750 transition-colors">
          <CardContent className="p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-xs">Failed Deliveries</p>
                <p className="text-xl font-bold text-white">{analyticsData.failedDeliveries}</p>
                <div className="flex items-center mt-0.5">
                  <TrendingDown className="w-3 h-3 text-red-400 mr-1" />
                  <span className="text-red-400 text-xs">-5.2%</span>
                </div>
              </div>
              <AlertTriangle className="w-6 h-6 text-red-400" />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700 border-2 border-blue-500/20 hover:bg-slate-750 transition-colors">
          <CardContent className="p-3">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-slate-400 text-xs">Scheduled Messages</p>
                <p className="text-xl font-bold text-white">{analyticsData.scheduledMessages}</p>
                <div className="flex items-center mt-0.5">
                  <Clock className="w-3 h-3 text-yellow-400 mr-1" />
                  <span className="text-yellow-400 text-xs">Pending</span>
                </div>
              </div>
              <Clock className="w-6 h-6 text-yellow-400" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Notifications Table */}
      <Card className="bg-slate-800 border-slate-700 border-2 border-blue-500/20">
        <CardHeader>
          <CardTitle className="text-lg font-semibold text-blue-400">Recent Notifications</CardTitle>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-slate-700">
                  <TableHead className="text-slate-300">Title</TableHead>
                  <TableHead className="text-slate-300">Recipients</TableHead>
                  <TableHead className="text-slate-300">Method</TableHead>
                  <TableHead className="text-slate-300">Status</TableHead>
                  <TableHead className="text-slate-300">Created By</TableHead>
                  <TableHead className="text-slate-300">Date Sent</TableHead>
                  <TableHead className="text-slate-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {currentNotifications.map((notification, index) => (
                  <TableRow key={notification.id} className={`border-slate-700 hover:bg-slate-700/30 ${index % 2 === 0 ? 'bg-slate-800/50' : 'bg-slate-800'}`}>
                    <TableCell className="p-4">
                      <div>
                        <div className="font-medium text-white text-sm">{notification.title}</div>
                        <div className="text-slate-400 text-xs mt-1 line-clamp-2">{notification.content}</div>
                      </div>
                    </TableCell>
                    <TableCell className="p-4">
                      <div className="flex items-center space-x-2">
                        {getRecipientTypeIcon(notification.recipientType)}
                        <span className="text-slate-300 text-sm">{notification.recipientType}</span>
                        <span className="text-slate-400 text-xs">({notification.recipients})</span>
                      </div>
                    </TableCell>
                    <TableCell className="p-4">
                      <div className="flex items-center space-x-2">
                        {getDeliveryMethodIcon(notification.deliveryMethod)}
                        <span className="text-slate-300 text-sm">{notification.deliveryMethod}</span>
                      </div>
                    </TableCell>
                    <TableCell className="p-4">
                      <div className="flex items-center space-x-2">
                        {getStatusBadge(notification.status)}
                        {notification.status === 'Sent' && (
                          <span className="text-slate-400 text-xs">({notification.successRate}%)</span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell className="p-4">
                      <div className="text-slate-300 text-sm">{notification.createdBy}</div>
                    </TableCell>
                    <TableCell className="p-4">
                      <div className="text-slate-300 text-sm">{notification.dateSent || 'Not sent'}</div>
                    </TableCell>
                    <TableCell className="p-4">
                      <div className="flex items-center space-x-1">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 h-7 w-7 p-0"
                          onClick={() => handleViewNotification(notification)}
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
                              <Send className="w-3 h-3 mr-2" />
                              Resend
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-white hover:bg-slate-600 text-sm">
                              <Copy className="w-3 h-3 mr-2" />
                              Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-400 hover:bg-red-500/10 text-sm">
                              <Trash2 className="w-3 h-3 mr-2" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-slate-400 text-sm">
          Showing {((currentPage - 1) * rowsPerPage) + 1} to {Math.min(currentPage * rowsPerPage, filteredNotifications.length)} of {filteredNotifications.length} notifications
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="border-slate-600 text-slate-300 hover:bg-slate-700"
          >
            Previous
          </Button>
          <span className="text-slate-300 text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
            className="border-slate-600 text-slate-300 hover:bg-slate-700"
          >
            Next
          </Button>
        </div>
      </div>


      {/* New Notification Modal */}
      <Dialog open={isNewNotificationModalOpen} onOpenChange={setIsNewNotificationModalOpen}>
        <DialogContent className="bg-slate-800 border-slate-700 max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-blue-400">Create New Notification</DialogTitle>
            <p className="text-slate-400 text-sm">Send updates, alerts, and announcements to your users</p>
          </DialogHeader>
          
          <Tabs value={currentStep.toString()} className="space-y-6">
            <TabsList className="bg-slate-700 border-slate-600 grid grid-cols-5 w-full">
              <TabsTrigger value="1" className="text-blue-400 data-[state=active]:bg-blue-600 data-[state=active]:text-white">Compose</TabsTrigger>
              <TabsTrigger value="2" className="text-blue-400 data-[state=active]:bg-blue-600 data-[state=active]:text-white">Recipients</TabsTrigger>
              <TabsTrigger value="3" className="text-blue-400 data-[state=active]:bg-blue-600 data-[state=active]:text-white">Delivery</TabsTrigger>
              <TabsTrigger value="4" className="text-blue-400 data-[state=active]:bg-blue-600 data-[state=active]:text-white">Schedule</TabsTrigger>
              <TabsTrigger value="5" className="text-blue-400 data-[state=active]:bg-blue-600 data-[state=active]:text-white">Review</TabsTrigger>
            </TabsList>

            {/* Step 1: Compose Message */}
            <TabsContent value="1">
              <div className="space-y-4">
                <div className="space-y-3">
                  <Label className="text-slate-300 font-medium text-sm">Title / Subject *</Label>
                  <Input
                    className="bg-slate-700 border-slate-600 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    placeholder="Enter notification title"
                    value={notificationForm.title}
                    onChange={(e) => handleFormUpdate('title', e.target.value)}
                  />
                </div>
                <div className="space-y-3">
                  <Label className="text-slate-300 font-medium text-sm">Message Content *</Label>
                  <Textarea
                    className="bg-slate-700 border-slate-600 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
                    placeholder="Write your message here..."
                    rows={6}
                    value={notificationForm.content}
                    onChange={(e) => handleFormUpdate('content', e.target.value)}
                  />
                </div>
                <div className="space-y-3">
                  <Label className="text-slate-300 font-medium text-sm">Attachments (Optional)</Label>
                  <div className="flex items-center space-x-4">
                    <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                      <Upload className="w-4 h-4 mr-2" />
                      Upload File
                    </Button>
                    <span className="text-slate-400 text-sm">PDF, Images, Documents (Max 10MB)</span>
                  </div>
                </div>
              </div>
            </TabsContent>

            {/* Step 2: Select Recipients */}
            <TabsContent value="2">
              <div className="space-y-4">
                <div className="space-y-3">
                  <Label className="text-slate-300 font-medium text-sm">Recipient Type *</Label>
                  <RadioGroup value={notificationForm.recipientType} onValueChange={(value) => handleFormUpdate('recipientType', value)}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="all" id="all" />
                      <Label htmlFor="all" className="text-slate-300">All Users (Admins + Tenants)</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="admins" id="admins" />
                      <Label htmlFor="admins" className="text-slate-300">All Property Admins</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="tenants" id="tenants" />
                      <Label htmlFor="tenants" className="text-slate-300">All Tenants</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="property" id="property" />
                      <Label htmlFor="property" className="text-slate-300">Specific Property</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="custom" id="custom" />
                      <Label htmlFor="custom" className="text-slate-300">Custom Selection</Label>
                    </div>
                  </RadioGroup>
                </div>

                {notificationForm.recipientType === 'property' && (
                  <div className="space-y-3">
                    <Label className="text-slate-300 font-medium text-sm">Select Property</Label>
                    <Select value={notificationForm.specificProperty} onValueChange={(value) => handleFormUpdate('specificProperty', value)}>
                      <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                        <SelectValue placeholder="Choose a property" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-700 border-slate-600">
                        {properties.map(property => (
                          <SelectItem key={property.id} value={property.id.toString()} className="text-white">{property.name}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                )}

                {notificationForm.recipientType === 'custom' && (
                  <div className="space-y-3">
                    <Label className="text-slate-300 font-medium text-sm">Select Users</Label>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {users.map(user => (
                        <div key={user.id} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`user-${user.id}`}
                            checked={notificationForm.customRecipients.includes(user.id)}
                            onCheckedChange={(checked) => {
                              if (checked) {
                                handleFormUpdate('customRecipients', [...notificationForm.customRecipients, user.id])
                              } else {
                                handleFormUpdate('customRecipients', notificationForm.customRecipients.filter(id => id !== user.id))
                              }
                            }}
                          />
                          <Label htmlFor={`user-${user.id}`} className="text-slate-300 text-sm">
                            {user.name} ({user.email}) - {user.type}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Step 3: Delivery Method */}
            <TabsContent value="3">
              <div className="space-y-4">
                <div className="space-y-3">
                  <Label className="text-slate-300 font-medium text-sm">Delivery Methods *</Label>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="in-app"
                        checked={notificationForm.deliveryMethods.includes('in-app')}
                        onCheckedChange={() => handleDeliveryMethodToggle('in-app')}
                      />
                      <Label htmlFor="in-app" className="text-slate-300 flex items-center space-x-2">
                        <Bell className="w-4 h-4 text-green-400" />
                        <span>In-App Notification</span>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="email"
                        checked={notificationForm.deliveryMethods.includes('email')}
                        onCheckedChange={() => handleDeliveryMethodToggle('email')}
                      />
                      <Label htmlFor="email" className="text-slate-300 flex items-center space-x-2">
                        <Mail className="w-4 h-4 text-blue-400" />
                        <span>Email</span>
                      </Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox 
                        id="sms"
                        checked={notificationForm.deliveryMethods.includes('sms')}
                        onCheckedChange={() => handleDeliveryMethodToggle('sms')}
                      />
                      <Label htmlFor="sms" className="text-slate-300 flex items-center space-x-2">
                        <Smartphone className="w-4 h-4 text-yellow-400" />
                        <span>SMS</span>
                      </Label>
                    </div>
                  </div>
                </div>

                {notificationForm.deliveryMethods.includes('email') && (
                  <div className="space-y-3 p-4 bg-slate-700/50 border border-slate-600 rounded-lg">
                    <h4 className="text-slate-300 font-medium">Email Settings</h4>
                    <div className="space-y-3">
                      <div>
                        <Label className="text-slate-300 text-sm">Email Subject</Label>
                        <Input
                          className="bg-slate-600 border-slate-500 text-white"
                          value={notificationForm.title}
                          readOnly
                        />
                      </div>
                      <div>
                        <Label className="text-slate-300 text-sm">Sender Name</Label>
                        <Input
                          className="bg-slate-600 border-slate-500 text-white"
                          value="Havenly Pro"
                          readOnly
                        />
                      </div>
                    </div>
                  </div>
                )}

                {notificationForm.deliveryMethods.includes('sms') && (
                  <div className="space-y-3 p-4 bg-slate-700/50 border border-slate-600 rounded-lg">
                    <h4 className="text-slate-300 font-medium">SMS Settings</h4>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-300 text-sm">Character Count</span>
                      <span className="text-slate-400 text-sm">{notificationForm.content.length}/160</span>
                    </div>
                  </div>
                )}
              </div>
            </TabsContent>

            {/* Step 4: Schedule */}
            <TabsContent value="4">
              <div className="space-y-4">
                <div className="space-y-3">
                  <Label className="text-slate-300 font-medium text-sm">Delivery Options *</Label>
                  <RadioGroup value={notificationForm.scheduleType} onValueChange={(value) => handleFormUpdate('scheduleType', value)}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="now" id="now" />
                      <Label htmlFor="now" className="text-slate-300">Send Now</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="schedule" id="schedule" />
                      <Label htmlFor="schedule" className="text-slate-300">Schedule for Later</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="draft" id="draft" />
                      <Label htmlFor="draft" className="text-slate-300">Save as Draft</Label>
                    </div>
                  </RadioGroup>
                </div>

                {notificationForm.scheduleType === 'schedule' && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-3">
                      <Label className="text-slate-300 font-medium text-sm">Date</Label>
                      <Input
                        type="date"
                        className="bg-slate-700 border-slate-600 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        value={notificationForm.scheduledDate}
                        onChange={(e) => handleFormUpdate('scheduledDate', e.target.value)}
                      />
                    </div>
                    <div className="space-y-3">
                      <Label className="text-slate-300 font-medium text-sm">Time</Label>
                      <Input
                        type="time"
                        className="bg-slate-700 border-slate-600 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        value={notificationForm.scheduledTime}
                        onChange={(e) => handleFormUpdate('scheduledTime', e.target.value)}
                      />
                    </div>
                  </div>
                )}

                <div className="flex items-center justify-between p-4 bg-slate-700/50 border border-slate-600 rounded-lg">
                  <div>
                    <h4 className="text-slate-300 font-medium">Test Send</h4>
                    <p className="text-slate-400 text-sm">Send a test notification to your own contact</p>
                  </div>
                  <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                    <Zap className="w-4 h-4 mr-2" />
                    Test Send
                  </Button>
                </div>
              </div>
            </TabsContent>

            {/* Step 5: Review */}
            <TabsContent value="5">
              <div className="space-y-4">
                <h3 className="text-slate-300 font-medium">Review & Confirm</h3>
                <div className="space-y-4 p-4 bg-slate-700/50 border border-slate-600 rounded-lg">
                  <div>
                    <Label className="text-slate-400 text-sm">Title</Label>
                    <p className="text-white">{notificationForm.title}</p>
                  </div>
                  <div>
                    <Label className="text-slate-400 text-sm">Recipients</Label>
                    <p className="text-white">
                      {notificationForm.recipientType === 'all' && 'All Users'}
                      {notificationForm.recipientType === 'admins' && 'All Property Admins'}
                      {notificationForm.recipientType === 'tenants' && 'All Tenants'}
                      {notificationForm.recipientType === 'property' && `Property: ${properties.find(p => p.id.toString() === notificationForm.specificProperty)?.name}`}
                      {notificationForm.recipientType === 'custom' && `${notificationForm.customRecipients.length} selected users`}
                    </p>
                  </div>
                  <div>
                    <Label className="text-slate-400 text-sm">Delivery Methods</Label>
                    <p className="text-white">{notificationForm.deliveryMethods.join(', ')}</p>
                  </div>
                  <div>
                    <Label className="text-slate-400 text-sm">Schedule</Label>
                    <p className="text-white">
                      {notificationForm.scheduleType === 'now' && 'Send Now'}
                      {notificationForm.scheduleType === 'schedule' && `Scheduled for ${notificationForm.scheduledDate} at ${notificationForm.scheduledTime}`}
                      {notificationForm.scheduleType === 'draft' && 'Save as Draft'}
                    </p>
                  </div>
                </div>
              </div>
            </TabsContent>
          </Tabs>

          <div className="flex items-center justify-between pt-4 border-t border-slate-700">
            <div className="flex items-center space-x-2">
              {currentStep > 1 && (
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(prev => prev - 1)}
                  className="border-slate-600 text-slate-300 hover:bg-slate-700"
                >
                  Previous
                </Button>
              )}
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                onClick={() => setIsNewNotificationModalOpen(false)}
                className="border-slate-600 text-slate-300 hover:bg-slate-700"
              >
                Cancel
              </Button>
              {currentStep < 5 ? (
                <Button
                  onClick={() => setCurrentStep(prev => prev + 1)}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Next
                </Button>
              ) : (
                <Button
                  onClick={handleSendNotification}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Notification
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Notification Modal */}
      <Dialog open={isViewModalOpen} onOpenChange={setIsViewModalOpen}>
        <DialogContent className="bg-slate-800 border-slate-700 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-blue-400">Notification Details</DialogTitle>
          </DialogHeader>
          
          {selectedNotification && (
            <div className="space-y-4">
              <div className="space-y-3">
                <div>
                  <Label className="text-slate-400 text-sm">Title</Label>
                  <p className="text-white font-medium">{selectedNotification.title}</p>
                </div>
                <div>
                  <Label className="text-slate-400 text-sm">Content</Label>
                  <p className="text-slate-300 text-sm bg-slate-700/50 p-3 rounded-lg">{selectedNotification.content}</p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-slate-400 text-sm">Delivery Method</Label>
                    <p className="text-white">{selectedNotification.deliveryMethod}</p>
                  </div>
                  <div>
                    <Label className="text-slate-400 text-sm">Recipients</Label>
                    <p className="text-white">{selectedNotification.recipientType} ({selectedNotification.recipients})</p>
                  </div>
                  <div>
                    <Label className="text-slate-400 text-sm">Status</Label>
                    <div className="mt-1">{getStatusBadge(selectedNotification.status)}</div>
                  </div>
                  <div>
                    <Label className="text-slate-400 text-sm">Success Rate</Label>
                    <p className="text-white">{selectedNotification.successRate}%</p>
                  </div>
                </div>
                <div>
                  <Label className="text-slate-400 text-sm">Sent Date</Label>
                  <p className="text-white">{selectedNotification.dateSent || 'Not sent'}</p>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3 pt-4 border-t border-slate-700">
                <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                  <Copy className="w-4 h-4 mr-2" />
                  Duplicate
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Send className="w-4 h-4 mr-2" />
                  Resend
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
