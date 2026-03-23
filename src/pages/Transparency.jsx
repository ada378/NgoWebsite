import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts'
import { Eye, Download, FileText, TrendingUp, Shield, CheckCircle, ExternalLink, Heart, DollarSign, BarChart3 } from 'lucide-react'

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

const Transparency = () => {
  const [data, setData] = useState(null)

  useEffect(() => {
    setData({
      quarter: 'Q4', year: 2024, totalReceived: 12500000,
      allocation: { education: 6250000, healthcare: 3750000, womenEmpowerment: 1250000, environment: 750000, admin: 500000 },
      projects: [
        { name: 'School Construction', amount: 2000000, status: 'completed' },
        { name: 'Mobile Health Units', amount: 1500000, status: 'ongoing' },
        { name: 'Women Training Center', amount: 800000, status: 'completed' },
        { name: 'Tree Plantation', amount: 500000, status: 'ongoing' }
      ]
    })
  }, [])

  const allocationData = [
    { name: 'Education', value: data?.allocation?.education || 0, color: '#3B82F6' },
    { name: 'Healthcare', value: data?.allocation?.healthcare || 0, color: '#EF4444' },
    { name: 'Women', value: data?.allocation?.womenEmpowerment || 0, color: '#A855F7' },
    { name: 'Environment', value: data?.allocation?.environment || 0, color: '#10B981' },
    { name: 'Admin', value: data?.allocation?.admin || 0, color: '#6B7280' }
  ]

  const pieData = allocationData.map(item => ({
    name: item.name, value: item.value, percentage: data ? Math.round((item.value / data.totalReceived) * 100) : 0
  }))

  const total = data?.totalReceived || 0
  const adminPercent = data ? Math.round((data.allocation.admin / total) * 100) : 0

  const documents = [
    { title: 'Annual Report 2024', size: '2.4 MB' }, { title: 'Audit Statement 2024', size: '1.8 MB' },
    { title: '80G Certificate', size: '0.5 MB' }, { title: 'FCRA Certificate', size: '0.4 MB' },
    { title: 'NGO Registration', size: '0.6 MB' }, { title: 'Q4 Financial Report', size: '1.2 MB' },
    { title: 'Impact Assessment', size: '3.1 MB' }, { title: 'Privacy Policy', size: '0.3 MB' }
  ]

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&h=600&fit=crop" alt="Transparency" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black" />
        </div>
        
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-green-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 text-center">
          <FadeInSection>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 mb-6">
              <Shield className="w-4 h-4 text-secondary" />
              <span className="text-secondary font-medium text-sm">Complete Accountability</span>
            </div>
            
            <div className="inline-flex items-center justify-center w-20 h-20 bg-secondary/20 rounded-full mb-8">
              <Shield className="w-10 h-10 text-secondary" />
            </div>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold text-white mb-6 leading-tight">
              Our <span className="bg-gradient-to-r from-secondary via-yellow-400 to-secondary bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">Transparency</span>
            </h1>
            
            <p className="text-gray-400 text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed px-4">
              Complete accountability. See exactly how your donation creates impact.
            </p>
          </FadeInSection>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 md:py-32 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/5 via-transparent to-secondary/5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8">
            {[
              { label: 'Total Funds (2024)', value: '₹' + (total / 10000000).toFixed(1) + 'Cr', icon: DollarSign, color: 'text-secondary' },
              { label: 'Admin Cost', value: adminPercent + '%', icon: BarChart3, color: 'text-green-500' },
              { label: 'Fund Utilization', value: '100%', icon: CheckCircle, color: 'text-secondary' }
            ].map((stat, i) => (
              <FadeInSection key={i} delay={i * 100}>
                <div className="text-center p-8 bg-gradient-to-br from-gray-900 to-black rounded-3xl border border-white/10 hover:border-secondary/30 transition-all duration-500 group hover:-translate-y-2">
                  <stat.icon className={`w-12 h-12 mx-auto mb-4 ${stat.color}`} />
                  <p className="text-3xl md:text-4xl font-display font-bold text-gradient mb-2">{stat.value}</p>
                  <p className="text-gray-400">{stat.label}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Fund Allocation */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-gray-950 to-black relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <FadeInSection>
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-4">Fund Allocation Breakdown</h2>
              <p className="text-gray-400 text-lg">See exactly where every rupee goes</p>
            </div>
          </FadeInSection>

          <FadeInSection delay={200}>
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-8 md:p-12 border border-white/10 shadow-2xl">
              <div className="grid lg:grid-cols-2 gap-12">
                {/* Pie Chart */}
                <div>
                  <h3 className="text-xl font-bold mb-6 text-center text-white">Visual Breakdown</h3>
                  <div className="h-72 md:h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={3} dataKey="value">
                          {pieData.map((entry, i) => <Cell key={i} fill={allocationData[i].color} />)}
                        </Pie>
                        <Tooltip formatter={(v) => ['₹' + (v / 100000).toFixed(1) + 'L', 'Amount']} contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px' }} />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                {/* Allocation Bars */}
                <div className="flex flex-col justify-center space-y-4">
                  {allocationData.map((item, i) => (
                    <div key={i} className="flex items-center space-x-4 p-4 bg-white/5 rounded-xl border border-white/10 hover:border-secondary/30 transition-all">
                      <div className="w-4 h-4 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }}></div>
                      <div className="flex-1">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-bold text-white">{item.name}</span>
                          <span className="font-display font-bold text-secondary">₹{(item.value / 100000).toFixed(1)}L ({pieData[i].percentage}%)</span>
                        </div>
                        <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                          <div className="h-full rounded-full transition-all" style={{ width: `${pieData[i].percentage}%`, backgroundColor: item.color }}></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Projects */}
      <section className="py-20 md:py-32 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/5 via-transparent to-secondary/5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <FadeInSection>
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 rounded-full text-secondary text-sm font-semibold mb-4">
                <TrendingUp className="w-4 h-4" />
                Project-wise Spending
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white">Detailed Breakdown</h2>
            </div>
          </FadeInSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
            {data?.projects?.map((project, i) => (
              <FadeInSection key={i} delay={i * 100}>
                <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 flex items-start space-x-6 border border-white/10 hover:border-secondary/30 transition-all duration-500 group hover:-translate-y-2">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 ${project.status === 'completed' ? 'bg-green-500/20' : 'bg-secondary/20'}`}>
                    {project.status === 'completed' ? <CheckCircle className="w-7 h-7 text-green-500" /> : <TrendingUp className="w-7 h-7 text-secondary" />}
                  </div>
                  <div className="flex-1">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-2">
                      <h3 className="font-bold text-lg text-white">{project.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-bold ${project.status === 'completed' ? 'bg-green-500/20 text-green-500' : 'bg-secondary/20 text-secondary'}`}>
                        {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                      </span>
                    </div>
                    <p className="font-display text-2xl md:text-3xl font-bold text-gradient mb-1">₹{(project.amount / 100000).toFixed(1)}L</p>
                    <p className="text-gray-500 text-sm">{Math.round((project.amount / total) * 100)}% of total</p>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Documents */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-gray-950 to-black relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <FadeInSection>
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 rounded-full text-secondary text-sm font-semibold mb-4">
                <FileText className="w-4 h-4" />
                Reports & Documents
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white">Financial Reports</h2>
            </div>
          </FadeInSection>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-6">
            {documents.map((doc, i) => (
              <FadeInSection key={i} delay={i * 50}>
                <div className="group bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 border border-white/10 hover:border-secondary/30 transition-all duration-500 hover:-translate-y-2">
                  <div className="w-12 h-12 bg-secondary/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <FileText className="w-6 h-6 text-secondary" />
                  </div>
                  <p className="font-medium text-white mb-1 truncate">{doc.title}</p>
                  <p className="text-gray-500 text-sm mb-4">{doc.size}</p>
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-gray-300 rounded-lg hover:bg-secondary hover:text-black transition-all text-sm font-medium">
                    <Download className="w-4 h-4" />Download
                  </button>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Promise */}
      <section className="py-20 md:py-32 bg-black relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-secondary/10 rounded-full blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <FadeInSection>
            <div className="inline-flex items-center justify-center w-20 h-20 bg-secondary/20 rounded-full mb-8">
              <Shield className="w-10 h-10 text-secondary" />
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-6">Our Promise to You</h2>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-12">Complete transparency in all operations. Every donation tracked, every rupee accounted.</p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 md:gap-8 mb-12">
              {[
                { title: 'Real-time Tracking', desc: "Track your donation's impact", icon: Eye },
                { title: 'Quarterly Reports', desc: 'Published every quarter', icon: FileText },
                { title: 'Third-party Audit', desc: 'Independent verification', icon: Shield }
              ].map((item, i) => (
                <div key={i} className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-8 border border-white/10 hover:border-secondary/30 transition-all duration-500 group hover:-translate-y-2">
                  <item.icon className="w-12 h-12 text-secondary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="font-bold text-lg mb-2 text-white">{item.title}</h3>
                  <p className="text-gray-500">{item.desc}</p>
                </div>
              ))}
            </div>
            <Link to="/donate" className="group relative inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-secondary to-yellow-500 text-black font-bold text-lg rounded-xl overflow-hidden shadow-lg shadow-secondary/30 hover:shadow-secondary/50 transition-all duration-300 hover:-translate-y-1">
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative flex items-center gap-3">
                <Heart className="w-5 h-5" />
                Make a Difference
              </span>
              <ExternalLink className="w-5 h-5 relative" />
            </Link>
          </FadeInSection>
        </div>
      </section>
    </div>
  )
}

export default Transparency
