"use client"

import { useState, useEffect } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Switch } from '@/components/ui/switch'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { 
  User, 
  Palette, 
  Bell, 
  Settings, 
  Shield, 
  Lock, 
  Upload, 
  Save, 
  LogOut, 
  Eye, 
  EyeOff, 
  Smartphone, 
  Monitor, 
  Globe, 
  Mail, 
  Phone,
  Calendar,
  Clock,
  CheckCircle,
  AlertTriangle,
  Edit,
  Trash2,
  Plus,
  Download,
  Upload as UploadIcon
} from 'lucide-react'

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('profile')
  const [mounted, setMounted] = useState(false)

  // Profile data
  const [profileData, setProfileData] = useState({
    fullName: 'Super Administrator',
    email: 'superadmin@havenly.com',
    phone: '+1 (555) 123-4567',
    bio: 'Platform administrator with full system access and management capabilities.',
    profilePicture: null
  })

  // Branding data
  const [brandingData, setBrandingData] = useState({
    companyLogo: null,
    favicon: null,
    platformName: 'Havenly Pro',
    tagline: 'Property Management Made Simple',
    primaryColor: '#3B82F6',
    secondaryColor: '#10B981',
    backgroundTheme: 'dark',
    accentTone: 'blue',
    fontFamily: 'Inter'
  })

  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    paymentReceived: true,
    newTenantAdded: true,
    propertySuspended: true,
    overdueRentReminder: true,
    emailNotifications: true,
    smsNotifications: false,
    whatsappAlerts: false
  })

  // System preferences
  const [systemPreferences, setSystemPreferences] = useState({
    defaultCurrency: 'USD',
    defaultRentCycle: 'monthly',
    defaultTimezone: 'America/New_York',
    dateFormat: 'MM/DD/YYYY',
    autoInvoiceGeneration: true,
    autoPaymentReminder: true,
    dataExport: true,
    backupFrequency: 'daily'
  })

  // Security settings
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorEnabled: false,
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  })

  // Mock data for roles
  const rolesData = [
    {
      id: 1,
      role: 'Super Admin',
      description: 'Full system access and management capabilities',
      permissions: ['All'],
      status: 'Active',
      users: 1
    },
    {
      id: 2,
      role: 'Property Admin',
      description: 'Manage assigned properties and tenants',
      permissions: ['Properties', 'Tenants', 'Billing'],
      status: 'Active',
      users: 4
    },
    {
      id: 3,
      role: 'Tenant',
      description: 'Access to personal rent information',
      permissions: ['View Own Data'],
      status: 'Active',
      users: 137
    }
  ]

  // Mock data for active sessions
  const activeSessions = [
    {
      id: 1,
      device: 'Chrome on Windows',
      location: 'New York, NY',
      ip: '192.168.1.100',
      lastActive: '2024-01-20 14:30',
      current: true
    },
    {
      id: 2,
      device: 'Safari on iPhone',
      location: 'New York, NY',
      ip: '192.168.1.101',
      lastActive: '2024-01-19 09:15',
      current: false
    }
  ]

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const handleProfileUpdate = (field: string, value: string) => {
    setProfileData(prev => ({ ...prev, [field]: value }))
  }

  const handleBrandingUpdate = (field: string, value: string) => {
    setBrandingData(prev => ({ ...prev, [field]: value }))
  }

  const handleNotificationToggle = (field: string) => {
    setNotificationSettings(prev => ({ ...prev, [field]: !prev[field as keyof typeof prev] }))
  }

  const handleSystemPreferenceUpdate = (field: string, value: string) => {
    setSystemPreferences(prev => ({ ...prev, [field]: value }))
  }

  const handleSecurityUpdate = (field: string, value: string) => {
    setSecuritySettings(prev => ({ ...prev, [field]: value }))
  }

  const getStatusBadge = (status: string) => {
    const colors = {
      'Active': 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
      'Restricted': 'bg-red-500/20 text-red-400 border-red-500/30',
    }
    return <Badge className={colors[status as keyof typeof colors]}>{status}</Badge>
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-blue-400">Settings & Profile</h1>
          <p className="text-slate-400 mt-2">Manage your account, platform appearance, and system-wide preferences.</p>
        </div>
      </div>

      {/* Settings Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="bg-slate-800 border-slate-700 grid grid-cols-6 w-full">
          <TabsTrigger 
            value="profile" 
            className="text-blue-400 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=inactive]:text-blue-400 data-[state=inactive]:hover:text-blue-300"
          >
            <User className="w-4 h-4 mr-2" />
            My Profile
          </TabsTrigger>
          <TabsTrigger 
            value="branding" 
            className="text-blue-400 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=inactive]:text-blue-400 data-[state=inactive]:hover:text-blue-300"
          >
            <Palette className="w-4 h-4 mr-2" />
            Branding
          </TabsTrigger>
          <TabsTrigger 
            value="notifications" 
            className="text-blue-400 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=inactive]:text-blue-400 data-[state=inactive]:hover:text-blue-300"
          >
            <Bell className="w-4 h-4 mr-2" />
            Notifications
          </TabsTrigger>
          <TabsTrigger 
            value="preferences" 
            className="text-blue-400 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=inactive]:text-blue-400 data-[state=inactive]:hover:text-blue-300"
          >
            <Settings className="w-4 h-4 mr-2" />
            Preferences
          </TabsTrigger>
          <TabsTrigger 
            value="roles" 
            className="text-blue-400 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=inactive]:text-blue-400 data-[state=inactive]:hover:text-blue-300"
          >
            <Shield className="w-4 h-4 mr-2" />
            Roles
          </TabsTrigger>
          <TabsTrigger 
            value="security" 
            className="text-blue-400 data-[state=active]:bg-blue-600 data-[state=active]:text-white data-[state=inactive]:text-blue-400 data-[state=inactive]:hover:text-blue-300"
          >
            <Lock className="w-4 h-4 mr-2" />
            Security
          </TabsTrigger>
        </TabsList>

        {/* My Profile Tab */}
        <TabsContent value="profile">
          <Card className="bg-slate-800 border-slate-700 border-2 border-blue-500/20">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-blue-400">Personal Information</CardTitle>
              <p className="text-slate-400 text-sm">Update your personal details and profile information</p>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Profile Picture */}
              <div className="flex items-center space-x-6">
                <Avatar className="w-20 h-20">
                  <AvatarImage src={profileData.profilePicture || ''} />
                  <AvatarFallback className="bg-blue-500 text-white text-xl">
                    {profileData.fullName.split(' ').map(n => n[0]).join('')}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                    <Upload className="w-4 h-4 mr-2" />
                    Upload Photo
                  </Button>
                  <p className="text-xs text-slate-400">JPG, PNG or GIF. Max size 2MB.</p>
                </div>
              </div>

              {/* Profile Form */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label className="text-slate-300 font-medium text-sm">Full Name *</Label>
                  <Input
                    className="bg-slate-700 border-slate-600 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    value={profileData.fullName}
                    onChange={(e) => handleProfileUpdate('fullName', e.target.value)}
                  />
                </div>
                <div className="space-y-3">
                  <Label className="text-slate-300 font-medium text-sm">Email Address *</Label>
                  <Input
                    type="email"
                    className="bg-slate-700 border-slate-600 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    value={profileData.email}
                    onChange={(e) => handleProfileUpdate('email', e.target.value)}
                  />
                </div>
                <div className="space-y-3">
                  <Label className="text-slate-300 font-medium text-sm">Phone Number</Label>
                  <Input
                    type="tel"
                    className="bg-slate-700 border-slate-600 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    value={profileData.phone}
                    onChange={(e) => handleProfileUpdate('phone', e.target.value)}
                  />
                </div>
                <div className="space-y-3">
                  <Label className="text-slate-300 font-medium text-sm">Role</Label>
                  <Input
                    className="bg-slate-700 border-slate-600 text-white"
                    value="Super Admin"
                    disabled
                  />
                </div>
              </div>

              <div className="space-y-3">
                <Label className="text-slate-300 font-medium text-sm">Bio</Label>
                <Textarea
                  className="bg-slate-700 border-slate-600 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500 resize-none"
                  placeholder="Tell us about yourself..."
                  value={profileData.bio}
                  onChange={(e) => handleProfileUpdate('bio', e.target.value)}
                  rows={3}
                />
              </div>

              {/* Account Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-slate-700">
                <div className="space-y-2">
                  <Label className="text-slate-400 text-sm">Last Login</Label>
                  <p className="text-white text-sm">January 20, 2024 at 2:30 PM</p>
                </div>
                <div className="space-y-2">
                  <Label className="text-slate-400 text-sm">Account Created</Label>
                  <p className="text-white text-sm">December 15, 2023</p>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-4 border-t border-slate-700">
                <Button variant="outline" className="border-red-600 text-red-400 hover:bg-red-500/10">
                  <LogOut className="w-4 h-4 mr-2" />
                  Log Out of All Sessions
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Branding & Appearance Tab */}
        <TabsContent value="branding">
          <div className="space-y-6">
            {/* Platform Branding */}
            <Card className="bg-slate-800 border-slate-700 border-2 border-blue-500/20">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-blue-400">Platform Branding</CardTitle>
                <p className="text-slate-400 text-sm">Customize your platform's visual identity</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label className="text-slate-300 font-medium text-sm">Company Logo</Label>
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 bg-slate-700 border border-slate-600 rounded-lg flex items-center justify-center">
                        <UploadIcon className="w-6 h-6 text-slate-400" />
                      </div>
                      <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Logo
                      </Button>
                    </div>
                    <p className="text-xs text-slate-400">Recommended: 200x60px, PNG format</p>
                  </div>
                  <div className="space-y-3">
                    <Label className="text-slate-300 font-medium text-sm">Favicon</Label>
                    <div className="flex items-center space-x-4">
                      <div className="w-8 h-8 bg-slate-700 border border-slate-600 rounded flex items-center justify-center">
                        <UploadIcon className="w-4 h-4 text-slate-400" />
                      </div>
                      <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                        <Upload className="w-4 h-4 mr-2" />
                        Upload Favicon
                      </Button>
                    </div>
                    <p className="text-xs text-slate-400">Recommended: 32x32px, ICO format</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label className="text-slate-300 font-medium text-sm">Platform Name</Label>
                    <Input
                      className="bg-slate-700 border-slate-600 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      value={brandingData.platformName}
                      onChange={(e) => handleBrandingUpdate('platformName', e.target.value)}
                    />
                  </div>
                  <div className="space-y-3">
                    <Label className="text-slate-300 font-medium text-sm">Tagline</Label>
                    <Input
                      className="bg-slate-700 border-slate-600 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      value={brandingData.tagline}
                      onChange={(e) => handleBrandingUpdate('tagline', e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Color Scheme */}
            <Card className="bg-slate-800 border-slate-700 border-2 border-blue-500/20">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-blue-400">Color Scheme</CardTitle>
                <p className="text-slate-400 text-sm">Customize your platform's color palette</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label className="text-slate-300 font-medium text-sm">Primary Color</Label>
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-10 h-10 rounded-lg border border-slate-600 cursor-pointer"
                        style={{ backgroundColor: brandingData.primaryColor }}
                      ></div>
                      <Input
                        className="bg-slate-700 border-slate-600 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        value={brandingData.primaryColor}
                        onChange={(e) => handleBrandingUpdate('primaryColor', e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <Label className="text-slate-300 font-medium text-sm">Secondary Color</Label>
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-10 h-10 rounded-lg border border-slate-600 cursor-pointer"
                        style={{ backgroundColor: brandingData.secondaryColor }}
                      ></div>
                      <Input
                        className="bg-slate-700 border-slate-600 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                        value={brandingData.secondaryColor}
                        onChange={(e) => handleBrandingUpdate('secondaryColor', e.target.value)}
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <Label className="text-slate-300 font-medium text-sm">Background Theme</Label>
                    <Select value={brandingData.backgroundTheme} onValueChange={(value) => handleBrandingUpdate('backgroundTheme', value)}>
                      <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-700 border-slate-600">
                        <SelectItem value="light" className="text-white">Light</SelectItem>
                        <SelectItem value="dark" className="text-white">Dark</SelectItem>
                        <SelectItem value="auto" className="text-white">Auto</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-3">
                    <Label className="text-slate-300 font-medium text-sm">Accent Tone</Label>
                    <Select value={brandingData.accentTone} onValueChange={(value) => handleBrandingUpdate('accentTone', value)}>
                      <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent className="bg-slate-700 border-slate-600">
                        <SelectItem value="blue" className="text-white">Blue</SelectItem>
                        <SelectItem value="purple" className="text-white">Purple</SelectItem>
                        <SelectItem value="green" className="text-white">Green</SelectItem>
                        <SelectItem value="custom" className="text-white">Custom</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Typography */}
            <Card className="bg-slate-800 border-slate-700 border-2 border-blue-500/20">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-blue-400">Typography</CardTitle>
                <p className="text-slate-400 text-sm">Choose your platform's font family</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <Label className="text-slate-300 font-medium text-sm">Font Family</Label>
                  <Select value={brandingData.fontFamily} onValueChange={(value) => handleBrandingUpdate('fontFamily', value)}>
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      <SelectItem value="Inter" className="text-white">Inter</SelectItem>
                      <SelectItem value="Poppins" className="text-white">Poppins</SelectItem>
                      <SelectItem value="Open Sans" className="text-white">Open Sans</SelectItem>
                      <SelectItem value="Roboto" className="text-white">Roboto</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Notifications Tab */}
        <TabsContent value="notifications">
          <div className="space-y-6">
            {/* System Alerts */}
            <Card className="bg-slate-800 border-slate-700 border-2 border-blue-500/20">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-blue-400">System Alerts</CardTitle>
                <p className="text-slate-400 text-sm">Configure which system events trigger notifications</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-slate-300 font-medium">Payment Received</Label>
                    <p className="text-slate-400 text-sm">Get notified when rent payments are received</p>
                  </div>
                  <Switch
                    checked={notificationSettings.paymentReceived}
                    onCheckedChange={() => handleNotificationToggle('paymentReceived')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-slate-300 font-medium">New Tenant Added</Label>
                    <p className="text-slate-400 text-sm">Get notified when new tenants are registered</p>
                  </div>
                  <Switch
                    checked={notificationSettings.newTenantAdded}
                    onCheckedChange={() => handleNotificationToggle('newTenantAdded')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-slate-300 font-medium">Property Suspended</Label>
                    <p className="text-slate-400 text-sm">Get notified when properties are suspended</p>
                  </div>
                  <Switch
                    checked={notificationSettings.propertySuspended}
                    onCheckedChange={() => handleNotificationToggle('propertySuspended')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-slate-300 font-medium">Overdue Rent Reminder</Label>
                    <p className="text-slate-400 text-sm">Get notified about overdue rent payments</p>
                  </div>
                  <Switch
                    checked={notificationSettings.overdueRentReminder}
                    onCheckedChange={() => handleNotificationToggle('overdueRentReminder')}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Delivery Channels */}
            <Card className="bg-slate-800 border-slate-700 border-2 border-blue-500/20">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-blue-400">Delivery Channels</CardTitle>
                <p className="text-slate-400 text-sm">Choose how you want to receive notifications</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-blue-400" />
                    <div>
                      <Label className="text-slate-300 font-medium">Email Notifications</Label>
                      <p className="text-slate-400 text-sm">Receive notifications via email</p>
                    </div>
                  </div>
                  <Switch
                    checked={notificationSettings.emailNotifications}
                    onCheckedChange={() => handleNotificationToggle('emailNotifications')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Smartphone className="w-5 h-5 text-emerald-400" />
                    <div>
                      <Label className="text-slate-300 font-medium">SMS Notifications</Label>
                      <p className="text-slate-400 text-sm">Receive notifications via SMS</p>
                    </div>
                  </div>
                  <Switch
                    checked={notificationSettings.smsNotifications}
                    onCheckedChange={() => handleNotificationToggle('smsNotifications')}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-green-400" />
                    <div>
                      <Label className="text-slate-300 font-medium">WhatsApp Alerts</Label>
                      <p className="text-slate-400 text-sm">Receive notifications via WhatsApp</p>
                    </div>
                  </div>
                  <Switch
                    checked={notificationSettings.whatsappAlerts}
                    onCheckedChange={() => handleNotificationToggle('whatsappAlerts')}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Test Notification */}
            <Card className="bg-slate-800 border-slate-700 border-2 border-blue-500/20">
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-slate-300 font-medium">Test Notifications</h3>
                    <p className="text-slate-400 text-sm">Send a test notification to verify your settings</p>
                  </div>
                  <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                    <Bell className="w-4 h-4 mr-2" />
                    Test Notification
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* System Preferences Tab */}
        <TabsContent value="preferences">
          <Card className="bg-slate-800 border-slate-700 border-2 border-blue-500/20">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-blue-400">System Preferences</CardTitle>
              <p className="text-slate-400 text-sm">Configure platform-wide operational settings</p>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label className="text-slate-300 font-medium text-sm">Default Currency</Label>
                  <Select value={systemPreferences.defaultCurrency} onValueChange={(value) => handleSystemPreferenceUpdate('defaultCurrency', value)}>
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      <SelectItem value="USD" className="text-white">USD ($)</SelectItem>
                      <SelectItem value="EUR" className="text-white">EUR (€)</SelectItem>
                      <SelectItem value="GBP" className="text-white">GBP (£)</SelectItem>
                      <SelectItem value="KES" className="text-white">KES (KSh)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-3">
                  <Label className="text-slate-300 font-medium text-sm">Default Rent Cycle</Label>
                  <Select value={systemPreferences.defaultRentCycle} onValueChange={(value) => handleSystemPreferenceUpdate('defaultRentCycle', value)}>
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      <SelectItem value="monthly" className="text-white">Monthly</SelectItem>
                      <SelectItem value="quarterly" className="text-white">Quarterly</SelectItem>
                      <SelectItem value="yearly" className="text-white">Yearly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-3">
                  <Label className="text-slate-300 font-medium text-sm">Default Timezone</Label>
                  <Select value={systemPreferences.defaultTimezone} onValueChange={(value) => handleSystemPreferenceUpdate('defaultTimezone', value)}>
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      <SelectItem value="America/New_York" className="text-white">Eastern Time (ET)</SelectItem>
                      <SelectItem value="America/Chicago" className="text-white">Central Time (CT)</SelectItem>
                      <SelectItem value="America/Denver" className="text-white">Mountain Time (MT)</SelectItem>
                      <SelectItem value="America/Los_Angeles" className="text-white">Pacific Time (PT)</SelectItem>
                      <SelectItem value="Africa/Nairobi" className="text-white">East Africa Time (EAT)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-3">
                  <Label className="text-slate-300 font-medium text-sm">Date Format</Label>
                  <Select value={systemPreferences.dateFormat} onValueChange={(value) => handleSystemPreferenceUpdate('dateFormat', value)}>
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      <SelectItem value="MM/DD/YYYY" className="text-white">MM/DD/YYYY</SelectItem>
                      <SelectItem value="DD/MM/YYYY" className="text-white">DD/MM/YYYY</SelectItem>
                      <SelectItem value="YYYY-MM-DD" className="text-white">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-700">
                <h3 className="text-slate-300 font-medium">Automation Settings</h3>
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-slate-300 font-medium">Auto-Invoice Generation</Label>
                      <p className="text-slate-400 text-sm">Automatically generate invoices at the start of each billing cycle</p>
                    </div>
                    <Switch
                      checked={systemPreferences.autoInvoiceGeneration}
                      onCheckedChange={() => handleSystemPreferenceUpdate('autoInvoiceGeneration', systemPreferences.autoInvoiceGeneration ? 'false' : 'true')}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-slate-300 font-medium">Auto Payment Reminder</Label>
                      <p className="text-slate-400 text-sm">Send automatic reminders for overdue payments</p>
                    </div>
                    <Switch
                      checked={systemPreferences.autoPaymentReminder}
                      onCheckedChange={() => handleSystemPreferenceUpdate('autoPaymentReminder', systemPreferences.autoPaymentReminder ? 'false' : 'true')}
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-slate-300 font-medium">Enable Data Export</Label>
                      <p className="text-slate-400 text-sm">Allow users to export their data</p>
                    </div>
                    <Switch
                      checked={systemPreferences.dataExport}
                      onCheckedChange={() => handleSystemPreferenceUpdate('dataExport', systemPreferences.dataExport ? 'false' : 'true')}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-slate-700">
                <div className="space-y-3">
                  <Label className="text-slate-300 font-medium text-sm">Backup Frequency</Label>
                  <Select value={systemPreferences.backupFrequency} onValueChange={(value) => handleSystemPreferenceUpdate('backupFrequency', value)}>
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-700 border-slate-600">
                      <SelectItem value="daily" className="text-white">Daily</SelectItem>
                      <SelectItem value="weekly" className="text-white">Weekly</SelectItem>
                      <SelectItem value="manual" className="text-white">Manual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Roles & Permissions Tab */}
        <TabsContent value="roles">
          <Card className="bg-slate-800 border-slate-700 border-2 border-blue-500/20">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-blue-400">Roles & Permissions</CardTitle>
              <p className="text-slate-400 text-sm">Manage access levels and roles within the system</p>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-700">
                      <TableHead className="text-slate-300">Role</TableHead>
                      <TableHead className="text-slate-300">Description</TableHead>
                      <TableHead className="text-slate-300">Permissions</TableHead>
                      <TableHead className="text-slate-300">Users</TableHead>
                      <TableHead className="text-slate-300">Status</TableHead>
                      <TableHead className="text-slate-300">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rolesData.map((role) => (
                      <TableRow key={role.id} className="border-slate-700 hover:bg-slate-700/30">
                        <TableCell className="text-white font-medium">{role.role}</TableCell>
                        <TableCell className="text-slate-300">{role.description}</TableCell>
                        <TableCell className="text-slate-300">
                          {Array.isArray(role.permissions) ? role.permissions.join(', ') : role.permissions}
                        </TableCell>
                        <TableCell className="text-slate-300">{role.users}</TableCell>
                        <TableCell>{getStatusBadge(role.status)}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button variant="ghost" size="sm" className="text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 h-7 w-7 p-0">
                              <Edit className="w-3 h-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Security & Password Tab */}
        <TabsContent value="security">
          <div className="space-y-6">
            {/* Change Password */}
            <Card className="bg-slate-800 border-slate-700 border-2 border-blue-500/20">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-blue-400">Change Password</CardTitle>
                <p className="text-slate-400 text-sm">Update your account password for better security</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <Label className="text-slate-300 font-medium text-sm">Current Password</Label>
                  <Input
                    type="password"
                    className="bg-slate-700 border-slate-600 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                    value={securitySettings.currentPassword}
                    onChange={(e) => handleSecurityUpdate('currentPassword', e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <Label className="text-slate-300 font-medium text-sm">New Password</Label>
                    <Input
                      type="password"
                      className="bg-slate-700 border-slate-600 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      value={securitySettings.newPassword}
                      onChange={(e) => handleSecurityUpdate('newPassword', e.target.value)}
                    />
                  </div>
                  <div className="space-y-3">
                    <Label className="text-slate-300 font-medium text-sm">Confirm New Password</Label>
                    <Input
                      type="password"
                      className="bg-slate-700 border-slate-600 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                      value={securitySettings.confirmPassword}
                      onChange={(e) => handleSecurityUpdate('confirmPassword', e.target.value)}
                    />
                  </div>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                  <Lock className="w-4 h-4 mr-2" />
                  Update Password
                </Button>
              </CardContent>
            </Card>

            {/* Two-Factor Authentication */}
            <Card className="bg-slate-800 border-slate-700 border-2 border-blue-500/20">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-blue-400">Two-Factor Authentication</CardTitle>
                <p className="text-slate-400 text-sm">Add an extra layer of security to your account</p>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-slate-300 font-medium">Enable 2FA</Label>
                    <p className="text-slate-400 text-sm">Protect your account with two-factor authentication</p>
                  </div>
                  <Switch
                    checked={securitySettings.twoFactorEnabled}
                    onCheckedChange={() => handleSecurityUpdate('twoFactorEnabled', securitySettings.twoFactorEnabled ? 'false' : 'true')}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Active Sessions */}
            <Card className="bg-slate-800 border-slate-700 border-2 border-blue-500/20">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-blue-400">Active Sessions</CardTitle>
                <p className="text-slate-400 text-sm">Manage your active login sessions</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {activeSessions.map((session) => (
                    <div key={session.id} className="flex items-center justify-between p-4 bg-slate-700/50 border border-slate-600 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-10 h-10 bg-slate-600 rounded-lg flex items-center justify-center">
                          {session.device.includes('iPhone') ? (
                            <Smartphone className="w-5 h-5 text-blue-400" />
                          ) : (
                            <Monitor className="w-5 h-5 text-blue-400" />
                          )}
                        </div>
                        <div>
                          <div className="flex items-center space-x-2">
                            <p className="text-white font-medium">{session.device}</p>
                            {session.current && (
                              <Badge className="bg-emerald-500/20 text-emerald-400 border-emerald-500/30">Current</Badge>
                            )}
                          </div>
                          <p className="text-slate-400 text-sm">{session.location} • {session.ip}</p>
                          <p className="text-slate-400 text-xs">Last active: {session.lastActive}</p>
                        </div>
                      </div>
                      {!session.current && (
                        <Button variant="outline" size="sm" className="border-red-600 text-red-400 hover:bg-red-500/10">
                          <LogOut className="w-4 h-4 mr-2" />
                          Revoke
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
