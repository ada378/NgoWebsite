import { Link } from 'react-router-dom'
import { Home, ArrowLeft, Heart } from 'lucide-react'

const NotFound = () => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="text-center">
        <div className="mb-8">
          <span className="text-9xl font-display font-bold text-secondary/20">404</span>
        </div>
        
        <div className="w-24 h-24 bg-gray-900 rounded-full flex items-center justify-center mx-auto mb-6 border border-gray-800">
          <Heart className="w-12 h-12 text-secondary" />
        </div>
        
        <h1 className="text-3xl font-heading font-bold mb-4 text-white">Page Not Found</h1>
        <p className="text-gray-500 mb-8 max-w-md mx-auto">
          Sorry, we couldn't find the page you're looking for. 
          It might have been moved or deleted.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => window.history.back()}
            className="flex items-center justify-center space-x-2 px-6 py-3 border-2 border-gray-700 text-gray-300 rounded-lg font-medium hover:border-secondary hover:text-secondary transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Go Back</span>
          </button>
          <Link
            to="/"
            className="flex items-center justify-center space-x-2 px-6 py-3 bg-secondary text-black font-medium rounded-lg hover:bg-yellow-400 transition-colors"
          >
            <Home className="w-5 h-5" />
            <span>Back to Home</span>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default NotFound
