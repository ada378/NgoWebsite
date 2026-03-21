import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Calendar, User, ArrowLeft, Share2, Twitter, Facebook, Linkedin } from 'lucide-react'
import axios from 'axios'

const BlogDetail = () => {
  const { slug } = useParams()
  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchBlog()
  }, [slug])

  const fetchBlog = async () => {
    try {
      const response = await axios.get(`/api/blogs/${slug}`)
      setBlog(response.data.blog)
    } catch (error) {
      setBlog({
        title: 'New School Building Inaugurated in Rural Maharashtra',
        slug: 'new-school-building-maharashtra',
        content: `We are thrilled to announce the inauguration of our state-of-the-art school building in rural Maharashtra. This facility represents a significant milestone in our mission to provide quality education to every child, regardless of their socioeconomic background.

The new school features 15 spacious classrooms equipped with modern digital infrastructure, a fully-stocked library with over 5,000 books, a computer lab with 30 workstations, and a dedicated science laboratory. Additionally, we have constructed a large playground and multipurpose hall to support holistic development.

"This school will serve over 500 children from 15 surrounding villages," said Dr. Rajesh Kumar, Founder of Hope Foundation. "Education is the most powerful tool for social change, and we are committed to providing every child with access to quality learning opportunities."

The project was completed in 18 months with an investment of ₹2.5 crores, funded entirely through generous donations from our supporters. We extend our heartfelt gratitude to all who contributed to making this dream a reality.

The school will begin operations from the upcoming academic year, and we have already received enrollment applications from 450 students. Our team of 25 dedicated teachers is ready to provide the best educational experience to every student.

Join us in celebrating this achievement and continue supporting our mission to transform lives through education.`,
        category: 'News',
        authorName: 'Hope Foundation Team',
        createdAt: new Date().toISOString(),
        views: 245,
        images: [
          'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=1200&h=600&fit=crop',
          'https://images.unsplash.com/photo-1509062522246-3755977927d7?w=600&h=400&fit=crop',
          'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=400&fit=crop'
        ],
        tags: ['education', 'school', 'inauguration', 'maharashtra']
      })
    }
    setLoading(false)
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-primary border-t-transparent"></div>
      </div>
    )
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Blog post not found</p>
      </div>
    )
  }

  const relatedPosts = [
    {
      title: 'Healthcare Camp Serves 2000+ Patients',
      slug: 'healthcare-camp-gujarat',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=300&fit=crop',
      date: '2024-01-15'
    },
    {
      title: 'Women Entrepreneurs Share Success Stories',
      slug: 'women-entrepreneurs-stories',
      image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=400&h=300&fit=crop',
      date: '2024-01-10'
    },
    {
      title: 'Tree Plantation Drive Success',
      slug: 'tree-plantation-drive',
      image: 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=400&h=300&fit=crop',
      date: '2024-01-05'
    }
  ]

  return (
    <div>
      <section className="relative h-96 overflow-hidden">
        <img
          src={blog.images?.[0] || 'https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=1200&h=600&fit=crop'}
          alt={blog.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
        
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="max-w-4xl mx-auto">
            <Link to="/blog" className="inline-flex items-center text-sm text-gray-300 hover:text-white mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Link>
            <div className="px-3 py-1 bg-primary text-white text-sm rounded-full inline-block mb-4">
              {blog.category}
            </div>
            <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4">{blog.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-gray-300">
              <div className="flex items-center space-x-2">
                <User className="w-4 h-4" />
                <span>{blog.authorName}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4" />
                <span>{new Date(blog.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12">
            <div className="prose prose-lg max-w-none">
              {blog.content?.split('\n\n').map((paragraph, index) => (
                <p key={index} className="mb-6 text-gray-700 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>

            {blog.images?.length > 1 && (
              <div className="mt-12">
                <h3 className="text-2xl font-heading font-bold mb-6">Gallery</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {blog.images.slice(1).map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${blog.title} - Image ${index + 2}`}
                      className="w-full h-48 object-cover rounded-xl"
                    />
                  ))}
                </div>
              </div>
            )}

            {blog.tags && (
              <div className="mt-12 pt-8 border-t">
                <div className="flex flex-wrap items-center gap-4">
                  <span className="font-medium text-gray-700">Tags:</span>
                  {blog.tags.map((tag) => (
                    <span key={tag} className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-600">
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            <div className="mt-8 pt-8 border-t">
              <div className="flex items-center justify-between">
                <span className="font-medium text-gray-700">Share this article:</span>
                <div className="flex space-x-4">
                  <button className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    <Facebook className="w-5 h-5" />
                  </button>
                  <button className="p-2 bg-sky-500 text-white rounded-lg hover:bg-sky-600">
                    <Twitter className="w-5 h-5" />
                  </button>
                  <button className="p-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800">
                    <Linkedin className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-heading font-bold mb-8">Related Articles</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {relatedPosts.map((post, index) => (
              <Link key={index} to={`/blog/${post.slug}`} className="card group overflow-hidden p-0">
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <p className="text-sm text-gray-500 mb-2">
                    {new Date(post.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                  </p>
                  <h3 className="font-heading font-bold text-lg group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}

export default BlogDetail
