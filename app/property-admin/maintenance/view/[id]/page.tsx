"use client"

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { 
  ArrowLeft,
  Wrench,
  AlertTriangle,
  Clock,
  CheckCircle,
  XCircle,
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
  Paperclip,
  Edit,
  Calendar,
  Plus,
  Eye
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Textarea } from '@/components/ui/textarea'
import { Progress } from '@/components/ui/progress'
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

// Mock maintenance request data
const mockRequestData = {
  id: 1,
  tenant: 'John Doe',
  unit: 'A101',
  category: 'Plumbing',
  description: 'Kitchen sink is leaking and water is pooling under the cabinet. The leak appears to be coming from the pipe connection under the sink. Water has been dripping for about 2 days now and has started to damage the cabinet base.',
  priority: 'High',
  status: 'In Progress',
  dateReported: '2024-01-15',
  assignedTo: 'Mike Johnson (Plumber)',
  estimatedCost: 15000,
  actualCost: 12000,
  completionDate: null,
  photos: ['leak1.jpg', 'leak2.jpg', 'damage1.jpg'],
  tenantRating: null,
  notes: 'Water damage to cabinet base, needs replacement. Tenant has been very cooperative and provided good access to the area.',
  progress: 65,
  timeline: [
    { date: '2024-01-15', action: 'Request submitted', user: 'John Doe', status: 'completed' },
    { date: '2024-01-15', action: 'Request reviewed', user: 'Property Admin', status: 'completed' },
    { date: '2024-01-16', action: 'Assigned to plumber', user: 'Property Admin', status: 'completed' },
    { date: '2024-01-16', action: 'Work started', user: 'Mike Johnson', status: 'completed' },
    { date: '2024-01-17', action: 'Parts ordered', user: 'Mike Johnson', status: 'completed' },
    { date: '2024-01-18', action: 'Repair in progress', user: 'Mike Johnson', status: 'in-progress' },
    { date: '2024-01-19', action: 'Work completion', user: 'Mike Johnson', status: 'pending' },
    { date: '2024-01-19', action: 'Tenant verification', user: 'John Doe', status: 'pending' }
  ],
  communications: [
    { date: '2024-01-15', user: 'John Doe', message: 'Hi, I have a leak under my kitchen sink. It\'s been going on for 2 days now.', type: 'tenant' },
    { date: '2024-01-15', user: 'Property Admin', message: 'Thank you for reporting this. We\'ll have someone look at it within 24 hours.', type: 'admin' },
    { date: '2024-01-16', user: 'Mike Johnson', message: 'I\'ve assessed the issue. Need to replace the pipe connection and cabinet base. Parts ordered.', type: 'staff' },
    { date: '2024-01-17', user: 'John Doe', message: 'Thanks Mike. Let me know when you need access to the unit.', type: 'tenant' }
  ]
}

