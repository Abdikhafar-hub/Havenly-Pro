"use client"

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { 
  ArrowLeft,
  CheckCircle,
  Upload,
  Building2,
  User,
  DollarSign,
  FileText,
  Save
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

// Mock tenant data - in real app, this would come from API
const mockTenantData = {
  id: "1",
  name: "John Doe",
  email: "john.doe@email.com",
  phone: "(555) 123-4567",
  nationalId: "12345678",
  gender: "male",
  dateOfBirth: "1990-05-15",
  unit: "103",
  occupancyType: "primary",
  moveInDate: "2024-01-01",
  moveOutDate: "2024-12-31",
  leaseStatus: "active",
  monthlyRent: 1200,
  securityDeposit: 2400,
  paymentFrequency: "monthly",
  paymentMethod: "mpesa",
  nextPaymentDue: "2024-02-01",
  lateFeePolicy: true,
  rentStatus: "paid",
  notificationPreference: "both",
  emergencyContactName: "Jane Doe",
  emergencyContactPhone: "(555) 987-6543",
  internalNotes: "Good tenant, always pays on time.",
  documents: {
    leaseAgreement: "lease_agreement.pdf",
    idCopy: "id_copy.pdf",
    paymentProof: "payment_receipt.pdf"
  }
}

export default function EditTenantPage() {
  const router = useRouter()
  const params = useParams()
  const tenantId = params.id
  const [currentStep, setCurrentStep] = useState(1)
  const [tenantData, setTenantData] = useState(mockTenantData)

  const handleInputChange = (field: string, value: any) => {
    setTenantData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleSubmit = () => {
    // Handle form submission
    console.log('Updated tenant data:', tenantData)
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
              <span className="text-slate-300">Edit Tenant</span>
            </div>
            <h1 className="text-3xl font-bold text-blue-400 flex items-center">
              <User className="w-8 h-8 mr-3" />
              Edit Tenant - {tenantData.name}
            </h1>
            <p className="text-slate-400 mt-2">Update tenant information, lease details, and payment settings.</p>
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <Card className="bg-slate-800 border-slate-700 border-2 border-blue-500/20 rounded-xl">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-lg font-semibold text-slate-300">Step {currentStep} of 4</span>
            <span className="text-lg font-semibold text-blue-400">{Math.round((currentStep / 4) * 100)}% Complete</span>
          </div>
          <div className="w-full bg-slate-700 rounded-full h-3">
            <div 
              className="bg-blue-500 h-3 rounded-full transition-all duration-300" 
              style={{ width: `${(currentStep / 4) * 100}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {/* Form Content */}
      <Card className="bg-slate-800 border-slate-700 border-2 border-emerald-500/20 rounded-xl">
        <CardContent className="p-8">
          <Tabs value={currentStep.toString()} className="w-full">
            <TabsList className="grid w-full grid-cols-4 bg-slate-700 mb-8">
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
                    <Input 
                      className="bg-slate-700 border-slate-600 text-white placeholder-slate-400 h-12 mt-2" 
                      value={tenantData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Enter full name" 
                    />
                  </div>
                  <div>
                    <Label className="text-slate-300 text-sm font-medium">Email Address</Label>
                    <Input 
                      type="email" 
                      className="bg-slate-700 border-slate-600 text-white placeholder-slate-400 h-12 mt-2" 
                      value={tenantData.email}
                      onChange={(e) => handleInputChange('email', e.target.value)}
                      placeholder="email@example.com" 
                    />
                  </div>
                  <div>
                    <Label className="text-slate-300 text-sm font-medium">Phone Number *</Label>
                    <Input 
                      className="bg-slate-700 border-slate-600 text-white placeholder-slate-400 h-12 mt-2" 
                      value={tenantData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      placeholder="(555) 123-4567" 
                    />
                  </div>
                  <div>
                    <Label className="text-slate-300 text-sm font-medium">National ID / Passport</Label>
                    <Input 
                      className="bg-slate-700 border-slate-600 text-white placeholder-slate-400 h-12 mt-2" 
                      value={tenantData.nationalId}
                      onChange={(e) => handleInputChange('nationalId', e.target.value)}
                      placeholder="ID number" 
                    />
                  </div>
                </div>
                <div className="space-y-6">
                  <div>
                    <Label className="text-slate-300 text-sm font-medium">Gender</Label>
                    <Select value={tenantData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
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
                    <Input 
                      type="date" 
                      className="bg-slate-700 border-slate-600 text-white h-12 mt-2" 
                      value={tenantData.dateOfBirth}
                      onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    />
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
                    <Select value={tenantData.unit} onValueChange={(value) => handleInputChange('unit', value)}>
                      <SelectTrigger className="bg-slate-700 border-slate-600 text-white h-12 mt-2">
                        <SelectValue placeholder="Select unit" />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-700 border-slate-600">
                        <SelectItem value="103" className="text-white hover:bg-slate-600">Unit 103</SelectItem>
                        <SelectItem value="204" className="text-white hover:bg-slate-600">Unit 204</SelectItem>
                        <SelectItem value="305" className="text-white hover:bg-slate-600">Unit 305</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <Label className="text-slate-300 text-sm font-medium">Occupancy Type *</Label>
                    <Select value={tenantData.occupancyType} onValueChange={(value) => handleInputChange('occupancyType', value)}>
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
                    <Select value={tenantData.leaseStatus} onValueChange={(value) => handleInputChange('leaseStatus', value)}>
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
                    <Input 
                      type="date" 
                      className="bg-slate-700 border-slate-600 text-white h-12 mt-2" 
                      value={tenantData.moveInDate}
                      onChange={(e) => handleInputChange('moveInDate', e.target.value)}
                    />
                  </div>
                  <div>
                    <Label className="text-slate-300 text-sm font-medium">Move-out Date / Lease End *</Label>
                    <Input 
                      type="date" 
                      className="bg-slate-700 border-slate-600 text-white h-12 mt-2" 
                      value={tenantData.moveOutDate}
                      onChange={(e) => handleInputChange('moveOutDate', e.target.value)}
                    />
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
                        <span className="text-slate-300">{tenantData.moveInDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>End Date:</span>
                        <span className="text-slate-300">{tenantData.moveOutDate}</span>
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
                    <Input 
                      type="number" 
                      className="bg-slate-700 border-slate-600 text-white placeholder-slate-400 h-12 mt-2" 
                      value={tenantData.monthlyRent}
                      onChange={(e) => handleInputChange('monthlyRent', parseFloat(e.target.value))}
                      placeholder="1200" 
                    />
                  </div>
                  <div>
                    <Label className="text-slate-300 text-sm font-medium">Security Deposit Amount</Label>
                    <Input 
                      type="number" 
                      className="bg-slate-700 border-slate-600 text-white placeholder-slate-400 h-12 mt-2" 
                      value={tenantData.securityDeposit}
                      onChange={(e) => handleInputChange('securityDeposit', parseFloat(e.target.value))}
                      placeholder="2400" 
                    />
                  </div>
                  <div>
                    <Label className="text-slate-300 text-sm font-medium">Payment Frequency *</Label>
                    <Select value={tenantData.paymentFrequency} onValueChange={(value) => handleInputChange('paymentFrequency', value)}>
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
                    <Select value={tenantData.paymentMethod} onValueChange={(value) => handleInputChange('paymentMethod', value)}>
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
                    <Input 
                      type="date" 
                      className="bg-slate-700 border-slate-600 text-white h-12 mt-2" 
                      value={tenantData.nextPaymentDue}
                      onChange={(e) => handleInputChange('nextPaymentDue', e.target.value)}
                    />
                  </div>
                  <div className="flex items-center space-x-3">
                    <input 
                      type="checkbox" 
                      id="late-fee" 
                      className="rounded w-4 h-4" 
                      checked={tenantData.lateFeePolicy}
                      onChange={(e) => handleInputChange('lateFeePolicy', e.target.checked)}
                    />
                    <Label htmlFor="late-fee" className="text-slate-300 text-sm">Enable Late Fee Policy</Label>
                  </div>
                  <div>
                    <Label className="text-slate-300 text-sm font-medium">Rent Status</Label>
                    <Input 
                      className="bg-slate-600 border-slate-500 text-slate-300 h-12 mt-2" 
                      value={tenantData.rentStatus} 
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
                          <span className="text-white font-semibold">${tenantData.monthlyRent}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Security Deposit:</span>
                          <span className="text-white font-semibold">${tenantData.securityDeposit}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Payment Frequency:</span>
                          <span className="text-slate-300 capitalize">{tenantData.paymentFrequency}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-slate-400">Next Due Date:</span>
                          <span className="text-slate-300">{tenantData.nextPaymentDue}</span>
                        </div>
                        <div className="border-t border-slate-600 pt-4">
                          <div className="flex justify-between">
                            <span className="text-slate-300 font-semibold">Total Setup:</span>
                            <span className="text-white font-bold text-lg">${tenantData.monthlyRent + tenantData.securityDeposit}</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
            
            {/* Step 4: Documents & Review */}
            <TabsContent value="4" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div>
                    <Label className="text-slate-300 text-sm font-medium">Lease Agreement *</Label>
                    <div className="border-2 border-dashed border-slate-600 rounded-lg p-8 text-center mt-2">
                      <Upload className="w-10 h-10 text-slate-400 mx-auto mb-3" />
                      <p className="text-slate-400 text-sm">Drag & drop lease agreement or click to browse</p>
                      <p className="text-slate-500 text-xs mt-1">PDF, DOC, DOCX files accepted</p>
                      {tenantData.documents.leaseAgreement && (
                        <p className="text-blue-400 text-sm mt-2">Current: {tenantData.documents.leaseAgreement}</p>
                      )}
                    </div>
                  </div>
                  <div>
                    <Label className="text-slate-300 text-sm font-medium">ID / Passport Copy</Label>
                    <div className="border-2 border-dashed border-slate-600 rounded-lg p-6 text-center mt-2">
                      <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                      <p className="text-slate-400 text-sm">Upload ID or passport copy</p>
                      {tenantData.documents.idCopy && (
                        <p className="text-blue-400 text-sm mt-2">Current: {tenantData.documents.idCopy}</p>
                      )}
                    </div>
                  </div>
                  <div>
                    <Label className="text-slate-300 text-sm font-medium">Proof of Payment</Label>
                    <div className="border-2 border-dashed border-slate-600 rounded-lg p-6 text-center mt-2">
                      <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                      <p className="text-slate-400 text-sm">Upload payment receipt</p>
                      {tenantData.documents.paymentProof && (
                        <p className="text-blue-400 text-sm mt-2">Current: {tenantData.documents.paymentProof}</p>
                      )}
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
                    <Select value={tenantData.notificationPreference} onValueChange={(value) => handleInputChange('notificationPreference', value)}>
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
                    <Input 
                      className="bg-slate-700 border-slate-600 text-white placeholder-slate-400 h-12 mt-2" 
                      value={tenantData.emergencyContactName}
                      onChange={(e) => handleInputChange('emergencyContactName', e.target.value)}
                      placeholder="Emergency contact name" 
                    />
                  </div>
                  <div>
                    <Label className="text-slate-300 text-sm font-medium">Emergency Contact Phone</Label>
                    <Input 
                      className="bg-slate-700 border-slate-600 text-white placeholder-slate-400 h-12 mt-2" 
                      value={tenantData.emergencyContactPhone}
                      onChange={(e) => handleInputChange('emergencyContactPhone', e.target.value)}
                      placeholder="(555) 123-4567" 
                    />
                  </div>
                  <div>
                    <Label className="text-slate-300 text-sm font-medium">Internal Notes (Admin Only)</Label>
                    <Textarea 
                      className="bg-slate-700 border-slate-600 text-white placeholder-slate-400 mt-2" 
                      rows={4} 
                      value={tenantData.internalNotes}
                      onChange={(e) => handleInputChange('internalNotes', e.target.value)}
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
                      <p className="text-white font-semibold">TEN-{tenantData.id.padStart(6, '0')}</p>
                    </div>
                    <div>
                      <p className="text-slate-400">Unit:</p>
                      <p className="text-white font-semibold">Unit {tenantData.unit}</p>
                    </div>
                    <div>
                      <p className="text-slate-400">Monthly Rent:</p>
                      <p className="text-white font-semibold">${tenantData.monthlyRent}</p>
                    </div>
                    <div>
                      <p className="text-slate-400">Lease Duration:</p>
                      <p className="text-white font-semibold">12 months</p>
                    </div>
                  </div>
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
              {currentStep < 4 ? (
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
                  <Save className="w-4 h-4 mr-2" />
                  Update Tenant
                </Button>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

