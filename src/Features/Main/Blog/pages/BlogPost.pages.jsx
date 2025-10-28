import Header from '../../../../components/Header';
import { useGlobalContext } from '../../../../context';
import Container from '../../../../components/Container';
import BlogCard from '../components/BlogCard';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getBlogById } from '../services/Blog.services';
import { notifications } from '@mantine/notifications';

const BlogPostPage = () => {
  const { blogId } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useGlobalContext();
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [blogPost, setBlogPost] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [similarBlogs, setSimilarBlogs] = useState([]);

  const transformBlogData = (apiBlog) => ({
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
  });
  // Fetch blog post from API
  const fetchBlogPost = async () => {
    if (!blogId) return;

    setIsLoading(true);
    try {
      const response = await getBlogById(blogId);
      console.log('first', response.data.similar)
      if (response.status) {
        const apiBlog = response.data.data;
        setSimilarBlogs(response.data.similar);
        // Transform API data to match component expectations
        const transformedBlog = {
          id: apiBlog.id,
          title: apiBlog.title,
          author: apiBlog.author,
          date: new Date(apiBlog.createdAt).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
          }),
          description: apiBlog.excerpt,
          image: apiBlog.imageUrl || "/blog/b1.svg",
          category: apiBlog.category,
          readTime: `${apiBlog.readTime} min read`,
          content: apiBlog.content,
          views: apiBlog.views,
          likes: apiBlog.likes,
          tags: apiBlog.tags
        };
        setBlogPost(transformedBlog);
      } else {
        notifications.show({
          title: 'Error',
          message: response.message || 'Failed to load blog post',
          color: 'red',
          position: 'top-right',
        });
        navigate('/blogs'); // Redirect to blogs page if blog not found
      }
    } catch (error) {
      console.error('Error fetching blog post:', error);
      notifications.show({
        title: 'Error',
        message: 'An unexpected error occurred while loading the blog post',
        color: 'red',
        position: 'top-right',
      });
      navigate('/blogs'); // Redirect to blogs page on error
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogPost();
  }, [blogId]);

  // Mock blog data - fallback for development/testing
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
      content: `
       <p>Fall is the perfect time to explore new destinations without the summer crowds and high prices. The weather is still pleasant, and you'll find better deals on flights and accommodations. Here are our top picks for budget-friendly fall travel destinations that offer incredible value and unforgettable experiences.</p>
        
        <h2>1. Prague, Czech Republic</h2>
        <p>Prague transforms into a magical wonderland during fall, with golden leaves covering the historic streets and fewer tourists crowding the famous Charles Bridge. The city offers excellent value for money, with affordable accommodations and delicious local cuisine.</p>
       <h2>2. Lisbon, Portugal</h2>
        <p>Portugal's capital city is a hidden gem that becomes even more charming in the fall months. Enjoy mild weather perfect for exploring the historic neighborhoods, tasting pastéis de nata, and taking in the stunning views from the city's many miradouros.</p>
        
        <h2>3. Budapest, Hungary</h2>
        <p>This beautiful city on the Danube offers incredible value with its thermal baths, historic architecture, and vibrant food scene. Fall brings comfortable temperatures for walking tours and outdoor activities.</p>
        
        <h2>4. Krakow, Poland</h2>
        <p>Krakow's medieval charm is enhanced by the autumn colors, and the city offers some of the best value in Europe. From the historic Old Town to the nearby Wieliczka Salt Mine, there's plenty to explore without breaking the bank.</p>
        
        <h2>5. Porto, Portugal</h2>
        <p>Portugal's second city is perfect for fall travel, offering wine tastings, river cruises, and stunning architecture at budget-friendly prices. The weather is ideal for exploring the colorful Ribeira district.</p>
        
        <h2>Tips for Fall Travel</h2>
        <ul>
          <li>Book flights 6-8 weeks in advance for the best deals</li>
          <li>Consider shoulder season for even better prices</li>
          <li>Pack layers for changing weather conditions</li>
          <li>Research local festivals and events</li>
          <li>Take advantage of off-season hotel rates</li>
        </ul>
        
        <p>These destinations offer the perfect combination of affordability, beauty, and cultural experiences that make fall travel truly special. Start planning your autumn adventure today!</p>
      `
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
      content: `
        <p>Short flights mean more time at your destination. These carefully selected locations offer the perfect balance of travel time and experience, making them ideal for weekend getaways when you want to maximize your time away from home.</p>
        
        <h2>European Weekend Escapes</h2>
        <p>From major European cities, you can reach incredible destinations in under 3 hours, making weekend trips not just possible but enjoyable.</p>
        
        <h2>1. Barcelona, Spain</h2>
        <p>Just 2 hours from most European capitals, Barcelona offers world-class architecture, beautiful beaches, and incredible food. Perfect for a weekend of culture and relaxation.</p>
        
        <h2>2. Amsterdam, Netherlands</h2>
        <p>This charming city is easily accessible and offers canal cruises, world-class museums, and a unique cycling culture that's perfect for weekend exploration.</p>
        
        <h2>3. Rome, Italy</h2>
        <p>The Eternal City is always worth a visit, and a weekend is perfect for hitting the major highlights while enjoying authentic Italian cuisine.</p>
        
        <h2>Planning Your Weekend Getaway</h2>
        <ul>
          <li>Book early morning flights to maximize your time</li>
          <li>Choose accommodations in the city center</li>
          <li>Plan your must-see attractions in advance</li>
          <li>Consider city passes for attractions</li>
          <li>Leave some time for spontaneous exploration</li>
        </ul>
      `
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
      content: `
        <p>From packing efficiently to finding the best deals, these travel hacks will transform your flying experience and save you both time and money. Whether you're a frequent flyer or planning your first trip, these tips will make your journey smoother.</p>
        
        <h2>1. Use Incognito Mode for Flight Searches</h2>
        <p>Airlines and booking sites often track your searches and may increase prices based on your interest. Always search for flights in incognito or private browsing mode to get the best prices.</p>
        
        <h2>2. Pack a Portable Phone Charger</h2>
        <p>Airport charging stations are often unreliable or crowded. A portable charger ensures your devices stay powered throughout your journey.</p>
        
        <h2>3. Download Offline Maps</h2>
        <p>Before you travel, download offline maps of your destination. This saves data and ensures you can navigate even without internet connection.</p>
        
        <h2>4. Bring an Empty Water Bottle</h2>
        <p>Save money and stay hydrated by bringing an empty water bottle through security and filling it up at water fountains in the terminal.</p>
        
        <h2>5. Use Airline Apps for Everything</h2>
        <p>Most airlines offer mobile check-in, boarding passes, and real-time flight updates through their apps. This can save time and keep you informed.</p>
        
        <h2>6. Pack Smart with Compression Bags</h2>
        <p>Compression bags can significantly reduce the space your clothes take up, allowing you to pack more or use a smaller bag.</p>
        
        <h2>7. Book Tuesday Flights</h2>
        <p>Historically, Tuesday flights tend to be cheaper than weekend flights. If your schedule allows, consider mid-week travel.</p>
        
        <h2>8. Join Airline Loyalty Programs</h2>
        <p>Even if you don't fly frequently, joining loyalty programs can provide benefits like free checked bags, priority boarding, and access to lounges.</p>
        
        <h2>9. Check Multiple Booking Sites</h2>
        <p>Don't rely on just one booking site. Compare prices across multiple platforms to ensure you're getting the best deal.</p>
        
        <h2>10. Pack Essential Items in Carry-On</h2>
        <p>Always pack a change of clothes, essential medications, and important documents in your carry-on in case your checked bag is delayed or lost.</p>
      `
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
      content: `
        <p>Choosing between direct and connecting flights can significantly impact your travel experience and budget. Here's what you need to know to make the best decision for your trip.</p>
        
        <h2>When to Choose Direct Flights</h2>
        <p>Direct flights are ideal when time is more valuable than money, or when you're traveling with children or elderly passengers who might find layovers challenging.</p>
        
        <h2>When Connecting Flights Make Sense</h2>
        <p>Connecting flights can save significant money, especially on international routes. They also offer opportunities to explore additional destinations.</p>
        
        <h2>Factors to Consider</h2>
        <ul>
          <li>Total travel time vs. cost savings</li>
          <li>Layover duration and airport quality</li>
          <li>Baggage handling and security</li>
          <li>Risk of missed connections</li>
          <li>Personal comfort and preferences</li>
        </ul>
        
        <h2>Tips for Connecting Flights</h2>
        <p>If you choose connecting flights, ensure you have adequate layover time, especially for international connections. Consider the quality of the connecting airport and available amenities.</p>
      `
    }
  ];

  const similarPosts = similarBlogs.map(transformBlogData);
  // Use API data if available, otherwise fallback to mock data
  const currentPost = blogPost || blogPosts.find(post => post.id === parseInt(blogId)) || blogPosts[0];

  const handleBackToBlog = () => {
    navigate('/blogs');
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const title = currentPost.title;

    switch (platform) {
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        alert('Link copied to clipboard!');
        break;
    }
    setShowShareMenu(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0, 'smooth', 'top');
  }, []);

  return (
    <Container>
      {/* Header */}
      <Header currentPage="blogs" />

      <div className=''>
        {/* Loading State */}
        {isLoading && (
          <div className="max-w-4xl mx-auto md:px-6 px-1 py-12">
            <div className="text-center">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-gray-900 mb-2">Loading blog post...</h3>
              <p className="text-gray-500">Please wait while we fetch the content.</p>
            </div>
          </div>
        )}

        {/* Blog Post Content */}
        {!isLoading && (
          <>
            <article className="max-w-4xl mx-auto md:px-6 px-1">
              {/* Article Header */}
              <header className="md:mb-8 ">
                <h1 className="md:text-3xl text-xl font-bold text-gray-900 mb-3 md:mt-5 mt-8 md:text-left text-centerl leading-tight">
                  {currentPost.title}
                </h1>

                <div className="flex flex-wrap items-center justify-between gap-4 text-gray-600 mb-6">
                  <div className='flex items-center gap-4'>
                    <div className="flex items-center">
                      <div>
                        <p className="text-sm text-gray-500">{currentPost.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center text-sm">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      {currentPost.readTime}
                    </div>
                  </div>
                  {/* Share Button */}
                  <div className="relative">
                    <button
                      onClick={() => setShowShareMenu(!showShareMenu)}
                      className="flex items-center px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                      </svg>
                      Share
                    </button>

                    {showShareMenu && (
                      <div className="absolute top-full md:left-0 right-0 mx-auto md:left-auto md:right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-36 font-semibold">
                        <button
                          onClick={() => handleShare('facebook')}
                          className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256"><path fill="#1877F2" d="M256 128C256 57.308 198.692 0 128 0S0 57.308 0 128c0 63.888 46.808 116.843 108 126.445V165H75.5v-37H108V99.8c0-32.08 19.11-49.8 48.348-49.8C170.352 50 185 52.5 185 52.5V84h-16.14C152.959 84 148 93.867 148 103.99V128h35.5l-5.675 37H148v89.445c61.192-9.602 108-62.556 108-126.445"/><path fill="#FFF" d="m177.825 165l5.675-37H148v-24.01C148 93.866 152.959 84 168.86 84H185V52.5S170.352 50 156.347 50C127.11 50 108 67.72 108 99.8V128H75.5v37H108v89.445A129 129 0 0 0 128 256a129 129 0 0 0 20-1.555V165z"/></svg>
                          <span>Facebook</span>
                        </button>
                        <button
                          onClick={() => handleShare('twitter')}
                          className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256"><g fill="none"><rect width="256" height="256" fill="#fff" rx="60"/><rect width="256" height="256" fill="#1D9BF0" rx="60"/><path fill="#fff" d="M199.572 91.411c.11 1.587.11 3.174.11 4.776c0 48.797-37.148 105.075-105.075 105.075v-.03A104.54 104.54 0 0 1 38 184.677q4.379.525 8.79.533a74.15 74.15 0 0 0 45.865-15.839a36.98 36.98 0 0 1-34.501-25.645a36.8 36.8 0 0 0 16.672-.636c-17.228-3.481-29.623-18.618-29.623-36.198v-.468a36.7 36.7 0 0 0 16.76 4.622c-16.226-10.845-21.228-32.432-11.43-49.31a104.8 104.8 0 0 0 76.111 38.582a36.95 36.95 0 0 1 10.683-35.283c14.874-13.982 38.267-13.265 52.249 1.601a74.1 74.1 0 0 0 23.451-8.965a37.06 37.06 0 0 1-16.234 20.424A73.5 73.5 0 0 0 218 72.282a75 75 0 0 1-18.428 19.13"/></g></svg>
                          <span>Twitter</span>
                        </button>
                        <button
                          onClick={() => handleShare('linkedin')}
                          className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center gap-2"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 256 256"><g fill="none"><rect width="256" height="256" fill="#fff" rx="60"/><rect width="256" height="256" fill="#0A66C2" rx="60"/><path fill="#fff" d="M184.715 217.685h29.27a4 4 0 0 0 4-3.999l.015-61.842c0-32.323-6.965-57.168-44.738-57.168c-14.359-.534-27.9 6.868-35.207 19.228a.32.32 0 0 1-.595-.161V101.66a4 4 0 0 0-4-4h-27.777a4 4 0 0 0-4 4v112.02a4 4 0 0 0 4 4h29.268a4 4 0 0 0 4-4v-55.373c0-15.657 2.97-30.82 22.381-30.82c19.135 0 19.383 17.916 19.383 31.834v54.364a4 4 0 0 0 4 4M38 59.628c0 11.864 9.767 21.626 21.632 21.626c11.862-.001 21.623-9.769 21.623-21.631C81.253 47.761 71.491 38 59.628 38C47.762 38 38 47.763 38 59.627m6.959 158.058h29.307a4 4 0 0 0 4-4V101.66a4 4 0 0 0-4-4H44.959a4 4 0 0 0-4 4v112.025a4 4 0 0 0 4 4"/></g></svg>
                          <span>LinkedIn</span>
                        </button>
                        <button
                          onClick={() => handleShare('copy')}
                          className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center"
                        >
                          <span className="mr-2">🔗</span> Copy Link
                        </button>
                      </div>
                    )}
                  </div>
                </div>


              </header>

              {/* Featured Image */}
              <div className="mb-8">
                <img
                  src={currentPost.image}
                  alt={currentPost.title}
                  className="w-full h-64 md:h-96 object-cover rounded-xl shadow-lg"
                />
              </div>

              {/* Article Content */}
              <div className="max-w-none">
                <div
                  className="text-gray-700 leading-relaxed [&>h1]:text-3xl [&>h1]:font-bold [&>h1]:text-gray-900 [&>h1]:mb-6 [&>h1]:mt-8 [&>h2]:text-2xl [&>h2]:font-bold [&>h2]:text-gray-900 [&>h2]:mb-4 [&>h2]:mt-8 [&>h3]:text-xl [&>h3]:font-bold [&>h3]:text-gray-900 [&>h3]:mb-3 [&>h3]:mt-6 [&>p]:text-gray-700 [&>p]:mb-4 [&>p]:leading-relaxed [&>strong]:text-gray-900 [&>strong]:font-semibold [&>ul]:my-4 [&>ul]:pl-6 [&>li]:text-gray-700 [&>li]:mb-2 [&>li]:list-disc [&>ol]:my-4 [&>ol]:pl-6 [&>ol>li]:text-gray-700 [&>ol>li]:mb-2 [&>ol>li]:list-decimal"
                  dangerouslySetInnerHTML={{ __html: currentPost.content }}
                />
              </div>
            </article>

            {/* Related Articles */}
            <section className="md:my-16 mt-5 md:py-12 py-8 bg-gray-50 rounded-xl">
              <div className="max-w-7xl mx-auto md:px-6 px-1">
                <h2 className="md:text-3xl text-xl font-bold text-gray-900 text-center mb-2">Related Articles</h2>
                <div className="flex items-center md:justify-center justify-start space-x-2 mb-12l overflow-x-auto pb-4 scrollbar-hide" 
                 style={{ 
                  scrollbarWidth: 'none', 
                  msOverflowStyle: 'none',
                  WebkitOverflowScrolling: 'touch',
                  scrollBehavior: 'smooth'
              }}>
                  <div className="flex items-center space-x-2 min-w-max px-4 md:px-0 py-2">
                    {similarPosts
                      .map((post, index) => (
                        <BlogCard key={index} post={post} variant="related" />
                      ))}
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
      </div>
    </Container>
  );
};

export default BlogPostPage;
