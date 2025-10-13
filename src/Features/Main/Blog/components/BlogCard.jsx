import { useNavigate } from 'react-router-dom';

const BlogCard = ({ post, variant = 'default' }) => {
  const navigate = useNavigate();

  const handleBlogClick = (blogId) => {
    navigate(`/blogs/${blogId}`);
    window.scrollTo(0, 0, 'smooth', 'top');
  };

  const getCategoryLabel = (category) => {
    switch (category) {
      case 'budget-travel':
        return 'Budget Travel';
      case 'weekend-getaways':
        return 'Weekend Getaways';
      case 'travel-hacks':
        return 'Travel Hacks';
      case 'flight-guides':
        return 'Flight Guides';
      case 'travel-tips':
        return 'Travel Tips';
      case 'destinations':
        return 'Destinations';
      default:
        return 'Travel';
    }
  };

  // Default variant (for blog page)
  if (variant === 'default') {
    return (
      <div
        className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 cursor-pointer group"
        onClick={() => handleBlogClick(post.id)}
      >
        {/* Image */}
        <div className="relative h-56 bg-gradient-to-br from-blue-100 to-blue-200 overflow-hidden">
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-[#364A9C] text-white text-xs font-medium rounded-full shadow-lg">
              {getCategoryLabel(post.category)}
            </span>
          </div>
          <div className="absolute bottom-4 right-4">
            <span className="px-2 py-1 bg-black bg-opacity-50 text-white text-xs rounded">
              {post.readTime}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="py-2 px-2">
          <h3 className="font-bold text-gray-900 text-lg mb-3 line-clamp-2 leading-tight group-hover:text-[#364A9C] transition-colors">
            {post.title}
          </h3>

          <div className="flex items-center text-xs text-gray-500 mb-3">
            <span className="font-medium">{post.author}</span>
            <span className="mx-2">•</span>
            <span>{post.date}</span>
          </div>
          
          <p className="text-sm text-gray-600 mb-4 line-clamp-3 leading-relaxed">
            {post.description}
          </p>

          <button className="w-full px-4 py-3 border-2 border-[#364A9C] text-[#364A9C] rounded-lg text-sm font-medium hover:bg-[#364A9C] hover:text-white transition-colors group-hover:shadow-md">
            Read More
          </button>
        </div>
      </div>
    );
  }

  // Compact variant (for flight page blogs section)
  if (variant === 'compact') {
    return (
      <div
        className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
        onClick={() => handleBlogClick(post.id)}
      >
        {/* Image */}
        <div className="relative h-48 bg-gradient-to-br from-blue-100 to-blue-200">
          <img 
            src={post.image} 
            alt={post.title} 
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 left-3">
            <span className="px-2 py-1 bg-[#364A9C] text-white text-xs font-medium rounded-full">
              {getCategoryLabel(post.category)}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-4">
          <h3 className="font-bold text-gray-900 text-lg mb-3 line-clamp-2 leading-tight">
            {post.title}
          </h3>

          <p className="text-xs text-gray-500 mb-3">{post.date}</p>
          
          <p className="text-sm text-gray-600 mb-4 line-clamp-3 leading-relaxed">
            {post.description}
          </p>

          <button className="w-full px-4 py-2 border-2 border-[#364A9C] text-[#364A9C] rounded-lg text-sm font-medium hover:bg-[#364A9C] hover:text-white transition-colors">
            Read More
          </button>
        </div>
      </div>
    );
  }

  // Related variant (for blog post page)
  if (variant === 'related') {
    return (
      <div
        className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow cursor-pointer"
        onClick={() => handleBlogClick(post.id)}
      >
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-48 object-cover"
        />
        <div className="p-6">
          <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-2">
            {post.title}
          </h3>
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">
            {post.description}
          </p>
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>{post.readTime}</span>
            <span>{post.date}</span>
          </div>
        </div>
      </div>
    );
  }

  return null;
};

export default BlogCard;
