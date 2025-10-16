import { useState } from 'react';

const CountryRecommendations = () => {
    const [activeFilter, setActiveFilter] = useState('All');

    // Capitalize the first letter of each filter
    const filters = [
        'All', 'Asian', 'European', 'Middle East', 'Beach Paradise', 'Nature Retreats', 'Romantic Escapes', 'Cultural-Immersion', 'African', 'American'
    ];

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
            
            <div className="md:px-10 px-5 md:py-14 py-5 md:grid grid-cols-12 justify-center items-center gap-5 space-y-1 md:space-y-0">
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
                            {filters.map((filter) => (
                                <button
                                    key={filter}
                                    onClick={() => setActiveFilter(filter)}
                                    className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors flex-shrink-0 min-w-fit ${activeFilter === filter
                                            ? 'bg-[#364A9C] text-white'
                                            : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                                        }`}
                                >
                                    {filter}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="md:col-span-7">
                <div className="md:grid grid-cols-10 gap-4">
                    <div className="col-span-5 hidden md:block space-y-2">
                        <img className="w-full h-72 object-cover rounded-2xl" src="/country/c1.svg" />
                        <img className="w-full h-72 object-cover object-top rounded-2xl" src="/country/c7.svg" />
                    </div>
                    <div className="col-span-5">
                        <div className="gap-2 flex flex-col gap-2">
                            <div className="flex gap-2">
                                <img className="flex-1 w-32 object-cover rounded-2xl" src="/country/c3.svg" />
                                <img className="flex-1 w-32 object-cover rounded-2xl" src="/country/c5.svg" />
                            </div>
                            <div className="flex gap-2">
                                <img className="flex-1 w-32 object-cover rounded-2xl" src="/country/c4.svg" />
                                <img className="flex-1 w-32 object-cover rounded-2xl" src="/country/c3.svg" />
                            </div>
                        </div>
                        <div>
                            <img className="w-full h-72 mt-2 object-cover rounded-2xl" src="/country/c2.svg" />

                        </div>
                    </div>
                </div>
               
            </div>

        </div>
        </>
    );
};

export default CountryRecommendations;
