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
    { icon: Clock, title: 'Working Hours', details: ['Monday - Friday: 9:00 AM - 6:00 PM', 'Saturday: 10:00 AM - 4:00 PM'] }
  ]

  return (
    <div>
      <section className="relative bg-black text-white py-32">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1423666639041-f56000c27a9a?w=1920&h=600&fit=crop" alt="Contact" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-black/80"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-secondary font-medium tracking-wider uppercase text-sm mb-4">Get In Touch</p>
          <h1 className="text-5xl md:text-6xl font-heading font-bold mb-4">Contact Us</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            Have questions or want to get involved? We'd love to hear from you.
          </p>
        </div>
      </section>

      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="bg-gray-900 rounded-2xl shadow-xl p-8 border border-gray-800">
                <h2 className="text-2xl font-heading font-bold mb-6 text-white">Send us a Message</h2>
                
                <form onSubmit={handleSubmit}>
                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Full Name *</label>
                      <input type="text" required value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-700 rounded-xl focus:border-secondary focus:outline-none bg-gray-800 text-white"
                        placeholder="Your name" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Email Address *</label>
                      <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-700 rounded-xl focus:border-secondary focus:outline-none bg-gray-800 text-white"
                        placeholder="your@email.com" />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Phone Number</label>
                      <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-700 rounded-xl focus:border-secondary focus:outline-none bg-gray-800 text-white"
                        placeholder="+91 XXXXX XXXXX" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-400 mb-2">Inquiry Type</label>
                      <select value={formData.type} onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-700 rounded-xl focus:border-secondary focus:outline-none bg-gray-800 text-white">
                        <option value="general">General Inquiry</option>
                        <option value="donation">Donation Related</option>
                        <option value="volunteer">Volunteer Opportunity</option>
                        <option value="partnership">Partnership</option>
                        <option value="media">Media/Press</option>
                      </select>
                    </div>
                  </div>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-gray-400 mb-2">Subject</label>
                    <input type="text" value={formData.subject} onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-700 rounded-xl focus:border-secondary focus:outline-none bg-gray-800 text-white"
                      placeholder="How can we help?" />
                  </div>

                  <div className="mb-8">
                    <label className="block text-sm font-medium text-gray-400 mb-2">Message *</label>
                    <textarea required rows={6} value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-700 rounded-xl focus:border-secondary focus:outline-none resize-none bg-gray-800 text-white"
                      placeholder="Tell us more about your inquiry..." />
                  </div>

                  <button type="submit" disabled={loading}
                    className="w-full px-8 py-4 bg-secondary text-black font-semibold rounded-xl hover:bg-yellow-400 transition-all flex items-center justify-center space-x-2">
                    {loading ? (
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-black border-t-transparent"></div>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <div key={index} className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center flex-shrink-0">
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
              ))}

              <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl p-6 border border-gray-800">
                <MessageCircle className="w-10 h-10 text-secondary mb-4" />
                <h3 className="font-bold text-lg mb-2 text-white">Chat with Us</h3>
                <p className="text-gray-500 text-sm mb-4">Get instant support on WhatsApp</p>
                <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer"
                  className="block w-full py-3 bg-secondary text-black font-medium rounded-lg text-center hover:bg-yellow-400 transition-colors">
                  Open WhatsApp
                </a>
              </div>

              <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
                <h3 className="font-bold mb-4 text-white">Volunteer With Us</h3>
                <p className="text-gray-500 text-sm mb-4">Join our team of dedicated volunteers and make a real difference.</p>
                <a href="mailto:volunteer@hopefoundation.org" className="text-secondary font-medium hover:underline">
                  volunteer@hopefoundation.org
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl overflow-hidden shadow-xl border border-gray-800">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3771.7554898439277!2d72.83!3d19.07!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDA0JzEyLjAiTiA3MsKwNDknNDguMCJF!5e0!3m2!1sen!2sin!4v1234567890"
              width="100%" height="450" style={{ border: 0 }} allowFullScreen="" loading="lazy"
              referrerPolicy="no-referrer-when-downgrade" title="Hope Foundation Location"
            ></iframe>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Contact
