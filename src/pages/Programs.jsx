import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { GraduationCap, Activity, Users, TreePine, ArrowRight } from 'lucide-react'
import axios from 'axios'

const Programs = () => {
  const [programs, setPrograms] = useState([])
  const [filter, setFilter] = useState('All')
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchPrograms()
  }, [])

  const fetchPrograms = async () => {
    try {
      const response = await axios.get('/api/programs')
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
  const colors = { 'Education': 'from-blue-500 to-blue-600', 'Healthcare': 'from-red-500 to-red-600', 'Women Empowerment': 'from-purple-500 to-purple-600', 'Environment': 'from-green-500 to-green-600' }

  const filteredPrograms = filter === 'All' ? programs : programs.filter(p => p.category === filter)
  const totalStats = programs.reduce((acc, p) => ({ lives: acc.lives + p.impactStats.livesImpacted, projects: acc.projects + p.impactStats.projectsCompleted, volunteers: acc.volunteers + p.impactStats.volunteers }), { lives: 0, projects: 0, volunteers: 0 })

  return (
    <div>
      <section className="relative bg-black text-white py-32">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=1920&h=600&fit=crop" alt="Programs" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-black/80"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-secondary font-medium tracking-wider uppercase text-sm mb-4">Our Programs</p>
          <h1 className="text-5xl md:text-6xl font-heading font-bold mb-6">Our Programs</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">
            We work across four key areas to create meaningful, lasting impact in communities across India.
          </p>
        </div>
      </section>

      <section className="py-16 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { label: 'Lives Impacted', value: totalStats.lives.toLocaleString() + '+' },
              { label: 'Projects Completed', value: totalStats.projects + '+' },
              { label: 'Active Volunteers', value: totalStats.volunteers.toLocaleString() + '+' },
              { label: 'Communities Served', value: '50+' }
            ].map((stat, i) => (
              <div key={i} className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
                <p className="font-display text-3xl font-bold text-secondary mb-2">{stat.value}</p>
                <p className="text-gray-500 text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setFilter(category)}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  filter === category
                    ? 'bg-secondary text-black'
                    : 'bg-gray-900 text-gray-300 hover:bg-gray-800 border border-gray-800'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {filteredPrograms.map((program) => {
              const Icon = icons[program.category] || GraduationCap
              const color = colors[program.category] || 'from-gray-500 to-gray-600'
              const progress = program.goals?.raised && program.goals?.target ? Math.round((program.goals.raised / program.goals.target) * 100) : 0

              return (
                <Link
                  key={program._id}
                  to={`/programs/${program.slug}`}
                  className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 hover:border-secondary/50 transition-all group"
                >
                  <div className={`h-48 bg-gradient-to-br ${color} flex items-center justify-center relative overflow-hidden`}>
                    <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                    <Icon className="w-20 h-20 text-white relative z-10" />
                    <div className="absolute top-4 right-4 px-3 py-1 bg-black/30 backdrop-blur rounded-full text-white text-sm">
                      {program.category}
                    </div>
                  </div>

                  <div className="p-8">
                    <h3 className="font-heading font-bold text-2xl mb-3 text-white group-hover:text-secondary transition-colors">
                      {program.title}
                    </h3>
                    <p className="text-gray-400 mb-6 line-clamp-3">{program.description}</p>

                    <div className="grid grid-cols-3 gap-4 mb-6">
                      {[
                        { label: 'Lives', value: program.impactStats.livesImpacted.toLocaleString() + '+' },
                        { label: 'Projects', value: program.impactStats.projectsCompleted },
                        { label: 'Volunteers', value: program.impactStats.volunteers.toLocaleString() + '+' }
                      ].map((stat, i) => (
                        <div key={i} className="text-center p-3 bg-black rounded-lg border border-gray-800">
                          <p className="font-display font-bold text-lg text-secondary">{stat.value}</p>
                          <p className="text-xs text-gray-500">{stat.label}</p>
                        </div>
                      ))}
                    </div>

                    {program.goals?.target && (
                      <div className="mb-6">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="font-medium text-gray-300">Funding Progress</span>
                          <span className="text-secondary font-bold">{progress}%</span>
                        </div>
                        <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                          <div className={`h-full bg-gradient-to-r ${color} rounded-full transition-all`} style={{ width: `${progress}%` }}></div>
                        </div>
                        <div className="flex justify-between text-xs text-gray-500 mt-1">
                          <span>₹{(program.goals.raised / 100000).toFixed(1)}L raised</span>
                          <span>₹{(program.goals.target / 100000).toFixed(1)}L goal</span>
                        </div>
                      </div>
                    )}

                    <div className="flex items-center text-secondary font-medium">
                      <span>Learn More & Donate</span>
                      <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </Link>
              )
            })}
          </div>
        </div>
      </section>

      <section className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-heading font-bold mb-6 text-white">
            Want to Support a Specific Program?
          </h2>
          <p className="text-xl text-gray-400 mb-8">
            You can choose to direct your donation to a specific program that resonates with you.
          </p>
          <Link to="/donate" className="inline-flex items-center gap-2 px-8 py-4 bg-secondary text-black font-semibold rounded-xl hover:bg-yellow-400 transition-all">
            <span>Donate Now</span>
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Programs
