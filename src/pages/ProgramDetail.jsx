import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { GraduationCap, Activity, Users, TreePine, Heart, ArrowRight, Check, Globe } from 'lucide-react'
import api from '../config/api'

const FadeInSection = ({ children, delay = 0 }) => {
  const [isVisible, setIsVisible] = useState(false)
  
  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), delay)
    return () => clearTimeout(timer)
  }, [delay])

  return (
    <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
      {children}
    </div>
  )
}

const ProgramDetail = () => {
  const { slug } = useParams()
  const [program, setProgram] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProgram()
    window.scrollTo(0, 0)
  }, [slug])

  const fetchProgram = async () => {
    setLoading(true)
    try {
      const response = await api.get(`/api/programs/${slug}`)
      setProgram(response.data.program)
    } catch (error) {
      setProgram({
        title: 'Education for All',
        slug: 'education-for-all',
        description: 'Our Education program provides quality education to underprivileged children across India. We believe every child deserves access to learning opportunities that can transform their future.',
        category: 'Education',
        impactStats: { livesImpacted: 15000, projectsCompleted: 45, volunteers: 500 },
        goals: { target: 5000000, raised: 3200000 },
        features: ['Free schooling for underprivileged children', 'Scholarship programs for bright students', 'Digital classrooms with modern technology', 'Teacher training and development', 'After-school support programs', 'Career counseling services']
      })
    }
    setLoading(false)
  }

  const icons = {
    'Education': GraduationCap,
    'Healthcare': Activity,
    'Women Empowerment': Users,
    'Environment': TreePine
  }

  const colors = {
    'Education': 'from-blue-600 to-blue-700',
    'Healthcare': 'from-red-600 to-red-700',
    'Women Empowerment': 'from-purple-600 to-purple-700',
    'Environment': 'from-emerald-600 to-emerald-700'
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-secondary border-t-transparent"></div>
      </div>
    )
  }

  if (!program) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="text-center">
          <p className="text-white text-xl mb-4">Program not found</p>
          <Link to="/programs" className="text-secondary hover:underline">Back to Programs</Link>
        </div>
      </div>
    )
  }

  const Icon = icons[program.category] || Heart
  const color = colors[program.category] || 'from-gray-500 to-gray-600'
  const progress = program.goals ? Math.round((program.goals.raised / program.goals.target) * 100) : 0

  const relatedPrograms = [
    { title: 'Healthcare Mission', slug: 'healthcare-mission', category: 'Healthcare' },
    { title: 'Women Empowerment', slug: 'women-empowerment', category: 'Women Empowerment' },
    { title: 'Green Earth', slug: 'green-earth-initiative', category: 'Environment' }
  ].filter(p => p.category !== program.category)

  return (
    <div className="min-h-screen bg-black">
      {/* Hero */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1497486751825-1233686d5d80?w=1920&h=800&fit=crop" alt="" className="w-full h-full object-cover opacity-20" />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/90 to-black" />
        </div>
        
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <FadeInSection>
            <nav className="flex items-center justify-center gap-2 text-sm mb-8">
              <Link to="/programs" className="text-gray-400 hover:text-white transition-colors">Programs</Link>
              <span className="text-gray-600">/</span>
              <span className="text-secondary">{program.category}</span>
            </nav>
            
            <div className={`w-24 h-24 mx-auto mb-8 bg-gradient-to-br ${color} rounded-3xl flex items-center justify-center shadow-2xl`}>
              <Icon className="w-12 h-12 text-white" />
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold text-white mb-4">
              {program.title}
            </h1>
            <p className="text-gray-400 text-lg sm:text-xl max-w-2xl mx-auto">{program.description}</p>
          </FadeInSection>
        </div>
      </section>

      {/* Content */}
      <section className="py-20 bg-gradient-to-b from-gray-950 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              <FadeInSection>
                <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-6">About This Program</h2>
                <p className="text-gray-400 text-lg leading-relaxed mb-8">
                  {program.description}
                </p>
              </FadeInSection>

              <FadeInSection delay={100}>
                <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-6">Program Features</h3>
                <div className="grid sm:grid-cols-2 gap-4">
                  {program.features?.map((feature, index) => (
                    <div key={index} className="flex items-start gap-3 p-4 bg-white/5 rounded-xl border border-white/10">
                      <div className="w-6 h-6 bg-secondary/20 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Check className="w-4 h-4 text-secondary" />
                      </div>
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
              </FadeInSection>

              <FadeInSection delay={200}>
                <h3 className="text-xl sm:text-2xl font-display font-bold text-white mb-6">Impact Stories</h3>
                <div className="space-y-6">
                  {[
                    {
                      name: 'Priya Singh',
                      story: 'Thanks to Hope Foundation\'s education program, I completed my graduation and now work as a software engineer. My family\'s life has completely transformed.',
                      image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face',
                      location: 'Mumbai'
                    },
                    {
                      name: 'Rajesh Kumar',
                      story: 'The healthcare camp organized in our village saved my mother\'s life. Early detection of her condition meant timely treatment. Forever grateful.',
                      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face',
                      location: 'Rural Gujarat'
                    }
                  ].map((story, index) => (
                    <div key={index} className="p-6 bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-white/10">
                      <div className="flex items-start gap-4">
                        <img src={story.image} alt={story.name} className="w-16 h-16 rounded-full border-2 border-secondary p-0.5" />
                        <div>
                          <p className="text-gray-300 mb-3 italic leading-relaxed">"{story.story}"</p>
                          <p className="font-bold text-white">- {story.name}</p>
                          <p className="text-secondary text-sm">{story.location}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </FadeInSection>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <FadeInSection delay={150}>
                <div className="bg-gradient-to-br from-gray-900 to-black rounded-3xl p-8 border border-white/10 sticky top-24">
                  <h3 className="text-xl font-display font-bold text-white mb-6">Program Impact</h3>
                  
                  <div className="grid grid-cols-3 gap-4 mb-8">
                    <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
                      <p className="text-2xl font-display font-bold text-secondary">{(program.impactStats?.livesImpacted || 0 / 1000).toFixed(0)}K+</p>
                      <p className="text-gray-500 text-sm">Lives</p>
                    </div>
                    <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
                      <p className="text-2xl font-display font-bold text-secondary">{program.impactStats?.projectsCompleted || 0}</p>
                      <p className="text-gray-500 text-sm">Projects</p>
                    </div>
                    <div className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
                      <p className="text-2xl font-display font-bold text-secondary">{(program.impactStats?.volunteers || 0 / 100).toFixed(0)}K+</p>
                      <p className="text-gray-500 text-sm">Volunteers</p>
                    </div>
                  </div>

                  {program.goals?.target && (
                    <>
                      <div className="mb-6">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="font-medium text-gray-300">Funding Progress</span>
                          <span className="text-secondary font-bold">{progress}%</span>
                        </div>
                        <div className="h-3 bg-gray-800 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-secondary to-yellow-500 rounded-full transition-all"
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>
                        <div className="flex justify-between text-sm text-gray-500 mt-2">
                          <span>₹{(program.goals.raised / 100000).toFixed(1)}L raised</span>
                          <span>Goal: ₹{(program.goals.target / 100000).toFixed(1)}L</span>
                        </div>
                      </div>
                    </>
                  )}

                  <Link 
                    to={`/donate?program=${encodeURIComponent(program.category)}`} 
                    className="group relative w-full py-4 bg-gradient-to-r from-secondary to-yellow-500 text-black font-bold rounded-xl overflow-hidden shadow-lg shadow-secondary/30 hover:shadow-secondary/50 transition-all flex items-center justify-center gap-3 mb-6"
                  >
                    <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                    <Heart className="w-5 h-5 relative z-10" />
                    <span className="relative z-10">Support This Program</span>
                  </Link>

                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm text-gray-400">
                      <Check className="w-5 h-5 text-emerald-500" />
                      <span>80G Tax Benefit Available</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-400">
                      <Check className="w-5 h-5 text-emerald-500" />
                      <span>Receive Impact Certificate</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-400">
                      <Check className="w-5 h-5 text-emerald-500" />
                      <span>Regular Updates on Progress</span>
                    </div>
                  </div>
                </div>
              </FadeInSection>
            </div>
          </div>
        </div>
      </section>

      {/* Related Programs */}
      <section className="py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="text-center mb-12">
              <h2 className="text-2xl sm:text-3xl font-display font-bold text-white mb-4">Related Programs</h2>
              <p className="text-gray-400">Explore other initiatives making a difference</p>
            </div>
          </FadeInSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {relatedPrograms.map((p, index) => {
              const RelatedIcon = icons[p.category] || Heart
              const relatedColor = colors[p.category] || 'from-gray-500 to-gray-600'
              return (
                <FadeInSection key={p.slug} delay={index * 100}>
                  <Link 
                    to={`/programs/${p.slug}`} 
                    className="group block bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden border border-white/10 hover:border-secondary/30 transition-all duration-500 hover:-translate-y-2"
                  >
                    <div className={`h-40 bg-gradient-to-br ${relatedColor} flex items-center justify-center relative overflow-hidden`}>
                      <RelatedIcon className="w-16 h-16 text-white/90 group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="p-6">
                      <span className="inline-block px-3 py-1 bg-secondary/20 text-secondary text-xs rounded-full font-bold mb-3">{p.category}</span>
                      <h3 className="font-bold text-xl text-white mb-2 group-hover:text-secondary transition-colors">{p.title}</h3>
                      <span className="inline-flex items-center gap-1 text-secondary font-semibold text-sm group-hover:gap-2 transition-all">
                        Learn More <ArrowRight className="w-4 h-4" />
                      </span>
                    </div>
                  </Link>
                </FadeInSection>
              )
            })}
          </div>
        </div>
      </section>
    </div>
  )
}

export default ProgramDetail
