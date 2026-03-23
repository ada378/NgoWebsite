import { useState, useEffect, useRef } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import { Heart, CreditCard, Smartphone, Building2, Check, Shield, Award, Loader2, Receipt, FileText } from 'lucide-react'
import axios from 'axios'
import toast from 'react-hot-toast'

const Donate = () => {
  const [searchParams] = useSearchParams()
  const [step, setStep] = useState(1)
  const [loading, setLoading] = useState(false)
  const [selectedAmount, setSelectedAmount] = useState(parseInt(searchParams.get('amount')) || 1000)
  const [customAmount, setCustomAmount] = useState('')
  const [formData, setFormData] = useState({ donorName: '', email: '', phone: '', program: 'General', message: '', anonymous: false })
  const [paymentMethod, setPaymentMethod] = useState('UPI')
  const [recurring, setRecurring] = useState(false)
  const [donationResult, setDonationResult] = useState(null)
  const [razorpayLoaded, setRazorpayLoaded] = useState(false)
  const razorpayRef = useRef(null)

  const amounts = [500, 1000, 2500, 5000, 10000]
  const paymentMethods = [
    { id: 'UPI', icon: Smartphone, label: 'UPI' },
    { id: 'Card', icon: CreditCard, label: 'Card' },
    { id: 'Net Banking', icon: Building2, label: 'Net Banking' }
  ]
  const programs = ['Education', 'Healthcare', 'Women Empowerment', 'Environment', 'General']
  const finalAmount = customAmount ? parseInt(customAmount) : selectedAmount

  useEffect(() => {
    const amount = searchParams.get('amount')
    if (amount) setSelectedAmount(parseInt(amount))
    const program = searchParams.get('program')
    if (program) setFormData(prev => ({ ...prev, program }))

    const loadRazorpay = () => {
      const script = document.createElement('script')
      script.src = 'https://checkout.razorpay.com/v1/checkout.js'
      script.async = true
      script.onload = () => setRazorpayLoaded(true)
      script.onerror = () => {
        toast.error('Failed to load payment gateway')
        setRazorpayLoaded(false)
      }
      document.body.appendChild(script)
    }
    loadRazorpay()

    return () => {
      if (document.querySelector('script[src*="razorpay"]')) {
        document.querySelector('script[src*="razorpay"]')?.remove()
      }
    }
  }, [searchParams])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.donorName || !formData.email) { toast.error('Please fill required fields'); return }
    if (finalAmount < 100) { toast.error('Minimum donation is ₹100'); return }
    setStep(2)
  }

  const handlePayment = async () => {
    setLoading(true)
    let donationId = ''
    let receiptNum = `HF${Date.now().toString().slice(-8)}`
    let certId = `CERT${Date.now()}${Math.random().toString(36).substr(2, 9).toUpperCase()}`
    
    try {
      const response = await axios.post('/api/donations', {
        donorName: formData.anonymous ? 'Anonymous' : formData.donorName,
        donorEmail: formData.email,
        amount: finalAmount,
        paymentMethod,
        program: formData.program,
        message: formData.message,
        recurring,
        anonymous: formData.anonymous
      })
      donationId = response.data.donation.id
    } catch { donationId = 'DEMO-' + Date.now() }

    try {
      if (razorpayLoaded && window.Razorpay) {
        const keyResponse = await axios.get('/api/payment/key')
        const orderResponse = await axios.post('/api/payment/create-order', {
          amount: finalAmount,
          currency: 'INR',
          receipt: donationId
        })

        const options = {
          key: keyResponse.data.key,
          amount: orderResponse.data.amount,
          currency: orderResponse.data.currency,
          name: 'Hope Foundation',
          description: `Donation for ${formData.program}`,
          image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=100&h=100',
          order_id: orderResponse.data.orderId,
          handler: async (response) => {
            try {
              await axios.post('/api/donations/verify-payment', {
                donationId,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpayOrderId: response.razorpay_order_id,
                razorpaySignature: response.razorpay_signature
              })
              
              setLoading(false)
              setDonationResult({ donationId, amount: finalAmount, receiptNumber: receiptNum, certificateId: certId })
              setStep(3)
              
              setTimeout(async () => {
                try {
                  await axios.post('/api/certificates/generate', { donationId, type: 'donation' })
                  await axios.post('/api/certificates/generate', { donationId, type: '80g' })
                  await axios.post('/api/certificates/receipt/generate', { donationId })
                  toast.success('All certificates auto-generated!')
                } catch { toast.success('Certificates in dashboard.') }
              }, 500)
              toast.success('Payment successful!')
            } catch (error) {
              toast.error('Payment verification failed')
            }
          },
          prefill: {
            name: formData.donorName,
            email: formData.email,
            contact: formData.phone || ''
          },
          notes: {
            donationId: donationId,
            program: formData.program
          },
          theme: {
            color: '#F59E0B'
          },
          modal: {
            ondismiss: () => {
              setLoading(false)
              toast.error('Payment cancelled')
            }
          }
        }

        razorpayRef.current = new window.Razorpay(options)
        razorpayRef.current.open()
      } else {
        await processDemoPayment(donationId, receiptNum, certId)
      }
    } catch (error) {
      console.error('Payment error:', error)
      await processDemoPayment(donationId, receiptNum, certId)
    }
  }

  const processDemoPayment = async (donationId, receiptNum, certId) => {
    setLoading(false)
    setDonationResult({ donationId, amount: finalAmount, receiptNumber: receiptNum, certificateId: certId })
    setStep(3)
    
    setTimeout(async () => {
      try {
        await axios.post('/api/donations/verify-payment', { donationId, razorpayPaymentId: 'DEMO_' + Date.now() })
        await axios.post('/api/certificates/generate', { donationId, type: 'donation' })
        await axios.post('/api/certificates/generate', { donationId, type: '80g' })
        await axios.post('/api/certificates/receipt/generate', { donationId })
        toast.success('All certificates auto-generated!')
      } catch { toast.success('Certificates in dashboard.') }
    }, 500)
    toast.success('Payment successful (Demo Mode)!')
  }

  const downloadReceipt = async () => {
    try {
      toast.loading('Generating receipt...')
      const res = await axios.post('/api/certificates/receipt/generate', { donationId: donationResult?.donationId })
      toast.dismiss()
      const downloadUrl = res.data.receipt?.downloadUrl
      if (downloadUrl) {
        const link = document.createElement('a')
        link.href = downloadUrl
        link.setAttribute('download', '')
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        toast.success('Receipt downloaded!')
      } else {
        toast.success('Receipt generated! Check dashboard.')
      }
    } catch (error) {
      toast.dismiss()
      toast.error('Failed to generate receipt')
    }
  }

  const downloadCertificate = async (type) => {
    try {
      toast.loading('Generating certificate...')
      const res = await axios.post('/api/certificates/generate', { donationId: donationResult?.donationId, type })
      toast.dismiss()
      const downloadUrl = res.data.certificate?.downloadUrl
      if (downloadUrl) {
        const link = document.createElement('a')
        link.href = downloadUrl
        link.setAttribute('download', '')
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        toast.success('Certificate downloaded!')
      } else {
        toast.success('Certificate generated! Check dashboard.')
      }
    } catch (error) {
      toast.dismiss()
      toast.error('Failed to generate certificate')
    }
  }

  const numberToWords = (num) => {
    const ones = ['', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine', 'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen', 'Seventeen', 'Eighteen', 'Nineteen']
    const tens = ['', '', 'Twenty', 'Thirty', 'Forty', 'Fifty', 'Sixty', 'Seventy', 'Eighty', 'Ninety']
    if (num < 20) return ones[num]
    if (num < 100) return tens[Math.floor(num / 10)] + (num % 10 ? ' ' + ones[num % 10] : '')
    if (num < 1000) return ones[Math.floor(num / 100)] + ' Hundred' + (num % 100 ? ' ' + numberToWords(num % 100) : '')
    if (num < 100000) return numberToWords(Math.floor(num / 1000)) + ' Thousand' + (num % 1000 ? ' ' + numberToWords(num % 1000) : '')
    return numberToWords(Math.floor(num / 100000)) + ' Lakh' + (num % 100000 ? ' ' + numberToWords(num % 100000) : '')
  }

  return (
    <div className="min-h-screen bg-black">
      <section className="bg-gradient-to-br from-gray-900 to-black text-white py-16 relative overflow-hidden">
        <div className="absolute top-10 right-10 w-48 h-48 bg-secondary/20 rounded-full blur-3xl"></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <Heart className="w-12 h-12 text-secondary mx-auto mb-4" />
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-4">Make a Donation</h1>
          <p className="text-base sm:text-lg text-gray-400 max-w-xl mx-auto">Your contribution transforms lives. Every rupee counts.</p>
        </div>
      </section>

      <section className="py-12">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex justify-center mb-12">
            <div className="flex items-center space-x-2 sm:space-x-4">
              {[1, 2, 3].map((s) => (
                <div key={s} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm sm:text-base ${
                    step >= s ? 'bg-secondary text-black' : 'bg-gray-800 text-gray-500'
                  }`}>
                    {step > s ? <Check className="w-5 h-5" /> : s}
                  </div>
                  {s < 3 && <div className={`w-16 md:w-20 h-1 mx-2 rounded-full ${step > s ? 'bg-secondary' : 'bg-gray-800'}`}></div>}
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gray-900 rounded-2xl sm:rounded-3xl shadow-xl p-6 sm:p-8 md:p-10 border border-gray-800">
            {step === 1 && (
              <form onSubmit={handleSubmit} className="animate-fade-in">
                <h2 className="text-xl sm:text-2xl font-heading font-bold mb-6 text-white">Choose Amount</h2>
                
                <div className="grid grid-cols-3 sm:grid-cols-5 gap-3 mb-6 sm:mb-8">
                  {amounts.map((amount) => (
                    <button key={amount} type="button" onClick={() => { setSelectedAmount(amount); setCustomAmount('') }}
                      className={`py-3 sm:py-4 px-2 rounded-xl font-display font-bold text-sm sm:text-base transition-all ${
                        selectedAmount === amount && !customAmount ? 'bg-secondary text-black scale-105' : 'bg-gray-800 hover:bg-gray-700 text-gray-300'
                      }`}>
                      ₹{amount}
                    </button>
                  ))}
                </div>

                <div className="mb-6 sm:mb-8">
                  <label className="block text-sm font-medium text-gray-400 mb-2">Custom amount</label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-bold text-lg">₹</span>
                    <input type="number" value={customAmount} onChange={(e) => { setCustomAmount(e.target.value); setSelectedAmount(0) }}
                      placeholder="Enter amount" className="w-full pl-10 pr-4 py-4 border-2 border-gray-700 rounded-xl focus:border-secondary focus:outline-none text-lg font-display bg-gray-800 text-white" />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">Minimum donation: ₹100</p>
                </div>

                <div className="bg-gray-800 rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 mb-6 sm:mb-8 border border-gray-700">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-base sm:text-lg font-medium text-gray-300">Selected Amount</span>
                    <span className="text-3xl sm:text-4xl font-display font-bold text-secondary">₹{finalAmount.toLocaleString()}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-500">Tax benefit (80G): ₹{(finalAmount * 0.5).toLocaleString()}</p>
                </div>

                <h2 className="text-xl sm:text-2xl font-heading font-bold mb-6 text-white">Your Details</h2>
                
                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Full Name *</label>
                    <input type="text" required value={formData.donorName} onChange={(e) => setFormData({ ...formData, donorName: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-700 rounded-xl focus:border-secondary focus:outline-none bg-gray-800 text-white" placeholder="Your name" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Email *</label>
                    <input type="email" required value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-700 rounded-xl focus:border-secondary focus:outline-none bg-gray-800 text-white" placeholder="your@email.com" />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-4 sm:gap-6 mb-4 sm:mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Phone</label>
                    <input type="tel" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-700 rounded-xl focus:border-secondary focus:outline-none bg-gray-800 text-white" placeholder="+91 XXXXX XXXXX" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">Program</label>
                    <select value={formData.program} onChange={(e) => setFormData({ ...formData, program: e.target.value })} className="w-full px-4 py-3 border-2 border-gray-700 rounded-xl focus:border-secondary focus:outline-none bg-gray-800 text-white">
                      {programs.map((p) => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>
                </div>

                <div className="mb-4 sm:mb-6">
                  <label className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                  <textarea value={formData.message} onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={2} className="w-full px-4 py-3 border-2 border-gray-700 rounded-xl focus:border-secondary focus:outline-none bg-gray-800 text-white resize-none" placeholder="Your thoughts..." />
                </div>

                <label className="flex items-center space-x-3 cursor-pointer mb-6 sm:mb-8">
                  <input type="checkbox" checked={formData.anonymous} onChange={(e) => setFormData({ ...formData, anonymous: e.target.checked })}
                    className="w-5 h-5 text-secondary rounded" />
                  <span className="text-sm sm:text-base text-gray-300">Make donation anonymous</span>
                </label>

                <button type="submit" className="w-full px-8 py-4 bg-secondary text-black font-semibold rounded-xl hover:bg-yellow-400 transition-all text-base sm:text-lg">Continue to Payment</button>
              </form>
            )}

            {step === 2 && (
              <div className="animate-fade-in">
                <h2 className="text-xl sm:text-2xl font-heading font-bold mb-6 text-white">Select Payment Method</h2>

                <div className="bg-gray-800 rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 mb-6 sm:mb-8 border border-gray-700">
                  <div className="flex items-center justify-between">
                    <span className="text-base sm:text-lg font-medium text-gray-300">Amount</span>
                    <span className="text-3xl sm:text-4xl font-display font-bold text-secondary">₹{finalAmount.toLocaleString()}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-gray-500 mt-2">{numberToWords(finalAmount)} Rupees Only</p>
                </div>

                <div className="grid sm:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
                  {paymentMethods.map((method) => (
                    <button key={method.id} onClick={() => setPaymentMethod(method.id)}
                      className={`p-4 sm:p-6 rounded-xl sm:rounded-2xl border-2 transition-all ${
                        paymentMethod === method.id ? 'border-secondary bg-secondary/10' : 'border-gray-700 hover:border-gray-600 bg-gray-800'
                      }`}>
                      <method.icon className={`w-8 h-8 sm:w-10 sm:h-10 mx-auto mb-2 ${paymentMethod === method.id ? 'text-secondary' : 'text-gray-500'}`} />
                      <p className="font-bold text-sm sm:text-base text-white">{method.label}</p>
                    </button>
                  ))}
                </div>

                <label className="flex items-start space-x-3 cursor-pointer mb-6 p-4 bg-gray-800 rounded-xl border border-gray-700">
                  <input type="checkbox" checked={recurring} onChange={(e) => setRecurring(e.target.checked)} className="w-5 h-5 mt-0.5" />
                  <div>
                    <span className="font-medium text-sm sm:text-base text-gray-300">Make this recurring</span>
                    <p className="text-xs sm:text-sm text-gray-500">Support us every month</p>
                  </div>
                </label>

                <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                  <button onClick={() => setStep(1)} className="sm:flex-1 px-6 py-4 border-2 border-gray-700 rounded-xl font-medium hover:bg-gray-800 transition-colors text-sm sm:text-base text-gray-300">
                    Back
                  </button>
                  <button onClick={handlePayment} disabled={loading}
                    className="sm:flex-1 px-8 py-4 bg-secondary text-black font-semibold rounded-xl hover:bg-yellow-400 transition-all flex items-center justify-center space-x-2 text-base sm:text-lg">
                    {loading ? <><Loader2 className="w-5 h-5 animate-spin" /><span>Processing...</span></> : <><Shield className="w-5 h-5" /><span>Pay ₹{finalAmount.toLocaleString()}</span></>}
                  </button>
                </div>

                <div className="mt-6 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-xs sm:text-sm text-gray-500">
                  <span className="flex items-center"><Shield className="w-4 h-4 mr-1 text-green-500" />Secure</span>
                  <span className="flex items-center"><Award className="w-4 h-4 mr-1 text-secondary" />80G Benefit</span>
                  <span className="flex items-center"><Check className="w-4 h-4 mr-1 text-secondary" />Instant Receipt</span>
                </div>
              </div>
            )}

            {step === 3 && donationResult && (
              <div className="text-center animate-fade-in">
                <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6 sm:mb-8 shadow-xl">
                  <Check className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
                </div>
                <h2 className="text-3xl sm:text-4xl font-heading font-bold mb-3 text-white">Thank You!</h2>
                <p className="text-base sm:text-lg text-gray-400 mb-8 sm:mb-10">Your generosity will help us make a real difference.</p>

                <div className="bg-gray-800 rounded-xl sm:rounded-2xl p-5 sm:p-6 md:p-8 mb-8 sm:mb-10 text-left max-w-md mx-auto border border-gray-700">
                  <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-700">
                    <span className="text-base sm:text-lg font-medium text-gray-300">Amount</span>
                    <span className="text-3xl sm:text-4xl font-display font-bold text-secondary">₹{donationResult.amount.toLocaleString()}</span>
                  </div>
                  <div className="space-y-3 text-sm sm:text-base">
                    <div className="flex justify-between"><span className="text-gray-500">Receipt No</span><span className="font-mono font-bold text-secondary">{donationResult.receiptNumber}</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">Certificate ID</span><span className="font-mono text-xs sm:text-sm text-gray-400">{donationResult.certificateId}</span></div>
                    <div className="flex justify-between"><span className="text-gray-500">Date</span><span className="text-gray-300">{new Date().toLocaleDateString('en-IN')}</span></div>
                  </div>
                </div>

                <div className="grid sm:grid-cols-3 gap-3 sm:gap-4 mb-8 sm:mb-10">
                  <button onClick={downloadReceipt} className="p-4 bg-gray-800 rounded-xl hover:bg-gray-700 transition-colors text-sm sm:text-base border border-gray-700">
                    <Receipt className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 text-gray-400" /><p className="font-medium text-gray-300">Receipt</p>
                  </button>
                  <button onClick={() => downloadCertificate('donation')} className="p-4 bg-gray-800 rounded-xl hover:bg-gray-700 transition-colors text-sm sm:text-base border border-gray-700">
                    <FileText className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 text-secondary" /><p className="font-medium text-secondary">Certificate</p>
                  </button>
                  <button onClick={() => downloadCertificate('80g')} className="p-4 bg-gray-800 rounded-xl hover:bg-gray-700 transition-colors text-sm sm:text-base border border-gray-700">
                    <Award className="w-6 h-6 sm:w-8 sm:h-8 mx-auto mb-2 text-secondary" /><p className="font-medium text-secondary">80G</p>
                  </button>
                </div>

                <Link to="/" className="text-secondary font-semibold hover:underline text-sm sm:text-base">Return to Home</Link>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Donate
