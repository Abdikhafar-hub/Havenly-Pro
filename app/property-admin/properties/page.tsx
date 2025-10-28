"use client"

import { useState } from 'react'
import { 
  Building2, 
  Users, 
  DollarSign,
  AlertCircle,
  Search,
  Filter,
  Plus,
  Edit,
  Eye,
  Trash2,
  MapPin,
  Phone,
  Mail,
  Wifi,
  Car,
  Dumbbell,
  Shield,
  Calendar,
  TrendingUp,
  Home,
  Settings
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts'

// Mock data
const propertyData = {
  name: "Sunrise Apartments",
  location: "123 Main Street, Downtown",
  description: "Modern luxury apartment complex with premium amenities in the heart of downtown.",
  type: "Apartment",
  totalUnits: 45,
  amenities: ["WiFi", "Parking", "Gym", "Security", "Pool", "Laundry"],
  maintenanceContact: {
    name: "John Smith",
    phone: "(555) 123-4567",
    email: "john.smith@sunrise.com"
  }
}

const propertyStats = [
  {
    title: 'Total Units',
    value: '45',
    icon: Building2,
    color: 'text-blue-400',
    bgColor: 'bg-blue-500/10',
    borderColor: 'border-blue-500/30'
  },
  {
    title: 'Occupied Units',
    value: '38',
    icon: Users,
    color: 'text-emerald-400',
    bgColor: 'bg-emerald-500/10',
    borderColor: 'border-emerald-500/30'
  },
  {
    title: 'Vacant Units',
    value: '7',
    icon: Home,
    color: 'text-orange-400',
    bgColor: 'bg-orange-500/10',
    borderColor: 'border-orange-500/30'
  },
  {
    title: 'Monthly Revenue',
    value: '$12,450',
    icon: DollarSign,
    color: 'text-purple-400',
    bgColor: 'bg-purple-500/10',
    borderColor: 'border-purple-500/30'
  },
  {
    title: 'Pending Payments',
    value: '$1,200',
    icon: AlertCircle,
    color: 'text-red-400',
    bgColor: 'bg-red-500/10',
    borderColor: 'border-red-500/30'
  }
]

const unitsData = [
  {
    id: 1,
    unitNumber: '101',
    tenant: 'Sarah Johnson',
    status: 'Occupied',
    rentAmount: 1200,
    dueDate: '2024-02-01',
    type: '1BR'
  },
  {
    id: 2,
    unitNumber: '102',
    tenant: 'Mike Wilson',
    status: 'Occupied',
    rentAmount: 1200,
    dueDate: '2024-02-01',
    type: '1BR'
  },
  {
    id: 3,
    unitNumber: '103',
    tenant: null,
    status: 'Vacant',
    rentAmount: 1200,
    dueDate: null,
    type: '1BR'
  },
  {
    id: 4,
    unitNumber: '201',
    tenant: 'Emily Davis',
    status: 'Occupied',
    rentAmount: 1500,
    dueDate: '2024-02-01',
    type: '2BR'
  },
  {
    id: 5,
    unitNumber: '202',
    tenant: null,
    status: 'Maintenance',
    rentAmount: 1200,
    dueDate: null,
    type: '1BR'
  },
  {
    id: 6,
    unitNumber: '301',
    tenant: 'Lisa Brown',
    status: 'Occupied',
    rentAmount: 1800,
    dueDate: '2024-02-01',
    type: '3BR'
  }
]

const occupancyTrendData = [
  { month: 'Jan', occupancy: 85 },
  { month: 'Feb', occupancy: 88 },
  { month: 'Mar', occupancy: 92 },
  { month: 'Apr', occupancy: 89 },
  { month: 'May', occupancy: 94 },
  { month: 'Jun', occupancy: 96 }
]

const unitStatusData = [
  { name: 'Occupied', value: 38, color: '#10B981' },
  { name: 'Vacant', value: 5, color: '#F59E0B' },
  { name: 'Maintenance', value: 2, color: '#EF4444' }
]

const getStatusBadge = (status: string) => {
  switch (status) {
    case 'Occupied':
      return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Occupied</Badge>
    case 'Vacant':
      return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Vacant</Badge>
    case 'Maintenance':
      return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Maintenance</Badge>
    default:
      return <Badge variant="secondary">{status}</Badge>
  }
}

export default function PropertiesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [isAddUnitOpen, setIsAddUnitOpen] = useState(false)
  const [isEditPropertyOpen, setIsEditPropertyOpen] = useState(false)
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false)
  const [selectedUnit, setSelectedUnit] = useState(null)

  const filteredUnits = unitsData.filter(unit => {
    const matchesSearch = unit.unitNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (unit.tenant && unit.tenant.toLowerCase().includes(searchTerm.toLowerCase()))
    const matchesStatus = statusFilter === 'all' || unit.status.toLowerCase() === statusFilter.toLowerCase()
    return matchesSearch && matchesStatus
  })

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center space-x-2 text-sm text-slate-400 mb-2">
            <span>Dashboard</span>
            <span>/</span>
            <span className="text-slate-300">Properties</span>
          </div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">My Property Overview</h1>
        </div>
        <Button 
          onClick={() => setIsEditPropertyOpen(true)}
          className="bg-slate-700 hover:bg-slate-600 text-white"
        >
          <Edit className="w-4 h-4 mr-2" />
          Edit Property Details
        </Button>
      </div>

      {/* Property Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        {propertyStats.map((stat, index) => {
          const Icon = stat.icon
          return (
            <div key={index} className={`bg-slate-800 border-l-4 ${stat.borderColor} rounded-lg p-4 hover:bg-slate-750 transition-all duration-300`}>
              <div className="flex items-center justify-between mb-2">
                <div className={`p-2 rounded-lg ${stat.bgColor}`}>
                  <Icon className={`w-4 h-4 ${stat.color}`} />
                </div>
              </div>
              <div>
                <p className="text-2xl font-bold text-white mb-1">{stat.value}</p>
                <p className="text-xs font-medium text-slate-400">{stat.title}</p>
              </div>
            </div>
          )
        })}
      </div>

      {/* Property Details Section */}
      <Card className="bg-slate-800 border-slate-700 border-2 border-blue-500/20 rounded-xl">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg font-bold text-blue-400 flex items-center">
            <Building2 className="w-5 h-5 mr-2" />
            Property Details
          </CardTitle>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold text-white mb-2">{propertyData.name}</h3>
                <div className="flex items-center text-slate-400 mb-2">
                  <MapPin className="w-4 h-4 mr-2" />
                  <span className="text-sm">{propertyData.location}</span>
                </div>
                <p className="text-sm text-slate-400 mb-4">{propertyData.description}</p>
              </div>
              
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-sm text-slate-400">Property Type:</span>
                  <span className="text-sm text-white">{propertyData.type}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm text-slate-400">Total Units:</span>
                  <span className="text-sm text-white">{propertyData.totalUnits}</span>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="text-sm font-semibold text-slate-300 mb-2">Amenities</h4>
                <div className="flex flex-wrap gap-2">
                  {propertyData.amenities.map((amenity, index) => (
                    <Badge key={index} className="bg-slate-700 text-slate-300 border-slate-600">
                      {amenity}
                    </Badge>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-sm font-semibold text-slate-300 mb-2">Maintenance Contact</h4>
                <div className="bg-slate-700/30 rounded-lg p-3">
                  <p className="text-sm font-medium text-white">{propertyData.maintenanceContact.name}</p>
                  <div className="flex items-center text-xs text-slate-400 mt-1">
                    <Phone className="w-3 h-3 mr-1" />
                    <span>{propertyData.maintenanceContact.phone}</span>
                  </div>
                  <div className="flex items-center text-xs text-slate-400">
                    <Mail className="w-3 h-3 mr-1" />
                    <span>{propertyData.maintenanceContact.email}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Units Management */}
      <Card className="bg-slate-800 border-slate-700 border-2 border-emerald-500/20 rounded-xl">
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <CardTitle className="text-lg font-bold text-emerald-400 flex items-center">
              <Home className="w-5 h-5 mr-2" />
              Units Management
            </CardTitle>
            <Dialog open={isAddUnitOpen} onOpenChange={setIsAddUnitOpen}>
              <DialogTrigger asChild>
                <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                  <Plus className="w-4 h-4 mr-2" />
                  Add Unit
                </Button>
              </DialogTrigger>
              <DialogContent className="bg-slate-800 border-slate-700">
                <DialogHeader>
                  <DialogTitle className="text-white">Add New Unit</DialogTitle>
                  <DialogDescription className="text-slate-400">
                    Create a new unit in your property.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label className="text-slate-300">Unit Number</Label>
                    <Input className="bg-slate-700 border-slate-600 text-white" placeholder="e.g., 101" />
                  </div>
                  <div>
                    <Label className="text-slate-300">Rent Amount</Label>
                    <Input className="bg-slate-700 border-slate-600 text-white" placeholder="1200" />
                  </div>
                  <div>
                    <Label className="text-slate-300">Unit Type</Label>
                    <Select>
                      <SelectTrigger className="bg-slate-700 border-slate-600">
                        <SelectValue placeholder="Select unit type" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-700 border-slate-600">
                        <SelectItem value="1br">1 Bedroom</SelectItem>
                        <SelectItem value="2br">2 Bedroom</SelectItem>
                        <SelectItem value="3br">3 Bedroom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-slate-300">Status</Label>
                    <Select>
                      <SelectTrigger className="bg-slate-700 border-slate-600">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-700 border-slate-600">
                        <SelectItem value="vacant">Vacant</SelectItem>
                        <SelectItem value="occupied">Occupied</SelectItem>
                        <SelectItem value="maintenance">Maintenance</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setIsAddUnitOpen(false)} className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600">
                    Cancel
                  </Button>
                  <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
                    Add Unit
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          {/* Search and Filter Controls */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <Input
                placeholder="Search by unit number or tenant..."
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
                <SelectItem value="occupied">Occupied</SelectItem>
                <SelectItem value="vacant">Vacant</SelectItem>
                <SelectItem value="maintenance">Maintenance</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Units Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left text-sm font-medium text-slate-400 py-3">Unit</th>
                  <th className="text-left text-sm font-medium text-slate-400 py-3">Tenant</th>
                  <th className="text-left text-sm font-medium text-slate-400 py-3">Status</th>
                  <th className="text-left text-sm font-medium text-slate-400 py-3">Rent</th>
                  <th className="text-left text-sm font-medium text-slate-400 py-3">Due Date</th>
                  <th className="text-left text-sm font-medium text-slate-400 py-3">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUnits.map((unit) => (
                  <tr key={unit.id} className="border-b border-slate-700/50 hover:bg-slate-700/30">
                    <td className="py-3">
                      <div>
                        <span className="text-white font-medium">{unit.unitNumber}</span>
                        <span className="text-xs text-slate-400 ml-2">({unit.type})</span>
                      </div>
                    </td>
                    <td className="py-3">
                      <span className="text-slate-300">{unit.tenant || 'No tenant'}</span>
                    </td>
                    <td className="py-3">
                      {getStatusBadge(unit.status)}
                    </td>
                    <td className="py-3">
                      <span className="text-white font-medium">${unit.rentAmount}</span>
                    </td>
                    <td className="py-3">
                      <span className="text-slate-300">
                        {unit.dueDate ? new Date(unit.dueDate).toLocaleDateString() : 'N/A'}
                      </span>
                    </td>
                    <td className="py-3">
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" className="text-red-400 hover:text-red-300">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredUnits.length === 0 && (
            <div className="text-center py-8">
              <Home className="w-12 h-12 text-slate-500 mx-auto mb-4" />
              <p className="text-slate-400">No units found matching your criteria.</p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Property Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Occupancy Trend */}
        <Card className="bg-slate-800 border-slate-700 border-2 border-purple-500/20 rounded-xl">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-bold text-purple-400 flex items-center">
              <TrendingUp className="w-5 h-5 mr-2" />
              Occupancy Trend
            </CardTitle>
            <p className="text-sm text-slate-400">Monthly occupancy rate over time</p>
          </CardHeader>
          <CardContent className="pt-0">
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={occupancyTrendData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#4b5563" strokeOpacity={0.6} />
                <XAxis 
                  dataKey="month" 
                  tick={{ fontSize: 12, fill: '#9ca3af' }}
                  axisLine={true}
                  tickLine={true}
                  tickMargin={8}
                  stroke="#6b7280"
                />
                <YAxis 
                  tick={{ fontSize: 12, fill: '#9ca3af' }}
                  axisLine={true}
                  tickLine={true}
                  tickMargin={8}
                  stroke="#6b7280"
                  tickFormatter={(value) => `${value}%`}
                />
                <Tooltip 
                  formatter={(value) => [`${value}%`, 'Occupancy']}
                  labelStyle={{ color: '#f9fafb', fontSize: '12px', fontWeight: '500' }}
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3)',
                    fontSize: '12px',
                    padding: '8px 12px'
                  }}
                />
                <Line 
                  type="monotone" 
                  dataKey="occupancy" 
                  stroke="#8B5CF6" 
                  strokeWidth={3}
                  dot={{ fill: '#8B5CF6', strokeWidth: 0, r: 5 }}
                  activeDot={{ r: 7, stroke: '#8B5CF6', strokeWidth: 3, fill: '#1f2937' }}
                  connectNulls={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Unit Status Distribution */}
        <Card className="bg-slate-800 border-slate-700 border-2 border-orange-500/20 rounded-xl">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg font-bold text-orange-400 flex items-center">
              <Settings className="w-5 h-5 mr-2" />
              Unit Status Distribution
            </CardTitle>
            <p className="text-sm text-slate-400">Current distribution of unit statuses</p>
          </CardHeader>
          <CardContent className="pt-0">
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={unitStatusData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {unitStatusData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip 
                  formatter={(value) => [`${value}`, 'Units']}
                  labelStyle={{ color: '#f9fafb', fontSize: '12px' }}
                  contentStyle={{ 
                    backgroundColor: '#1f2937', 
                    border: '1px solid #374151',
                    borderRadius: '8px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.3)',
                    fontSize: '12px'
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="flex justify-center space-x-6 mt-4">
              {unitStatusData.map((item, index) => (
                <div key={index} className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2" 
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-slate-400">{item.name}: {item.value}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

