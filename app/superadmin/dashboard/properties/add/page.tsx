"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, Save, X } from 'lucide-react'

// Mock data
const propertyTypes = ['Apartment', 'Villa', 'Commercial', 'Townhouse', 'Studio']
const subscriptionPlans = ['Basic', 'Pro', 'Enterprise']
const statusOptions = ['Active', 'Suspended', 'Under Maintenance']
const locations = ['New York', 'Los Angeles', 'Chicago', 'Miami', 'San Francisco']
const admins = [
  { id: 1, name: 'Sarah Johnson', email: 'sarah@havenly.com' },
  { id: 2, name: 'Mike Wilson', email: 'mike@havenly.com' },
  { id: 3, name: 'Emily Davis', email: 'emily@havenly.com' },
  { id: 4, name: 'David Brown', email: 'david@havenly.com' }
]

export default function AddPropertyPage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    address: '',
    description: '',
    units: '',
    bedrooms: '',
    bathrooms: '',
    squareFootage: '',
    yearBuilt: '',
    status: 'Active',
    plan: '',
    admin: '',
    customDomain: '',
    billingEmail: '',
    rentRange: '',
    securityDeposit: '',
    propertyValue: '',
    tags: ''
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission here
    console.log('Form submitted:', formData)
    router.push('/superadmin/dashboard/properties')
  }

  return (
    <div className="min-h-screen bg-slate-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              onClick={() => router.back()}
              className="text-slate-400 hover:text-white hover:bg-slate-800 px-4 py-2 rounded-lg transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-blue-400">Add New Property</h1>
              <p className="text-slate-400 mt-2">Create a new property and assign it to a property admin</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information Section */}
          <Card className="bg-slate-800 border-slate-700 border-2 border-blue-500/20 shadow-xl">
            <CardHeader className="pb-6">
              <CardTitle className="text-xl font-semibold text-blue-400 flex items-center">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                Basic Information
              </CardTitle>
              <p className="text-sm text-slate-400 mt-2">Essential details about the property</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <Label className="text-slate-300 font-medium text-sm">Property Name *</Label>
                  <Input 
                    className="bg-slate-700 border-slate-600 text-white h-11 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors" 
                    placeholder="Enter property name"
                    value={formData.name}
                    onChange={(e) => handleInputChange('name', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-3">
                  <Label className="text-slate-300 font-medium text-sm">Property Type *</Label>
                  <Select value={formData.type} onValueChange={(value) => handleInputChange('type', value)}>
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white h-11 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors">
                      <SelectValue placeholder="Select property type" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      {propertyTypes.map(type => (
                        <SelectItem key={type} value={type} className="text-white hover:bg-slate-600">{type}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-3">
                  <Label className="text-slate-300 font-medium text-sm">Subscription Plan *</Label>
                  <Select value={formData.plan} onValueChange={(value) => handleInputChange('plan', value)}>
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white h-11 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors">
                      <SelectValue placeholder="Select plan" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      {subscriptionPlans.map(plan => (
                        <SelectItem key={plan} value={plan} className="text-white hover:bg-slate-600">{plan}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-3">
                <Label className="text-slate-300 font-medium text-sm">Full Address *</Label>
                <Input 
                  className="bg-slate-700 border-slate-600 text-white h-11 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors" 
                  placeholder="Enter complete address including street, city, state, zip code"
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-3">
                <Label className="text-slate-300 font-medium text-sm">Property Description *</Label>
                <Textarea 
                  className="bg-slate-700 border-slate-600 text-white min-h-20 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors resize-none" 
                  placeholder="Describe the property's purpose and focus"
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  required
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label className="text-slate-300 font-medium text-sm">Custom Domain</Label>
                  <Input 
                    className="bg-slate-700 border-slate-600 text-white h-11 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors" 
                    placeholder="property.havenly.com"
                    value={formData.customDomain}
                    onChange={(e) => handleInputChange('customDomain', e.target.value)}
                  />
                </div>
                <div className="space-y-3">
                  <Label className="text-slate-300 font-medium text-sm">Billing Email</Label>
                  <Input 
                    className="bg-slate-700 border-slate-600 text-white h-11 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors" 
                    placeholder="billing@property.com"
                    value={formData.billingEmail}
                    onChange={(e) => handleInputChange('billingEmail', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Property Details Section */}
          <Card className="bg-slate-800 border-slate-700 border-2 border-blue-500/20 shadow-xl">
            <CardHeader className="pb-6">
              <CardTitle className="text-xl font-semibold text-blue-400 flex items-center">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                Property Details
              </CardTitle>
              <p className="text-sm text-slate-400 mt-2">Configure property specifications and limits</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
                <div className="space-y-3">
                  <Label className="text-slate-300 font-medium text-sm">Total Units *</Label>
                  <Input 
                    type="number" 
                    className="bg-slate-700 border-slate-600 text-white h-11 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors" 
                    placeholder="Number of units"
                    value={formData.units}
                    onChange={(e) => handleInputChange('units', e.target.value)}
                    required
                  />
                </div>
                <div className="space-y-3">
                  <Label className="text-slate-300 font-medium text-sm">Bedrooms per Unit</Label>
                  <Input 
                    type="number" 
                    className="bg-slate-700 border-slate-600 text-white h-11 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors" 
                    placeholder="Average bedrooms"
                    value={formData.bedrooms}
                    onChange={(e) => handleInputChange('bedrooms', e.target.value)}
                  />
                </div>
                <div className="space-y-3">
                  <Label className="text-slate-300 font-medium text-sm">Bathrooms per Unit</Label>
                  <Input 
                    type="number" 
                    className="bg-slate-700 border-slate-600 text-white h-11 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors" 
                    placeholder="Average bathrooms"
                    value={formData.bathrooms}
                    onChange={(e) => handleInputChange('bathrooms', e.target.value)}
                  />
                </div>
                <div className="space-y-3">
                  <Label className="text-slate-300 font-medium text-sm">Square Footage</Label>
                  <Input 
                    type="number" 
                    className="bg-slate-700 border-slate-600 text-white h-11 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors" 
                    placeholder="Total square footage"
                    value={formData.squareFootage}
                    onChange={(e) => handleInputChange('squareFootage', e.target.value)}
                  />
                </div>
                <div className="space-y-3">
                  <Label className="text-slate-300 font-medium text-sm">Year Built</Label>
                  <Input 
                    type="number" 
                    className="bg-slate-700 border-slate-600 text-white h-11 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors" 
                    placeholder="Construction year"
                    value={formData.yearBuilt}
                    onChange={(e) => handleInputChange('yearBuilt', e.target.value)}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <Label className="text-slate-300 font-medium text-sm">Property Status *</Label>
                  <Select value={formData.status} onValueChange={(value) => handleInputChange('status', value)}>
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white h-11 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      {statusOptions.map(status => (
                        <SelectItem key={status} value={status.toLowerCase().replace(' ', '-')} className="text-white hover:bg-slate-600">{status}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-3">
                  <Label className="text-slate-300 font-medium text-sm">Property Tags</Label>
                  <Input 
                    className="bg-slate-700 border-slate-600 text-white h-11 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors" 
                    placeholder="e.g., luxury, pet-friendly, furnished"
                    value={formData.tags}
                    onChange={(e) => handleInputChange('tags', e.target.value)}
                  />
                </div>
                <div className="space-y-3">
                  <Label className="text-slate-300 font-medium text-sm">Assign Admin *</Label>
                  <Select value={formData.admin} onValueChange={(value) => handleInputChange('admin', value)}>
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white h-11 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors">
                      <SelectValue placeholder="Select admin" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      {admins.map(admin => (
                        <SelectItem key={admin.id} value={admin.id.toString()} className="text-white hover:bg-slate-600">{admin.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Financial Information Section */}
          <Card className="bg-slate-800 border-slate-700 border-2 border-blue-500/20 shadow-xl">
            <CardHeader className="pb-6">
              <CardTitle className="text-xl font-semibold text-blue-400 flex items-center">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                Financial Information
              </CardTitle>
              <p className="text-sm text-slate-400 mt-2">Configure pricing and financial details</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <Label className="text-slate-300 font-medium text-sm">Monthly Rent Range</Label>
                  <Input 
                    className="bg-slate-700 border-slate-600 text-white h-11 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors" 
                    placeholder="e.g., $800 - $1200"
                    value={formData.rentRange}
                    onChange={(e) => handleInputChange('rentRange', e.target.value)}
                  />
                </div>
                <div className="space-y-3">
                  <Label className="text-slate-300 font-medium text-sm">Security Deposit</Label>
                  <Input 
                    className="bg-slate-700 border-slate-600 text-white h-11 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors" 
                    placeholder="Amount"
                    value={formData.securityDeposit}
                    onChange={(e) => handleInputChange('securityDeposit', e.target.value)}
                  />
                </div>
                <div className="space-y-3">
                  <Label className="text-slate-300 font-medium text-sm">Property Value</Label>
                  <Input 
                    className="bg-slate-700 border-slate-600 text-white h-11 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors" 
                    placeholder="Total property value"
                    value={formData.propertyValue}
                    onChange={(e) => handleInputChange('propertyValue', e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Form Actions */}
          <div className="flex items-center justify-end space-x-4 pt-8 border-t border-slate-700">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              className="h-12 px-8 border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
            >
              <X className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button
              type="submit"
              className="h-12 px-8 bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
            >
              <Save className="w-4 h-4 mr-2" />
              Create Property
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
