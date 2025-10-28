"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Switch } from '@/components/ui/switch'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  User,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Shield,
  Eye,
  EyeOff,
  Camera,
  Save,
  Edit,
  Check,
  X,
  Bell,
  Globe,
  Moon,
  Sun,
  Settings,
  Key,
  CreditCard,
  Home,
  AlertCircle,
  CheckCircle,
  Upload,
  Download,
  Trash2,
  Lock,
  Unlock
} from 'lucide-react'

export default function SettingsPage() {
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState('profile')
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [avatarModalOpen, setAvatarModalOpen] = useState(false)
  const [deleteAccountModalOpen, setDeleteAccountModalOpen] = useState(false)

  // Mock user data
  const [userData, setUserData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+254 700 123 456',
    dateOfBirth: '1990-05-15',
    address: '123 Sunset Apartments, Unit 101',
    city: 'Nairobi',
    country: 'Kenya',
    emergencyContact: {
      name: 'Jane Doe',
      phone: '+254 700 987 654',
      relationship: 'Sister'
    },
    preferences: {
      theme: 'dark',
      language: 'en',
      notifications: {
        email: true,
        sms: true,
        push: true,
        rentReminders: true,
        maintenanceUpdates: true,
        announcements: true
      },
      privacy: {
        profileVisibility: 'private',
        dataSharing: false,
        marketingEmails: false
      }
    }
  })

  const [formData, setFormData] = useState({
    firstName: userData.firstName,
    lastName: userData.lastName,
    email: userData.email,
    phone: userData.phone,
    dateOfBirth: userData.dateOfBirth,
    address: userData.address,
    city: userData.city,
    country: userData.country,
    emergencyContact: { ...userData.emergencyContact }
  })

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  const handleInputChange = (field: string, value: string) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.')
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent as keyof typeof prev],
          [child]: value
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }))
    }
  }

  const handlePasswordChange = (field: string, value: string) => {
    setPasswordData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handlePreferenceChange = (category: string, field: string, value: boolean) => {
    setUserData(prev => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        [category]: {
          ...prev.preferences[category as keyof typeof prev.preferences],
          [field]: value
        }
      }
    }))
  }

  const saveProfileChanges = () => {
    setUserData(prev => ({
      ...prev,
      ...formData
    }))
    alert('Profile updated successfully!')
  }

  const savePasswordChanges = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      alert('New passwords do not match!')
      return
    }
    if (passwordData.newPassword.length < 8) {
      alert('Password must be at least 8 characters long!')
      return
    }
    alert('Password updated successfully!')
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    })
  }

  const uploadAvatar = () => {
    alert('Avatar uploaded successfully!')
    setAvatarModalOpen(false)
  }

  const deleteAccount = () => {
    alert('Account deletion request submitted. You will receive an email confirmation.')
    setDeleteAccountModalOpen(false)
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
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Settings</h1>
          <p className="text-slate-400 mt-2">Manage your account settings and preferences</p>
        </div>
        <div className="flex items-center space-x-3">
          <Button 
            variant="outline" 
            className="border-red-500/50 text-red-400 hover:bg-red-500/10 hover:border-red-500 hover:text-red-300 transition-all duration-300"
            onClick={() => setDeleteAccountModalOpen(true)}
          >
            <Trash2 className="w-4 h-4 mr-2" />
            Delete Account
          </Button>
        </div>
      </div>

      {/* Profile Summary Card */}
      <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
        <CardContent className="p-6">
          <div className="flex items-center space-x-6">
            <div className="relative">
              <Avatar className="w-20 h-20">
                <AvatarImage src="" />
                <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                  {userData.firstName[0]}{userData.lastName[0]}
                </AvatarFallback>
              </Avatar>
              <Button
                size="sm"
                className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-blue-500 hover:bg-blue-600"
                onClick={() => setAvatarModalOpen(true)}
              >
                <Camera className="w-4 h-4 text-white" />
              </Button>
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-white">{userData.firstName} {userData.lastName}</h2>
              <p className="text-slate-400">{userData.email}</p>
              <p className="text-slate-400">{userData.phone}</p>
              <div className="flex items-center space-x-2 mt-2">
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Verified
                </Badge>
                <Badge className="bg-blue-500/20 text-blue-400 border-blue-500/30">
                  Unit 101
                </Badge>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm text-slate-400">Member since</p>
              <p className="text-white font-semibold">January 2023</p>
              <p className="text-sm text-slate-400 mt-2">Last updated</p>
              <p className="text-white font-semibold">2 days ago</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-slate-800/50 border border-slate-700/50 rounded-xl p-1">
          <TabsTrigger value="profile" className="text-slate-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white">
            Profile
          </TabsTrigger>
          <TabsTrigger value="security" className="text-slate-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white">
            Security
          </TabsTrigger>
          <TabsTrigger value="notifications" className="text-slate-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white">
            Notifications
          </TabsTrigger>
          <TabsTrigger value="privacy" className="text-slate-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white">
            Privacy
          </TabsTrigger>
          <TabsTrigger value="preferences" className="text-slate-300 data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-purple-600 data-[state=active]:text-white">
            Preferences
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Personal Information */}
            <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <User className="w-5 h-5 mr-2 text-blue-400" />
                  Personal Information
                </CardTitle>
                <CardDescription className="text-slate-400">Update your personal details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="text-slate-300 mb-2 block">First Name</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className="bg-slate-700/50 border-slate-600 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-slate-300 mb-2 block">Last Name</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className="bg-slate-700/50 border-slate-600 text-white"
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="email" className="text-slate-300 mb-2 block">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="bg-slate-700/50 border-slate-600 text-white"
                  />
                </div>

                <div>
                  <Label htmlFor="phone" className="text-slate-300 mb-2 block">Phone Number</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="bg-slate-700/50 border-slate-600 text-white"
                  />
                </div>

                <div>
                  <Label htmlFor="dateOfBirth" className="text-slate-300 mb-2 block">Date of Birth</Label>
                  <Input
                    id="dateOfBirth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                    className="bg-slate-700/50 border-slate-600 text-white"
                  />
                </div>

                <Button 
                  onClick={saveProfileChanges}
                  className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </CardContent>
            </Card>

            {/* Address Information */}
            <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-green-400" />
                  Address Information
                </CardTitle>
                <CardDescription className="text-slate-400">Update your address details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="address" className="text-slate-300 mb-2 block">Street Address</Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange('address', e.target.value)}
                    rows={3}
                    className="bg-slate-700/50 border-slate-600 text-white resize-none"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city" className="text-slate-300 mb-2 block">City</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => handleInputChange('city', e.target.value)}
                      className="bg-slate-700/50 border-slate-600 text-white"
                    />
                  </div>
                  <div>
                    <Label htmlFor="country" className="text-slate-300 mb-2 block">Country</Label>
                    <Input
                      id="country"
                      value={formData.country}
                      onChange={(e) => handleInputChange('country', e.target.value)}
                      className="bg-slate-700/50 border-slate-600 text-white"
                    />
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-700">
                  <h4 className="text-white font-semibold mb-3 flex items-center">
                    <Phone className="w-4 h-4 mr-2 text-yellow-400" />
                    Emergency Contact
                  </h4>
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="emergencyName" className="text-slate-300 mb-2 block">Contact Name</Label>
                      <Input
                        id="emergencyName"
                        value={formData.emergencyContact.name}
                        onChange={(e) => handleInputChange('emergencyContact.name', e.target.value)}
                        className="bg-slate-700/50 border-slate-600 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="emergencyPhone" className="text-slate-300 mb-2 block">Phone Number</Label>
                      <Input
                        id="emergencyPhone"
                        value={formData.emergencyContact.phone}
                        onChange={(e) => handleInputChange('emergencyContact.phone', e.target.value)}
                        className="bg-slate-700/50 border-slate-600 text-white"
                      />
                    </div>
                    <div>
                      <Label htmlFor="emergencyRelationship" className="text-slate-300 mb-2 block">Relationship</Label>
                      <Input
                        id="emergencyRelationship"
                        value={formData.emergencyContact.relationship}
                        onChange={(e) => handleInputChange('emergencyContact.relationship', e.target.value)}
                        className="bg-slate-700/50 border-slate-600 text-white"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Security Tab */}
        <TabsContent value="security" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Password Change */}
            <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Key className="w-5 h-5 mr-2 text-red-400" />
                  Change Password
                </CardTitle>
                <CardDescription className="text-slate-400">Update your account password</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="currentPassword" className="text-slate-300 mb-2 block">Current Password</Label>
                  <div className="relative">
                    <Input
                      id="currentPassword"
                      type={showCurrentPassword ? 'text' : 'password'}
                      value={passwordData.currentPassword}
                      onChange={(e) => handlePasswordChange('currentPassword', e.target.value)}
                      className="bg-slate-700/50 border-slate-600 text-white pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 text-slate-400 hover:text-white"
                      onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    >
                      {showCurrentPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="newPassword" className="text-slate-300 mb-2 block">New Password</Label>
                  <div className="relative">
                    <Input
                      id="newPassword"
                      type={showNewPassword ? 'text' : 'password'}
                      value={passwordData.newPassword}
                      onChange={(e) => handlePasswordChange('newPassword', e.target.value)}
                      className="bg-slate-700/50 border-slate-600 text-white pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 text-slate-400 hover:text-white"
                      onClick={() => setShowNewPassword(!showNewPassword)}
                    >
                      {showNewPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>

                <div>
                  <Label htmlFor="confirmPassword" className="text-slate-300 mb-2 block">Confirm New Password</Label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      value={passwordData.confirmPassword}
                      onChange={(e) => handlePasswordChange('confirmPassword', e.target.value)}
                      className="bg-slate-700/50 border-slate-600 text-white pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 text-slate-400 hover:text-white"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    >
                      {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </Button>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-slate-700/30 border border-slate-600/50">
                  <div className="flex items-start space-x-2">
                    <AlertCircle className="w-4 h-4 text-blue-400 mt-0.5 flex-shrink-0" />
                    <div className="text-xs text-slate-400">
                      <p className="font-medium mb-1">Password requirements:</p>
                      <ul className="space-y-1">
                        <li>• At least 8 characters long</li>
                        <li>• Contains uppercase and lowercase letters</li>
                        <li>• Contains at least one number</li>
                        <li>• Contains at least one special character</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <Button 
                  onClick={savePasswordChanges}
                  className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:from-red-600 hover:to-orange-600 text-white"
                >
                  <Shield className="w-4 h-4 mr-2" />
                  Update Password
                </Button>
              </CardContent>
            </Card>

            {/* Security Settings */}
            <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Shield className="w-5 h-5 mr-2 text-green-400" />
                  Security Settings
                </CardTitle>
                <CardDescription className="text-slate-400">Manage your account security</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-700/30 border border-slate-600/50">
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-blue-400" />
                      <div>
                        <p className="text-white font-medium">Two-Factor Authentication</p>
                        <p className="text-sm text-slate-400">Add an extra layer of security</p>
                      </div>
                    </div>
                    <Switch defaultChecked={false} className="data-[state=checked]:bg-blue-500" />
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-700/30 border border-slate-600/50">
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-green-400" />
                      <div>
                        <p className="text-white font-medium">SMS Verification</p>
                        <p className="text-sm text-slate-400">Verify login attempts via SMS</p>
                      </div>
                    </div>
                    <Switch defaultChecked={true} className="data-[state=checked]:bg-green-500" />
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-700/30 border border-slate-600/50">
                    <div className="flex items-center space-x-3">
                      <Lock className="w-5 h-5 text-purple-400" />
                      <div>
                        <p className="text-white font-medium">Login Notifications</p>
                        <p className="text-sm text-slate-400">Get notified of new logins</p>
                      </div>
                    </div>
                    <Switch defaultChecked={true} className="data-[state=checked]:bg-purple-500" />
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-700">
                  <h4 className="text-white font-semibold mb-3">Recent Activity</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-400">Login from Chrome</span>
                      <span className="text-slate-500">2 hours ago</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-400">Password changed</span>
                      <span className="text-slate-500">1 week ago</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-400">Profile updated</span>
                      <span className="text-slate-500">2 weeks ago</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications" className="space-y-6">
          <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Bell className="w-5 h-5 mr-2 text-yellow-400" />
                Notification Preferences
              </CardTitle>
              <CardDescription className="text-slate-400">Choose how you want to be notified</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Notification Channels */}
              <div className="space-y-4">
                <h3 className="text-white font-semibold">Notification Channels</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-700/30 border border-slate-600/50">
                    <div className="flex items-center space-x-3">
                      <Mail className="w-5 h-5 text-blue-400" />
                      <div>
                        <p className="text-white font-medium">Email Notifications</p>
                        <p className="text-sm text-slate-400">Receive notifications via email</p>
                      </div>
                    </div>
                    <Switch 
                      checked={userData.preferences.notifications.email}
                      onCheckedChange={(checked) => handlePreferenceChange('notifications', 'email', checked)}
                      className="data-[state=checked]:bg-blue-500" 
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-700/30 border border-slate-600/50">
                    <div className="flex items-center space-x-3">
                      <Phone className="w-5 h-5 text-green-400" />
                      <div>
                        <p className="text-white font-medium">SMS Notifications</p>
                        <p className="text-sm text-slate-400">Receive notifications via SMS</p>
                      </div>
                    </div>
                    <Switch 
                      checked={userData.preferences.notifications.sms}
                      onCheckedChange={(checked) => handlePreferenceChange('notifications', 'sms', checked)}
                      className="data-[state=checked]:bg-green-500" 
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-700/30 border border-slate-600/50">
                    <div className="flex items-center space-x-3">
                      <Bell className="w-5 h-5 text-purple-400" />
                      <div>
                        <p className="text-white font-medium">Push Notifications</p>
                        <p className="text-sm text-slate-400">Receive push notifications</p>
                      </div>
                    </div>
                    <Switch 
                      checked={userData.preferences.notifications.push}
                      onCheckedChange={(checked) => handlePreferenceChange('notifications', 'push', checked)}
                      className="data-[state=checked]:bg-purple-500" 
                    />
                  </div>
                </div>
              </div>

              {/* Notification Types */}
              <div className="space-y-4">
                <h3 className="text-white font-semibold">Notification Types</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-700/30 border border-slate-600/50">
                    <div className="flex items-center space-x-3">
                      <CreditCard className="w-5 h-5 text-red-400" />
                      <div>
                        <p className="text-white font-medium">Rent Reminders</p>
                        <p className="text-sm text-slate-400">Get reminded about upcoming rent payments</p>
                      </div>
                    </div>
                    <Switch 
                      checked={userData.preferences.notifications.rentReminders}
                      onCheckedChange={(checked) => handlePreferenceChange('notifications', 'rentReminders', checked)}
                      className="data-[state=checked]:bg-red-500" 
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-700/30 border border-slate-600/50">
                    <div className="flex items-center space-x-3">
                      <Home className="w-5 h-5 text-blue-400" />
                      <div>
                        <p className="text-white font-medium">Maintenance Updates</p>
                        <p className="text-sm text-slate-400">Updates about maintenance requests</p>
                      </div>
                    </div>
                    <Switch 
                      checked={userData.preferences.notifications.maintenanceUpdates}
                      onCheckedChange={(checked) => handlePreferenceChange('notifications', 'maintenanceUpdates', checked)}
                      className="data-[state=checked]:bg-blue-500" 
                    />
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-700/30 border border-slate-600/50">
                    <div className="flex items-center space-x-3">
                      <AlertCircle className="w-5 h-5 text-yellow-400" />
                      <div>
                        <p className="text-white font-medium">Announcements</p>
                        <p className="text-sm text-slate-400">Important property announcements</p>
                      </div>
                    </div>
                    <Switch 
                      checked={userData.preferences.notifications.announcements}
                      onCheckedChange={(checked) => handlePreferenceChange('notifications', 'announcements', checked)}
                      className="data-[state=checked]:bg-yellow-500" 
                    />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Privacy Tab */}
        <TabsContent value="privacy" className="space-y-6">
          <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center">
                <Lock className="w-5 h-5 mr-2 text-purple-400" />
                Privacy Settings
              </CardTitle>
              <CardDescription className="text-slate-400">Control your privacy and data sharing</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-700/30 border border-slate-600/50">
                  <div className="flex items-center space-x-3">
                    <User className="w-5 h-5 text-blue-400" />
                    <div>
                      <p className="text-white font-medium">Profile Visibility</p>
                      <p className="text-sm text-slate-400">Control who can see your profile</p>
                    </div>
                  </div>
                  <select
                    value={userData.preferences.privacy.profileVisibility}
                    onChange={(e) => setUserData(prev => ({
                      ...prev,
                      preferences: {
                        ...prev.preferences,
                        privacy: {
                          ...prev.preferences.privacy,
                          profileVisibility: e.target.value
                        }
                      }
                    }))}
                    className="bg-slate-700/50 border border-slate-600 text-white rounded-lg px-3 py-2 text-sm"
                  >
                    <option value="private">Private</option>
                    <option value="public">Public</option>
                    <option value="friends">Friends Only</option>
                  </select>
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-700/30 border border-slate-600/50">
                  <div className="flex items-center space-x-3">
                    <Globe className="w-5 h-5 text-green-400" />
                    <div>
                      <p className="text-white font-medium">Data Sharing</p>
                      <p className="text-sm text-slate-400">Allow data sharing with third parties</p>
                    </div>
                  </div>
                  <Switch 
                    checked={userData.preferences.privacy.dataSharing}
                    onCheckedChange={(checked) => handlePreferenceChange('privacy', 'dataSharing', checked)}
                    className="data-[state=checked]:bg-green-500" 
                  />
                </div>

                <div className="flex items-center justify-between p-3 rounded-lg bg-slate-700/30 border border-slate-600/50">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-purple-400" />
                    <div>
                      <p className="text-white font-medium">Marketing Emails</p>
                      <p className="text-sm text-slate-400">Receive promotional emails</p>
                    </div>
                  </div>
                  <Switch 
                    checked={userData.preferences.privacy.marketingEmails}
                    onCheckedChange={(checked) => handlePreferenceChange('privacy', 'marketingEmails', checked)}
                    className="data-[state=checked]:bg-purple-500" 
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-700">
                <h4 className="text-white font-semibold mb-3">Data Management</h4>
                <div className="space-y-3">
                  <Button variant="outline" className="w-full border-slate-600 text-slate-300 hover:bg-slate-700">
                    <Download className="w-4 h-4 mr-2" />
                    Download My Data
                  </Button>
                  <Button variant="outline" className="w-full border-red-500/50 text-red-400 hover:bg-red-500/10">
                    <Trash2 className="w-4 h-4 mr-2" />
                    Clear All Data
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Preferences Tab */}
        <TabsContent value="preferences" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Appearance */}
            <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Sun className="w-5 h-5 mr-2 text-yellow-400" />
                  Appearance
                </CardTitle>
                <CardDescription className="text-slate-400">Customize your interface</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-700/30 border border-slate-600/50">
                    <div className="flex items-center space-x-3">
                      <Moon className="w-5 h-5 text-blue-400" />
                      <div>
                        <p className="text-white font-medium">Dark Mode</p>
                        <p className="text-sm text-slate-400">Use dark theme</p>
                      </div>
                    </div>
                    <Switch defaultChecked className="data-[state=checked]:bg-blue-500" />
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg bg-slate-700/30 border border-slate-600/50">
                    <div className="flex items-center space-x-3">
                      <Sun className="w-5 h-5 text-yellow-400" />
                      <div>
                        <p className="text-white font-medium">Light Mode</p>
                        <p className="text-sm text-slate-400">Use light theme</p>
                      </div>
                    </div>
                    <Switch defaultChecked={false} className="data-[state=checked]:bg-yellow-500" />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Language & Region */}
            <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <Globe className="w-5 h-5 mr-2 text-green-400" />
                  Language & Region
                </CardTitle>
                <CardDescription className="text-slate-400">Set your language and region preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="language" className="text-slate-300 mb-2 block">Language</Label>
                  <select
                    id="language"
                    value={userData.preferences.language}
                    onChange={(e) => setUserData(prev => ({
                      ...prev,
                      preferences: {
                        ...prev.preferences,
                        language: e.target.value
                      }
                    }))}
                    className="w-full bg-slate-700/50 border border-slate-600 text-white rounded-lg px-3 py-2"
                  >
                    <option value="en">English</option>
                    <option value="sw">Swahili</option>
                    <option value="fr">French</option>
                    <option value="es">Spanish</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="timezone" className="text-slate-300 mb-2 block">Timezone</Label>
                  <select
                    id="timezone"
                    className="w-full bg-slate-700/50 border border-slate-600 text-white rounded-lg px-3 py-2"
                  >
                    <option value="EAT">East Africa Time (EAT)</option>
                    <option value="UTC">UTC</option>
                    <option value="GMT">GMT</option>
                  </select>
                </div>

                <div>
                  <Label htmlFor="dateFormat" className="text-slate-300 mb-2 block">Date Format</Label>
                  <select
                    id="dateFormat"
                    className="w-full bg-slate-700/50 border border-slate-600 text-white rounded-lg px-3 py-2"
                  >
                    <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                    <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                    <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                  </select>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>

      {/* Avatar Upload Modal */}
      <Dialog open={avatarModalOpen} onOpenChange={setAvatarModalOpen}>
        <DialogContent className="bg-slate-800 border-slate-700 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white text-2xl flex items-center">
              <Camera className="w-6 h-6 mr-2 text-blue-400" />
              Update Profile Picture
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              Upload a new profile picture
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div className="text-center">
              <Avatar className="w-24 h-24 mx-auto mb-4">
                <AvatarImage src="" />
                <AvatarFallback className="text-3xl font-bold bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                  {userData.firstName[0]}{userData.lastName[0]}
                </AvatarFallback>
              </Avatar>
            </div>

            <div className="border-2 border-dashed border-slate-600 rounded-lg p-6 text-center">
              <Upload className="w-8 h-8 mx-auto text-slate-400 mb-2" />
              <p className="text-slate-400 text-sm">Click to upload or drag and drop</p>
              <p className="text-slate-500 text-xs mt-1">JPG, PNG up to 5MB</p>
            </div>

            <div className="flex space-x-3">
              <Button
                variant="outline"
                className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700"
                onClick={() => setAvatarModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
                onClick={uploadAvatar}
              >
                <Upload className="w-4 h-4 mr-2" />
                Upload
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Delete Account Modal */}
      <Dialog open={deleteAccountModalOpen} onOpenChange={setDeleteAccountModalOpen}>
        <DialogContent className="bg-slate-800 border-slate-700 max-w-md">
          <DialogHeader>
            <DialogTitle className="text-white text-2xl flex items-center">
              <AlertCircle className="w-6 h-6 mr-2 text-red-400" />
              Delete Account
            </DialogTitle>
            <DialogDescription className="text-slate-400">
              This action cannot be undone. All your data will be permanently deleted.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 mt-4">
            <div className="p-4 rounded-lg bg-red-500/10 border border-red-500/30">
              <div className="flex items-start space-x-2">
                <AlertCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                <div className="text-sm text-red-400">
                  <p className="font-medium mb-1">Warning:</p>
                  <ul className="space-y-1">
                    <li>• All your lease data will be deleted</li>
                    <li>• Payment history will be removed</li>
                    <li>• Maintenance requests will be archived</li>
                    <li>• This action is irreversible</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <Label htmlFor="confirmText" className="text-slate-300 mb-2 block">
                Type "DELETE" to confirm
              </Label>
              <Input
                id="confirmText"
                placeholder="DELETE"
                className="bg-slate-700/50 border-slate-600 text-white placeholder-slate-400"
              />
            </div>

            <div className="flex space-x-3">
              <Button
                variant="outline"
                className="flex-1 border-slate-600 text-slate-300 hover:bg-slate-700"
                onClick={() => setDeleteAccountModalOpen(false)}
              >
                Cancel
              </Button>
              <Button
                className="flex-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white"
                onClick={deleteAccount}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Account
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}
