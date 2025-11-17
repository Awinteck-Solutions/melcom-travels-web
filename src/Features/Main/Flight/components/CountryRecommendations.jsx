import { useState, useEffect } from 'react';
import { getCountryListCategories, getCountryListByCategory, getAllCountryList } from '../services/Flight.services';
import { notifications } from '@mantine/notifications';
import { Loader } from '@mantine/core';

const CountryRecommendations = () => {
    const [activeFilter, setActiveFilter] = useState(null); // null means "All"
    const [categories, setCategories] = useState([]);
    const [countryItems, setCountryItems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isLoadingItems, setIsLoadingItems] = useState(false);

    // Fetch categories on component mount
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await getCountryListCategories();
                if (response.status) {
                    // Filter only ACTIVE categories
                    const activeCategories = (response.data.data || []).filter(
                        cat => cat.status === 'ACTIVE'
                    );
                    setCategories(activeCategories);
                } else {
                    notifications.show({
                        title: 'Error',
                        message: response.message || 'Failed to load categories',
                        color: 'red',
                        position: 'top-right',
                    });
                }
            } catch (error) {
                console.error('Error fetching categories:', error);
                notifications.show({
                    title: 'Error',
                    message: 'Failed to load categories',
                    color: 'red',
                    position: 'top-right',
                });
            }
        };

        fetchCategories();
    }, []);

    // Fetch country items when filter changes
    useEffect(() => {
        const fetchCountryItems = async () => {
            setIsLoadingItems(true);
            try {
                let response;
                if (activeFilter) {
                    // Fetch items by category
                    response = await getCountryListByCategory(activeFilter);
                } else {
                    // Fetch all items
                    response = await getAllCountryList();
                }

                if (response.status) {
                    // Filter only ACTIVE items and sort by position
                    const items = (response.data.data || [])
                        .filter(item => item.status === 'ACTIVE')
                        .sort((a, b) => (a.position || 0) - (b.position || 0))
                        .map(item => ({
                            id: item._id,
                            url: item.url,
                            title: item.title,
                            position: item.position || 0,
                            category: typeof item.category === 'object' && item.category !== null
                                ? item.category.name
                                : item.category || 'Country'
                        }));
                    setCountryItems(items);
                } else {
                    notifications.show({
                        title: 'Error',
                        message: response.message || 'Failed to load country recommendations',
                        color: 'red',
                        position: 'top-right',
                    });
                }
            } catch (error) {
                console.error('Error fetching country items:', error);
                notifications.show({
                    title: 'Error',
                    message: 'Failed to load country recommendations',
                    color: 'red',
                    position: 'top-right',
                });
            } finally {
                setIsLoading(false);
                setIsLoadingItems(false);
            }
        };

        fetchCountryItems();
    }, [activeFilter]);

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

            <div className="max-w-7xl mx-auto md:px-10 px-1 md:py-14 py-5 md:grid grid-cols-12 justify-center items-center gap-5 space-y-1 md:space-y-0">
                <div className="md:col-span-5 justify-center items-start gap-4">
                    <div className="text-center lg:text-left">
                        <div className="text-zinc-400 text-base font-normal leading-snug">DISCOVER</div>
                        <div className="md:w-10/12 justify-start text-black md:text-3xl text-xl font-semibold">Best Country Recommendation to Visit on 2025</div>
                    </div>
                    <p className="text-center md:text-left text-zinc-400 md:text-base text-sm font-normal  leading-snug">Explore our curated list of the best countries to visit in 2025 and discover incredible destinations waiting to be explored</p>
                    <div className="relative">
                        {/* Fade effects for mobile scrolling */}
                        <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none md:hidden"></div>
                        <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none md:hidden"></div>

                        <div
                            className="flex gap-1 items-center mt-2 md:mt-0 justify-start space-x-2 mb-8 md:flex-wrap overflow-x-auto pb-4 scrollbar-hide"
                            style={{
                                scrollbarWidth: 'none',
                                msOverflowStyle: 'none',
                                WebkitOverflowScrolling: 'touch',
                                scrollBehavior: 'smooth',
                                minHeight: '48px'
                            }}
                        >
                            <div className="flex items-center space-x-2 min-w-max px-4 md:px-0 py-2 flex-nowrap">
                                {/* All button */}
                                <button
                                    onClick={() => setActiveFilter(null)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors flex-shrink-0 min-w-fit ${activeFilter === null
                                        ? 'bg-[#364A9C] text-white'
                                        : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                                        }`}
                                >
                                    All
                                </button>
                                
                                {/* Category buttons */}
                                {categories.map((category) => (
                                    <button
                                        key={category._id}
                                        onClick={() => setActiveFilter(category._id)}
                                        className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors flex-shrink-0 min-w-fit ${activeFilter === category._id
                                            ? 'bg-[#364A9C] text-white'
                                            : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                                            }`}
                                    >
                                        {category.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="md:col-span-7">
                    {isLoading ? (
                        <div className="text-center py-12">
                            <Loader color="#364A9C" size="lg" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2 mt-4">Loading recommendations...</h3>
                        </div>
                    ) : (
                        <>
                            {isLoadingItems && (
                                <div className="text-center py-8">
                                    <Loader color="#364A9C" size="md" />
                                </div>
                            )}
                            
                            {!isLoadingItems && countryItems.length > 0 && (
                                <div className="md:grid grid-cols-10 gap-4">
                                    {/* Left Column - 2 Large Images */}
                                    <div className="col-span-5 hidden md:block space-y-2">
                                        {/* Position 1 */}
                                        <div className="relative group">
                                            <img
                                                className="w-full h-72 object-cover rounded-2xl border-2 border-gray-200"
                                                src={countryItems.find(country => country.position === 1)?.url || 'https://cdn.pixabay.com/photo/2017/02/16/02/54/coming-soon-2070393_1280.jpg'}
                                                alt={`${countryItems.find(country => country.position === 1)?.title || 'Country'} - Image 1`}
                                                onError={(e) => {
                                                    e.target.src = 'https://cdn.pixabay.com/photo/2017/02/16/02/54/coming-soon-2070393_1280.jpg';
                                                }}
                                            />
                                        </div>
                                        
                                        {/* Position 2 */}
                                        <div className="relative group">
                                            <img
                                                className="w-full h-72 object-cover object-top rounded-2xl border-2 border-gray-200"
                                                src={countryItems.find(country => country.position === 2)?.url || 'https://cdn.pixabay.com/photo/2017/02/16/02/54/coming-soon-2070393_1280.jpg'}
                                                alt={`${countryItems.find(country => country.position === 2)?.title || 'Country'} - Image 2`}
                                                onError={(e) => {
                                                    e.target.src = 'https://cdn.pixabay.com/photo/2017/02/16/02/54/coming-soon-2070393_1280.jpg';
                                                }}
                                            />
                                        </div>
                                    </div>

                                    {/* Right Column - 5 Images */}
                                    <div className="col-span-5">
                                        {/* Top 2x2 Grid */}
                                        <div className="gap-2 flex flex-col gap-2">
                                            {/* First row - positions 3 and 4 */}
                                            <div className="flex gap-2">
                                                {/* Position 3 */}
                                                <div className="relative group flex-1">
                                                    <img
                                                        className="w-full h-32 object-cover rounded-2xl border-2 border-gray-200"
                                                        src={countryItems.find(country => country.position === 3)?.url || 'https://cdn.pixabay.com/photo/2017/02/16/02/54/coming-soon-2070393_1280.jpg'}
                                                        alt={`${countryItems.find(country => country.position === 3)?.title || 'Country'} - Image 3`}
                                                        onError={(e) => {
                                                            e.target.src = 'https://cdn.pixabay.com/photo/2017/02/16/02/54/coming-soon-2070393_1280.jpg';
                                                        }}
                                                    />
                                                </div>
                                                
                                                {/* Position 4 */}
                                                <div className="relative group flex-1">
                                                    <img
                                                        className="w-full h-32 object-cover rounded-2xl border-2 border-gray-200"
                                                        src={countryItems.find(country => country.position === 4)?.url || 'https://cdn.pixabay.com/photo/2017/02/16/02/54/coming-soon-2070393_1280.jpg'}
                                                        alt={`${countryItems.find(country => country.position === 4)?.title || 'Country'} - Image 4`}
                                                        onError={(e) => {
                                                            e.target.src = 'https://cdn.pixabay.com/photo/2017/02/16/02/54/coming-soon-2070393_1280.jpg';
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                            
                                            {/* Second row - positions 5 and 6 */}
                                            <div className="flex gap-2">
                                                {/* Position 5 */}
                                                <div className="relative group flex-1">
                                                    <img
                                                        className="w-full h-32 object-cover rounded-2xl border-2 border-gray-200"
                                                        src={countryItems.find(country => country.position === 5)?.url || 'https://cdn.pixabay.com/photo/2017/02/16/02/54/coming-soon-2070393_1280.jpg'}
                                                        alt={`${countryItems.find(country => country.position === 5)?.title || 'Country'} - Image 5`}
                                                        onError={(e) => {
                                                            e.target.src = 'https://cdn.pixabay.com/photo/2017/02/16/02/54/coming-soon-2070393_1280.jpg';
                                                        }}
                                                    />
                                                </div>
                                                
                                                {/* Position 6 */}
                                                <div className="relative group flex-1">
                                                    <img
                                                        className="w-full h-32 object-cover rounded-2xl border-2 border-gray-200"
                                                        src={countryItems.find(country => country.position === 6)?.url || 'https://cdn.pixabay.com/photo/2017/02/16/02/54/coming-soon-2070393_1280.jpg'}
                                                        alt={`${countryItems.find(country => country.position === 6)?.title || 'Country'} - Image 6`}
                                                        onError={(e) => {
                                                            e.target.src = 'https://cdn.pixabay.com/photo/2017/02/16/02/54/coming-soon-2070393_1280.jpg';
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        {/* Bottom Large Image - Position 7 */}
                                        <div className="relative group mt-2">
                                            <img
                                                className="w-full h-72 object-cover rounded-2xl border-2 border-gray-200"
                                                src={countryItems.find(country => country.position === 7)?.url || 'https://cdn.pixabay.com/photo/2017/02/16/02/54/coming-soon-2070393_1280.jpg'}
                                                alt={`${countryItems.find(country => country.position === 7)?.title || 'Country'} - Image 7`}
                                                onError={(e) => {
                                                    e.target.src = 'https://cdn.pixabay.com/photo/2017/02/16/02/54/coming-soon-2070393_1280.jpg';
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}

                            {/* No Results Message */}
                            {!isLoadingItems && countryItems.length === 0 && (
                                <div className="text-center py-12">
                                    <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-lg font-medium text-gray-900 mb-2">No recommendations found</h3>
                                    <p className="text-gray-500">Try selecting a different category or check back later.</p>
                                </div>
                            )}
                        </>
                    )}
                </div>

            </div>
        </>
    );
};

export default CountryRecommendations;
