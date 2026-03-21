import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Heart, Eye, EyeOff, Loader2 } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

const Login = () => {
  const [formData, setFormData] = useState({ email: '', password: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const response = await login(formData.email, formData.password)
      toast.success('Login successful!')
      if (response.user?.role === 'admin') { navigate('/admin') } else { navigate('/dashboard') }
    } catch (error) {
      toast.error(error.response?.data?.error || 'Login failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black py-12 px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-2 mb-6">
            <div className="w-12 h-12 bg-secondary rounded-lg flex items-center justify-center">
              <Heart className="w-7 h-7 text-black" />
            </div>
            <span className="text-2xl font-heading font-bold text-white">Hope Foundation</span>
          </Link>
          <h1 className="text-3xl font-heading font-bold text-white">Welcome Back</h1>
          <p className="text-gray-400 mt-2">Sign in to access your donor dashboard</p>
        </div>

        <div className="bg-gray-900 rounded-2xl shadow-xl p-8 border border-gray-800">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
              <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-700 rounded-xl focus:border-secondary focus:outline-none bg-gray-800 text-white"
                placeholder="your@email.com" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Password</label>
              <div className="relative">
                <input type={showPassword ? 'text' : 'password'} required value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-700 rounded-xl focus:border-secondary focus:outline-none bg-gray-800 text-white pr-12"
                  placeholder="Enter your password" />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300">
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center space-x-2 cursor-pointer text-gray-400">
                <input type="checkbox" className="w-4 h-4 text-secondary rounded" />
                <span>Remember me</span>
              </label>
              <a href="#" className="text-secondary hover:underline">Forgot password?</a>
            </div>

            <button type="submit" disabled={loading}
              className="w-full px-8 py-4 bg-secondary text-black font-semibold rounded-xl hover:bg-yellow-400 transition-all flex items-center justify-center space-x-2">
              {loading ? <><Loader2 className="w-5 h-5 animate-spin" /><span>Signing in...</span></> : <span>Sign In</span>}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-400">
            <p>Don't have an account? <Link to="/register" className="text-secondary font-medium hover:underline">Sign up</Link></p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
