"use client"

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { Download, FileText, Table, BarChart3, Calendar } from 'lucide-react'

interface ExportDialogProps {
  data: any[]
  trigger?: React.ReactNode
}

const exportFormats = [
  { value: 'csv', label: 'CSV', icon: Table, description: 'Comma-separated values for Excel' },
  { value: 'pdf', label: 'PDF Report', icon: FileText, description: 'Formatted PDF document' },
  { value: 'excel', label: 'Excel', icon: Table, description: 'Microsoft Excel spreadsheet' },
  { value: 'json', label: 'JSON', icon: FileText, description: 'JSON data format' },
]

const exportSections = [
  { id: 'basic', label: 'Basic Information', fields: ['name', 'category', 'location', 'condition', 'status'] },
  { id: 'financial', label: 'Financial Data', fields: ['purchasePrice', 'purchaseDate', 'warrantyExpiry', 'supplier'] },
  { id: 'maintenance', label: 'Maintenance', fields: ['lastMaintenance', 'nextMaintenance', 'maintenanceHistory'] },
  { id: 'technical', label: 'Technical Details', fields: ['serialNumber', 'modelNumber', 'notes'] },
]

export function ExportDialog({ data, trigger }: ExportDialogProps) {
  const [open, setOpen] = useState(false)
  const [format, setFormat] = useState('csv')
  const [selectedSections, setSelectedSections] = useState<string[]>(['basic'])
  const [isExporting, setIsExporting] = useState(false)

  const handleSectionToggle = (sectionId: string) => {
    setSelectedSections(prev => 
      prev.includes(sectionId) 
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    )
  }

  const getSelectedFields = () => {
    return exportSections
      .filter(section => selectedSections.includes(section.id))
      .flatMap(section => section.fields)
  }

  const exportToCSV = () => {
    const fields = getSelectedFields()
    const headers = fields.map(field => 
      field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')
    )
    
    const csvContent = [
      headers.join(','),
      ...data.map(item => 
        fields.map(field => {
          const value = item[field]
          if (typeof value === 'object' && value !== null) {
            return JSON.stringify(value)
          }
          return `"${value || ''}"`
        }).join(',')
      )
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `inventory-export-${new Date().toISOString().split('T')[0]}.csv`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const exportToJSON = () => {
    const fields = getSelectedFields()
    const filteredData = data.map(item => {
      const filtered: any = {}
      fields.forEach(field => {
        if (item[field] !== undefined) {
          filtered[field] = item[field]
        }
      })
      return filtered
    })

    const jsonContent = JSON.stringify(filteredData, null, 2)
    const blob = new Blob([jsonContent], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url
    link.download = `inventory-export-${new Date().toISOString().split('T')[0]}.json`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
    URL.revokeObjectURL(url)
  }

  const exportToPDF = () => {
    // In a real implementation, you would use a PDF library like jsPDF or Puppeteer
    // For now, we'll create a simple HTML page that can be printed as PDF
    const fields = getSelectedFields()
    const headers = fields.map(field => 
      field.charAt(0).toUpperCase() + field.slice(1).replace(/([A-Z])/g, ' $1')
    )

    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <title>Inventory Export</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 20px; }
            h1 { color: #333; }
            table { width: 100%; border-collapse: collapse; margin-top: 20px; }
            th, td { border: 1px solid #ddd; padding: 8px; text-align: left; }
            th { background-color: #f2f2f2; }
            .header { margin-bottom: 30px; }
            .export-info { margin-bottom: 20px; color: #666; }
          </style>
        </head>
        <body>
          <div class="header">
            <h1>Inventory Export Report</h1>
            <div class="export-info">
              <p>Generated on: ${new Date().toLocaleDateString()}</p>
              <p>Total Assets: ${data.length}</p>
              <p>Export Format: PDF</p>
            </div>
          </div>
          <table>
            <thead>
              <tr>
                ${headers.map(header => `<th>${header}</th>`).join('')}
              </tr>
            </thead>
            <tbody>
              ${data.map(item => `
                <tr>
                  ${fields.map(field => `<td>${item[field] || ''}</td>`).join('')}
                </tr>
              `).join('')}
            </tbody>
          </table>
        </body>
      </html>
    `

    const printWindow = window.open('', '_blank')
    if (printWindow) {
      printWindow.document.write(htmlContent)
      printWindow.document.close()
      printWindow.print()
    }
  }

  const handleExport = async () => {
    setIsExporting(true)
    
    try {
      switch (format) {
        case 'csv':
          exportToCSV()
          break
        case 'json':
          exportToJSON()
          break
        case 'pdf':
          exportToPDF()
          break
        case 'excel':
          // For Excel export, you would typically use a library like xlsx
          // For now, we'll export as CSV which can be opened in Excel
          exportToCSV()
          break
        default:
          exportToCSV()
      }
      
      setOpen(false)
    } catch (error) {
      console.error('Export failed:', error)
    } finally {
      setIsExporting(false)
    }
  }

  const selectedFormat = exportFormats.find(f => f.value === format)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" className="border-slate-600 text-slate-300 hover:bg-slate-700">
            <Download className="w-4 h-4 mr-2" />
            Export Data
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="bg-slate-800 border-slate-600 max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-white">Export Inventory Data</DialogTitle>
          <DialogDescription className="text-slate-400">
            Choose the format and sections to include in your export
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Format Selection */}
          <div className="space-y-3">
            <Label className="text-slate-300">Export Format</Label>
            <Select value={format} onValueChange={setFormat}>
              <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                <SelectValue placeholder="Select format" />
              </SelectTrigger>
              <SelectContent className="bg-slate-700 border-slate-600">
                {exportFormats.map((format) => (
                  <SelectItem key={format.value} value={format.value}>
                    <div className="flex items-center space-x-3">
                      <format.icon className="w-4 h-4" />
                      <div>
                        <div className="text-white">{format.label}</div>
                        <div className="text-xs text-slate-400">{format.description}</div>
                      </div>
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Section Selection */}
          <div className="space-y-3">
            <Label className="text-slate-300">Include Sections</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {exportSections.map((section) => (
                <div key={section.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={section.id}
                    checked={selectedSections.includes(section.id)}
                    onCheckedChange={() => handleSectionToggle(section.id)}
                  />
                  <Label 
                    htmlFor={section.id} 
                    className="text-slate-300 cursor-pointer"
                  >
                    {section.label}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Export Preview */}
          <div className="space-y-3">
            <Label className="text-slate-300">Export Preview</Label>
            <div className="bg-slate-700/50 p-4 rounded-lg">
              <div className="flex items-center space-x-2 mb-2">
                {selectedFormat && <selectedFormat.icon className="w-4 h-4 text-blue-400" />}
                <span className="text-white font-medium">
                  {selectedFormat?.label} Export
                </span>
              </div>
              <div className="text-sm text-slate-400 space-y-1">
                <p>• Total assets: {data.length}</p>
                <p>• Selected sections: {selectedSections.length}</p>
                <p>• Fields included: {getSelectedFields().length}</p>
                <p>• Generated on: {new Date().toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          {/* Actions */}
          <div className="flex justify-end space-x-3">
            <Button 
              variant="outline" 
              onClick={() => setOpen(false)}
              className="border-slate-600 text-slate-300 hover:bg-slate-700"
            >
              Cancel
            </Button>
            <Button 
              onClick={handleExport}
              disabled={isExporting || selectedSections.length === 0}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white"
            >
              <Download className="w-4 h-4 mr-2" />
              {isExporting ? 'Exporting...' : 'Export Data'}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

