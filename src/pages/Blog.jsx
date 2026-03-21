import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, User, ChevronRight } from 'lucide-react'
import axios from 'axios'

const Blog = () => {
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState('All')

  useEffect(() => { fetchBlogs() }, [filter])

  const fetchBlogs = async () => {
    try {
      const response = await axios.get('/api/blogs', { params: filter !== 'All' ? { category: filter } : {} })
      setBlogs(response.data.blogs || [])
    } catch (error) {
      setBlogs([
        { _id: '1', title: 'New School Building Inaugurated in Rural Maharashtra', slug: 'new-school-building-maharashtra', excerpt: 'A new chapter begins for 500 children with the inauguration of our modern school facility.', category: 'News', authorName: 'Hope Foundation Team', createdAt: new Date().toISOString(), images: ['https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&h=400&fit=crop'] },
        { _id: '2', title: 'Healthcare Camp Serves 2000+ Patients in Gujarat', slug: 'healthcare-camp-gujarat', excerpt: 'Our medical team brought healthcare to the doorstep of remote communities.', category: 'Impact Report', authorName: 'Dr. Priya Sharma', createdAt: new Date().toISOString(), images: ['https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop'] },
        { _id: '3', title: 'Women Entrepreneurs Share Their Success Stories', slug: 'women-entrepreneurs-stories', excerpt: 'Stories of courage and determination from women who broke barriers.', category: 'Success Story', authorName: 'Anita Desai', createdAt: new Date().toISOString(), images: ['https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=600&h=400&fit=crop'] },
        { _id: '4', title: 'Tree Plantation Drive: 10,000 Trees Planted', slug: 'tree-plantation-drive', excerpt: 'Our environmental initiative continues to grow with community participation.', category: 'Campaign Update', authorName: 'Green Team', createdAt: new Date().toISOString(), images: ['https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=600&h=400&fit=crop'] }
      ])
    }
    setLoading(false)
  }

  const categories = ['All', 'News', 'Success Story', 'Impact Report', 'Campaign Update', 'Event']

  return (
    <div>
      <section className="relative bg-black text-white py-32">
        <div className="absolute inset-0">
          <img src="https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=1920&h=600&fit=crop" alt="Blog" className="w-full h-full object-cover opacity-30" />
          <div className="absolute inset-0 bg-black/80"></div>
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-secondary font-medium tracking-wider uppercase text-sm mb-4">Updates</p>
          <h1 className="text-5xl md:text-6xl font-heading font-bold mb-4">Blog & Updates</h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto">Stay informed about our latest initiatives, impact stories, and campaign updates.</p>
        </div>
      </section>

      <section className="py-8 bg-black">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => (
              <button key={cat} onClick={() => setFilter(cat)}
                className={`px-6 py-3 rounded-full font-medium transition-all ${
                  filter === cat ? 'bg-secondary text-black' : 'bg-gray-900 text-gray-300 hover:bg-gray-800 border border-gray-800'
                }`}>
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 bg-gray-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {loading ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (<div key={i} className="bg-gray-900 rounded-xl h-96 animate-pulse border border-gray-800"></div>))}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog) => (
                <Link key={blog._id} to={`/blog/${blog.slug}`}
                  className="bg-gray-900 rounded-xl shadow-lg overflow-hidden group hover:border-secondary/50 transition-all border border-gray-800">
                  <div className="relative h-48 overflow-hidden">
                    <img src={blog.images?.[0] || 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600&h=400&fit=crop'}
                      alt={blog.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                    <div className="absolute top-4 left-4 px-3 py-1 bg-secondary text-black text-sm rounded-full font-semibold">
                      {blog.category}
                    </div>
                  </div>
                  <div className="p-6">
                    <h2 className="font-heading font-bold text-xl mb-3 text-white group-hover:text-secondary transition-colors line-clamp-2">
                      {blog.title}
                    </h2>
                    <p className="text-gray-500 mb-4 line-clamp-2">{blog.excerpt}</p>
                    <div className="flex items-center justify-between text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4" /><span>{blog.authorName}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(blog.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}</span>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-800 flex items-center text-secondary font-medium">
                      <span>Read More</span>
                      <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {blogs.length === 0 && !loading && (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">No articles found in this category.</p>
            </div>
          )}
        </div>
      </section>

      <section className="py-20 bg-black">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-heading font-bold mb-6 text-white">Subscribe to Our Newsletter</h2>
          <p className="text-gray-400 mb-8">Get the latest updates on our programs and impact delivered to your inbox.</p>
          <form className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto">
            <input type="email" placeholder="Enter your email"
              className="flex-1 px-6 py-4 border-2 border-gray-700 rounded-xl focus:border-secondary focus:outline-none bg-gray-900 text-white" />
            <button className="px-8 py-4 bg-secondary text-black font-semibold rounded-xl hover:bg-yellow-400 transition-all">
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  )
}

export default Blog
