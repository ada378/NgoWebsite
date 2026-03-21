import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { GraduationCap, Activity, Users, TreePine, Heart, ArrowRight, Check, Target, Eye, Users as UsersIcon } from 'lucide-react'
import axios from 'axios'

const ProgramDetail = () => {
  const { slug } = useParams()
  const [program, setProgram] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProgram()
  }, [slug])

  const fetchProgram = async () => {
    try {
      const response = await axios.get(`/api/programs/${slug}`)
      setProgram(response.data.program)
    } catch (error) {
      setProgram({
        title: 'Education for All',
        slug: 'education-for-all',
        description: 'Our Education program provides quality education to underprivileged children across India. We believe every child deserves access to learning opportunities that can transform their future.',
        category: 'Education',
        icon: 'book',
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  if (!program) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Program not found</p>
      </div>
    )
  }

  const Icon = icons[program.category] || Heart
  const progress = program.goals ? Math.round((program.goals.raised / program.goals.target) * 100) : 0

  return (
    <div>
      <section className="relative gradient-bg text-white py-32">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-40 left-20 w-72 h-72 bg-secondary rounded-full blur-3xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center space-x-2 text-sm mb-6">
            <Link to="/programs" className="text-gray-300 hover:text-white">Programs</Link>
            <span className="text-gray-500">/</span>
            <span>{program.category}</span>
          </nav>

          <div className="flex items-center space-x-6">
            <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center">
              <Icon className="w-10 h-10" />
            </div>
            <div>
              <h1 className="text-5xl font-heading font-bold mb-2">{program.title}</h1>
              <p className="text-xl text-gray-200">{program.category}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-3xl font-heading font-bold mb-6">About This Program</h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                {program.description}
              </p>

              <h3 className="text-2xl font-heading font-bold mb-6">Program Features</h3>
              <div className="grid md:grid-cols-2 gap-4 mb-12">
                {program.features?.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Check className="w-4 h-4 text-white" />
                    </div>
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <h3 className="text-2xl font-heading font-bold mb-6">Impact Stories</h3>
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
                  <div key={index} className="bg-background rounded-xl p-6 flex items-start space-x-4">
                    <img src={story.image} alt={story.name} className="w-16 h-16 rounded-full object-cover" />
                    <div>
                      <p className="text-gray-600 mb-3 italic">"{story.story}"</p>
                      <p className="font-bold text-primary">- {story.name}</p>
                      <p className="text-sm text-gray-500">{story.location}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-background rounded-2xl p-8 sticky top-24">
                <h3 className="text-xl font-heading font-bold mb-6">Program Impact</h3>
                
                <div className="grid grid-cols-3 gap-4 mb-8">
                  <div className="text-center">
                    <p className="font-display text-2xl font-bold text-primary">
                      {(program.impactStats?.livesImpacted || 0).toLocaleString()}+
                    </p>
                    <p className="text-xs text-gray-600">Lives</p>
                  </div>
                  <div className="text-center">
                    <p className="font-display text-2xl font-bold text-secondary">
                      {program.impactStats?.projectsCompleted || 0}
                    </p>
                    <p className="text-xs text-gray-600">Projects</p>
                  </div>
                  <div className="text-center">
                    <p className="font-display text-2xl font-bold text-success">
                      {(program.impactStats?.volunteers || 0).toLocaleString()}+
                    </p>
                    <p className="text-xs text-gray-600">Volunteers</p>
                  </div>
                </div>

                {program.goals?.target && (
                  <>
                    <div className="mb-6">
                      <div className="flex justify-between text-sm mb-2">
                        <span className="font-medium">Funding Progress</span>
                        <span className="text-primary font-bold">{progress}%</span>
                      </div>
                      <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-primary to-secondary rounded-full transition-all"
                          style={{ width: `${progress}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex justify-between text-sm text-gray-500 mb-8">
                      <span>₹{(program.goals.raised / 100000).toFixed(1)}L raised</span>
                      <span>Goal: ₹{(program.goals.target / 100000).toFixed(1)}L</span>
                    </div>
                  </>
                )}

                <Link to={`/donate?program=${encodeURIComponent(program.category)}`} className="btn-primary w-full flex items-center justify-center space-x-2">
                  <Heart className="w-5 h-5" />
                  <span>Support This Program</span>
                </Link>

                <div className="mt-6 pt-6 border-t space-y-3">
                  <div className="flex items-center space-x-3 text-sm text-gray-600">
                    <Check className="w-5 h-5 text-success" />
                    <span>80G Tax Benefit Available</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-gray-600">
                    <Check className="w-5 h-5 text-success" />
                    <span>Receive Impact Certificate</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-gray-600">
                    <Check className="w-5 h-5 text-success" />
                    <span>Regular Updates on Progress</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="section-title">Related Programs</h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: 'Healthcare Mission', category: 'Healthcare', icon: Activity },
              { title: 'Women Empowerment', category: 'Women Empowerment', icon: Users },
              { title: 'Green Earth', category: 'Environment', icon: TreePine }
            ].filter(p => p.category !== program.category).map((p, index) => (
              <Link key={index} to={`/programs/${p.slug || p.title.toLowerCase().replace(/ /g, '-')}`} className="card group">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-secondary rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <p.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="font-heading font-bold text-xl mb-2 group-hover:text-primary transition-colors">{p.title}</h3>
                <p className="text-gray-600 mb-4">Support our {p.category.toLowerCase()} initiatives</p>
                <span className="text-primary font-medium flex items-center">
                  Learn More <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-2 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default ProgramDetail
