"use client"

import { useState, useEffect } from 'react'
import { 
  User,
  Building2,
  Save,
  Eye,
  EyeOff,
  Upload,
  Key,
  Shield,
  CheckCircle,
  AlertTriangle
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Alert, AlertDescription } from '@/components/ui/alert'

export default function SettingsPage() {
  const [mounted, setMounted] = useState(false)
  const [activeTab, setActiveTab] = useState('profile')
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white">Admin Profile & Settings</h1>
          <p className="text-slate-400 mt-2">Manage your personal profile and organization settings</p>
        </div>
      </div>

      {/* User Profile Header */}
      <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
        <CardContent className="p-6">
          <div className="flex items-center space-x-6">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-xl">PA</span>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Property Admin</h2>
              <p className="text-slate-400">Havenly Pro • admin@havenlypro.com</p>
              <div className="flex items-center space-x-2 mt-2">
                <Badge variant="outline" className="border-slate-500 text-slate-300">Property Admin</Badge>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Verified
                </Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Settings Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3 bg-slate-800/50 border-slate-700">
          <TabsTrigger value="profile" className="text-blue-400 data-[state=active]:bg-blue-500/20 data-[state=active]:text-blue-400">
            Profile
          </TabsTrigger>
          <TabsTrigger value="settings" className="text-blue-400 data-[state=active]:bg-orange-500/20 data-[state=active]:text-orange-400">
            Settings
          </TabsTrigger>
          <TabsTrigger value="activity" className="text-blue-400 data-[state=active]:bg-purple-500/20 data-[state=active]:text-purple-400">
            Activity
          </TabsTrigger>
        </TabsList>

        {/* Profile Tab */}
        <TabsContent value="profile" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Profile Information */}
            <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Profile Information</CardTitle>
                <CardDescription className="text-slate-400">
                  Update your personal information and profile details
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="username" className="text-slate-300">Username</Label>
                  <Input
                    id="username"
                    defaultValue="Property Admin"
                    className="bg-slate-700/50 border-slate-600 text-white mt-2"
                  />
                  <Alert className="mt-2">
                    <AlertTriangle className="h-4 w-4" />
                    <AlertDescription className="text-slate-400">
                      Changing your username will affect your login credentials. Use the same username to log in after saving.
                    </AlertDescription>
                  </Alert>
                </div>
                
                <div>
                  <Label htmlFor="fullName" className="text-slate-300">Full Name</Label>
                  <Input
                    id="fullName"
                    defaultValue="Property Admin"
                    className="bg-slate-700/50 border-slate-600 text-white mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="email" className="text-slate-300">Email</Label>
                  <Input
                    id="email"
                    defaultValue="admin@havenlypro.com"
                    className="bg-slate-700/50 border-slate-600 text-white mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="country" className="text-slate-300">Country</Label>
                  <Input
                    id="country"
                    defaultValue="United States"
                    className="bg-slate-700/50 border-slate-600 text-white mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="website" className="text-slate-300">Website</Label>
                  <Input
                    id="website"
                    defaultValue="https://havenlypro.com"
                    className="bg-slate-700/50 border-slate-600 text-white mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="affiliation" className="text-slate-300">Affiliation</Label>
                  <Input
                    id="affiliation"
                    defaultValue="Havenly Pro Property Management"
                    className="bg-slate-700/50 border-slate-600 text-white mt-2"
                  />
                </div>

                <div>
                  <Label htmlFor="bio" className="text-slate-300">Bio</Label>
                  <Textarea
                    id="bio"
                    defaultValue="Property Administrator for Havenly Pro"
                    className="bg-slate-700/50 border-slate-600 text-white mt-2"
                    rows={3}
                  />
                </div>

                <div className="flex space-x-3 pt-4">
                  <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
                    Reset
                  </Button>
                  <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white">
                    <Save className="w-4 h-4 mr-2" />
                    Save Profile
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Profile Picture */}
            <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Profile Picture</CardTitle>
                <CardDescription className="text-slate-400">
                  Update your profile picture
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex flex-col items-center space-y-4">
                  <div className="w-32 h-32 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-3xl">PA</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" className="border-purple-600 text-purple-400 hover:bg-purple-500/10">
                      <Upload className="w-4 h-4 mr-2" />
                      Choose File
                    </Button>
                    <span className="text-slate-400 text-sm">No file chosen</span>
                  </div>
                  
                  <p className="text-slate-400 text-sm text-center">
                    Max file size: 5MB. Supported formats: JPG, PNG, GIF.
                  </p>
                  
                  <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white">
                    Update Picture
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Change Password */}
          <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Change Password</CardTitle>
              <CardDescription className="text-slate-400">
                Update your account password
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="currentPassword" className="text-slate-300">Current Password</Label>
                <div className="relative mt-2">
                  <Input
                    id="currentPassword"
                    type={showCurrentPassword ? "text" : "password"}
                    className="bg-slate-700/50 border-slate-600 text-white pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  >
                    {showCurrentPassword ? (
                      <EyeOff className="h-4 w-4 text-slate-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-slate-400" />
                    )}
                  </Button>
                </div>
              </div>

              <div>
                <Label htmlFor="newPassword" className="text-slate-300">New Password</Label>
                <div className="relative mt-2">
                  <Input
                    id="newPassword"
                    type={showNewPassword ? "text" : "password"}
                    placeholder="Enter new password"
                    className="bg-slate-700/50 border-slate-600 text-white pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                  >
                    {showNewPassword ? (
                      <EyeOff className="h-4 w-4 text-slate-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-slate-400" />
                    )}
                  </Button>
                </div>
              </div>

              <div>
                <Label htmlFor="confirmPassword" className="text-slate-300">Confirm New Password</Label>
                <div className="relative mt-2">
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm new password"
                    className="bg-slate-700/50 border-slate-600 text-white pr-10"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4 text-slate-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-slate-400" />
                    )}
                  </Button>
                </div>
              </div>

              <Button className="w-full bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white">
                <Key className="w-4 h-4 mr-2" />
                Change Password
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Organization Information */}
            <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Organization Information</CardTitle>
                <CardDescription className="text-slate-400">
                  View your organization details and limits
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Organization:</span>
                    <span className="text-slate-300">Havenly Pro</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Slug:</span>
                    <span className="text-slate-300">havenly-pro</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Subscription Plan:</span>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">PROFESSIONAL</Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Status:</span>
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">ACTIVE</Badge>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-slate-600">
                  <h4 className="text-white font-medium mb-3">Resource Limits</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Max Properties:</span>
                      <span className="text-slate-300">50</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Max Tenants:</span>
                      <span className="text-slate-300">500</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Max Staff:</span>
                      <span className="text-slate-300">25</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Max Units:</span>
                      <span className="text-slate-300">1000</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Storage Limit:</span>
                      <span className="text-slate-300">100 GB</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Account Settings */}
            <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Account Settings</CardTitle>
                <CardDescription className="text-slate-400">
                  Manage your account preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Username:</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-slate-300">Property Admin</span>
                      <Badge className="bg-green-500/20 text-green-400 border-green-500/30 text-xs">Can Change</Badge>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Email:</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-slate-300">admin@havenlypro.com</span>
                      <Badge className="bg-slate-500/20 text-slate-400 border-slate-500/30 text-xs">Cannot Change</Badge>
                    </div>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Account Created:</span>
                    <span className="text-slate-300">12/01/2024</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Last Updated:</span>
                    <span className="text-slate-300">12/15/2024</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Last Login IP:</span>
                    <span className="text-slate-300">192.168.1.100</span>
                  </div>
                </div>
                
                <div className="pt-4 border-t border-slate-600">
                  <h4 className="text-white font-medium mb-3">Account Status</h4>
                  <div className="flex space-x-2">
                    <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      Verified
                    </Badge>
                    <Badge className="bg-orange-500/20 text-orange-400 border-orange-500/30">
                      Admin
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Activity Tab */}
        <TabsContent value="activity" className="space-y-6">
          <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white">Recent Activity</CardTitle>
              <CardDescription className="text-slate-400">
                Your recent account activity and changes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-slate-700/50">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm text-white">Profile updated successfully</p>
                    <p className="text-xs text-slate-400">2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-slate-700/50">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm text-white">Password changed</p>
                    <p className="text-xs text-slate-400">1 day ago</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-slate-700/50">
                  <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm text-white">Login from new device</p>
                    <p className="text-xs text-slate-400">3 days ago</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
