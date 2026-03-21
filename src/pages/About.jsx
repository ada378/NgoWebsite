import { Link } from 'react-router-dom'
import { Heart, Target, Eye, Users, Award, Building, Globe, Shield, CheckCircle, ArrowRight } from 'lucide-react'

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

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-black text-white pt-24 pb-16 sm:pt-32 sm:pb-20">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=1920&h=600&fit=crop" alt="About" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-black/80"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-secondary font-medium tracking-wider uppercase text-xs sm:text-sm mb-3 sm:mb-4">About Us</p>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-4 sm:mb-6 leading-tight">
              Our Story of<br />
              <span className="text-secondary">Hope & Impact</span>
            </h1>
            <p className="text-base sm:text-lg md:text-xl text-gray-400">
              For over 14 years, Hope Foundation has been dedicated to transforming lives through 
              education, healthcare, and sustainable community development.
            </p>
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-12 sm:py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div>
              <p className="text-secondary font-medium tracking-wider uppercase text-xs sm:text-sm mb-3 sm:mb-4">Our Story</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold mb-4 sm:mb-6 text-white">
                Building a Better Tomorrow
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-gray-400 mb-4 sm:mb-6">
                Hope Foundation was established in 2010 with a simple yet powerful vision: to create 
                a world where every individual has access to opportunities for growth and development.
              </p>
              <p className="text-sm sm:text-base md:text-lg text-gray-400 mb-4 sm:mb-6">
                What started as a small initiative to provide education to underprivileged children 
                in rural Maharashtra has grown into a comprehensive organization working across 
                education, healthcare, women empowerment, and environmental conservation.
              </p>
              <p className="text-sm sm:text-base md:text-lg text-gray-400 mb-6 sm:mb-8">
                Today, we are proud to have impacted over 50,000 lives across 50+ communities, 
                with a dedicated team of 2,000+ volunteers and partnerships with government agencies, 
                corporations, and international organizations.
              </p>

              <div className="grid grid-cols-2 gap-3 sm:gap-4">
                {[
                  { label: 'Lives Impacted', value: '50,000+' },
                  { label: 'Projects Completed', value: '160+' },
                  { label: 'Years of Service', value: '14+' },
                  { label: 'Communities Served', value: '50+' }
                ].map((stat, i) => (
                  <div key={i} className="bg-gray-900 rounded-xl p-3 sm:p-4 border border-gray-800">
                    <p className="font-display text-xl sm:text-2xl font-bold text-secondary">{stat.value}</p>
                    <p className="text-gray-500 text-xs sm:text-sm">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative mt-8 lg:mt-0">
              <div className="absolute -top-2 -left-2 sm:-top-4 sm:-left-4 w-full h-full bg-secondary/20 rounded-2xl sm:rounded-3xl"></div>
              <img
                src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&h=700&fit=crop"
                alt="Hope Foundation team"
                className="relative rounded-2xl sm:rounded-3xl shadow-2xl w-full h-auto"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-12 sm:py-20 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-16">
            <p className="text-secondary font-medium tracking-wider uppercase text-xs sm:text-sm mb-3 sm:mb-4">Our Values</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-white">Core Values</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {values.map((value, index) => (
              <div key={index} className="bg-gray-900 rounded-xl sm:rounded-2xl p-5 sm:p-8 text-center border border-gray-800 hover:border-secondary/50 transition-colors">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-3 sm:mb-4">
                  <value.icon className="w-6 h-6 sm:w-8 sm:h-8 text-secondary" />
                </div>
                <h3 className="font-heading font-bold text-base sm:text-xl mb-1 sm:mb-2 text-white">{value.title}</h3>
                <p className="text-gray-500 text-xs sm:text-sm">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="py-12 sm:py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-4 sm:gap-8">
            <div className="bg-gradient-to-br from-gray-900 to-black rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-12 border border-gray-800 h-full">
              <div className="flex items-center space-x-3 sm:space-x-4 mb-4 sm:mb-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-secondary/20 rounded-full flex items-center justify-center">
                  <Eye className="w-6 h-6 sm:w-8 sm:h-8 text-secondary" />
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-heading font-bold text-white">Our Vision</h3>
              </div>
              <p className="text-sm sm:text-base md:text-xl text-gray-400 leading-relaxed">
                A world where every individual has equal access to quality education, healthcare, 
                and opportunities for growth, regardless of their socioeconomic background. 
              </p>
            </div>

            <div className="bg-gradient-to-br from-secondary to-yellow-600 text-black rounded-2xl sm:rounded-3xl p-6 sm:p-10 md:p-12 h-full">
              <div className="flex items-center space-x-3 sm:space-x-4 mb-4 sm:mb-6">
                <div className="w-12 h-12 sm:w-16 sm:h-16 bg-black/20 rounded-full flex items-center justify-center">
                  <Target className="w-6 h-6 sm:w-8 sm:h-8" />
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-heading font-bold">Our Mission</h3>
              </div>
              <p className="text-sm sm:text-base md:text-xl text-black/80 leading-relaxed">
                To empower underprivileged communities through comprehensive programs in education, 
                healthcare, women empowerment, and environmental sustainability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-12 sm:py-20 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-16">
            <p className="text-secondary font-medium tracking-wider uppercase text-xs sm:text-sm mb-3 sm:mb-4">Timeline</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-white">Our Journey</h2>
          </div>

          <div className="relative">
            {/* Mobile: Vertical line */}
            <div className="absolute left-4 sm:left-1/2 transform sm:-translate-x-1/2 h-full w-0.5 sm:w-1 bg-gray-800"></div>
            
            <div className="space-y-6 sm:space-y-12">
              {milestones.map((milestone, index) => (
                <div
                  key={index}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  }`}
                >
                  {/* Desktop alternating layout */}
                  <div className={`hidden sm:block w-5/12 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <div className="bg-gray-900 rounded-xl sm:rounded-2xl p-4 sm:p-6 border border-gray-800">
                      <span className="inline-block px-2 sm:px-3 py-0.5 sm:py-1 bg-secondary/20 text-secondary text-xs sm:text-sm font-bold rounded-full mb-1 sm:mb-2">
                        {milestone.year}
                      </span>
                      <h3 className="font-heading font-bold text-base sm:text-xl mb-1 sm:mb-2 text-white">{milestone.title}</h3>
                      <p className="text-gray-500 text-xs sm:text-sm">{milestone.description}</p>
                    </div>
                  </div>
                  
                  {/* Mobile: Full width card */}
                  <div className="sm:hidden flex items-start pl-12">
                    <div className="bg-gray-900 rounded-xl p-4 border border-gray-800 flex-1">
                      <span className="inline-block px-2 py-0.5 bg-secondary/20 text-secondary text-xs font-bold rounded-full mb-1">
                        {milestone.year}
                      </span>
                      <h3 className="font-bold text-white mb-1">{milestone.title}</h3>
                      <p className="text-gray-500 text-xs">{milestone.description}</p>
                    </div>
                  </div>
                  
                  <div className="absolute left-4 sm:left-1/2 transform sm:-translate-x-1/2 w-4 h-4 sm:w-6 sm:h-6 bg-secondary rounded-full border-4 border-gray-950 shadow-lg"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-12 sm:py-20 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-16">
            <p className="text-secondary font-medium tracking-wider uppercase text-xs sm:text-sm mb-3 sm:mb-4">Our Team</p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold text-white">Meet Our Team</h2>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 md:gap-8">
            {team.map((member, index) => (
              <div key={index} className="bg-gray-900 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 text-center border border-gray-800 group hover:border-secondary/50 transition-colors">
                <div className="relative w-20 h-20 sm:w-28 md:w-32 mx-auto mb-3 sm:mb-4">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-full object-cover rounded-full group-hover:scale-110 transition-transform"
                  />
                </div>
                <h3 className="font-heading font-bold text-sm sm:text-base md:text-xl mb-0.5 sm:mb-1 text-white">{member.name}</h3>
                <p className="text-secondary font-medium text-xs sm:text-sm">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Compliance */}
      <section className="py-12 sm:py-20 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">
            <div>
              <p className="text-secondary font-medium tracking-wider uppercase text-xs sm:text-sm mb-3 sm:mb-4">Compliance</p>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold mb-4 sm:mb-6 text-white">
                Legal & Compliance
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-gray-400 mb-6 sm:mb-8">
                We maintain the highest standards of transparency and compliance. Our registration 
                and certifications ensure that your donation is in safe hands.
              </p>

              <div className="space-y-3 sm:space-y-4">
                {[
                  { icon: Building, title: 'NGO Registration', value: 'NGO-MH-2024-001234' },
                  { icon: Shield, title: 'PAN Number', value: 'AABTH1234B' },
                  { icon: Award, title: '80G Certificate', value: 'Valid until March 2027' },
                  { icon: Globe, title: 'FCRA Registration', value: '123456789' }
                ].map((item, index) => (
                  <div key={index} className="flex items-center space-x-3 sm:space-x-4 bg-gray-900 rounded-xl p-3 sm:p-4 border border-gray-800">
                    <item.icon className="w-6 h-6 sm:w-8 sm:h-8 text-secondary flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-white text-xs sm:text-sm truncate">{item.title}</p>
                      <p className="text-gray-500 text-xs truncate">{item.value}</p>
                    </div>
                    <CheckCircle className="w-5 h-5 sm:w-6 sm:h-6 text-green-500 flex-shrink-0" />
                  </div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4 md:gap-6 mt-8 lg:mt-0">
              {[
                { icon: Award, title: '4-Star NGO', desc: 'Credibility Alliance' },
                { icon: Shield, title: 'ISO 9001:2015', desc: 'Quality Certified' },
                { icon: CheckCircle, title: 'Tax Exempt', desc: '80G & 12A' },
                { icon: Globe, title: 'FCRA Licensed', desc: 'International' }
              ].map((item, i) => (
                <div key={i} className="bg-gray-900 backdrop-blur rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 text-center border border-gray-800">
                  <item.icon className="w-8 h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 text-secondary mx-auto mb-2 sm:mb-4" />
                  <h3 className="font-bold text-sm sm:text-base md:text-xl mb-0.5 sm:mb-2 text-white">{item.title}</h3>
                  <p className="text-gray-500 text-xs sm:text-sm">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 sm:py-20 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Heart className="w-10 h-10 sm:w-14 sm:h-14 md:w-16 md:h-16 text-secondary mx-auto mb-4 sm:mb-6" />
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold mb-4 sm:mb-6 text-white">
            Ready to Make a Difference?
          </h2>
          <p className="text-sm sm:text-base md:text-xl text-gray-400 mb-6 sm:mb-8">
            Join us in our mission to transform lives and build a better tomorrow for everyone.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4">
            <Link to="/donate" className="px-6 py-3 sm:px-8 sm:py-4 bg-secondary text-black font-semibold rounded-xl hover:bg-yellow-400 transition-all text-sm sm:text-base">
              Donate Now
            </Link>
            <Link to="/contact" className="px-6 py-3 sm:px-8 sm:py-4 border-2 border-gray-700 text-white font-semibold rounded-xl hover:border-secondary hover:text-secondary transition-all text-sm sm:text-base">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About
