"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { 
  ArrowLeft,
  Send, 
  Mail, 
  Smartphone, 
  Bell, 
  FileText,
  Calendar,
  Users,
  Clock,
  Save,
  Eye,
  X
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Switch } from '@/components/ui/switch'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

export default function NewMessagePage() {
  const [mounted, setMounted] = useState(false)
  const [messageTitle, setMessageTitle] = useState('')
  const [messageBody, setMessageBody] = useState('')
  const [selectedChannels, setSelectedChannels] = useState<string[]>([])
  const [recipientType, setRecipientType] = useState('')
  const [scheduleType, setScheduleType] = useState('now')
  const [scheduledDate, setScheduledDate] = useState('')
  const [scheduledTime, setScheduledTime] = useState('')
  const [showPreview, setShowPreview] = useState(false)
  const router = useRouter()

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const handleChannelToggle = (channel: string) => {
    setSelectedChannels(prev => 
      prev.includes(channel) 
        ? prev.filter(c => c !== channel)
        : [...prev, channel]
    )
  }

  const handleSendMessage = () => {
    // Handle sending message logic here
    console.log('Sending message:', {
      title: messageTitle,
      body: messageBody,
      channels: selectedChannels,
      recipientType,
      scheduleType,
      scheduledDate,
      scheduledTime
    })
    
    // Redirect back to communications page
    router.push('/property-admin/communications')
  }

  const handleSaveTemplate = () => {
    // Handle saving template logic here
    console.log('Saving template')
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            onClick={() => router.back()}
            className="text-slate-300 hover:text-white hover:bg-slate-700/50"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-white">Create New Message</h1>
            <p className="text-slate-400 mt-2">Send a message to your tenants through multiple channels</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Button 
            variant="outline" 
            onClick={() => setShowPreview(!showPreview)}
            className="border-slate-600 text-slate-300 hover:bg-slate-700"
          >
            <Eye className="w-4 h-4 mr-2" />
            {showPreview ? 'Hide Preview' : 'Show Preview'}
          </Button>
        </div>
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Message Form */}
          <div className="xl:col-span-2 space-y-6">
          <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Message Details</CardTitle>
              <CardDescription className="text-slate-400">
                Compose your message and select delivery options
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="title" className="text-slate-300 text-base font-medium">Message Title</Label>
                <Input
                  id="title"
                  value={messageTitle}
                  onChange={(e) => setMessageTitle(e.target.value)}
                  placeholder="Enter message title..."
                  className="bg-slate-700/50 border-slate-600 text-white mt-2 h-12 text-base"
                />
              </div>

              <div>
                <Label htmlFor="message" className="text-slate-300 text-base font-medium">Message Body</Label>
                <Textarea
                  id="message"
                  value={messageBody}
                  onChange={(e) => setMessageBody(e.target.value)}
                  placeholder="Type your message here..."
                  className="bg-slate-700/50 border-slate-600 text-white mt-2 min-h-48 resize-none text-base"
                />
              </div>

              <div>
                <Label className="text-slate-300 text-base font-medium">Delivery Channels</Label>
                <div className="grid grid-cols-3 gap-4 mt-3">
                  <div 
                    className={`flex items-center space-x-3 p-4 rounded-lg border transition-all cursor-pointer ${
                      selectedChannels.includes('email') 
                        ? 'bg-blue-500/20 border-blue-500 text-blue-400' 
                        : 'bg-slate-700/30 border-slate-600 hover:bg-slate-700/50'
                    }`}
                    onClick={() => handleChannelToggle('email')}
                  >
                    <Checkbox 
                      checked={selectedChannels.includes('email')}
                      onChange={() => handleChannelToggle('email')}
                    />
                    <Label className="cursor-pointer flex items-center space-x-2">
                      <Mail className="w-5 h-5" />
                      <span className="font-medium">Email</span>
                    </Label>
                  </div>
                  <div 
                    className={`flex items-center space-x-3 p-4 rounded-lg border transition-all cursor-pointer ${
                      selectedChannels.includes('sms') 
                        ? 'bg-green-500/20 border-green-500 text-green-400' 
                        : 'bg-slate-700/30 border-slate-600 hover:bg-slate-700/50'
                    }`}
                    onClick={() => handleChannelToggle('sms')}
                  >
                    <Checkbox 
                      checked={selectedChannels.includes('sms')}
                      onChange={() => handleChannelToggle('sms')}
                    />
                    <Label className="cursor-pointer flex items-center space-x-2">
                      <Smartphone className="w-5 h-5" />
                      <span className="font-medium">SMS</span>
                    </Label>
                  </div>
                  <div 
                    className={`flex items-center space-x-3 p-4 rounded-lg border transition-all cursor-pointer ${
                      selectedChannels.includes('in-app') 
                        ? 'bg-purple-500/20 border-purple-500 text-purple-400' 
                        : 'bg-slate-700/30 border-slate-600 hover:bg-slate-700/50'
                    }`}
                    onClick={() => handleChannelToggle('in-app')}
                  >
                    <Checkbox 
                      checked={selectedChannels.includes('in-app')}
                      onChange={() => handleChannelToggle('in-app')}
                    />
                    <Label className="cursor-pointer flex items-center space-x-2">
                      <Bell className="w-5 h-5" />
                      <span className="font-medium">In-App</span>
                    </Label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Recipients & Scheduling</CardTitle>
              <CardDescription className="text-slate-400">
                Choose who receives the message and when to send it
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="recipients" className="text-slate-300 text-base font-medium">Recipients</Label>
                <Select value={recipientType} onValueChange={setRecipientType}>
                  <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white mt-2 h-12 text-base">
                    <SelectValue placeholder="Select recipients" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Tenants (156)</SelectItem>
                    <SelectItem value="active">Active Tenants Only (142)</SelectItem>
                    <SelectItem value="overdue">Overdue Tenants (8)</SelectItem>
                    <SelectItem value="new">New Tenants (6)</SelectItem>
                    <SelectItem value="specific">Specific Tenant</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="schedule" className="text-slate-300 text-base font-medium">Schedule</Label>
                <Select value={scheduleType} onValueChange={setScheduleType}>
                  <SelectTrigger className="bg-slate-700/50 border-slate-600 text-white mt-2 h-12 text-base">
                    <SelectValue placeholder="When to send" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="now">Send Now</SelectItem>
                    <SelectItem value="schedule">Schedule for Later</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {scheduleType === 'schedule' && (
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="date" className="text-slate-300 text-base font-medium">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      value={scheduledDate}
                      onChange={(e) => setScheduledDate(e.target.value)}
                      className="bg-slate-700/50 border-slate-600 text-white mt-2 h-12 text-base"
                    />
                  </div>
                  <div>
                    <Label htmlFor="time" className="text-slate-300 text-base font-medium">Time</Label>
                    <Input
                      id="time"
                      type="time"
                      value={scheduledTime}
                      onChange={(e) => setScheduledTime(e.target.value)}
                      className="bg-slate-700/50 border-slate-600 text-white mt-2 h-12 text-base"
                    />
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex space-x-4">
            <Button 
              onClick={handleSendMessage}
              className="flex-1 h-14 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-lg font-medium"
            >
              <Send className="w-5 h-5 mr-2" />
              {scheduleType === 'now' ? 'Send Message' : 'Schedule Message'}
            </Button>
            <Button 
              variant="outline" 
              onClick={handleSaveTemplate}
              className="h-14 px-8 border-slate-600 text-slate-300 hover:bg-slate-700 text-lg"
            >
              <Save className="w-5 h-5 mr-2" />
              Save Template
            </Button>
          </div>
        </div>

          {/* Message Preview */}
          {showPreview && (
            <div className="xl:col-span-1">
            <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 sticky top-6">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Eye className="w-5 h-5 mr-2" />
                  Message Preview
                </CardTitle>
                <CardDescription className="text-slate-400">
                  See how your message will appear to tenants
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {selectedChannels.includes('email') && (
                  <div>
                    <div className="flex items-center space-x-2 mb-3">
                      <Mail className="w-4 h-4 text-blue-400" />
                      <span className="text-sm font-medium text-slate-300">Email Preview</span>
                    </div>
                    <div className="bg-white text-black p-4 rounded-lg text-sm shadow-lg">
                      <p className="font-semibold text-base">{messageTitle || 'Message Title'}</p>
                      <p className="mt-2 text-gray-700">{messageBody || 'Your message content will appear here...'}</p>
                    </div>
                  </div>
                )}

                {selectedChannels.includes('sms') && (
                  <div>
                    <div className="flex items-center space-x-2 mb-3">
                      <Smartphone className="w-4 h-4 text-green-400" />
                      <span className="text-sm font-medium text-slate-300">SMS Preview</span>
                    </div>
                    <div className="bg-green-600 text-white p-3 rounded-lg text-sm shadow-lg">
                      <p className="font-medium">{messageBody || 'Your SMS message will appear here...'}</p>
                    </div>
                  </div>
                )}

                {selectedChannels.includes('in-app') && (
                  <div>
                    <div className="flex items-center space-x-2 mb-3">
                      <Bell className="w-4 h-4 text-purple-400" />
                      <span className="text-sm font-medium text-slate-300">In-App Preview</span>
                    </div>
                    <div className="bg-slate-800 border border-slate-600 p-4 rounded-lg text-sm shadow-lg">
                      <div className="flex items-center space-x-2 mb-2">
                        <Bell className="w-4 h-4 text-blue-400" />
                        <span className="font-semibold text-white">{messageTitle || 'Message Title'}</span>
                      </div>
                      <p className="text-slate-300">{messageBody || 'Your in-app notification will appear here...'}</p>
                    </div>
                  </div>
                )}

                {selectedChannels.length === 0 && (
                  <div className="text-center py-8">
                    <Bell className="w-12 h-12 text-slate-500 mx-auto mb-3" />
                    <p className="text-slate-400">Select delivery channels to see previews</p>
                  </div>
                )}
              </CardContent>
            </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
