"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Progress } from '@/components/ui/progress'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  FileText,
  Download,
  Upload,
  Eye,
  Edit,
  CheckCircle,
  Clock,
  AlertCircle,
  Calendar,
  User,
  Shield,
  Home,
  CreditCard,
  Signature,
  History,
  Search,
  Filter,
  Plus,
  Trash2,
  File,
  Image,
  Lock,
  Unlock
} from 'lucide-react'

export default function LeaseDetailsPage() {
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState('lease')
  const [selectedDocument, setSelectedDocument] = useState<any>(null)
  const [uploadModalOpen, setUploadModalOpen] = useState(false)
  const [signatureModalOpen, setSignatureModalOpen] = useState(false)
  const [filterStatus, setFilterStatus] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  // Mock lease information
  const leaseInfo = {
    id: 'LEASE-001',
    propertyName: 'Sunset Apartments',
    unitNumber: 'Unit 101',
    startDate: '2023-01-01',
    endDate: '2024-12-31',
    rentAmount: 1200,
    depositAmount: 2400,
    status: 'active',
    renewalDate: '2024-10-01',
    renewalStatus: 'pending',
    version: '2.1',
    lastUpdated: '2023-06-15'
  }

  // Mock documents
  const documents = [
    {
      id: 'DOC-001',
      name: 'Lease Agreement',
      type: 'lease',
      status: 'active',
      uploadDate: '2023-01-01',
      expiryDate: '2024-12-31',
      size: '2.4 MB',
      version: '2.1',
      category: 'contract',
      icon: FileText,
      color: 'blue',
      description: 'Main lease agreement document'
    },
    {
      id: 'DOC-002',
      name: 'House Rules',
      type: 'rules',
      status: 'active',
      uploadDate: '2023-01-01',
      expiryDate: null,
      size: '856 KB',
      version: '1.3',
      category: 'policy',
      icon: Shield,
      color: 'green',
      description: 'Property rules and regulations'
    },
    {
      id: 'DOC-003',
      name: 'National ID',
      type: 'personal',
      status: 'verified',
      uploadDate: '2023-01-05',
      expiryDate: '2030-01-01',
      size: '1.2 MB',
      version: '1.0',
      category: 'identification',
      icon: User,
      color: 'purple',
      description: 'Government issued identification'
    },
    {
      id: 'DOC-004',
      name: 'Proof of Income',
      type: 'personal',
      status: 'pending',
      uploadDate: '2024-01-15',
      expiryDate: null,
      size: '3.1 MB',
      version: '1.0',
      category: 'financial',
      icon: CreditCard,
      color: 'yellow',
      description: 'Employment letter and payslips'
    },
    {
      id: 'DOC-005',
      name: 'Emergency Contact Form',
      type: 'personal',
      status: 'verified',
      uploadDate: '2023-01-10',
      expiryDate: null,
      size: '512 KB',
      version: '1.0',
      category: 'contact',
      icon: User,
      color: 'blue',
      description: 'Emergency contact information'
    },
    {
      id: 'DOC-006',
      name: 'Pet Agreement',
      type: 'addendum',
      status: 'active',
      uploadDate: '2023-03-15',
      expiryDate: '2024-12-31',
      size: '1.8 MB',
      version: '1.0',
      category: 'addendum',
      icon: File,
      color: 'orange',
      description: 'Pet ownership terms and conditions'
    }
  ]

  // Mock renewal progress
  const renewalProgress = [
    { step: 'Application Submitted', status: 'completed', date: '2024-01-15' },
    { step: 'Document Review', status: 'completed', date: '2024-01-20' },
    { step: 'Background Check', status: 'in-progress', date: '2024-01-25' },
    { step: 'Contract Preparation', status: 'pending', date: null },
    { step: 'Digital Signature', status: 'pending', date: null },
    { step: 'Final Approval', status: 'pending', date: null }
  ]

  // Mock version history
  const versionHistory = [
    {
      version: '2.1',
      date: '2023-06-15',
      changes: 'Updated pet policy, increased rent by 5%',
      status: 'active'
    },
    {
      version: '2.0',
      date: '2023-01-01',
      changes: 'Initial lease agreement',
      status: 'archived'
    },
    {
      version: '1.5',
      date: '2022-12-15',
      changes: 'Added parking space terms',
      status: 'archived'
    }
  ]

  const getStatusBadge = (status: string) => {
    const styles = {
      'active': 'bg-green-500/20 text-green-400 border-green-500/30',
      'pending': 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      'verified': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
      'expired': 'bg-red-500/20 text-red-400 border-red-500/30',
      'archived': 'bg-slate-500/20 text-slate-400 border-slate-500/30'
    }
    return (
      <Badge className={styles[status as keyof typeof styles]}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  const getProgressStatus = (status: string) => {
    const styles = {
      'completed': { color: 'text-green-400', bg: 'bg-green-500' },
      'in-progress': { color: 'text-blue-400', bg: 'bg-blue-500' },
      'pending': { color: 'text-slate-400', bg: 'bg-slate-500' }
    }
    return styles[status as keyof typeof styles]
  }

  const getFilteredDocuments = () => {
    let filtered = documents

    if (filterStatus !== 'all') {
      filtered = filtered.filter(doc => doc.status === filterStatus)
    }

    if (searchTerm) {
      filtered = filtered.filter(doc => 
        doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doc.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    return filtered
  }

  const getExpiringDocuments = () => {
    const today = new Date()
    const thirtyDaysFromNow = new Date(today.getTime() + 30 * 24 * 60 * 60 * 1000)
    
    return documents.filter(doc => 
      doc.expiryDate && 
      new Date(doc.expiryDate) <= thirtyDaysFromNow &&
      doc.status !== 'expired'
    )
  }

  const getPendingDocuments = () => {
    return documents.filter(doc => doc.status === 'pending')
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
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Lease & Documents</h1>
          <p className="text-slate-400 mt-2">Manage your lease agreement and official documents</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button 
            variant="outline" 
            className="border-blue-500/50 text-blue-400 hover:bg-blue-500/10 hover:border-blue-500 hover:text-blue-300 transition-all duration-300"
            onClick={() => setSignatureModalOpen(true)}
          >
            <Signature className="w-4 h-4 mr-2" />
            Digital Signature
          </Button>
          <Dialog open={uploadModalOpen} onOpenChange={setUploadModalOpen}>
            <DialogTrigger asChild>
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">
                <Upload className="w-4 h-4 mr-2" />
                Upload Document
              </Button>
            </DialogTrigger>
            <DialogContent className="bg-slate-800 border-slate-700 max-w-md">
              <DialogHeader>
                <DialogTitle className="text-white text-2xl">Upload Document</DialogTitle>
                <DialogDescription className="text-slate-400">
                  Upload personal documents for verification
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-4 mt-4">
                <div>
                  <Label htmlFor="document-name" className="text-slate-300 mb-2 block">Document Name</Label>
                  <Input
                    id="document-name"
                    placeholder="e.g., Passport, Driver's License"
                    className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400"
                  />
                </div>

                <div>
                  <Label htmlFor="document-type" className="text-slate-300 mb-2 block">Document Type</Label>
                  <select
                    id="document-type"
                    className="w-full bg-slate-700/50 border border-slate-600 text-white rounded-lg px-3 py-2"
                  >
                    <option value="identification">Identification</option>
                    <option value="financial">Financial</option>
                    <option value="contact">Contact Information</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="file-upload" className="text-slate-300 mb-2 block">Select File</Label>
                  <div className="border-2 border-dashed border-slate-600 rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 mx-auto text-slate-400 mb-2" />
                    <p className="text-slate-400 text-sm">Click to upload or drag and drop</p>
                    <p className="text-slate-500 text-xs mt-1">PDF, JPG, PNG up to 10MB</p>
                  </div>
                </div>

                <div>
                  <Label htmlFor="description" className="text-slate-300 mb-2 block">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Additional details about this document..."
                    rows={3}
                    className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400 resize-none"
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <Button
                    variant="outline"
                    className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700"
                    onClick={() => setUploadModalOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                    onClick={() => {
                      alert('Document uploaded successfully!')
                      setUploadModalOpen(false)
                    }}
                  >
                    Upload
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
            <CardTitle className="text-sm font-medium text-slate-300">Total Documents</CardTitle>
            <FileText className="h-4 w-4 text-blue-400" />
          </CardHeader>
          <CardContent className="pt-2">
            <div className="text-xl font-bold text-white">{documents.length}</div>
            <p className="text-xs text-blue-400">All documents</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-yellow-500/50 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
            <CardTitle className="text-sm font-medium text-slate-300">Pending Review</CardTitle>
            <Clock className="h-4 w-4 text-yellow-400" />
          </CardHeader>
          <CardContent className="pt-2">
            <div className="text-xl font-bold text-white">{getPendingDocuments().length}</div>
            <p className="text-xs text-yellow-400">Awaiting verification</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-red-500/50 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
            <CardTitle className="text-sm font-medium text-slate-300">Expiring Soon</CardTitle>
            <AlertCircle className="h-4 w-4 text-red-400" />
          </CardHeader>
          <CardContent className="pt-2">
            <div className="text-xl font-bold text-white">{getExpiringDocuments().length}</div>
            <p className="text-xs text-red-400">Next 30 days</p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-green-500/50 transition-all duration-300">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-1">
            <CardTitle className="text-sm font-medium text-slate-300">Verified</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-400" />
          </CardHeader>
          <CardContent className="pt-2">
            <div className="text-xl font-bold text-white">{documents.filter(d => d.status === 'verified').length}</div>
            <p className="text-xs text-green-400">Approved documents</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-1">
          <TabsTrigger value="lease" className="text-slate-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white">
            Lease Agreement
          </TabsTrigger>
          <TabsTrigger value="documents" className="text-slate-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white">
            Documents
          </TabsTrigger>
          <TabsTrigger value="renewal" className="text-slate-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white">
            Renewal Progress
          </TabsTrigger>
          <TabsTrigger value="history" className="text-slate-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white">
            Version History
          </TabsTrigger>
        </TabsList>

        {/* Lease Agreement Tab */}
        <TabsContent value="lease" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Lease Overview */}
            <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Home className="w-5 h-5 mr-2 text-blue-400" />
                  Lease Overview
                </CardTitle>
                <CardDescription className="text-slate-400">Current lease agreement details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-slate-400 text-sm">Property</Label>
                    <p className="text-white font-semibold">{leaseInfo.propertyName}</p>
                  </div>
                  <div>
                    <Label className="text-slate-400 text-sm">Unit</Label>
                    <p className="text-white font-semibold">{leaseInfo.unitNumber}</p>
                  </div>
                  <div>
                    <Label className="text-slate-400 text-sm">Start Date</Label>
                    <p className="text-white font-semibold">{new Date(leaseInfo.startDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <Label className="text-slate-400 text-sm">End Date</Label>
                    <p className="text-white font-semibold">{new Date(leaseInfo.endDate).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <Label className="text-slate-400 text-sm">Monthly Rent</Label>
                    <p className="text-white font-semibold">KSh {leaseInfo.rentAmount.toLocaleString()}</p>
                  </div>
                  <div>
                    <Label className="text-slate-400 text-sm">Security Deposit</Label>
                    <p className="text-white font-semibold">KSh {leaseInfo.depositAmount.toLocaleString()}</p>
                  </div>
                </div>
                <div className="pt-4 border-t border-slate-700">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Status</span>
                    {getStatusBadge(leaseInfo.status)}
                  </div>
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-slate-400">Version</span>
                    <span className="text-white font-semibold">{leaseInfo.version}</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Renewal Information */}
            <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-green-400" />
                  Renewal Information
                </CardTitle>
                <CardDescription className="text-slate-400">Lease renewal details and timeline</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Renewal Date</span>
                    <span className="text-white font-semibold">{new Date(leaseInfo.renewalDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Status</span>
                    {getStatusBadge(leaseInfo.renewalStatus)}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Last Updated</span>
                    <span className="text-white font-semibold">{new Date(leaseInfo.lastUpdated).toLocaleDateString()}</span>
                  </div>
                </div>
                <div className="pt-4 border-t border-slate-700">
                  <div className="flex space-x-2">
                    <Button variant="outline" className="flex-1 border-green-500/50 text-green-400 hover:bg-green-500/10 hover:border-green-500 hover:text-green-300 transition-all duration-300">
                      <Eye className="w-4 h-4 mr-2" />
                      View Agreement
                    </Button>
                    <Button variant="outline" className="flex-1 border-purple-500/50 text-purple-400 hover:bg-purple-500/10 hover:border-purple-500 hover:text-purple-300 transition-all duration-300">
                      <Download className="w-4 h-4 mr-2" />
                      Download PDF
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Documents Tab */}
        <TabsContent value="documents" className="space-y-6">
          <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-white">All Documents</CardTitle>
                  <CardDescription className="text-slate-400">Manage your lease and personal documents</CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                    <Input
                      placeholder="Search documents..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 w-64 bg-slate-700/50 border-slate-600 text-white placeholder-slate-400"
                    />
                  </div>
                  <Filter className="w-4 h-4 text-slate-400" />
                  <select
                    value={filterStatus}
                    onChange={(e) => setFilterStatus(e.target.value)}
                    className="bg-slate-700/50 border border-slate-600 text-white rounded-lg px-3 py-2 text-sm"
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="pending">Pending</option>
                    <option value="verified">Verified</option>
                    <option value="expired">Expired</option>
                  </select>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {getFilteredDocuments().map((doc) => {
                  const Icon = doc.icon
                  return (
                    <div key={doc.id} className="p-4 rounded-lg border border-slate-600/50 bg-slate-700/30">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-3">
                          <div className={`w-12 h-12 rounded-lg bg-${doc.color}-500/20 flex items-center justify-center`}>
                            <Icon className={`w-6 h-6 text-${doc.color}-400`} />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-1">
                              <h4 className="text-white font-semibold">{doc.name}</h4>
                              <Badge variant="outline" className="text-xs border-slate-600 text-slate-400">
                                {doc.category}
                              </Badge>
                            </div>
                            <p className="text-sm text-slate-400 mb-2">{doc.description}</p>
                            <div className="flex items-center space-x-4 text-xs text-slate-500">
                              <span>Version {doc.version}</span>
                              <span>{doc.size}</span>
                              <span>Uploaded {new Date(doc.uploadDate).toLocaleDateString()}</span>
                              {doc.expiryDate && (
                                <span>Expires {new Date(doc.expiryDate).toLocaleDateString()}</span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {getStatusBadge(doc.status)}
                          <div className="flex space-x-1">
                            <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                              <Download className="w-4 h-4" />
                            </Button>
                            <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                              <Edit className="w-4 h-4" />
                            </Button>
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

        {/* Renewal Progress Tab */}
        <TabsContent value="renewal" className="space-y-6">
          <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Lease Renewal Progress</CardTitle>
              <CardDescription className="text-slate-400">Track your lease renewal application status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {renewalProgress.map((step, index) => {
                  const statusStyle = getProgressStatus(step.status)
                  return (
                    <div key={index} className="flex items-center space-x-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${statusStyle.bg}`}>
                        {step.status === 'completed' ? (
                          <CheckCircle className="w-4 h-4 text-white" />
                        ) : step.status === 'in-progress' ? (
                          <Clock className="w-4 h-4 text-white" />
                        ) : (
                          <div className="w-2 h-2 rounded-full bg-slate-400" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className={`font-semibold ${statusStyle.color}`}>{step.step}</h4>
                          {step.date && (
                            <span className="text-sm text-slate-400">{new Date(step.date).toLocaleDateString()}</span>
                          )}
                        </div>
                        {step.status === 'in-progress' && (
                          <Progress value={65} className="mt-2" />
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Version History Tab */}
        <TabsContent value="history" className="space-y-6">
          <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <History className="w-5 h-5 mr-2 text-purple-400" />
                Contract Version History
              </CardTitle>
              <CardDescription className="text-slate-400">Track changes and updates to your lease agreement</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {versionHistory.map((version, index) => (
                  <div key={index} className="p-4 rounded-lg border border-slate-600/50 bg-slate-700/30">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          version.status === 'active' ? 'bg-green-500/20' : 'bg-slate-500/20'
                        }`}>
                          <FileText className={`w-5 h-5 ${
                            version.status === 'active' ? 'text-green-400' : 'text-slate-400'
                          }`} />
                        </div>
                        <div>
                          <h4 className="text-white font-semibold">Version {version.version}</h4>
                          <p className="text-sm text-slate-400">{version.changes}</p>
                          <p className="text-xs text-slate-500 mt-1">
                            Updated: {new Date(version.date).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusBadge(version.status)}
                        <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
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

      {/* Digital Signature Modal */}
      <Dialog open={signatureModalOpen} onOpenChange={setSignatureModalOpen}>
        <DialogContent className="bg-slate-800 border-slate-700 max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-white text-2xl flex items-center">
              <Signature className="w-6 h-6 mr-2 text-blue-400" />
              Digital Signature
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              Sign your lease renewal agreement digitally
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 mt-4">
            <div className="p-4 rounded-lg bg-slate-700/30 border border-slate-600/50">
              <h3 className="text-white font-semibold mb-2">Lease Renewal Agreement</h3>
              <p className="text-sm text-slate-400 mb-4">
                By signing this document, you agree to the terms and conditions of the lease renewal for Unit 101 at Sunset Apartments.
              </p>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">New Rent Amount:</span>
                  <span className="text-white">KSh 1,260.00</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Lease Period:</span>
                  <span className="text-white">Jan 1, 2025 - Dec 31, 2025</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-400">Effective Date:</span>
                  <span className="text-white">January 1, 2025</span>
                </div>
              </div>
            </div>

            <div className="border-2 border-dashed border-slate-600 rounded-lg p-8 text-center">
              <Signature className="w-16 h-16 mx-auto text-slate-400 mb-4" />
              <p className="text-slate-400 mb-2">Draw your signature below</p>
              <p className="text-slate-500 text-sm">Use your mouse or touch to sign</p>
            </div>

            <div className="flex space-x-3">
              <Button
                variant="outline"
                className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700"
                onClick={() => setSignatureModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white"
                onClick={() => {
                  alert('Document signed successfully!')
                  setSignatureModalOpen(false)
                }}
              >
                <Signature className="w-4 h-4 mr-2" />
                Sign Document
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
