"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Search, Plus, Eye, Edit, Trash2, Users, MapPin, Calendar, UserPlus } from 'lucide-react'

// Mock data for properties
const propertiesData = [
  {
    id: 1,
    name: 'Sunrise Apartments',
    location: 'Downtown, New York',
    admin: { name: 'Sarah Johnson', avatar: null },
    tenantsCount: 92,
    status: 'Active',
    createdDate: '2024-01-15',
    type: 'Apartment',
    units: 120,
    plan: 'Enterprise'
  },
  {
    id: 2,
    name: 'Oak Manor',
    location: 'Suburbs, Los Angeles',
    admin: { name: 'Mike Wilson', avatar: null },
    tenantsCount: 45,
    status: 'Active',
    createdDate: '2024-01-10',
    type: 'Villa',
    units: 50,
    plan: 'Pro'
  },
  {
    id: 3,
    name: 'Riverside Plaza',
    location: 'Riverside, Chicago',
    admin: { name: 'Emily Davis', avatar: null },
    tenantsCount: 78,
    status: 'Suspended',
    createdDate: '2024-01-05',
    type: 'Commercial',
    units: 85,
    plan: 'Basic'
  },
  {
    id: 4,
    name: 'Garden Heights',
    location: 'Midtown, Miami',
    admin: { name: 'David Brown', avatar: null },
    tenantsCount: 34,
    status: 'Active',
    createdDate: '2024-01-20',
    type: 'Apartment',
    units: 40,
    plan: 'Enterprise'
  },
  {
    id: 5,
    name: 'Metro Tower',
    location: 'Financial District, San Francisco',
    admin: { name: 'Lisa Chen', avatar: null },
    tenantsCount: 156,
    status: 'Active',
    createdDate: '2024-01-25',
    type: 'Commercial',
    units: 200,
    plan: 'Enterprise'
  }
]

const propertyTypes = ['Apartment', 'Villa', 'Commercial', 'Townhouse', 'Studio']
const subscriptionPlans = ['Basic', 'Pro', 'Enterprise']
const statusOptions = ['Active', 'Suspended']
const locations = ['New York', 'Los Angeles', 'Chicago', 'Miami', 'San Francisco']

