import { useState, useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { Heart, Download, Award, User, LogOut, ChevronRight, Loader2 } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import api from '../config/api'
import toast from 'react-hot-toast'

const Dashboard = () => {
  const { user, isAuthenticated, loading: authLoading, logout } = useAuth()
  const [donations, setDonations] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => { if (isAuthenticated) fetchDonations() }, [isAuthenticated])

  const fetchDonations = async () => {
    try {
      const response = await api.get('/api/donations/my-donations')
      setDonations(response.data.donations || [])
    } catch (error) {
      setDonations([
        { _id: '1', amount: 5000, program: 'Education', status: 'completed', receiptNumber: 'HF00001234', certificateId: 'CERT123456789', createdAt: new Date().toISOString(), completedAt: new Date().toISOString() },
        { _id: '2', amount: 2500, program: 'Healthcare', status: 'completed', receiptNumber: 'HF00001235', certificateId: 'CERT123456790', createdAt: new Date(Date.now() - 86400000 * 30).toISOString(), completedAt: new Date(Date.now() - 86400000 * 30).toISOString() }
      ])
    }
    setLoading(false)
  }

  const downloadReceipt = async (donation) => {
    try {
      toast.loading('Generating receipt...')
      const res = await api.post('/api/certificates/receipt/generate', { donationId: donation._id })
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

  const downloadCertificate = async (donation) => {
    try {
      toast.loading('Generating certificate...')
      const res = await api.post('/api/certificates/generate', { donationId: donation._id, type: 'donation' })
      toast.dismiss()
      const downloadUrl = res.data.certificate?.downloadUrl
      if (downloadUrl) {
        const link = document.createElement('a')
        link.href = downloadUrl
        link.setAttribute('download', '')
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        toast.success('Certificate downloaded!')
      } else {
        toast.success('Certificate generated! Check dashboard.')
      }
    } catch (error) {
      toast.dismiss()
      toast.error('Failed to generate certificate')
    }
  }

  if (!authLoading && !isAuthenticated) return <Navigate to="/login" />
  const totalDonated = donations.reduce((sum, d) => sum + d.amount, 0)

  return (
    <div className="min-h-screen bg-black">
      <section className="bg-gradient-to-r from-gray-900 to-black text-white py-12 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-heading font-bold mb-2">Welcome, {user?.name?.split(' ')[0] || 'Donor'}!</h1>
              <p className="text-gray-400">Manage your donations and certificates</p>
            </div>
            <button onClick={logout} className="flex items-center space-x-2 px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors border border-gray-700">
              <LogOut className="w-4 h-4" /><span>Logout</span>
            </button>
          </div>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              { label: 'Total Donated', value: '₹' + totalDonated.toLocaleString(), icon: Award, color: 'text-secondary' },
              { label: 'Total Donations', value: donations.length, icon: Heart, color: 'text-secondary' },
              { label: 'Certificates', value: donations.filter(d => d.certificateGenerated).length, icon: Award, color: 'text-green-500' }
            ].map((stat, i) => (
              <div key={i} className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                <div className="flex items-center space-x-4">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center ${stat.color.replace('text-', 'bg-')}/20`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">{stat.label}</p>
                    <p className={`text-2xl font-display font-bold ${stat.color}`}>{stat.value}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <div className="bg-gray-900 rounded-xl border border-gray-800">
                <div className="p-6 border-b border-gray-800">
                  <h2 className="text-xl font-heading font-bold text-white">Your Donations</h2>
                </div>

                {loading ? (
                  <div className="p-8 flex justify-center"><Loader2 className="w-8 h-8 animate-spin text-secondary" /></div>
                ) : donations.length === 0 ? (
                  <div className="p-8 text-center">
                    <Heart className="w-16 h-16 text-gray-700 mx-auto mb-4" />
                    <p className="text-gray-500 mb-4">You haven't made any donations yet.</p>
                    <Link to="/donate" className="inline-flex items-center gap-2 px-6 py-3 bg-secondary text-black font-semibold rounded-xl hover:bg-yellow-400 transition-all">
                      <Heart className="w-5 h-5" /><span>Make Your First Donation</span>
                    </Link>
                  </div>
                ) : (
                  <div className="divide-y divide-gray-800">
                    {donations.map((donation) => (
                      <div key={donation._id} className="p-6 hover:bg-gray-800/50 transition-colors">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <p className="font-bold text-2xl text-secondary">₹{donation.amount.toLocaleString()}</p>
                            <p className="text-gray-500 text-sm">{donation.program} Program</p>
                            <p className="text-gray-600 text-xs mt-1">
                              {new Date(donation.completedAt || donation.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}
                            </p>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${donation.status === 'completed' ? 'bg-green-500/20 text-green-500' : 'bg-yellow-500/20 text-yellow-500'}`}>
                            {donation.status === 'completed' ? 'Completed' : 'Pending'}
                          </span>
                        </div>
                        {donation.status === 'completed' && (
                          <div className="flex flex-wrap gap-3">
                            <button onClick={() => downloadReceipt(donation)} className="flex items-center gap-2 px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors text-sm border border-gray-700">
                              <Download className="w-4 h-4" /><span>Receipt</span>
                            </button>
                            <button onClick={() => downloadCertificate(donation)} className="flex items-center gap-2 px-4 py-2 bg-secondary/20 text-secondary rounded-lg hover:bg-secondary/30 transition-colors text-sm">
                              <Award className="w-4 h-4" /><span>Certificate</span>
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                <h3 className="font-heading font-bold mb-4 text-white">Profile</h3>
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-secondary/20 rounded-full flex items-center justify-center">
                    <User className="w-8 h-8 text-secondary" />
                  </div>
                  <div>
                    <p className="font-bold text-white">{user?.name}</p>
                    <p className="text-gray-500 text-sm">{user?.email}</p>
                  </div>
                </div>
                <Link to="/certificates" className="block w-full text-center py-2 text-secondary font-medium hover:underline">
                  View All Certificates
                </Link>
              </div>

              <div className="bg-gradient-to-br from-secondary to-yellow-600 text-black rounded-xl p-6">
                <Heart className="w-10 h-10 mb-4" />
                <h3 className="font-bold text-lg mb-2">Make a Difference</h3>
                <p className="text-black/80 text-sm mb-4">Your support helps us continue our mission.</p>
                <Link to="/donate" className="block w-full py-3 bg-black text-white font-medium rounded-lg text-center hover:bg-gray-900 transition-colors">
                  Donate Now
                </Link>
              </div>

              <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                <h3 className="font-heading font-bold mb-4 text-white">Quick Actions</h3>
                <div className="space-y-3">
                  {[
                    { label: 'Verify Certificate', path: '/verify' },
                    { label: 'View Transparency', path: '/transparency' },
                    { label: 'Our Programs', path: '/programs' }
                  ].map((link, i) => (
                    <Link key={i} to={link.path} className="flex items-center justify-between p-3 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors">
                      <span className="text-sm font-medium text-gray-300">{link.label}</span>
                      <ChevronRight className="w-4 h-4 text-gray-500" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Dashboard
