import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Heart, Eye, EyeOff, Loader2 } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import toast from 'react-hot-toast'

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '', confirmPassword: '', phone: '', city: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (formData.password !== formData.confirmPassword) { toast.error('Passwords do not match'); return }
    if (formData.password.length < 6) { toast.error('Password must be at least 6 characters'); return }
    setLoading(true)
    try {
      await register({ name: formData.name, email: formData.email, password: formData.password, phone: formData.phone, city: formData.city })
      toast.success('Registration successful!')
      navigate('/dashboard')
    } catch (error) {
      toast.error(error.response?.data?.error || 'Registration failed. Please try again.')
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
          <h1 className="text-3xl font-heading font-bold text-white">Create Account</h1>
          <p className="text-gray-400 mt-2">Join our community of changemakers</p>
        </div>

        <div className="bg-gray-900 rounded-2xl shadow-xl p-8 border border-gray-800">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Full Name *</label>
              <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-700 rounded-xl focus:border-secondary focus:outline-none bg-gray-800 text-white"
                placeholder="Your full name" />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Email Address *</label>
              <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-700 rounded-xl focus:border-secondary focus:outline-none bg-gray-800 text-white"
                placeholder="your@email.com" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">Phone</label>
                <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-700 rounded-xl focus:border-secondary focus:outline-none bg-gray-800 text-white"
                  placeholder="+91 XXXXX XXXXX" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-2">City</label>
                <input type="text" value={formData.city} onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-700 rounded-xl focus:border-secondary focus:outline-none bg-gray-800 text-white"
                  placeholder="Your city" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Password *</label>
              <div className="relative">
                <input type={showPassword ? 'text' : 'password'} required value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-3 border-2 border-gray-700 rounded-xl focus:border-secondary focus:outline-none bg-gray-800 text-white pr-12"
                  placeholder="Create password" />
                <button type="button" onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-300">
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-2">Confirm Password *</label>
              <input type="password" required value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="w-full px-4 py-3 border-2 border-gray-700 rounded-xl focus:border-secondary focus:outline-none bg-gray-800 text-white"
                placeholder="Confirm your password" />
            </div>

            <label className="flex items-start space-x-3 cursor-pointer text-sm text-gray-400">
              <input type="checkbox" required className="w-4 h-4 mt-1 text-secondary rounded" />
              <span>I agree to the <a href="#" className="text-secondary hover:underline">Terms</a> and <a href="#" className="text-secondary hover:underline">Privacy Policy</a></span>
            </label>

            <button type="submit" disabled={loading}
              className="w-full px-8 py-4 bg-secondary text-black font-semibold rounded-xl hover:bg-yellow-400 transition-all flex items-center justify-center space-x-2">
              {loading ? <><Loader2 className="w-5 h-5 animate-spin" /><span>Creating account...</span></> : <span>Create Account</span>}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-gray-400">
            Already have an account? <Link to="/login" className="text-secondary font-medium hover:underline">Sign in</Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Register
