"use client"

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { 
  Package, 
  Search, 
  Plus, 
  Filter, 
  Download, 
  Eye, 
  Edit, 
  Trash2, 
  QrCode,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  BarChart3,
  PieChart,
  Calendar,
  DollarSign,
  Wrench,
  Shield,
  Home,
  Smartphone,
  Monitor,
  Sofa,
  Refrigerator,
  WashingMachine,
  Tv,
  Microwave,
  AirVent,
  Lightbulb,
  Camera,
  Printer,
  Router,
  HardDrive,
  Settings,
  FileText,
  ArrowUpDown,
  MoreHorizontal
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Progress } from '@/components/ui/progress'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { 
  LineChart as RechartsLineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  BarChart,
  Bar
} from 'recharts'
import { ExportDialog } from '@/components/ui/export-dialog'

// Mock data for demonstration
const inventoryData = [
  {
    id: '1',
    name: 'Samsung 55" Smart TV',
    category: 'Electronics',
    condition: 'Excellent',
    location: 'Unit 101 - Living Room',
    purchaseDate: '2023-01-15',
    purchasePrice: 899.99,
    warrantyExpiry: '2026-01-15',
    status: 'Active',
    lastMaintenance: '2024-01-10',
    nextMaintenance: '2024-07-10',
    qrCode: 'QR001',
    supplier: 'Best Buy',
    serialNumber: 'SN-TV-001',
    notes: 'Wall mounted, includes remote'
  },
  {
    id: '2',
    name: 'Whirlpool Refrigerator',
    category: 'Appliances',
    condition: 'Good',
    location: 'Unit 101 - Kitchen',
    purchaseDate: '2022-06-20',
    purchasePrice: 1299.99,
    warrantyExpiry: '2025-06-20',
    status: 'Active',
    lastMaintenance: '2024-01-05',
    nextMaintenance: '2024-07-05',
    qrCode: 'QR002',
    supplier: 'Home Depot',
    serialNumber: 'SN-FRIDGE-001',
    notes: 'Energy efficient model'
  },
  {
    id: '3',
    name: 'IKEA Sofa Set',
    category: 'Furniture',
    condition: 'Fair',
    location: 'Unit 102 - Living Room',
    purchaseDate: '2021-03-10',
    purchasePrice: 599.99,
    warrantyExpiry: '2024-03-10',
    status: 'Needs Repair',
    lastMaintenance: '2023-12-15',
    nextMaintenance: '2024-06-15',
    qrCode: 'QR003',
    supplier: 'IKEA',
    serialNumber: 'SN-SOFA-001',
    notes: 'Fabric showing wear, needs reupholstering'
  },
  {
    id: '4',
    name: 'Security Camera System',
    category: 'Security',
    condition: 'Excellent',
    location: 'Building Entrance',
    purchaseDate: '2023-08-15',
    purchasePrice: 299.99,
    warrantyExpiry: '2026-08-15',
    status: 'Active',
    lastMaintenance: '2024-01-12',
    nextMaintenance: '2024-07-12',
    qrCode: 'QR004',
    supplier: 'Amazon',
    serialNumber: 'SN-CAM-001',
    notes: '4K resolution, night vision'
  },
  {
    id: '5',
    name: 'LG Washing Machine',
    category: 'Appliances',
    condition: 'Good',
    location: 'Unit 103 - Laundry',
    purchaseDate: '2022-11-30',
    purchasePrice: 799.99,
    warrantyExpiry: '2025-11-30',
    status: 'Active',
    lastMaintenance: '2024-01-08',
    nextMaintenance: '2024-07-08',
    qrCode: 'QR005',
    supplier: 'Lowes',
    serialNumber: 'SN-WASH-001',
    notes: 'Front load, energy star rated'
  }
]

const categoryData = [
  { name: 'Electronics', value: 25, color: '#3B82F6' },
  { name: 'Appliances', value: 30, color: '#10B981' },
  { name: 'Furniture', value: 20, color: '#F59E0B' },
  { name: 'Security', value: 15, color: '#EF4444' },
  { name: 'Other', value: 10, color: '#8B5CF6' },
]

const conditionData = [
  { name: 'Excellent', value: 40, color: '#10B981' },
  { name: 'Good', value: 35, color: '#3B82F6' },
  { name: 'Fair', value: 20, color: '#F59E0B' },
  { name: 'Poor', value: 5, color: '#EF4444' },
]

