import Header from '../../../../components/Header';
import { useGlobalContext } from '../../../../context';
import Container from '../../../../components/Container';
import BlogCard from '../components/BlogCard';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BlogPage = () => {
  const { isAuthenticated, user } = useGlobalContext();
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('all');

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
      category: "budget-travel",
      readTime: "5 min read",
      content: "Fall is the perfect time to explore new destinations without the summer crowds and high prices. Here are our top picks for budget-friendly fall travel..."
    },
    {
      id: 2,
      title: "Weekend Getaways: Top Picks Under 3 Hours Flight Time",
      author: "Honya Bright",
      date: "09 August 2025",
      description: "Perfect weekend escapes that are just a short flight away. Make the most of your time off with these quick getaway destinations.",
      image: "/blog/b2.svg",
      category: "weekend-getaways",
      readTime: "7 min read",
      content: "Short flights mean more time at your destination. These carefully selected locations offer the perfect balance of travel time and experience..."
    },
    {
      id: 3,
      title: "10 Travel Hacks Every Flyer Should Know",
      author: "Honya Bright",
      date: "09 August 2025",
      description: "Essential tips and tricks to make your flying experience smoother, cheaper, and more enjoyable. Save money and time with these proven hacks.",
      image: "/blog/b3.svg",
      category: "travel-hacks",
      readTime: "8 min read",
      content: "From packing efficiently to finding the best deals, these travel hacks will transform your flying experience and save you both time and money..."
    },
    {
      id: 4,
      title: "Direct vs. Connecting Flights: What's Worth It?",
      author: "Honya Bright",
      date: "09 August 2025",
      description: "Weigh the pros and cons of direct versus connecting flights. Find out when it's worth the extra cost and when you can save money.",
      image: "/blog/b1.svg",
      category: "flight-guides",
      readTime: "6 min read",
      content: "Choosing between direct and connecting flights can significantly impact your travel experience and budget. Here's what you need to know..."
    },
    {
      id: 5,
      title: "Essential Travel Tips for First-Time International Flyers",
      author: "Honya Bright",
      date: "08 August 2025",
      description: "Everything you need to know before your first international flight. From documentation to customs, we've got you covered.",
      image: "/blog/b2.svg",
      category: "travel-tips",
      readTime: "10 min read",
      content: "International travel can be overwhelming for first-timers. This comprehensive guide covers all the essentials you need to know..."
    },
    {
      id: 6,
      title: "Hidden Gems: Underrated Destinations Worth Visiting",
      author: "Honya Bright",
      date: "07 August 2025",
      description: "Discover breathtaking destinations that are off the beaten path. These hidden gems offer authentic experiences without the crowds.",
      image: "/blog/b3.svg",
      category: "destinations",
      readTime: "9 min read",
      content: "Skip the tourist traps and explore these incredible hidden gems that offer authentic experiences and unforgettable memories..."
    },
    {
      id: 7,
      title: "Packing Like a Pro: Ultimate Travel Packing Guide",
      author: "Honya Bright",
      date: "06 August 2025",
      description: "Master the art of packing with our comprehensive guide. Learn how to pack efficiently for any type of trip.",
      image: "/blog/b1.svg",
      category: "travel-tips",
      readTime: "12 min read",
      content: "Packing efficiently is an art form. This guide will teach you how to pack like a pro for any destination and trip duration..."
    },
    {
      id: 8,
      title: "Airline Loyalty Programs: Maximizing Your Benefits",
      author: "Honya Bright",
      date: "05 August 2025",
      description: "Learn how to make the most of airline loyalty programs and frequent flyer miles. Get the best value from your travel.",
      image: "/blog/b2.svg",
      category: "flight-guides",
      readTime: "11 min read",
      content: "Airline loyalty programs can save you thousands of dollars if used strategically. Here's how to maximize your benefits..."
    }
  ];

  const filteredPosts = activeFilter === 'all' 
    ? blogPosts 
    : blogPosts.filter(post => post.category === activeFilter);

  const handleBackToFlights = () => {
    navigate('/flights');
  };

  return (
    <Container>
      {/* Header */}
      <Header currentPage="blogs" />


      <div className=''>
        {/* Blog Section */}
        <section className="mb-4">
          <div className="max-w-7xl mx-auto px-6 py-10">
            {/* Section Header */}
            <div className="text-center md:mb-12 mb-8">
              <p className="text-sm text-gray-500 uppercase tracking-wide mb-2">DISCOVER</p>
              <h1 className="md:text-4xl text-2xl font-bold text-gray-900 mb-4">Travel Blog & Guides</h1>
              <p className="md:text-lg text-base text-gray-600 max-w-3xl mx-auto">
                Our latest blog posts and travel guides
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center md:justify-center justify-start space-x-2 mb-12 overflow-x-auto pb-4">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-6 py-3 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
                    activeFilter === filter
                      ? 'bg-[#364A9C] text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 shadow-sm'
                  }`}
                >
                  {filter === 'all' ? 'All Posts' : 
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
              {filteredPosts.map((post) => (
                <BlogCard key={post.id} post={post} variant="default" />
              ))}
            </div>

            {/* No Results Message */}
            {filteredPosts.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No blog posts found</h3>
                <p className="text-gray-500">Try selecting a different category or check back later for new content.</p>
              </div>
            )}

          </div>
        </section>

       
      </div>
    </Container>
  );
};

export default BlogPage;