export default function PropertiesPage() {
  const [searchTerm, setSearchTerm] = useState('')
  const [statusFilter, setStatusFilter] = useState('all')
  const [locationFilter, setLocationFilter] = useState('all')
  const [adminFilter, setAdminFilter] = useState('all')
  const [currentPage, setCurrentPage] = useState(1)
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const getStatusBadge = (status: string) => {
    const colors = {
      'Active': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
      'Suspended': 'bg-red-500/20 text-red-400 border-red-500/30'
    }
    return <Badge className={colors[status as keyof typeof colors]}>{status}</Badge>
  }

  const getPlanBadge = (plan: string) => {
    const colors = {
      'Basic': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
      'Pro': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'Enterprise': 'bg-purple-500/20 text-purple-400 border-purple-500/30'
    }
    return <Badge className={colors[plan as keyof typeof colors]}>{plan}</Badge>
  }

  const resetFilters = () => {
    setSearchTerm('')
    setStatusFilter('all')
    setLocationFilter('all')
    setAdminFilter('all')
  }

  const filteredProperties = propertiesData.filter(property => {
    const matchesSearch = property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = !statusFilter || statusFilter === 'all' || property.status === statusFilter
    const matchesLocation = !locationFilter || locationFilter === 'all' || property.location.includes(locationFilter)
    const matchesAdmin = !adminFilter || adminFilter === 'all' || property.admin.name.toLowerCase().includes(adminFilter.toLowerCase())
    
    return matchesSearch && matchesStatus && matchesLocation && matchesAdmin
  })

  const totalPages = Math.ceil(filteredProperties.length / rowsPerPage)
  const startIndex = (currentPage - 1) * rowsPerPage
  const endIndex = startIndex + rowsPerPage
  const currentProperties = filteredProperties.slice(startIndex, endIndex)

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-blue-400">All Properties</h1>
          <p className="text-slate-400 mt-2">Manage all registered properties across the system</p>
        </div>
        
        <Button 
          onClick={() => window.location.href = '/superadmin/dashboard/properties/add'}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Property
        </Button>
      </div>

      {/* Search and Filter Bar */}
      <Card className="bg-slate-800 border-slate-700 border-2 border-blue-500/20">
        <CardContent className="p-4">
          <div className="flex flex-wrap items-center gap-4">
            <div className="flex-1 min-w-64">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  placeholder="Search by property name or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-slate-700 border-slate-600 text-white"
                />
              </div>
            </div>
            
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-40 bg-slate-700 border-slate-600 text-white">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                <SelectItem value="all" className="text-white">All Status</SelectItem>
                {statusOptions.map(status => (
                  <SelectItem key={status} value={status} className="text-white">{status}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={locationFilter} onValueChange={setLocationFilter}>
              <SelectTrigger className="w-40 bg-slate-700 border-slate-600 text-white">
                <SelectValue placeholder="Location" />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                <SelectItem value="all" className="text-white">All Locations</SelectItem>
                {locations.map(location => (
                  <SelectItem key={location} value={location} className="text-white">{location}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={adminFilter} onValueChange={setAdminFilter}>
              <SelectTrigger className="w-40 bg-slate-700 border-slate-600 text-white">
                <SelectValue placeholder="Admin" />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                <SelectItem value="all" className="text-white">All Admins</SelectItem>
                <SelectItem value="sarah" className="text-white">Sarah Johnson</SelectItem>
                <SelectItem value="mike" className="text-white">Mike Wilson</SelectItem>
                <SelectItem value="emily" className="text-white">Emily Davis</SelectItem>
                <SelectItem value="david" className="text-white">David Brown</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              onClick={resetFilters}
              className="border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              Reset Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Properties Table */}
      <Card className="bg-slate-800 border-slate-700 border-2 border-blue-500/20">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-slate-700/50">
                <tr>
                  <th className="text-left p-4 text-slate-300 font-medium">Property</th>
                  <th className="text-left p-4 text-slate-300 font-medium">Location</th>
                  <th className="text-left p-4 text-slate-300 font-medium">Admin</th>
                  <th className="text-left p-4 text-slate-300 font-medium">Tenants</th>
                  <th className="text-left p-4 text-slate-300 font-medium">Status</th>
                  <th className="text-left p-4 text-slate-300 font-medium">Plan</th>
                  <th className="text-left p-4 text-slate-300 font-medium">Created</th>
                  <th className="text-left p-4 text-slate-300 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {currentProperties.map((property, index) => (
                  <tr key={property.id} className={`border-b border-slate-700 hover:bg-slate-700/30 ${index % 2 === 0 ? 'bg-slate-800/50' : 'bg-slate-800'}`}>
                    <td className="p-4">
                      <div>
                        <div className="font-medium text-white">{property.name}</div>
                        <div className="text-sm text-slate-400">{property.type}</div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center text-slate-300">
                        <MapPin className="w-4 h-4 mr-2" />
                        {property.location}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center">
                        <Avatar className="w-8 h-8 mr-3">
                          <AvatarImage src={property.admin.avatar || ''} />
                          <AvatarFallback className="bg-yellow-500 text-slate-900 text-xs">
                            {property.admin.name.split(' ').map(n => n[0]).join('')}
                          </AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="text-white text-sm">{property.admin.name}</div>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center text-slate-300">
                        <Users className="w-4 h-4 mr-2" />
                        {property.tenantsCount}
                      </div>
                    </td>
                    <td className="p-4">
                      {getStatusBadge(property.status)}
                    </td>
                    <td className="p-4">
                      {getPlanBadge(property.plan)}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center text-slate-300">
                        <Calendar className="w-4 h-4 mr-2" />
                        {property.createdDate}
                      </div>
                    </td>
                    <td className="p-4">
                      <div className="flex items-center space-x-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10"
                          onClick={() => window.location.href = '/superadmin/dashboard/properties/assign-admin'}
                          title="Assign Admin"
                        >
                          <UserPlus className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white hover:bg-slate-700" title="View Details">
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white hover:bg-slate-700" title="Edit Property">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-400 hover:text-red-300 hover:bg-red-500/10" title="Delete Property">
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-slate-400">
          Showing {startIndex + 1}-{Math.min(endIndex, filteredProperties.length)} of {filteredProperties.length} Properties
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-slate-400 text-sm">Rows per page:</span>
            <Select value={rowsPerPage.toString()} onValueChange={(value) => setRowsPerPage(Number(value))}>
              <SelectTrigger className="w-20 bg-slate-700 border-slate-600 text-white">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                <SelectItem value="10" className="text-white">10</SelectItem>
                <SelectItem value="25" className="text-white">25</SelectItem>
                <SelectItem value="50" className="text-white">50</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              Previous
            </Button>
            <span className="text-slate-400 text-sm">
              Page {currentPage} of {totalPages}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
              disabled={currentPage === totalPages}
              className="border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}