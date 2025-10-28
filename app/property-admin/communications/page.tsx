"use client"

import { useState, useEffect } from 'react'
import { 
  MessageSquare, 
  Plus, 
  Search, 
  Filter, 
  Mail, 
  Smartphone, 
  Bell, 
  Eye, 
  Send, 
  Clock, 
  CheckCircle, 
  XCircle, 
  AlertCircle,
  Copy,
  Edit,
  Trash2,
  Calendar,
  Users,
  TrendingUp,
  Settings,
  Zap,
  FileText,
  DollarSign,
  Wrench,
  Home
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

// Mock data
const messages = [
  {
    id: 1,
    title: "Rent Reminder - December 2024",
    type: "rent",
    channel: ["sms", "in-app"],
    recipients: "12 Tenants",
    status: "sent",
    dateSent: "2024-12-01T10:30:00Z",
    readRate: 85,
    deliveryStatus: "delivered"
  },
  {
    id: 2,
    title: "Water Maintenance Notice",
    type: "maintenance",
    channel: ["email", "in-app"],
    recipients: "All Tenants",
    status: "scheduled",
    dateSent: "2024-12-02T14:00:00Z",
    readRate: 0,
    deliveryStatus: "pending"
  },
  {
    id: 3,
    title: "Welcome to Havenly Pro!",
    type: "welcome",
    channel: ["email"],
    recipients: "New Tenants",
    status: "sent",
    dateSent: "2024-11-28T09:15:00Z",
    readRate: 92,
    deliveryStatus: "delivered"
  },
  {
    id: 4,
    title: "Overdue Rent Notice",
    type: "rent",
    channel: ["sms", "email"],
    recipients: "3 Tenants",
    status: "sent",
    dateSent: "2024-11-25T16:45:00Z",
    readRate: 67,
    deliveryStatus: "delivered"
  }
]

const automationRules = [
  {
    id: 1,
    name: "Rent Due Reminder",
    trigger: "3 days before rent due",
    message: "Your rent is due in 3 days. Please ensure payment is made on time.",
    channels: ["email", "in-app"],
    active: true
  },
  {
    id: 2,
    name: "Rent Overdue Alert",
    trigger: "5 days after due date",
    message: "Your rent is overdue. Please contact us immediately to avoid late fees.",
    channels: ["sms", "email"],
    active: true
  },
  {
    id: 3,
    name: "Maintenance Update",
    trigger: "When maintenance request is completed",
    message: "Your maintenance request has been resolved. Please check your unit.",
    channels: ["in-app"],
    active: true
  },
  {
    id: 4,
    name: "Welcome Message",
    trigger: "New tenant registration",
    message: "Welcome to [Property Name]! Here's your tenant portal access.",
    channels: ["email"],
    active: false
  }
]

const messageLogs = [
  {
    id: 1,
    date: "2024-12-01",
    channel: "Email",
    recipient: "Tenant #22",
    title: "Rent Due",
    status: "Sent",
    delivery: "Delivered",
    readTime: "2 hours ago"
  },
  {
    id: 2,
    date: "2024-11-30",
    channel: "SMS",
    recipient: "Tenant #14",
    title: "Rent Overdue",
    status: "Sent",
    delivery: "Failed",
    readTime: "No response"
  },
  {
    id: 3,
    date: "2024-11-29",
    channel: "In-App",
    recipient: "All Tenants",
    title: "Water Maintenance",
    status: "Sent",
    delivery: "Delivered",
    readTime: "Read by 9/12"
  }
]


export default function CommunicationsPage() {
  const [mounted, setMounted] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedTab, setSelectedTab] = useState('all')
  const [selectedChannels, setSelectedChannels] = useState<string[]>([])

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const handleViewMessage = (messageId: number) => {
    console.log('Viewing message:', messageId)
    // Add view message functionality here
    alert(`Viewing message ${messageId}`)
  }

  const handleDuplicateMessage = (messageId: number) => {
    console.log('Duplicating message:', messageId)
    // Add duplicate message functionality here
    alert(`Duplicating message ${messageId}`)
  }

  const handleResendMessage = (messageId: number) => {
    console.log('Resending message:', messageId)
    // Add resend message functionality here
    alert(`Resending message ${messageId}`)
  }

  const handleDeleteMessage = (messageId: number) => {
    console.log('Deleting message:', messageId)
    // Add delete message functionality here
    if (confirm(`Are you sure you want to delete message ${messageId}?`)) {
      alert(`Message ${messageId} deleted`)
    }
  }

  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.title.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesTab = selectedTab === 'all' || message.type === selectedTab
    const matchesChannel = selectedChannels.length === 0 || 
      selectedChannels.some(channel => message.channel.includes(channel))
    
    return matchesSearch && matchesTab && matchesChannel
  })

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'sent':
        return <CheckCircle className="w-4 h-4 text-green-500" />
      case 'scheduled':
        return <Clock className="w-4 h-4 text-yellow-500" />
      case 'failed':
        return <XCircle className="w-4 h-4 text-red-500" />
      default:
        return <AlertCircle className="w-4 h-4 text-gray-500" />
    }
  }

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'email':
        return <Mail className="w-4 h-4 text-blue-500" />
      case 'sms':
        return <Smartphone className="w-4 h-4 text-green-500" />
      case 'in-app':
        return <Bell className="w-4 h-4 text-purple-500" />
      default:
        return <MessageSquare className="w-4 h-4 text-gray-500" />
    }
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Communications & Notifications</h1>
          <p className="text-slate-400 mt-2">Manage tenant communications across all channels</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button 
            onClick={() => window.location.href = '/property-admin/communications/new'}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
          >
            <Plus className="w-4 h-4 mr-2" />
            New Message
          </Button>
          <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </Button>
        </div>
      </div>

      {/* Analytics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Total Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">1,247</div>
            <p className="text-xs text-green-400 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +12% this month
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Read Rate</CardTitle>
            <Eye className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">78%</div>
            <p className="text-xs text-green-400 flex items-center">
              <TrendingUp className="h-3 w-3 mr-1" />
              +5% improvement
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Active Tenants</CardTitle>
            <Users className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">156</div>
            <p className="text-xs text-slate-400">Receiving notifications</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-300">Automation Rules</CardTitle>
            <Zap className="h-4 w-4 text-yellow-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-white">4</div>
            <p className="text-xs text-green-400">3 active</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5 bg-slate-800/50 border-slate-700">
          <TabsTrigger value="all" className="text-blue-400 data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400">
            All Messages
          </TabsTrigger>
          <TabsTrigger value="rent" className="text-blue-400 data-[state=active]:bg-green-500/20 data-[state=active]:text-green-400">
            Rent Notices
          </TabsTrigger>
          <TabsTrigger value="maintenance" className="text-blue-400 data-[state=active]:bg-yellow-500/20 data-[state=active]:text-yellow-400">
            Maintenance
          </TabsTrigger>
          <TabsTrigger value="broadcast" className="text-blue-400 data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400">
            Broadcasts
          </TabsTrigger>
          <TabsTrigger value="automation" className="text-blue-400 data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-400">
            Automation
          </TabsTrigger>
        </TabsList>

        {/* All Messages Tab */}
        <TabsContent value="all" className="space-y-6">
          {/* Search and Filters */}
          <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <Input
                    placeholder="Search messages..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-slate-700/50 border-slate-600 text-white"
                  />
                </div>
                <div className="flex gap-2">
                  <Select value={selectedChannels[0]} onValueChange={(value) => setSelectedChannels([value])}>
                    <SelectTrigger className="w-40 bg-slate-700/50 border-slate-600 text-white">
                      <SelectValue placeholder="Channel" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Channels</SelectItem>
                      <SelectItem value="email">Email</SelectItem>
                      <SelectItem value="sms">SMS</SelectItem>
                      <SelectItem value="in-app">In-App</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" className="border-slate-600 text-slate-300">
                    <Filter className="w-4 h-4 mr-2" />
                    Filters
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Messages Table */}
          <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Recent Messages</CardTitle>
              <CardDescription className="text-slate-400">
                All sent and scheduled messages
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-700">
                    <TableHead className="text-slate-300">Message</TableHead>
                    <TableHead className="text-slate-300">Channel</TableHead>
                    <TableHead className="text-slate-300">Recipients</TableHead>
                    <TableHead className="text-slate-300">Status</TableHead>
                    <TableHead className="text-slate-300">Date</TableHead>
                    <TableHead className="text-slate-300">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredMessages.map((message) => (
                    <TableRow key={message.id} className="border-slate-700 hover:bg-slate-700/50">
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          {getStatusIcon(message.status)}
                          <div>
                            <p className="font-medium text-white">{message.title}</p>
                            <p className="text-sm text-slate-400">
                              {message.readRate > 0 ? `${message.readRate}% read` : 'Scheduled'}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          {message.channel.map((ch) => (
                            <div key={ch} className="flex items-center space-x-1">
                              {getChannelIcon(ch)}
                            </div>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="text-slate-300">{message.recipients}</TableCell>
                      <TableCell>
                        <Badge 
                          variant="secondary" 
                          className={
                            message.status === 'sent' ? 'bg-green-500/20 text-green-400' :
                            message.status === 'scheduled' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-red-500/20 text-red-400'
                          }
                        >
                          {message.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-slate-300">
                        {new Date(message.dateSent).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleViewMessage(message.id)}
                            className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
                            title="View Message"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleDuplicateMessage(message.id)}
                            className="text-green-400 hover:text-green-300 hover:bg-green-500/10"
                            title="Duplicate Message"
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleResendMessage(message.id)}
                            className="text-purple-400 hover:text-purple-300 hover:bg-purple-500/10"
                            title="Resend Message"
                          >
                            <Send className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleDeleteMessage(message.id)}
                            className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                            title="Delete Message"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Rent Notices Tab */}
        <TabsContent value="rent" className="space-y-6">
          <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <DollarSign className="w-5 h-5 mr-2 text-green-400" />
                Rent & Payment Notices
              </CardTitle>
              <CardDescription className="text-slate-400">
                Manage rent reminders, overdue notices, and payment communications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-700">
                    <TableHead className="text-slate-300">Message</TableHead>
                    <TableHead className="text-slate-300">Channel</TableHead>
                    <TableHead className="text-slate-300">Recipients</TableHead>
                    <TableHead className="text-slate-300">Status</TableHead>
                    <TableHead className="text-slate-300">Date</TableHead>
                    <TableHead className="text-slate-300">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {messages.filter(msg => msg.type === 'rent').map((message) => (
                    <TableRow key={message.id} className="border-slate-700 hover:bg-slate-700/50">
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          {getStatusIcon(message.status)}
                          <div>
                            <p className="font-medium text-white">{message.title}</p>
                            <p className="text-sm text-slate-400">
                              {message.readRate > 0 ? `${message.readRate}% read` : 'Scheduled'}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          {message.channel.map((ch) => (
                            <div key={ch} className="flex items-center space-x-1">
                              {getChannelIcon(ch)}
                            </div>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="text-slate-300">{message.recipients}</TableCell>
                      <TableCell>
                        <Badge 
                          variant="secondary" 
                          className={
                            message.status === 'sent' ? 'bg-green-500/20 text-green-400' :
                            message.status === 'scheduled' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-red-500/20 text-red-400'
                          }
                        >
                          {message.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-slate-300">
                        {new Date(message.dateSent).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleViewMessage(message.id)}
                            className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
                            title="View Message"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleDuplicateMessage(message.id)}
                            className="text-green-400 hover:text-green-300 hover:bg-green-500/10"
                            title="Duplicate Message"
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleResendMessage(message.id)}
                            className="text-purple-400 hover:text-purple-300 hover:bg-purple-500/10"
                            title="Resend Message"
                          >
                            <Send className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleDeleteMessage(message.id)}
                            className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                            title="Delete Message"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Maintenance Tab */}
        <TabsContent value="maintenance" className="space-y-6">
          <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Wrench className="w-5 h-5 mr-2 text-yellow-400" />
                Maintenance Notices
              </CardTitle>
              <CardDescription className="text-slate-400">
                Track maintenance updates, repair notifications, and facility alerts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-700">
                    <TableHead className="text-slate-300">Message</TableHead>
                    <TableHead className="text-slate-300">Channel</TableHead>
                    <TableHead className="text-slate-300">Recipients</TableHead>
                    <TableHead className="text-slate-300">Status</TableHead>
                    <TableHead className="text-slate-300">Date</TableHead>
                    <TableHead className="text-slate-300">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {messages.filter(msg => msg.type === 'maintenance').map((message) => (
                    <TableRow key={message.id} className="border-slate-700 hover:bg-slate-700/50">
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          {getStatusIcon(message.status)}
                          <div>
                            <p className="font-medium text-white">{message.title}</p>
                            <p className="text-sm text-slate-400">
                              {message.readRate > 0 ? `${message.readRate}% read` : 'Scheduled'}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          {message.channel.map((ch) => (
                            <div key={ch} className="flex items-center space-x-1">
                              {getChannelIcon(ch)}
                            </div>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="text-slate-300">{message.recipients}</TableCell>
                      <TableCell>
                        <Badge 
                          variant="secondary" 
                          className={
                            message.status === 'sent' ? 'bg-green-500/20 text-green-400' :
                            message.status === 'scheduled' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-red-500/20 text-red-400'
                          }
                        >
                          {message.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-slate-300">
                        {new Date(message.dateSent).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleViewMessage(message.id)}
                            className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
                            title="View Message"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleDuplicateMessage(message.id)}
                            className="text-green-400 hover:text-green-300 hover:bg-green-500/10"
                            title="Duplicate Message"
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleResendMessage(message.id)}
                            className="text-purple-400 hover:text-purple-300 hover:bg-purple-500/10"
                            title="Resend Message"
                          >
                            <Send className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleDeleteMessage(message.id)}
                            className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                            title="Delete Message"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Broadcast Tab */}
        <TabsContent value="broadcast" className="space-y-6">
          <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Bell className="w-5 h-5 mr-2 text-purple-400" />
                Broadcast Messages
              </CardTitle>
              <CardDescription className="text-slate-400">
                Manage general announcements, policy updates, and community notices
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-700">
                    <TableHead className="text-slate-300">Message</TableHead>
                    <TableHead className="text-slate-300">Channel</TableHead>
                    <TableHead className="text-slate-300">Recipients</TableHead>
                    <TableHead className="text-slate-300">Status</TableHead>
                    <TableHead className="text-slate-300">Date</TableHead>
                    <TableHead className="text-slate-300">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {messages.filter(msg => msg.type === 'welcome' || msg.type === 'broadcast').map((message) => (
                    <TableRow key={message.id} className="border-slate-700 hover:bg-slate-700/50">
                      <TableCell>
                        <div className="flex items-center space-x-3">
                          {getStatusIcon(message.status)}
                          <div>
                            <p className="font-medium text-white">{message.title}</p>
                            <p className="text-sm text-slate-400">
                              {message.readRate > 0 ? `${message.readRate}% read` : 'Scheduled'}
                            </p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-1">
                          {message.channel.map((ch) => (
                            <div key={ch} className="flex items-center space-x-1">
                              {getChannelIcon(ch)}
                            </div>
                          ))}
                        </div>
                      </TableCell>
                      <TableCell className="text-slate-300">{message.recipients}</TableCell>
                      <TableCell>
                        <Badge 
                          variant="secondary" 
                          className={
                            message.status === 'sent' ? 'bg-green-500/20 text-green-400' :
                            message.status === 'scheduled' ? 'bg-yellow-500/20 text-yellow-400' :
                            'bg-red-500/20 text-red-400'
                          }
                        >
                          {message.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-slate-300">
                        {new Date(message.dateSent).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleViewMessage(message.id)}
                            className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
                            title="View Message"
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleDuplicateMessage(message.id)}
                            className="text-green-400 hover:text-green-300 hover:bg-green-500/10"
                            title="Duplicate Message"
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleResendMessage(message.id)}
                            className="text-purple-400 hover:text-purple-300 hover:bg-purple-500/10"
                            title="Resend Message"
                          >
                            <Send className="w-4 h-4" />
                          </Button>
                          <Button 
                            variant="ghost" 
                            size="sm" 
                            onClick={() => handleDeleteMessage(message.id)}
                            className="text-red-400 hover:text-red-300 hover:bg-red-500/10"
                            title="Delete Message"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Automation Tab */}
        <TabsContent value="automation" className="space-y-6">
          <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Zap className="w-5 h-5 mr-2 text-yellow-400" />
                Automation Rules
              </CardTitle>
              <CardDescription className="text-slate-400">
                Set up automatic notifications based on triggers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {automationRules.map((rule) => (
                  <div key={rule.id} className="p-4 rounded-lg bg-slate-700/50 border border-slate-600">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="font-medium text-white">{rule.name}</h4>
                          <Badge variant="outline" className="text-xs">
                            {rule.trigger}
                          </Badge>
                        </div>
                        <p className="text-sm text-slate-400 mb-2">{rule.message}</p>
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-1">
                            {rule.channels.map((channel) => getChannelIcon(channel))}
                          </div>
                          <span className="text-xs text-slate-500">
                            Channels: {rule.channels.join(', ')}
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Switch checked={rule.active} />
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Message Logs Tab */}
        <TabsContent value="logs" className="space-y-6">
          <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Message Logs</CardTitle>
              <CardDescription className="text-slate-400">
                Complete audit trail of all communications
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-700">
                    <TableHead className="text-slate-300">Date</TableHead>
                    <TableHead className="text-slate-300">Channel</TableHead>
                    <TableHead className="text-slate-300">Recipient</TableHead>
                    <TableHead className="text-slate-300">Message</TableHead>
                    <TableHead className="text-slate-300">Status</TableHead>
                    <TableHead className="text-slate-300">Delivery</TableHead>
                    <TableHead className="text-slate-300">Read Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {messageLogs.map((log) => (
                    <TableRow key={log.id} className="border-slate-700 hover:bg-slate-700/50">
                      <TableCell className="text-slate-300">{log.date}</TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-1">
                          {getChannelIcon(log.channel.toLowerCase())}
                          <span className="text-slate-300">{log.channel}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-slate-300">{log.recipient}</TableCell>
                      <TableCell className="text-slate-300">{log.title}</TableCell>
                      <TableCell>
                        <Badge 
                          variant="secondary" 
                          className={
                            log.status === 'Sent' ? 'bg-green-500/20 text-green-400' :
                            'bg-red-500/20 text-red-400'
                          }
                        >
                          {log.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge 
                          variant="secondary" 
                          className={
                            log.delivery === 'Delivered' ? 'bg-green-500/20 text-green-400' :
                            'bg-red-500/20 text-red-400'
                          }
                        >
                          {log.delivery}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-slate-300">{log.readTime}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>


    </div>
  )
}
