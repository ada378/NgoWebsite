import { useState } from 'react'
import { Camera, X, ChevronLeft, ChevronRight } from 'lucide-react'

const Gallery = () => {
  const [filter, setFilter] = useState('All')
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [currentIndex, setCurrentIndex] = useState(0)

  const filters = ['All', 'Education', 'Healthcare', 'Women Empowerment', 'Environment', 'Events']

  const galleryItems = [
    { id: 1, src: 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&h=400&fit=crop', title: 'New School Inauguration', category: 'Education', location: 'Maharashtra' },
    { id: 2, src: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop', title: 'Healthcare Camp', category: 'Healthcare', location: 'Gujarat' },
    { id: 3, src: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&h=400&fit=crop', title: 'Women Training Session', category: 'Women Empowerment', location: 'Rajasthan' },
    { id: 4, src: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&h=400&fit=crop', title: 'Tree Plantation Drive', category: 'Environment', location: 'Karnataka' },
    { id: 5, src: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&h=400&fit=crop', title: 'Digital Classroom', category: 'Education', location: 'Mumbai' },
    { id: 6, src: 'https://images.unsplash.com/photo-1584515933487-779824d29309?w=600&h=400&fit=crop', title: 'Medical Checkup Camp', category: 'Healthcare', location: 'Bihar' },
    { id: 7, src: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&h=400&fit=crop', title: 'Volunteer Training', category: 'Events', location: 'Delhi' },
    { id: 8, src: 'https://images.unsplash.com/photo-1594708767771-a7502f524d04?w=600&h=400&fit=crop', title: 'Women Entrepreneurship', category: 'Women Empowerment', location: 'Kerala' },
    { id: 9, src: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=400&fit=crop', title: 'Village Education', category: 'Education', location: 'UP' },
    { id: 10, src: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?w=600&h=400&fit=crop', title: 'Health Awareness', category: 'Healthcare', location: 'West Bengal' },
    { id: 11, src: 'https://images.unsplash.com/photo-1518531933037-91b2f5f229cc?w=600&h=400&fit=crop', title: 'Environment Cleanup', category: 'Environment', location: 'Goa' },
    { id: 12, src: 'https://images.unsplash.com/photo-1516627145497-ae6968895b74?w=600&h=400&fit=crop', title: 'Annual Gala', category: 'Events', location: 'Mumbai' }
  ]

  const filteredItems = filter === 'All' ? galleryItems : galleryItems.filter(item => item.category === filter)

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-black text-white pt-24 pb-16 sm:pt-32 sm:pb-20">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=1920&h=600&fit=crop" alt="Gallery" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-black/80"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <Camera className="w-10 h-10 sm:w-14 sm:w-16 sm:h-16 text-secondary mx-auto mb-4 sm:mb-6" />
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-3 sm:mb-4">Our Gallery</h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto px-4">Capturing moments of impact and hope from our programs across India.</p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-6 sm:py-8 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {filters.map((f) => (
              <button key={f} onClick={() => setFilter(f)}
                className={`px-3 sm:px-5 py-2 rounded-full font-medium transition-all text-xs sm:text-sm ${
                  filter === f ? 'bg-secondary text-black' : 'bg-gray-900 text-gray-300 hover:bg-gray-800 border border-gray-800'
                }`}>
                {f}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-10 sm:py-12 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4">
            {filteredItems.map((item, index) => (
              <div key={item.id} onClick={() => { setCurrentIndex(index); setLightboxOpen(true) }}
                className="relative group cursor-pointer overflow-hidden rounded-lg sm:rounded-xl aspect-square border border-gray-800 hover:border-secondary/50 transition-colors">
                <img src={item.src} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="absolute bottom-3 left-3 right-3 text-white">
                    <p className="font-bold text-xs sm:text-sm truncate">{item.title}</p>
                    <p className="text-gray-300 text-xs">{item.location}</p>
                  </div>
                </div>
                <div className="absolute top-2 right-2 sm:top-3 sm:right-3 bg-secondary/90 rounded-full p-1 sm:p-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  <Camera className="w-3 h-3 sm:w-4 sm:h-4 text-black" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {lightboxOpen && (
        <div className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4">
          <button onClick={() => setLightboxOpen(false)} className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white hover:text-gray-300 transition-colors">
            <X className="w-6 h-6 sm:w-8 sm:h-8" />
          </button>
          <button onClick={() => setCurrentIndex((prev) => (prev - 1 + filteredItems.length) % filteredItems.length)} className="absolute left-2 sm:left-4 md:left-6 text-white hover:text-gray-300 transition-colors">
            <ChevronLeft className="w-8 h-8 sm:w-12 sm:h-12" />
          </button>
          <button onClick={() => setCurrentIndex((prev) => (prev + 1) % filteredItems.length)} className="absolute right-2 sm:right-4 md:right-6 text-white hover:text-gray-300 transition-colors">
            <ChevronRight className="w-8 h-8 sm:w-12 sm:h-12" />
          </button>
          <div className="max-w-5xl max-h-[80vh] mx-4 w-full">
            <img src={filteredItems[currentIndex].src.replace('w=600&h=400', 'w=1200&h=800')}
              alt={filteredItems[currentIndex].title} className="max-w-full max-h-[60vh] sm:max-h-[70vh] object-contain rounded-lg mx-auto" />
            <div className="text-white text-center mt-4 sm:mt-6">
              <p className="text-lg sm:text-xl md:text-2xl font-bold">{filteredItems[currentIndex].title}</p>
              <p className="text-gray-400 text-sm sm:text-base">{filteredItems[currentIndex].location}</p>
              <p className="text-gray-500 text-xs sm:text-sm mt-2">{currentIndex + 1} / {filteredItems.length}</p>
            </div>
          </div>
        </div>
      )}

      {/* Social CTA */}
      <section className="py-12 sm:py-20 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold mb-4 sm:mb-6 text-white">Want to See More?</h2>
          <p className="text-sm sm:text-base md:text-xl text-gray-400 mb-6 sm:mb-8">Follow us on social media for regular updates.</p>
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {['Facebook', 'Instagram', 'YouTube'].map((social) => (
              <a key={social} href="#" className="px-4 sm:px-6 py-2 sm:py-3 bg-gray-900 text-gray-300 rounded-lg hover:bg-gray-800 border border-gray-800 transition-colors text-sm sm:text-base">
                {social}
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default Gallery
