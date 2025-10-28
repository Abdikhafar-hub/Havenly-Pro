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
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Calendar,
  Clock,
  Plus,
  Filter,
  Settings,
  DollarSign,
  Wrench,
  Home,
  AlertCircle,
  CheckCircle,
  Bell,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Calendar as CalendarIcon,
  Download,
  Upload,
  RefreshCw
} from 'lucide-react'

export default function CalendarPage() {
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState('calendar')
  const [currentDate, setCurrentDate] = useState(new Date())
  const [selectedDate, setSelectedDate] = useState<Date | null>(null)
  const [newReminderOpen, setNewReminderOpen] = useState(false)
  const [syncSettingsOpen, setSyncSettingsOpen] = useState(false)
  const [filterType, setFilterType] = useState('all')

  // Mock events data
  const events = [
    {
      id: 'EVT-001',
      title: 'Rent Payment Due',
      type: 'rent',
      date: new Date(2024, 1, 1), // February 1, 2024
      time: '12:00 AM',
      description: 'Monthly rent payment of $1,200',
      recurring: true,
      priority: 'high',
      icon: DollarSign,
      color: 'red'
    },
    {
      id: 'EVT-002',
      title: 'Maintenance Inspection',
      type: 'maintenance',
      date: new Date(2024, 1, 5), // February 5, 2024
      time: '10:00 AM',
      description: 'Quarterly maintenance inspection of Unit 101',
      recurring: false,
      priority: 'medium',
      icon: Wrench,
      color: 'blue'
    },
    {
      id: 'EVT-003',
      title: 'Water Bill Due',
      type: 'custom',
      date: new Date(2024, 1, 8), // February 8, 2024
      time: '11:59 PM',
      description: 'Pay water bill - $45.50',
      recurring: true,
      priority: 'medium',
      icon: AlertCircle,
      color: 'yellow'
    },
    {
      id: 'EVT-004',
      title: 'Lease Renewal Meeting',
      type: 'lease',
      date: new Date(2024, 1, 15), // February 15, 2024
      time: '2:00 PM',
      description: 'Meeting with property manager about lease renewal',
      recurring: false,
      priority: 'high',
      icon: Home,
      color: 'purple'
    },
    {
      id: 'EVT-005',
      title: 'AC Maintenance',
      type: 'maintenance',
      date: new Date(2024, 1, 20), // February 20, 2024
      time: '9:00 AM',
      description: 'Scheduled AC unit maintenance',
      recurring: false,
      priority: 'low',
      icon: Wrench,
      color: 'green'
    }
  ]

  // Mock reminders
  const reminders = [
    {
      id: 'REM-001',
      title: 'Pay electricity bill',
      date: new Date(2024, 1, 12),
      time: '6:00 PM',
      description: 'Electricity bill due - approximately $80',
      completed: false,
      priority: 'medium'
    },
    {
      id: 'REM-002',
      title: 'Call maintenance about leak',
      date: new Date(2024, 1, 3),
      time: '10:00 AM',
      description: 'Follow up on kitchen sink leak report',
      completed: true,
      priority: 'high'
    },
    {
      id: 'REM-003',
      title: 'Renew parking permit',
      date: new Date(2024, 1, 25),
      time: '5:00 PM',
      description: 'Parking permit expires end of month',
      completed: false,
      priority: 'low'
    }
  ]

  const getEventsForDate = (date: Date) => {
    return events.filter(event => 
      event.date.toDateString() === date.toDateString()
    )
  }

  const getUpcomingEvents = () => {
    const today = new Date()
    return events
      .filter(event => event.date >= today)
      .sort((a, b) => a.date.getTime() - b.date.getTime())
      .slice(0, 5)
  }

  const getOverdueEvents = () => {
    const today = new Date()
    return events.filter(event => event.date < today)
  }

  const getFilteredEvents = () => {
    if (filterType === 'all') return events
    return events.filter(event => event.type === filterType)
  }

  const getPriorityColor = (priority: string) => {
    const colors = {
      'high': 'text-red-400 bg-red-500/20 border-red-500/30',
      'medium': 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30',
      'low': 'text-green-400 bg-green-500/20 border-green-500/30'
    }
    return colors[priority as keyof typeof colors]
  }

  const getEventTypeColor = (type: string) => {
    const colors = {
      'rent': 'bg-red-500/20 border-red-500/30',
      'maintenance': 'bg-blue-500/20 border-blue-500/30',
      'lease': 'bg-purple-500/20 border-purple-500/30',
      'custom': 'bg-yellow-500/20 border-yellow-500/30'
    }
    return colors[type as keyof typeof colors]
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    })
  }

  const formatTime = (time: string) => {
    return time
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
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Calendar & Reminders</h1>
          <p className="text-slate-400 mt-2">Track important dates and set custom reminders</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button 
            variant="outline" 
            className="border-slate-600 text-slate-300 hover:bg-slate-700"
            onClick={() => setSyncSettingsOpen(true)}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Sync Settings
          </Button>
          <Dialog open={newReminderOpen} onOpenChange={setNewReminderOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Add Reminder
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-slate-800 border-slate-700 max-w-md">
              <DialogHeader>
                <DialogTitle className="text-white text-2xl">Add Custom Reminder</DialogTitle>
                <DialogDescription className="text-slate-400">
                  Set a personal reminder for important tasks
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 mt-4">
                <div>
                  <Label htmlFor="title" className="text-slate-300 mb-2 block">Reminder Title</Label>
                  <Input
                    id="title"
                    placeholder="e.g., Pay water bill"
                    className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400"
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <Label htmlFor="date" className="text-slate-300 mb-2 block">Date</Label>
                    <Input
                      id="date"
                      type="date"
                      className="bg-slate-700/50 border-slate-600 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="time" className="text-slate-300 mb-2 block">Time</Label>
                    <Input
                      id="time"
                      type="time"
                      className="bg-slate-700/50 border-slate-600 text-white"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="description" className="text-slate-300 mb-2 block">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Additional details..."
                    rows={3}
                    className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 resize-none"
                  />
                </div>

                <div>
                  <Label htmlFor="priority" className="text-slate-300 mb-2 block">Priority</Label>
                  <select
                    id="priority"
                    className="w-full bg-slate-700/50 border border-slate-600 text-white rounded-lg px-3 py-2"
                  >
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                  </select>
                </div>

                <div className="flex space-x-3 pt-4">
                  <Button
                    variant="outline"
                    className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700"
                    onClick={() => setNewReminderOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                    onClick={() => {
                      alert('Reminder added successfully!')
                      setNewReminderOpen(false)
                    }}
                  >
                    Add Reminder
                  </Button>
                </div>
              </div>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-red-500/50 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
            <CardTitle className="text-sm font-medium text-slate-300">Upcoming Events</CardTitle>
            <Calendar className="h-4 w-4 text-red-400" />
          </CardHeader>
          <CardContent className="pt-2">
            <div className="text-xl font-bold text-white">{getUpcomingEvents().length}</div>
            <p className="text-xs text-red-400">Next 30 days</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-yellow-500/50 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
            <CardTitle className="text-sm font-medium text-slate-300">Overdue</CardTitle>
            <AlertCircle className="h-4 w-4 text-yellow-400" />
          </CardHeader>
          <CardContent className="pt-2">
            <div className="text-xl font-bold text-white">{getOverdueEvents().length}</div>
            <p className="text-xs text-yellow-400">Need attention</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-blue-500/50 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
            <CardTitle className="text-sm font-medium text-slate-300">Custom Reminders</CardTitle>
            <Bell className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent className="pt-2">
            <div className="text-xl font-bold text-white">{reminders.filter(r => !r.completed).length}</div>
            <p className="text-xs text-blue-400">Active reminders</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-green-500/50 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
            <CardTitle className="text-sm font-medium text-slate-300">Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent className="pt-2">
            <div className="text-xl font-bold text-white">{reminders.filter(r => r.completed).length}</div>
            <p className="text-xs text-green-400">This month</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-1">
          <TabsTrigger value="calendar" className="text-slate-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white">
            Calendar View
          </TabsTrigger>
          <TabsTrigger value="upcoming" className="text-slate-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white">
            Upcoming Events
          </TabsTrigger>
          <TabsTrigger value="reminders" className="text-slate-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white">
            Custom Reminders
          </TabsTrigger>
        </TabsList>

        {/* Calendar View Tab */}
        <TabsContent value="calendar" className="space-y-6">
          <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white">February 2024</CardTitle>
                  <CardDescription className="text-slate-400">Your upcoming events and deadlines</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white">
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white">
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                  <Button variant="ghost" size="sm" className="text-slate-300 hover:text-white">
                    Today
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              {/* Calendar Grid */}
              <div className="grid grid-cols-7 gap-1 mb-4">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                  <div key={day} className="p-2 text-center text-sm font-medium text-slate-400">
                    {day}
                  </div>
                ))}
                {/* Calendar days would go here - simplified for demo */}
                {Array.from({ length: 28 }, (_, i) => {
                  const day = i + 1
                  const dayEvents = events.filter(e => e.date.getDate() === day)
                  return (
                    <div
                      key={day}
                      className={`p-2 min-h-[60px] border border-slate-700/50 rounded-lg cursor-pointer hover:bg-slate-700/30 ${
                        day === new Date().getDate() ? 'bg-blue-500/20 border-blue-500/50' : ''
                      }`}
                    >
                      <div className="text-sm text-white font-medium">{day}</div>
                      <div className="space-y-1 mt-1">
                        {dayEvents.slice(0, 2).map(event => (
                          <div
                            key={event.id}
                            className={`text-xs px-1 py-0.5 rounded ${getEventTypeColor(event.type)} truncate`}
                          >
                            {event.title}
                          </div>
                        ))}
                        {dayEvents.length > 2 && (
                          <div className="text-xs text-slate-400">
                            +{dayEvents.length - 2} more
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Upcoming Events Tab */}
        <TabsContent value="upcoming" className="space-y-6">
          <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white">Upcoming Events</CardTitle>
                  <CardDescription className="text-slate-400">Scheduled events and deadlines</CardDescription>
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
                    <option value="lease">Lease</option>
                    <option value="custom">Custom</option>
                  </select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {getFilteredEvents().map(event => {
                  const Icon = event.icon
                  return (
                    <div
                      key={event.id}
                      className={`p-4 rounded-lg border transition-all ${getEventTypeColor(event.type)}`}
                    >
                      <div className="flex items-start space-x-3">
                        <div className={`w-10 h-10 rounded-full bg-${event.color}-500/20 flex items-center justify-center flex-shrink-0`}>
                          <Icon className={`w-5 h-5 text-${event.color}-400`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between">
                            <div>
                              <h4 className="text-white font-semibold">{event.title}</h4>
                              <p className="text-sm text-slate-400 mt-1">{event.description}</p>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Badge className={getPriorityColor(event.priority)}>
                                {event.priority}
                              </Badge>
                              {event.recurring && (
                                <Badge variant="outline" className="text-xs border-slate-600 text-slate-400">
                                  Recurring
                                </Badge>
                              )}
                            </div>
                          </div>
                          <div className="flex items-center space-x-4 mt-2">
                            <div className="flex items-center space-x-1 text-sm text-slate-400">
                              <CalendarIcon className="w-4 h-4" />
                              <span>{formatDate(event.date)}</span>
                            </div>
                            <div className="flex items-center space-x-1 text-sm text-slate-400">
                              <Clock className="w-4 h-4" />
                              <span>{formatTime(event.time)}</span>
                            </div>
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

        {/* Custom Reminders Tab */}
        <TabsContent value="reminders" className="space-y-6">
          <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Custom Reminders</CardTitle>
              <CardDescription className="text-slate-400">Your personal reminders and tasks</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {reminders.map(reminder => (
                  <div
                    key={reminder.id}
                    className={`p-4 rounded-lg border transition-all ${
                      reminder.completed
                        ? 'bg-green-500/10 border-green-500/30'
                        : 'bg-slate-700/30 border-slate-600/50'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                        reminder.completed
                          ? 'bg-green-500/20'
                          : 'bg-blue-500/20'
                      }`}>
                        {reminder.completed ? (
                          <CheckCircle className="w-5 h-5 text-green-400" />
                        ) : (
                          <Bell className="w-5 h-5 text-blue-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className={`font-semibold ${
                              reminder.completed ? 'text-slate-400 line-through' : 'text-white'
                            }`}>
                              {reminder.title}
                            </h4>
                            <p className="text-sm text-slate-400 mt-1">{reminder.description}</p>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Badge className={getPriorityColor(reminder.priority)}>
                              {reminder.priority}
                            </Badge>
                            {reminder.completed && (
                              <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                                Completed
                              </Badge>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-4 mt-2">
                          <div className="flex items-center space-x-1 text-sm text-slate-400">
                            <CalendarIcon className="w-4 h-4" />
                            <span>{formatDate(reminder.date)}</span>
                          </div>
                          <div className="flex items-center space-x-1 text-sm text-slate-400">
                            <Clock className="w-4 h-4" />
                            <span>{formatTime(reminder.time)}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Sync Settings Dialog */}
      <Dialog open={syncSettingsOpen} onOpenChange={setSyncSettingsOpen}>
        <DialogContent className="bg-slate-800 border-slate-700 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-white text-2xl">Calendar Sync Settings</DialogTitle>
            <DialogDescription className="text-slate-400">
              Connect your calendar with external services
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 mt-4">
            {/* Google Calendar */}
            <div className="p-4 rounded-lg bg-slate-700/30 border border-slate-600/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-500/20 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-blue-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Google Calendar</p>
                    <p className="text-sm text-slate-400">Sync with your Google Calendar</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch defaultChecked={false} className="data-[state=checked]:bg-blue-500" />
                  <Button size="sm" variant="outline" className="border-slate-600 text-slate-300">
                    Connect
                  </Button>
                </div>
              </div>
            </div>

            {/* iCal */}
            <div className="p-4 rounded-lg bg-slate-700/30 border border-slate-600/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-purple-500/20 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-purple-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">iCal / Apple Calendar</p>
                    <p className="text-sm text-slate-400">Import/export calendar events</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch defaultChecked={false} className="data-[state=checked]:bg-purple-500" />
                  <Button size="sm" variant="outline" className="border-slate-600 text-slate-300">
                    <Download className="w-4 h-4 mr-1" />
                    Export
                  </Button>
                </div>
              </div>
            </div>

            {/* Outlook */}
            <div className="p-4 rounded-lg bg-slate-700/30 border border-slate-600/50">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-lg bg-blue-600/20 flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-blue-500" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Microsoft Outlook</p>
                    <p className="text-sm text-slate-400">Sync with Outlook calendar</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch defaultChecked={false} className="data-[state=checked]:bg-blue-600" />
                  <Button size="sm" variant="outline" className="border-slate-600 text-slate-300">
                    Connect
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div className="flex space-x-3 pt-4 border-t border-slate-700">
            <Button
              variant="outline"
              className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700"
              onClick={() => setSyncSettingsOpen(false)}
            >
              Cancel
            </Button>
            <Button
              className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
              onClick={() => {
                alert('Sync settings saved successfully!')
                setSyncSettingsOpen(false)
              }}
            >
              Save Settings
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
