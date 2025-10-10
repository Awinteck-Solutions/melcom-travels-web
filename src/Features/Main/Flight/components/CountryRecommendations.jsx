import { useState } from 'react';

const CountryRecommendations = () => {
    const [activeFilter, setActiveFilter] = useState('all');

    // Capitalize the first letter of each filter
    const filters = [
        'All', 'Asian', 'European', 'Middle East', 'Beach Paradise', 'Nature Retreats', 'Romantic Escapes', 'Cultural-Immersion', 'African', 'American'
    ];

    return (
        <div class="md:px-10 px-5 md:py-14 py-5 md:grid grid-cols-12 justify-center items-center gap-5 space-y-1 md:space-y-0">
            <div class="md:col-span-5 justify-center items-start gap-4">
                <div class="text-center lg:text-left">
                    <div class="text-zinc-400 text-base font-normal leading-snug">DISCOVER</div>
                    <div class="md:w-10/12 justify-start text-black md:text-3xl text-xl font-semibold">Best Country Recommendation to Visit on 2025</div>
                </div>
                <p class="text-center md:text-left text-zinc-400 md:text-base text-sm font-normal  leading-snug">Explore our curated list of the best countries to visit in 2025 and discover incredible destinations waiting to be explored</p>
                <div className="flex gap-1 items-center mt-2 md:mt-0 justify-center md:justify-start space-x-2 mb-8 md:flex-wrap overflow-x-auto pb-4">
                    {filters.map((filter) => (
                        <button
                            key={filter}
                            onClick={() => setActiveFilter(filter)}
                            className={`px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${activeFilter === filter
                                    ? 'bg-[#364A9C] text-white'
                                    : 'bg-gray-50 text-gray-700 hover:bg-gray-100 border border-gray-200'
                                }`}
                        >
                            {filter}
                        </button>
                    ))}
                    {/* {filter} */}
                </div>
            </div>

            <div class="md:col-span-7">
                <div class="md:grid grid-cols-10 gap-4">
                    <div class="col-span-5 hidden md:block space-y-2">
                        <img class="w-full h-72 object-cover rounded-2xl" src="/country/c1.svg" />
                        <img class="w-full h-72 object-cover object-top rounded-2xl" src="/country/c7.svg" />
                    </div>
                    <div class="col-span-5">
                        <div class="gap-2 flex flex-col gap-2">
                            <div className="flex gap-2">
                                <img class="flex-1 w-32 object-cover rounded-2xl" src="/country/c3.svg" />
                                <img class="flex-1 w-32 object-cover rounded-2xl" src="/country/c5.svg" />
                            </div>
                            <div className="flex gap-2">
                                <img class="flex-1 w-32 object-cover rounded-2xl" src="/country/c4.svg" />
                                <img class="flex-1 w-32 object-cover rounded-2xl" src="/country/c3.svg" />
                            </div>
                        </div>
                        <div>
                            <img class="w-full h-72 mt-2 object-cover rounded-2xl" src="/country/c2.svg" />

                        </div>
                    </div>
                </div>
               
            </div>

        </div>
    );
};

export default CountryRecommendations;
