"use client"

import { useState, useEffect } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { 
  ArrowLeft,
  Save,
  Upload,
  Camera,
  Package,
  Home,
  Tv,
  Refrigerator,
  Sofa,
  Shield,
  Calendar,
  DollarSign,
  MapPin,
  FileText,
  AlertTriangle,
  CheckCircle,
  X,
  Trash2
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'

const assetSchema = z.object({
  name: z.string().min(1, 'Asset name is required'),
  category: z.string().min(1, 'Category is required'),
  condition: z.string().min(1, 'Condition is required'),
  location: z.string().min(1, 'Location is required'),
  purchaseDate: z.string().min(1, 'Purchase date is required'),
  purchasePrice: z.number().min(0, 'Price must be positive'),
  warrantyExpiry: z.string().min(1, 'Warranty expiry is required'),
  status: z.string().min(1, 'Status is required'),
  supplier: z.string().min(1, 'Supplier is required'),
  serialNumber: z.string().min(1, 'Serial number is required'),
  modelNumber: z.string().optional(),
  notes: z.string().optional(),
  nextMaintenance: z.string().optional(),
})

const categories = [
  { value: 'Electronics', label: 'Electronics', icon: Tv },
  { value: 'Appliances', label: 'Appliances', icon: Refrigerator },
  { value: 'Furniture', label: 'Furniture', icon: Sofa },
  { value: 'Security', label: 'Security', icon: Shield },
  { value: 'Other', label: 'Other', icon: Package },
]

const conditions = [
  { value: 'Excellent', label: 'Excellent', color: 'text-green-400' },
  { value: 'Good', label: 'Good', color: 'text-blue-400' },
  { value: 'Fair', label: 'Fair', color: 'text-yellow-400' },
  { value: 'Poor', label: 'Poor', color: 'text-red-400' },
]

const statuses = [
  { value: 'Active', label: 'Active' },
  { value: 'In Maintenance', label: 'In Maintenance' },
  { value: 'Needs Repair', label: 'Needs Repair' },
  { value: 'Retired', label: 'Retired' },
]

// Mock data for demonstration
const existingAssetData = {
  id: '1',
  name: 'Samsung 55" Smart TV',
  category: 'Electronics',
  condition: 'Excellent',
  location: 'Unit 101 - Living Room',
  purchaseDate: '2023-01-15',
  purchasePrice: 899.99,
  warrantyExpiry: '2026-01-15',
  status: 'Active',
  supplier: 'Best Buy',
  serialNumber: 'SN-TV-001',
  modelNumber: 'UN55TU8000FXZA',
  notes: 'Wall mounted, includes remote control and mounting hardware. Connected to building WiFi.',
  nextMaintenance: '2024-07-10',
  images: [
    '/api/placeholder/400/300',
    '/api/placeholder/400/300',
    '/api/placeholder/400/300'
  ]
}

export default function EditAssetPage() {
  const params = useParams()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [images, setImages] = useState<string[]>(existingAssetData.images)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isDeleting, setIsDeleting] = useState(false)

  const form = useForm<z.infer<typeof assetSchema>>({
    resolver: zodResolver(assetSchema),
    defaultValues: {
      name: existingAssetData.name,
      category: existingAssetData.category,
      condition: existingAssetData.condition,
      location: existingAssetData.location,
      purchaseDate: existingAssetData.purchaseDate,
      purchasePrice: existingAssetData.purchasePrice,
      warrantyExpiry: existingAssetData.warrantyExpiry,
      status: existingAssetData.status,
      supplier: existingAssetData.supplier,
      serialNumber: existingAssetData.serialNumber,
      modelNumber: existingAssetData.modelNumber,
      notes: existingAssetData.notes,
      nextMaintenance: existingAssetData.nextMaintenance,
    },
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  const onSubmit = async (values: z.infer<typeof assetSchema>) => {
    setIsSubmitting(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('Updated asset data:', values)
      router.push('/property-admin/inventory')
    } catch (error) {
      console.error('Error updating asset:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000))
      console.log('Asset deleted')
      router.push('/property-admin/inventory')
    } catch (error) {
      console.error('Error deleting asset:', error)
    } finally {
      setIsDeleting(false)
    }
  }

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files
    if (files) {
      const newImages = Array.from(files).map(file => URL.createObjectURL(file))
      setImages(prev => [...prev, ...newImages])
    }
  }

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index))
  }

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
            <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Edit Asset</h1>
            <p className="text-slate-400 mt-2">Update asset information and details</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button 
                variant="outline" 
                className="border-red-600 text-red-400 hover:bg-red-500/10"
              >
                <Trash2 className="w-4 h-4 mr-2" />
                Delete Asset
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent className="bg-slate-800 border-slate-600">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-white">Delete Asset</AlertDialogTitle>
                <AlertDialogDescription className="text-slate-400">
                  Are you sure you want to delete this asset? This action cannot be undone.
                  All maintenance history and associated data will be permanently removed.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="border-slate-600 text-slate-300 hover:bg-slate-700">
                  Cancel
                </AlertDialogCancel>
                <AlertDialogAction 
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  {isDeleting ? 'Deleting...' : 'Delete Asset'}
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
          <Link href="/property-admin/inventory">
            <Button 
              variant="outline" 
              className="border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              Cancel
            </Button>
          </Link>
          <Button 
            onClick={form.handleSubmit(onSubmit)}
            disabled={isSubmitting}
            className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
          >
            <Save className="w-4 h-4 mr-2" />
            {isSubmitting ? 'Saving...' : 'Save Changes'}
          </Button>
        </div>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Basic Information */}
              <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Basic Information</CardTitle>
                  <CardDescription className="text-slate-400">
                    Essential details about the asset
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-300">Asset Name *</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="e.g., Samsung 55 inch Smart TV"
                              className="bg-slate-700 border-slate-600 text-white"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-300">Category *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                                <SelectValue placeholder="Select category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-slate-700 border-slate-600">
                              {categories.map((category) => (
                                <SelectItem key={category.value} value={category.value}>
                                  <div className="flex items-center space-x-2">
                                    <category.icon className="w-4 h-4" />
                                    <span>{category.label}</span>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="condition"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-300">Condition *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                                <SelectValue placeholder="Select condition" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-slate-700 border-slate-600">
                              {conditions.map((condition) => (
                                <SelectItem key={condition.value} value={condition.value}>
                                  <div className="flex items-center space-x-2">
                                    <div className={`w-2 h-2 rounded-full ${
                                      condition.value === 'Excellent' ? 'bg-green-400' :
                                      condition.value === 'Good' ? 'bg-blue-400' :
                                      condition.value === 'Fair' ? 'bg-yellow-400' :
                                      'bg-red-400'
                                    }`}></div>
                                    <span>{condition.label}</span>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="status"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-300">Status *</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent className="bg-slate-700 border-slate-600">
                              {statuses.map((status) => (
                                <SelectItem key={status.value} value={status.value}>
                                  {status.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-300">Location *</FormLabel>
                        <FormControl>
                          <Input 
                            placeholder="e.g., Unit 101 - Living Room"
                            className="bg-slate-700 border-slate-600 text-white"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription className="text-slate-400">
                          Specify the exact location of the asset
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              {/* Purchase Information */}
              <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Purchase Information</CardTitle>
                  <CardDescription className="text-slate-400">
                    Details about the purchase and warranty
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="purchaseDate"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-300">Purchase Date *</FormLabel>
                          <FormControl>
                            <Input 
                              type="date"
                              className="bg-slate-700 border-slate-600 text-white"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="purchasePrice"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-300">Purchase Price *</FormLabel>
                          <FormControl>
                            <Input 
                              type="number"
                              step="0.01"
                              placeholder="0.00"
                              className="bg-slate-700 border-slate-600 text-white"
                              {...field}
                              onChange={(e) => field.onChange(parseFloat(e.target.value) || 0)}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="supplier"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-300">Supplier *</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="e.g., Best Buy, Amazon"
                              className="bg-slate-700 border-slate-600 text-white"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="warrantyExpiry"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-300">Warranty Expiry *</FormLabel>
                          <FormControl>
                            <Input 
                              type="date"
                              className="bg-slate-700 border-slate-600 text-white"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="serialNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-300">Serial Number *</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="e.g., SN-TV-001"
                              className="bg-slate-700 border-slate-600 text-white"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="modelNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-slate-300">Model Number</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="e.g., UN55TU8000FXZA"
                              className="bg-slate-700 border-slate-600 text-white"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Maintenance & Notes */}
              <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Maintenance & Notes</CardTitle>
                  <CardDescription className="text-slate-400">
                    Schedule maintenance and add notes
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <FormField
                    control={form.control}
                    name="nextMaintenance"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-300">Next Maintenance Date</FormLabel>
                        <FormControl>
                          <Input 
                            type="date"
                            className="bg-slate-700 border-slate-600 text-white"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription className="text-slate-400">
                          Schedule the next maintenance check
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="notes"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-slate-300">Notes</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Additional notes about the asset..."
                            className="bg-slate-700 border-slate-600 text-white min-h-[100px]"
                            {...field}
                          />
                        </FormControl>
                        <FormDescription className="text-slate-400">
                          Add any additional information about the asset
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Asset Photos */}
              <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Asset Photos</CardTitle>
                  <CardDescription className="text-slate-400">
                    Upload photos of the asset
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="border-2 border-dashed border-slate-600 rounded-lg p-6 text-center hover:border-slate-500 transition-colors">
                    <input
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                      id="image-upload"
                    />
                    <label htmlFor="image-upload" className="cursor-pointer">
                      <Upload className="w-8 h-8 text-slate-400 mx-auto mb-2" />
                      <p className="text-slate-400 text-sm">Click to upload photos</p>
                      <p className="text-slate-500 text-xs">PNG, JPG up to 10MB each</p>
                    </label>
                  </div>

                  {images.length > 0 && (
                    <div className="grid grid-cols-2 gap-2">
                      {images.map((image, index) => (
                        <div key={index} className="relative group">
                          <img 
                            src={image} 
                            alt={`Asset photo ${index + 1}`}
                            className="w-full h-20 object-cover rounded border border-slate-600"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <X className="w-3 h-3 text-white" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Asset History */}
              <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Asset History</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Created</span>
                    <span className="text-white">Jan 15, 2023</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Last Updated</span>
                    <span className="text-white">Jan 10, 2024</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Maintenance Records</span>
                    <span className="text-white">3</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Total Maintenance Cost</span>
                    <span className="text-white">$195.00</span>
                  </div>
                </CardContent>
              </Card>

              {/* Quick Actions */}
              <Card className="bg-gradient-to-br from-slate-800 to-slate-900 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    type="button"
                    variant="outline" 
                    className="w-full justify-start border-slate-600 text-slate-300 hover:bg-slate-700"
                  >
                    <Camera className="w-4 h-4 mr-2" />
                    Take Photo
                  </Button>
                  <Button 
                    type="button"
                    variant="outline" 
                    className="w-full justify-start border-slate-600 text-slate-300 hover:bg-slate-700"
                  >
                    <FileText className="w-4 h-4 mr-2" />
                    Upload Receipt
                  </Button>
                  <Button 
                    type="button"
                    variant="outline" 
                    className="w-full justify-start border-slate-600 text-slate-300 hover:bg-slate-700"
                  >
                    <Package className="w-4 h-4 mr-2" />
                    Generate QR Code
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}
