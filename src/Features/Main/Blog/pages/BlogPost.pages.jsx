import Header from '../../../../components/Header';
import { useGlobalContext } from '../../../../context';
import Container from '../../../../components/Container';
import BlogCard from '../components/BlogCard';
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const BlogPostPage = () => {
  const { blogId } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useGlobalContext();
  const [showShareMenu, setShowShareMenu] = useState(false);

  // Mock blog data - in real app, this would come from API
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

  const currentPost = blogPosts.find(post => post.id === parseInt(blogId)) || blogPosts[0];

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
        {/* Blog Post Content */}
        <article className="max-w-4xl mx-auto px-6">
          {/* Article Header */}
          <header className="md:mb-8">
            <h1 className="md:text-3xl text-lg font-bold text-gray-900 mb-3 leading-tight">
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
                  <div className="absolute top-full left-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 min-w-48">
                    <button
                      onClick={() => handleShare('facebook')}
                      className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center"
                    >
                      <span className="mr-2">📘</span> Facebook
                    </button>
                    <button
                      onClick={() => handleShare('twitter')}
                      className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center"
                    >
                      <span className="mr-2">🐦</span> Twitter
                    </button>
                    <button
                      onClick={() => handleShare('linkedin')}
                      className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center"
                    >
                      <span className="mr-2">💼</span> LinkedIn
                    </button>
                    <button
                      onClick={() => handleShare('copy')}
                      className="w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center"
                    >
                      <span className="mr-2">📋</span> Copy Link
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
        <section className="mt-16 py-12">
          <div className="max-w-7xl mx-auto px-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Related Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {blogPosts
                .filter(post => post.id !== currentPost.id)
                .slice(0, 3)
                .map((post) => (
                  <BlogCard key={post.id} post={post} variant="related" />
                ))}
            </div>
          </div>
        </section>
      </div>
    </Container>
  );
};

export default BlogPostPage;
