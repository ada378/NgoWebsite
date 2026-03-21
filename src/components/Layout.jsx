import { Outlet, Link, useLocation } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Menu, X, Heart, User, LogOut, LayoutDashboard, ChevronDown, MenuIcon } from 'lucide-react'
import { useAuth } from '../context/AuthContext'

const Layout = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { user, isAuthenticated, logout } = useAuth()
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
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
    { name: 'Transparency', path: '/transparency' },
    { name: 'Gallery', path: '/gallery' },
    { name: 'Blog', path: '/blog' },
    { name: 'Contact', path: '/contact' },
  ]

  return (
    <div className="min-h-screen flex flex-col">
      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/90 backdrop-blur-sm lg:hidden" onClick={() => setMobileMenuOpen(false)} />
      )}

      {/* Mobile Menu */}
      <div className={`fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-gray-950 z-50 transform transition-transform duration-300 lg:hidden border-l border-gray-800 ${
        mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="p-6 pt-20">
          <button 
            onClick={() => setMobileMenuOpen(false)}
            className="absolute top-4 right-4 p-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <X className="w-6 h-6 text-white" />
          </button>

          <div className="flex items-center space-x-3 mb-6 pb-6 border-b border-gray-800">
            <div className="w-10 h-10 bg-gradient-to-br from-gray-700 to-gray-900 rounded-xl flex items-center justify-center">
              <Heart className="w-5 h-5 text-secondary" />
            </div>
            <span className="text-xl font-heading font-bold text-white">Hope</span>
            <span className="text-xl font-heading font-bold text-secondary">Foundation</span>
          </div>

          {isAuthenticated && (
            <div className="mb-6 p-4 bg-gray-900 rounded-xl border border-gray-800">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-br from-secondary to-yellow-600 rounded-xl flex items-center justify-center">
                  <User className="w-5 h-5 text-black" />
                </div>
                <div>
                  <p className="font-medium text-sm text-white">{user?.name}</p>
                  <p className="text-xs text-gray-400">{user?.email}</p>
                </div>
              </div>
            </div>
          )}

          <nav className="space-y-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`block px-4 py-3 rounded-xl font-medium transition-colors ${
                  location.pathname === link.path 
                    ? 'bg-secondary/20 text-secondary' 
                    : 'text-gray-300 hover:bg-gray-900 hover:text-white'
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          <div className="mt-6 pt-6 border-t border-gray-800 space-y-3">
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" className="block px-4 py-3 rounded-xl font-medium text-gray-300 hover:bg-gray-900" onClick={() => setMobileMenuOpen(false)}>
                  Dashboard
                </Link>
                <Link to="/certificates" className="block px-4 py-3 rounded-xl font-medium text-gray-300 hover:bg-gray-900" onClick={() => setMobileMenuOpen(false)}>
                  My Certificates
                </Link>
                <button onClick={() => { logout(); setMobileMenuOpen(false) }} className="block w-full text-left px-4 py-3 rounded-xl font-medium text-red-400 hover:bg-red-500/10">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="block px-4 py-3 rounded-xl font-medium text-gray-300 hover:bg-gray-900" onClick={() => setMobileMenuOpen(false)}>
                  Login
                </Link>
                <Link to="/donate" className="block btn-secondary text-center mt-4" onClick={() => setMobileMenuOpen(false)}>
                  Donate Now
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Desktop Navigation */}
      <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 hidden lg:block ${
        isScrolled 
          ? 'bg-black/95 backdrop-blur-xl shadow-lg shadow-black/50' 
          : 'bg-black/90 backdrop-blur-md'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            <Link to="/" className="flex items-center space-x-2 sm:space-x-3">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-gray-700 to-gray-900 rounded-xl flex items-center justify-center shadow-lg border border-gray-700">
                <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-secondary" />
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-heading font-bold text-white">Hope</span>
                <span className="text-xl sm:text-2xl font-heading font-bold text-secondary">Foundation</span>
              </div>
            </Link>

            <div className="hidden lg:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 text-sm ${
                    location.pathname === link.path 
                      ? 'bg-secondary/20 text-secondary' 
                      : 'text-gray-300 hover:bg-gray-900 hover:text-white'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="hidden lg:flex items-center space-x-4">
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center space-x-3 px-4 py-2 rounded-xl hover:bg-gray-900 transition-colors"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-secondary to-yellow-600 rounded-lg flex items-center justify-center">
                      <User className="w-4 h-4 text-black" />
                    </div>
                    <span className="font-medium text-white text-sm">{user?.name?.split(' ')[0]}</span>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                  </button>
                  
                  {isDropdownOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setIsDropdownOpen(false)} />
                      <div className="absolute right-0 mt-2 w-56 bg-card rounded-2xl shadow-xl shadow-black/50 py-2 z-50 border border-gray-800">
                        <div className="px-4 py-3 border-b border-gray-800">
                          <p className="font-medium text-white text-sm">{user?.name}</p>
                          <p className="text-xs text-gray-400">{user?.email}</p>
                        </div>
                        <Link to="/dashboard" className="flex items-center px-4 py-2.5 hover:bg-gray-900 transition-colors text-sm text-gray-300">
                          <LayoutDashboard className="w-4 h-4 mr-3 text-secondary" />
                          Dashboard
                        </Link>
                        <Link to="/certificates" className="flex items-center px-4 py-2.5 hover:bg-gray-900 transition-colors text-sm text-gray-300">
                          <Heart className="w-4 h-4 mr-3 text-secondary" />
                          My Certificates
                        </Link>
                        <div className="border-t border-gray-800 mt-2 pt-2">
                          <button onClick={() => { logout(); setIsDropdownOpen(false) }} className="flex items-center w-full px-4 py-2.5 hover:bg-red-500/10 transition-colors text-sm text-red-400">
                            <LogOut className="w-4 h-4 mr-3" />
                            Logout
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              ) : (
                <>
                  <Link to="/login" className="px-4 py-2 rounded-xl font-medium text-gray-300 hover:text-white hover:bg-gray-900 transition-all text-sm">
                    Login
                  </Link>
                  <Link to="/donate" className="bg-gradient-to-r from-secondary to-yellow-600 text-black px-5 py-2.5 rounded-xl font-semibold hover:shadow-lg hover:shadow-secondary/30 transition-all text-sm flex items-center space-x-2">
                    <Heart className="w-4 h-4" />
                    <span>Donate Now</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Header */}
      <nav className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 lg:hidden ${
        isScrolled || mobileMenuOpen
          ? 'bg-black/95 backdrop-blur-xl shadow-lg' 
          : 'bg-black/80 backdrop-blur-md'
      }`}>
        <div className="flex justify-between items-center h-14 px-4">
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-gray-700 to-gray-900 rounded-lg flex items-center justify-center border border-gray-700">
              <Heart className="w-4 h-4 text-secondary" />
            </div>
            <span className="text-lg font-heading font-bold text-white">Hope</span>
            <span className="text-lg font-heading font-bold text-secondary">Foundation</span>
          </Link>
          
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-lg hover:bg-gray-800 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-white" /> : <MenuIcon className="w-6 h-6 text-white" />}
          </button>
        </div>
      </nav>

      <main className="flex-grow pt-14 lg:pt-20">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-gradient-to-br from-gray-950 via-black to-gray-950 text-white border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-12">
            <div>
              <div className="flex items-center space-x-2 mb-4 sm:mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-secondary to-yellow-600 rounded-xl flex items-center justify-center">
                  <Heart className="w-5 h-5 text-black" />
                </div>
                <span className="text-lg font-heading font-bold text-white">Hope Foundation</span>
              </div>
              <p className="text-gray-400 text-sm mb-4 sm:mb-6 leading-relaxed">
                Transforming lives through compassion and sustainable development since 2010.
              </p>
              <div className="flex space-x-2">
                {['80G', 'FCRA', '12A'].map((cert) => (
                  <span key={cert} className="px-2 py-1 bg-secondary/20 text-secondary rounded-lg text-xs font-semibold border border-secondary/30">{cert}</span>
                ))}
              </div>
            </div>

            <div>
              <h3 className="font-heading font-bold text-base sm:text-lg mb-4 sm:mb-6 text-white">Quick Links</h3>
              <ul className="space-y-2 sm:space-y-3">
                {['About Us', 'Programs', 'Transparency', 'Gallery', 'Blog'].map((link) => (
                  <li key={link}>
                    <Link to={link === 'About Us' ? '/about' : link === 'Programs' ? '/programs' : `/${link.toLowerCase()}`} className="text-gray-400 hover:text-secondary transition-colors text-sm">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-heading font-bold text-base sm:text-lg mb-4 sm:mb-6 text-white">Programs</h3>
              <ul className="space-y-2 sm:space-y-3">
                {['Education', 'Healthcare', 'Women Empowerment', 'Environment'].map((link) => (
                  <li key={link}>
                    <Link to="/programs" className="text-gray-400 hover:text-secondary transition-colors text-sm">
                      {link}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-heading font-bold text-base sm:text-lg mb-4 sm:mb-6 text-white">Contact</h3>
              <ul className="space-y-3 sm:space-y-4 text-gray-400 text-sm">
                <li>Mumbai, Maharashtra 400001</li>
                <li>+91 98765 43210</li>
                <li>info@hopefoundation.org</li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 sm:mt-12 pt-6 sm:pt-8">
            <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0 text-sm text-gray-400">
              <p>© {new Date().getFullYear()} Hope Foundation. All rights reserved.</p>
              <div className="flex space-x-4 text-xs sm:text-sm">
                <Link to="/privacy" className="hover:text-secondary">Privacy</Link>
                <Link to="/terms" className="hover:text-secondary">Terms</Link>
                <Link to="/refund" className="hover:text-secondary">Refund</Link>
              </div>
            </div>
            <p className="text-center text-xs text-gray-500 mt-4">NGO Reg: NGO-MH-2024-001234 | PAN: AABTH1234B</p>
          </div>
        </div>
      </footer>

      {/* WhatsApp Button */}
      <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer"
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-12 h-12 sm:w-14 sm:h-14 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-xl shadow-green-500/30 hover:scale-110 transition-transform z-50">
        <svg className="w-6 h-6 sm:w-7 sm:h-7 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </a>
    </div>
  )
}

export default Layout
