import { useState, useEffect } from 'react'
import { Link, Navigate } from 'react-router-dom'
import { BarChart3, Users as UsersIcon, DollarSign, FileText, Settings, LogOut, Heart, Award, LayoutDashboard, Menu, Eye, Download, Shield, ChevronLeft, ChevronRight, RefreshCw, Plus, Edit, Trash2, Mail, Send, CheckCircle, XCircle, AlertCircle, TrendingUp, BarChart, PieChart, Activity, X, Search, Filter, EyeOff, Check, Clock } from 'lucide-react'
import { BarChart as RechartsBar, Bar, LineChart, Line, PieChart as RechartsPie, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import axios from 'axios'
import toast from 'react-hot-toast'
import AdminLogin from './AdminLogin'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api'
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

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
      const response = await api.get('/admin/stats')
      setStats(response.data)
    } catch (err) { console.error('Error fetching stats:', err) }
  }

  const fetchAnalytics = async () => {
    try {
      const response = await api.get('/admin/analytics')
      setAnalytics(response.data)
    } catch (err) { console.error('Error fetching analytics:', err) }
  }

  const fetchDonations = async (page = 1) => {
    try {
      const params = new URLSearchParams({ page, limit: 10 })
      if (filters.status) params.append('status', filters.status)
      if (filters.program) params.append('program', filters.program)
      const response = await api.get(`/admin/donations?${params}`)
      setDonations(response.data.donations)
      setPagination({ page: response.data.page, pages: response.data.pages, total: response.data.total })
    } catch (err) { console.error('Error fetching donations:', err) }
  }

  const fetchDonors = async (page = 1) => {
    try {
      const response = await api.get(`/admin/donors?page=${page}&limit=12`)
      setDonors(response.data.donors)
    } catch (err) { console.error('Error fetching donors:', err) }
  }

  const fetchUsers = async (page = 1) => {
    try {
      const response = await api.get(`/admin/users?page=${page}&limit=20`)
      setUsers(response.data.users)
      setPagination({ page: response.data.page, pages: response.data.pages, total: response.data.total })
    } catch (err) { console.error('Error fetching users:', err) }
  }

  const fetchPrograms = async () => {
    try {
      const response = await api.get('/programs')
      setPrograms(response.data.programs)
    } catch (err) { console.error('Error fetching programs:', err) }
  }

  const fetchBlogs = async () => {
    try {
      const response = await api.get('/blogs?limit=50')
      setBlogs(response.data.blogs)
    } catch (err) { console.error('Error fetching blogs:', err) }
  }

  const fetchCertificates = async () => {
    try {
      const response = await api.get('/admin/donations?status=completed&limit=50')
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

  const handleLogout = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('adminUser')
    toast.success('Logged out successfully')
    window.location.href = '/admin/login'
  }

  const exportDonations = async () => {
    try {
      const response = await api.get('/admin/export/donations', { responseType: 'blob' })
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
      await api.delete(`/programs/${id}`)
      toast.success('Program deleted')
      fetchPrograms()
    } catch (err) { toast.error('Delete failed') }
  }

  const handleDeleteBlog = async (id) => {
    if (!confirm('Are you sure you want to delete this blog?')) return
    try {
      await api.delete(`/blogs/${id}`)
      toast.success('Blog deleted')
      fetchBlogs()
    } catch (err) { toast.error('Delete failed') }
  }

  const handleDeleteUser = async (id) => {
    if (!confirm('Are you sure you want to delete this user?')) return
    try {
      await api.delete(`/admin/users/${id}`)
      toast.success('User deleted')
      fetchUsers()
    } catch (err) { toast.error('Delete failed') }
  }

  const handleVerifyDonation = async (id, status) => {
    try {
      await api.post(`/admin/verify-donation/${id}`, { status })
      toast.success(`Donation ${status}`)
      fetchDonations()
      fetchStats()
    } catch (err) { toast.error('Verification failed') }
  }

  const handleSendEmail = async (e) => {
    e.preventDefault()
    try {
      await api.post('/admin/send-email', emailForm)
      toast.success('Email sent!')
      setShowModal(null)
      setEmailForm({ to: '', subject: '', message: '' })
    } catch (err) { toast.error('Failed to send email') }
  }

  const handleBroadcast = async (e) => {
    e.preventDefault()
    try {
      const res = await api.post('/admin/broadcast', broadcastForm)
      toast.success(res.data.message)
      setShowModal(null)
      setBroadcastForm({ subject: '', message: '', target: 'all' })
    } catch (err) { toast.error('Broadcast failed') }
  }

  const handleUpdateUser = async (id, role) => {
    try {
      await api.put(`/admin/users/${id}`, { role })
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
    { id: 'donations', icon: DollarSign, label: 'Donations' },
    { id: 'donors', icon: UsersIcon, label: 'Donors' },
    { id: 'programs', icon: Heart, label: 'Programs' },
    { id: 'blogs', icon: FileText, label: 'Blogs' },
    { id: 'users', icon: Shield, label: 'Users' },
    { id: 'certificates', icon: Award, label: 'Certificates' },
    { id: 'analytics', icon: BarChart, label: 'Analytics' },
    { id: 'email', icon: Mail, label: 'Email' },
    { id: 'transparency', icon: Eye, label: 'Transparency' },
    { id: 'reports', icon: FileText, label: 'Reports' },
  ]

  const Dashboard = () => (
    <div className="space-y-6">
      {loading ? (
        <div className="flex justify-center py-12"><RefreshCw className="w-8 h-8 text-secondary animate-spin" /></div>
      ) : (
        <>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center mb-4">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <p className="font-display text-2xl font-bold text-white">{formatCurrency(stats?.totalDonations || 0)}</p>
              <p className="text-sm text-gray-400">Total Donations</p>
            </div>
            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center mb-4">
                <UsersIcon className="w-6 h-6 text-white" />
              </div>
              <p className="font-display text-2xl font-bold text-white">{stats?.totalDonors || 0}</p>
              <p className="text-sm text-gray-400">Total Donors</p>
            </div>
            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
              <div className="w-12 h-12 bg-gradient-to-br from-secondary to-yellow-500 rounded-xl flex items-center justify-center mb-4">
                <Heart className="w-6 h-6 text-black" />
              </div>
              <p className="font-display text-2xl font-bold text-white">{stats?.programCount || 0}</p>
              <p className="text-sm text-gray-400">Active Programs</p>
            </div>
            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center mb-4">
                <Award className="w-6 h-6 text-white" />
              </div>
              <p className="font-display text-2xl font-bold text-white">{certificates.length}</p>
              <p className="text-sm text-gray-400">Certificates</p>
            </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            {stats?.programBreakdown?.length > 0 && (
              <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
                <h3 className="text-lg font-bold mb-4 text-white">Program Breakdown</h3>
                <div className="space-y-3">
                  {stats.programBreakdown.map((item, i) => (
                    <div key={i} className="flex items-center space-x-4">
                      <span className="w-28 text-sm font-medium text-gray-400">{item._id}</span>
                      <div className="flex-1 h-4 bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full bg-gradient-to-r from-secondary to-yellow-500 rounded-full" style={{ width: `${(item.total / stats.totalDonations) * 100}%` }}></div>
                      </div>
                      <span className="w-20 text-sm font-bold text-secondary text-right">{formatCurrency(item.total)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {analytics?.recentDonors?.length > 0 && (
              <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
                <h3 className="text-lg font-bold mb-4 text-white">Recent Donors</h3>
                <div className="space-y-3">
                  {analytics.recentDonors.slice(0, 5).map((donor, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-gray-700/50 rounded-lg">
                      <div>
                        <p className="font-medium text-white">{donor.name}</p>
                        <p className="text-xs text-gray-400">{donor.email}</p>
                      </div>
                      <span className="text-xs px-2 py-1 bg-secondary/20 text-secondary rounded-full">{donor.role}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-white">Recent Donations</h3>
              <button onClick={() => setActiveTab('donations')} className="text-sm text-secondary hover:underline">View All</button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-left text-sm text-gray-400 border-b border-gray-700">
                    <th className="pb-3">Donor</th>
                    <th className="pb-3">Amount</th>
                    <th className="pb-3">Program</th>
                    <th className="pb-3">Status</th>
                  </tr>
                </thead>
                <tbody className="text-sm">
                  {donations.slice(0, 5).map((d, i) => (
                    <tr key={i} className="border-b border-gray-700 last:border-0">
                      <td className="py-3 text-white">{d.donorName}</td>
                      <td className="py-3 font-bold text-secondary">₹{d.amount.toLocaleString()}</td>
                      <td className="py-3 text-gray-400">{d.program}</td>
                      <td className="py-3">
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${d.status === 'completed' ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
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

  const Donations = () => (
    <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <h3 className="text-lg font-bold text-white">All Donations</h3>
        <div className="flex flex-wrap gap-2">
          <select className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-sm text-white" value={filters.status} onChange={(e) => { setFilters({ ...filters, status: e.target.value }); fetchDonations(1) }}>
            <option value="">All Status</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
          </select>
          <select className="px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-sm text-white" value={filters.program} onChange={(e) => { setFilters({ ...filters, program: e.target.value }); fetchDonations(1) }}>
            <option value="">All Programs</option>
            <option value="Education">Education</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Women Empowerment">Women Empowerment</option>
            <option value="Environment">Environment</option>
          </select>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-left text-sm text-gray-400 border-b border-gray-700">
              <th className="pb-3">Receipt No</th>
              <th className="pb-3">Donor</th>
              <th className="pb-3">Amount</th>
              <th className="pb-3">Program</th>
              <th className="pb-3">Date</th>
              <th className="pb-3">Status</th>
              <th className="pb-3">Actions</th>
            </tr>
          </thead>
          <tbody className="text-sm">
            {donations.map((d, i) => (
              <tr key={i} className="border-b border-gray-700 last:border-0 hover:bg-gray-700/50">
                <td className="py-3 font-mono text-gray-400">{d.receiptNumber || 'N/A'}</td>
                <td className="py-3 text-white">{d.donorName}</td>
                <td className="py-3 font-bold text-secondary">₹{d.amount.toLocaleString()}</td>
                <td className="py-3 text-gray-400">{d.program}</td>
                <td className="py-3 text-gray-400">{formatDate(d.completedAt || d.createdAt)}</td>
                <td className="py-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-semibold ${d.status === 'completed' ? 'bg-green-500/20 text-green-400' : d.status === 'pending' ? 'bg-yellow-500/20 text-yellow-400' : 'bg-red-500/20 text-red-400'}`}>
                    {d.status}
                  </span>
                </td>
                <td className="py-3">
                  <div className="flex items-center gap-2">
                    {d.status === 'pending' && (
                      <>
                        <button onClick={() => handleVerifyDonation(d._id, 'completed')} className="p-1 bg-green-500/20 text-green-400 rounded hover:bg-green-500/30" title="Verify">
                          <CheckCircle className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleVerifyDonation(d._id, 'rejected')} className="p-1 bg-red-500/20 text-red-400 rounded hover:bg-red-500/30" title="Reject">
                          <XCircle className="w-4 h-4" />
                        </button>
                      </>
                    )}
                    <button onClick={() => { setEditData(d); setShowModal('donation-detail') }} className="p-1 bg-blue-500/20 text-blue-400 rounded hover:bg-blue-500/30" title="View">
                      <Eye className="w-4 h-4" />
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
          <button disabled={pagination.page === 1} onClick={() => fetchDonations(pagination.page - 1)} className="p-2 bg-gray-700 rounded-lg disabled:opacity-50"><ChevronLeft className="w-4 h-4" /></button>
          <span className="text-sm text-gray-400">Page {pagination.page} of {pagination.pages}</span>
          <button disabled={pagination.page === pagination.pages} onClick={() => fetchDonations(pagination.page + 1)} className="p-2 bg-gray-700 rounded-lg disabled:opacity-50"><ChevronRight className="w-4 h-4" /></button>
        </div>
      )}
    </div>
  )

  const Donors = () => (
    <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
      <h3 className="text-lg font-bold mb-6 text-white">Donor Management</h3>
      {donors.length === 0 ? (
        <p className="text-gray-400 text-center py-8">No donors found</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {donors.map((donor, i) => (
            <div key={i} className="border border-gray-700 rounded-xl p-4 hover:bg-gray-700/50 transition-colors">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-secondary/20 rounded-full flex items-center justify-center">
                  <UsersIcon className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <p className="font-bold text-white">{donor.name}</p>
                  <p className="text-xs text-gray-400">{donor.email}</p>
                </div>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">{donor.donationCount || 0} donations</span>
                <span className="font-bold text-secondary">₹{(donor.totalAmount || 0).toLocaleString()}</span>
              </div>
              <button onClick={() => { setEmailForm({ ...emailForm, to: donor.email }); setShowModal('email') }} className="mt-3 w-full px-3 py-2 bg-gray-700 text-secondary rounded-lg text-sm hover:bg-gray-600 flex items-center justify-center gap-1">
                <Mail className="w-4 h-4" /> Send Email
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )

  const Programs = () => {
    const [showForm, setShowForm] = useState(false)
    const [formData, setFormData] = useState({ title: '', description: '', category: 'Education', icon: 'book', impactStats: { livesImpacted: 0, projectsCompleted: 0, volunteers: 0 }, goals: { target: 0, raised: 0 }, features: [], status: 'active' })

    const handleSubmit = async (e) => {
      e.preventDefault()
      try {
        if (editData?._id) {
          await api.put(`/programs/${editData._id}`, formData)
          toast.success('Program updated')
        } else {
          await api.post('/programs', formData)
          toast.success('Program created')
        }
        fetchPrograms()
        setShowForm(false)
        setEditData(null)
        setFormData({ title: '', description: '', category: 'Education', icon: 'book', impactStats: { livesImpacted: 0, projectsCompleted: 0, volunteers: 0 }, goals: { target: 0, raised: 0 }, features: [], status: 'active' })
      } catch (err) { toast.error('Failed to save program') }
    }

    const handleEdit = (program) => {
      setEditData(program)
      setFormData(program)
      setShowForm(true)
    }

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold text-white">Programs Management</h3>
          <button onClick={() => { setShowForm(true); setEditData(null); setFormData({ title: '', description: '', category: 'Education', icon: 'book', impactStats: { livesImpacted: 0, projectsCompleted: 0, volunteers: 0 }, goals: { target: 0, raised: 0 }, features: [], status: 'active' }) }} className="px-4 py-2 bg-secondary text-black rounded-lg font-semibold hover:bg-yellow-400 flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Program
          </button>
        </div>

        {showForm && (
          <div className="bg-gray-800 rounded-2xl p-6 border border-secondary/50">
            <h4 className="text-lg font-bold text-white mb-4">{editData?._id ? 'Edit Program' : 'Add New Program'}</h4>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Title</label>
                  <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white" required />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Category</label>
                  <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white">
                    <option value="Education">Education</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Women Empowerment">Women Empowerment</option>
                    <option value="Environment">Environment</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Description</label>
                <textarea value={formData.description} onChange={(e) => setFormData({ ...formData, description: e.target.value })} rows={3} className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white" required />
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Lives Impacted</label>
                  <input type="number" value={formData.impactStats.livesImpacted} onChange={(e) => setFormData({ ...formData, impactStats: { ...formData.impactStats, livesImpacted: parseInt(e.target.value) } })} className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Target (₹)</label>
                  <input type="number" value={formData.goals.target} onChange={(e) => setFormData({ ...formData, goals: { ...formData.goals, target: parseInt(e.target.value) } })} className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Status</label>
                  <select value={formData.status} onChange={(e) => setFormData({ ...formData, status: e.target.value })} className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white">
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                  </select>
                </div>
              </div>
              <div className="flex gap-3">
                <button type="submit" className="px-6 py-2 bg-secondary text-black rounded-lg font-semibold">{editData?._id ? 'Update' : 'Create'}</button>
                <button type="button" onClick={() => { setShowForm(false); setEditData(null) }} className="px-6 py-2 bg-gray-700 text-white rounded-lg">Cancel</button>
              </div>
            </form>
          </div>
        )}

        <div className="space-y-4">
          {programs.map((p, i) => (
            <div key={i} className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-4">
                <div>
                  <h3 className="font-bold text-lg text-white">{p.title}</h3>
                  <span className="text-sm text-gray-400">{p.category}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${p.status === 'active' ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>{p.status}</span>
                  <button onClick={() => handleEdit(p)} className="p-2 bg-blue-500/20 text-blue-400 rounded hover:bg-blue-500/30"><Edit className="w-4 h-4" /></button>
                  <button onClick={() => handleDeleteProgram(p._id)} className="p-2 bg-red-500/20 text-red-400 rounded hover:bg-red-500/30"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-4 line-clamp-2">{p.description}</p>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-gray-700/50 rounded-lg p-3">
                  <p className="font-bold text-secondary">{p.impactStats?.livesImpacted?.toLocaleString() || 0}</p>
                  <p className="text-xs text-gray-400">Lives Impacted</p>
                </div>
                <div className="bg-gray-700/50 rounded-lg p-3">
                  <p className="font-bold text-secondary">₹{((p.goals?.raised || 0) / 100000).toFixed(1)}L</p>
                  <p className="text-xs text-gray-400">Raised</p>
                </div>
                <div className="bg-gray-700/50 rounded-lg p-3">
                  <p className="font-bold text-secondary">₹{((p.goals?.target || 0) / 100000).toFixed(1)}L</p>
                  <p className="text-xs text-gray-400">Target</p>
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
    const [formData, setFormData] = useState({ title: '', content: '', excerpt: '', category: 'News', authorName: 'Admin', tags: '', featured: false, published: true })

    const handleSubmit = async (e) => {
      e.preventDefault()
      try {
        const data = { ...formData, tags: formData.tags.split(',').map(t => t.trim()) }
        if (editData?._id) {
          await api.put(`/blogs/${editData._id}`, data)
          toast.success('Blog updated')
        } else {
          await api.post('/blogs', data)
          toast.success('Blog created')
        }
        fetchBlogs()
        setShowForm(false)
        setEditData(null)
        setFormData({ title: '', content: '', excerpt: '', category: 'News', authorName: 'Admin', tags: '', featured: false, published: true })
      } catch (err) { toast.error('Failed to save blog') }
    }

    const handleEdit = (blog) => {
      setEditData(blog)
      setFormData({ ...blog, tags: blog.tags?.join(', ') || '' })
      setShowForm(true)
    }

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold text-white">Blog Management</h3>
          <button onClick={() => { setShowForm(true); setEditData(null); setFormData({ title: '', content: '', excerpt: '', category: 'News', authorName: 'Admin', tags: '', featured: false, published: true }) }} className="px-4 py-2 bg-secondary text-black rounded-lg font-semibold hover:bg-yellow-400 flex items-center gap-2">
            <Plus className="w-4 h-4" /> Add Blog
          </button>
        </div>

        {showForm && (
          <div className="bg-gray-800 rounded-2xl p-6 border border-secondary/50">
            <h4 className="text-lg font-bold text-white mb-4">{editData?._id ? 'Edit Blog' : 'Add New Blog'}</h4>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Title</label>
                  <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white" required />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Category</label>
                  <select value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white">
                    <option value="News">News</option>
                    <option value="Impact Report">Impact Report</option>
                    <option value="Success Story">Success Story</option>
                    <option value="Campaign Update">Campaign Update</option>
                    <option value="Event">Event</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Excerpt</label>
                <input type="text" value={formData.excerpt} onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })} className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white" required />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Content</label>
                <textarea value={formData.content} onChange={(e) => setFormData({ ...formData, content: e.target.value })} rows={5} className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white" required />
              </div>
              <div className="grid md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Author</label>
                  <input type="text" value={formData.authorName} onChange={(e) => setFormData({ ...formData, authorName: e.target.value })} className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white" />
                </div>
                <div>
                  <label className="block text-sm text-gray-400 mb-1">Tags (comma separated)</label>
                  <input type="text" value={formData.tags} onChange={(e) => setFormData({ ...formData, tags: e.target.value })} className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white" />
                </div>
                <div className="flex items-center gap-4 pt-6">
                  <label className="flex items-center gap-2 text-gray-400"><input type="checkbox" checked={formData.featured} onChange={(e) => setFormData({ ...formData, featured: e.target.checked })} className="w-4 h-4" /> Featured</label>
                  <label className="flex items-center gap-2 text-gray-400"><input type="checkbox" checked={formData.published} onChange={(e) => setFormData({ ...formData, published: e.target.checked })} className="w-4 h-4" /> Published</label>
                </div>
              </div>
              <div className="flex gap-3">
                <button type="submit" className="px-6 py-2 bg-secondary text-black rounded-lg font-semibold">{editData?._id ? 'Update' : 'Create'}</button>
                <button type="button" onClick={() => { setShowForm(false); setEditData(null) }} className="px-6 py-2 bg-gray-700 text-white rounded-lg">Cancel</button>
              </div>
            </form>
          </div>
        )}

        <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-400 border-b border-gray-700">
                  <th className="pb-3">Title</th>
                  <th className="pb-3">Category</th>
                  <th className="pb-3">Author</th>
                  <th className="pb-3">Status</th>
                  <th className="pb-3">Actions</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                {blogs.map((blog, i) => (
                  <tr key={i} className="border-b border-gray-700 last:border-0">
                    <td className="py-3 text-white">{blog.title}</td>
                    <td className="py-3 text-gray-400">{blog.category}</td>
                    <td className="py-3 text-gray-400">{blog.authorName}</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${blog.published ? 'bg-green-500/20 text-green-400' : 'bg-yellow-500/20 text-yellow-400'}`}>
                        {blog.published ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <button onClick={() => handleEdit(blog)} className="p-1 bg-blue-500/20 text-blue-400 rounded hover:bg-blue-500/30"><Edit className="w-4 h-4" /></button>
                        <button onClick={() => handleDeleteBlog(blog._id)} className="p-1 bg-red-500/20 text-red-400 rounded hover:bg-red-500/30"><Trash2 className="w-4 h-4" /></button>
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
    <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
      <h3 className="text-lg font-bold mb-6 text-white">User Management</h3>
      {users.length === 0 ? (
        <p className="text-gray-400 text-center py-8">No users found</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left text-sm text-gray-400 border-b border-gray-700">
                <th className="pb-3">Name</th>
                <th className="pb-3">Email</th>
                <th className="pb-3">Role</th>
                <th className="pb-3">Joined</th>
                <th className="pb-3">Actions</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {users.map((u, i) => (
                <tr key={i} className="border-b border-gray-700 last:border-0">
                  <td className="py-3 text-white">{u.name}</td>
                  <td className="py-3 text-gray-400">{u.email}</td>
                  <td className="py-3">
                    <select value={u.role} onChange={(e) => handleUpdateUser(u._id, e.target.value)}
                      className="px-2 py-1 bg-gray-700 border border-gray-600 rounded text-white text-xs">
                      <option value="donor">Donor</option>
                      <option value="volunteer">Volunteer</option>
                      <option value="admin">Admin</option>
                    </select>
                  </td>
                  <td className="py-3 text-gray-400">{formatDate(u.createdAt)}</td>
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <button onClick={() => { setEmailForm({ ...emailForm, to: u.email }); setShowModal('email') }} className="p-1 bg-gray-700 text-secondary rounded hover:bg-gray-600"><Mail className="w-4 h-4" /></button>
                      {u.role !== 'admin' && <button onClick={() => handleDeleteUser(u._id)} className="p-1 bg-red-500/20 text-red-400 rounded hover:bg-red-500/30"><Trash2 className="w-4 h-4" /></button>}
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
          <button disabled={pagination.page === 1} onClick={() => fetchUsers(pagination.page - 1)} className="p-2 bg-gray-700 rounded-lg disabled:opacity-50"><ChevronLeft className="w-4 h-4" /></button>
          <span className="text-sm text-gray-400">Page {pagination.page} of {pagination.pages}</span>
          <button disabled={pagination.page === pagination.pages} onClick={() => fetchUsers(pagination.page + 1)} className="p-2 bg-gray-700 rounded-lg disabled:opacity-50"><ChevronRight className="w-4 h-4" /></button>
        </div>
      )}
    </div>
  )

  const Certificates = () => (
    <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
      <h3 className="text-lg font-bold mb-6 text-white">Certificate Management</h3>
      {certificates.length === 0 ? (
        <p className="text-gray-400 text-center py-8">No certificates found</p>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {certificates.map((cert, i) => (
            <div key={i} className="border border-gray-700 rounded-xl p-4 hover:bg-gray-700/50 transition-colors">
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-secondary/20 rounded-lg flex items-center justify-center">
                  <Award className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <p className="font-mono text-xs text-gray-400">{cert.certificateId}</p>
                  <p className="font-bold text-white">{cert.donorName}</p>
                </div>
              </div>
              <div className="text-sm space-y-1 mb-3">
                <p><span className="text-gray-400">Amount:</span> <span className="font-bold text-secondary">₹{cert.amount.toLocaleString()}</span></p>
                <p><span className="text-gray-400">Date:</span> {formatDate(cert.completedAt)}</p>
              </div>
              <a href={`/api/certificates/${cert.certificateId}/download`} target="_blank" className="w-full px-3 py-2 bg-secondary text-black rounded-lg text-sm font-medium hover:bg-yellow-400 flex items-center justify-center gap-1">
                <Download className="w-4 h-4" /> Download
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  )

  const Analytics = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-bold text-white">Analytics & Reports</h3>
      
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
          <TrendingUp className="w-8 h-8 text-green-500 mb-2" />
          <p className="font-display text-2xl font-bold text-white">{formatCurrency(analytics?.totalDonations || 0)}</p>
          <p className="text-sm text-gray-400">Total Raised</p>
        </div>
        <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
          <Activity className="w-8 h-8 text-blue-500 mb-2" />
          <p className="font-display text-2xl font-bold text-white">{analytics?.totalDonationsCount || 0}</p>
          <p className="text-sm text-gray-400">Total Donations</p>
        </div>
        <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
          <UsersIcon className="w-8 h-8 text-secondary mb-2" />
          <p className="font-display text-2xl font-bold text-white">{analytics?.recentDonors?.length || 0}</p>
          <p className="text-sm text-gray-400">Total Users</p>
        </div>
        <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
          <BarChart className="w-8 h-8 text-purple-500 mb-2" />
          <p className="font-display text-2xl font-bold text-white">{analytics?.donationsByProgram?.length || 0}</p>
          <p className="text-sm text-gray-400">Programs</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        {analytics?.donationsByMonth?.length > 0 && (
          <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
            <h4 className="font-bold text-white mb-4">Monthly Donations</h4>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsBar data={analytics.donationsByMonth}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="_id" stroke="#9CA3AF" fontSize={12} />
                <YAxis stroke="#9CA3AF" fontSize={12} tickFormatter={(v) => `₹${(v/100000).toFixed(0)}L`} />
                <Tooltip formatter={(v) => [`₹${v.toLocaleString()}`, 'Amount']} contentStyle={{ backgroundColor: '#1F2937', border: 'none' }} />
                <Bar dataKey="total" fill="#D4A84B" radius={[8, 8, 0, 0]} />
              </RechartsBar>
            </ResponsiveContainer>
          </div>
        )}

        {analytics?.donationsByProgram?.length > 0 && (
          <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
            <h4 className="font-bold text-white mb-4">Donations by Program</h4>
            <ResponsiveContainer width="100%" height={300}>
              <RechartsPie>
                <Pie data={analytics.donationsByProgram} cx="50%" cy="50%" outerRadius={100} dataKey="total" label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}>
                  {analytics.donationsByProgram.map((entry, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Tooltip formatter={(v) => [`₹${v.toLocaleString()}`, 'Amount']} contentStyle={{ backgroundColor: '#1F2937', border: 'none' }} />
              </RechartsPie>
            </ResponsiveContainer>
          </div>
        )}
      </div>

      {analytics?.donationsByPaymentMethod?.length > 0 && (
        <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
          <h4 className="font-bold text-white mb-4">Payment Methods</h4>
          <div className="grid sm:grid-cols-3 gap-4">
            {analytics.donationsByPaymentMethod.map((method, i) => (
              <div key={i} className="bg-gray-700/50 rounded-xl p-4 text-center">
                <p className="font-display text-2xl font-bold text-secondary">{method.count}</p>
                <p className="text-sm text-gray-400">{method._id}</p>
                <p className="text-xs text-secondary">₹{method.total.toLocaleString()}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )

  const Email = () => (
    <div className="space-y-6">
      <h3 className="text-lg font-bold text-white">Email & Notifications</h3>
      
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
          <h4 className="font-bold text-white mb-4 flex items-center gap-2"><Mail className="w-5 h-5 text-secondary" /> Send Single Email</h4>
          <form onSubmit={handleSendEmail} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Recipient Email</label>
              <input type="email" value={emailForm.to} onChange={(e) => setEmailForm({ ...emailForm, to: e.target.value })} className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white" required />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Subject</label>
              <input type="text" value={emailForm.subject} onChange={(e) => setEmailForm({ ...emailForm, subject: e.target.value })} className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white" required />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Message</label>
              <textarea value={emailForm.message} onChange={(e) => setEmailForm({ ...emailForm, message: e.target.value })} rows={4} className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white" required />
            </div>
            <button type="submit" className="w-full px-6 py-3 bg-secondary text-black rounded-lg font-semibold hover:bg-yellow-400 flex items-center justify-center gap-2">
              <Send className="w-4 h-4" /> Send Email
            </button>
          </form>
        </div>

        <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
          <h4 className="font-bold text-white mb-4 flex items-center gap-2"><Send className="w-5 h-5 text-secondary" /> Broadcast Message</h4>
          <form onSubmit={handleBroadcast} className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">Target Audience</label>
              <select value={broadcastForm.target} onChange={(e) => setBroadcastForm({ ...broadcastForm, target: e.target.value })} className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white">
                <option value="all">All Users</option>
                <option value="donors">All Donors</option>
                <option value="admin">Admins Only</option>
              </select>
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Subject</label>
              <input type="text" value={broadcastForm.subject} onChange={(e) => setBroadcastForm({ ...broadcastForm, subject: e.target.value })} className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white" required />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">Message</label>
              <textarea value={broadcastForm.message} onChange={(e) => setBroadcastForm({ ...broadcastForm, message: e.target.value })} rows={4} className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white" required />
            </div>
            <button type="submit" className="w-full px-6 py-3 bg-secondary text-black rounded-lg font-semibold hover:bg-yellow-400 flex items-center justify-center gap-2">
              <Send className="w-4 h-4" /> Send Broadcast
            </button>
          </form>
        </div>
      </div>

      <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
        <h4 className="font-bold text-white mb-4">Quick Actions</h4>
        <div className="grid sm:grid-cols-3 gap-4">
          <button onClick={() => { setBroadcastForm({ subject: 'Thank You for Your Donation!', message: 'Dear Donor,\n\nThank you for your generous donation to Hope Foundation. Your support helps us make a real difference in the lives of those we serve.\n\nWith gratitude,\nHope Foundation Team', target: 'donors' }); setShowModal('broadcast') }} className="p-4 bg-gray-700 rounded-xl hover:bg-gray-600 text-left">
            <Mail className="w-6 h-6 text-secondary mb-2" />
            <p className="font-medium text-white">Thank You Email</p>
            <p className="text-xs text-gray-400">Send to all donors</p>
          </button>
          <button onClick={() => { setBroadcastForm({ subject: 'Monthly Newsletter - Hope Foundation Update', message: 'Dear Supporter,\n\nHere\'s what we\'ve been working on this month...\n\nThank you for being part of our journey.\n\nWarm regards,\nHope Foundation', target: 'all' }); setShowModal('broadcast') }} className="p-4 bg-gray-700 rounded-xl hover:bg-gray-600 text-left">
            <FileText className="w-6 h-6 text-secondary mb-2" />
            <p className="font-medium text-white">Newsletter</p>
            <p className="text-xs text-gray-400">Send to all users</p>
          </button>
          <button onClick={() => { setBroadcastForm({ subject: 'New Program Launch - We Need Your Support!', message: 'Dear Supporter,\n\nWe\'re excited to announce our new program...\n\nPlease consider making a donation to support this initiative.\n\nThank you!\nHope Foundation', target: 'all' }); setShowModal('broadcast') }} className="p-4 bg-gray-700 rounded-xl hover:bg-gray-600 text-left">
            <Heart className="w-6 h-6 text-secondary mb-2" />
            <p className="font-medium text-white">Campaign Alert</p>
            <p className="text-xs text-gray-400">Urgent appeal</p>
          </button>
        </div>
      </div>
    </div>
  )

  const Reports = () => (
    <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
      <h3 className="text-lg font-bold mb-6 text-white">Reports & Export</h3>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <div className="border border-gray-700 rounded-xl p-4 hover:bg-gray-700/50 transition-colors">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-green-500" />
            </div>
            <div>
              <p className="font-bold text-white">Donations Report</p>
              <p className="text-xs text-gray-400">Export all donations</p>
            </div>
          </div>
          <button onClick={exportDonations} className="w-full px-3 py-2 bg-green-500 text-white rounded-lg text-sm font-medium hover:bg-green-600 flex items-center justify-center gap-1">
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>
        <div className="border border-gray-700 rounded-xl p-4 hover:bg-gray-700/50 transition-colors">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <UsersIcon className="w-5 h-5 text-blue-500" />
            </div>
            <div>
              <p className="font-bold text-white">Donors Report</p>
              <p className="text-xs text-gray-400">Export all donors</p>
            </div>
          </div>
          <button onClick={async () => { toast.success('Export feature coming soon!') }} className="w-full px-3 py-2 bg-blue-500 text-white rounded-lg text-sm font-medium hover:bg-blue-600 flex items-center justify-center gap-1">
            <Download className="w-4 h-4" /> Export CSV
          </button>
        </div>
        <div className="border border-gray-700 rounded-xl p-4 hover:bg-gray-700/50 transition-colors">
          <div className="flex items-center space-x-3 mb-3">
            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <BarChart className="w-5 h-5 text-purple-500" />
            </div>
            <div>
              <p className="font-bold text-white">Analytics Report</p>
              <p className="text-xs text-gray-400">Full analytics export</p>
            </div>
          </div>
          <button onClick={() => setActiveTab('analytics')} className="w-full px-3 py-2 bg-purple-500 text-white rounded-lg text-sm font-medium hover:bg-purple-600 flex items-center justify-center gap-1">
            <Eye className="w-4 h-4" /> View Analytics
          </button>
        </div>
      </div>
      
      {stats?.monthlyDonations?.length > 0 && (
        <div className="p-6 bg-gray-700/50 rounded-xl">
          <h4 className="font-bold mb-4 text-white">Monthly Donation Summary</h4>
          <div className="space-y-2">
            {stats.monthlyDonations.map((m, i) => (
              <div key={i} className="flex justify-between text-sm">
                <span className="text-gray-400">{m._id}</span>
                <span className="font-bold text-secondary">{formatCurrency(m.total)} ({m.count} donations)</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )

  const Transparency = () => (
    <div className="space-y-6">
      <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
        <h3 className="text-lg font-bold mb-6 text-white">Fund Allocation</h3>
        {stats?.programBreakdown?.length > 0 ? (
          <>
            <div className="grid sm:grid-cols-4 gap-4 mb-6">
              {stats.programBreakdown.map((item, i) => {
                const colors = ['from-blue-500 to-blue-600', 'from-red-500 to-red-600', 'from-purple-500 to-purple-600', 'from-green-500 to-green-600']
                return (
                  <div key={i} className="text-center">
                    <div className={`w-16 h-16 mx-auto bg-gradient-to-br ${colors[i % colors.length]} rounded-2xl flex items-center justify-center mb-2`}>
                      <span className="text-white font-bold text-lg">{Math.round((item.total / stats.totalDonations) * 100)}%</span>
                    </div>
                    <p className="text-sm font-medium text-white">{item._id}</p>
                    <p className="text-xs text-gray-400">{formatCurrency(item.total)}</p>
                  </div>
                )
              })}
            </div>
            <div className="space-y-3">
              {stats.programBreakdown.map((item, i) => {
                const colors = ['bg-blue-500', 'bg-red-500', 'bg-purple-500', 'bg-green-500']
                return (
                  <div key={i} className="flex items-center space-x-4">
                    <span className="w-24 text-sm font-medium text-gray-400">{item._id}</span>
                    <div className="flex-1 h-4 bg-gray-700 rounded-full overflow-hidden">
                      <div className={`h-full ${colors[i % colors.length]} rounded-full`} style={{ width: `${(item.total / stats.totalDonations) * 100}%` }}></div>
                    </div>
                    <span className="w-12 text-sm font-bold text-secondary text-right">{Math.round((item.total / stats.totalDonations) * 100)}%</span>
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
    <div className="min-h-screen bg-black flex">
      <aside className={`fixed lg:static inset-y-0 left-0 bg-gray-900 shadow-xl transform transition-all duration-300 z-50 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} ${sidebarCollapsed ? 'w-20' : 'w-72'} border-r border-gray-800`}>
        <div className="p-6 border-b border-gray-800 flex items-center justify-between">
          {!sidebarCollapsed && (
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-secondary to-yellow-500 rounded-xl flex items-center justify-center">
                <Shield className="w-5 h-5 text-black" />
              </div>
              <div>
                <p className="font-bold text-secondary">Admin</p>
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

        <nav className="p-4 space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${sidebarCollapsed ? 'justify-center' : ''} ${
                activeTab === item.id ? 'bg-secondary text-black' : 'text-gray-400 hover:bg-gray-800 hover:text-white'
              }`}
              title={sidebarCollapsed ? item.label : ''}
            >
              <item.icon className="w-5 h-5 flex-shrink-0" />
              {!sidebarCollapsed && <span className="font-medium">{item.label}</span>}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-800">
          {!sidebarCollapsed && (
            <Link to="/" className="flex items-center space-x-3 px-4 py-2 text-gray-400 hover:text-white mb-2">
              <Eye className="w-5 h-5" />
              <span className="text-sm">View Website</span>
            </Link>
          )}
          <button onClick={handleLogout} className={`w-full flex items-center space-x-3 px-4 py-2 text-red-400 hover:bg-red-500/10 rounded-xl ${sidebarCollapsed ? 'justify-center' : ''}`}>
            <LogOut className="w-5 h-5" />
            {!sidebarCollapsed && <span className="font-medium">Logout</span>}
          </button>
        </div>
      </aside>

      {sidebarOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      <div className="flex-1 flex flex-col min-w-0">
        <header className="bg-gray-900 shadow-sm p-4 lg:p-6 flex items-center justify-between border-b border-gray-800">
          <div className="flex items-center space-x-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-2 hover:bg-gray-800 rounded-lg text-gray-400">
              <Menu className="w-6 h-6" />
            </button>
            <button onClick={() => setSidebarCollapsed(!sidebarCollapsed)} className="hidden lg:block p-2 hover:bg-gray-800 rounded-lg text-gray-400">
              {sidebarCollapsed ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />}
            </button>
            <div>
              <h1 className="text-xl font-bold text-white capitalize">{activeTab === 'dashboard' ? 'Dashboard' : activeTab}</h1>
              <p className="text-sm text-gray-400">Welcome back, {user?.name}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button onClick={() => { fetchStats(); fetchAnalytics() }} className="p-2 hover:bg-gray-800 rounded-lg text-gray-400" title="Refresh">
              <RefreshCw className="w-5 h-5" />
            </button>
          </div>
        </header>

        <main className="p-4 lg:p-6 flex-1 overflow-auto">
          {activeTab === 'dashboard' && <Dashboard />}
          {activeTab === 'donations' && <Donations />}
          {activeTab === 'donors' && <Donors />}
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

      {showModal === 'broadcast' && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-lg border border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-white">Send Broadcast</h3>
              <button onClick={() => setShowModal(null)} className="p-2 hover:bg-gray-700 rounded-lg text-gray-400"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleBroadcast} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Target Audience</label>
                <select value={broadcastForm.target} onChange={(e) => setBroadcastForm({ ...broadcastForm, target: e.target.value })} className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white">
                  <option value="all">All Users</option>
                  <option value="donors">All Donors</option>
                  <option value="admin">Admins Only</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Subject</label>
                <input type="text" value={broadcastForm.subject} onChange={(e) => setBroadcastForm({ ...broadcastForm, subject: e.target.value })} className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white" required />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Message</label>
                <textarea value={broadcastForm.message} onChange={(e) => setBroadcastForm({ ...broadcastForm, message: e.target.value })} rows={5} className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white" required />
              </div>
              <div className="flex gap-3">
                <button type="submit" className="flex-1 px-6 py-3 bg-secondary text-black rounded-lg font-semibold">Send Broadcast</button>
                <button type="button" onClick={() => setShowModal(null)} className="px-6 py-3 bg-gray-700 text-white rounded-lg">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showModal === 'email' && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-lg border border-gray-700">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold text-white">Send Email</h3>
              <button onClick={() => setShowModal(null)} className="p-2 hover:bg-gray-700 rounded-lg text-gray-400"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSendEmail} className="space-y-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">To</label>
                <input type="email" value={emailForm.to} onChange={(e) => setEmailForm({ ...emailForm, to: e.target.value })} className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white" required />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Subject</label>
                <input type="text" value={emailForm.subject} onChange={(e) => setEmailForm({ ...emailForm, subject: e.target.value })} className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white" required />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Message</label>
                <textarea value={emailForm.message} onChange={(e) => setEmailForm({ ...emailForm, message: e.target.value })} rows={5} className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white" required />
              </div>
              <div className="flex gap-3">
                <button type="submit" className="flex-1 px-6 py-3 bg-secondary text-black rounded-lg font-semibold">Send</button>
                <button type="button" onClick={() => setShowModal(null)} className="px-6 py-3 bg-gray-700 text-white rounded-lg">Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}

export default Admin
