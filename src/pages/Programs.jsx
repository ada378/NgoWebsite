import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { GraduationCap, Activity, Users, TreePine, ArrowRight, Heart, TrendingUp, Globe } from 'lucide-react'
import api from '../config/api'

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

const Programs = () => {
  const [programs, setPrograms] = useState([])
  const [filter, setFilter] = useState('All')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPrograms()
  }, [])

  const fetchPrograms = async () => {
    try {
      const response = await api.get('/api/programs')
      setPrograms(response.data.programs || [])
    } catch (error) {
      setPrograms([
        { _id: '1', title: 'Education for All', slug: 'education-for-all', description: 'Providing quality education to underprivileged children across India.', category: 'Education', impactStats: { livesImpacted: 15000, projectsCompleted: 45, volunteers: 500 }, goals: { target: 5000000, raised: 3200000 } },
        { _id: '2', title: 'Healthcare Mission', slug: 'healthcare-mission', description: 'Extending quality healthcare services to rural and underserved communities.', category: 'Healthcare', impactStats: { livesImpacted: 25000, projectsCompleted: 60, volunteers: 350 }, goals: { target: 8000000, raised: 5800000 } },
        { _id: '3', title: 'Women Empowerment', slug: 'women-empowerment', description: 'Empowering women through skill development and entrepreneurship support.', category: 'Women Empowerment', impactStats: { livesImpacted: 8000, projectsCompleted: 30, volunteers: 200 }, goals: { target: 3000000, raised: 2100000 } },
        { _id: '4', title: 'Green Earth Initiative', slug: 'green-earth-initiative', description: 'Environmental conservation through tree plantation and sustainable practices.', category: 'Environment', impactStats: { livesImpacted: 50000, projectsCompleted: 25, volunteers: 1000 }, goals: { target: 2000000, raised: 1500000 } }
      ])
    } finally {
      setLoading(false)
    }
  }

  const categories = ['All', 'Education', 'Healthcare', 'Women Empowerment', 'Environment']
  const icons = { 'Education': GraduationCap, 'Healthcare': Activity, 'Women Empowerment': Users, 'Environment': TreePine }
  const colors = { 'Education': 'from-blue-600 to-blue-700', 'Healthcare': 'from-red-600 to-red-700', 'Women Empowerment': 'from-purple-600 to-purple-700', 'Environment': 'from-emerald-600 to-emerald-700' }
  const barColors = { 'Education': 'bg-blue-500', 'Healthcare': 'bg-red-500', 'Women Empowerment': 'bg-purple-500', 'Environment': 'bg-emerald-500' }

  const filteredPrograms = filter === 'All' ? programs : programs.filter(p => p.category === filter)
  const totalStats = programs.reduce((acc, p) => ({ lives: acc.lives + p.impactStats.livesImpacted, projects: acc.projects + p.impactStats.projectsCompleted, volunteers: acc.volunteers + p.impactStats.volunteers }), { lives: 0, projects: 0, volunteers: 0 })

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=1920&h=600&fit=crop" alt="Programs" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black" />
        </div>
        
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 left-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 text-center">
          <FadeInSection>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 mb-6">
              <Heart className="w-4 h-4 text-secondary" />
              <span className="text-secondary font-medium text-sm">Four Pillars of Change</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold text-white mb-6 leading-tight">
              Our <span className="bg-gradient-to-r from-secondary via-yellow-400 to-secondary bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">Programs</span>
            </h1>
            
            <p className="text-gray-400 text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed px-4">
              We work across four key areas to create meaningful, lasting impact in communities across India.
            </p>
          </FadeInSection>
        </div>
      </section>

      {/* Stats */}
      <section className="py-20 md:py-32 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/5 via-transparent to-secondary/5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {[
              { label: 'Lives Impacted', value: totalStats.lives.toLocaleString() + '+', icon: Heart },
              { label: 'Projects', value: totalStats.projects + '+', icon: TrendingUp },
              { label: 'Volunteers', value: totalStats.volunteers.toLocaleString() + '+', icon: Users },
              { label: 'Communities', value: '50+', icon: Globe }
            ].map((stat, i) => (
              <FadeInSection key={i} delay={i * 100}>
                <div className="text-center p-8 bg-gradient-to-br from-white/5 to-transparent rounded-2xl border border-white/10 hover:border-secondary/30 transition-all duration-500 group hover:-translate-y-2">
                  <stat.icon className="w-8 h-8 text-secondary mx-auto mb-4" />
                  <p className="text-3xl md:text-4xl font-display font-bold text-gradient mb-2">{stat.value}</p>
                  <p className="text-gray-400">{stat.label}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-gray-950 to-black relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Filter */}
          <FadeInSection>
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setFilter(category)}
                  className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                    filter === category
                      ? 'bg-gradient-to-r from-secondary to-yellow-500 text-black shadow-lg shadow-secondary/30'
                      : 'bg-white/5 backdrop-blur-xl border border-white/20 text-white hover:bg-white/10 hover:border-secondary/50'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </FadeInSection>

          {/* Grid */}
          <div className="grid md:grid-cols-2 gap-8 md:gap-10">
            {filteredPrograms.map((program, index) => {
              const Icon = icons[program.category] || GraduationCap
              const color = colors[program.category] || 'from-gray-500 to-gray-600'
              const barColor = barColors[program.category] || 'bg-gray-500'
              const progress = program.goals?.raised && program.goals?.target ? Math.round((program.goals.raised / program.goals.target) * 100) : 0

              return (
                <FadeInSection key={program._id} delay={index * 100}>
                  <Link
                    to={`/programs/${program.slug}`}
                    className="group block bg-gradient-to-br from-gray-900 to-black rounded-3xl overflow-hidden border border-white/10 hover:border-secondary/30 transition-all duration-500 hover:-translate-y-2 shadow-xl"
                  >
                    <div className={`h-48 md:h-56 bg-gradient-to-br ${color} flex items-center justify-center relative overflow-hidden`}>
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                      <Icon className="w-24 h-24 text-white/90 group-hover:scale-110 transition-transform duration-500" />
                      <div className="absolute top-4 right-4 px-4 py-1.5 bg-black/30 backdrop-blur rounded-full text-white text-sm font-semibold">
                        {program.category}
                      </div>
                    </div>

                    <div className="p-8">
                      <h3 className="font-bold text-2xl md:text-3xl mb-3 text-white group-hover:text-secondary transition-colors">
                        {program.title}
                      </h3>
                      <p className="text-gray-400 mb-6 text-lg line-clamp-2">{program.description}</p>

                      <div className="grid grid-cols-3 gap-4 mb-6">
                        {[
                          { label: 'Lives', value: (program.impactStats.livesImpacted / 1000).toFixed(0) + 'K+' },
                          { label: 'Projects', value: program.impactStats.projectsCompleted },
                          { label: 'Volunteers', value: (program.impactStats.volunteers / 100).toFixed(0) + 'K+' }
                        ].map((stat, i) => (
                          <div key={i} className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
                            <p className="font-display font-bold text-lg text-secondary">{stat.value}</p>
                            <p className="text-gray-500 text-sm">{stat.label}</p>
                          </div>
                        ))}
                      </div>

                      {program.goals?.target && (
                        <div className="mb-6">
                          <div className="flex justify-between mb-2">
                            <span className="font-medium text-gray-300">Funding Progress</span>
                            <span className="text-secondary font-bold">{progress}%</span>
                          </div>
                          <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                            <div className={`h-full ${barColor} rounded-full transition-all`} style={{ width: `${progress}%` }}></div>
                          </div>
                          <div className="flex justify-between text-sm text-gray-500 mt-2">
                            <span>₹{(program.goals.raised / 100000).toFixed(1)}L raised</span>
                            <span>Goal: ₹{(program.goals.target / 100000).toFixed(1)}L</span>
                          </div>
                        </div>
                      )}

                      <div className="flex items-center text-secondary font-semibold text-lg group-hover:gap-3 transition-all">
                        <span>Learn More & Donate</span>
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </div>
                    </div>
                  </Link>
                </FadeInSection>
              )
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-32 bg-black relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-secondary/10 rounded-full blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <FadeInSection>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-6">Want to Support a Specific Program?</h2>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10">You can choose to direct your donation to a specific program that resonates with you.</p>
            <Link to="/donate" className="group relative inline-flex items-center gap-3 px-10 py-4 bg-gradient-to-r from-secondary to-yellow-500 text-black font-bold text-lg rounded-xl overflow-hidden shadow-lg shadow-secondary/30 hover:shadow-secondary/50 transition-all duration-300 hover:-translate-y-1">
              <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative flex items-center gap-3">
                <Heart className="w-5 h-5" />
                Donate Now
              </span>
              <ArrowRight className="w-5 h-5 relative" />
            </Link>
          </FadeInSection>
        </div>
      </section>
    </div>
  )
}

export default Programs
