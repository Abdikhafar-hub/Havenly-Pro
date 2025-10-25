"use client"

import { useState, useEffect } from 'react'
import { useRouter, useParams } from 'next/navigation'
import { 
  ArrowLeft,
  User,
  Building2,
  DollarSign,
  MessageSquare,
  FileText,
  CreditCard,
  Edit,
  Send,
  Download,
  Phone,
  Mail,
  Calendar,
  CheckCircle
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

// Mock tenant data - in real app, this would come from API
const mockTenantData = {
  id: "1",
  name: "John Doe",
  email: "john.doe@email.com",
  phone: "(555) 123-4567",
  avatar: "/api/placeholder/40/40",
  unit: "103",
  status: "Active",
  paymentStatus: "Paid",
  monthlyRent: 1200,
  balance: 0,
  leaseStart: "2024-01-01",
  leaseEnd: "2024-12-31",
  nationalId: "12345678",
  gender: "Male",
  dateOfBirth: "1990-05-15",
  tenantId: "TEN-000001",
  registrationDate: "2024-01-01",
  property: "Sunrise Apartments",
  occupancyType: "Primary Tenant",
  securityDeposit: 2400,
  paymentFrequency: "Monthly",
  paymentMethod: "M-Pesa",
  nextPaymentDue: "2024-02-01",
  lateFeePolicy: "Enabled",
  emergencyContactName: "Jane Doe",
  emergencyContactPhone: "(555) 987-6543",
  notificationPreference: "SMS & Email",
  lastCommunication: "Jan 15, 2024",
  communicationMethod: "Email",
  responseRate: "95%",
  documents: {
    leaseAgreement: "lease_agreement.pdf",
    idCopy: "id_copy.pdf",
    paymentProof: "payment_receipt.pdf",
    additionalDocs: "additional_docs.pdf"
  },
  paymentHistory: [
    { month: 'January 2024', amount: 1200, date: '2024-01-01', status: 'Paid', method: 'Bank Transfer' },
    { month: 'December 2023', amount: 1200, date: '2023-12-01', status: 'Paid', method: 'Bank Transfer' },
    { month: 'November 2023', amount: 1200, date: '2023-11-01', status: 'Paid', method: 'Bank Transfer' }
  ],
  internalNotes: "Good tenant, always pays on time. Very responsive to communication. No maintenance issues reported. Quiet and respectful neighbor.",
  notesLastUpdated: "Jan 15, 2024",
  notesUpdatedBy: "Property Admin"
}

export default function ViewTenantPage() {
  const router = useRouter()
  const params = useParams()
  const tenantId = params.id
  const [tenantData, setTenantData] = useState(mockTenantData)

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Active':
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Active</Badge>
      case 'Vacating':
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Vacating</Badge>
      case 'Terminated':
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Terminated</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case 'Paid':
        return <Badge className="bg-green-500/20 text-green-400 border-green-500/30">Paid</Badge>
      case 'Pending':
        return <Badge className="bg-yellow-500/20 text-yellow-400 border-yellow-500/30">Pending</Badge>
      case 'Overdue':
        return <Badge className="bg-red-500/20 text-red-400 border-red-500/30">Overdue</Badge>
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
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
              <span className="text-slate-300">View Tenant</span>
            </div>
            <h1 className="text-3xl font-bold text-blue-400 flex items-center">
              <User className="w-8 h-8 mr-3" />
              Tenant Profile - {tenantData.name}
            </h1>
            <p className="text-slate-400 mt-2">Complete tenant information, lease details, and payment history.</p>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Button 
            className="bg-blue-600 hover:bg-blue-700 text-white"
            onClick={() => router.push(`/property-admin/tenants/edit/${tenantData.id}`)}
          >
            <Edit className="w-4 h-4 mr-2" />
            Edit Details
          </Button>
          <Button className="bg-emerald-600 hover:bg-emerald-700 text-white">
            <Send className="w-4 h-4 mr-2" />
            Send Reminder
          </Button>
          <Button className="bg-slate-600 hover:bg-slate-700 text-white">
            <FileText className="w-4 h-4 mr-2" />
            Generate Invoice
          </Button>
        </div>
      </div>

      {/* Personal Information */}
      <Card className="bg-slate-800 border-slate-700 border-2 border-blue-500/20 rounded-xl">
        <CardHeader className="pb-4">
          <CardTitle className="text-white text-lg flex items-center">
            <User className="w-5 h-5 mr-2" />
            Personal Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center space-x-4 mb-6">
            <Avatar className="w-16 h-16">
              <AvatarImage src={tenantData.avatar} />
              <AvatarFallback className="bg-slate-600 text-white text-lg">
                {tenantData.name.split(' ').map(n => n[0]).join('')}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="text-xl font-semibold text-white">{tenantData.name}</h3>
              <p className="text-slate-400">Unit {tenantData.unit}</p>
              <div className="flex items-center space-x-2 mt-2">
                {getStatusBadge(tenantData.status)}
                {getPaymentStatusBadge(tenantData.paymentStatus)}
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-slate-400">Full Name:</span>
                <span className="text-white font-medium">{tenantData.name}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Email:</span>
                <span className="text-white">{tenantData.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Phone:</span>
                <span className="text-white">{tenantData.phone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">National ID:</span>
                <span className="text-white">{tenantData.nationalId}</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-slate-400">Gender:</span>
                <span className="text-white capitalize">{tenantData.gender}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Date of Birth:</span>
                <span className="text-white">{new Date(tenantData.dateOfBirth).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Tenant ID:</span>
                <span className="text-blue-400 font-mono">{tenantData.tenantId}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Registration Date:</span>
                <span className="text-white">{new Date(tenantData.registrationDate).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Property & Lease Information */}
      <Card className="bg-slate-800 border-slate-700 border-2 border-emerald-500/20 rounded-xl">
        <CardHeader className="pb-4">
          <CardTitle className="text-white text-lg flex items-center">
            <Building2 className="w-5 h-5 mr-2" />
            Property & Lease Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-slate-400">Property:</span>
                <span className="text-white">{tenantData.property}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Unit:</span>
                <span className="text-white font-medium">{tenantData.unit}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Occupancy Type:</span>
                <span className="text-white capitalize">{tenantData.occupancyType}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Lease Status:</span>
                {getStatusBadge(tenantData.status)}
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-slate-400">Move-in Date:</span>
                <span className="text-white">{new Date(tenantData.leaseStart).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Lease End:</span>
                <span className="text-white">{new Date(tenantData.leaseEnd).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Lease Duration:</span>
                <span className="text-white">12 months</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Days Remaining:</span>
                <span className="text-blue-400 font-medium">245 days</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment Information */}
      <Card className="bg-slate-800 border-slate-700 border-2 border-yellow-500/20 rounded-xl">
        <CardHeader className="pb-4">
          <CardTitle className="text-white text-lg flex items-center">
            <DollarSign className="w-5 h-5 mr-2" />
            Payment Information
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-slate-400">Monthly Rent:</span>
                <span className="text-white font-semibold">${tenantData.monthlyRent}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Security Deposit:</span>
                <span className="text-white">${tenantData.securityDeposit}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Payment Frequency:</span>
                <span className="text-white capitalize">{tenantData.paymentFrequency}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Payment Method:</span>
                <span className="text-white">{tenantData.paymentMethod}</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-slate-400">Next Payment Due:</span>
                <span className="text-white">{new Date(tenantData.nextPaymentDue).toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Current Balance:</span>
                <span className={`font-semibold ${tenantData.balance > 0 ? 'text-red-400' : 'text-green-400'}`}>
                  ${tenantData.balance}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Payment Status:</span>
                {getPaymentStatusBadge(tenantData.paymentStatus)}
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Late Fee Policy:</span>
                <span className="text-white">{tenantData.lateFeePolicy}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Emergency Contact & Communication */}
      <Card className="bg-slate-800 border-slate-700 border-2 border-purple-500/20 rounded-xl">
        <CardHeader className="pb-4">
          <CardTitle className="text-white text-lg flex items-center">
            <MessageSquare className="w-5 h-5 mr-2" />
            Contact & Communication
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-slate-400">Emergency Contact:</span>
                <span className="text-white">{tenantData.emergencyContactName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Emergency Phone:</span>
                <span className="text-white">{tenantData.emergencyContactPhone}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Notification Preference:</span>
                <span className="text-white">{tenantData.notificationPreference}</span>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="text-slate-400">Last Communication:</span>
                <span className="text-white">{tenantData.lastCommunication}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Communication Method:</span>
                <span className="text-white">{tenantData.communicationMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Response Rate:</span>
                <span className="text-green-400 font-medium">{tenantData.responseRate}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Documents */}
      <Card className="bg-slate-800 border-slate-700 border-2 border-cyan-500/20 rounded-xl">
        <CardHeader className="pb-4">
          <CardTitle className="text-white text-lg flex items-center">
            <FileText className="w-5 h-5 mr-2" />
            Documents
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
              <div className="flex items-center">
                <FileText className="w-4 h-4 text-blue-400 mr-3" />
                <span className="text-white">Lease Agreement</span>
              </div>
              <Button size="sm" variant="ghost" className="text-blue-400 hover:text-blue-300">
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
              <div className="flex items-center">
                <FileText className="w-4 h-4 text-green-400 mr-3" />
                <span className="text-white">ID Copy</span>
              </div>
              <Button size="sm" variant="ghost" className="text-blue-400 hover:text-blue-300">
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
              <div className="flex items-center">
                <FileText className="w-4 h-4 text-yellow-400 mr-3" />
                <span className="text-white">Payment Receipt</span>
              </div>
              <Button size="sm" variant="ghost" className="text-blue-400 hover:text-blue-300">
                <Download className="w-4 h-4 mr-2" />
                Download
              </Button>
            </div>
            <div className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
              <div className="flex items-center">
                <FileText className="w-4 h-4 text-purple-400 mr-3" />
                <span className="text-white">Additional Docs</span>
              </div>
              <Button size="sm" variant="ghost" className="text-blue-400 hover:text-blue-300">
                <Download className="w-4 h-4 mr-2" />
                View
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment History */}
      <Card className="bg-slate-800 border-slate-700 border-2 border-orange-500/20 rounded-xl">
        <CardHeader className="pb-4">
          <CardTitle className="text-white text-lg flex items-center">
            <CreditCard className="w-5 h-5 mr-2" />
            Payment History
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {tenantData.paymentHistory.map((payment, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-slate-700 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div>
                    <span className="text-white font-medium">{payment.month}</span>
                    <div className="text-sm text-slate-400">{payment.method}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-white font-semibold">${payment.amount}</span>
                  <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                    {payment.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Internal Notes */}
      <Card className="bg-slate-800 border-slate-700 border-2 border-pink-500/20 rounded-xl">
        <CardHeader className="pb-4">
          <CardTitle className="text-white text-lg flex items-center">
            <MessageSquare className="w-5 h-5 mr-2" />
            Internal Notes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="bg-slate-700 rounded-lg p-4">
            <p className="text-slate-300 text-sm leading-relaxed">
              {tenantData.internalNotes}
            </p>
            <div className="flex items-center justify-between mt-3">
              <span className="text-xs text-slate-500">Last updated: {tenantData.notesLastUpdated}</span>
              <span className="text-xs text-slate-500">By: {tenantData.notesUpdatedBy}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

