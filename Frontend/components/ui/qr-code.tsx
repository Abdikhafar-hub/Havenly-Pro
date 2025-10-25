"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Download, Printer, Copy, Check } from 'lucide-react'

interface QRCodeProps {
  data: string
  size?: number
  className?: string
}

export function QRCode({ data, size = 200, className = '' }: QRCodeProps) {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('')
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    // Generate QR code URL using a QR code service
    // In a real implementation, you would use a QR code library like qrcode.js
    const encodedData = encodeURIComponent(data)
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&data=${encodedData}`
    setQrCodeUrl(qrUrl)
  }, [data, size])

  const handleDownload = () => {
    const link = document.createElement('a')
    link.href = qrCodeUrl
    link.download = `qr-code-${data}.png`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const handlePrint = () => {
    const printWindow = window.open('', '_blank')
    if (printWindow) {
      printWindow.document.write(`
        <html>
          <head>
            <title>QR Code - ${data}</title>
            <style>
              body { 
                display: flex; 
                flex-direction: column; 
                align-items: center; 
                justify-content: center; 
                height: 100vh; 
                margin: 0; 
                font-family: Arial, sans-serif;
              }
              .qr-container { 
                text-align: center; 
                padding: 20px; 
                border: 2px solid #000; 
                border-radius: 8px;
              }
              .qr-code { 
                margin: 20px 0; 
              }
              .asset-info { 
                margin-top: 20px; 
                font-size: 14px; 
                color: #666;
              }
            </style>
          </head>
          <body>
            <div class="qr-container">
              <h2>Asset QR Code</h2>
              <div class="qr-code">
                <img src="${qrUrl}" alt="QR Code" />
              </div>
              <div class="asset-info">
                <p><strong>Asset ID:</strong> ${data}</p>
                <p>Scan this QR code to access asset information</p>
              </div>
            </div>
          </body>
        </html>
      `)
      printWindow.document.close()
      printWindow.print()
    }
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(data)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  if (!qrCodeUrl) {
    return (
      <div className={`flex items-center justify-center bg-slate-100 rounded-lg ${className}`} style={{ width: size, height: size }}>
        <div className="text-slate-500">Generating QR Code...</div>
      </div>
    )
  }

  return (
    <div className={`flex flex-col items-center space-y-4 ${className}`}>
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <img 
          src={qrCodeUrl} 
          alt={`QR Code for ${data}`}
          style={{ width: size, height: size }}
          className="rounded"
        />
      </div>
      
      <div className="flex space-x-2">
        <Button
          size="sm"
          variant="outline"
          onClick={handleDownload}
          className="border-slate-600 text-slate-300 hover:bg-slate-700"
        >
          <Download className="w-4 h-4 mr-2" />
          Download
        </Button>
        
        <Button
          size="sm"
          variant="outline"
          onClick={handlePrint}
          className="border-slate-600 text-slate-300 hover:bg-slate-700"
        >
          <Printer className="w-4 h-4 mr-2" />
          Print
        </Button>
        
        <Button
          size="sm"
          variant="outline"
          onClick={handleCopy}
          className="border-slate-600 text-slate-300 hover:bg-slate-700"
        >
          {copied ? (
            <Check className="w-4 h-4 mr-2" />
          ) : (
            <Copy className="w-4 h-4 mr-2" />
          )}
          {copied ? 'Copied!' : 'Copy ID'}
        </Button>
      </div>
      
      <div className="text-center">
        <p className="text-sm text-slate-400">Asset ID: {data}</p>
        <p className="text-xs text-slate-500">Scan to access asset information</p>
      </div>
    </div>
  )
}

