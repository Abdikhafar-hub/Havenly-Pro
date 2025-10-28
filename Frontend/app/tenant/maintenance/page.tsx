"use client"

import { useState, useEffect } from 'react'
import { 
  Wrench, 
  Plus,
  MessageSquare,
  Clock,
  CheckCircle,
  AlertCircle,
  Star,
  Search,
  Filter,
  Image as ImageIcon,
  Video,
  Upload,
  Send,
  User,
  Calendar,
  Phone,
  Mail,
  Eye
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
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
const maintenanceRequests = [
  { 
    id: 'MREQ-001', 
    title: 'Leaky Faucet in Kitchen',
    category: 'Plumbing',
    status: 'Completed',
    urgency: 'High',
    date: '2024-01-10',
    description: 'The kitchen faucet has been leaking continuously for the past 2 days.',
    tech: 'John Mitchell',
    rating: 5,
    messages: 3
  },
  { 
    id: 'MREQ-002', 
    title: 'AC Not Working',
    category: 'HVAC',
    status: 'In Progress',
    urgency: 'High',
    date: '2024-01-15',
    description: 'Air conditioning unit stopped working in the living room.',
    tech: 'Sarah Johnson',
    rating: null,
    messages: 5
  },
  { 
    id: 'MREQ-003', 
    title: 'Broken Door Lock',
    category: 'Locksmith',
    status: 'Pending',
    urgency: 'Medium',
    date: '2024-01-16',
    description: 'Front door lock is jammed and won\'t turn properly.',
    tech: null,
    rating: null,
    messages: 1
  },
]

export default function TenantMaintenance() {
  const [mounted, setMounted] = useState(false)
  const [newRequestModalOpen, setNewRequestModalOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('')
  const [urgency, setUrgency] = useState('')
  const [description, setDescription] = useState('')
  const [filterStatus, setFilterStatus] = useState('all')
  const [selectedRequest, setSelectedRequest] = useState<string | null>(null)
  const [chatModalOpen, setChatModalOpen] = useState(false)
  const [activeChatRequest, setActiveChatRequest] = useState<any>(null)
  const [newMessage, setNewMessage] = useState('')

  // Mock chat messages
  const chatMessages = {
    'MREQ-001': [
      { id: 1, sender: 'Property Admin', message: 'Your request has been received. We will assign a technician soon.', time: '2024-01-10 10:30 AM', type: 'admin' },
      { id: 2, sender: 'You', message: 'Thank you! The leak is getting worse, please prioritize.', time: '2024-01-10 11:00 AM', type: 'tenant' },
      { id: 3, sender: 'Property Admin', message: 'Technician John Mitchell has been assigned and will arrive today.', time: '2024-01-10 2:00 PM', type: 'admin' },
    ],
    'MREQ-002': [
      { id: 1, sender: 'Property Admin', message: 'We received your AC issue report. Our HVAC team will investigate.', time: '2024-01-15 9:00 AM', type: 'admin' },
      { id: 2, sender: 'You', message: 'Thank you. It\'s very hot in here, especially during the day.', time: '2024-01-15 10:00 AM', type: 'tenant' },
      { id: 3, sender: 'Property Admin', message: 'Sarah Johnson will be there this afternoon. Please ensure someone is home.', time: '2024-01-15 12:00 PM', type: 'admin' },
      { id: 4, sender: 'You', message: 'Will do. I\'ll be home after 2 PM.', time: '2024-01-15 12:30 PM', type: 'tenant' },
    ],
    'MREQ-003': [
      { id: 1, sender: 'Property Admin', message: 'Thank you for reporting the door lock issue. This is under review.', time: '2024-01-16 8:00 AM', type: 'admin' },
    ],
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const getStatusBadge = (status: string) => {
    const styles = {
      'Pending': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      'In Progress': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'Completed': 'bg-green-500/20 text-green-400 border-green-500/30'
    }
    return (
      <Badge className={styles[status as keyof typeof styles]}>{status}</Badge>
    )
  }

  const getUrgencyBadge = (urgency: string) => {
    const styles = {
      'Low': 'bg-slate-500/20 text-slate-400 border-slate-500/30',
      'Medium': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      'High': 'bg-red-500/20 text-red-400 border-red-500/30'
    }
    return (
      <Badge className={styles[urgency as keyof typeof styles]}>{urgency}</Badge>
    )
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Maintenance & Service Requests</h1>
          <p className="text-slate-400 mt-2">Submit and track your maintenance requests</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
          <Dialog open={newRequestModalOpen} onOpenChange={setNewRequestModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                New Request
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-slate-800 border-slate-700 max-w-3xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle className="text-white text-2xl">Submit Maintenance Request</DialogTitle>
                <DialogDescription className="text-slate-400">
                  Describe the issue and our team will get back to you
                </DialogDescription>
              </DialogHeader>
              
              <div className="space-y-4 mt-4">
                <div>
                  <Label htmlFor="title" className="text-slate-300">Issue Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Leaky Faucet in Kitchen"
                    className="mt-2 bg-slate-700/50 border-slate-600 text-white placeholder-slate-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="category" className="text-slate-300">Category</Label>
                    <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                      <SelectTrigger className="mt-2 bg-slate-700/50 border-slate-600 text-white">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="plumbing">Plumbing</SelectItem>
                        <SelectItem value="hvac">HVAC</SelectItem>
                        <SelectItem value="electrical">Electrical</SelectItem>
                        <SelectItem value="locksmith">Locksmith</SelectItem>
                        <SelectItem value="appliances">Appliances</SelectItem>
                        <SelectItem value="painting">Painting</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="urgency" className="text-slate-300">Urgency</Label>
                    <Select value={urgency} onValueChange={setUrgency}>
                      <SelectTrigger className="mt-2 bg-slate-700/50 border-slate-600 text-white">
                        <SelectValue placeholder="Select urgency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="low">Low</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="high">High</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div>
                  <Label htmlFor="description" className="text-slate-300">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Provide detailed information about the issue..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={4}
                    className="mt-2 bg-slate-700/50 border-slate-600 text-white placeholder-slate-400"
                  />
                </div>

                <div>
                  <Label className="text-slate-300">Attach Images/Videos (Optional)</Label>
                  <div className="mt-2 border-2 border-dashed border-slate-600 rounded-lg p-6 text-center">
                    <Upload className="w-10 h-10 mx-auto text-slate-400 mb-3" />
                    <p className="text-sm text-slate-400 mb-2">Drag and drop files here or click to upload</p>
                    <Button variant="outline" size="sm" className="border-slate-600 text-slate-300">
                      <ImageIcon className="w-4 h-4 mr-2" />
                      Upload Images
                    </Button>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <Button 
                    variant="outline"
                    className="border-slate-600 text-slate-300 hover:bg-slate-700"
                    onClick={() => setNewRequestModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                    onClick={() => {
                      // Handle submission
                      setNewRequestModalOpen(false)
                    }}
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Submit Request
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-blue-500/50 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
            <CardTitle className="text-sm font-medium text-slate-300">Total Requests</CardTitle>
            <Wrench className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent className="pt-2">
            <div className="text-xl font-bold text-white">3</div>
            <p className="text-xs text-blue-400">All time</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-yellow-500/50 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
            <CardTitle className="text-sm font-medium text-slate-300">Pending</CardTitle>
            <Clock className="h-4 w-4 text-yellow-400" />
          </CardHeader>
          <CardContent className="pt-2">
            <div className="text-xl font-bold text-white">1</div>
            <p className="text-xs text-yellow-400">Awaiting response</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-blue-500/50 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
            <CardTitle className="text-sm font-medium text-slate-300">In Progress</CardTitle>
            <AlertCircle className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent className="pt-2">
            <div className="text-xl font-bold text-white">1</div>
            <p className="text-xs text-blue-400">Being worked on</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-green-500/50 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
            <CardTitle className="text-sm font-medium text-slate-300">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent className="pt-2">
            <div className="text-xl font-bold text-white">1</div>
            <p className="text-xs text-green-400">This month</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs defaultValue="requests" className="space-y-6">
        <TabsList className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-1">
          <TabsTrigger value="requests" className="text-slate-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white">
            My Requests
          </TabsTrigger>
          <TabsTrigger value="history" className="text-slate-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white">
            History
          </TabsTrigger>
        </TabsList>

        {/* Requests Tab */}
        <TabsContent value="requests" className="space-y-6">
          <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white">Current Requests</CardTitle>
                  <CardDescription className="text-slate-400">Track the status of your maintenance requests</CardDescription>
                </div>
                <Select value={filterStatus} onValueChange={setFilterStatus}>
                  <SelectTrigger className="w-40 bg-slate-700/50 border-slate-600 text-white">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Status</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {maintenanceRequests.map((request) => (
                  <div 
                    key={request.id} 
                    className="p-4 rounded-lg bg-slate-700/50 hover:bg-slate-700/70 transition-colors border border-slate-600/50 hover:border-blue-500/30"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <h4 className="text-white font-semibold text-lg">{request.title}</h4>
                          {getStatusBadge(request.status)}
                          {getUrgencyBadge(request.urgency)}
                        </div>
                        <p className="text-sm text-slate-400 mb-3">{request.description}</p>
                        <div className="flex items-center space-x-4 text-xs text-slate-500">
                          <div className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1" />
                            {request.date}
                          </div>
                          <div className="flex items-center">
                            <Wrench className="w-3 h-3 mr-1" />
                            {request.category}
                          </div>
                          {request.tech && (
                            <div className="flex items-center">
                              <User className="w-3 h-3 mr-1" />
                              {request.tech}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-slate-300 hover:text-white hover:bg-slate-600"
                          onClick={() => {
                            setActiveChatRequest(request)
                            setChatModalOpen(true)
                          }}
                        >
                          <MessageSquare className="w-4 h-4 mr-2" />
                          {request.messages}
                        </Button>
                        {request.status === 'Completed' && request.rating === null && (
                          <Button 
                            size="sm" 
                            className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white"
                          >
                            <Star className="w-4 h-4 mr-2" />
                            Rate
                          </Button>
                        )}
                        {request.rating && (
                          <div className="flex items-center space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className={`w-4 h-4 ${i < request.rating! ? 'fill-yellow-400 text-yellow-400' : 'text-slate-600'}`} 
                              />
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* History Tab */}
        <TabsContent value="history" className="space-y-6">
          <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Request History</CardTitle>
              <CardDescription className="text-slate-400">Past maintenance requests</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {maintenanceRequests.map((request) => (
                  <div key={request.id} className="p-4 rounded-lg bg-slate-700/50 border border-slate-600/50">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <h4 className="text-white font-semibold">{request.title}</h4>
                        {getStatusBadge(request.status)}
                      </div>
                      <div className="flex items-center space-x-2">
                        <p className="text-xs text-slate-400">{request.date}</p>
                        <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white hover:bg-slate-600">
                          <Eye className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Chat Modal */}
      <Dialog open={chatModalOpen} onOpenChange={setChatModalOpen}>
        <DialogContent className="bg-slate-800 border-slate-700 max-w-2xl h-[600px] flex flex-col">
          <DialogHeader>
            <DialogTitle className="text-white flex items-center">
              <MessageSquare className="w-5 h-5 mr-2 text-blue-400" />
              {activeChatRequest?.title}
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              Chat with Property Admin - {activeChatRequest?.category}
            </DialogDescription>
          </DialogHeader>
          
          <div className="flex-1 overflow-y-auto space-y-3 mt-4 pr-2">
            {activeChatRequest && chatMessages[activeChatRequest.id as keyof typeof chatMessages]?.map((msg) => (
              <div 
                key={msg.id}
                className={`flex ${msg.type === 'admin' ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`max-w-[75%] rounded-lg p-3 ${
                  msg.type === 'admin' 
                    ? 'bg-slate-700/50 border border-slate-600/50' 
                    : 'bg-blue-500/20 border border-blue-500/30'
                }`}>
                  <div className="flex items-center space-x-2 mb-1">
                    <span className={`text-xs font-medium ${
                      msg.type === 'admin' ? 'text-blue-400' : 'text-green-400'
                    }`}>
                      {msg.sender}
                    </span>
                    <span className="text-xs text-slate-500">{msg.time}</span>
                  </div>
                  <p className="text-sm text-white">{msg.message}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t border-slate-700">
            <div className="flex space-x-2">
              <Textarea
                placeholder="Type your message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                rows={2}
                className="bg-slate-700/50 border-slate-600 resize-none"
              />
              <Button 
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                onClick={() => {
                  if (newMessage.trim()) {
                    // Handle message sending
                    setNewMessage('')
                  }
                }}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

