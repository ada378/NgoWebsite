import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { Heart, Users, GraduationCap, Activity, TreePine, Shield, Award, ArrowRight, ChevronRight, CheckCircle, Star, Quote, Target, Eye, Mail, Send, Play, PlayCircle, Calendar, MapPin, Phone, Video, Sparkles, Globe, TrendingUp } from 'lucide-react'
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
      { threshold: 0.3 }
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
    <span ref={ref} className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-secondary to-yellow-400 bg-clip-text text-transparent">
      {prefix}{count.toLocaleString()}{suffix}
    </span>
  )
}

const Home = () => {
  const [programs, setPrograms] = useState([])
  const [loaded, setLoaded] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)

  const heroSlides = [
    {
      image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1920&h=1080&fit=crop',
      title: 'Creating Lasting Change',
      subtitle: 'Empowering communities through education, healthcare & sustainable development'
    },
    {
      image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1920&h=1080&fit=crop',
      title: 'Education for Every Child',
      subtitle: 'Building schools and providing scholarships to underprivileged children'
    },
    {
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1920&h=1080&fit=crop',
      title: 'Healthcare for All',
      subtitle: 'Extending quality healthcare services to rural communities'
    },
    {
      image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?w=1920&h=1080&fit=crop',
      title: 'Empowering Women',
      subtitle: 'Creating self-reliant communities through skill development'
    }
  ]

  useEffect(() => {
    fetchData()
    setLoaded(true)
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(interval)
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
  const programColors = { 'Education': 'from-blue-600 to-blue-700', 'Healthcare': 'from-red-600 to-red-700', 'Women Empowerment': 'from-purple-600 to-purple-700', 'Environment': 'from-emerald-600 to-emerald-700' }

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
    <div className="min-h-screen overflow-hidden">
      {/* Premium Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1920&h=1080&fit=crop" alt="Hope Foundation" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 via-black/85 to-black"></div>
        </div>
        
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 text-center">
          <div className={`${loaded ? 'animate-fade-in-up' : 'opacity-0'}`}>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 mb-6">
              <Sparkles className="w-4 h-4 text-secondary" />
              <span className="text-secondary font-medium text-sm">Hope Foundation • Since 2010</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold text-white mb-6 leading-tight">
              <span className="bg-gradient-to-r from-secondary via-yellow-400 to-secondary bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                Creating
              </span>
              <br />
              <span className="text-white">Lasting </span>
              <span className="bg-gradient-to-r from-secondary via-yellow-400 to-secondary bg-clip-text text-transparent">Change</span>
            </h1>
            
            <p className="text-gray-400 text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto mb-10 leading-relaxed px-4">
              Empowering communities through education, healthcare & sustainable development. 
              <span className="text-secondary font-medium"> Every donation creates ripples of positive change.</span>
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6 px-4">
              <Link to="/donate" className="group relative w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-secondary to-yellow-500 text-black font-bold text-lg rounded-xl overflow-hidden shadow-lg shadow-secondary/30 hover:shadow-secondary/50 transition-all duration-300 hover:-translate-y-1">
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <span className="relative flex items-center justify-center gap-3">
                  <Heart className="w-5 h-5" />
                  Donate Now
                </span>
              </Link>
              <Link to="/programs" className="group w-full sm:w-auto px-8 py-4 bg-white/5 backdrop-blur-xl border border-white/20 text-white font-semibold text-lg rounded-xl hover:bg-white/10 hover:border-secondary/50 transition-all duration-300 flex items-center justify-center gap-3 hover:-translate-y-1">
                <Globe className="w-5 h-5" />
                Explore Programs
              </Link>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mt-16 md:mt-24 px-4">
              {impactStats.map((stat, i) => (
                <div key={i} className="group relative p-6 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 hover:border-secondary/30 transition-all duration-500 hover:-translate-y-2">
                  <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
                  <div className="relative">
                    <p className="text-3xl sm:text-4xl md:text-5xl font-display font-bold text-gradient mb-2">{stat.value.toLocaleString()}{stat.suffix}</p>
                    <p className="text-gray-400 text-sm md:text-base">{stat.label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>


      </section>

      {/* About Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-black via-gray-950 to-black relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <FadeInSection>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-secondary/20 to-transparent rounded-3xl blur-2xl opacity-50" />
                <img src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=800&h=600&fit=crop" alt="Volunteers" className="relative rounded-2xl w-full shadow-2xl" />
                <div className="absolute -bottom-6 -right-6 md:-bottom-8 md:-right-8 bg-gradient-to-br from-secondary to-yellow-500 text-black p-6 md:p-8 rounded-2xl shadow-2xl shadow-secondary/30">
                  <p className="text-3xl md:text-4xl font-display font-bold">14+</p>
                  <p className="text-sm font-medium">Years of Impact</p>
                </div>
              </div>
            </FadeInSection>
            <FadeInSection delay={200}>
              <div>
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 rounded-full text-secondary text-sm font-semibold mb-6">
                  <Award className="w-4 h-4" />
                  About Us
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-6">
                  A Force for Good
                  <span className="block text-gradient">Since 2010</span>
                </h2>
                <p className="text-gray-400 leading-relaxed mb-6 text-lg">
                  Hope Foundation has been at the forefront of social change, working tirelessly to transform lives across India. Our commitment to transparency, accountability, and impact-driven work has earned us the trust of thousands.
                </p>
                <p className="text-gray-400 leading-relaxed mb-8">
                  Every donation is tracked, every rupee accounted for, and every life touched is a testament to our mission of creating a more equitable world.
                </p>
                <div className="grid grid-cols-2 gap-6">
                  <div className="group p-4 bg-white/5 rounded-xl border border-white/10 hover:border-secondary/30 transition-all">
                    <div className="w-12 h-12 bg-secondary/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Shield className="w-6 h-6 text-secondary" />
                    </div>
                    <p className="font-semibold text-white mb-1">100% Transparent</p>
                    <p className="text-gray-500 text-sm">Open books policy</p>
                  </div>
                  <div className="group p-4 bg-white/5 rounded-xl border border-white/10 hover:border-secondary/30 transition-all">
                    <div className="w-12 h-12 bg-secondary/20 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                      <Award className="w-6 h-6 text-secondary" />
                    </div>
                    <p className="font-semibold text-white mb-1">80G Certified</p>
                    <p className="text-gray-500 text-sm">Tax benefits</p>
                  </div>
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-20 md:py-32 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/5 via-transparent to-secondary/5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <FadeInSection>
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 rounded-full text-secondary text-sm font-semibold mb-4">
                <TrendingUp className="w-4 h-4" />
                Our Impact
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white">Changing Lives Together</h2>
            </div>
          </FadeInSection>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {impactStats.map((stat, i) => (
              <FadeInSection key={i} delay={i * 100}>
                <div className="text-center p-8 bg-gradient-to-br from-white/5 to-transparent rounded-2xl border border-white/10 hover:border-secondary/30 transition-all duration-500 group hover:-translate-y-2">
                  <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                  <p className="text-gray-400 mt-3 text-lg">{stat.label}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Programs */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-black to-gray-950 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-3xl" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <FadeInSection>
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 rounded-full text-secondary text-sm font-semibold mb-4">
                <Heart className="w-4 h-4" />
                Our Programs
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-4">Four Pillars of Change</h2>
              <p className="text-gray-400 max-w-2xl mx-auto text-lg">Four key areas creating meaningful, lasting impact in communities across India.</p>
            </div>
          </FadeInSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {programs.map((program, i) => {
              const Icon = programIcons[program.category] || Heart
              const colorClass = programColors[program.category] || 'from-gray-500 to-gray-600'
              return (
                <FadeInSection key={program._id} delay={i * 100}>
                  <Link to={`/programs/${program.slug || program.title.toLowerCase().replace(/ /g, '-')}`} className="group block bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden border border-white/10 hover:border-secondary/30 transition-all duration-500 hover:-translate-y-2 shadow-xl">
                    <div className={`h-40 md:h-48 bg-gradient-to-br ${colorClass} flex items-center justify-center relative overflow-hidden`}>
                      <Icon className="w-20 h-20 text-white/90 group-hover:scale-110 transition-transform duration-500" />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                    </div>
                    <div className="p-6">
                      <span className="inline-block px-3 py-1 bg-secondary/20 text-secondary text-xs rounded-full font-bold mb-3">{program.category}</span>
                      <h3 className="font-bold text-xl text-white mb-2 group-hover:text-secondary transition-colors">{program.title}</h3>
                      <p className="text-gray-500 text-sm line-clamp-2 mb-4">{program.description}</p>
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

      {/* Mission & Vision */}
      <section className="py-20 md:py-32 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            <FadeInSection>
              <div className="group h-full bg-gradient-to-br from-gray-900 via-gray-900 to-black p-8 md:p-10 rounded-3xl border border-white/10 hover:border-secondary/30 transition-all duration-500 hover:-translate-y-2">
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-secondary/20 transition-colors">
                  <Eye className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-4">Our Vision</h3>
                <p className="text-gray-400 leading-relaxed text-lg">
                  A world where every individual has equal access to quality education, healthcare, and opportunities for growth and development.
                </p>
              </div>
            </FadeInSection>
            <FadeInSection delay={200}>
              <div className="group h-full bg-gradient-to-br from-secondary to-yellow-600 p-8 md:p-10 rounded-3xl shadow-lg shadow-secondary/20 hover:shadow-secondary/40 transition-all duration-500 hover:-translate-y-2">
                <div className="w-16 h-16 bg-black/20 rounded-2xl flex items-center justify-center mb-6">
                  <Target className="w-8 h-8 text-black" />
                </div>
                <h3 className="text-2xl md:text-3xl font-display font-bold text-black mb-4">Our Mission</h3>
                <p className="text-black/80 leading-relaxed text-lg">
                  To empower underprivileged communities through education, healthcare, and sustainability programs that create lasting positive change.
                </p>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-gray-950 to-black relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <FadeInSection>
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 rounded-full text-secondary text-sm font-semibold mb-4">
                <Star className="w-4 h-4" />
                Testimonials
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white">What People Say</h2>
            </div>
          </FadeInSection>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {testimonials.map((t, i) => (
              <FadeInSection key={i} delay={i * 100}>
                <div className="relative p-8 bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-white/10 hover:border-secondary/30 transition-all duration-500 group">
                  <Quote className="w-12 h-12 text-secondary/20 absolute top-6 right-6" />
                  <div className="flex mb-4">
                    {[...Array(t.rating)].map((_, j) => <Star key={j} className="w-5 h-5 text-secondary fill-secondary" />)}
                  </div>
                  <p className="text-gray-300 leading-relaxed italic mb-6 text-lg">"{t.text}"</p>
                  <div className="flex items-center gap-4">
                    <img src={t.image} alt={t.name} className="w-14 h-14 rounded-full border-2 border-secondary p-0.5" />
                    <div>
                      <p className="font-bold text-white">{t.name}</p>
                      <p className="text-secondary text-sm">{t.role}</p>
                    </div>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Video/Impact Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-black to-gray-950 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <FadeInSection>
              <div>
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 rounded-full text-secondary text-sm font-semibold mb-6">
                  <Video className="w-4 h-4" />
                  Our Story
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-6">
                  See the <span className="text-gradient">Change</span> We Create
                </h2>
                <p className="text-gray-400 leading-relaxed mb-8 text-lg">
                  Watch how Hope Foundation transforms communities across India. From building schools in remote villages to providing healthcare to those who need it most, every moment captured tells a story of hope and resilience.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                    <p className="text-2xl font-bold text-secondary mb-1">500+</p>
                    <p className="text-gray-400 text-sm">Schools Built</p>
                  </div>
                  <div className="p-4 bg-white/5 rounded-xl border border-white/10">
                    <p className="text-2xl font-bold text-secondary mb-1">100K+</p>
                    <p className="text-gray-400 text-sm">Lives Transformed</p>
                  </div>
                </div>
              </div>
            </FadeInSection>
            <FadeInSection delay={200}>
              <div className="relative group">
                <div className="absolute -inset-4 bg-gradient-to-r from-secondary/20 to-yellow-500/20 rounded-3xl blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
                <div className="relative aspect-video bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl overflow-hidden border border-white/10 cursor-pointer group">
                  <img src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&h=450&fit=crop" alt="Impact Video" className="w-full h-full object-cover opacity-60" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center shadow-lg shadow-secondary/30 group-hover:scale-110 transition-transform">
                      <PlayCircle className="w-10 h-10 text-black fill-black ml-1" />
                    </div>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <p className="text-white font-semibold text-lg">Watch Our Impact Video</p>
                    <p className="text-gray-300 text-sm">3:45 • 50K views</p>
                  </div>
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="py-20 md:py-32 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <FadeInSection>
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 rounded-full text-secondary text-sm font-semibold mb-4">
                <Calendar className="w-4 h-4" />
                Upcoming Events
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-4">Join Our Mission</h2>
              <p className="text-gray-400 max-w-2xl mx-auto text-lg">Participate in our upcoming events and be part of something meaningful.</p>
            </div>
          </FadeInSection>
          <div className="grid md:grid-cols-3 gap-6 md:gap-8">
            {[
              { title: 'Annual Charity Gala', date: 'March 25, 2026', location: 'Mumbai, India', image: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=400&h=300&fit=crop', raised: 2500000, goal: 5000000 },
              { title: 'Education Drive', date: 'April 10, 2026', location: 'Delhi NCR', image: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=400&h=300&fit=crop', raised: 1800000, goal: 3000000 },
              { title: 'Health Camp', date: 'April 22, 2026', location: 'Rural Rajasthan', image: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=400&h=300&fit=crop', raised: 900000, goal: 2000000 }
            ].map((event, i) => (
              <FadeInSection key={i} delay={i * 100}>
                <div className="group bg-gradient-to-br from-gray-900 to-black rounded-2xl overflow-hidden border border-white/10 hover:border-secondary/30 transition-all duration-500 hover:-translate-y-2">
                  <div className="relative h-48 overflow-hidden">
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                    <div className="absolute top-4 left-4 px-3 py-1 bg-secondary text-black text-xs font-bold rounded-full">
                      UPCOMING
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="font-bold text-xl text-white mb-3 group-hover:text-secondary transition-colors">{event.title}</h3>
                    <div className="flex items-center gap-4 text-gray-400 text-sm mb-4">
                      <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {event.date}</span>
                      <span className="flex items-center gap-1"><MapPin className="w-4 h-4" /> {event.location}</span>
                    </div>
                    <div className="w-full bg-gray-800 rounded-full h-2 mb-2">
                      <div className="bg-gradient-to-r from-secondary to-yellow-500 h-2 rounded-full" style={{ width: `${(event.raised / event.goal) * 100}%` }} />
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-secondary font-semibold">₹{(event.raised / 100000).toFixed(1)}L raised</span>
                      <span className="text-gray-500">Goal: ₹{(event.goal / 100000).toFixed(1)}L</span>
                    </div>
                  </div>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Donate Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-gray-950 to-black relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-secondary/5 rounded-full blur-3xl" />
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <FadeInSection>
            <div className="text-center mb-12">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 rounded-full text-secondary text-sm font-semibold mb-4">
                <Heart className="w-4 h-4" />
                Quick Donate
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-4">Make an Instant Impact</h2>
              <p className="text-gray-400 max-w-2xl mx-auto text-lg">Choose an amount that works for you. Every rupee counts.</p>
            </div>
          </FadeInSection>
          <FadeInSection delay={100}>
            <div className="bg-gradient-to-br from-gray-900 to-black p-8 md:p-12 rounded-3xl border border-white/10 shadow-2xl">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                {[500, 1000, 2500, 5000].map((amount) => (
                  <button key={amount} className="group relative p-4 bg-white/5 rounded-xl border border-white/20 hover:border-secondary/50 hover:bg-secondary/10 transition-all duration-300">
                    <span className="text-2xl font-bold text-white">₹{amount}</span>
                    <span className="block text-xs text-gray-400 mt-1">Impact amount</span>
                  </button>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 relative">
                  <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-semibold">₹</span>
                  <input type="number" placeholder="Custom amount" className="w-full pl-10 pr-4 py-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:border-secondary focus:outline-none transition-colors" />
                </div>
                <Link to="/donate" className="group relative px-8 py-4 bg-gradient-to-r from-secondary to-yellow-500 text-black font-bold text-lg rounded-xl overflow-hidden shadow-lg shadow-secondary/30 hover:shadow-secondary/50 transition-all duration-300 flex items-center justify-center gap-3 hover:-translate-y-1">
                  <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                  <span className="relative flex items-center gap-3">
                    <Heart className="w-5 h-5" />
                    Donate Now
                  </span>
                </Link>
              </div>
              <p className="text-gray-500 text-sm text-center mt-6">100% tax deductible under Section 80G • Instant 80G certificate</p>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 md:py-32 bg-black relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 rounded-full text-secondary text-sm font-semibold mb-4">
                <Shield className="w-4 h-4" />
                FAQs
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-4">Common Questions</h2>
              <p className="text-gray-400 max-w-2xl mx-auto text-lg">Everything you need to know about donating and our work.</p>
            </div>
          </FadeInSection>
          <div className="space-y-4">
            {faqs.map((faq, i) => (
              <FadeInSection key={i} delay={i * 100}>
                <details className="group bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-white/10 overflow-hidden">
                  <summary className="flex items-center justify-between p-6 cursor-pointer list-none hover:bg-white/5 transition-colors">
                    <span className="font-semibold text-lg text-white pr-4">{faq.q}</span>
                    <ChevronRight className="w-5 h-5 text-secondary flex-shrink-0 group-open:rotate-90 transition-transform" />
                  </summary>
                  <div className="px-6 pb-6">
                    <p className="text-gray-400 leading-relaxed">{faq.a}</p>
                  </div>
                </details>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-gray-950 to-black relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="text-center p-12 bg-gradient-to-br from-gray-900 via-gray-900 to-black rounded-3xl border border-white/10 relative overflow-hidden">
              <div className="absolute inset-0 bg-grid opacity-20" />
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-3xl" />
              <div className="relative">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary/20 rounded-full mb-6">
                  <Mail className="w-8 h-8 text-secondary" />
                </div>
                <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">Stay Connected</h2>
                <p className="text-gray-400 max-w-xl mx-auto mb-8 text-lg">Get updates on our impact, stories of change, and ways to get involved. No spam, we promise.</p>
                <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto" onSubmit={(e) => e.preventDefault()}>
                  <div className="flex-1 relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                    <input type="email" placeholder="Enter your email" className="w-full pl-12 pr-4 py-4 bg-white/5 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:border-secondary focus:outline-none transition-colors" />
                  </div>
                  <button type="submit" className="px-8 py-4 bg-secondary hover:bg-yellow-400 text-black font-bold rounded-xl transition-colors flex items-center justify-center gap-2">
                    <Send className="w-5 h-5" />
                    Subscribe
                  </button>
                </form>
                <p className="text-gray-600 text-sm mt-6">Join 10,000+ supporters receiving our newsletter</p>
              </div>
            </div>
          </FadeInSection>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-black relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-secondary/10 rounded-full blur-3xl" />
        </div>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <FadeInSection>
            <div className="inline-flex items-center justify-center w-20 h-20 bg-secondary/20 rounded-full mb-8">
              <Heart className="w-10 h-10 text-secondary" />
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-6">Ready to Make a Difference?</h2>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10">Join us in our mission to transform lives and build a better tomorrow. Every contribution counts.</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/donate" className="group relative w-full sm:w-auto px-10 py-4 bg-gradient-to-r from-secondary to-yellow-500 text-black font-bold text-lg rounded-xl overflow-hidden shadow-lg shadow-secondary/30 hover:shadow-secondary/50 transition-all duration-300 hover:-translate-y-1">
                <span className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
                <span className="relative flex items-center justify-center gap-3">
                  <Heart className="w-5 h-5" />
                  Donate Now
                </span>
              </Link>
              <Link to="/contact" className="w-full sm:w-auto px-10 py-4 bg-white/5 backdrop-blur-xl border border-white/20 text-white font-semibold text-lg rounded-xl hover:bg-white/10 hover:border-secondary/50 transition-all duration-300">
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
