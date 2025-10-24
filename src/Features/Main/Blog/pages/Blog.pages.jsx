import Header from '../../../../components/Header';
import { useGlobalContext } from '../../../../context';
import Container from '../../../../components/Container';
import BlogCard from '../components/BlogCard';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllBlogs, getBlogCategories } from '../services/Blog.services';
import { notifications } from '@mantine/notifications';
import { Loader } from '@mantine/core';
import { ScrollAnimation, StaggeredScrollAnimation } from '../../../../components/animations';

const BlogPage = () => {
    const { isAuthenticated, user } = useGlobalContext();
    const navigate = useNavigate();
    const [activeFilter, setActiveFilter] = useState('All');
    const [blogs, setBlogs] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [blogCategories, setBlogCategories] = useState([]);
    // fetch blog categories from API
    const fetchBlogCategories = async () => {
        const response = await getBlogCategories();
        console.log('first', response.data.data)
        if (response.status) {
            setBlogCategories(response.data.data || []);
        }
    };

    const filters = [
        'all', 'travel-tips', 'destinations', 'budget-travel', 'weekend-getaways', 'travel-hacks', 'flight-guides'
    ];

    // Fetch blogs from API
    const fetchBlogs = async () => {
        setIsLoading(true);
        try {
            const response = await getAllBlogs();
            console.log('response', response.data.data)
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
    };

    useEffect(() => {
        fetchBlogCategories();
        fetchBlogs();
    }, []);

    // Transform API data to match component expectations
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

    const blogPosts = blogs.map(transformBlogData);

    const filteredPosts = activeFilter === 'All'
        ? blogPosts
        : blogPosts.filter(post => post.category === activeFilter);


    const handleBackToFlights = () => {
        navigate('/flights');
    };

    return (
        <Container>
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
            
            {/* Header */}
            <Header currentPage="blogs" />
            <div className=''>
                {/* Blog Section */}
                <section className="mb-4">
                    <div className="max-w-7xl mx-auto px-6 py-10">
                        {/* Section Header */}
                        <ScrollAnimation animation="fadeUp">
                            <div className="text-center md:mb-12 mb-8">
                                <p className="text-sm text-gray-500 uppercase tracking-wide mb-2">DISCOVER</p>
                                <h1 className="md:text-4xl text-2xl font-bold text-gray-900 mb-4">Travel Blog & Guides</h1>
                                <p className="md:text-lg text-base text-gray-600 max-w-3xl mx-auto">
                                    Our latest blog posts and travel guides
                                </p>
                            </div>
                        </ScrollAnimation>

                        {/* Filter Tabs */}
                        <ScrollAnimation animation="slideLeft">
                            <div className="relative">
                            {/* Fade effect for mobile scrolling */}
                            <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none md:hidden"></div>
                            
                            <div 
                                className="flex items-center md:justify-center justify-start space-x-2 mb-12 overflow-x-auto pb-4 scrollbar-hide" 
                                style={{ 
                                    scrollbarWidth: 'none', 
                                    msOverflowStyle: 'none',
                                    WebkitOverflowScrolling: 'touch',
                                    scrollBehavior: 'smooth'
                                }}
                            >
                            <div className="flex items-center space-x-2 min-w-max px-4 md:px-0 py-2">
                                <button
                                    onClick={() => setActiveFilter('All')}
                                    className={`px-6 py-3 rounded-full text-sm font-medium whitespace-nowrap transition-colors flex-shrink-0 ${activeFilter === 'All'
                                            ? 'bg-[#364A9C] text-white shadow-lg'
                                            : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 shadow-sm'
                                        }`}
                                >
                                    All Posts
                                </button>

                                {blogCategories.map((filter, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setActiveFilter(filter.name)}
                                        className={`px-6 py-3 rounded-full text-sm font-medium whitespace-nowrap transition-colors flex-shrink-0 ${activeFilter === filter.name
                                                ? 'bg-[#364A9C] text-white shadow-lg'
                                                : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-200 shadow-sm'
                                            }`}
                                    >
                                        {filter.name}
                                    </button>
                                ))}
                            </div>
                            </div>
                            </div>
                        </ScrollAnimation>

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
                            <StaggeredScrollAnimation delay={0.1}>
                                <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-2">
                                    {filteredPosts.map((post) => (
                                        <BlogCard key={post.id} post={post} variant="default" />
                                    ))}
                                </div>
                            </StaggeredScrollAnimation>
                        )}

                        {/* No Results Message */}
                        {!isLoading && filteredPosts.length === 0 && (
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
