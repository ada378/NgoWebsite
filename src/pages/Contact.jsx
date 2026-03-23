import { useState, useRef, useEffect } from 'react'
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, Heart, Globe } from 'lucide-react'
import toast from 'react-hot-toast'

const FadeInSection = ({ children, delay = 0, className = '' }) => {
  const ref = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  )
}

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    type: 'general'
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      toast.success('Message sent successfully! We will get back to you soon.')
      setLoading(false)
      setFormData({ name: '', email: '', phone: '', subject: '', message: '', type: 'general' })
    }, 1500)
  }

  const contactInfo = [
    { icon: MapPin, title: 'Office Address', details: ['123 Mahatma Gandhi Road', 'Mumbai, Maharashtra 400001', 'India'] },
    { icon: Phone, title: 'Phone', details: ['+91 98765 43210', '+91 22 1234 5678'] },
    { icon: Mail, title: 'Email', details: ['info@hopefoundation.org', 'donate@hopefoundation.org'] },
    { icon: Clock, title: 'Working Hours', details: ['Mon-Fri: 9AM - 6PM', 'Saturday: 10AM - 4PM'] }
  ]

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1920&h=600&fit=crop" alt="Contact" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black" />
        </div>
        
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-green-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 text-center">
          <FadeInSection>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 mb-6">
              <Mail className="w-4 h-4 text-secondary" />
              <span className="text-secondary font-medium text-sm">Get In Touch</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold text-white mb-6 leading-tight">
              Contact <span className="bg-gradient-to-r from-secondary via-yellow-400 to-secondary bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">Us</span>
            </h1>
            
            <p className="text-gray-400 text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed px-4">
              Have questions or want to get involved? We'd love to hear from you.
            </p>
          </FadeInSection>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-black via-gray-950 to-black relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <FadeInSection>
                <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl">
                  <div className="flex items-center gap-4 mb-8">
                    <div className="w-14 h-14 bg-secondary/20 rounded-2xl flex items-center justify-center">
                      <Send className="w-7 h-7 text-secondary" />
                    </div>
                    <div>
                      <h2 className="text-2xl md:text-3xl font-display font-bold text-white">Send us a Message</h2>
                      <p className="text-gray-500">We'll get back to you within 24 hours</p>
                    </div>
                  </div>
                  
                  <form onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Full Name *</label>
                        <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl focus:border-secondary focus:outline-none transition-colors text-white placeholder-gray-500"
                          placeholder="Your name" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Email *</label>
                        <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl focus:border-secondary focus:outline-none transition-colors text-white placeholder-gray-500"
                          placeholder="your@email.com" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Phone</label>
                        <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl focus:border-secondary focus:outline-none transition-colors text-white placeholder-gray-500"
                          placeholder="+91 XXXXX XXXXX" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-400 mb-2">Type</label>
                        <select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                          className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl focus:border-secondary focus:outline-none transition-colors text-white">
                          <option value="general">General</option>
                          <option value="donation">Donation</option>
                          <option value="volunteer">Volunteer</option>
                          <option value="partnership">Partnership</option>
                          <option value="media">Media/Press</option>
                        </select>
                      </div>
                    </div>

                    <div className="mb-6">
                      <label className="block text-sm font-medium text-gray-400 mb-2">Subject</label>
                      <input type="text" value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl focus:border-secondary focus:outline-none transition-colors text-white placeholder-gray-500"
                        placeholder="How can we help?" />
                    </div>

                    <div className="mb-8">
                      <label className="block text-sm font-medium text-gray-400 mb-2">Message *</label>
                      <textarea required rows={5} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-4 bg-white/5 border border-white/10 rounded-xl focus:border-secondary focus:outline-none resize-none transition-colors text-white placeholder-gray-500"
                        placeholder="Tell us more..." />
                    </div>

                    <button type="submit" disabled={loading}
                      className="group relative w-full px-8 py-4 bg-gradient-to-r from-secondary to-yellow-500 text-black font-bold text-lg rounded-xl overflow-hidden shadow-lg shadow-secondary/30 hover:shadow-secondary/50 transition-all duration-300 flex items-center justify-center gap-3">
                      <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                      {loading ? (
                        <div className="animate-spin rounded-full h-6 w-6 border-2 border-black border-t-transparent"></div>
                      ) : (
                        <span className="relative flex items-center gap-3">
                          <Send className="w-5 h-5" />
                          Send Message
                        </span>
                      )}
                    </button>
                  </form>
                </div>
              </FadeInSection>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <FadeInSection key={index} delay={index * 100}>
                  <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 border border-white/10 hover:border-secondary/30 transition-all duration-500">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-secondary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        <info.icon className="w-6 h-6 text-secondary" />
                      </div>
                      <div>
                        <h3 className="font-bold mb-2 text-white">{info.title}</h3>
                        {info.details.map((detail, i) => (
                          <p key={i} className="text-gray-500 text-sm">{detail}</p>
                        ))}
                      </div>
                    </div>
                  </div>
                </FadeInSection>
              ))}

              <FadeInSection delay={400}>
                <div className="bg-gradient-to-br from-secondary/20 to-yellow-500/20 rounded-2xl p-6 border border-secondary/30">
                  <MessageCircle className="w-10 h-10 text-secondary mb-4" />
                  <h3 className="font-bold text-lg mb-2 text-white">Chat with Us</h3>
                  <p className="text-gray-400 text-sm mb-4">Get instant support on WhatsApp</p>
                  <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer"
                    className="block w-full py-3 bg-secondary text-black font-bold rounded-xl text-center hover:bg-yellow-400 transition-colors">
                    Open WhatsApp
                  </a>
                </div>
              </FadeInSection>

              <FadeInSection delay={500}>
                <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 border border-white/10">
                  <h3 className="font-bold mb-2 text-white">Volunteer With Us</h3>
                  <p className="text-gray-500 text-sm mb-4">Join our team of dedicated volunteers.</p>
                  <a href="mailto:volunteer@hopefoundation.org" className="text-secondary font-semibold hover:underline">
                    volunteer@hopefoundation.org
                  </a>
                </div>
              </FadeInSection>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-20 md:py-32 bg-black relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="rounded-3xl overflow-hidden shadow-2xl border border-white/10">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.7554898439277!2d72.83!3d19.07!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDA0JzEyLjAiTiA3MsKwNDknNDguMCJF!5e0!3m2!1sen!2sin!4v1234567890"
                width="100%" height="400" style={{ border: 0 }} allowFullScreen="" loading="lazy"
                referrerPolicy="no-referrer-when-downgrade" title="Hope Foundation Location"
                className="w-full"
              ></iframe>
            </div>
          </FadeInSection>
        </div>
      </section>
    </div>
  )
}

export default Contact
