import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { Heart, Users, GraduationCap, Activity, TreePine, Shield, Award, ArrowRight, ChevronRight, CheckCircle, Star, Quote, Target, Eye, Mail, Send, Play, PlayCircle, Calendar, MapPin, Phone, Video } from 'lucide-react'
import axios from 'axios'

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

const AnimatedCounter = ({ end, duration = 2000, suffix = '', prefix = '' }) => {
  const [count, setCount] = useState(0)
  const [isVisible, setIsVisible] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true) },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!isVisible) return
    let start = 0
    const increment = end / (duration / 16)
    const timer = setInterval(() => {
      start += increment
      if (start >= end) { setCount(end); clearInterval(timer) }
      else { setCount(Math.floor(start)) }
    }, 16)
    return () => clearInterval(timer)
  }, [isVisible, end, duration])

  return (
    <span ref={ref} className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-secondary">
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  )
}

const Home = () => {
  const [programs, setPrograms] = useState([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    fetchData()
    setLoaded(true)
  }, [])

  const fetchData = async () => {
    try {
      const response = await axios.get('/api/programs?status=active')
      setPrograms(response.data.programs?.slice(0, 4) || [])
    } catch (error) {
      setPrograms([
        { _id: '1', title: 'Education for All', description: 'Quality education for underprivileged children', category: 'Education' },
        { _id: '2', title: 'Healthcare Mission', description: 'Healthcare services for rural communities', category: 'Healthcare' },
        { _id: '3', title: 'Women Empowerment', description: 'Skill development for women', category: 'Women Empowerment' },
        { _id: '4', title: 'Green Earth', description: 'Environmental conservation', category: 'Environment' }
      ])
    }
  }

  const programIcons = { 'Education': GraduationCap, 'Healthcare': Activity, 'Women Empowerment': Users, 'Environment': TreePine }
  const programColors = { 'Education': 'from-blue-500 to-blue-600', 'Healthcare': 'from-red-500 to-red-600', 'Women Empowerment': 'from-purple-500 to-purple-600', 'Environment': 'from-emerald-500 to-emerald-600' }

  const testimonials = [
    { name: 'Priya S.', role: 'Regular Donor', text: 'Hope Foundation has completely transformed lives. I\'ve seen schools they built.', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face', rating: 5 },
    { name: 'Rajesh K.', role: 'Volunteer', text: 'As a volunteer, I\'ve seen the dedication and transparency of this organization.', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face', rating: 5 },
    { name: 'Anita M.', role: 'Beneficiary', text: 'Thanks to the healthcare program, my mother received the treatment she needed.', image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face', rating: 5 }
  ]

  const faqs = [
    { q: 'How is my donation used?', a: '100% of your donation goes directly to our programs with complete transparency.' },
    { q: 'Is my donation tax-deductible?', a: 'Yes! All donations qualify for 50% tax deduction under Section 80G.' },
    { q: 'Can I visit the projects?', a: 'Yes! We organize regular visits. Contact us to schedule.' },
    { q: 'How do I receive my certificate?', a: 'After donation, you\'ll receive automatic email with certificates.' }
  ]

  const impactStats = [
    { value: 50000, suffix: '+', label: 'Lives Impacted' },
    { value: 160, suffix: '+', label: 'Projects Done' },
    { value: 2000, suffix: '+', label: 'Volunteers' },
    { value: 10000, suffix: '+', label: 'Donors' }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-16 md:pt-20">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1920&h=1080&fit=crop" alt="Hope Foundation" className="w-full h-full object-cover object-center" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/70 to-black/90"></div>
        </div>

        <div className="relative w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 md:py-20 lg:py-28 text-center">
          <div className={`${loaded ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <p className="text-secondary font-semibold tracking-widest uppercase text-xs sm:text-sm mb-3 sm:mb-6">Hope Foundation • Since 2010</p>
            
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold text-white mb-4 sm:mb-6 md:mb-8 leading-tight">
              <span className="text-secondary">Hope</span> & <span className="text-secondary">Impact</span>
            </h1>
            
            <p className="text-gray-400 text-sm sm:text-base md:text-lg lg:text-xl max-w-2xl mx-auto mb-6 sm:mb-10 leading-relaxed px-2 sm:px-4">
              Empowering communities through education, healthcare & sustainable development.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 md:gap-6 px-4 sm:px-0">
              <Link to="/donate" className="w-full sm:w-auto min-w-[160px] sm:min-w-[180px] px-6 sm:px-8 py-3 sm:py-4 bg-secondary text-black font-bold rounded-xl hover:bg-yellow-400 transition-all flex items-center justify-center gap-2 text-sm sm:text-base">
                <Heart className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>Donate Now</span>
              </Link>
              <Link to="/programs" className="w-full sm:w-auto min-w-[160px] sm:min-w-[180px] px-6 sm:px-8 py-3 sm:py-4 border-2 border-gray-500 text-white font-bold rounded-xl hover:border-secondary hover:text-secondary transition-all text-sm sm:text-base">
                Our Programs
              </Link>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 md:gap-10 mt-10 sm:mt-16 md:mt-20 text-center px-4 sm:px-0">
              {impactStats.map((stat, i) => (
                <div key={i} className="bg-black/40 backdrop-blur-sm sm:bg-transparent sm:backdrop-blur-none rounded-xl sm:rounded-none p-3 sm:p-0 border border-gray-800 sm:border-0">
                  <p className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-white">{stat.value.toLocaleString()}{stat.suffix}</p>
                  <p className="text-gray-500 text-xs sm:text-sm mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="absolute bottom-6 sm:bottom-10 left-1/2 -translate-x-1/2 animate-bounce hidden sm:flex">
          <div className="w-6 h-10 border-2 border-gray-500 rounded-full flex justify-center pt-2">
            <div className="w-1 h-3 bg-gray-500 rounded-full"></div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 sm:py-20 md:py-32 bg-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-8 md:gap-16 items-center">
            <FadeInSection>
              <div>
                <p className="text-secondary font-medium tracking-wider uppercase text-sm mb-4">Who We Are</p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-white mb-6">A Force for Good Since 2010</h2>
                <p className="text-gray-400 leading-relaxed mb-6">
                  Hope Foundation has been at the forefront of social change, working tirelessly to transform lives across India. Our commitment to transparency, accountability, and impact-driven work has earned us the trust of thousands.
                </p>
                <p className="text-gray-400 leading-relaxed mb-8">
                  Every donation is tracked, every rupee accounted for, and every life touched is a testament to our mission of creating a more equitable world.
                </p>
                <div className="grid grid-cols-2 gap-4 sm:gap-6">
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-secondary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-secondary" />
                    </div>
                    <div>
                      <p className="font-semibold text-white text-sm sm:text-base">100% Transparent</p>
                      <p className="text-gray-500 text-xs sm:text-sm">Open books</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-secondary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                      <Award className="w-5 h-5 sm:w-6 sm:h-6 text-secondary" />
                    </div>
                    <div>
                      <p className="font-semibold text-white text-sm sm:text-base">80G Certified</p>
                      <p className="text-gray-500 text-xs sm:text-sm">Tax benefits</p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeInSection>
            <FadeInSection delay={200}>
              <div className="relative mt-8 md:mt-0">
                <img src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&h=500&fit=crop" alt="Volunteers" className="rounded-2xl w-full" />
                <div className="absolute -bottom-4 -left-4 sm:-bottom-6 sm:-left-6 bg-secondary text-black p-4 sm:p-6 rounded-xl">
                  <p className="text-2xl sm:text-3xl font-bold">14+</p>
                  <p className="text-xs sm:text-sm">Years of Impact</p>
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Impact Numbers */}
      <section className="py-16 sm:py-20 md:py-32 bg-gradient-to-b from-black to-gray-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <FadeInSection>
            <div className="text-center mb-10 sm:mb-16">
              <p className="text-secondary font-medium tracking-wider uppercase text-sm mb-4">Our Impact</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-white">Changing Lives, One at a Time</h2>
            </div>
          </FadeInSection>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {impactStats.map((stat, i) => (
              <FadeInSection key={i} delay={i * 100}>
                <div className="text-center p-4 sm:p-6 md:p-8 border border-gray-800 rounded-2xl bg-gray-900/50 hover:border-secondary/50 transition-colors">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  <p className="text-gray-400 mt-2 text-sm sm:text-base">{stat.label}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16 sm:py-20 md:py-32 bg-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <FadeInSection>
            <div className="text-center mb-10 sm:mb-16">
              <p className="text-secondary font-medium tracking-wider uppercase text-sm mb-4">Why Trust Us</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-white">The Hope Difference</h2>
            </div>
          </FadeInSection>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {[
              { icon: Shield, title: '100% Transparent', desc: 'Every rupee tracked & reported' },
              { icon: Award, title: '80G Tax Benefit', desc: '50% deduction on donations' },
              { icon: CheckCircle, title: 'Direct Impact', desc: 'Funds reach beneficiaries directly' },
              { icon: Users, title: '10,000+ Trust', desc: 'Donors believe in our mission' }
            ].map((item, i) => (
              <FadeInSection key={i} delay={i * 100}>
                <div className="text-center p-4 sm:p-6 md:p-8 border border-gray-800 rounded-2xl hover:border-secondary/50 transition-all bg-gray-900/30">
                  <item.icon className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-secondary mx-auto mb-3 sm:mb-4" />
                  <h3 className="font-bold text-white text-sm sm:text-base md:text-lg mb-1 sm:mb-2">{item.title}</h3>
                  <p className="text-gray-500 text-xs sm:text-sm">{item.desc}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 sm:py-20 md:py-32 bg-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid md:grid-cols-2 gap-6 sm:gap-8">
            <FadeInSection>
              <div className="bg-gradient-to-br from-gray-900 to-black text-white rounded-2xl p-6 sm:p-8 md:p-10 border border-gray-800 h-full">
                <Eye className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-secondary mb-4 sm:mb-6" />
                <h3 className="text-xl sm:text-2xl md:text-3xl font-heading font-bold mb-3 sm:mb-4">Our Vision</h3>
                <p className="text-gray-400 leading-relaxed text-sm sm:text-base">
                  A world where every individual has equal access to quality education, healthcare, and opportunities for growth and development.
                </p>
              </div>
            </FadeInSection>
            <FadeInSection delay={200}>
              <div className="bg-gradient-to-br from-secondary to-yellow-600 text-black rounded-2xl p-6 sm:p-8 md:p-10 h-full">
                <Target className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 mb-4 sm:mb-6" />
                <h3 className="text-xl sm:text-2xl md:text-3xl font-heading font-bold mb-3 sm:mb-4">Our Mission</h3>
                <p className="text-black/80 leading-relaxed text-sm sm:text-base">
                  To empower underprivileged communities through education, healthcare, and sustainability programs that create lasting positive change.
                </p>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="py-16 sm:py-20 md:py-32 bg-gradient-to-b from-black to-gray-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <FadeInSection>
            <div className="text-center mb-10 sm:mb-16">
              <p className="text-secondary font-medium tracking-wider uppercase text-sm mb-4">Our Work</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-white mb-4">Our Programs</h2>
              <p className="text-gray-400 max-w-xl mx-auto text-sm sm:text-base">Four key areas creating meaningful, lasting impact in communities across India.</p>
            </div>
          </FadeInSection>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {programs.map((program, i) => {
              const Icon = programIcons[program.category] || Heart
              const colorClass = programColors[program.category] || 'from-gray-500 to-gray-600'
              return (
                <FadeInSection key={program._id} delay={i * 100}>
                  <Link to={`/programs/${program.slug || program.title.toLowerCase().replace(/ /g, '-')}`} className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 hover:border-secondary/50 transition-all group">
                    <div className={`h-32 sm:h-40 bg-gradient-to-br ${colorClass} flex items-center justify-center`}>
                      <Icon className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-white/90 group-hover:scale-110 transition-transform duration-500" />
                    </div>
                    <div className="p-4 sm:p-6">
                      <span className="inline-block px-2 sm:px-3 py-1 bg-secondary/20 text-secondary text-xs rounded-full font-semibold mb-2 sm:mb-3">{program.category}</span>
                      <h3 className="font-bold text-white text-sm sm:text-lg mb-1 sm:mb-2 group-hover:text-secondary transition-colors">{program.title}</h3>
                      <p className="text-gray-500 text-xs sm:text-sm line-clamp-2 mb-3 sm:mb-4">{program.description}</p>
                      <span className="text-secondary text-xs sm:text-sm font-semibold flex items-center">
                        Learn More <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1" />
                      </span>
                    </div>
                  </Link>
                </FadeInSection>
              )
            })}
          </div>
        </div>
      </section>

      {/* Fund Allocation */}
      <section className="py-16 sm:py-20 md:py-32 bg-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <div className="grid lg:grid-cols-2 gap-8 sm:gap-16 items-center">
            <FadeInSection>
              <div>
                <p className="text-secondary font-medium tracking-wider uppercase text-sm mb-4">Your Impact</p>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-white mb-4 sm:mb-6">Where Your Money Goes</h2>
                <p className="text-gray-400 mb-6 sm:mb-8 text-sm sm:text-base">We believe in complete transparency. See exactly how your donation is making a difference.</p>
                <div className="space-y-3 sm:space-y-4">
                  {[
                    { percent: 50, label: 'Education', color: 'bg-blue-500', amount: '₹6.25L' },
                    { percent: 30, label: 'Healthcare', color: 'bg-red-500', amount: '₹3.75L' },
                    { percent: 15, label: 'Women Empowerment', color: 'bg-purple-500', amount: '₹1.88L' },
                    { percent: 5, label: 'Operations', color: 'bg-gray-500', amount: '₹0.62L' }
                  ].map((item, i) => (
                    <div key={i} className="bg-gray-900 rounded-xl p-3 sm:p-4 border border-gray-800">
                      <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                        <span className="font-semibold text-white text-sm sm:text-base">{item.label}</span>
                        <span className="text-secondary font-bold text-sm sm:text-base">{item.percent}% • {item.amount}</span>
                      </div>
                      <div className="h-2 bg-gray-800 rounded-full overflow-hidden">
                        <div className={`h-full ${item.color} rounded-full transition-all duration-1000`} style={{ width: `${item.percent}%` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
                <Link to="/transparency" className="inline-flex items-center gap-2 mt-6 sm:mt-8 text-secondary font-semibold hover:underline text-sm sm:text-base">
                  View Full Report <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </FadeInSection>
            <FadeInSection delay={200}>
              <div className="grid grid-cols-2 gap-3 sm:gap-4 mt-8 lg:mt-0">
                {[
                  { value: '₹12.5Cr+', label: 'Total Funds Raised' },
                  { value: '100%', label: 'Fund Utilization' },
                  { value: '4', label: 'Active Programs' },
                  { value: '50+', label: 'Communities Served' }
                ].map((stat, i) => (
                  <div key={i} className="bg-gray-900 rounded-2xl p-4 sm:p-6 border border-gray-800 text-center">
                    <p className="text-xl sm:text-2xl md:text-3xl font-bold text-secondary mb-1 sm:mb-2">{stat.value}</p>
                    <p className="text-gray-500 text-xs sm:text-sm">{stat.label}</p>
                  </div>
                ))}
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-16 sm:py-20 md:py-32 bg-gradient-to-b from-gray-950 to-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <FadeInSection>
            <div className="text-center mb-8 sm:mb-12">
              <p className="text-secondary font-medium tracking-wider uppercase text-sm mb-4">Our Story</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-white">See the Difference We Make</h2>
            </div>
          </FadeInSection>
          <FadeInSection delay={200}>
            <div className="relative rounded-2xl overflow-hidden border border-gray-800">
              <img src="https://images.unsplash.com/photo-1509099836639-18ba1795216d?w=1200&h=600&fit=crop" alt="Our Work" className="w-full h-48 sm:h-64 md:h-96 object-cover" />
              <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
                <button className="w-16 h-16 sm:w-20 sm:h-20 bg-secondary rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                  <PlayCircle className="w-8 h-8 sm:w-10 sm:h-10 text-black" />
                </button>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 sm:py-20 md:py-32 bg-black">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <FadeInSection>
            <div className="text-center mb-10 sm:mb-16">
              <p className="text-secondary font-medium tracking-wider uppercase text-sm mb-4">Testimonials</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-white">What Supporters Say</h2>
            </div>
          </FadeInSection>
          <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
            {testimonials.map((t, i) => (
              <FadeInSection key={i} delay={i * 100}>
                <div className="bg-gray-900 rounded-2xl p-4 sm:p-6 md:p-8 border border-gray-800 h-full relative">
                  <Quote className="w-8 h-8 sm:w-10 sm:h-10 text-secondary/20 absolute top-4 sm:top-6 right-4 sm:right-6" />
                  <div className="flex mb-3 sm:mb-4">
                    {[...Array(t.rating)].map((_, j) => <Star key={j} className="w-3 h-3 sm:w-4 sm:h-4 text-secondary fill-secondary" />)}
                  </div>
                  <p className="text-gray-400 leading-relaxed italic mb-4 sm:mb-6 text-sm sm:text-base">"{t.text}"</p>
                  <div className="flex items-center">
                    <img src={t.image} alt={t.name} className="w-10 h-10 sm:w-12 sm:h-12 rounded-full mr-3 sm:mr-4 border-2 border-secondary" />
                    <div>
                      <p className="font-bold text-white text-sm sm:text-base">{t.name}</p>
                      <p className="text-gray-500 text-xs sm:text-sm">{t.role}</p>
                    </div>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-16 sm:py-20 md:py-32 bg-gradient-to-b from-black to-gray-950">
        <div className="max-w-6xl mx-auto px-4 sm:px-6">
          <FadeInSection>
            <div className="text-center mb-10 sm:mb-16">
              <p className="text-secondary font-medium tracking-wider uppercase text-sm mb-4">Upcoming Events</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-white">Join Our Events</h2>
            </div>
          </FadeInSection>
          <div className="grid md:grid-cols-3 gap-4 sm:gap-6">
            {[
              { title: 'Annual Charity Gala', date: 'March 25, 2026', location: 'Mumbai', image: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=400&h=300&fit=crop' },
              { title: 'Education Drive', date: 'April 10, 2026', location: 'Pune', image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&h=300&fit=crop' },
              { title: 'Health Camp', date: 'April 20, 2026', location: 'Ahmedabad', image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop' }
            ].map((event, i) => (
              <FadeInSection key={i} delay={i * 100}>
                <div className="bg-gray-900 rounded-2xl overflow-hidden border border-gray-800 group hover:border-secondary/50 transition-all">
                  <div className="relative h-32 sm:h-40 md:h-48 overflow-hidden">
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <div className="absolute top-2 sm:top-4 left-2 sm:left-4 bg-secondary text-black px-2 sm:px-3 py-1 rounded-full text-xs sm:text-sm font-semibold">
                      <Calendar className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1" /> {event.date}
                    </div>
                  </div>
                  <div className="p-4 sm:p-6">
                    <h3 className="font-bold text-white text-sm sm:text-lg mb-1 sm:mb-2">{event.title}</h3>
                    <p className="text-gray-500 flex items-center text-xs sm:text-sm">
                      <MapPin className="w-3 h-3 sm:w-4 sm:h-4 mr-1" /> {event.location}
                    </p>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Donate */}
      <section className="py-16 sm:py-20 md:py-32 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <FadeInSection>
            <div className="bg-gray-900 rounded-3xl border border-gray-800 overflow-hidden">
              <div className="bg-gradient-to-r from-gray-900 to-black p-6 sm:p-8 md:p-10 text-center border-b border-gray-800">
                <Heart className="w-10 h-10 sm:w-12 sm:h-12 text-secondary mx-auto mb-4" />
                <h3 className="text-xl sm:text-2xl font-heading font-bold text-white">Make a Difference Today</h3>
                <p className="text-gray-500 mt-2 text-sm sm:text-base">Select an amount to donate</p>
              </div>
              <div className="p-4 sm:p-6 md:p-10">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mb-6 sm:mb-8">
                  {[500, 1000, 2500, 5000].map((amount) => (
                    <Link key={amount} to={`/donate?amount=${amount}`} className="py-3 sm:py-4 px-4 sm:px-6 border-2 border-secondary text-secondary rounded-xl font-bold text-center hover:bg-secondary hover:text-black transition-all text-sm sm:text-base">
                      ₹{amount}
                    </Link>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 sm:p-6 bg-black rounded-xl border border-gray-800">
                  <p className="text-gray-400 text-sm sm:text-base">Or enter a custom amount</p>
                  <Link to="/donate" className="px-6 sm:px-8 py-3 sm:py-4 bg-secondary text-black font-semibold rounded-xl hover:bg-yellow-400 transition-all text-sm sm:text-base">
                    Donate Now
                  </Link>
                </div>
                <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-4 sm:gap-6 text-gray-500 text-xs sm:text-sm">
                  <span className="flex items-center"><Shield className="w-4 h-4 mr-2 text-green-500" />Secure Payment</span>
                  <span className="flex items-center"><Award className="w-4 h-4 mr-2 text-secondary" />80G Benefit</span>
                  <span className="flex items-center"><CheckCircle className="w-4 h-4 mr-2 text-secondary" />Instant Receipt</span>
                </div>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 sm:py-20 md:py-32 bg-gradient-to-b from-black to-gray-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <FadeInSection>
            <div className="text-center mb-10 sm:mb-16">
              <p className="text-secondary font-medium tracking-wider uppercase text-sm mb-4">FAQs</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-white">Frequently Asked Questions</h2>
            </div>
          </FadeInSection>
          <div className="space-y-3 sm:space-y-4">
            {faqs.map((faq, i) => (
              <FadeInSection key={i} delay={i * 50}>
                <details className="bg-gray-900 rounded-xl border border-gray-800 group">
                  <summary className="p-4 sm:p-6 cursor-pointer flex items-center justify-between font-bold text-white hover:text-secondary transition-colors text-sm sm:text-base">
                    {faq.q}
                    <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-secondary flex-shrink-0 group-open:rotate-90 transition-transform" />
                  </summary>
                  <div className="px-4 sm:px-6 pb-4 sm:pb-6 text-gray-400 leading-relaxed border-t border-gray-800 pt-3 sm:pt-4 text-sm sm:text-base">
                    {faq.a}
                  </div>
                </details>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 sm:py-20 md:py-32 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <FadeInSection>
            <Mail className="w-12 h-12 sm:w-16 sm:h-16 text-secondary mx-auto mb-4 sm:mb-6" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-white mb-3 sm:mb-4">Stay Updated</h2>
            <p className="text-gray-400 mb-6 sm:mb-8 max-w-xl mx-auto text-sm sm:text-base">Subscribe to receive latest updates on our programs and impact stories.</p>
            <form className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-lg mx-auto">
              <input type="email" placeholder="Enter your email" className="flex-1 px-4 sm:px-6 py-3 sm:py-4 bg-gray-900 border border-gray-800 rounded-xl text-white focus:border-secondary focus:outline-none text-sm sm:text-base" />
              <button type="submit" className="px-6 sm:px-8 py-3 sm:py-4 bg-secondary text-black font-semibold rounded-xl hover:bg-yellow-400 transition-all flex items-center justify-center gap-2 text-sm sm:text-base">
                <Send className="w-4 h-4" /> Subscribe
              </button>
            </form>
          </FadeInSection>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20 md:py-32 bg-gradient-to-b from-gray-950 to-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <FadeInSection>
            <Heart className="w-12 h-12 sm:w-16 sm:h-16 text-secondary mx-auto mb-4 sm:mb-6" />
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-heading font-bold text-white mb-3 sm:mb-4">Ready to Make a Difference?</h2>
            <p className="text-gray-400 mb-8 sm:mb-10 max-w-2xl mx-auto text-sm sm:text-base md:text-lg">Join us in our mission to transform lives and build a better tomorrow.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <Link to="/donate" className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-secondary text-black font-semibold rounded-xl hover:bg-yellow-400 transition-all flex items-center justify-center gap-2 text-sm sm:text-base">
                <Heart className="w-5 h-5" /> Donate Now
              </Link>
              <Link to="/contact" className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 border-2 border-gray-700 text-white font-semibold rounded-xl hover:border-secondary hover:text-secondary transition-all text-sm sm:text-base">
                Contact Us
              </Link>
            </div>
          </FadeInSection>
        </div>
      </section>
    </div>
  )
}

export default Home
