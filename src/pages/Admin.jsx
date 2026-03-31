import { useState, useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { BarChart3, Users as UsersIcon, DollarSign, FileText, Settings, LogOut, Heart, Award, LayoutDashboard, Menu, Download, Shield, ChevronLeft, ChevronRight, RefreshCw, Plus, Edit, Trash2, Mail, Send, CheckCircle, XCircle, AlertCircle, TrendingUp, BarChart, PieChart, Activity, X, Search, Filter, EyeOff, Eye, Check, Clock, CreditCard, Smartphone, Building2, UserCog, Phone } from 'lucide-react'
import { BarChart as RechartsBar, Bar, LineChart, Line, PieChart as RechartsPie, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import toast from 'react-hot-toast'
import AdminLogin from './AdminLogin'
import api from '../config/api'

const uploadImage = async (file) => {
  const formData = new FormData()
  formData.append('file', file)
  const response = await api.post('/api/upload', formData, {
    headers: { 'Content-Type': 'multipart/form-data' }
  })
  return response.data.file.url
}

const COLORS = ['#D4A84B', '#3B82F6', '#10B981', '#EF4444', '#8B5CF6', '#F59E0B']

const Admin = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('dashboard')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const [loading, setLoading] = useState(true)
  const [stats, setStats] = useState(null)
  const [analytics, setAnalytics] = useState(null)
  const [donations, setDonations] = useState([])
  const [donors, setDonors] = useState([])
  const [users, setUsers] = useState([])
  const [programs, setPrograms] = useState([])
  const [blogs, setBlogs] = useState([])
  const [certificates, setCertificates] = useState([])
  const [pagination, setPagination] = useState({ page: 1, pages: 1, total: 0 })
  const [filters, setFilters] = useState({ status: '', program: '' })
  const [showModal, setShowModal] = useState(null)
  const [editData, setEditData] = useState(null)
  const [emailForm, setEmailForm] = useState({ to: '', subject: '', message: '' })
  const [broadcastForm, setBroadcastForm] = useState({ subject: '', message: '', target: 'all' })
  
  const user = JSON.parse(localStorage.getItem('adminUser') || 'null')
  const token = localStorage.getItem('token')

  if (!token || !user || user.role !== 'admin') {
    return <Navigate to="/admin/login" replace />
  }

  const fetchStats = async () => {
    try {
      const response = await api.get('/api/admin/stats')
      setStats(response.data)
    } catch (err) { console.error('Error fetching stats:', err) }
  }

  const fetchAnalytics = async () => {
    try {
      const response = await api.get('/api/admin/analytics')
      setAnalytics(response.data)
    } catch (err) { console.error('Error fetching analytics:', err) }
  }

  const fetchDonations = async (page = 1) => {
    try {
      const params = new URLSearchParams({ page, limit: 10 })
      if (filters.status) params.append('status', filters.status)
      if (filters.program) params.append('program', filters.program)
      const response = await api.get(`/api/admin/donations?${params}`)
      setDonations(response.data.donations)
      setPagination({ page: response.data.page, pages: response.data.pages, total: response.data.total })
    } catch (err) { console.error('Error fetching donations:', err) }
  }

  const fetchDonors = async (page = 1) => {
    try {
      const response = await api.get(`/api/admin/donors?page=${page}&limit=12`)
      setDonors(response.data.donors)
    } catch (err) { console.error('Error fetching donors:', err) }
  }

  const fetchUsers = async (page = 1) => {
    try {
      const response = await api.get(`/api/admin/users?page=${page}&limit=20`)
      setUsers(response.data.users)
      setPagination({ page: response.data.page, pages: response.data.pages, total: response.data.total })
    } catch (err) { console.error('Error fetching users:', err) }
  }

  const fetchPrograms = async () => {
    try {
      const response = await api.get('/api/programs')
      setPrograms(response.data.programs)
    } catch (err) { console.error('Error fetching programs:', err) }
  }

  const fetchBlogs = async () => {
    try {
      const response = await api.get('/api/blogs?limit=50')
      setBlogs(response.data.blogs)
    } catch (err) { console.error('Error fetching blogs:', err) }
  }

  const fetchCertificates = async () => {
    try {
      const response = await api.get('/api/admin/donations?status=completed&limit=50')
      const completed = response.data.donations.filter(d => d.certificateId)
      setCertificates(completed)
    } catch (err) { console.error('Error fetching certificates:', err) }
  }

  useEffect(() => {
    const loadData = async () => {
      setLoading(true)
      await Promise.all([fetchStats(), fetchAnalytics(), fetchDonations(), fetchDonors(), fetchPrograms(), fetchBlogs(), fetchCertificates(), fetchUsers()])
      setLoading(false)
    }
    loadData()
  }, [])

  useEffect(() => {
    if (activeTab !== 'dashboard') {
      const loadTabData = async () => {
        if (activeTab === 'donations') fetchDonations(1)
        if (activeTab === 'donors') fetchDonors(1)
        if (activeTab === 'programs') fetchPrograms()
        if (activeTab === 'blogs') fetchBlogs()
        if (activeTab === 'certificates') fetchCertificates()
        if (activeTab === 'users') fetchUsers(1)
      }
      loadTabData()
    }
  }, [activeTab])

  useEffect(() => {
    setSidebarOpen(false)
  }, [activeTab])

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('adminUser')
    toast.success('Logged out successfully')
    window.location.href = '/admin/login'
  }

  const exportDonations = async () => {
    try {
      const response = await api.get('/api/admin/export/donations', { responseType: 'blob' })
      const url = window.URL.createObjectURL(new Blob([response.data]))
      const link = document.createElement('a')
      link.href = url
      link.setAttribute('download', 'donations_export.csv')
      document.body.appendChild(link)
      link.click()
      link.remove()
      toast.success('Export downloaded!')
    } catch (err) { toast.error('Export failed') }
  }

  const handleDeleteProgram = async (id) => {
    if (!confirm('Are you sure you want to delete this program?')) return
    try {
      await api.delete(`/api/programs/${id}`)
      toast.success('Program deleted')
      fetchPrograms()
    } catch (err) { toast.error('Delete failed') }
  }

  const handleDeleteBlog = async (id) => {
    if (!confirm('Are you sure you want to delete this blog?')) return
    try {
      await api.delete(`/api/blogs/${id}`)
      toast.success('Blog deleted')
      fetchBlogs()
    } catch (err) { toast.error('Delete failed') }
  }

  const handleDeleteUser = async (id) => {
    if (!confirm('Are you sure you want to delete this user?')) return
    try {
      await api.delete(`/api/admin/users/${id}`)
      toast.success('User deleted')
      fetchUsers()
    } catch (err) { toast.error('Delete failed') }
  }

  const handleVerifyDonation = async (id, status) => {
    try {
      await api.post(`/api/admin/verify-donation/${id}`, { status })
      toast.success(`Donation ${status}`)
      fetchDonations()
      fetchStats()
    } catch (err) { toast.error('Verification failed') }
  }

  const handleSendEmail = async (e) => {
    e.preventDefault()
    try {
      await api.post('/api/admin/send-email', emailForm)
      toast.success('Email sent!')
      setShowModal(null)
      setEmailForm({ to: '', subject: '', message: '' })
    } catch (err) { toast.error('Failed to send email') }
  }

  const handleBroadcast = async (e) => {
    e.preventDefault()
    try {
      const res = await api.post('/api/admin/broadcast', broadcastForm)
      toast.success(res.data.message)
      setShowModal(null)
      setBroadcastForm({ subject: '', message: '', target: 'all' })
    } catch (err) { toast.error('Broadcast failed') }
  }

  const handleUpdateUser = async (id, role) => {
    try {
      await api.put(`/api/admin/users/${id}`, { role })
      toast.success('User role updated')
      fetchUsers()
      setShowModal(null)
    } catch (err) { toast.error('Update failed') }
  }

  const formatCurrency = (amount) => {
    if (amount >= 10000000) return `₹${(amount / 10000000).toFixed(1)}Cr`
    if (amount >= 100000) return `₹${(amount / 100000).toFixed(1)}L`
    if (amount >= 1000) return `₹${(amount / 1000).toFixed(1)}K`
    return `₹${amount}`
  }

  const formatDate = (date) => {
    if (!date) return 'N/A'
    return new Date(date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
  }

  const menuItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'donate', icon: Heart, label: 'Donate' },
    { id: 'donations', icon: DollarSign, label: 'Donations' },
    { id: 'donors', icon: UsersIcon, label: 'Donors' },
    { id: 'crm', icon: UserCog, label: 'CRM' },
    { id: 'programs', icon: Heart, label: 'Programs' },
    { id: 'blogs', icon: FileText, label: 'Blogs' },
    { id: 'users', icon: Shield, label: 'Users' },
    { id: 'certificates', icon: Award, label: 'Certificates' },
    { id: 'analytics', icon: BarChart, label: 'Analytics' },
    { id: 'email', icon: Mail, label: 'Email' },
    { id: 'transparency', icon: Activity, label: 'Transparency' },
    { id: 'reports', icon: FileText, label: 'Reports' },
  ]

  const StatCard = ({ icon: Icon, value, label, color }) => (
    <div className="bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-700">
      <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center mb-3 sm:mb-4`}>
        <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
      </div>
      <p className="font-display text-xl sm:text-2xl font-bold text-white">{value}</p>
      <p className="text-xs sm:text-sm text-gray-400 mt-1">{label}</p>
    </div>
  )

  const Dashboard = () => (
    <div className="space-y-4 sm:space-y-6">
      {loading ? (
        <div className="flex justify-center py-12"><RefreshCw className="w-8 h-8 text-secondary animate-spin" /></div>
      ) : (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
            <StatCard icon={DollarSign} value={formatCurrency(stats?.totalDonations || 0)} label="Total Donations" color="from-green-500 to-green-600" />
            <StatCard icon={UsersIcon} value={stats?.totalDonors || 0} label="Total Donors" color="from-blue-500 to-blue-600" />
            <StatCard icon={Heart} value={stats?.programCount || 0} label="Active Programs" color="from-secondary to-yellow-500" />
            <StatCard icon={Award} value={certificates.length} label="Certificates" color="from-purple-500 to-purple-600" />
          </div>

          <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
            {stats?.programBreakdown?.length > 0 && (
              <div className="bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-700">
                <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 text-white">Program Breakdown</h3>
                <div className="space-y-2 sm:space-y-3">
                  {stats.programBreakdown.map((item, i) => (
                    <div key={i} className="flex items-center gap-2 sm:gap-4">
                      <span className="w-20 sm:w-28 text-xs sm:text-sm font-medium text-gray-400 truncate">{item._id}</span>
                      <div className="flex-1 h-3 sm:h-4 bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-secondary to-yellow-500 rounded-full" style={{ width: `${(item.total / stats.totalDonations) * 100}%` }}></div>
                      </div>
                      <span className="w-16 sm:w-20 text-xs sm:text-sm font-bold text-secondary text-right flex-shrink-0">{formatCurrency(item.total)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {analytics?.recentDonors?.length > 0 && (
              <div className="bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-700">
                <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 text-white">Recent Donors</h3>
                <div className="space-y-2 sm:space-y-3">
                  {analytics.recentDonors.slice(0, 5).map((donor, i) => (
                    <div key={i} className="flex items-center justify-between p-2 sm:p-3 bg-gray-700/50 rounded-lg">
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-white text-sm sm:text-base truncate">{donor.name}</p>
                        <p className="text-xs text-gray-400 truncate">{donor.email}</p>
                      </div>
                      <span className="text-xs px-2 py-1 bg-secondary/20 text-secondary rounded-full flex-shrink-0 ml-2">{donor.role}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-700">
            <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center gap-2 sm:gap-4 mb-3 sm:mb-4">
              <h3 className="text-base sm:text-lg font-bold text-white">Recent Donations</h3>
              <button onClick={() => setActiveTab('donations')} className="text-xs sm:text-sm text-secondary hover:underline">View All</button>
            </div>
            <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
              <table className="w-full min-w-[500px] sm:min-w-0">
                <thead>
                  <tr className="text-left text-xs sm:text-sm text-gray-400 border-b border-gray-700">
                    <th className="pb-2 sm:pb-3">Donor</th>
                    <th className="pb-2 sm:pb-3">Amount</th>
                    <th className="pb-2 sm:pb-3 hidden sm:table-cell">Program</th>
                    <th className="pb-2 sm:pb-3">Status</th>
                  </tr>
                </thead>
                <tbody className="text-xs sm:text-sm">
                  {donations.slice(0, 5).map((d, i) => (
                    <tr key={i} className="border-b border-gray-700 last:border-0">
                      <td className="py-2 sm:py-3 text-white">{d.donorName}</td>
                      <td className="py-2 sm:py-3 font-bold text-secondary">₹{d.amount.toLocaleString()}</td>
                      <td className="py-2 sm:py-3 text-gray-400 hidden sm:table-cell">{d.program}</td>
                      <td className="py-2 sm:py-3">
                        <span className={`px-2 py-0.5 sm:px-2 sm:py-1 rounded-full text-xs font-semibold ${d.status === 'completed' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                          {d.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </div>
  )

  const DonateSection = ({ user }) => {
    const [step, setStep] = useState(1)
    const [loading, setLoading] = useState(false)
    const [selectedAmount, setSelectedAmount] = useState(1000)
    const [customAmount, setCustomAmount] = useState('')
    const [formData, setFormData] = useState({ donorName: user?.name || '', email: user?.email || '', phone: '', program: 'General', message: '', anonymous: false })
    const [paymentMethod, setPaymentMethod] = useState('UPI')
    const [donationResult, setDonationResult] = useState(null)

    const amounts = [500, 1000, 2500, 5000, 10000]
    const paymentMethods = [
      { id: 'UPI', icon: Smartphone, label: 'UPI' },
      { id: 'Card', icon: CreditCard, label: 'Card' },
      { id: 'Net Banking', icon: Building2, label: 'Net Banking' }
    ]
    const programs = ['Education', 'Healthcare', 'Women Empowerment', 'Environment', 'General']
    const finalAmount = customAmount ? parseInt(customAmount) : selectedAmount

    const handleSubmit = (e) => {
      e.preventDefault()
      if (!formData.donorName || !formData.email) { toast.error('Please fill required fields'); return }
      if (finalAmount < 100) { toast.error('Minimum donation is ₹100'); return }
      setStep(2)
    }

    const handlePayment = async () => {
      setLoading(true)
      let donationId = 'DEMO-' + Date.now()
      
      try {
        const response = await api.post('/api/donations', {
          donorName: formData.anonymous ? 'Anonymous' : formData.donorName,
          donorEmail: formData.email,
          amount: finalAmount,
          paymentMethod,
          program: formData.program,
          message: formData.message,
          anonymous: formData.anonymous
        })
        donationId = response.data.donation?.id || donationId
        
        setDonationResult({ donationId, amount: finalAmount, receiptNumber: `HF${Date.now().toString().slice(-8)}`, certificateId: `CERT${Date.now()}` })
        setStep(3)
        toast.success('Donation successful!')
        
        try {
          await api.post('/api/certificates/generate', { donationId, type: 'donation' })
        } catch {}
        
        fetchStats()
      } catch (error) {
        toast.error('Donation failed. Please try again.')
      }
      setLoading(false)
    }

    const processDemoPayment = async () => {
      await handlePayment()
    }

    if (step === 3 && donationResult) {
      return (
        <div className="max-w-2xl mx-auto">
          <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700 text-center">
            <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-green-400" />
            </div>
            <h2 className="text-2xl font-bold text-white mb-2">Thank You!</h2>
            <p className="text-gray-400 mb-6">Your donation of ₹{donationResult.amount.toLocaleString()} has been received.</p>
            <div className="bg-gray-700/50 rounded-xl p-4 mb-6 text-left">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div><span className="text-gray-400">Receipt No:</span><p className="text-white font-mono">{donationResult.receiptNumber}</p></div>
                <div><span className="text-gray-400">Certificate ID:</span><p className="text-white font-mono">{donationResult.certificateId}</p></div>
              </div>
            </div>
            <div className="flex gap-4">
              <button onClick={() => { setStep(1); setDonationResult(null) }} className="flex-1 py-3 bg-gray-700 text-white rounded-xl font-semibold hover:bg-gray-600">Donate Again</button>
              <button onClick={() => { setActiveTab('certificates'); setStep(1); setDonationResult(null) }} className="flex-1 py-3 bg-secondary text-black rounded-xl font-semibold">View Certificates</button>
            </div>
          </div>
        </div>
      )
    }

    return (
      <div className="max-w-2xl mx-auto">
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-white mb-2">Make a Donation</h2>
          <p className="text-gray-400">Your contribution makes a difference</p>
        </div>

        {step === 1 ? (
          <form onSubmit={handleSubmit} className="bg-gray-800 rounded-2xl p-6 border border-gray-700 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-3">Select Amount</label>
              <div className="grid grid-cols-5 gap-2 mb-4">
                {amounts.map((amt) => (
                  <button key={amt} type="button" onClick={() => { setSelectedAmount(amt); setCustomAmount('') }} className={`py-3 rounded-xl font-semibold text-sm transition-all ${selectedAmount === amt && !customAmount ? 'bg-secondary text-black' : 'bg-gray-700 text-white hover:bg-gray-600'}`}>₹{amt}</button>
                ))}
              </div>
              <input type="number" value={customAmount} onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(0) }} placeholder="Custom amount" className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white placeholder-gray-500 focus:border-secondary focus:outline-none" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Donor Name</label>
              <input type="text" value={formData.donorName} onChange={(e) => setFormData({ ...formData, donorName: e.target.value })} className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:border-secondary focus:outline-none" required />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Email</label>
                <input type="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:border-secondary focus:outline-none" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Phone (Optional)</label>
                <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:border-secondary focus:outline-none" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Program</label>
              <select value={formData.program} onChange={(e) => setFormData({ ...formData, program: e.target.value })} className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:border-secondary focus:outline-none">
                {programs.map((p) => <option key={p} value={p}>{p}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Message (Optional)</label>
              <textarea value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })} rows={3} className="w-full px-4 py-3 bg-gray-700 border border-gray-600 rounded-xl text-white focus:border-secondary focus:outline-none resize-none" />
            </div>

            <label className="flex items-center gap-3 cursor-pointer">
              <input type="checkbox" checked={formData.anonymous} onChange={(e) => setFormData({ ...formData, anonymous: e.target.checked })} className="w-5 h-5 rounded bg-gray-700 border-gray-600 text-secondary focus:ring-secondary" />
              <span className="text-gray-400 text-sm">Make this donation anonymous</span>
            </label>

            <button type="submit" className="w-full py-4 bg-gradient-to-r from-secondary to-yellow-500 text-black font-bold rounded-xl hover:shadow-lg hover:shadow-secondary/30 transition-all">
              Continue to Payment
            </button>
          </form>
        ) : (
          <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700 space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold text-white">Payment</h3>
              <button onClick={() => setStep(1)} className="text-gray-400 hover:text-white text-sm">← Edit</button>
            </div>

            <div className="bg-gray-700/50 rounded-xl p-4">
              <p className="text-gray-400 text-sm">Amount</p>
              <p className="text-3xl font-bold text-secondary">₹{finalAmount.toLocaleString()}</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-3">Payment Method</label>
              <div className="grid grid-cols-3 gap-3">
                {paymentMethods.map((m) => (
                  <button key={m.id} type="button" onClick={() => setPaymentMethod(m.id)} className={`py-4 rounded-xl font-medium text-sm transition-all flex flex-col items-center gap-2 ${paymentMethod === m.id ? 'bg-secondary text-black' : 'bg-gray-700 text-white hover:bg-gray-600'}`}>
                    <m.icon className="w-6 h-6" />
                    {m.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-4">
              <button onClick={() => setStep(1)} className="flex-1 py-4 bg-gray-700 text-white font-bold rounded-xl hover:bg-gray-600">Back</button>
              <button onClick={handlePayment} disabled={loading} className="flex-1 py-4 bg-gradient-to-r from-secondary to-yellow-500 text-black font-bold rounded-xl hover:shadow-lg hover:shadow-secondary/30 flex items-center justify-center gap-2 disabled:opacity-50">
                {loading ? <><RefreshCw className="w-5 h-5 animate-spin" /> Processing...</> : 'Pay Now'}
              </button>
            </div>
          </div>
        )}
      </div>
    )
  }

  const Donations = () => (
    <div className="bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-700">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
        <h3 className="text-base sm:text-lg font-bold text-white">All Donations</h3>
        <div className="flex flex-wrap gap-2">
          <select className="px-2 sm:px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-xs sm:text-sm text-white" value={filters.status} onChange={(e) => { setFilters({ ...filters, status: e.target.value }); fetchDonations(1) }}>
            <option value="">All</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
          <select className="px-2 sm:px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-xs sm:text-sm text-white" value={filters.program} onChange={(e) => { setFilters({ ...filters, program: e.target.value }); fetchDonations(1) }}>
            <option value="">All Programs</option>
            <option value="Education">Education</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Women Empowerment">Women</option>
            <option value="Environment">Environment</option>
          </select>
        </div>
      </div>
      <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
        <table className="w-full min-w-[700px] sm:min-w-0">
          <thead>
            <tr className="text-left text-xs sm:text-sm text-gray-400 border-b border-gray-700">
              <th className="pb-2 sm:pb-3">Receipt</th>
              <th className="pb-2 sm:pb-3">Donor</th>
              <th className="pb-2 sm:pb-3">Amount</th>
              <th className="pb-2 sm:pb-3 hidden md:table-cell">Program</th>
              <th className="pb-2 sm:pb-3">Date</th>
              <th className="pb-2 sm:pb-3">Status</th>
              <th className="pb-2 sm:pb-3">Actions</th>
            </tr>
          </thead>
          <tbody className="text-xs sm:text-sm">
            {donations.map((d, i) => (
              <tr key={i} className="border-b border-gray-700 last:border-0 hover:bg-gray-700/50">
                <td className="py-2 sm:py-3 font-mono text-gray-400">{d.receiptNumber || 'N/A'}</td>
                <td className="py-2 sm:py-3 text-white">{d.donorName}</td>
                <td className="py-2 sm:py-3 font-bold text-secondary">₹{d.amount.toLocaleString()}</td>
                <td className="py-2 sm:py-3 text-gray-400 hidden md:table-cell">{d.program}</td>
                <td className="py-2 sm:py-3 text-gray-400">{formatDate(d.completedAt || d.createdAt)}</td>
                <td className="py-2 sm:py-3">
                  <span className={`px-2 py-0.5 sm:px-2 sm:py-1 rounded-full text-xs font-semibold ${d.status === 'completed' ? 'bg-green-500/20 text-green-400' : d.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'}`}>
                    {d.status}
                  </span>
                </td>
                <td className="py-2 sm:py-3">
                  <div className="flex items-center gap-1 sm:gap-2">
                    {d.status === 'pending' && (
                      <>
                        <button onClick={() => handleVerifyDonation(d._id, 'completed')} className="p-1 sm:p-1.5 bg-green-500/20 text-green-400 rounded hover:bg-green-500/30" title="Verify">
                          <CheckCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                        <button onClick={() => handleVerifyDonation(d._id, 'rejected')} className="p-1 sm:p-1.5 bg-red-500/20 text-red-400 rounded hover:bg-red-500/30" title="Reject">
                          <XCircle className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                      </>
                    )}
                    <button onClick={() => { setEditData(d); setShowModal('donation-detail') }} className="p-1 sm:p-1.5 bg-blue-500/20 text-blue-400 rounded hover:bg-blue-500/30" title="View">
                      <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {pagination.pages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-4">
          <button disabled={pagination.page === 1} onClick={() => fetchDonations(pagination.page - 1)} className="p-1.5 sm:p-2 bg-gray-700 rounded-lg disabled:opacity-50"><ChevronLeft className="w-4 h-4" /></button>
          <span className="text-xs sm:text-sm text-gray-400">Page {pagination.page} of {pagination.pages}</span>
          <button disabled={pagination.page === pagination.pages} onClick={() => fetchDonations(pagination.page + 1)} className="p-1.5 sm:p-2 bg-gray-700 rounded-lg disabled:opacity-50"><ChevronRight className="w-4 h-4" /></button>
        </div>
      )}
    </div>
  )

  const CRM = () => {
    const [leads, setLeads] = useState([
      { id: 1, name: 'Rahul Sharma', email: 'rahul@email.com', phone: '+91 98765 43210', status: 'hot', lastContact: '2026-03-30', notes: 'Interested in Education program', totalPotential: 50000 },
      { id: 2, name: 'Priya Patel', email: 'priya@email.com', phone: '+91 87654 32109', status: 'warm', lastContact: '2026-03-28', notes: 'Wants to donate monthly', totalPotential: 25000 },
      { id: 3, name: 'Amit Singh', email: 'amit@email.com', phone: '+91 76543 21098', status: 'cold', lastContact: '2026-03-25', notes: 'Follow up needed', totalPotential: 10000 },
      { id: 4, name: 'Sneha Gupta', email: 'sneha@email.com', phone: '+91 65432 10987', status: 'hot', lastContact: '2026-03-29', notes: 'Corporate donor interest', totalPotential: 100000 },
      { id: 5, name: 'Vikram Rao', email: 'vikram@email.com', phone: '+91 54321 09876', status: 'warm', lastContact: '2026-03-27', notes: 'Attended charity event', totalPotential: 30000 },
    ])
    const [filterStatus, setFilterStatus] = useState('all')
    const [searchTerm, setSearchTerm] = useState('')

    const statusColors = {
      hot: 'bg-red-500/20 text-red-400 border-red-500/30',
      warm: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
      cold: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
    }

    const filteredLeads = leads.filter(lead => {
      const matchesStatus = filterStatus === 'all' || lead.status === filterStatus
      const matchesSearch = lead.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          lead.email.toLowerCase().includes(searchTerm.toLowerCase())
      return matchesStatus && matchesSearch
    })

    return (
      <div className="space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-white">CRM - Donor Relations</h3>
            <p className="text-gray-400 text-sm">Manage leads and donor relationships</p>
          </div>
          <button className="px-4 py-2 bg-secondary text-black rounded-lg font-semibold hover:bg-yellow-400 flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Lead
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
          <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
            <p className="text-2xl font-bold text-white">{leads.length}</p>
            <p className="text-sm text-gray-400">Total Leads</p>
          </div>
          <div className="bg-gray-800 rounded-xl p-4 border border-red-500/30">
            <p className="text-2xl font-bold text-red-400">{leads.filter(l => l.status === 'hot').length}</p>
            <p className="text-sm text-gray-400">Hot Leads</p>
          </div>
          <div className="bg-gray-800 rounded-xl p-4 border border-yellow-500/30">
            <p className="text-2xl font-bold text-yellow-400">{leads.filter(l => l.status === 'warm').length}</p>
            <p className="text-sm text-gray-400">Warm Leads</p>
          </div>
          <div className="bg-gray-800 rounded-xl p-4 border border-gray-700">
            <p className="text-2xl font-bold text-secondary">₹{(leads.reduce((sum, l) => sum + l.totalPotential, 0) / 100000).toFixed(1)}L</p>
            <p className="text-sm text-gray-400">Potential</p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search by name or email..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-secondary focus:outline-none"
            />
          </div>
          <div className="flex gap-2">
            {['all', 'hot', 'warm', 'cold'].map(status => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  filterStatus === status 
                    ? status === 'all' ? 'bg-secondary text-black' : statusColors[status]
                    : 'bg-gray-800 text-gray-400 border border-gray-700 hover:bg-gray-700'
                }`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>

        <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-700/50">
                <tr className="text-left text-xs sm:text-sm text-gray-400">
                  <th className="px-4 py-3 font-medium">Name</th>
                  <th className="px-4 py-3 font-medium hidden sm:table-cell">Contact</th>
                  <th className="px-4 py-3 font-medium">Status</th>
                  <th className="px-4 py-3 font-medium hidden md:table-cell">Last Contact</th>
                  <th className="px-4 py-3 font-medium hidden lg:table-cell">Potential</th>
                  <th className="px-4 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-700">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-700/30 transition-colors">
                    <td className="px-4 py-3">
                      <p className="font-medium text-white">{lead.name}</p>
                      <p className="text-xs text-gray-500 truncate max-w-[150px]">{lead.notes}</p>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell">
                      <p className="text-sm text-gray-300">{lead.email}</p>
                      <p className="text-xs text-gray-500">{lead.phone}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold border ${statusColors[lead.status]}`}>
                        {lead.status.charAt(0).toUpperCase() + lead.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-400 hidden md:table-cell">{lead.lastContact}</td>
                    <td className="px-4 py-3 font-bold text-secondary hidden lg:table-cell">₹{lead.totalPotential.toLocaleString()}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button className="p-1.5 bg-blue-500/20 text-blue-400 rounded hover:bg-blue-500/30"><Eye className="w-4 h-4" /></button>
                        <button onClick={() => { setEmailForm({ ...emailForm, to: lead.email }); setShowModal('email') }} className="p-1.5 bg-gray-700 text-secondary rounded hover:bg-gray-600"><Mail className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {filteredLeads.length === 0 && (
            <div className="text-center py-12">
              <UsersIcon className="w-12 h-12 text-gray-600 mx-auto mb-3" />
              <p className="text-gray-400">No leads found</p>
            </div>
          )}
        </div>
      </div>
    )
  }

  const Donors = () => (
    <div className="bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-700">
      <h3 className="text-base sm:text-lg font-bold mb-4 sm:mb-6 text-white">Donor Management</h3>
      {donors.length === 0 ? (
        <p className="text-gray-400 text-center py-8">No donors found</p>
      ) : (
        <div className="grid xs:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {donors.map((donor, i) => (
            <div key={i} className="border border-gray-700 rounded-xl p-3 sm:p-4 hover:bg-gray-700/50 transition-colors">
              <div className="flex items-center gap-2 sm:gap-3 mb-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-secondary/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <UsersIcon className="w-4 h-4 sm:w-5 sm:h-5 text-secondary" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-bold text-white text-sm sm:text-base truncate">{donor.name}</p>
                  <p className="text-xs text-gray-400 truncate">{donor.email}</p>
                </div>
              </div>
              <div className="flex justify-between text-xs sm:text-sm">
                <span className="text-gray-400">{donor.donationCount || 0} donations</span>
                <span className="font-bold text-secondary">₹{(donor.totalAmount || 0).toLocaleString()}</span>
              </div>
              <button onClick={() => { setEmailForm({ ...emailForm, to: donor.email }); setShowModal('email') }} className="mt-2 sm:mt-3 w-full px-2 sm:px-3 py-1.5 sm:py-2 bg-gray-700 text-secondary rounded-lg text-xs sm:text-sm hover:bg-gray-600 flex items-center justify-center gap-1">
                <Mail className="w-3 h-3 sm:w-4 sm:h-4" /> Email
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )

  const Programs = () => {
    const [showForm, setShowForm] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [formData, setFormData] = useState({ title: '', description: '', category: 'Education', icon: 'book', impactStats: { livesImpacted: 0, projectsCompleted: 0, volunteers: 0 }, goals: { target: 0, raised: 0 }, features: [], status: 'active', images: [] })

    const handleImageUpload = async (e) => {
      const files = Array.from(e.target.files)
      if (files.length === 0) return
      setUploading(true)
      try {
        const uploadedImages = await Promise.all(files.map(file => uploadImage(file)))
        setFormData(prev => ({ ...prev, images: [...prev.images, ...uploadedImages] }))
        toast.success('Image(s) uploaded!')
      } catch (err) {
        toast.error('Upload failed')
      }
      setUploading(false)
    }

    const removeImage = (index) => {
      setFormData(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }))
    }

    const handleSubmit = async (e) => {
      e.preventDefault()
      try {
        if (editData?._id) {
          await api.put(`/api/programs/${editData._id}`, formData)
          toast.success('Program updated')
        } else {
          await api.post('/api/programs', formData)
          toast.success('Program created')
        }
        fetchPrograms()
        setShowForm(false)
        setEditData(null)
        setFormData({ title: '', description: '', category: 'Education', icon: 'book', impactStats: { livesImpacted: 0, projectsCompleted: 0, volunteers: 0 }, goals: { target: 0, raised: 0 }, features: [], status: 'active', images: [] })
      } catch (err) { toast.error('Failed to save program') }
    }

    const handleEdit = (program) => {
      setEditData(program)
      setFormData(program)
      setShowForm(true)
    }

    return (
      <div className="space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <h3 className="text-base sm:text-lg font-bold text-white">Programs Management</h3>
          <button onClick={() => { setShowForm(true); setEditData(null); setFormData({ title: '', description: '', category: 'Education', icon: 'book', impactStats: { livesImpacted: 0, projectsCompleted: 0, volunteers: 0 }, goals: { target: 0, raised: 0 }, features: [], status: 'active', images: [] }) }} className="px-3 sm:px-4 py-2 bg-secondary text-black rounded-lg font-semibold hover:bg-yellow-400 flex items-center gap-2 text-sm">
            <Plus className="w-4 h-4" /> <span className="hidden xs:inline">Add</span> Program
          </button>
        </div>

        {showForm && (
          <div className="bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-secondary/50">
            <h4 className="text-base sm:text-lg font-bold text-white mb-4">{editData?._id ? 'Edit Program' : 'Add New Program'}</h4>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs sm:text-sm text-gray-400 mb-1">Title</label>
                  <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm" required />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm text-gray-400 mb-1">Category</label>
                  <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm">
                    <option value="Education">Education</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Women Empowerment">Women Empowerment</option>
                    <option value="Environment">Environment</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs sm:text-sm text-gray-400 mb-1">Description</label>
                <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={3} className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm" required />
              </div>
              <div>
                <label className="block text-xs sm:text-sm text-gray-400 mb-1">Images</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.images?.map((img, i) => (
                    <div key={i} className="relative group">
                      <img src={img} alt="" className="w-20 h-20 object-cover rounded-lg" />
                      <button type="button" onClick={() => removeImage(i)} className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center">X</button>
                    </div>
                  ))}
                </div>
                <input type="file" accept="image/*" multiple onChange={handleImageUpload} disabled={uploading} className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:bg-secondary file:text-black file:text-sm file:font-semibold" />
                {uploading && <p className="text-xs text-secondary mt-1">Uploading...</p>}
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs sm:text-sm text-gray-400 mb-1">Lives Impacted</label>
                  <input type="number" value={formData.impactStats.livesImpacted} onChange={(e) => setFormData({ ...formData, impactStats: { ...formData.impactStats, livesImpacted: parseInt(e.target.value) || 0 } })} className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm" />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm text-gray-400 mb-1">Target (₹)</label>
                  <input type="number" value={formData.goals.target} onChange={(e) => setFormData({ ...formData, goals: { ...formData.goals, target: parseInt(e.target.value) || 0 } })} className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm" />
                </div>
                <div className="col-span-2 sm:col-span-1">
                  <label className="block text-xs sm:text-sm text-gray-400 mb-1">Status</label>
                  <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm">
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col xs:flex-row gap-2 sm:gap-3">
                <button type="submit" className="px-4 sm:px-6 py-2 sm:py-2.5 bg-secondary text-black rounded-lg font-semibold text-sm">{editData?._id ? 'Update' : 'Create'}</button>
                <button type="button" onClick={() => { setShowForm(false); setEditData(null) }} className="px-4 sm:px-6 py-2 sm:py-2.5 bg-gray-700 text-white rounded-lg text-sm">Cancel</button>
              </div>
            </form>
          </div>
        )}

        <div className="space-y-3 sm:space-y-4">
          {programs.map((p, i) => (
            <div key={i} className="bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-700">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                <div className="min-w-0 flex-1">
                  <h3 className="font-bold text-base sm:text-lg text-white truncate">{p.title}</h3>
                  <span className="text-xs sm:text-sm text-gray-400">{p.category}</span>
                </div>
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span className={`px-2 sm:px-3 py-0.5 sm:py-1 rounded-full text-xs sm:text-sm font-semibold ${p.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>{p.status}</span>
                  <button onClick={() => handleEdit(p)} className="p-1.5 sm:p-2 bg-blue-500/20 text-blue-400 rounded hover:bg-blue-500/30"><Edit className="w-3 h-3 sm:w-4 sm:h-4" /></button>
                  <button onClick={() => handleDeleteProgram(p._id)} className="p-1.5 sm:p-2 bg-red-500/20 text-red-400 rounded hover:bg-red-500/30"><Trash2 className="w-3 h-3 sm:w-4 sm:h-4" /></button>
                </div>
              </div>
              <p className="text-gray-400 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">{p.description}</p>
              <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
                <div className="bg-gray-700/50 rounded-lg p-2 sm:p-3">
                  <p className="font-bold text-secondary text-sm sm:text-lg">{p.impactStats?.livesImpacted?.toLocaleString() || 0}</p>
                  <p className="text-xs text-gray-400 hidden xs:block">Lives</p>
                </div>
                <div className="bg-gray-700/50 rounded-lg p-2 sm:p-3">
                  <p className="font-bold text-secondary text-sm sm:text-lg">₹{((p.goals?.raised || 0) / 100000).toFixed(1)}L</p>
                  <p className="text-xs text-gray-400 hidden xs:block">Raised</p>
                </div>
                <div className="bg-gray-700/50 rounded-lg p-2 sm:p-3">
                  <p className="font-bold text-secondary text-sm sm:text-lg">₹{((p.goals?.target || 0) / 100000).toFixed(1)}L</p>
                  <p className="text-xs text-gray-400 hidden xs:block">Target</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const Blogs = () => {
    const [showForm, setShowForm] = useState(false)
    const [uploading, setUploading] = useState(false)
    const [formData, setFormData] = useState({ title: '', content: '', excerpt: '', category: 'News', authorName: 'Admin', tags: '', featured: false, published: true, images: [] })

    const handleImageUpload = async (e) => {
      const files = Array.from(e.target.files)
      if (files.length === 0) return
      setUploading(true)
      try {
        const uploadedImages = await Promise.all(files.map(file => uploadImage(file)))
        setFormData(prev => ({ ...prev, images: [...prev.images, ...uploadedImages] }))
        toast.success('Image(s) uploaded!')
      } catch (err) {
        toast.error('Upload failed')
      }
      setUploading(false)
    }

    const removeImage = (index) => {
      setFormData(prev => ({ ...prev, images: prev.images.filter((_, i) => i !== index) }))
    }

    const handleSubmit = async (e) => {
      e.preventDefault()
      try {
        const data = { ...formData, tags: formData.tags.split(',').map(t => t.trim()) }
        if (editData?._id) {
          await api.put(`/api/blogs/${editData._id}`, data)
          toast.success('Blog updated')
        } else {
          await api.post('/api/blogs', data)
          toast.success('Blog created')
        }
        fetchBlogs()
        setShowForm(false)
        setEditData(null)
        setFormData({ title: '', content: '', excerpt: '', category: 'News', authorName: 'Admin', tags: '', featured: false, published: true, images: [] })
      } catch (err) { toast.error('Failed to save blog') }
    }

    const handleEdit = (blog) => {
      setEditData(blog)
      setFormData({ ...blog, tags: blog.tags?.join(', ') || '' })
      setShowForm(true)
    }

    return (
      <div className="space-y-4 sm:space-y-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <h3 className="text-base sm:text-lg font-bold text-white">Blog Management</h3>
          <button onClick={() => { setShowForm(true); setEditData(null); setFormData({ title: '', content: '', excerpt: '', category: 'News', authorName: 'Admin', tags: '', featured: false, published: true, images: [] }) }} className="px-3 sm:px-4 py-2 bg-secondary text-black rounded-lg font-semibold hover:bg-yellow-400 flex items-center gap-2 text-sm">
            <Plus className="w-4 h-4" /> <span className="hidden xs:inline">Add</span> Blog
          </button>
        </div>

        {showForm && (
          <div className="bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-secondary/50">
            <h4 className="text-base sm:text-lg font-bold text-white mb-4">{editData?._id ? 'Edit Blog' : 'Add New Blog'}</h4>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs sm:text-sm text-gray-400 mb-1">Title</label>
                  <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm" required />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm text-gray-400 mb-1">Category</label>
                  <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm">
                    <option value="News">News</option>
                    <option value="Impact Report">Impact Report</option>
                    <option value="Success Story">Success Story</option>
                    <option value="Campaign Update">Campaign</option>
                    <option value="Event">Event</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs sm:text-sm text-gray-400 mb-1">Excerpt</label>
                <input type="text" value={formData.excerpt} onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })} className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm" required />
              </div>
              <div>
                <label className="block text-xs sm:text-sm text-gray-400 mb-1">Content</label>
                <textarea value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} rows={4} className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm" required />
              </div>
              <div>
                <label className="block text-xs sm:text-sm text-gray-400 mb-1">Images</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {formData.images?.map((img, i) => (
                    <div key={i} className="relative group">
                      <img src={img} alt="" className="w-20 h-20 object-cover rounded-lg" />
                      <button type="button" onClick={() => removeImage(i)} className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white rounded-full text-xs flex items-center justify-center">X</button>
                    </div>
                  ))}
                </div>
                <input type="file" accept="image/*" multiple onChange={handleImageUpload} disabled={uploading} className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm file:mr-4 file:py-1 file:px-3 file:rounded file:border-0 file:bg-secondary file:text-black file:text-sm file:font-semibold" />
                {uploading && <p className="text-xs text-secondary mt-1">Uploading...</p>}
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs sm:text-sm text-gray-400 mb-1">Author</label>
                  <input type="text" value={formData.authorName} onChange={(e) => setFormData({ ...formData, authorName: e.target.value })} className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm" />
                </div>
                <div>
                  <label className="block text-xs sm:text-sm text-gray-400 mb-1">Tags</label>
                  <input type="text" value={formData.tags} onChange={(e) => setFormData({ ...formData, tags: e.target.value })} className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm" placeholder="tag1, tag2" />
                </div>
                <div className="flex items-center gap-4 pt-6 sm:pt-7">
                  <label className="flex items-center gap-1.5 sm:gap-2 text-gray-400 text-xs sm:text-sm"><input type="checkbox" checked={formData.featured} onChange={(e) => setFormData({ ...formData, featured: e.target.checked })} className="w-3 h-3 sm:w-4 sm:h-4" /> Featured</label>
                  <label className="flex items-center gap-1.5 sm:gap-2 text-gray-400 text-xs sm:text-sm"><input type="checkbox" checked={formData.published} onChange={(e) => setFormData({ ...formData, published: e.target.checked })} className="w-3 h-3 sm:w-4 sm:h-4" /> Published</label>
                </div>
              </div>
              <div className="flex flex-col xs:flex-row gap-2 sm:gap-3">
                <button type="submit" className="px-4 sm:px-6 py-2 sm:py-2.5 bg-secondary text-black rounded-lg font-semibold text-sm">{editData?._id ? 'Update' : 'Create'}</button>
                <button type="button" onClick={() => { setShowForm(false); setEditData(null) }} className="px-4 sm:px-6 py-2 sm:py-2.5 bg-gray-700 text-white rounded-lg text-sm">Cancel</button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-700">
          <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
            <table className="w-full min-w-[600px] sm:min-w-0">
              <thead>
                <tr className="text-left text-xs sm:text-sm text-gray-400 border-b border-gray-700">
                  <th className="pb-2 sm:pb-3">Title</th>
                  <th className="pb-2 sm:pb-3 hidden sm:table-cell">Category</th>
                  <th className="pb-2 sm:pb-3 hidden md:table-cell">Author</th>
                  <th className="pb-2 sm:pb-3">Status</th>
                  <th className="pb-2 sm:pb-3">Actions</th>
                </tr>
              </thead>
              <tbody className="text-xs sm:text-sm">
                {blogs.map((blog, i) => (
                  <tr key={i} className="border-b border-gray-700 last:border-0">
                    <td className="py-2 sm:py-3 text-white max-w-[150px] sm:max-w-none truncate">{blog.title}</td>
                    <td className="py-2 sm:py-3 text-gray-400 hidden sm:table-cell">{blog.category}</td>
                    <td className="py-2 sm:py-3 text-gray-400 hidden md:table-cell">{blog.authorName}</td>
                    <td className="py-2 sm:py-3">
                      <span className={`px-2 py-0.5 sm:px-2 sm:py-1 rounded-full text-xs font-semibold ${blog.published ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                        {blog.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="py-2 sm:py-3">
                      <div className="flex items-center gap-1 sm:gap-2">
                        <button onClick={() => handleEdit(blog)} className="p-1 sm:p-1.5 bg-blue-500/20 text-blue-400 rounded hover:bg-blue-500/30"><Edit className="w-3 h-3 sm:w-4 sm:h-4" /></button>
                        <button onClick={() => handleDeleteBlog(blog._id)} className="p-1 sm:p-1.5 bg-red-500/20 text-red-400 rounded hover:bg-red-500/30"><Trash2 className="w-3 h-3 sm:w-4 sm:h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    )
  }

  const Users = () => (
    <div className="bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-700">
      <h3 className="text-base sm:text-lg font-bold mb-4 sm:mb-6 text-white">User Management</h3>
      {users.length === 0 ? (
        <p className="text-gray-400 text-center py-8">No users found</p>
      ) : (
        <div className="overflow-x-auto -mx-4 sm:mx-0 px-4 sm:px-0">
          <table className="w-full min-w-[500px] sm:min-w-0">
            <thead>
              <tr className="text-left text-xs sm:text-sm text-gray-400 border-b border-gray-700">
                <th className="pb-2 sm:pb-3">Name</th>
                <th className="pb-2 sm:pb-3 hidden sm:table-cell">Email</th>
                <th className="pb-2 sm:pb-3">Role</th>
                <th className="pb-2 sm:pb-3 hidden md:table-cell">Joined</th>
                <th className="pb-2 sm:pb-3">Actions</th>
              </tr>
            </thead>
            <tbody className="text-xs sm:text-sm">
              {users.map((u, i) => (
                <tr key={i} className="border-b border-gray-700 last:border-0">
                  <td className="py-2 sm:py-3 text-white">{u.name}</td>
                  <td className="py-2 sm:py-3 text-gray-400 hidden sm:table-cell truncate max-w-[150px]">{u.email}</td>
                  <td className="py-2 sm:py-3">
                    <select value={u.role} onChange={(e) => handleUpdateUser(u._id, e.target.value)} className="px-1.5 sm:px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-xs sm:text-sm">
                      <option value="donor">Donor</option>
                      <option value="volunteer">Volunteer</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td className="py-2 sm:py-3 text-gray-400 hidden md:table-cell">{formatDate(u.createdAt)}</td>
                  <td className="py-2 sm:py-3">
                    <div className="flex items-center gap-1 sm:gap-2">
                      <button onClick={() => { setEmailForm({ ...emailForm, to: u.email }); setShowModal('email') }} className="p-1 sm:p-1.5 bg-gray-700 text-secondary rounded hover:bg-gray-600"><Mail className="w-3 h-3 sm:w-4 sm:h-4" /></button>
                      {u.role !== 'admin' && <button onClick={() => handleDeleteUser(u._id)} className="p-1 sm:p-1.5 bg-red-500/20 text-red-400 rounded hover:bg-red-500/30"><Trash2 className="w-3 h-3 sm:w-4 sm:h-4" /></button>}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {pagination.pages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-4">
          <button disabled={pagination.page === 1} onClick={() => fetchUsers(pagination.page - 1)} className="p-1.5 sm:p-2 bg-gray-700 rounded-lg disabled:opacity-50"><ChevronLeft className="w-4 h-4" /></button>
          <span className="text-xs sm:text-sm text-gray-400">Page {pagination.page} of {pagination.pages}</span>
          <button disabled={pagination.page === pagination.pages} onClick={() => fetchUsers(pagination.page + 1)} className="p-1.5 sm:p-2 bg-gray-700 rounded-lg disabled:opacity-50"><ChevronRight className="w-4 h-4" /></button>
        </div>
      )}
    </div>
  )

  const Certificates = () => (
    <div className="bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-700">
      <h3 className="text-base sm:text-lg font-bold mb-4 sm:mb-6 text-white">Certificate Management</h3>
      {certificates.length === 0 ? (
        <p className="text-gray-400 text-center py-8">No certificates found</p>
      ) : (
        <div className="grid xs:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {certificates.map((cert, i) => (
            <div key={i} className="border border-gray-700 rounded-xl p-3 sm:p-4 hover:bg-gray-700/50 transition-colors">
              <div className="flex items-center gap-2 sm:gap-3 mb-3">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-secondary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Award className="w-4 h-4 sm:w-5 sm:h-5 text-secondary" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-mono text-xs text-gray-400 truncate">{cert.certificateId}</p>
                  <p className="font-bold text-white text-sm truncate">{cert.donorName}</p>
                </div>
              </div>
              <div className="text-xs sm:text-sm space-y-1 mb-3">
                <p><span className="text-gray-400">Amount:</span> <span className="font-bold text-secondary">₹{cert.amount.toLocaleString()}</span></p>
                <p><span className="text-gray-400">Date:</span> {formatDate(cert.completedAt)}</p>
              </div>
              <a href={`/api/certificates/${cert.certificateId}/download`} target="_blank" className="w-full px-2 sm:px-3 py-1.5 sm:py-2 bg-secondary text-black rounded-lg text-xs sm:text-sm font-medium hover:bg-yellow-400 flex items-center justify-center gap-1">
                <Download className="w-3 h-3 sm:w-4 sm:h-4" /> Download
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  )

  const Analytics = () => (
    <div className="space-y-4 sm:space-y-6">
      <h3 className="text-base sm:text-lg font-bold text-white">Analytics & Reports</h3>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatCard icon={TrendingUp} value={formatCurrency(analytics?.totalDonations || 0)} label="Total Raised" color="from-green-500 to-green-600" />
        <StatCard icon={Activity} value={analytics?.totalDonationsCount || 0} label="Donations" color="from-blue-500 to-blue-600" />
        <StatCard icon={UsersIcon} value={analytics?.recentDonors?.length || 0} label="Total Users" color="from-secondary to-yellow-500" />
        <StatCard icon={BarChart} value={analytics?.donationsByProgram?.length || 0} label="Programs" color="from-purple-500 to-purple-600" />
      </div>

      <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
        {analytics?.donationsByMonth?.length > 0 && (
          <div className="bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-700">
            <h4 className="font-bold text-white mb-3 sm:mb-4 text-sm sm:text-base">Monthly Donations</h4>
            <ResponsiveContainer width="100%" height={250}>
              <RechartsBar data={analytics.donationsByMonth}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="_id" stroke="#9CA3AF" fontSize={10} />
                <YAxis stroke="#9CA3AF" fontSize={10} tickFormatter={(v) => `₹${(v/100000).toFixed(0)}L`} />
                <Tooltip formatter={(v) => [`₹${v.toLocaleString()}`, 'Amount']} contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px' }} />
                <Bar dataKey="total" fill="#D4A84B" radius={[6, 6, 0, 0]} />
              </RechartsBar>
            </ResponsiveContainer>
          </div>
        )}

        {analytics?.donationsByProgram?.length > 0 && (
          <div className="bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-700">
            <h4 className="font-bold text-white mb-3 sm:mb-4 text-sm sm:text-base">By Program</h4>
            <ResponsiveContainer width="100%" height={250}>
              <RechartsPie>
                <Pie data={analytics.donationsByProgram} cx="50%" cy="50%" outerRadius={80} dataKey="total" label={({ name, percent }) => `${(percent * 100).toFixed(0)}%`} labelLine={false}>
                  {analytics.donationsByProgram.map((entry, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip formatter={(v) => [`₹${v.toLocaleString()}`, 'Amount']} contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px' }} />
                <Legend wrapperStyle={{ fontSize: '12px' }} />
              </RechartsPie>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {analytics?.donationsByPaymentMethod?.length > 0 && (
        <div className="bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-700">
          <h4 className="font-bold text-white mb-3 sm:mb-4 text-sm sm:text-base">Payment Methods</h4>
          <div className="grid grid-cols-3 gap-2 sm:gap-4">
            {analytics.donationsByPaymentMethod.map((method, i) => (
              <div key={i} className="bg-gray-700/50 rounded-xl p-3 sm:p-4 text-center">
                <p className="font-display text-lg sm:text-2xl font-bold text-secondary">{method.count}</p>
                <p className="text-xs sm:text-sm text-gray-400">{method._id}</p>
                <p className="text-xs text-secondary">₹{method.total.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )

  const Email = () => (
    <div className="space-y-4 sm:space-y-6">
      <h3 className="text-base sm:text-lg font-bold text-white">Email & Notifications</h3>
      
      <div className="grid lg:grid-cols-2 gap-4 sm:gap-6">
        <div className="bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-700">
          <h4 className="font-bold text-white mb-3 sm:mb-4 flex items-center gap-2 text-sm sm:text-base"><Mail className="w-4 h-4 sm:w-5 sm:h-5 text-secondary" /> Send Email</h4>
          <form onSubmit={handleSendEmail} className="space-y-3 sm:space-y-4">
            <div>
              <label className="block text-xs sm:text-sm text-gray-400 mb-1">Recipient Email</label>
              <input type="email" value={emailForm.to} onChange={(e) => setEmailForm({ ...emailForm, to: e.target.value })} className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm" required />
            </div>
            <div>
              <label className="block text-xs sm:text-sm text-gray-400 mb-1">Subject</label>
              <input type="text" value={emailForm.subject} onChange={(e) => setEmailForm({ ...emailForm, subject: e.target.value })} className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm" required />
            </div>
            <div>
              <label className="block text-xs sm:text-sm text-gray-400 mb-1">Message</label>
              <textarea value={emailForm.message} onChange={(e) => setEmailForm({ ...emailForm, message: e.target.value })} rows={4} className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm" required />
            </div>
            <button type="submit" className="w-full px-4 sm:px-6 py-2.5 sm:py-3 bg-secondary text-black rounded-lg font-semibold hover:bg-yellow-400 flex items-center justify-center gap-2 text-sm">
              <Send className="w-4 h-4" /> Send Email
            </button>
          </form>
        </div>

        <div className="bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-700">
          <h4 className="font-bold text-white mb-3 sm:mb-4 flex items-center gap-2 text-sm sm:text-base"><Send className="w-4 h-4 sm:w-5 sm:h-5 text-secondary" /> Broadcast</h4>
          <form onSubmit={handleBroadcast} className="space-y-3 sm:space-y-4">
            <div>
              <label className="block text-xs sm:text-sm text-gray-400 mb-1">Target</label>
              <select value={broadcastForm.target} onChange={(e) => setBroadcastForm({ ...broadcastForm, target: e.target.value })} className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm">
                <option value="all">All Users</option>
                <option value="donors">All Donors</option>
                <option value="admin">Admins Only</option>
              </select>
            </div>
            <div>
              <label className="block text-xs sm:text-sm text-gray-400 mb-1">Subject</label>
              <input type="text" value={broadcastForm.subject} onChange={(e) => setBroadcastForm({ ...broadcastForm, subject: e.target.value })} className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm" required />
            </div>
            <div>
              <label className="block text-xs sm:text-sm text-gray-400 mb-1">Message</label>
              <textarea value={broadcastForm.message} onChange={(e) => setBroadcastForm({ ...broadcastForm, message: e.target.value })} rows={4} className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm" required />
            </div>
            <button type="submit" className="w-full px-4 sm:px-6 py-2.5 sm:py-3 bg-secondary text-black rounded-lg font-semibold hover:bg-yellow-400 flex items-center justify-center gap-2 text-sm">
              <Send className="w-4 h-4" /> Send Broadcast
            </button>
          </form>
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-700">
        <h4 className="font-bold text-white mb-3 sm:mb-4 text-sm sm:text-base">Quick Actions</h4>
        <div className="grid grid-cols-1 xs:grid-cols-3 gap-3">
          <button onClick={() => { setBroadcastForm({ subject: 'Thank You for Your Donation!', message: 'Dear Donor,\n\nThank you for your generous donation...', target: 'donors' }); setShowModal('broadcast') }} className="p-3 sm:p-4 bg-gray-700 rounded-xl hover:bg-gray-600 text-left">
            <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-secondary mb-2" />
            <p className="font-medium text-white text-sm">Thank You Email</p>
            <p className="text-xs text-gray-400">Send to donors</p>
          </button>
          <button onClick={() => { setBroadcastForm({ subject: 'Newsletter', message: 'Update message...', target: 'all' }); setShowModal('broadcast') }} className="p-3 sm:p-4 bg-gray-700 rounded-xl hover:bg-gray-600 text-left">
            <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-secondary mb-2" />
            <p className="font-medium text-white text-sm">Newsletter</p>
            <p className="text-xs text-gray-400">Send to all</p>
          </button>
          <button onClick={() => { setBroadcastForm({ subject: 'Campaign Alert', message: 'Support needed...', target: 'all' }); setShowModal('broadcast') }} className="p-3 sm:p-4 bg-gray-700 rounded-xl hover:bg-gray-600 text-left">
            <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-secondary mb-2" />
            <p className="font-medium text-white text-sm">Campaign</p>
            <p className="text-xs text-gray-400">Urgent appeal</p>
          </button>
        </div>
      </div>
    </div>
  )

  const Reports = () => (
    <div className="bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-700">
      <h3 className="text-base sm:text-lg font-bold mb-4 sm:mb-6 text-white">Reports & Export</h3>
      <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
        <div className="border border-gray-700 rounded-xl p-3 sm:p-4 hover:bg-gray-700/50 transition-colors">
          <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
              <FileText className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" />
            </div>
            <div className="min-w-0">
              <p className="font-bold text-white text-sm sm:text-base truncate">Donations</p>
              <p className="text-xs text-gray-400 hidden sm:block">Export CSV</p>
            </div>
          </div>
          <button onClick={exportDonations} className="w-full px-2 sm:px-3 py-1.5 sm:py-2 bg-green-500 text-white rounded-lg text-xs sm:text-sm font-medium hover:bg-green-600 flex items-center justify-center gap-1">
            <Download className="w-3 h-3 sm:w-4 sm:h-4" /> Export
          </button>
        </div>
        <div className="border border-gray-700 rounded-xl p-3 sm:p-4 hover:bg-gray-700/50 transition-colors">
          <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <UsersIcon className="w-4 h-4 sm:w-5 sm:h-5 text-blue-500" />
            </div>
            <div className="min-w-0">
              <p className="font-bold text-white text-sm sm:text-base truncate">Donors</p>
              <p className="text-xs text-gray-400 hidden sm:block">Export CSV</p>
            </div>
          </div>
          <button onClick={() => toast.success('Coming soon!')} className="w-full px-2 sm:px-3 py-1.5 sm:py-2 bg-blue-500 text-white rounded-lg text-xs sm:text-sm font-medium hover:bg-blue-600 flex items-center justify-center gap-1">
            <Download className="w-3 h-3 sm:w-4 sm:h-4" /> Export
          </button>
        </div>
        <div className="border border-gray-700 rounded-xl p-3 sm:p-4 hover:bg-gray-700/50 transition-colors">
          <div className="flex items-center gap-2 sm:gap-3 mb-2 sm:mb-3">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <BarChart className="w-4 h-4 sm:w-5 sm:h-5 text-purple-500" />
            </div>
            <div className="min-w-0">
              <p className="font-bold text-white text-sm sm:text-base truncate">Analytics</p>
              <p className="text-xs text-gray-400 hidden sm:block">View charts</p>
            </div>
          </div>
          <button onClick={() => setActiveTab('analytics')} className="w-full px-2 sm:px-3 py-1.5 sm:py-2 bg-purple-500 text-white rounded-lg text-xs sm:text-sm font-medium hover:bg-purple-600 flex items-center justify-center gap-1">
            <Eye className="w-3 h-3 sm:w-4 sm:h-4" /> View
          </button>
        </div>
      </div>
      
      {stats?.monthlyDonations?.length > 0 && (
        <div className="p-4 sm:p-6 bg-gray-700/50 rounded-xl">
          <h4 className="font-bold mb-3 sm:mb-4 text-white text-sm sm:text-base">Monthly Summary</h4>
          <div className="space-y-2">
            {stats.monthlyDonations.map((m, i) => (
              <div key={i} className="flex justify-between text-xs sm:text-sm">
                <span className="text-gray-400">{m._id}</span>
                <span className="font-bold text-secondary">{formatCurrency(m.total)} ({m.count})</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )

  const Transparency = () => (
    <div className="space-y-4 sm:space-y-6">
      <div className="bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-700">
        <h3 className="text-base sm:text-lg font-bold mb-4 sm:mb-6 text-white">Fund Allocation</h3>
        {stats?.programBreakdown?.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-6">
              {stats.programBreakdown.map((item, i) => {
                const colors = ['from-blue-500 to-blue-600', 'from-red-500 to-red-600', 'from-purple-500 to-purple-600', 'from-green-500 to-green-600']
                return (
                  <div key={i} className="text-center">
                    <div className={`w-12 h-12 sm:w-16 sm:h-16 mx-auto bg-gradient-to-br ${colors[i % colors.length]} rounded-xl sm:rounded-2xl flex items-center justify-center mb-2`}>
                      <span className="text-white font-bold text-sm sm:text-lg">{Math.round((item.total / stats.totalDonations) * 100)}%</span>
                    </div>
                    <p className="text-xs sm:text-sm font-medium text-white truncate">{item._id}</p>
                    <p className="text-xs text-gray-400">{formatCurrency(item.total)}</p>
                  </div>
                )
              })}
            </div>
            <div className="space-y-2 sm:space-y-3">
              {stats.programBreakdown.map((item, i) => {
                const colors = ['bg-blue-500', 'bg-red-500', 'bg-purple-500', 'bg-green-500']
                return (
                  <div key={i} className="flex items-center gap-2 sm:gap-4">
                    <span className="w-16 sm:w-24 text-xs sm:text-sm font-medium text-gray-400 truncate">{item._id}</span>
                    <div className="flex-1 h-3 sm:h-4 bg-gray-700 rounded-full overflow-hidden">
                      <div className={`h-full ${colors[i % colors.length]} rounded-full`} style={{ width: `${(item.total / stats.totalDonations) * 100}%` }}></div>
                    </div>
                    <span className="w-12 text-xs sm:text-sm font-bold text-secondary text-right flex-shrink-0">{Math.round((item.total / stats.totalDonations) * 100)}%</span>
                  </div>
                )
              })}
            </div>
          </>
        ) : (
          <p className="text-gray-400 text-center py-8">No allocation data available</p>
        )}
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-black flex flex-col lg:flex-row">
      {/* Mobile Header */}
      <header className="lg:hidden bg-gray-900 border-b border-gray-800 p-4 flex items-center justify-between sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 hover:bg-gray-800 rounded-lg text-gray-400">
            <Menu className="w-6 h-6" />
          </button>
          <div className="w-8 h-8 bg-gradient-to-br from-secondary to-yellow-500 rounded-lg flex items-center justify-center">
            <Shield className="w-4 h-4 text-black" />
          </div>
        </div>
        <h1 className="text-lg font-bold text-white capitalize">{activeTab === 'dashboard' ? 'Dashboard' : activeTab}</h1>
        <button onClick={() => { fetchStats(); fetchAnalytics() }} className="p-2 hover:bg-gray-800 rounded-lg text-gray-400">
          <RefreshCw className="w-5 h-5" />
        </button>
      </header>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/70 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-50 bg-gray-900 shadow-xl transform transition-all duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} ${sidebarCollapsed ? 'w-20' : 'w-72'} border-r border-gray-800 flex-shrink-0`}>
        <div className="p-4 border-b border-gray-800 flex items-center justify-between">
          {!sidebarCollapsed && (
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-secondary to-yellow-500 rounded-xl flex items-center justify-center">
                <Shield className="w-5 h-5 text-black" />
              </div>
              <div>
                <p className="font-bold text-secondary text-sm">Admin</p>
                <p className="text-xs text-gray-400">Panel</p>
              </div>
            </Link>
          )}
          {sidebarCollapsed && (
            <div className="w-10 h-10 bg-gradient-to-br from-secondary to-yellow-500 rounded-xl flex items-center justify-center mx-auto">
              <Shield className="w-5 h-5 text-black" />
            </div>
          )}
        </div>

        <nav className="p-3 space-y-1 overflow-y-auto max-h-[calc(100vh-140px)]">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => { setActiveTab(item.id); setSidebarOpen(false) }}
              className={`w-full flex items-center space-x-3 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg transition-colors ${sidebarCollapsed ? 'justify-center' : ''} ${
                activeTab === item.id ? 'bg-secondary text-black' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
              title={sidebarCollapsed ? item.label : ''}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {!sidebarCollapsed && <span className="font-medium text-sm truncate">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-3 border-t border-gray-800 space-y-1">
          <button onClick={handleLogout} className={`w-full flex items-center space-x-3 px-3 sm:px-4 py-2 text-red-400 hover:bg-red-500/10 rounded-lg ${sidebarCollapsed ? 'justify-center' : ''}`}>
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {!sidebarCollapsed && <span className="text-sm font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {/* Desktop Header */}
      <div className="hidden lg:block absolute top-0 right-0 left-72 p-4 z-30">
        <div className="flex items-center justify-end">
          <button onClick={fetchStats} className="p-2 hover:bg-gray-800 rounded-lg text-gray-400" title="Refresh">
            <RefreshCw className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 p-4 sm:p-6 overflow-auto">
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'donate' && <DonateSection user={user} />}
          {activeTab === 'donations' && <Donations />}
          {activeTab === 'donors' && <Donors />}
          {activeTab === 'crm' && <CRM />}
          {activeTab === 'programs' && <Programs />}
          {activeTab === 'blogs' && <Blogs />}
          {activeTab === 'users' && <Users />}
          {activeTab === 'certificates' && <Certificates />}
          {activeTab === 'analytics' && <Analytics />}
          {activeTab === 'email' && <Email />}
          {activeTab === 'reports' && <Reports />}
          {activeTab === 'transparency' && <Transparency />}
        </main>
      </div>

      {/* Broadcast Modal */}
      {showModal === 'broadcast' && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 w-full max-w-md border border-gray-700 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base sm:text-lg font-bold text-white">Send Broadcast</h3>
              <button onClick={() => setShowModal(null)} className="p-1.5 hover:bg-gray-700 rounded-lg text-gray-400"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleBroadcast} className="space-y-4">
              <div>
                <label className="block text-xs sm:text-sm text-gray-400 mb-1">Target</label>
                <select value={broadcastForm.target} onChange={(e) => setBroadcastForm({ ...broadcastForm, target: e.target.value })} className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm">
                  <option value="all">All Users</option>
                  <option value="donors">All Donors</option>
                  <option value="admin">Admins Only</option>
                </select>
              </div>
              <div>
                <label className="block text-xs sm:text-sm text-gray-400 mb-1">Subject</label>
                <input type="text" value={broadcastForm.subject} onChange={(e) => setBroadcastForm({ ...broadcastForm, subject: e.target.value })} className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm" required />
              </div>
              <div>
                <label className="block text-xs sm:text-sm text-gray-400 mb-1">Message</label>
                <textarea value={broadcastForm.message} onChange={(e) => setBroadcastForm({ ...broadcastForm, message: e.target.value })} rows={4} className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm" required />
              </div>
              <div className="flex flex-col xs:flex-row gap-2 sm:gap-3">
                <button type="submit" className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 bg-secondary text-black rounded-lg font-semibold text-sm">Send</button>
                <button type="button" onClick={() => setShowModal(null)} className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 bg-gray-700 text-white rounded-lg text-sm">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Email Modal */}
      {showModal === 'email' && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-xl sm:rounded-2xl p-4 sm:p-6 w-full max-w-md border border-gray-700 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-base sm:text-lg font-bold text-white">Send Email</h3>
              <button onClick={() => setShowModal(null)} className="p-1.5 hover:bg-gray-700 rounded-lg text-gray-400"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSendEmail} className="space-y-4">
              <div>
                <label className="block text-xs sm:text-sm text-gray-400 mb-1">To</label>
                <input type="email" value={emailForm.to} onChange={(e) => setEmailForm({ ...emailForm, to: e.target.value })} className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm" required />
              </div>
              <div>
                <label className="block text-xs sm:text-sm text-gray-400 mb-1">Subject</label>
                <input type="text" value={emailForm.subject} onChange={(e) => setEmailForm({ ...emailForm, subject: e.target.value })} className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm" required />
              </div>
              <div>
                <label className="block text-xs sm:text-sm text-gray-400 mb-1">Message</label>
                <textarea value={emailForm.message} onChange={(e) => setEmailForm({ ...emailForm, message: e.target.value })} rows={4} className="w-full px-3 sm:px-4 py-2 sm:py-3 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm" required />
              </div>
              <div className="flex flex-col xs:flex-row gap-2 sm:gap-3">
                <button type="submit" className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 bg-secondary text-black rounded-lg font-semibold text-sm">Send</button>
                <button type="button" onClick={() => setShowModal(null)} className="flex-1 px-4 sm:px-6 py-2.5 sm:py-3 bg-gray-700 text-white rounded-lg text-sm">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Admin
