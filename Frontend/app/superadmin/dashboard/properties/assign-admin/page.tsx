"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { ArrowLeft, Save, UserPlus, Users, Building } from 'lucide-react'

// Mock data for existing admins
const existingAdmins = [
  { id: 1, name: 'Sarah Johnson', email: 'sarah@havenly.com', phone: '+1 (555) 123-4567', status: 'Active' },
  { id: 2, name: 'Mike Wilson', email: 'mike@havenly.com', phone: '+1 (555) 234-5678', status: 'Active' },
  { id: 3, name: 'Emily Davis', email: 'emily@havenly.com', phone: '+1 (555) 345-6789', status: 'Active' },
  { id: 4, name: 'David Brown', email: 'david@havenly.com', phone: '+1 (555) 456-7890', status: 'Active' },
  { id: 5, name: 'Lisa Chen', email: 'lisa@havenly.com', phone: '+1 (555) 567-8901', status: 'Suspended' }
]

const propertyTypes = ['Apartment', 'Villa', 'Commercial', 'Townhouse', 'Studio']
const adminRoles = ['Property Manager', 'Building Supervisor', 'Maintenance Coordinator', 'Leasing Agent']

export default function AssignAdminPage() {
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [assignmentType, setAssignmentType] = useState('existing') // 'existing' or 'new'
  const [selectedAdmin, setSelectedAdmin] = useState('')
  const [formData, setFormData] = useState({
    // For existing admin assignment
    adminId: '',
    
    // For new admin creation
    name: '',
    email: '',
    phone: '',
    role: '',
    department: '',
    experience: '',
    bio: '',
    emergencyContact: '',
    emergencyPhone: '',
    startDate: '',
    salary: '',
    benefits: '',
    notes: ''
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
    if (assignmentType === 'existing') {
      console.log('Assigning existing admin:', selectedAdmin)
    } else {
      console.log('Creating new admin:', formData)
    }
    router.push('/superadmin/dashboard/properties')
  }

  return (
    <div className="min-h-screen bg-slate-900 p-6">
      <div className="max-w-6xl mx-auto">
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
              <h1 className="text-3xl font-bold text-blue-400">Assign Property Admin</h1>
              <p className="text-slate-400 mt-2">Assign an existing admin or create a new one for this property</p>
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Assignment Type Selection */}
          <Card className="bg-slate-800 border-slate-700 border-2 border-blue-500/20 shadow-xl">
            <CardHeader className="pb-6">
              <CardTitle className="text-xl font-semibold text-blue-400 flex items-center">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                Assignment Type
              </CardTitle>
              <p className="text-sm text-slate-400 mt-2">Choose how you want to assign an admin to this property</p>
            </CardHeader>
            <CardContent>
              <RadioGroup value={assignmentType} onValueChange={setAssignmentType} className="space-y-4">
                <div className="flex items-center space-x-3 p-4 border border-slate-600 rounded-lg hover:bg-slate-700/50 transition-colors">
                  <RadioGroupItem value="existing" id="existing" />
                  <Label htmlFor="existing" className="flex items-center space-x-3 cursor-pointer">
                    <Users className="w-5 h-5 text-blue-400" />
                    <div>
                      <div className="text-white font-medium">Assign Existing Admin</div>
                      <div className="text-sm text-slate-400">Select from current property administrators</div>
                    </div>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-4 border border-slate-600 rounded-lg hover:bg-slate-700/50 transition-colors">
                  <RadioGroupItem value="new" id="new" />
                  <Label htmlFor="new" className="flex items-center space-x-3 cursor-pointer">
                    <UserPlus className="w-5 h-5 text-emerald-400" />
                    <div>
                      <div className="text-white font-medium">Create New Admin</div>
                      <div className="text-sm text-slate-400">Create a new property administrator</div>
                    </div>
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          {/* Existing Admin Selection */}
          {assignmentType === 'existing' && (
            <Card className="bg-slate-800 border-slate-700 border-2 border-blue-500/20 shadow-xl">
              <CardHeader className="pb-6">
                <CardTitle className="text-xl font-semibold text-blue-400 flex items-center">
                  <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                  Select Existing Admin
                </CardTitle>
                <p className="text-sm text-slate-400 mt-2">Choose from available property administrators</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <Label className="text-slate-300 font-medium text-sm">Select Admin *</Label>
                  <Select value={selectedAdmin} onValueChange={setSelectedAdmin}>
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white h-11 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors">
                      <SelectValue placeholder="Choose an admin to assign" />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      {existingAdmins.map(admin => (
                        <SelectItem key={admin.id} value={admin.id.toString()} className="text-white hover:bg-slate-600">
                          <div className="flex flex-col">
                            <span className="font-medium">{admin.name}</span>
                            <span className="text-xs text-slate-400">{admin.email} • {admin.status}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {selectedAdmin && (
                  <div className="p-4 bg-slate-700/50 rounded-lg border border-slate-600">
                    <h4 className="text-white font-medium mb-2">Selected Admin Details</h4>
                    {(() => {
                      const admin = existingAdmins.find(a => a.id.toString() === selectedAdmin)
                      return admin ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                          <div>
                            <span className="text-slate-400">Name:</span>
                            <span className="text-white ml-2">{admin.name}</span>
                          </div>
                          <div>
                            <span className="text-slate-400">Email:</span>
                            <span className="text-white ml-2">{admin.email}</span>
                          </div>
                          <div>
                            <span className="text-slate-400">Phone:</span>
                            <span className="text-white ml-2">{admin.phone}</span>
                          </div>
                          <div>
                            <span className="text-slate-400">Status:</span>
                            <span className={`ml-2 ${admin.status === 'Active' ? 'text-emerald-400' : 'text-red-400'}`}>
                              {admin.status}
                            </span>
                          </div>
                        </div>
                      ) : null
                    })()}
                  </div>
                )}
              </CardContent>
            </Card>
          )}

          {/* New Admin Creation Form */}
          {assignmentType === 'new' && (
            <>
              {/* Basic Information */}
              <Card className="bg-slate-800 border-slate-700 border-2 border-blue-500/20 shadow-xl">
                <CardHeader className="pb-6">
                  <CardTitle className="text-xl font-semibold text-blue-400 flex items-center">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                    Basic Information
                  </CardTitle>
                  <p className="text-sm text-slate-400 mt-2">Personal details of the new admin</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label className="text-slate-300 font-medium text-sm">Full Name *</Label>
                      <Input 
                        className="bg-slate-700 border-slate-600 text-white h-11 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors" 
                        placeholder="Enter full name"
                        value={formData.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-3">
                      <Label className="text-slate-300 font-medium text-sm">Email Address *</Label>
                      <Input 
                        type="email"
                        className="bg-slate-700 border-slate-600 text-white h-11 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors" 
                        placeholder="admin@example.com"
                        value={formData.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label className="text-slate-300 font-medium text-sm">Phone Number *</Label>
                      <Input 
                        className="bg-slate-700 border-slate-600 text-white h-11 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors" 
                        placeholder="+1 (555) 123-4567"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        required
                      />
                    </div>
                    <div className="space-y-3">
                      <Label className="text-slate-300 font-medium text-sm">Role *</Label>
                      <Select value={formData.role} onValueChange={(value) => handleInputChange('role', value)}>
                        <SelectTrigger className="bg-slate-700 border-slate-600 text-white h-11 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent className="bg-slate-700 border-slate-600">
                          {adminRoles.map(role => (
                            <SelectItem key={role} value={role} className="text-white hover:bg-slate-600">{role}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-slate-300 font-medium text-sm">Department</Label>
                    <Input 
                      className="bg-slate-700 border-slate-600 text-white h-11 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors" 
                      placeholder="Property Management, Operations, etc."
                      value={formData.department}
                      onChange={(e) => handleInputChange('department', e.target.value)}
                    />
                  </div>

                  <div className="space-y-3">
                    <Label className="text-slate-300 font-medium text-sm">Bio/Description</Label>
                    <Textarea 
                      className="bg-slate-700 border-slate-600 text-white min-h-20 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors resize-none" 
                      placeholder="Brief description of the admin's background and responsibilities"
                      value={formData.bio}
                      onChange={(e) => handleInputChange('bio', e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Professional Details */}
              <Card className="bg-slate-800 border-slate-700 border-2 border-blue-500/20 shadow-xl">
                <CardHeader className="pb-6">
                  <CardTitle className="text-xl font-semibold text-blue-400 flex items-center">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                    Professional Details
                  </CardTitle>
                  <p className="text-sm text-slate-400 mt-2">Work experience and employment information</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label className="text-slate-300 font-medium text-sm">Years of Experience</Label>
                      <Input 
                        type="number"
                        className="bg-slate-700 border-slate-600 text-white h-11 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors" 
                        placeholder="5"
                        value={formData.experience}
                        onChange={(e) => handleInputChange('experience', e.target.value)}
                      />
                    </div>
                    <div className="space-y-3">
                      <Label className="text-slate-300 font-medium text-sm">Start Date *</Label>
                      <Input 
                        type="date"
                        className="bg-slate-700 border-slate-600 text-white h-11 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors" 
                        value={formData.startDate}
                        onChange={(e) => handleInputChange('startDate', e.target.value)}
                        required
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label className="text-slate-300 font-medium text-sm">Salary</Label>
                      <Input 
                        className="bg-slate-700 border-slate-600 text-white h-11 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors" 
                        placeholder="$50,000 - $70,000"
                        value={formData.salary}
                        onChange={(e) => handleInputChange('salary', e.target.value)}
                      />
                    </div>
                    <div className="space-y-3">
                      <Label className="text-slate-300 font-medium text-sm">Benefits</Label>
                      <Input 
                        className="bg-slate-700 border-slate-600 text-white h-11 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors" 
                        placeholder="Health insurance, 401k, etc."
                        value={formData.benefits}
                        onChange={(e) => handleInputChange('benefits', e.target.value)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Emergency Contact */}
              <Card className="bg-slate-800 border-slate-700 border-2 border-blue-500/20 shadow-xl">
                <CardHeader className="pb-6">
                  <CardTitle className="text-xl font-semibold text-blue-400 flex items-center">
                    <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                    Emergency Contact
                  </CardTitle>
                  <p className="text-sm text-slate-400 mt-2">Emergency contact information</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <Label className="text-slate-300 font-medium text-sm">Emergency Contact Name</Label>
                      <Input 
                        className="bg-slate-700 border-slate-600 text-white h-11 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors" 
                        placeholder="Emergency contact name"
                        value={formData.emergencyContact}
                        onChange={(e) => handleInputChange('emergencyContact', e.target.value)}
                      />
                    </div>
                    <div className="space-y-3">
                      <Label className="text-slate-300 font-medium text-sm">Emergency Contact Phone</Label>
                      <Input 
                        className="bg-slate-700 border-slate-600 text-white h-11 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors" 
                        placeholder="+1 (555) 123-4567"
                        value={formData.emergencyPhone}
                        onChange={(e) => handleInputChange('emergencyPhone', e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-3">
                    <Label className="text-slate-300 font-medium text-sm">Additional Notes</Label>
                    <Textarea 
                      className="bg-slate-700 border-slate-600 text-white min-h-16 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-colors resize-none" 
                      placeholder="Any additional notes or special instructions"
                      value={formData.notes}
                      onChange={(e) => handleInputChange('notes', e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>
            </>
          )}

          {/* Form Actions */}
          <div className="flex items-center justify-end space-x-4 pt-8 border-t border-slate-700">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              className="h-12 px-8 border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Cancel
            </Button>
            <Button
              type="submit"
              className="h-12 px-8 bg-blue-600 hover:bg-blue-700 text-white font-medium transition-colors"
            >
              <Building className="w-4 h-4 mr-2" />
              {assignmentType === 'existing' ? 'Assign Admin' : 'Create & Assign Admin'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
