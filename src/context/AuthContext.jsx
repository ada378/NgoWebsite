import { createContext, useContext, useState, useEffect } from 'react'
import axios from 'axios'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [token, setToken] = useState(localStorage.getItem('token'))

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
      verifyToken()
    } else {
      setLoading(false)
    }
  }, [token])

  const verifyToken = async () => {
    try {
      const response = await axios.post('/api/auth/verify-token', { token })
      setUser(response.data.user)
    } catch (error) {
      localStorage.removeItem('token')
      setToken(null)
      setUser(null)
      delete axios.defaults.headers.common['Authorization']
    } finally {
      setLoading(false)
    }
  }

  const login = async (email, password) => {
    const response = await axios.post('/api/auth/login', { email, password })
    const { token: newToken, user: userData } = response.data
    localStorage.setItem('token', newToken)
    setToken(newToken)
    setUser(userData)
    axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`
    return response.data
  }

  const register = async (userData) => {
    const response = await axios.post('/api/auth/register', userData)
    const { token: newToken, user: newUser } = response.data
    localStorage.setItem('token', newToken)
    setToken(newToken)
    setUser(newUser)
    axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`
    return response.data
  }

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
    setUser(null)
    delete axios.defaults.headers.common['Authorization']
  }

  const updateProfile = async (data) => {
    const response = await axios.put('/api/auth/profile', data)
    setUser(response.data.user)
    return response.data
  }

  const value = {
    user,
    loading,
    isAuthenticated: !!user,
    isAdmin: user?.role === 'admin',
    login,
    register,
    logout,
    updateProfile
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
