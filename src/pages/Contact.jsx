import { useState } from 'react'
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, Heart } from 'lucide-react'
import toast from 'react-hot-toast'

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
    <div>
      {/* Hero */}
      <section className="relative bg-black text-white pt-24 pb-16 sm:pt-32 sm:pb-20">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1920&h=600&fit=crop" alt="Contact" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-black/80"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-secondary font-medium tracking-wider uppercase text-xs sm:text-sm mb-3 sm:mb-4">Get In Touch</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-3 sm:mb-4">Contact Us</h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto px-4">
            Have questions or want to get involved? We'd love to hear from you.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-12 sm:py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-6 lg:gap-12">
            {/* Form */}
            <div className="lg:col-span-2">
              <div className="bg-gray-900 rounded-xl sm:rounded-2xl shadow-xl p-5 sm:p-8 border border-gray-800">
                <h2 className="text-xl sm:text-2xl font-heading font-bold mb-5 sm:mb-6 text-white">Send us a Message</h2>
                
                <form onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-400 mb-1.5 sm:mb-2">Full Name *</label>
                      <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-700 rounded-lg sm:rounded-xl focus:border-secondary focus:outline-none bg-gray-800 text-white text-sm"
                        placeholder="Your name" />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-400 mb-1.5 sm:mb-2">Email *</label>
                      <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-700 rounded-lg sm:rounded-xl focus:border-secondary focus:outline-none bg-gray-800 text-white text-sm"
                        placeholder="your@email.com" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-400 mb-1.5 sm:mb-2">Phone</label>
                      <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-700 rounded-lg sm:rounded-xl focus:border-secondary focus:outline-none bg-gray-800 text-white text-sm"
                        placeholder="+91 XXXXX XXXXX" />
                    </div>
                    <div>
                      <label className="block text-xs sm:text-sm font-medium text-gray-400 mb-1.5 sm:mb-2">Type</label>
                      <select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-700 rounded-lg sm:rounded-xl focus:border-secondary focus:outline-none bg-gray-800 text-white text-sm">
                        <option value="general">General</option>
                        <option value="donation">Donation</option>
                        <option value="volunteer">Volunteer</option>
                        <option value="partnership">Partnership</option>
                        <option value="media">Media/Press</option>
                      </select>
                    </div>
                  </div>

                  <div className="mb-4 sm:mb-6">
                    <label className="block text-xs sm:text-sm font-medium text-gray-400 mb-1.5 sm:mb-2">Subject</label>
                    <input type="text" value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-700 rounded-lg sm:rounded-xl focus:border-secondary focus:outline-none bg-gray-800 text-white text-sm"
                      placeholder="How can we help?" />
                  </div>

                  <div className="mb-6 sm:mb-8">
                    <label className="block text-xs sm:text-sm font-medium text-gray-400 mb-1.5 sm:mb-2">Message *</label>
                    <textarea required rows={5} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-3 sm:px-4 py-2.5 sm:py-3 border-2 border-gray-700 rounded-lg sm:rounded-xl focus:border-secondary focus:outline-none resize-none bg-gray-800 text-white text-sm"
                      placeholder="Tell us more..." />
                  </div>

                  <button type="submit" disabled={loading}
                    className="w-full px-6 sm:px-8 py-3 sm:py-4 bg-secondary text-black font-semibold rounded-lg sm:rounded-xl hover:bg-yellow-400 transition-all flex items-center justify-center space-x-2 text-sm sm:text-base">
                    {loading ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-black border-t-transparent"></div>
                    ) : (
                      <>
                        <Send className="w-4 h-4 sm:w-5 sm:h-5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-4 sm:space-y-6">
              {contactInfo.map((info, index) => (
                <div key={index} className="bg-gray-900 rounded-xl p-4 sm:p-6 border border-gray-800">
                  <div className="flex items-start space-x-3 sm:space-x-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-secondary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <info.icon className="w-5 h-5 sm:w-6 sm:h-6 text-secondary" />
                    </div>
                    <div>
                      <h3 className="font-bold mb-1 sm:mb-2 text-white text-sm sm:text-base">{info.title}</h3>
                      {info.details.map((detail, i) => (
                        <p key={i} className="text-gray-500 text-xs sm:text-sm">{detail}</p>
                      ))}
                    </div>
                  </div>
                </div>
              ))}

              <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl p-4 sm:p-6 border border-gray-800">
                <MessageCircle className="w-8 h-8 sm:w-10 sm:h-10 text-secondary mb-3 sm:mb-4" />
                <h3 className="font-bold text-base sm:text-lg mb-1 sm:mb-2 text-white">Chat with Us</h3>
                <p className="text-gray-500 text-xs sm:text-sm mb-3 sm:mb-4">Get instant support on WhatsApp</p>
                <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer"
                  className="block w-full py-2.5 sm:py-3 bg-secondary text-black font-medium rounded-lg text-center hover:bg-yellow-400 transition-colors text-sm">
                  Open WhatsApp
                </a>
              </div>

              <div className="bg-gray-900 rounded-xl p-4 sm:p-6 border border-gray-800">
                <h3 className="font-bold mb-2 sm:mb-4 text-white text-sm sm:text-base">Volunteer With Us</h3>
                <p className="text-gray-500 text-xs sm:text-sm mb-3 sm:mb-4">Join our team of dedicated volunteers.</p>
                <a href="mailto:volunteer@hopefoundation.org" className="text-secondary font-medium hover:underline text-sm">
                  volunteer@hopefoundation.org
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="py-12 sm:py-20 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-xl sm:rounded-2xl overflow-hidden shadow-xl border border-gray-800">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.7554898439277!2d72.83!3d19.07!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDA0JzEyLjAiTiA3MsKwNDknNDguMCJF!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%" height="300" style={{ border: 0 }} allowFullScreen="" loading="lazy"
              referrerPolicy="no-referrer-when-downgrade" title="Hope Foundation Location"
              className="w-full"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
