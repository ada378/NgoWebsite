import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Shield, CheckCircle, XCircle, Award, Calendar, DollarSign, User, Loader2 } from 'lucide-react'
import api from '../config/api'

const CertificateVerify = () => {
  const { certificateId } = useParams()
  const [result, setResult] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (certificateId) verifyCertificate(certificateId)
    else setLoading(false)
  }, [certificateId])

  const verifyCertificate = async (id) => {
    try {
      const response = await api.get(`/api/certificates/verify/${id}`)
      setResult(response.data.certificate)
    } catch { setError(true) }
    setLoading(false)
  }

  if (loading) return (
    <div className="min-h-screen bg-black flex items-center justify-center">
      <Loader2 className="w-12 h-12 animate-spin text-secondary" />
    </div>
  )

  return (
    <div className="min-h-screen bg-black">
      <section className="bg-gradient-to-r from-gray-900 to-black text-white py-20 border-b border-gray-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Shield className="w-16 h-16 mx-auto mb-6 text-secondary" />
          <h1 className="text-5xl font-heading font-bold mb-4">Verify Certificate</h1>
          <p className="text-xl text-gray-400">Verify the authenticity of a Hope Foundation certificate</p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {certificateId && error && (
            <div className="bg-gray-900 rounded-2xl p-12 text-center border border-gray-800">
              <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <XCircle className="w-10 h-10 text-red-500" />
              </div>
              <h2 className="text-2xl font-heading font-bold mb-4 text-red-500">Certificate Not Found</h2>
              <p className="text-gray-500 mb-6">The certificate ID "{certificateId}" could not be verified. Please check the ID and try again.</p>
              <Link to="/verify" className="inline-flex items-center gap-2 px-8 py-4 bg-secondary text-black font-semibold rounded-xl hover:bg-yellow-400 transition-all">
                <span>Try Again</span>
              </Link>
            </div>
          )}

          {certificateId && result && (
            <div className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-800">
              <div className="bg-gradient-to-r from-gray-800 to-black p-8 text-center border-b border-gray-800">
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-10 h-10 text-green-500" />
                </div>
                <h2 className="text-3xl font-heading font-bold mb-2 text-white">Certificate Verified!</h2>
                <p className="text-gray-400">This certificate is authentic and issued by Hope Foundation</p>
              </div>
              <div className="p-8">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  {[
                    { label: 'Certificate ID', value: result.id, icon: Award },
                    { label: 'Amount', value: '₹' + result.amount?.toLocaleString(), icon: DollarSign },
                    { label: 'Donor', value: result.donorName, icon: User },
                    { label: 'Date', value: result.date ? new Date(result.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }) : 'N/A', icon: Calendar }
                  ].map((item, i) => (
                    <div key={i} className="bg-gray-800 rounded-xl p-4 border border-gray-700">
                      <div className="flex items-center space-x-3 mb-2">
                        <item.icon className="w-5 h-5 text-secondary" />
                        <span className="text-sm text-gray-500">{item.label}</span>
                      </div>
                      <p className="font-mono font-bold text-lg text-secondary">{item.value}</p>
                    </div>
                  ))}
                </div>
                <div className="bg-green-500/10 rounded-xl p-6 text-center border border-green-500/30">
                  <CheckCircle className="w-10 h-10 text-green-500 mx-auto mb-3" />
                  <p className="font-bold text-green-500">Verified Authentic Certificate</p>
                  <p className="text-sm text-gray-500 mt-1">Issued under Section 80G of the Income Tax Act, 1961</p>
                </div>
              </div>
            </div>
          )}

          {!certificateId && (
            <div className="bg-gray-900 rounded-2xl p-8 border border-gray-800">
              <h2 className="text-2xl font-heading font-bold mb-6 text-center text-white">Enter Certificate ID</h2>
              <p className="text-gray-500 text-center mb-8">Enter the certificate ID found on your donation certificate to verify its authenticity.</p>
              <form onSubmit={(e) => { e.preventDefault(); const id = e.target.certificateId.value.trim(); if (id) window.location.href = `/verify/${id}` }} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Certificate ID</label>
                  <input type="text" name="certificateId" placeholder="e.g., CERT123456789"
                    className="w-full px-4 py-3 border-2 border-gray-700 rounded-xl focus:border-secondary focus:outline-none bg-gray-800 text-white text-lg font-mono"
                    required />
                </div>
                <button type="submit" className="w-full px-8 py-4 bg-secondary text-black font-semibold rounded-xl hover:bg-yellow-400 transition-all">
                  Verify Certificate
                </button>
              </form>
              <div className="mt-8 pt-8 border-t border-gray-800 text-center">
                <p className="text-sm text-gray-500">Don't have a certificate? <Link to="/certificates" className="text-secondary hover:underline">View your certificates</Link></p>
              </div>
            </div>
          )}

          <div className="mt-8 text-center">
            <Link to="/" className="text-secondary font-medium hover:underline">Return to Home</Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default CertificateVerify
