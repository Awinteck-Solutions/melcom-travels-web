import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BlogCard from '../../Blog/components/BlogCard';

const Blogs = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const navigate = useNavigate();

  const filters = [
    'all', 'travel-tips', 'destinations', 'budget-travel', 'weekend-getaways', 'travel-hacks', 'flight-guides'
  ];

  const blogPosts = [
    {
      id: 1,
      title: "Top 5 Budget-Friendly Destinations This Fall",
      author: "Honya Bright",
      date: "09 August 2025",
      description: "Discover amazing destinations that won't break the bank this fall season. From hidden gems to popular spots with off-season deals.",
      image: "/blog/b1.svg",
      category: "budget-travel"
    },
    {
      id: 2,
      title: "Weekend Getaways: Top Picks Under 3 Hours Flight Time",
      author: "Honya Bright",
      date: "09 August 2025",
      description: "Perfect weekend escapes that are just a short flight away. Make the most of your time off with these quick getaway destinations.",
      image: "/blog/b2.svg",
      category: "weekend-getaways"
    },
    {
      id: 3,
      title: "10 Travel Hacks Every Flyer Should Know",
      author: "Honya Bright",
      date: "09 August 2025",
      description: "Essential tips and tricks to make your flying experience smoother, cheaper, and more enjoyable. Save money and time with these proven hacks.",
      image: "/blog/b3.svg",
      category: "travel-hacks"
    },
    {
      id: 4,
      title: "Direct vs. Connecting Flights: What's Worth It?",
      author: "Honya Bright",
      date: "09 August 2025",
      description: "Weigh the pros and cons of direct versus connecting flights. Find out when it's worth the extra cost and when you can save money.",
      image: "/blog/b1.svg",
      category: "flight-guides"
    }
  ];

  const filteredPosts = activeFilter === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeFilter);

  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <div className="text-center md:mb-12 mb-4">
          <p className="text-sm text-gray-500 uppercase tracking-wide mb-2">DISCOVER</p>
          <h2 className="md:text-3xl text-xl font-bold text-gray-900 mb-4">Our Latest Blogs</h2>
          <p className="md:text-base text-sm text-gray-600 max-w-2xl mx-auto">
            Quick tips, travel guides, and deals to help you fly smarter.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center md:justify-center justify-start space-x-2 mb-8 overflow-x-auto pb-4">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                activeFilter === filter
                  ? 'bg-[#364A9C] text-white'
                  : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {filter === 'all' ? 'All' : 
               filter === 'travel-tips' ? 'Travel Tips' :
               filter === 'destinations' ? 'Destinations' :
               filter === 'budget-travel' ? 'Budget Travel' :
               filter === 'weekend-getaways' ? 'Weekend Getaways' :
               filter === 'travel-hacks' ? 'Travel Hacks' :
               filter === 'flight-guides' ? 'Flight Guides' : filter}
            </button>
          ))}
        </div>

        {/* Blog Post Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
          {filteredPosts.map((post) => (
            <BlogCard key={post.id} post={post} variant="compact" />
          ))}
        </div>

        {/* View All Blogs Button */}
        <div className="text-center mt-12">
          <button 
            onClick={() => navigate('/blogs')}
            className="px-8 py-3 border-2 border-[#364A9C] text-[#364A9C] rounded-lg font-medium hover:bg-[#364A9C] hover:text-white transition-colors"
          >
            View All Blogs
          </button>
        </div>
      </div>
    </section>
  );
};

export default Blogs;
