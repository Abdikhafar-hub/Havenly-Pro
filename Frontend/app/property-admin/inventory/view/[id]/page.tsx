"use client"

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  ArrowLeft,
  Edit,
  QrCode,
  Download,
  Calendar,
  DollarSign,
  MapPin,
  Shield,
  Wrench,
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText,
  Camera,
  Printer,
  Share2,
  Trash2,
  Plus,
  History,
  TrendingUp,
  Package,
  Home,
  Tv,
  Refrigerator,
  Sofa,
  Shield as SecurityIcon
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { 
  LineChart as RechartsLineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer
} from 'recharts'
import { QRCode } from '@/components/ui/qr-code'

// Mock data for demonstration
const assetData = {
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
  modelNumber: 'UN55TU8000FXZA',
  notes: 'Wall mounted, includes remote control and mounting hardware. Connected to building WiFi.',
  images: [
    '/api/placeholder/400/300',
    '/api/placeholder/400/300',
    '/api/placeholder/400/300'
  ],
  maintenanceHistory: [
    {
      id: 1,
      date: '2024-01-10',
      type: 'Routine Maintenance',
      description: 'Cleaned screen, checked connections, updated firmware',
      technician: 'John Smith',
      cost: 0,
      status: 'Completed'
    },
    {
      id: 2,
      date: '2023-12-15',
      type: 'Repair',
      description: 'Fixed HDMI port issue, replaced cable',
      technician: 'Mike Johnson',
      cost: 45.00,
      status: 'Completed'
    },
    {
      id: 3,
      date: '2023-08-20',
      type: 'Installation',
      description: 'Initial setup and wall mounting',
      technician: 'Sarah Wilson',
      cost: 150.00,
      status: 'Completed'
    }
  ],
  valueHistory: [
    { date: '2023-01-15', value: 899.99 },
    { date: '2023-06-15', value: 849.99 },
    { date: '2023-12-15', value: 799.99 },
    { date: '2024-01-15', value: 749.99 }
  ]
}

