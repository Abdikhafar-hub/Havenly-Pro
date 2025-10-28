"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { 
  Plus, 
  ArrowLeft,
  CheckCircle,
  Upload,
  Building2,
  User,
  DollarSign,
  FileText,
  Key,
  Eye,
  EyeOff,
  Copy,
  RefreshCw,
  Shield,
  Mail,
  Smartphone
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

export default function AddTenantPage() {
  const router = useRouter()
  const [currentStep, setCurrentStep] = useState(1)
  const [showPassword, setShowPassword] = useState(false)
  const [tenantCredentials, setTenantCredentials] = useState({
    username: '',
    password: '',
    generated: false
  })
  const [sendCredentials, setSendCredentials] = useState({
    email: true,
    sms: false
  })

  const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*'
    let password = ''
    const length = Math.floor(Math.random() * 5) + 8 // 8-12 characters
    
    for (let i = 0; i < length; i++) {
      password += chars.charAt(Math.floor(Math.random() * chars.length))
    }
    
    setTenantCredentials(prev => ({
      ...prev,
      password,
      generated: true
    }))
  }

  const copyCredentials = () => {
    const credentials = `Username: ${tenantCredentials.username}\nPassword: ${tenantCredentials.password}\nLogin Link: https://app.havelypro.com/login`
    navigator.clipboard.writeText(credentials)
    // You could add a toast notification here
  }

  const handleSubmit = () => {
    // Handle form submission
    router.push('/property-admin/tenants')
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
              <span>Tenants</span>
              <span>/</span>
              <span className="text-slate-300">Add Tenant</span>
            </div>
            <h1 className="text-3xl font-bold text-blue-400 flex items-center">
              <Plus className="w-8 h-8 mr-3" />
              Add New Tenant
            </h1>
            <p className="text-slate-400 mt-2">Complete tenant onboarding with personal details, lease information, and documentation.</p>
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <Card className="bg-slate-800 border-slate-700 border-2 border-blue-500/20 rounded-xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-semibold text-slate-300">Step {currentStep} of 5</span>
            <span className="text-lg font-semibold text-blue-400">{Math.round((currentStep / 5) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-3">
            <div 
              className="bg-blue-500 h-3 rounded-full transition-all duration-300" 
              style={{ width: `${(currentStep / 5) * 100}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Form Content */}
      <Card className="bg-slate-800 border-slate-700 border-2 border-emerald-500/20 rounded-xl">
        <CardContent className="p-8">
          <Tabs value={currentStep.toString()} className="w-full">
            <TabsList className="grid w-full grid-cols-5 bg-slate-700 mb-8">
              <TabsTrigger value="1" className="data-[state=active]:bg-blue-600 text-blue-300 hover:text-blue-200 text-sm">
                <User className="w-4 h-4 mr-2" />
                Personal Info
              </TabsTrigger>
              <TabsTrigger value="2" className="data-[state=active]:bg-blue-600 text-blue-300 hover:text-blue-200 text-sm">
                <Building2 className="w-4 h-4 mr-2" />
                Lease Details
              </TabsTrigger>
              <TabsTrigger value="3" className="data-[state=active]:bg-blue-600 text-blue-300 hover:text-blue-200 text-sm">
                <DollarSign className="w-4 h-4 mr-2" />
                Payment Info
              </TabsTrigger>
              <TabsTrigger value="4" className="data-[state=active]:bg-blue-600 text-blue-300 hover:text-blue-200 text-sm">
                <Key className="w-4 h-4 mr-2" />
                Tenant Account
              </TabsTrigger>
              <TabsTrigger value="5" className="data-[state=active]:bg-blue-600 text-blue-300 hover:text-blue-200 text-sm">
                <FileText className="w-4 h-4 mr-2" />
                Documents & Review
              </TabsTrigger>
            </TabsList>
            
            {/* Step 1: Personal Details */}
            <TabsContent value="1" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <Label className="text-slate-300 text-sm font-medium">Full Name *</Label>
                    <Input className="bg-slate-700 border-slate-600 text-white placeholder-slate-400 h-12 mt-2" placeholder="Enter full name" />
                  </div>
                  <div>
                    <Label className="text-slate-300 text-sm font-medium">Email Address</Label>
                    <Input type="email" className="bg-slate-700 border-slate-600 text-white placeholder-slate-400 h-12 mt-2" placeholder="email@example.com" />
                  </div>
                  <div>
                    <Label className="text-slate-300 text-sm font-medium">Phone Number *</Label>
                    <Input className="bg-slate-700 border-slate-600 text-white placeholder-slate-400 h-12 mt-2" placeholder="(555) 123-4567" />
                  </div>
                  <div>
                    <Label className="text-slate-300 text-sm font-medium">National ID / Passport</Label>
                    <Input className="bg-slate-700 border-slate-600 text-white placeholder-slate-400 h-12 mt-2" placeholder="ID number" />
                  </div>
                </div>
                <div className="space-y-6">
                  <div>
                    <Label className="text-slate-300 text-sm font-medium">Gender</Label>
                    <Select>
                      <SelectTrigger className="bg-slate-700 border-slate-600 text-white h-12 mt-2">
                        <SelectValue placeholder="Select gender" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-700 border-slate-600">
                        <SelectItem value="male" className="text-white hover:bg-slate-600">Male</SelectItem>
                        <SelectItem value="female" className="text-white hover:bg-slate-600">Female</SelectItem>
                        <SelectItem value="other" className="text-white hover:bg-slate-600">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-slate-300 text-sm font-medium">Date of Birth</Label>
                    <Input type="date" className="bg-slate-700 border-slate-600 text-white h-12 mt-2" />
                  </div>
                  <div className="bg-slate-700/30 rounded-lg p-6">
                    <h4 className="text-sm font-semibold text-slate-300 mb-4">Validation Status</h4>
                    <div className="space-y-3 text-sm text-slate-400">
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-400 mr-3" />
                        <span>Required fields completed</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-400 mr-3" />
                        <span>Email format valid</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* Step 2: Property & Lease Details */}
            <TabsContent value="2" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <Label className="text-slate-300 text-sm font-medium">Property Name</Label>
                    <Input 
                      className="bg-slate-600 border-slate-500 text-slate-300 h-12 mt-2" 
                      value="Sunrise Apartments" 
                      disabled 
                    />
                    <p className="text-xs text-slate-500 mt-1">Auto-filled based on your assigned property</p>
                  </div>
                  <div>
                    <Label className="text-slate-300 text-sm font-medium">Unit / Apartment No. *</Label>
                    <Select>
                      <SelectTrigger className="bg-slate-700 border-slate-600 text-white h-12 mt-2">
                        <SelectValue placeholder="Select vacant unit" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-700 border-slate-600">
                        <SelectItem value="103" className="text-white hover:bg-slate-600">Unit 103 (Vacant)</SelectItem>
                        <SelectItem value="204" className="text-white hover:bg-slate-600">Unit 204 (Vacant)</SelectItem>
                        <SelectItem value="305" className="text-white hover:bg-slate-600">Unit 305 (Vacant)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-slate-300 text-sm font-medium">Occupancy Type *</Label>
                    <Select>
                      <SelectTrigger className="bg-slate-700 border-slate-600 text-white h-12 mt-2">
                        <SelectValue placeholder="Select occupancy type" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-700 border-slate-600">
                        <SelectItem value="primary" className="text-white hover:bg-slate-600">Primary Tenant</SelectItem>
                        <SelectItem value="co-tenant" className="text-white hover:bg-slate-600">Co-tenant</SelectItem>
                        <SelectItem value="company" className="text-white hover:bg-slate-600">Company Lease</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-slate-300 text-sm font-medium">Lease Status</Label>
                    <Select defaultValue="active">
                      <SelectTrigger className="bg-slate-700 border-slate-600 text-white h-12 mt-2">
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-700 border-slate-600">
                        <SelectItem value="active" className="text-white hover:bg-slate-600">Active</SelectItem>
                        <SelectItem value="pending" className="text-white hover:bg-slate-600">Pending</SelectItem>
                        <SelectItem value="terminated" className="text-white hover:bg-slate-600">Terminated</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-6">
                  <div>
                    <Label className="text-slate-300 text-sm font-medium">Move-in Date *</Label>
                    <Input type="date" className="bg-slate-700 border-slate-600 text-white h-12 mt-2" />
                  </div>
                  <div>
                    <Label className="text-slate-300 text-sm font-medium">Move-out Date / Lease End *</Label>
                    <Input type="date" className="bg-slate-700 border-slate-600 text-white h-12 mt-2" />
                  </div>
                  <div>
                    <Label className="text-slate-300 text-sm font-medium">Lease Duration</Label>
                    <Input 
                      className="bg-slate-600 border-slate-500 text-slate-300 h-12 mt-2" 
                      value="12 months" 
                      disabled 
                    />
                    <p className="text-xs text-slate-500 mt-1">Auto-calculated from move-in to move-out dates</p>
                  </div>
                  <div className="bg-slate-700/30 rounded-lg p-6">
                    <h4 className="text-sm font-semibold text-slate-300 mb-4">Lease Summary</h4>
                    <div className="space-y-2 text-sm text-slate-400">
                      <div className="flex justify-between">
                        <span>Start Date:</span>
                        <span className="text-slate-300">TBD</span>
                      </div>
                      <div className="flex justify-between">
                        <span>End Date:</span>
                        <span className="text-slate-300">TBD</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Duration:</span>
                        <span className="text-slate-300">12 months</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>
            
            {/* Step 3: Rent & Payment Details */}
            <TabsContent value="3" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <Label className="text-slate-300 text-sm font-medium">Monthly Rent Amount *</Label>
                    <Input type="number" className="bg-slate-700 border-slate-600 text-white placeholder-slate-400 h-12 mt-2" placeholder="1200" />
                  </div>
                  <div>
                    <Label className="text-slate-300 text-sm font-medium">Security Deposit Amount</Label>
                    <Input type="number" className="bg-slate-700 border-slate-600 text-white placeholder-slate-400 h-12 mt-2" placeholder="2400" />
                  </div>
                  <div>
                    <Label className="text-slate-300 text-sm font-medium">Payment Frequency *</Label>
                    <Select>
                      <SelectTrigger className="bg-slate-700 border-slate-600 text-white h-12 mt-2">
                        <SelectValue placeholder="Select frequency" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-700 border-slate-600">
                        <SelectItem value="monthly" className="text-white hover:bg-slate-600">Monthly</SelectItem>
                        <SelectItem value="quarterly" className="text-white hover:bg-slate-600">Quarterly</SelectItem>
                        <SelectItem value="annually" className="text-white hover:bg-slate-600">Annually</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-slate-300 text-sm font-medium">Payment Method *</Label>
                    <Select>
                      <SelectTrigger className="bg-slate-700 border-slate-600 text-white h-12 mt-2">
                        <SelectValue placeholder="Select payment method" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-700 border-slate-600">
                        <SelectItem value="mpesa" className="text-white hover:bg-slate-600">M-Pesa</SelectItem>
                        <SelectItem value="bank" className="text-white hover:bg-slate-600">Bank Transfer</SelectItem>
                        <SelectItem value="cash" className="text-white hover:bg-slate-600">Cash</SelectItem>
                        <SelectItem value="other" className="text-white hover:bg-slate-600">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-slate-300 text-sm font-medium">Next Payment Due Date</Label>
                    <Input type="date" className="bg-slate-700 border-slate-600 text-white h-12 mt-2" />
                  </div>
                  <div className="flex items-center space-x-3">
                    <input type="checkbox" id="late-fee" className="rounded w-4 h-4" />
                    <Label htmlFor="late-fee" className="text-slate-300 text-sm">Enable Late Fee Policy</Label>
                  </div>
                  <div>
                    <Label className="text-slate-300 text-sm font-medium">Rent Status</Label>
                    <Input 
                      className="bg-slate-600 border-slate-500 text-slate-300 h-12 mt-2" 
                      value="Pending" 
                      disabled 
                    />
                  </div>
                </div>
                <div className="space-y-6">
                  <Card className="bg-slate-700/50 border-slate-600">
                    <CardHeader className="pb-4">
                      <CardTitle className="text-white text-lg">Payment Summary</CardTitle>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-slate-400">Monthly Rent:</span>
                          <span className="text-white font-semibold">$1,200</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Security Deposit:</span>
                          <span className="text-white font-semibold">$2,400</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Payment Frequency:</span>
                          <span className="text-slate-300">Monthly</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Next Due Date:</span>
                          <span className="text-slate-300">Feb 1, 2024</span>
                        </div>
                        <div className="border-t border-slate-600 pt-4">
                          <div className="flex justify-between">
                            <span className="text-slate-300 font-semibold">Total Setup:</span>
                            <span className="text-white font-bold text-lg">$3,600</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            {/* Step 4: Tenant Account */}
            <TabsContent value="4" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <Label className="text-slate-300 text-sm font-medium">Username *</Label>
                    <Input 
                      className="bg-slate-700 border-slate-600 text-white placeholder-slate-400 h-12 mt-2" 
                      value={tenantCredentials.username}
                      onChange={(e) => setTenantCredentials(prev => ({ ...prev, username: e.target.value }))}
                      placeholder="Enter unique username" 
                    />
                    <p className="text-xs text-slate-500 mt-1">Username must be unique across all tenants</p>
                  </div>
                  <div>
                    <Label className="text-slate-300 text-sm font-medium">Password *</Label>
                    <div className="relative">
                      <Input 
                        type={showPassword ? "text" : "password"}
                        className="bg-slate-700 border-slate-600 text-white placeholder-slate-400 h-12 mt-2 pr-12" 
                        value={tenantCredentials.password}
                        onChange={(e) => setTenantCredentials(prev => ({ ...prev, password: e.target.value }))}
                        placeholder="Enter secure password" 
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-white"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </Button>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">8-12 characters with letters, numbers, and symbols</p>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Button 
                      type="button"
                      variant="outline" 
                      onClick={generatePassword}
                      className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Generate Credentials
                    </Button>
                    {tenantCredentials.generated && (
                      <Button 
                        type="button"
                        variant="outline" 
                        onClick={copyCredentials}
                        className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        Copy Credentials
                      </Button>
                    )}
                  </div>
                </div>
                <div className="space-y-6">
                  <div className="bg-slate-700/30 rounded-lg p-6">
                    <h4 className="text-sm font-semibold text-slate-300 mb-4 flex items-center">
                      <Shield className="w-4 h-4 mr-2" />
                      Security Settings
                    </h4>
                    <div className="space-y-3 text-sm text-slate-400">
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-400 mr-3" />
                        <span>Password will be hashed securely</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-400 mr-3" />
                        <span>Username uniqueness validated</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle className="w-4 h-4 text-green-400 mr-3" />
                        <span>Account linked to property</span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <Label className="text-slate-300 text-sm font-medium">Send Credentials Via</Label>
                    <div className="space-y-3 mt-3">
                      <div className="flex items-center space-x-3">
                        <input 
                          type="checkbox" 
                          id="send-email" 
                          className="rounded w-4 h-4" 
                          checked={sendCredentials.email}
                          onChange={(e) => setSendCredentials(prev => ({ ...prev, email: e.target.checked }))}
                        />
                        <Label htmlFor="send-email" className="text-slate-300 text-sm flex items-center">
                          <Mail className="w-4 h-4 mr-2" />
                          Email Welcome Message
                        </Label>
                      </div>
                      <div className="flex items-center space-x-3">
                        <input 
                          type="checkbox" 
                          id="send-sms" 
                          className="rounded w-4 h-4" 
                          checked={sendCredentials.sms}
                          onChange={(e) => setSendCredentials(prev => ({ ...prev, sms: e.target.checked }))}
                        />
                        <Label htmlFor="send-sms" className="text-slate-300 text-sm flex items-center">
                          <Smartphone className="w-4 h-4 mr-2" />
                          SMS Welcome Message
                        </Label>
                      </div>
                    </div>
                    <p className="text-xs text-slate-500 mt-2">Welcome message will include login credentials and instructions</p>
                  </div>
                </div>
              </div>
              
              {/* Credentials Preview */}
              {tenantCredentials.username && tenantCredentials.password && (
                <Card className="bg-slate-700/50 border-slate-600">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-white text-lg flex items-center">
                      <Key className="w-5 h-5 mr-2" />
                      Generated Credentials Preview
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex justify-between">
                        <span className="text-slate-400">Username:</span>
                        <span className="text-white font-mono">{tenantCredentials.username}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Password:</span>
                        <span className="text-white font-mono">{showPassword ? tenantCredentials.password : '••••••••'}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-400">Login URL:</span>
                        <span className="text-blue-400">https://app.havelypro.com/login</span>
                      </div>
                      <div className="bg-slate-600 rounded-lg p-4 mt-4">
                        <h5 className="text-white font-medium mb-2">Welcome Message Preview:</h5>
                        <p className="text-slate-300 text-sm">
                          Welcome to Havely Pro! Your tenant account has been created.<br/>
                          Username: {tenantCredentials.username}<br/>
                          Password: {tenantCredentials.password}<br/>
                          Login: https://app.havelypro.com/login<br/>
                          Please update your password after first login.
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )}
            </TabsContent>
            
            {/* Step 5: Documents & Review */}
            <TabsContent value="5" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <Label className="text-slate-300 text-sm font-medium">Lease Agreement *</Label>
                    <div className="border-2 border-dashed border-slate-600 rounded-lg p-8 text-center mt-2">
                      <Upload className="w-10 h-10 text-slate-400 mx-auto mb-3" />
                      <p className="text-slate-400 text-sm">Drag & drop lease agreement or click to browse</p>
                      <p className="text-slate-500 text-xs mt-1">PDF, DOC, DOCX files accepted</p>
                    </div>
                  </div>
                  <div>
                    <Label className="text-slate-300 text-sm font-medium">ID / Passport Copy</Label>
                    <div className="border-2 border-dashed border-slate-600 rounded-lg p-6 text-center mt-2">
                      <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                      <p className="text-slate-400 text-sm">Upload ID or passport copy</p>
                    </div>
                  </div>
                  <div>
                    <Label className="text-slate-300 text-sm font-medium">Proof of Payment</Label>
                    <div className="border-2 border-dashed border-slate-600 rounded-lg p-6 text-center mt-2">
                      <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                      <p className="text-slate-400 text-sm">Upload payment receipt</p>
                    </div>
                  </div>
                  <div>
                    <Label className="text-slate-300 text-sm font-medium">Additional Documents</Label>
                    <div className="border-2 border-dashed border-slate-600 rounded-lg p-6 text-center mt-2">
                      <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                      <p className="text-slate-400 text-sm">Upload any additional documents</p>
                    </div>
                  </div>
                </div>
                <div className="space-y-6">
                  <div>
                    <Label className="text-slate-300 text-sm font-medium">Preferred Notification Channel</Label>
                    <Select>
                      <SelectTrigger className="bg-slate-700 border-slate-600 text-white h-12 mt-2">
                        <SelectValue placeholder="Select notification preference" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-700 border-slate-600">
                        <SelectItem value="sms" className="text-white hover:bg-slate-600">SMS</SelectItem>
                        <SelectItem value="email" className="text-white hover:bg-slate-600">Email</SelectItem>
                        <SelectItem value="both" className="text-white hover:bg-slate-600">Both SMS & Email</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-slate-300 text-sm font-medium">Emergency Contact Name</Label>
                    <Input className="bg-slate-700 border-slate-600 text-white placeholder-slate-400 h-12 mt-2" placeholder="Emergency contact name" />
                  </div>
                  <div>
                    <Label className="text-slate-300 text-sm font-medium">Emergency Contact Phone</Label>
                    <Input className="bg-slate-700 border-slate-600 text-white placeholder-slate-400 h-12 mt-2" placeholder="(555) 123-4567" />
                  </div>
                  <div>
                    <Label className="text-slate-300 text-sm font-medium">Internal Notes (Admin Only)</Label>
                    <Textarea 
                      className="bg-slate-700 border-slate-600 text-white placeholder-slate-400 mt-2" 
                      rows={4} 
                      placeholder="Add any internal notes about this tenant..." 
                    />
                  </div>
                  <div className="flex items-center space-x-3">
                    <input type="checkbox" id="send-welcome" className="rounded w-4 h-4" />
                    <Label htmlFor="send-welcome" className="text-slate-300 text-sm">Send Welcome SMS/Email</Label>
                  </div>
                </div>
              </div>
              
              {/* Review Summary */}
              <Card className="bg-slate-700/50 border-slate-600">
                <CardHeader className="pb-4">
                  <CardTitle className="text-white text-lg">Tenant Summary</CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-sm">
                    <div>
                      <p className="text-slate-400">Tenant ID:</p>
                      <p className="text-white font-semibold">TEN-000123</p>
                    </div>
                    <div>
                      <p className="text-slate-400">Unit:</p>
                      <p className="text-white font-semibold">Unit 103</p>
                    </div>
                    <div>
                      <p className="text-slate-400">Monthly Rent:</p>
                      <p className="text-white font-semibold">$1,200</p>
                    </div>
                    <div>
                      <p className="text-slate-400">Lease Duration:</p>
                      <p className="text-white font-semibold">12 months</p>
                    </div>
                  </div>
                  
                  {/* Account Information */}
                  {tenantCredentials.username && (
                    <div className="mt-6 pt-6 border-t border-slate-600">
                      <h4 className="text-white font-medium mb-4 flex items-center">
                        <Key className="w-4 h-4 mr-2" />
                        Account Information
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                        <div>
                          <p className="text-slate-400">Username:</p>
                          <p className="text-white font-mono">{tenantCredentials.username}</p>
                        </div>
                        <div>
                          <p className="text-slate-400">Account Status:</p>
                          <p className="text-green-400 font-semibold">🟢 Active (Login Created)</p>
                        </div>
                        <div>
                          <p className="text-slate-400">Credentials Sent:</p>
                          <p className="text-white">
                            {sendCredentials.email && sendCredentials.sms ? 'Email & SMS' : 
                             sendCredentials.email ? 'Email' : 
                             sendCredentials.sms ? 'SMS' : 'Not Sent'}
                          </p>
                        </div>
                        <div>
                          <p className="text-slate-400">Login URL:</p>
                          <p className="text-blue-400">https://app.havelypro.com/login</p>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
          
          {/* Navigation Buttons */}
          <div className="flex justify-between items-center mt-8 pt-6 border-t border-slate-700">
            <div className="flex space-x-3">
              {currentStep > 1 && (
                <Button 
                  variant="outline" 
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
                >
                  Back
                </Button>
              )}
              <Button 
                variant="outline" 
                onClick={() => router.back()}
                className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
              >
                Cancel
              </Button>
            </div>
            <div className="flex space-x-3">
              {currentStep < 5 ? (
                <Button 
                  onClick={() => setCurrentStep(currentStep + 1)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8"
                >
                  Next
                </Button>
              ) : (
                <Button 
                  onClick={handleSubmit}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white px-8"
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Create Tenant
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
