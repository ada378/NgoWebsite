import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, User, ChevronRight } from 'lucide-react'
import api from '../config/api'

const Blog = () => {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('All')

  useEffect(() => { fetchBlogs() }, [filter])

  const fetchBlogs = async () => {
    try {
      const response = await api.get('/api/blogs', { params: filter !== 'All' ? { category: filter } : {} })
      setBlogs(response.data.blogs || [])
    } catch (error) {
      setBlogs([
        { _id: '1', title: 'New School Building Inaugurated', slug: 'new-school-building', excerpt: 'A new chapter begins for children.', category: 'News', authorName: 'Hope Team', createdAt: new Date().toISOString(), images: ['https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&h=400&fit=crop'] },
        { _id: '2', title: 'Healthcare Camp Serves 2000+ Patients', slug: 'healthcare-camp', excerpt: 'Medical team brought healthcare.', category: 'Impact Report', authorName: 'Dr. Priya', createdAt: new Date().toISOString(), images: ['https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop'] },
        { _id: '3', title: 'Women Entrepreneurs Stories', slug: 'women-entrepreneurs', excerpt: 'Stories of courage.', category: 'Success Story', authorName: 'Anita', createdAt: new Date().toISOString(), images: ['https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&h=400&fit=crop'] },
        { _id: '4', title: 'Tree Plantation: 10,000 Trees', slug: 'tree-plantation', excerpt: 'Environmental initiative.', category: 'Campaign', authorName: 'Green Team', createdAt: new Date().toISOString(), images: ['https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&h=400&fit=crop'] }
      ])
    }
    setLoading(false)
  }

  const categories = ['All', 'News', 'Success Story', 'Impact Report', 'Campaign Update', 'Event']

  return (
    <div>
      {/* Hero */}
      <section className="relative bg-black text-white pt-24 pb-16 sm:pt-32 sm:pb-20">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=1920&h=600&fit=crop" alt="Blog" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-black/80"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-secondary font-medium tracking-wider uppercase text-xs sm:text-sm mb-3 sm:mb-4">Updates</p>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-heading font-bold mb-3 sm:mb-4">Blog & Updates</h1>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 max-w-2xl mx-auto px-4">Stay informed about our latest initiatives and impact stories.</p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-6 sm:py-8 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {categories.map((cat) => (
              <button key={cat} onClick={() => setFilter(cat)}
                className={`px-3 sm:px-5 py-2 rounded-full font-medium transition-all text-xs sm:text-sm ${
                  filter === cat ? 'bg-secondary text-black' : 'bg-gray-900 text-gray-300 hover:bg-gray-800 border border-gray-800'
                }`}>
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-10 sm:py-12 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {[1, 2, 3].map((i) => (<div key={i} className="bg-gray-900 rounded-xl sm:rounded-2xl h-80 sm:h-96 animate-pulse border border-gray-800"></div>))}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {blogs.map((blog) => (
                <Link key={blog._id} to={`/blog/${blog.slug}`}
                  className="bg-gray-900 rounded-xl sm:rounded-2xl shadow-lg overflow-hidden group hover:border-secondary/50 transition-all border border-gray-800">
                  <div className="relative h-40 sm:h-48 overflow-hidden">
                    <img src={blog.images?.[0] || 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&h=400&fit=crop'}
                      alt={blog.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute top-3 left-3 sm:top-4 sm:left-4 px-2 sm:px-3 py-0.5 sm:py-1 bg-secondary text-black text-xs sm:text-sm rounded-full font-semibold">
                      {blog.category}
                    </div>
                  </div>
                  <div className="p-4 sm:p-6">
                    <h2 className="font-heading font-bold text-base sm:text-lg md:text-xl mb-2 sm:mb-3 text-white group-hover:text-secondary transition-colors line-clamp-2">
                      {blog.title}
                    </h2>
                    <p className="text-gray-500 text-xs sm:text-sm mb-3 sm:mb-4 line-clamp-2">{blog.excerpt}</p>
                    <div className="flex items-center justify-between text-xs sm:text-sm text-gray-500">
                      <div className="flex items-center space-x-1">
                        <User className="w-3 h-3 sm:w-4 sm:h-4" /><span className="truncate">{blog.authorName}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
                        <span>{new Date(blog.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
                      </div>
                    </div>
                    <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-gray-800 flex items-center text-secondary font-medium text-xs sm:text-sm">
                      <span>Read More</span>
                      <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 ml-1 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {blogs.length === 0 && !loading && (
            <div className="text-center py-16 sm:py-20">
              <p className="text-gray-500 text-base sm:text-lg">No articles found in this category.</p>
            </div>
          )}
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-12 sm:py-20 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-bold mb-4 sm:mb-6 text-white">Subscribe to Our Newsletter</h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-400 mb-6 sm:mb-8">Get the latest updates delivered to your inbox.</p>
          <form className="flex flex-col sm:flex-row gap-3 sm:gap-4 max-w-lg mx-auto">
            <input type="email" placeholder="Enter your email"
              className="flex-1 px-4 sm:px-6 py-3 sm:py-4 border-2 border-gray-700 rounded-xl focus:border-secondary focus:outline-none bg-gray-900 text-white text-sm sm:text-base" />
            <button className="px-6 sm:px-8 py-3 sm:py-4 bg-secondary text-black font-semibold rounded-xl hover:bg-yellow-400 transition-all text-sm sm:text-base">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}

export default Blog
