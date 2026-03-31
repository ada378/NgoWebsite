import { Outlet, Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Menu, X, Heart, User, LogOut, LayoutDashboard, ChevronDown, Shield } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const Layout = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { user, isAuthenticated, logout } = useAuth()
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [location])

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Programs', path: '/programs' },
    { name: 'Donate', path: '/donate' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ]

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/95 backdrop-blur-xl lg:hidden" onClick={() => setMobileMenuOpen(false)} />
      )}

      {/* Mobile Menu */}
      <div className={`fixed top-0 right-0 h-full w-80 max-w-[90vw] bg-gradient-to-b from-gray-900 to-black z-50 transform transition-all duration-500 lg:hidden border-l border-white/5 ${
        mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="p-6 pt-20 relative">
          <button 
            onClick={() => setMobileMenuOpen(false)}
            className="absolute top-4 right-4 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          <div className="flex items-center space-x-3 mb-8 pb-6 border-b border-white/10">
            <div className="w-12 h-12 bg-gradient-to-br from-secondary to-yellow-600 rounded-2xl flex items-center justify-center shadow-lg shadow-secondary/20">
              <Heart className="w-6 h-6 text-black" />
            </div>
            <div>
              <span className="text-2xl font-display font-bold text-white">Hope</span>
              <span className="text-2xl font-display font-bold text-secondary">Foundation</span>
            </div>
          </div>

          {isAuthenticated && (
            <div className="mb-6 p-4 bg-white/5 backdrop-blur rounded-2xl border border-white/10">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gradient-to-br from-secondary to-yellow-600 rounded-xl flex items-center justify-center">
                  <User className="w-6 h-6 text-black" />
                </div>
                <div>
                  <p className="font-semibold text-white">{user?.name}</p>
                  <p className="text-xs text-gray-400">{user?.email}</p>
                </div>
              </div>
            </div>
          )}

          <nav className="space-y-1">
            {navLinks.map((link, i) => (
              <Link
                key={link.path}
                to={link.path}
                className={`group flex items-center gap-3 px-4 py-3.5 rounded-xl font-medium transition-all duration-300 ${
                  location.pathname === link.path 
                    ? 'bg-gradient-to-r from-secondary/20 to-transparent text-secondary border-l-2 border-secondary' 
                    : 'text-gray-400 hover:bg-white/5 hover:text-white'
                }`}
                onClick={() => setMobileMenuOpen(false)}
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <span className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${location.pathname === link.path ? 'bg-secondary' : 'bg-gray-600 group-hover:bg-secondary'}`} />
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="mt-8 pt-6 border-t border-white/10 space-y-3">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white transition-colors" onClick={() => setMobileMenuOpen(false)}>
                  <LayoutDashboard className="w-5 h-5" />
                  Dashboard
                </Link>
                <Link to="/certificates" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white transition-colors" onClick={() => setMobileMenuOpen(false)}>
                  <Heart className="w-5 h-5" />
                  My Certificates
                </Link>
                <button onClick={() => { logout(); setMobileMenuOpen(false) }} className="flex items-center gap-3 w-full px-4 py-3 rounded-xl text-red-400 hover:bg-red-500/10 transition-colors">
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/admin/login" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white transition-colors" onClick={() => setMobileMenuOpen(false)}>
                  <Shield className="w-5 h-5" />
                  Admin Login
                </Link>
                <Link to="/login" className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-400 hover:bg-white/5 hover:text-white transition-colors" onClick={() => setMobileMenuOpen(false)}>
                  <User className="w-5 h-5" />
                  Login
                </Link>
                <Link to="/donate" className="flex items-center justify-center gap-2 w-full py-4 bg-gradient-to-r from-secondary to-yellow-500 text-black font-bold rounded-xl hover:shadow-lg hover:shadow-secondary/30 transition-all" onClick={() => setMobileMenuOpen(false)}>
                  <Heart className="w-5 h-5" />
                  Donate Now
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Desktop Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 hidden lg:block ${
        isScrolled 
          ? 'bg-black/80 backdrop-blur-2xl shadow-2xl shadow-black/50 border-b border-white/5' 
          : 'bg-gradient-to-b from-black/95 to-black/50 backdrop-blur-xl'
      }`}>
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center space-x-3 group">
              <div className="w-12 h-12 bg-gradient-to-br from-secondary to-yellow-600 rounded-2xl flex items-center justify-center shadow-lg shadow-secondary/20 group-hover:shadow-secondary/40 transition-all duration-300">
                <Heart className="w-6 h-6 text-black" />
              </div>
              <div>
                <span className="text-2xl font-display font-bold text-white">Hope</span>
                <span className="text-2xl font-display font-bold text-secondary">Foundation</span>
              </div>
            </Link>

            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-5 py-2.5 rounded-xl font-medium transition-all duration-300 text-sm group ${
                    location.pathname === link.path 
                      ? 'bg-gradient-to-r from-secondary/20 to-transparent text-secondary' 
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {link.name}
                  {location.pathname === link.path && (
                    <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-secondary rounded-full" />
                  )}
                </Link>
              ))}
            </div>

            <div className="hidden lg:flex items-center gap-3">
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-3 px-4 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all duration-300"
                  >
                    <div className="w-9 h-9 bg-gradient-to-br from-secondary to-yellow-600 rounded-xl flex items-center justify-center">
                      <User className="w-5 h-5 text-black" />
                    </div>
                    <span className="font-semibold text-white">{user?.name?.split(' ')[0]}</span>
                    <ChevronDown className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>
                  
                  {isDropdownOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setIsDropdownOpen(false)} />
                      <div className="absolute right-0 mt-3 w-64 bg-gradient-to-b from-gray-900 to-black backdrop-blur-xl rounded-2xl shadow-2xl shadow-black/50 py-2 z-50 border border-white/10">
                        <div className="px-5 py-4 border-b border-white/10">
                          <p className="font-semibold text-white">{user?.name}</p>
                          <p className="text-xs text-gray-400">{user?.email}</p>
                        </div>
                        <Link to="/dashboard" className="flex items-center gap-3 px-5 py-3 hover:bg-white/5 transition-colors text-gray-300">
                          <LayoutDashboard className="w-5 h-5 text-secondary" />
                          Dashboard
                        </Link>
                        <Link to="/certificates" className="flex items-center gap-3 px-5 py-3 hover:bg-white/5 transition-colors text-gray-300">
                          <Heart className="w-5 h-5 text-secondary" />
                          My Certificates
                        </Link>
                        <div className="border-t border-white/10 mt-2 pt-2">
                          <button onClick={() => { logout(); setIsDropdownOpen(false) }} className="flex items-center gap-3 w-full px-5 py-3 hover:bg-red-500/10 transition-colors text-red-400">
                            <LogOut className="w-5 h-5" />
                            Logout
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <>
                  <Link to="/admin/login" className="px-4 py-2 text-sm text-gray-300 hover:text-white transition-colors">
                    Admin
                  </Link>
                  <Link to="/login" className="px-5 py-2.5 rounded-xl font-medium text-gray-300 hover:text-white hover:bg-white/5 transition-all text-sm">
                    Login
                  </Link>
                  <Link to="/donate" className="group relative bg-gradient-to-r from-secondary to-yellow-500 text-black px-6 py-3 rounded-xl font-bold hover:shadow-lg hover:shadow-secondary/30 transition-all flex items-center gap-2">
                    <Heart className="w-5 h-5" />
                    <span>Donate Now</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Header */}
      <nav className={`fixed top-0 left-0 right-0 z-30 transition-all duration-500 lg:hidden ${
        isScrolled || mobileMenuOpen
          ? 'bg-black/90 backdrop-blur-2xl shadow-2xl border-b border-white/5' 
          : 'bg-gradient-to-b from-black/90 to-transparent'
      }`}>
        <div className="flex justify-between items-center h-16 px-4">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-br from-secondary to-yellow-600 rounded-xl flex items-center justify-center shadow-lg shadow-secondary/20">
              <Heart className="w-5 h-5 text-black" />
            </div>
            <div>
              <span className="text-xl font-display font-bold text-white">Hope</span>
              <span className="text-xl font-display font-bold text-secondary">Foundation</span>
            </div>
          </Link>
          
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
          </button>
        </div>
      </nav>

      <main className="flex-grow pt-16 lg:pt-20">
        <Outlet />
      </main>

      {/* Premium Footer */}
      <footer className="relative bg-gradient-to-b from-black via-gray-950 to-black text-white overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-secondary/5 rounded-full blur-3xl" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12">
            <div className="sm:col-span-2 lg:col-span-1">
              <div className="flex items-center space-x-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-secondary to-yellow-600 rounded-2xl flex items-center justify-center shadow-lg shadow-secondary/20">
                  <Heart className="w-6 h-6 text-black" />
                </div>
                <div>
                  <span className="text-xl font-display font-bold text-white">Hope</span>
                  <span className="text-xl font-display font-bold text-secondary">Foundation</span>
                </div>
              </div>
              <p className="text-gray-400 text-sm mb-6 leading-relaxed">
                Transforming lives through compassion and sustainable development since 2010. Every donation creates ripples of positive change.
              </p>
              <div className="flex space-x-3">
                {['80G', 'FCRA', '12A'].map((cert, i) => (
                  <span key={cert} className="px-3 py-1.5 bg-secondary/10 text-secondary rounded-lg text-xs font-bold border border-secondary/20 backdrop-blur-sm">
                    {cert}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-display font-bold text-lg mb-6 text-white">Quick Links</h3>
              <ul className="space-y-3">
                {['About Us', 'Programs', 'Transparency', 'Gallery', 'Blog'].map((link, i) => (
                  <li key={link}>
                    <Link to={link === 'About Us' ? '/about' : link === 'Programs' ? '/programs' : `/${link.toLowerCase()}`} 
                      className="group flex items-center gap-2 text-gray-400 hover:text-secondary transition-colors text-sm">
                      <span className="w-0 group-hover:w-3 h-px bg-secondary transition-all duration-300" />
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-display font-bold text-lg mb-6 text-white">Programs</h3>
              <ul className="space-y-3">
                {['Education', 'Healthcare', 'Women Empowerment', 'Environment'].map((link, i) => (
                  <li key={link}>
                    <Link to="/programs" 
                      className="group flex items-center gap-2 text-gray-400 hover:text-secondary transition-colors text-sm">
                      <span className="w-0 group-hover:w-3 h-px bg-secondary transition-all duration-300" />
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-display font-bold text-lg mb-6 text-white">Contact Us</h3>
              <ul className="space-y-4 text-gray-400 text-sm">
                <li className="flex items-start gap-3">
                  <span className="w-5 h-5 mt-0.5 bg-secondary/10 rounded flex items-center justify-center text-secondary text-xs">📍</span>
                  <span>Mumbai, Maharashtra 400001, India</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-5 h-5 bg-secondary/10 rounded flex items-center justify-center text-secondary text-xs">📞</span>
                  <span>+91 98765 43210</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-5 h-5 bg-secondary/10 rounded flex items-center justify-center text-secondary text-xs">✉️</span>
                  <span>info@hopefoundation.org</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 mt-12 pt-8">
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-500">
              <p>© {new Date().getFullYear()} Hope Foundation. All rights reserved.</p>
              <div className="flex space-x-6">
                <Link to="/privacy" className="hover:text-secondary transition-colors">Privacy Policy</Link>
                <Link to="/terms" className="hover:text-secondary transition-colors">Terms</Link>
                <Link to="/refund" className="hover:text-secondary transition-colors">Refund</Link>
              </div>
            </div>
            <p className="text-center text-xs text-gray-600 mt-4">NGO Reg: NGO-MH-2024-001234 | PAN: AABTH1234B | Registered Under Section 12A & 80G</p>
          </div>
        </div>
      </footer>

      {/* WhatsApp Button */}
      <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer"
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30 hover:scale-110 hover:shadow-green-500/50 transition-all duration-300 z-50 animate-pulse-glow">
        <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </div>
  )
}

export default Layout
