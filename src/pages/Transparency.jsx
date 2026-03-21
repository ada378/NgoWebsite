import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts'
import { Eye, Download, FileText, TrendingUp, Shield, CheckCircle, ExternalLink } from 'lucide-react'

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
    <div>
      {/* Hero */}
      <section className="relative bg-black text-white pt-24 pb-16 sm:pt-32 sm:pb-20">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&h=600&fit=crop" alt="Transparency" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-black/80"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 text-center">
          <Shield className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 text-secondary mx-auto mb-4 sm:mb-6" />
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-3 sm:mb-4">Our Transparency</h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto px-4">Complete accountability. See exactly how your donation creates impact.</p>
        </div>
      </section>

      {/* Stats */}
      <section className="py-10 sm:py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-10 sm:mb-16">
            {[
              { label: 'Total Funds (2024)', value: '₹' + (total / 10000000).toFixed(1) + 'Cr', icon: Eye, color: 'text-secondary' },
              { label: 'Admin Cost', value: adminPercent + '%', icon: TrendingUp, color: 'text-green-500' },
              { label: 'Fund Utilization', value: '100%', icon: CheckCircle, color: 'text-secondary' }
            ].map((stat, i) => (
              <div key={i} className="bg-gray-900 rounded-xl sm:rounded-2xl p-5 sm:p-8 text-center border border-gray-800">
                <stat.icon className={`w-8 h-8 sm:w-10 sm:w-12 sm:h-12 mx-auto mb-3 sm:mb-4 ${stat.color}`} />
                <p className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-secondary mb-1 sm:mb-2">{stat.value}</p>
                <p className="text-gray-500 text-xs sm:text-sm">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Fund Allocation */}
          <div className="bg-gray-900 rounded-xl sm:rounded-3xl p-5 sm:p-8 md:p-12 border border-gray-800">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-heading font-bold mb-2 sm:mb-3 text-white">Fund Allocation Breakdown</h2>
              <p className="text-gray-500 text-sm sm:text-base">See exactly where every rupee goes</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 sm:gap-12">
              {/* Pie Chart */}
              <div>
                <h3 className="text-base sm:text-xl font-bold mb-4 sm:mb-6 text-center text-white">Visual Breakdown</h3>
                <div className="h-64 sm:h-72 md:h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie data={pieData} cx="50%" cy="50%" innerRadius={40} outerRadius={70} paddingAngle={3} dataKey="value">
                        {pieData.map((entry, i) => <Cell key={i} fill={allocationData[i].color} />)}
                      </Pie>
                      <Tooltip formatter={(v) => ['₹' + (v / 100000).toFixed(1) + 'L', 'Amount']} contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px' }} />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Allocation Bars */}
              <div className="flex flex-col justify-center space-y-3 sm:space-y-4">
                {allocationData.map((item, i) => (
                  <div key={i} className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 bg-gray-800 rounded-xl border border-gray-700">
                    <div className="w-3 h-3 sm:w-4 sm:h-4 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }}></div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1.5 sm:mb-2">
                        <span className="font-bold text-white text-xs sm:text-sm">{item.name}</span>
                        <span className="font-display font-bold text-secondary text-xs sm:text-sm">₹{(item.value / 100000).toFixed(1)}L ({pieData[i].percentage}%)</span>
                      </div>
                      <div className="h-1.5 sm:h-2 bg-gray-700 rounded-full overflow-hidden">
                        <div className="h-full rounded-full" style={{ width: `${pieData[i].percentage}%`, backgroundColor: item.color }}></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects */}
      <section className="py-10 sm:py-20 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-heading font-bold mb-2 sm:mb-3 text-white">Project-wise Spending</h2>
            <p className="text-gray-500 text-sm sm:text-base">Detailed breakdown of funds allocated</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {data?.projects?.map((project, i) => (
              <div key={i} className="bg-gray-900 rounded-xl sm:rounded-2xl p-4 sm:p-6 flex items-start space-x-4 sm:space-x-6 border border-gray-800">
                <div className={`w-10 h-10 sm:w-14 sm:h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${project.status === 'completed' ? 'bg-green-500/20' : 'bg-gray-800'}`}>
                  {project.status === 'completed' ? <CheckCircle className="w-5 h-5 sm:w-7 sm:h-7 text-green-500" /> : <TrendingUp className="w-5 h-5 sm:w-7 sm:h-7 text-secondary" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-1 sm:mb-2">
                    <h3 className="font-bold text-base sm:text-lg text-white truncate">{project.name}</h3>
                    <span className={`px-2 py-0.5 sm:px-2 sm:py-1 rounded-full text-xs font-bold ${project.status === 'completed' ? 'bg-green-500/20 text-green-500' : 'bg-gray-800 text-gray-400'}`}>
                      {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
                    </span>
                  </div>
                  <p className="font-display text-xl sm:text-2xl md:text-3xl font-bold text-secondary mb-0.5 sm:mb-1">₹{(project.amount / 100000).toFixed(1)}L</p>
                  <p className="text-gray-500 text-xs sm:text-sm">{Math.round((project.amount / total) * 100)}% of total</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Documents */}
      <section className="py-10 sm:py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-heading font-bold mb-2 sm:mb-3 text-white">Reports & Documents</h2>
            <p className="text-gray-500 text-sm sm:text-base">Download financial reports and audit statements</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 sm:gap-4">
            {documents.map((doc, i) => (
              <div key={i} className="bg-gray-900 rounded-xl p-4 sm:p-6 border border-gray-800 hover:border-secondary/50 transition-colors">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-secondary/20 rounded-lg flex items-center justify-center mb-3 sm:mb-4">
                  <FileText className="w-5 h-5 sm:w-6 sm:h-6 text-secondary" />
                </div>
                <p className="font-medium text-white mb-1 text-xs sm:text-sm truncate">{doc.title}</p>
                <p className="text-gray-500 text-xs mb-3 sm:mb-4">{doc.size}</p>
                <button className="w-full flex items-center justify-center gap-1 sm:gap-2 px-2 sm:px-3 py-1.5 sm:py-2 bg-gray-800 border border-gray-700 text-gray-300 rounded-lg hover:bg-gray-700 transition-colors text-xs sm:text-sm font-medium">
                  <Download className="w-3 h-3 sm:w-4 sm:h-4" />Download
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Promise */}
      <section className="py-10 sm:py-20 bg-gray-950">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Shield className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 text-secondary mx-auto mb-4 sm:mb-6" />
          <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-heading font-bold mb-3 sm:mb-4 text-white">Our Promise to You</h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 mb-8 sm:mb-12 max-w-2xl mx-auto">Complete transparency in all operations. Every donation tracked, every rupee accounted.</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
            {[
              { title: 'Real-time Tracking', desc: 'Track your donation\'s impact', icon: Eye },
              { title: 'Quarterly Reports', desc: 'Published every quarter', icon: FileText },
              { title: 'Third-party Audit', desc: 'Independent verification', icon: Shield }
            ].map((item, i) => (
              <div key={i} className="bg-gray-900 backdrop-blur rounded-xl sm:rounded-2xl p-5 sm:p-8 border border-gray-800">
                <item.icon className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-secondary mx-auto mb-3 sm:mb-4" />
                <h3 className="font-bold text-base sm:text-xl mb-1 sm:mb-2 text-white">{item.title}</h3>
                <p className="text-gray-500 text-xs sm:text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
          <Link to="/donate" className="inline-flex items-center gap-2 px-6 sm:px-8 py-3 sm:py-4 bg-secondary text-black font-semibold rounded-xl hover:bg-yellow-400 transition-all text-sm sm:text-base">
            <span>Make a Difference</span><ExternalLink className="w-4 h-4 sm:w-5 sm:h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Transparency