const getCategoryIcon = (category: string) => {
  switch (category) {
    case 'Electronics': return <Tv className="w-6 h-6" />
    case 'Appliances': return <Refrigerator className="w-6 h-6" />
    case 'Furniture': return <Sofa className="w-6 h-6" />
    case 'Security': return <SecurityIcon className="w-6 h-6" />
    default: return <Package className="w-6 h-6" />
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

export default function AssetDetailPage() {
  const params = useParams()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [showQRCode, setShowQRCode] = useState(false)
  const [showAddMaintenance, setShowAddMaintenance] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const asset = assetData
  const warrantyExpired = new Date(asset.warrantyExpiry) < new Date()
  const warrantyExpiringSoon = new Date(asset.warrantyExpiry) < new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button 
            variant="outline" 
            onClick={() => router.back()}
            className="border-slate-600 text-slate-300 hover:bg-slate-700"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-white">{asset.name}</h1>
            <p className="text-slate-400 mt-2">Asset ID: {asset.id} • Serial: {asset.serialNumber}</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Button 
            variant="outline" 
            className="border-slate-600 text-slate-300 hover:bg-slate-700"
            onClick={() => setShowQRCode(true)}
          >
            <QrCode className="w-4 h-4 mr-2" />
            QR Code
          </Button>
          <Link href={`/property-admin/inventory/edit/${asset.id}`}>
            <Button 
              variant="outline" 
              className="border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              <Edit className="w-4 h-4 mr-2" />
              Edit Asset
            </Button>
          </Link>
          <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">
            <Plus className="w-4 h-4 mr-2" />
            Add Maintenance
          </Button>
        </div>
      </div>

      {/* Asset Overview */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Asset Info */}
        <div className="lg:col-span-2">
          <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  {getCategoryIcon(asset.category)}
                  <div>
                    <CardTitle className="text-white">{asset.name}</CardTitle>
                    <CardDescription className="text-slate-400">
                      {asset.category} • {asset.modelNumber}
                    </CardDescription>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Badge className={getConditionColor(asset.condition)}>
                    {asset.condition}
                  </Badge>
                  <Badge className={getStatusColor(asset.status)}>
                    {asset.status}
                  </Badge>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Asset Images */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Asset Photos</h3>
                <div className="grid grid-cols-3 gap-4">
                  {asset.images.map((image, index) => (
                    <div key={index} className="relative group">
                      <img 
                        src={image} 
                        alt={`Asset photo ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg border border-slate-600"
                      />
                      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                        <Button size="sm" variant="secondary">
                          <Camera className="w-4 h-4 mr-2" />
                          View
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Asset Details */}
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-4 h-4 text-slate-400" />
                    <div>
                      <p className="text-sm text-slate-400">Location</p>
                      <p className="text-white">{asset.location}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Calendar className="w-4 h-4 text-slate-400" />
                    <div>
                      <p className="text-sm text-slate-400">Purchase Date</p>
                      <p className="text-white">{new Date(asset.purchaseDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <DollarSign className="w-4 h-4 text-slate-400" />
                    <div>
                      <p className="text-sm text-slate-400">Purchase Price</p>
                      <p className="text-white">${asset.purchasePrice.toLocaleString()}</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Shield className="w-4 h-4 text-slate-400" />
                    <div>
                      <p className="text-sm text-slate-400">Warranty Expiry</p>
                      <p className={`${warrantyExpired ? 'text-red-400' : warrantyExpiringSoon ? 'text-yellow-400' : 'text-white'}`}>
                        {new Date(asset.warrantyExpiry).toLocaleDateString()}
                        {warrantyExpired && <span className="ml-2 text-xs">(Expired)</span>}
                        {warrantyExpiringSoon && !warrantyExpired && <span className="ml-2 text-xs">(Expiring Soon)</span>}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Wrench className="w-4 h-4 text-slate-400" />
                    <div>
                      <p className="text-sm text-slate-400">Last Maintenance</p>
                      <p className="text-white">{new Date(asset.lastMaintenance).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Clock className="w-4 h-4 text-slate-400" />
                    <div>
                      <p className="text-sm text-slate-400">Next Maintenance</p>
                      <p className="text-white">{new Date(asset.nextMaintenance).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Notes */}
              <div>
                <h3 className="text-lg font-semibold text-white mb-3">Notes</h3>
                <p className="text-slate-300 bg-slate-700/50 p-4 rounded-lg">
                  {asset.notes}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Quick Stats */}
        <div className="space-y-6">
          <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Quick Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Current Value</span>
                <span className="text-white font-semibold">$749.99</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Depreciation</span>
                <span className="text-red-400">-16.7%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Maintenance Cost</span>
                <span className="text-white font-semibold">$195.00</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Days Since Purchase</span>
                <span className="text-white font-semibold">365</span>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Warranty Status</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Warranty Active</span>
                  <Badge className={warrantyExpired ? 'bg-red-500/20 text-red-400' : 'bg-green-500/20 text-green-400'}>
                    {warrantyExpired ? 'Expired' : 'Active'}
                  </Badge>
                </div>
                <Progress 
                  value={warrantyExpired ? 100 : 60} 
                  className="w-full"
                />
                <p className="text-sm text-slate-400">
                  {warrantyExpired ? 'Warranty has expired' : 'Warranty expires in 2 years'}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start border-slate-600 text-slate-300 hover:bg-slate-700">
                <History className="w-4 h-4 mr-2" />
                View History
              </Button>
              <Button variant="outline" className="w-full justify-start border-slate-600 text-slate-300 hover:bg-slate-700">
                <FileText className="w-4 h-4 mr-2" />
                Generate Report
              </Button>
              <Button variant="outline" className="w-full justify-start border-slate-600 text-slate-300 hover:bg-slate-700">
                <Download className="w-4 h-4 mr-2" />
                Export Data
              </Button>
              <Button variant="outline" className="w-full justify-start border-slate-600 text-slate-300 hover:bg-slate-700">
                <Share2 className="w-4 h-4 mr-2" />
                Share Asset
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Tabs for detailed information */}
      <Tabs defaultValue="maintenance" className="space-y-6">
        <TabsList className="bg-slate-700/50">
          <TabsTrigger value="maintenance" className="data-[state=active]:bg-slate-600">
            Maintenance History
          </TabsTrigger>
          <TabsTrigger value="value" className="data-[state=active]:bg-slate-600">
            Value Tracking
          </TabsTrigger>
          <TabsTrigger value="documents" className="data-[state=active]:bg-slate-600">
            Documents
          </TabsTrigger>
        </TabsList>

        <TabsContent value="maintenance">
          <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="text-white">Maintenance History</CardTitle>
                <Button 
                  className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                  onClick={() => setShowAddMaintenance(true)}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Add Entry
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="rounded-lg border border-slate-600 overflow-hidden">
                <Table>
                  <TableHeader className="bg-slate-700/50">
                    <TableRow>
                      <TableHead className="text-slate-300">Date</TableHead>
                      <TableHead className="text-slate-300">Type</TableHead>
                      <TableHead className="text-slate-300">Description</TableHead>
                      <TableHead className="text-slate-300">Technician</TableHead>
                      <TableHead className="text-slate-300">Cost</TableHead>
                      <TableHead className="text-slate-300">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {asset.maintenanceHistory.map((entry) => (
                      <TableRow key={entry.id} className="hover:bg-slate-700/50">
                        <TableCell className="text-slate-300">
                          {new Date(entry.date).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <Badge variant="secondary" className="bg-slate-600 text-slate-300">
                            {entry.type}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-slate-300">{entry.description}</TableCell>
                        <TableCell className="text-slate-300">{entry.technician}</TableCell>
                        <TableCell className="text-slate-300">
                          ${entry.cost.toFixed(2)}
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-green-500/20 text-green-400">
                            {entry.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="value">
          <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Value Tracking</CardTitle>
              <CardDescription className="text-slate-400">
                Asset depreciation and value changes over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <RechartsLineChart data={asset.valueHistory}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                    <XAxis dataKey="date" stroke="#9CA3AF" />
                    <YAxis stroke="#9CA3AF" />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: '#1F2937', 
                        border: '1px solid #374151',
                        borderRadius: '8px',
                        color: '#F9FAFB'
                      }} 
                    />
                    <Line 
                      type="monotone" 
                      dataKey="value" 
                      stroke="#3B82F6" 
                      strokeWidth={3}
                      dot={{ fill: '#3B82F6', strokeWidth: 2, r: 6 }}
                      activeDot={{ r: 8, stroke: '#3B82F6', strokeWidth: 2 }}
                    />
                  </RechartsLineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents">
          <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Documents & Files</CardTitle>
              <CardDescription className="text-slate-400">
                Purchase receipts, warranties, manuals, and other documents
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="p-4 border border-slate-600 rounded-lg hover:bg-slate-700/50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-8 h-8 text-blue-400" />
                    <div>
                      <p className="text-white font-medium">Purchase Receipt</p>
                      <p className="text-sm text-slate-400">PDF • 245 KB</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 border border-slate-600 rounded-lg hover:bg-slate-700/50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <Shield className="w-8 h-8 text-green-400" />
                    <div>
                      <p className="text-white font-medium">Warranty Certificate</p>
                      <p className="text-sm text-slate-400">PDF • 180 KB</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 border border-slate-600 rounded-lg hover:bg-slate-700/50 transition-colors">
                  <div className="flex items-center space-x-3">
                    <FileText className="w-8 h-8 text-purple-400" />
                    <div>
                      <p className="text-white font-medium">User Manual</p>
                      <p className="text-sm text-slate-400">PDF • 2.1 MB</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* QR Code Dialog */}
      <Dialog open={showQRCode} onOpenChange={setShowQRCode}>
        <DialogContent className="bg-slate-800 border-slate-600">
          <DialogHeader>
            <DialogTitle className="text-white">QR Code for {asset.name}</DialogTitle>
            <DialogDescription className="text-slate-400">
              Scan this QR code to quickly access asset information
            </DialogDescription>
          </DialogHeader>
          <QRCode 
            data={`${asset.id}-${asset.serialNumber}`}
            size={256}
            className="w-full"
          />
        </DialogContent>
      </Dialog>
    </div>
  )
}