const maintenanceData = [
  { month: 'Jan', completed: 8, scheduled: 12 },
  { month: 'Feb', completed: 6, scheduled: 10 },
  { month: 'Mar', completed: 10, scheduled: 15 },
  { month: 'Apr', completed: 7, scheduled: 11 },
  { month: 'May', completed: 9, scheduled: 13 },
  { month: 'Jun', completed: 12, scheduled: 16 },
]

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'Electronics': return <Tv className="w-4 h-4" />
    case 'Appliances': return <Refrigerator className="w-4 h-4" />
    case 'Furniture': return <Sofa className="w-4 h-4" />
    case 'Security': return <Shield className="w-4 h-4" />
    default: return <Package className="w-4 h-4" />
  }
}

const getConditionColor = (condition: string) => {
  switch (condition) {
    case 'Excellent': return 'text-green-400 bg-green-500/20'
    case 'Good': return 'text-blue-400 bg-blue-500/20'
    case 'Fair': return 'text-yellow-400 bg-yellow-500/20'
    case 'Poor': return 'text-red-400 bg-red-500/20'
    default: return 'text-gray-400 bg-gray-500/20'
  }
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Active': return 'text-green-400 bg-green-500/20'
    case 'Needs Repair': return 'text-red-400 bg-red-500/20'
    case 'In Maintenance': return 'text-yellow-400 bg-yellow-500/20'
    default: return 'text-gray-400 bg-gray-500/20'
  }
}

