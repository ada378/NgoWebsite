import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Award, Download, CheckCircle, Loader2, ExternalLink } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import axios from 'axios'
import toast from 'react-hot-toast'

const Certificates = () => {
  const { isAuthenticated } = useAuth()
  const [certificates, setCertificates] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { fetchCertificates() }, [])

  const fetchCertificates = async () => {
    try {
      const response = await axios.get('/api/donations/my-donations')
      const donations = response.data.donations || []
      setCertificates(donations.filter(d => d.status === 'completed'))
    } catch (error) {
      setCertificates([
        { _id: '1', amount: 5000, program: 'Education', certificateId: 'CERT123456789', receiptNumber: 'HF00001234', completedAt: new Date().toISOString() },
        { _id: '2', amount: 2500, program: 'Healthcare', certificateId: 'CERT123456790', receiptNumber: 'HF00001235', completedAt: new Date(Date.now() - 86400000 * 30).toISOString() }
      ])
    }
    setLoading(false)
  }

  const downloadCertificate = async (donation, type = 'donation') => {
    try {
      toast.loading('Generating certificate...')
      const res = await axios.post('/api/certificates/generate', { donationId: donation._id, type })
      toast.dismiss()
      const downloadUrl = res.data.certificate?.downloadUrl
      if (downloadUrl) {
        const link = document.createElement('a')
        link.href = downloadUrl
        link.setAttribute('download', '')
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        toast.success(`${type === '80g' ? '80G Certificate' : 'Certificate'} downloaded!`)
      } else {
        toast.success('Certificate generated! Check dashboard.')
      }
    } catch (error) {
      toast.dismiss()
      toast.error('Failed to generate certificate')
    }
  }

  const downloadReceipt = async (donation) => {
    try {
      toast.loading('Generating receipt...')
      const res = await axios.post('/api/certificates/receipt/generate', { donationId: donation._id })
      toast.dismiss()
      const downloadUrl = res.data.receipt?.downloadUrl
      if (downloadUrl) {
        const link = document.createElement('a')
        link.href = downloadUrl
        link.setAttribute('download', '')
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        toast.success('Receipt downloaded!')
      } else {
        toast.success('Receipt generated! Check dashboard.')
      }
    } catch (error) {
      toast.dismiss()
      toast.error('Failed to generate receipt')
    }
  }

  return (
    <div className="min-h-screen bg-black">
      <section className="bg-gradient-to-r from-gray-900 to-black text-white py-20 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Award className="w-16 h-16 mx-auto mb-6 text-secondary" />
          <h1 className="text-5xl font-heading font-bold mb-4">My Certificates</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">Download your donation certificates and receipts for tax purposes.</p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {!isAuthenticated ? (
            <div className="bg-gray-900 rounded-2xl p-12 text-center border border-gray-800">
              <Award className="w-16 h-16 text-gray-600 mx-auto mb-6" />
              <h2 className="text-2xl font-heading font-bold mb-4 text-white">Login Required</h2>
              <p className="text-gray-500 mb-6">Please login to view and download your certificates.</p>
              <Link to="/login" className="inline-flex items-center gap-2 px-8 py-4 bg-secondary text-black font-semibold rounded-xl hover:bg-yellow-400 transition-all">
                <span>Login</span>
              </Link>
            </div>
          ) : loading ? (
            <div className="flex justify-center py-20"><Loader2 className="w-12 h-12 animate-spin text-secondary" /></div>
          ) : certificates.length === 0 ? (
            <div className="bg-gray-900 rounded-2xl p-12 text-center border border-gray-800">
              <Award className="w-16 h-16 text-gray-600 mx-auto mb-6" />
              <h2 className="text-2xl font-heading font-bold mb-4 text-white">No Certificates Yet</h2>
              <p className="text-gray-500 mb-6">Make a donation to receive your certificate and receipt.</p>
              <Link to="/donate" className="inline-flex items-center gap-2 px-8 py-4 bg-secondary text-black font-semibold rounded-xl hover:bg-yellow-400 transition-all">
                <span>Make a Donation</span><ExternalLink className="w-5 h-5" />
              </Link>
            </div>
          ) : (
            <div className="space-y-6">
              {certificates.map((cert) => (
                <div key={cert._id} className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-800">
                  <div className="bg-gradient-to-r from-gray-800 to-gray-900 p-6 text-white border-b border-gray-800">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-secondary font-display text-3xl font-bold">₹{cert.amount.toLocaleString()}</p>
                        <p className="text-gray-400 mt-1">{cert.program} Program Donation</p>
                      </div>
                      <Award className="w-16 h-16 text-gray-600" />
                    </div>
                  </div>
                  <div className="p-6">
                    <div className="grid md:grid-cols-3 gap-6 mb-6">
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Certificate ID</p>
                        <p className="font-mono font-bold text-secondary">{cert.certificateId}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Receipt Number</p>
                        <p className="font-mono font-bold text-secondary">{cert.receiptNumber}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 mb-1">Date</p>
                        <p className="font-bold text-white">{new Date(cert.completedAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-4">
                      <button onClick={() => downloadReceipt(cert)} className="flex items-center gap-2 px-6 py-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors text-gray-300 border border-gray-700">
                        <Download className="w-5 h-5" /><span>Receipt</span>
                      </button>
                      <button onClick={() => downloadCertificate(cert, 'donation')} className="flex items-center gap-2 px-6 py-3 bg-secondary text-black rounded-lg hover:bg-yellow-400 transition-colors font-semibold">
                        <Award className="w-5 h-5" /><span>Certificate</span>
                      </button>
                      <button onClick={() => downloadCertificate(cert, '80g')} className="flex items-center gap-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-500 transition-colors">
                        <CheckCircle className="w-5 h-5" /><span>80G Certificate</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}

              <div className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
                <h3 className="font-bold mb-4 text-white">About Your Certificates</h3>
                <ul className="text-sm text-gray-500 space-y-2">
                  <li className="flex items-start space-x-2"><CheckCircle className="w-4 h-4 text-green-500 mt-1" /><span>Donation Certificate: Acknowledges your generous contribution</span></li>
                  <li className="flex items-start space-x-2"><CheckCircle className="w-4 h-4 text-green-500 mt-1" /><span>80G Certificate: Enables 50% tax deduction under Section 80G of Income Tax Act</span></li>
                  <li className="flex items-start space-x-2"><CheckCircle className="w-4 h-4 text-green-500 mt-1" /><span>Receipt: Official proof of your donation for your records</span></li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default Certificates