export default function ViewMaintenanceRequestPage() {
  const router = useRouter()
  const params = useParams()
  const requestId = params.id
  const [requestData, setRequestData] = useState(mockRequestData)
  const [newMessage, setNewMessage] = useState('')
  const [isAddNoteOpen, setIsAddNoteOpen] = useState(false)

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

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Handle sending message
      setNewMessage('')
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button 
            variant="ghost" 
            onClick={() => router.back()}
            className="text-slate-400 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <div className="flex items-center space-x-2 text-sm text-slate-400 mb-2">
              <span>Dashboard</span>
              <span>/</span>
              <span>Maintenance</span>
              <span>/</span>
              <span className="text-slate-300">View Request</span>
            </div>
            <h1 className="text-3xl font-bold text-blue-400 flex items-center">
              <Wrench className="w-8 h-8 mr-3" />
              Maintenance Request #{requestData.id}
            </h1>
            <p className="text-slate-400 mt-2">Complete maintenance request details and progress tracking</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => router.push(`/property-admin/maintenance/edit/${requestData.id}`)}
          >
            <Edit className="w-4 h-4 mr-2" />
            Edit Request
          </Button>
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
            <Send className="w-4 h-4 mr-2" />
            Send Update
          </Button>
          <Button className="bg-slate-600 hover:bg-slate-700 text-white">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Request Overview */}
      <Card className="bg-slate-800 border-slate-700 border-2 border-blue-500/20 rounded-xl">
        <CardHeader className="pb-4">
          <CardTitle className="text-white text-lg flex items-center">
            <Wrench className="w-5 h-5 mr-2" />
            Request Overview
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-slate-400">Request ID:</span>
                <span className="text-white font-mono">#{requestData.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Tenant:</span>
                <span className="text-white">{requestData.tenant}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Unit:</span>
                <span className="text-white">{requestData.unit}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Category:</span>
                <div className="flex items-center">
                  {getCategoryIcon(requestData.category)}
                  <span className="text-white ml-2">{requestData.category}</span>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-slate-400">Priority:</span>
                {getPriorityBadge(requestData.priority)}
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Status:</span>
                {getStatusBadge(requestData.status)}
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Date Reported:</span>
                <span className="text-white">{new Date(requestData.dateReported).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Assigned To:</span>
                <span className="text-white">{requestData.assignedTo || 'Unassigned'}</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-slate-400">Estimated Cost:</span>
                <span className="text-white">KSh {requestData.estimatedCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Actual Cost:</span>
                <span className="text-white">KSh {requestData.actualCost?.toLocaleString() || 'Pending'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Progress:</span>
                <span className="text-white">{requestData.progress}%</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Completion:</span>
                <span className="text-white">{requestData.completionDate ? new Date(requestData.completionDate).toLocaleDateString() : 'Pending'}</span>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-slate-400">Photos:</span>
                <span className="text-white">{requestData.photos.length} attached</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Rating:</span>
                <div className="flex items-center">
                  {requestData.tenantRating ? (
                    <>
                      {[...Array(5)].map((_, i) => (
                        <Star 
                          key={i} 
                          className={`w-4 h-4 ${i < requestData.tenantRating ? 'text-yellow-400 fill-current' : 'text-slate-400'}`} 
                        />
                      ))}
                      <span className="text-white ml-2">({requestData.tenantRating}/5)</span>
                    </>
                  ) : (
                    <span className="text-slate-400">Not rated</span>
                  )}
                </div>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Days Open:</span>
                <span className="text-white">{Math.ceil((new Date().getTime() - new Date(requestData.dateReported).getTime()) / (1000 * 60 * 60 * 24))} days</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Progress Tracking */}
      <Card className="bg-slate-800 border-slate-700 border-2 border-emerald-500/20 rounded-xl">
        <CardHeader className="pb-4">
          <CardTitle className="text-white text-lg flex items-center">
            <Target className="w-5 h-5 mr-2" />
            Progress Tracking
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Overall Progress</span>
              <span className="text-white font-semibold">{requestData.progress}%</span>
            </div>
            <Progress value={requestData.progress} className="h-3" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="text-white font-medium mb-3">Timeline</h4>
                <div className="space-y-3">
                  {requestData.timeline.map((item, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className={`w-3 h-3 rounded-full mt-2 ${
                        item.status === 'completed' ? 'bg-green-400' : 
                        item.status === 'in-progress' ? 'bg-blue-400' : 'bg-slate-400'
                      }`}></div>
                      <div className="flex-1">
                        <p className="text-white text-sm">{item.action}</p>
                        <p className="text-slate-400 text-xs">{item.user} - {new Date(item.date).toLocaleDateString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-white font-medium mb-3">Next Steps</h4>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Circle className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-300 text-sm">Complete repair work</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Circle className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-300 text-sm">Update status to completed</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Circle className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-300 text-sm">Request tenant verification</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Circle className="w-4 h-4 text-slate-400" />
                    <span className="text-slate-300 text-sm">Close request</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Description & Media */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-800 border-slate-700 border-2 border-purple-500/20 rounded-xl">
          <CardHeader className="pb-4">
            <CardTitle className="text-white text-lg flex items-center">
              <FileText className="w-5 h-5 mr-2" />
              Description & Notes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="text-white font-medium mb-2">Issue Description</h4>
                <p className="text-slate-300 bg-slate-700 rounded-lg p-4 text-sm leading-relaxed">
                  {requestData.description}
                </p>
              </div>
              {requestData.notes && (
                <div>
                  <h4 className="text-white font-medium mb-2">Admin Notes</h4>
                  <p className="text-slate-300 bg-slate-700 rounded-lg p-4 text-sm leading-relaxed">
                    {requestData.notes}
                  </p>
                </div>
              )}
              <Button 
                variant="outline" 
                onClick={() => setIsAddNoteOpen(true)}
                className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Note
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700 border-2 border-cyan-500/20 rounded-xl">
          <CardHeader className="pb-4">
            <CardTitle className="text-white text-lg flex items-center">
              <Camera className="w-5 h-5 mr-2" />
              Attached Media
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              {requestData.photos.map((photo, index) => (
                <div key={index} className="bg-slate-700 rounded-lg p-4 text-center hover:bg-slate-600 transition-colors cursor-pointer">
                  <Image className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                  <p className="text-slate-300 text-sm">{photo}</p>
                  <Button size="sm" variant="ghost" className="text-blue-400 hover:text-blue-300 mt-2">
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Button>
                </div>
              ))}
            </div>
            <Button 
              variant="outline" 
              className="w-full mt-4 bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
            >
              <Upload className="w-4 h-4 mr-2" />
              Add More Photos
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Communication & Cost Tracking */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="bg-slate-800 border-slate-700 border-2 border-orange-500/20 rounded-xl">
          <CardHeader className="pb-4">
            <CardTitle className="text-white text-lg flex items-center">
              <MessageSquare className="w-5 h-5 mr-2" />
              Communication Thread
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4 max-h-80 overflow-y-auto">
              {requestData.communications.map((comm, index) => (
                <div key={index} className={`flex ${comm.type === 'tenant' ? 'justify-start' : 'justify-end'}`}>
                  <div className={`max-w-xs p-3 rounded-lg ${
                    comm.type === 'tenant' ? 'bg-slate-700' : 
                    comm.type === 'admin' ? 'bg-blue-600' : 'bg-green-600'
                  }`}>
                    <p className="text-white text-sm">{comm.message}</p>
                    <p className="text-slate-300 text-xs mt-1">{comm.user} - {new Date(comm.date).toLocaleDateString()}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex space-x-2 mt-4">
              <Input 
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="bg-slate-700 border-slate-600 text-white"
              />
              <Button 
                onClick={handleSendMessage}
                className="bg-blue-600 hover:bg-blue-700 text-white"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700 border-2 border-green-500/20 rounded-xl">
          <CardHeader className="pb-4">
            <CardTitle className="text-white text-lg flex items-center">
              <DollarSign className="w-5 h-5 mr-2" />
              Cost Tracking
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-slate-400">Estimated Cost:</span>
                <span className="text-white font-semibold">KSh {requestData.estimatedCost.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Actual Cost:</span>
                <span className="text-white font-semibold">KSh {requestData.actualCost?.toLocaleString() || 'Pending'}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Variance:</span>
                <span className={`font-semibold ${
                  requestData.actualCost && requestData.actualCost < requestData.estimatedCost 
                    ? 'text-green-400' 
                    : 'text-red-400'
                }`}>
                  {requestData.actualCost ? 
                    `KSh ${(requestData.estimatedCost - requestData.actualCost).toLocaleString()} saved` : 
                    'Pending'
                  }
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Cost Efficiency:</span>
                <span className="text-green-400 font-semibold">Good</span>
              </div>
              <div className="pt-4 border-t border-slate-700">
                <Button 
                  variant="outline" 
                  className="w-full bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
                >
                  <FileText className="w-4 h-4 mr-2" />
                  View Invoice
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Add Note Modal */}
      <Dialog open={isAddNoteOpen} onOpenChange={setIsAddNoteOpen}>
        <DialogContent className="bg-slate-800 border-slate-700 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-white text-xl">Add Note</DialogTitle>
            <DialogDescription className="text-slate-400">
              Add a note to this maintenance request
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-slate-300 text-sm font-medium">Note</label>
              <Textarea 
                className="bg-slate-700 border-slate-600 text-white mt-2" 
                rows={4} 
                placeholder="Enter your note here..." 
              />
            </div>
            <div className="flex justify-end space-x-3">
              <Button 
                variant="outline" 
                onClick={() => setIsAddNoteOpen(false)}
                className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
              >
                Cancel
              </Button>
              <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                Add Note
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
