"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  MessageSquare,
  Bell,
  Send,
  Paperclip,
  Image as ImageIcon,
  Check,
  CheckCheck,
  CheckCircle,
  Clock,
  AlertCircle,
  DollarSign,
  Wrench,
  Building,
  Phone,
  Mail,
  Volume2,
  VolumeX,
  Filter,
  Calendar,
  User,
  Settings
} from 'lucide-react'

export default function CommunicationsPage() {
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState('messages')
  const [selectedConversation, setSelectedConversation] = useState<any>(null)
  const [newMessage, setNewMessage] = useState('')
  const [filterType, setFilterType] = useState('all')
  const [markAllReadOpen, setMarkAllReadOpen] = useState(false)
  const [notificationSettingsOpen, setNotificationSettingsOpen] = useState(false)

  // Mock conversations
  const conversations = [
    {
      id: 'CONV-001',
      name: 'Property Management',
      avatar: 'PM',
      lastMessage: 'Your maintenance request has been assigned to a technician.',
      time: '2 hours ago',
      unread: 2,
      type: 'admin'
    },
    {
      id: 'CONV-002',
      name: 'Maintenance Team',
      avatar: 'MT',
      lastMessage: 'We will be working on your AC unit tomorrow at 2 PM.',
      time: '5 hours ago',
      unread: 0,
      type: 'maintenance'
    },
    {
      id: 'CONV-003',
      name: 'Finance Department',
      avatar: 'FD',
      lastMessage: 'Your rent payment for January has been received. Thank you!',
      time: '1 day ago',
      unread: 1,
      type: 'finance'
    }
  ]

  // Mock notifications
  const notifications = [
    {
      id: 'NOTIF-001',
      type: 'rent',
      title: 'Rent Due Reminder',
      message: 'Your rent payment of $1,200 is due in 3 days.',
      time: '1 hour ago',
      read: false,
      icon: DollarSign,
      color: 'blue'
    },
    {
      id: 'NOTIF-002',
      type: 'maintenance',
      title: 'Maintenance Update',
      message: 'Technician assigned to your plumbing request #MREQ-001',
      time: '2 hours ago',
      read: false,
      icon: Wrench,
      color: 'green'
    },
    {
      id: 'NOTIF-003',
      type: 'system',
      title: 'Water Shutdown Notice',
      message: 'Water will be shut down on Feb 5th from 10 AM to 2 PM for maintenance',
      time: '1 day ago',
      read: true,
      icon: AlertCircle,
      color: 'yellow'
    },
    {
      id: 'NOTIF-004',
      type: 'payment',
      title: 'Payment Received',
      message: 'Your payment of $1,200 has been processed successfully.',
      time: '2 days ago',
      read: true,
      icon: CheckCircle,
      color: 'green'
    },
    {
      id: 'NOTIF-005',
      type: 'broadcast',
      title: 'New Community Event',
      message: 'Join us for a resident meeting this Saturday at 3 PM in the lobby.',
      time: '3 days ago',
      read: true,
      icon: Building,
      color: 'purple'
    }
  ]

  // Mock chat messages
  const chatMessages = {
    'CONV-001': [
      { id: 1, sender: 'You', message: 'Hi, I need to report a plumbing issue in my unit.', time: '2024-01-10 9:00 AM', read: true, type: 'sent' },
      { id: 2, sender: 'Property Management', message: 'Hello! We received your request. What exactly is the issue?', time: '2024-01-10 9:15 AM', read: true, type: 'received' },
      { id: 3, sender: 'You', message: 'The kitchen sink is leaking and water is pooling under the cabinet.', time: '2024-01-10 9:20 AM', read: true, type: 'sent' },
      { id: 4, sender: 'Property Management', message: 'Your maintenance request has been assigned to a technician.', time: '2 hours ago', read: false, type: 'received' }
    ],
    'CONV-002': [
      { id: 1, sender: 'Maintenance Team', message: 'We will be working on your AC unit tomorrow at 2 PM.', time: '5 hours ago', read: false, type: 'received' },
      { id: 2, sender: 'You', message: 'Thank you for the update. I will make sure to be home.', time: '4 hours ago', read: true, type: 'sent' }
    ],
    'CONV-003': [
      { id: 1, sender: 'Finance Department', message: 'Your rent payment for January has been received. Thank you!', time: '1 day ago', read: false, type: 'received' }
    ]
  }

  const getNotificationFiltered = () => {
    if (filterType === 'all') return notifications
    return notifications.filter(n => n.type === filterType)
  }

  const getUnreadCount = () => {
    return notifications.filter(n => !n.read).length
  }

  const markAllAsRead = () => {
    notifications.forEach(n => n.read = true)
    setMarkAllReadOpen(false)
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Communications & Notifications</h1>
          <p className="text-slate-400 mt-2">Chat with property management and view notifications</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button 
            variant="outline" 
            className="border-slate-600 text-slate-300 hover:bg-slate-700"
            onClick={() => setNotificationSettingsOpen(true)}
          >
            <Settings className="w-4 h-4 mr-2" />
            Notification Settings
          </Button>
          {getUnreadCount() > 0 && (
            <Button 
              variant="outline" 
              className="border-green-500/50 text-green-400 hover:bg-green-500/10"
              onClick={() => setMarkAllReadOpen(true)}
            >
              <CheckCheck className="w-4 h-4 mr-2" />
              Mark All as Read
            </Button>
          )}
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-blue-500/50 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
            <CardTitle className="text-sm font-medium text-slate-300">Unread Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent className="pt-2">
            <div className="text-xl font-bold text-white">{conversations.reduce((acc, c) => acc + c.unread, 0)}</div>
            <p className="text-xs text-blue-400">New messages</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-yellow-500/50 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
            <CardTitle className="text-sm font-medium text-slate-300">Unread Notifications</CardTitle>
            <Bell className="h-4 w-4 text-yellow-400" />
          </CardHeader>
          <CardContent className="pt-2">
            <div className="text-xl font-bold text-white">{getUnreadCount()}</div>
            <p className="text-xs text-yellow-400">New alerts</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-green-500/50 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
            <CardTitle className="text-sm font-medium text-slate-300">Active Conversations</CardTitle>
            <User className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent className="pt-2">
            <div className="text-xl font-bold text-white">{conversations.length}</div>
            <p className="text-xs text-green-400">Ongoing chats</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-purple-500/50 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
            <CardTitle className="text-sm font-medium text-slate-300">Channels Enabled</CardTitle>
            <Volume2 className="h-4 w-4 text-purple-400" />
          </CardHeader>
          <CardContent className="pt-2">
            <div className="text-xl font-bold text-white">4</div>
            <p className="text-xs text-purple-400">In-app, Email, SMS, WhatsApp</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-1">
          <TabsTrigger value="messages" className="text-slate-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white">
            Messages
          </TabsTrigger>
          <TabsTrigger value="notifications" className="text-slate-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white">
            Notifications
          </TabsTrigger>
        </TabsList>

        {/* Messages Tab */}
        <TabsContent value="messages" className="space-y-6">
          <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Messages</CardTitle>
              <CardDescription className="text-slate-400">Chat with property management team</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Conversations List */}
                <div className="lg:col-span-1 space-y-2 border-r border-slate-700 pr-4">
                  <div className="relative">
                    <MessageSquare className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Input
                      placeholder="Search conversations..."
                      className="pl-10 bg-slate-700/50 border-slate-600 text-white"
                    />
                  </div>
                  <div className="space-y-2 max-h-[600px] overflow-y-auto">
                    {conversations.map((conv) => (
                      <div
                        key={conv.id}
                        onClick={() => setSelectedConversation(conv)}
                        className={`p-4 rounded-lg cursor-pointer transition-all ${
                          selectedConversation?.id === conv.id
                            ? 'bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/50'
                            : 'bg-slate-700/30 hover:bg-slate-700/50 border border-transparent'
                        }`}
                      >
                        <div className="flex items-start space-x-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold flex-shrink-0">
                            {conv.avatar}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between">
                              <h4 className="text-white font-semibold truncate">{conv.name}</h4>
                              <span className="text-xs text-slate-500 flex-shrink-0 ml-2">{conv.time}</span>
                            </div>
                            <p className="text-sm text-slate-400 truncate mt-1">{conv.lastMessage}</p>
                            {conv.unread > 0 && (
                              <Badge className="mt-2 bg-blue-500 text-white">
                                {conv.unread} new
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Chat Window */}
                <div className="lg:col-span-2 flex flex-col">
                  {selectedConversation ? (
                    <>
                      {/* Chat Header */}
                      <div className="flex items-center justify-between pb-4 border-b border-slate-700">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold">
                            {selectedConversation.avatar}
                          </div>
                          <div>
                            <h3 className="text-white font-semibold">{selectedConversation.name}</h3>
                            <p className="text-xs text-slate-400">Online now</p>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                          <Phone className="w-4 h-4" />
                        </Button>
                      </div>

                      {/* Messages */}
                      <div className="flex-1 overflow-y-auto space-y-3 mt-4 pr-2">
                        {chatMessages[selectedConversation.id as keyof typeof chatMessages]?.map((msg) => (
                          <div 
                            key={msg.id}
                            className={`flex ${msg.type === 'sent' ? 'justify-end' : 'justify-start'}`}
                          >
                            <div className={`max-w-[75%] rounded-lg p-3 ${
                              msg.type === 'sent'
                                ? 'bg-blue-500/20 border border-blue-500/30'
                                : 'bg-slate-700/50 border border-slate-600/50'
                            }`}>
                              <p className="text-sm text-white">{msg.message}</p>
                              <div className="flex items-center space-x-2 mt-1">
                                <span className="text-xs text-slate-500">{msg.time}</span>
                                {msg.type === 'sent' && (
                                  <span className="text-xs text-blue-400">
                                    {msg.read ? <CheckCheck className="w-3 h-3 inline" /> : <Check className="w-3 h-3 inline" />}
                                  </span>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Message Input */}
                      <div className="mt-4 pt-4 border-t border-slate-700">
                        <div className="flex space-x-2">
                          <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                            <Paperclip className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                            <ImageIcon className="w-4 h-4" />
                          </Button>
                          <Textarea
                            placeholder="Type your message..."
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            rows={2}
                            className="flex-1 bg-slate-700/50 border-slate-600 resize-none text-white placeholder-slate-400"
                          />
                          <Button 
                            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                            onClick={() => {
                              if (newMessage.trim()) {
                                setNewMessage('')
                              }
                            }}
                          >
                            <Send className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="flex items-center justify-center h-full text-slate-400">
                      <div className="text-center">
                        <MessageSquare className="w-16 h-16 mx-auto mb-4 text-slate-600" />
                        <p>Select a conversation to start messaging</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white">Notifications</CardTitle>
                  <CardDescription className="text-slate-400">Stay updated with important information</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Filter className="w-4 h-4 text-slate-400" />
                  <select
                    value={filterType}
                    onChange={(e) => setFilterType(e.target.value)}
                    className="bg-slate-700/50 border border-slate-600 text-white rounded-lg px-3 py-2 text-sm"
                  >
                    <option value="all">All Types</option>
                    <option value="rent">Rent</option>
                    <option value="maintenance">Maintenance</option>
                    <option value="payment">Payment</option>
                    <option value="system">System</option>
                    <option value="broadcast">Broadcast</option>
                  </select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {getNotificationFiltered().map((notif) => {
                  const Icon = notif.icon
                  return (
                    <div
                      key={notif.id}
                      className={`p-4 rounded-lg border transition-all ${
                        notif.read
                          ? 'bg-slate-700/30 border-slate-600/50'
                          : 'bg-${notif.color}-500/10 border-${notif.color}-500/30'
                      }`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`w-10 h-10 rounded-full bg-${notif.color}-500/20 flex items-center justify-center flex-shrink-0`}>
                          <Icon className={`w-5 h-5 text-${notif.color}-400`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="text-white font-semibold">{notif.title}</h4>
                              <p className="text-sm text-slate-400 mt-1">{notif.message}</p>
                            </div>
                            {!notif.read && (
                              <div className="w-2 h-2 rounded-full bg-blue-500 flex-shrink-0 ml-3 mt-2"></div>
                            )}
                          </div>
                          <div className="flex items-center space-x-2 mt-2">
                            <span className="text-xs text-slate-500">{notif.time}</span>
                            <Badge variant="outline" className="text-xs border-slate-600 text-slate-400">
                              {notif.type}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Mark All as Read Dialog */}
      <Dialog open={markAllReadOpen} onOpenChange={setMarkAllReadOpen}>
        <DialogContent className="bg-slate-800 border-slate-700">
          <DialogHeader>
            <DialogTitle className="text-white">Mark All as Read</DialogTitle>
            <DialogDescription className="text-slate-400">
              Are you sure you want to mark all {getUnreadCount()} notifications as read?
            </DialogDescription>
          </DialogHeader>
          <div className="flex space-x-3 mt-4">
            <Button
              variant="outline"
              className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700"
              onClick={() => setMarkAllReadOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white"
              onClick={markAllAsRead}
            >
              Mark All as Read
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Notification Settings Dialog */}
      <Dialog open={notificationSettingsOpen} onOpenChange={setNotificationSettingsOpen}>
        <DialogContent className="bg-slate-800 border-slate-700 max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-white text-2xl">Notification Settings</DialogTitle>
            <DialogDescription className="text-slate-400">
              Manage how you receive notifications across different channels
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 mt-4">
            {/* Channel Settings */}
            <div className="space-y-4">
              <h3 className="text-white font-semibold flex items-center">
                <Volume2 className="w-4 h-4 mr-2 text-blue-400" />
                Notification Channels
              </h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-700/30 border border-slate-600/50">
                  <div className="flex items-center space-x-3">
                    <Bell className="w-5 h-5 text-blue-400" />
                    <div>
                      <p className="text-white font-medium">In-App Notifications</p>
                      <p className="text-xs text-slate-400">Receive notifications within the application</p>
                    </div>
                  </div>
                  <Switch defaultChecked className="data-[state=checked]:bg-blue-500" />
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-700/30 border border-slate-600/50">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-green-400" />
                    <div>
                      <p className="text-white font-medium">Email Notifications</p>
                      <p className="text-xs text-slate-400">john.doe@example.com</p>
                    </div>
                  </div>
                  <Switch defaultChecked className="data-[state=checked]:bg-green-500" />
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-700/30 border border-slate-600/50">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-purple-400" />
                    <div>
                      <p className="text-white font-medium">SMS Notifications</p>
                      <p className="text-xs text-slate-400">+1 (555) 123-4567</p>
                    </div>
                  </div>
                  <Switch defaultChecked={false} className="data-[state=checked]:bg-purple-500" />
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-700/30 border border-slate-600/50">
                  <div className="flex items-center space-x-3">
                    <MessageSquare className="w-5 h-5 text-green-500" />
                    <div>
                      <p className="text-white font-medium">WhatsApp Notifications</p>
                      <p className="text-xs text-slate-400">Connected</p>
                    </div>
                  </div>
                  <Switch defaultChecked={false} className="data-[state=checked]:bg-green-500" />
                </div>
              </div>
            </div>

            {/* Notification Types */}
            <div className="space-y-4">
              <h3 className="text-white font-semibold">Notification Types</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 rounded-lg bg-slate-700/30 border border-slate-600/50">
                  <div className="flex items-center space-x-2 mb-2">
                    <DollarSign className="w-4 h-4 text-blue-400" />
                    <Label htmlFor="rent-notif" className="text-white text-sm">Rent Reminders</Label>
                  </div>
                  <Switch id="rent-notif" defaultChecked className="data-[state=checked]:bg-blue-500" />
                </div>

                <div className="p-3 rounded-lg bg-slate-700/30 border border-slate-600/50">
                  <div className="flex items-center space-x-2 mb-2">
                    <Wrench className="w-4 h-4 text-green-400" />
                    <Label htmlFor="maint-notif" className="text-white text-sm">Maintenance Updates</Label>
                  </div>
                  <Switch id="maint-notif" defaultChecked className="data-[state=checked]:bg-green-500" />
                </div>

                <div className="p-3 rounded-lg bg-slate-700/30 border border-slate-600/50">
                  <div className="flex items-center space-x-2 mb-2">
                    <Building className="w-4 h-4 text-purple-400" />
                    <Label htmlFor="broadcast-notif" className="text-white text-sm">Announcements</Label>
                  </div>
                  <Switch id="broadcast-notif" defaultChecked className="data-[state=checked]:bg-purple-500" />
                </div>

                <div className="p-3 rounded-lg bg-slate-700/30 border border-slate-600/50">
                  <div className="flex items-center space-x-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-green-400" />
                    <Label htmlFor="payment-notif" className="text-white text-sm">Payment Confirmations</Label>
                  </div>
                  <Switch id="payment-notif" defaultChecked className="data-[state=checked]:bg-green-500" />
                </div>
              </div>
            </div>

            <div className="flex space-x-3 pt-4 border-t border-slate-700">
              <Button
                variant="outline"
                className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700"
                onClick={() => setNotificationSettingsOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                onClick={() => {
                  alert('Settings saved successfully!')
                  setNotificationSettingsOpen(false)
                }}
              >
                Save Settings
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}