export default function InventoryManagement() {
  const [mounted, setMounted] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [selectedCondition, setSelectedCondition] = useState('all')
  const [sortBy, setSortBy] = useState('name')

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const filteredData = inventoryData.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.serialNumber.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory
    const matchesCondition = selectedCondition === 'all' || item.condition === selectedCondition
    return matchesSearch && matchesCategory && matchesCondition
  })

  const totalAssets = inventoryData.length
  const activeAssets = inventoryData.filter(item => item.status === 'Active').length
  const inRepairAssets = inventoryData.filter(item => item.status === 'Needs Repair').length
  const expiredWarranty = inventoryData.filter(item => new Date(item.warrantyExpiry) < new Date()).length
  const totalValue = inventoryData.reduce((sum, item) => sum + item.purchasePrice, 0)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Inventory & Assets Management</h1>
          <p className="text-slate-400 mt-2">Track and manage all physical assets across your property.</p>
        </div>
        <div className="flex items-center space-x-3">
          <Link href="/property-admin/inventory/add">
            <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">
              <Plus className="w-4 h-4 mr-2" />
              Add Asset
            </Button>
          </Link>
          <ExportDialog data={inventoryData} />
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
        <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 hover:border-blue-500/50 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-0 pt-2 px-4">
            <CardTitle className="text-xs font-medium text-slate-300">Total Assets</CardTitle>
            <Package className="h-3 w-3 text-blue-400" />
          </CardHeader>
          <CardContent className="pt-1 pb-2 px-4">
            <div className="text-lg font-bold text-white">{totalAssets}</div>
            <p className="text-xs text-slate-400">Items tracked</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 hover:border-green-500/50 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-0 pt-2 px-4">
            <CardTitle className="text-xs font-medium text-slate-300">Active Assets</CardTitle>
            <CheckCircle className="h-3 w-3 text-green-400" />
          </CardHeader>
          <CardContent className="pt-1 pb-2 px-4">
            <div className="text-lg font-bold text-white">{activeAssets}</div>
            <p className="text-xs text-green-400">{Math.round((activeAssets/totalAssets)*100)}% of total</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 hover:border-red-500/50 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-0 pt-2 px-4">
            <CardTitle className="text-xs font-medium text-slate-300">In Repair</CardTitle>
            <Wrench className="h-3 w-3 text-red-400" />
          </CardHeader>
          <CardContent className="pt-1 pb-2 px-4">
            <div className="text-lg font-bold text-white">{inRepairAssets}</div>
            <p className="text-xs text-red-400">Needs attention</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 hover:border-yellow-500/50 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-0 pt-2 px-4">
            <CardTitle className="text-xs font-medium text-slate-300">Expired Warranty</CardTitle>
            <AlertTriangle className="h-3 w-3 text-yellow-400" />
          </CardHeader>
          <CardContent className="pt-1 pb-2 px-4">
            <div className="text-lg font-bold text-white">{expiredWarranty}</div>
            <p className="text-xs text-yellow-400">Warranty expired</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700 hover:border-purple-500/50 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-0 pt-2 px-4">
            <CardTitle className="text-xs font-medium text-slate-300">Total Value</CardTitle>
            <DollarSign className="h-3 w-3 text-purple-400" />
          </CardHeader>
          <CardContent className="pt-1 pb-2 px-4">
            <div className="text-lg font-bold text-white">${totalValue.toLocaleString()}</div>
            <p className="text-xs text-slate-400">Asset value</p>
          </CardContent>
        </Card>
      </div>

      {/* Analytics Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Distribution */}
        <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <PieChart className="w-5 h-5 mr-2 text-blue-400" />
              Asset Categories
            </CardTitle>
            <CardDescription className="text-slate-400">
              Distribution of assets by category
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
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
                </RechartsPieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap justify-center gap-4 mt-4">
              {categoryData.map((item) => (
                <div key={item.name} className="flex items-center">
                  <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: item.color }}></div>
                  <span className="text-sm text-slate-300">{item.name} ({item.value}%)</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Condition Distribution */}
        <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center">
              <BarChart3 className="w-5 h-5 mr-2 text-green-400" />
              Asset Condition
            </CardTitle>
            <CardDescription className="text-slate-400">
              Current condition of all assets
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={conditionData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                  <XAxis dataKey="name" stroke="#9CA3AF" />
                  <YAxis stroke="#9CA3AF" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: '#1F2937', 
                      border: '1px solid #374151',
                      borderRadius: '8px',
                      color: '#F9FAFB'
                    }} 
                  />
                  <Bar dataKey="value" fill="#3B82F6" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
        <CardHeader>
          <CardTitle className="text-white">Asset Inventory</CardTitle>
          <CardDescription className="text-slate-400">
            Search and filter your asset inventory
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <Input
                  placeholder="Search assets by name, location, or serial number..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-slate-700 border-slate-600 text-white placeholder-slate-400"
                />
              </div>
            </div>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-full sm:w-48 bg-slate-700 border-slate-600 text-white">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Electronics">Electronics</SelectItem>
                <SelectItem value="Appliances">Appliances</SelectItem>
                <SelectItem value="Furniture">Furniture</SelectItem>
                <SelectItem value="Security">Security</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedCondition} onValueChange={setSelectedCondition}>
              <SelectTrigger className="w-full sm:w-48 bg-slate-700 border-slate-600 text-white">
                <SelectValue placeholder="Condition" />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                <SelectItem value="all">All Conditions</SelectItem>
                <SelectItem value="Excellent">Excellent</SelectItem>
                <SelectItem value="Good">Good</SelectItem>
                <SelectItem value="Fair">Fair</SelectItem>
                <SelectItem value="Poor">Poor</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
              <Filter className="w-4 h-4 mr-2" />
              More Filters
            </Button>
          </div>

          {/* Assets Table */}
          <div className="rounded-lg border border-slate-600 overflow-hidden">
            <Table>
              <TableHeader className="bg-slate-700/50">
                <TableRow>
                  <TableHead className="text-slate-300">Asset</TableHead>
                  <TableHead className="text-slate-300">Category</TableHead>
                  <TableHead className="text-slate-300">Location</TableHead>
                  <TableHead className="text-slate-300">Condition</TableHead>
                  <TableHead className="text-slate-300">Status</TableHead>
                  <TableHead className="text-slate-300">Warranty</TableHead>
                  <TableHead className="text-slate-300">Value</TableHead>
                  <TableHead className="text-slate-300">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredData.map((asset) => (
                  <TableRow key={asset.id} className="hover:bg-slate-700/50">
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        {getCategoryIcon(asset.category)}
                        <div>
                          <div className="font-medium text-white">{asset.name}</div>
                          <div className="text-sm text-slate-400">{asset.serialNumber}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="secondary" className="bg-slate-600 text-slate-300">
                        {asset.category}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-slate-300">{asset.location}</TableCell>
                    <TableCell>
                      <Badge className={getConditionColor(asset.condition)}>
                        {asset.condition}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusColor(asset.status)}>
                        {asset.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-slate-300">
                        {new Date(asset.warrantyExpiry).toLocaleDateString()}
                      </div>
                      {new Date(asset.warrantyExpiry) < new Date() && (
                        <Badge variant="destructive" className="text-xs">
                          Expired
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-slate-300">
                      ${asset.purchasePrice.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="bg-slate-700 border-slate-600">
                          <DropdownMenuLabel className="text-slate-300">Actions</DropdownMenuLabel>
                          <Link href={`/property-admin/inventory/view/${asset.id}`}>
                            <DropdownMenuItem className="text-slate-300 hover:bg-slate-600 cursor-pointer">
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                          </Link>
                          <Link href={`/property-admin/inventory/edit/${asset.id}`}>
                            <DropdownMenuItem className="text-slate-300 hover:bg-slate-600 cursor-pointer">
                              <Edit className="mr-2 h-4 w-4" />
                              Edit Asset
                            </DropdownMenuItem>
                          </Link>
                          <DropdownMenuItem className="text-slate-300 hover:bg-slate-600">
                            <QrCode className="mr-2 h-4 w-4" />
                            Generate QR Code
                          </DropdownMenuItem>
                          <DropdownMenuSeparator className="bg-slate-600" />
                          <DropdownMenuItem className="text-red-400 hover:bg-slate-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Asset
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
