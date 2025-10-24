import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import BlogCard from '../../Blog/components/BlogCard';
import { getAllBlogs, getBlogCategories } from '../../Blog/services/Blog.services';
import { notifications } from '@mantine/notifications';
import { Loader } from '@mantine/core';

const Blogs = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [blogCategories, setBlogCategories] = useState([]);
  // Fetch blog categories from API - memoized to prevent recreation
  const fetchBlogCategories = useCallback(async () => {
    const response = await getBlogCategories();
    if (response.status) {
      setBlogCategories(response.data.data || []);
    }
  }, []);

  // Fetch blogs from API - memoized to prevent recreation
  const fetchBlogs = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await getAllBlogs();
      if (response.status) {
        setBlogs(response.data.data || []);
      } else {
        notifications.show({
          title: 'Error',
          message: response.message || 'Failed to load blogs',
          color: 'red',
          position: 'top-right',
        });
      }
    } catch (error) {
      console.error('Error fetching blogs:', error);
      notifications.show({
        title: 'Error',
        message: 'An unexpected error occurred while loading blogs',
        color: 'red',
        position: 'top-right',
      });
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBlogCategories();
    fetchBlogs();
  }, [fetchBlogCategories, fetchBlogs]);

  // Transform API data to match component expectations - memoized
  const transformBlogData = useCallback((apiBlog) => ({
    id: apiBlog.id,
    title: apiBlog.title,
    author: apiBlog.author,
    date: new Date(apiBlog.createdAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }),
    description: apiBlog.excerpt,
    image: apiBlog.imageUrl || "/blog/b1.svg", // fallback image
    category: apiBlog.category,
    readTime: `${apiBlog.readTime} min read`,
    content: apiBlog.content,
    views: apiBlog.views,
    likes: apiBlog.likes,
    tags: apiBlog.tags
  }), []);

  // Memoize blog posts transformation
  const blogPosts = useMemo(() => {
    return blogs.map(transformBlogData);
  }, [blogs, transformBlogData]);

  // Fallback mock data for development/testing - memoized
  const mockBlogPosts = useMemo(() => [
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
  ], []);

  // Memoize filtered posts computation
  const filteredPosts = useMemo(() => {
    return activeFilter === 'All'
      ? blogPosts 
      : blogPosts.filter(post => post.category === activeFilter);
  }, [activeFilter, blogPosts]);

  // Memoize display posts computation
  const displayPosts = useMemo(() => {
    return blogPosts.length > 0 
      ? filteredPosts 
      : mockBlogPosts.filter(post => 
          activeFilter === 'All' || post.category === activeFilter
        );
  }, [blogPosts.length, filteredPosts, mockBlogPosts, activeFilter]);

  // Memoize scroll container styles
  const scrollContainerStyles = useMemo(() => ({
    scrollbarWidth: 'none', 
    msOverflowStyle: 'none',
    WebkitOverflowScrolling: 'touch',
    scrollBehavior: 'smooth'
  }), []);

  // Memoize navigation handler
  const handleViewAllBlogs = useCallback(() => {
    navigate('/blogs');
  }, [navigate]);

  return (
    <>
      {/* Custom styles for scrollbar hiding */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
      
      <section className="py-16 bg-gray-50l">
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
        <div className="relative">
          {/* Fade effect for mobile scrolling */}
          <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-gray-50 to-transparent z-10 pointer-events-none md:hidden"></div>
          
          <div 
            className="flex items-center md:justify-center justify-start space-x-2 mb-8 overflow-x-auto pb-4 scrollbar-hide" 
            style={scrollContainerStyles}
          >
            <div className="flex items-center space-x-2 min-w-max px-4 md:px-0 py-2">
              <button
                onClick={() => setActiveFilter('All')}
                className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors flex-shrink-0 ${activeFilter === 'All'
                        ? 'bg-[#364A9C] text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                    }`}
              >
                All
              </button>

              {blogCategories.map((filter, index) => (
                <button
                  key={index}
                  onClick={() => setActiveFilter(filter.name)}
                  className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors flex-shrink-0 ${activeFilter === filter.name
                          ? 'bg-[#364A9C] text-white'
                          : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200'
                      }`}
                >
                  {filter.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Loading State */}
        {isLoading && (
          <div className="text-center py-12">
            <Loader color="blue" size="lg" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Loading blogs...</h3>
            <p className="text-gray-500">Please wait while we fetch the latest content.</p>
          </div>
        )}

        {/* Blog Post Cards */}
        {!isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-2">
            {displayPosts.map((post) => (
              <BlogCard key={post.id} post={post} variant="compact" />
            ))}
          </div>
        )}

        {/* No Results Message */}
        {!isLoading && displayPosts.length === 0 && (
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

        {/* View All Blogs Button */}
        <div className="text-center mt-12">
          <button 
            onClick={handleViewAllBlogs}
            className="px-8 py-3 border-2 border-[#364A9C] text-[#364A9C] rounded-lg font-medium hover:bg-[#364A9C] hover:text-white transition-colors"
          >
            View All Blogs
          </button>
        </div>
      </div>
    </section>
    </>
  );
};

export default React.memo(Blogs);
