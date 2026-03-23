import { Link } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { Heart, Target, Eye, Users, Award, Building, Globe, Shield, CheckCircle, ArrowRight, ChevronRight } from 'lucide-react'

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

const About = () => {
  const team = [
    { name: 'Dr. Rajesh Kumar', role: 'Founder & Chairman', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face' },
    { name: 'Priya Sharma', role: 'Secretary', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop&crop=face' },
    { name: 'Amit Patel', role: 'Treasurer', image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face' },
    { name: 'Dr. Sunita Rao', role: 'Medical Director', image: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=200&h=200&fit=crop&crop=face' }
  ]

  const milestones = [
    { year: '2010', title: 'Foundation Established', description: 'Hope Foundation was registered as a non-profit organization.' },
    { year: '2013', title: 'First School', description: 'Opened our first school in rural Maharashtra.' },
    { year: '2016', title: 'Healthcare Initiative', description: 'Launched mobile health clinics reaching 50+ villages.' },
    { year: '2019', title: 'Women Empowerment', description: 'Started skill development programs for women.' },
    { year: '2022', title: 'Environmental Focus', description: 'Planting 1 million trees across India.' },
    { year: '2024', title: '50,000 Lives Impacted', description: 'Reached a major milestone in our journey.' }
  ]

  const values = [
    { icon: Heart, title: 'Compassion', description: 'Every action is driven by empathy and care for those we serve.' },
    { icon: Shield, title: 'Integrity', description: 'We maintain the highest ethical standards in all our operations.' },
    { icon: Globe, title: 'Impact', description: 'We focus on creating measurable, sustainable change.' },
    { icon: Users, title: 'Inclusivity', description: 'We serve everyone regardless of background or circumstance.' }
  ]

  const stats = [
    { label: 'Lives Impacted', value: '50,000+' },
    { label: 'Projects Completed', value: '160+' },
    { label: 'Years of Service', value: '14+' },
    { label: 'Communities Served', value: '50+' }
  ]

  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1920&h=600&fit=crop" alt="About" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black" />
        </div>
        
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-blue-500/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 text-center">
          <FadeInSection>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 backdrop-blur-xl rounded-full border border-white/10 mb-6">
              <Award className="w-4 h-4 text-secondary" />
              <span className="text-secondary font-medium text-sm">Hope Foundation • Since 2010</span>
            </div>
            
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-display font-bold text-white mb-6 leading-tight">
              Our Story of<br />
              <span className="bg-gradient-to-r from-secondary via-yellow-400 to-secondary bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">Hope & Impact</span>
            </h1>
            
            <p className="text-gray-400 text-lg sm:text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed px-4">
              For over 14 years, Hope Foundation has been dedicated to transforming lives through 
              education, healthcare, and sustainable community development.
            </p>
          </FadeInSection>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-black via-gray-950 to-black relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <FadeInSection>
              <div>
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 rounded-full text-secondary text-sm font-semibold mb-6">
                  <Heart className="w-4 h-4" />
                  Our Story
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-6">
                  Building a Better <span className="text-gradient">Tomorrow</span>
                </h2>
                <p className="text-gray-400 leading-relaxed mb-6 text-lg">
                  Hope Foundation was established in 2010 with a simple yet powerful vision: to create 
                  a world where every individual has access to opportunities for growth and development.
                </p>
                <p className="text-gray-400 leading-relaxed mb-6">
                  What started as a small initiative to provide education to underprivileged children 
                  in rural Maharashtra has grown into a comprehensive organization working across 
                  education, healthcare, women empowerment, and environmental conservation.
                </p>
                <p className="text-gray-400 leading-relaxed mb-8">
                  Today, we are proud to have impacted over 50,000 lives across 50+ communities, 
                  with a dedicated team of 2,000+ volunteers and partnerships with government agencies, 
                  corporations, and international organizations.
                </p>
                <div className="grid grid-cols-2 gap-4">
                  {stats.map((stat, i) => (
                    <div key={i} className="group p-4 bg-white/5 rounded-xl border border-white/10 hover:border-secondary/30 transition-all">
                      <p className="text-2xl font-bold text-secondary mb-1">{stat.value}</p>
                      <p className="text-gray-500 text-sm">{stat.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </FadeInSection>
            <FadeInSection delay={200}>
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-secondary/20 to-transparent rounded-3xl blur-2xl opacity-50" />
                <img src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&h=700&fit=crop" alt="Hope Foundation team" className="relative rounded-2xl w-full shadow-2xl" />
                <div className="absolute -bottom-6 -right-6 md:-bottom-8 md:-right-8 bg-gradient-to-br from-secondary to-yellow-500 text-black p-6 md:p-8 rounded-2xl shadow-2xl shadow-secondary/30">
                  <p className="text-3xl md:text-4xl font-display font-bold">14+</p>
                  <p className="text-sm font-medium">Years of Impact</p>
                </div>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 md:py-32 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/5 via-transparent to-secondary/5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <FadeInSection>
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 rounded-full text-secondary text-sm font-semibold mb-4">
                <Shield className="w-4 h-4" />
                Our Values
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white">Core Values</h2>
            </div>
          </FadeInSection>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {values.map((value, index) => (
              <FadeInSection key={index} delay={index * 100}>
                <div className="group p-8 bg-gradient-to-br from-gray-900 to-black rounded-2xl border border-white/10 hover:border-secondary/30 transition-all duration-500 hover:-translate-y-2 text-center">
                  <div className="w-16 h-16 bg-secondary/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                    <value.icon className="w-8 h-8 text-secondary" />
                  </div>
                  <h3 className="font-bold text-xl mb-2 text-white">{value.title}</h3>
                  <p className="text-gray-500">{value.description}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-gray-950 to-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            <FadeInSection>
              <div className="group h-full bg-gradient-to-br from-gray-900 via-gray-900 to-black p-8 md:p-10 rounded-3xl border border-white/10 hover:border-secondary/30 transition-all duration-500 hover:-translate-y-2">
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-secondary/20 transition-colors">
                  <Eye className="w-8 h-8 text-secondary" />
                </div>
                <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-4">Our Vision</h3>
                <p className="text-gray-400 leading-relaxed text-lg">
                  A world where every individual has equal access to quality education, healthcare, 
                  and opportunities for growth, regardless of their socioeconomic background.
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
                  To empower underprivileged communities through comprehensive programs in education, 
                  healthcare, women empowerment, and environmental sustainability.
                </p>
              </div>
            </FadeInSection>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 md:py-32 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <FadeInSection>
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 rounded-full text-secondary text-sm font-semibold mb-4">
                <Award className="w-4 h-4" />
                Timeline
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white">Our Journey</h2>
            </div>
          </FadeInSection>

          <div className="relative">
            <div className="absolute left-4 sm:left-1/2 transform sm:-translate-x-1/2 h-full w-0.5 sm:w-1 bg-gradient-to-b from-secondary to-yellow-500"></div>
            
            <div className="space-y-6 sm:space-y-12">
              {milestones.map((milestone, index) => (
                <div key={index} className={`relative flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`hidden sm:block w-5/12 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <FadeInSection delay={index * 100}>
                      <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 border border-white/10 hover:border-secondary/30 transition-all inline-block">
                        <span className="inline-block px-3 py-1 bg-secondary/20 text-secondary text-sm font-bold rounded-full mb-2">
                          {milestone.year}
                        </span>
                        <h3 className="font-bold text-xl mb-2 text-white">{milestone.title}</h3>
                        <p className="text-gray-500">{milestone.description}</p>
                      </div>
                    </FadeInSection>
                  </div>
                  
                  <div className="sm:hidden flex items-start pl-12">
                    <FadeInSection delay={index * 100}>
                      <div className="bg-gradient-to-br from-gray-900 to-black rounded-xl p-4 border border-white/10 flex-1">
                        <span className="inline-block px-2 py-0.5 bg-secondary/20 text-secondary text-xs font-bold rounded-full mb-1">
                          {milestone.year}
                        </span>
                        <h3 className="font-bold text-white mb-1">{milestone.title}</h3>
                        <p className="text-gray-500 text-sm">{milestone.description}</p>
                      </div>
                    </FadeInSection>
                  </div>
                  
                  <div className="absolute left-4 sm:left-1/2 transform sm:-translate-x-1/2 w-4 h-4 sm:w-6 sm:h-6 bg-secondary rounded-full border-4 border-black shadow-lg shadow-secondary/30"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-gray-950 to-black relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection>
            <div className="text-center mb-16">
              <span className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 rounded-full text-secondary text-sm font-semibold mb-4">
                <Users className="w-4 h-4" />
                Our Team
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white">Meet Our Team</h2>
            </div>
          </FadeInSection>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {team.map((member, index) => (
              <FadeInSection key={index} delay={index * 100}>
                <div className="group bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 text-center border border-white/10 hover:border-secondary/30 transition-all duration-500 hover:-translate-y-2">
                  <div className="relative w-28 h-28 mx-auto mb-4">
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover rounded-full border-2 border-secondary p-0.5 group-hover:scale-110 transition-transform" />
                  </div>
                  <h3 className="font-bold text-lg mb-1 text-white">{member.name}</h3>
                  <p className="text-secondary font-medium text-sm">{member.role}</p>
                </div>
              </FadeInSection>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance */}
      <section className="py-20 md:py-32 bg-black relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-secondary/5 via-transparent to-secondary/5" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <FadeInSection>
              <div>
                <span className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/10 rounded-full text-secondary text-sm font-semibold mb-6">
                  <Shield className="w-4 h-4" />
                  Compliance
                </span>
                <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-6">
                  Legal & <span className="text-gradient">Compliance</span>
                </h2>
                <p className="text-gray-400 leading-relaxed mb-8 text-lg">
                  We maintain the highest standards of transparency and compliance. Our registration 
                  and certifications ensure that your donation is in safe hands.
                </p>

                <div className="space-y-4">
                  {[
                    { icon: Building, title: 'NGO Registration', value: 'NGO-MH-2024-001234' },
                    { icon: Shield, title: 'PAN Number', value: 'AABTH1234B' },
                    { icon: Award, title: '80G Certificate', value: 'Valid until March 2027' },
                    { icon: Globe, title: 'FCRA Registration', value: '123456789' }
                  ].map((item, index) => (
                    <div key={index} className="flex items-center space-x-4 bg-white/5 rounded-xl p-4 border border-white/10 hover:border-secondary/30 transition-all">
                      <item.icon className="w-8 h-8 text-secondary flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-white">{item.title}</p>
                        <p className="text-gray-500 text-sm">{item.value}</p>
                      </div>
                      <CheckCircle className="w-6 h-6 text-green-500 flex-shrink-0" />
                    </div>
                  ))}
                </div>
              </div>
            </FadeInSection>
            <FadeInSection delay={200}>
              <div className="grid grid-cols-2 gap-4 md:gap-6">
                {[
                  { icon: Award, title: '4-Star NGO', desc: 'Credibility Alliance' },
                  { icon: Shield, title: 'ISO 9001:2015', desc: 'Quality Certified' },
                  { icon: CheckCircle, title: 'Tax Exempt', desc: '80G & 12A' },
                  { icon: Globe, title: 'FCRA Licensed', desc: 'International' }
                ].map((item, i) => (
                  <div key={i} className="bg-gradient-to-br from-gray-900 to-black rounded-2xl p-6 text-center border border-white/10 hover:border-secondary/30 transition-all duration-500 group hover:-translate-y-2">
                    <item.icon className="w-12 h-12 text-secondary mx-auto mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="font-bold text-lg mb-1 text-white">{item.title}</h3>
                    <p className="text-gray-500 text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
            </FadeInSection>
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
            <div className="inline-flex items-center justify-center w-20 h-20 bg-secondary/20 rounded-full mb-8">
              <Heart className="w-10 h-10 text-secondary" />
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold text-white mb-6">Ready to Make a Difference?</h2>
            <p className="text-gray-400 text-lg md:text-xl max-w-2xl mx-auto mb-10">Join us in our mission to transform lives and build a better tomorrow for everyone.</p>
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

export default About
