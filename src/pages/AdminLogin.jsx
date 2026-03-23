import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Shield, Lock, Mail, Eye, EyeOff, ArrowLeft, Loader2 } from 'lucide-react'
import axios from 'axios'
import toast from 'react-hot-toast'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api'
})

const AdminLogin = () => {
  const navigate = useNavigate()
  const existingToken = localStorage.getItem('token')
  const existingUser = JSON.parse(localStorage.getItem('adminUser') || 'null')
  
  if (existingToken && existingUser?.role === 'admin') {
    navigate('/admin', { replace: true })
    return null
  }

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const response = await api.post('/auth/login', { email, password })
      
      if (response.data.user?.role !== 'admin') {
        setError('Access denied. Admin credentials required.')
        setLoading(false)
        return
      }

      localStorage.setItem('token', response.data.token)
      localStorage.setItem('adminUser', JSON.stringify(response.data.user))
      toast.success('Admin login successful!')
      navigate('/admin', { replace: true })
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed. Please check your credentials.')
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="relative w-full max-w-md">
        <Link to="/" className="inline-flex items-center gap-2 text-gray-400 hover:text-secondary transition-colors mb-8">
          <ArrowLeft className="w-5 h-5" />
          <span>Back to Website</span>
        </Link>

        <div className="bg-gray-900/80 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-gray-800">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-br from-secondary to-yellow-500 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-secondary/20">
              <Shield className="w-10 h-10 text-black" />
            </div>
            <h1 className="text-3xl font-heading font-bold text-white mb-2">Admin Panel</h1>
            <p className="text-gray-400">Hope Foundation Management System</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-400 px-4 py-3 rounded-xl text-sm flex items-center gap-2">
                <Shield className="w-5 h-5 flex-shrink-0" />
                {error}
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-gray-800/50 border-2 border-gray-700 rounded-xl focus:border-secondary focus:outline-none transition-colors text-white placeholder-gray-500"
                  placeholder="admin@hopefoundation.org"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-4 bg-gray-800/50 border-2 border-gray-700 rounded-xl focus:border-secondary focus:outline-none transition-colors text-white placeholder-gray-500"
                  placeholder="Enter your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 bg-gradient-to-r from-secondary to-yellow-500 text-black font-bold rounded-xl hover:shadow-lg hover:shadow-secondary/30 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Logging in...</span>
                </>
              ) : (
                <>
                  <Shield className="w-5 h-5" />
                  <span>Login as Admin</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-800">
            <div className="bg-gray-800/50 rounded-xl p-4">
              <p className="text-xs text-gray-500 text-center mb-2">Demo Credentials</p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-500 text-xs">Email</p>
                  <p className="text-secondary font-mono">admin@hopefoundation.org</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Password</p>
                  <p className="text-secondary font-mono">admin123</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <p className="text-center text-gray-500 text-sm mt-6">
          Having trouble logging in?{' '}
          <a href="mailto:support@hopefoundation.org" className="text-secondary hover:underline">
            Contact Support
          </a>
        </p>
      </div>
    </div>
  )
}

export default AdminLogin
