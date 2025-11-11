import { useState, useMemo } from 'react';
import ProgressStepper from './ProgressStepper';
import { MultiCityFlightResultCard, OneWayFlightResultCard, RoundTripFlightResultCard } from './FlightResultCard';
import { Text } from '@mantine/core';
import { useNavigate } from 'react-router-dom';
import { useSearchContext } from '../../../../context';

// Helper function to get airport name from code
const getAirportName = (airportCode) => {
    const airportMap = {
        'KMJ': 'Kumamoto',
        'HND': 'Tokyo Haneda',
        'NRT': 'Tokyo Narita',
        'ADD': 'Addis Ababa',
        'COO': 'Cotonou',
        'CDG': 'Paris Charles de Gaulle',
        'ACC': 'Accra Kotoka',
        'ABJ': 'Abidjan Felix Houphouet Boigny'
    };
    return airportMap[airportCode] || airportCode;
};

// DTO function to transform API flight data to component format
const transformFlightData = (apiFlight, priceOption, index, tripType = 'oneway') => {
    if (!apiFlight.segments || apiFlight.segments.length === 0) {
        return null;
    }
    
    const firstSegment = apiFlight.segments[0];
    const lastSegment = apiFlight.segments[apiFlight.segments.length - 1];
    
    // Calculate total duration
    const totalDurationMs = apiFlight.segments.reduce((total, segment) => {
        const duration = segment.duration; // PT1H40M format
        const hours = parseInt(duration.match(/(\d+)H/)?.[1] || '0');
        const minutes = parseInt(duration.match(/(\d+)M/)?.[1] || '0');
        return total + (hours * 60 + minutes) * 60000; // Convert to milliseconds
    }, 0);
    
    const totalHours = Math.floor(totalDurationMs / (1000 * 60 * 60));
    const totalMinutes = Math.floor((totalDurationMs % (1000 * 60 * 60)) / (1000 * 60));
    const durationString = `${totalHours}h ${totalMinutes}m`;
    
    // Calculate stops (segments - 1)
    const stops = apiFlight.segments.length - 1;
    
    // Get airline logo from segment or use default
    const getAirlineLogo = (airline) => {
        if (airline?.logoUrl) {
            return airline.logoUrl;
        }
        const logoMap = {
            'JL': '/emirates.svg',
            'NH': '/emirates.svg', 
            'ET': '/emirates.svg',
            'GK': '/emirates.svg',
            'AF': '/emirates.svg',
            'QR': '/emirates.svg',
            'EK': '/emirates.svg',
            'PR': '/emirates.svg'
        };
        return logoMap[airline?.code] || '/emirates.svg';
    };
    
    // Get aircraft type
    const aircraftType = firstSegment.aircraft ? `${firstSegment.aircraft}` : 'n/a';
    
    // Determine flight type based on trip type
    const flightType = tripType === 'return' ? 'round-trip' : 
                      tripType === 'multicity' ? 'multi-city' : 'one-way';
    
    // For return trips, you might want to calculate return date
    // This is a simplified approach - you might need more complex logic
    const returnDate = tripType === 'return' ? 
        new Date(new Date(lastSegment.arrival.time).getTime() + 7 * 24 * 60 * 60 * 1000) : // Add 7 days as example
        null;
    
    return {
        id: `${index}-${priceOption.price.key || index}`,
        from: `${firstSegment.departure.origin || getAirportName(firstSegment.departure.airport)} (${firstSegment.departure.airport})`,
        fromCode: firstSegment.departure.airport,
        to: `${lastSegment.arrival.destination || getAirportName(lastSegment.arrival.airport)} (${lastSegment.arrival.airport})`,
        toCode: lastSegment.arrival.airport,
        airlineLogo: getAirlineLogo(firstSegment.airline),
        departure: new Date(firstSegment.departure.time),
        arrival: new Date(lastSegment.arrival.time),
        airline: apiFlight.airline || firstSegment.airline?.name || 'Unknown Airline',
        planeType: aircraftType,
        flightType: flightType,
        returnDate: returnDate,
        price: parseFloat(priceOption.price.total),
        duration: durationString,
        stops: stops,
        flightNumber: firstSegment.flightNumber,
        class: firstSegment.cabinClass || priceOption.flightCombinations?.uniformBrandName || 'Economy',
        segment: apiFlight.segments.map(seg => ({
            ...seg,
            airline: seg.airline?.name || seg.airline // Keep airline object or name
        })),
        bookingReference: priceOption.flightCombinations?.reference,
        currency: priceOption.price.currency,
        perPassenger: parseFloat(priceOption.price.perPassenger),
        // Additional fields for enhanced functionality
        segments: apiFlight.segments.map(seg => ({
            ...seg,
            airline: seg.airline?.name || seg.airline // Keep airline object or name
        })),
        totalSegments: apiFlight.segments.length,
        firstAirline: firstSegment.airline?.name || 'Unknown',
        firstAirlineCode: firstSegment.airline?.code || '',
        // Store all price options for this flight
        allPrices: apiFlight.prices || [],
        selectedPrice: priceOption,
        // Store baggage and cancellation info
        baggageLimit: priceOption.baggageLimit,
        cancelTicket: priceOption.cancelTicket,
        changeTicket: priceOption.changeTicket,
        brandName: priceOption.flightCombinations?.uniformBrandName || firstSegment.brandName || 'Economy'
    };
};

const SearchResults = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const navigate = useNavigate();
    const { results, searchData, filters } = useSearchContext();

    // Determine trip type from search data
    const tripType = searchData?.tripType || 'oneway';

    // Transform API results using DTO or fallback to mock data
    const rawFlightData = useMemo(() => {
        const flights = results?.results?.flights || results?.flights;
        if (flights) {
            console.log('Transforming API flight data:', flights);
            // Create one flight object per unique flight (segments), storing all price options
            const transformedFlights = [];
            flights.forEach((apiFlight, flightIndex) => {
                if (apiFlight.prices && apiFlight.prices.length > 0) {
                    // Use the first price as default, but store all prices
                    const defaultPrice = apiFlight.prices[0];
                    const transformed = transformFlightData(apiFlight, defaultPrice, flightIndex, tripType);
                    if (transformed) {
                        // Store all price options for dropdown
                        transformed.allPrices = apiFlight.prices;
                        transformed.selectedPriceIndex = 0;
                        transformedFlights.push(transformed);
                    }
                } else {
                    // Fallback if no prices array (shouldn't happen with new API)
                    const fallbackPrice = { price: { total: '0', currency: 'GHS', perPassenger: '0' } };
                    const transformed = transformFlightData(apiFlight, fallbackPrice, flightIndex, tripType);
                    if (transformed) {
                        transformed.allPrices = [fallbackPrice];
                        transformed.selectedPriceIndex = 0;
                        transformedFlights.push(transformed);
                    }
                }
            });
            return transformedFlights;
        }
        // Fallback to empty array
        return [];
    }, [results?.results?.flights, results?.flights, tripType]);

    // Filtering function
    const applyFilters = (flights, filterOptions) => {
        if (!filterOptions) return flights;

        return flights.filter(flight => {
            // Price filter
            if (filterOptions.priceRange) {
                const [minPrice, maxPrice] = filterOptions.priceRange;
                if (flight.price < minPrice || flight.price > maxPrice) {
                    return false;
                }
            }

            // Class filter
            if (filterOptions.selectedClass) {
                const flightClass = flight.class?.toLowerCase().replace(/\s+/g, '-');
                if (flightClass !== filterOptions.selectedClass) {
                    return false;
                }
            }

            // Airlines filter
            if (filterOptions.selectedAirlines && filterOptions.selectedAirlines.length > 0) {
                const flightAirline = flight.airline || flight.firstAirline;
                if (!filterOptions.selectedAirlines.some(airline => 
                    flightAirline.toLowerCase().includes(airline.toLowerCase())
                )) {
                    return false;
                }
            }

            // Stops filter
            if (filterOptions.selectedStops && filterOptions.selectedStops.length > 0) {
                const flightStops = flight.stops;
                let stopMatch = false;
                
                for (const stopFilter of filterOptions.selectedStops) {
                    if (stopFilter === 'direct' && flightStops === 0) {
                        stopMatch = true;
                        break;
                    } else if (stopFilter === '1-stop' && flightStops === 1) {
                        stopMatch = true;
                        break;
                    } else if (stopFilter === '1-plus-stops' && flightStops > 1) {
                        stopMatch = true;
                        break;
                    }
                }
                
                if (!stopMatch) {
                    return false;
                }
            }

            // Departure time filter
            if (filterOptions.departureTime) {
                const [minHour, maxHour] = filterOptions.departureTime;
                const departureHour = flight.departure.getHours() + (flight.departure.getMinutes() / 60);
                
                if (departureHour < minHour || departureHour > maxHour) {
                    return false;
                }
            }

            // Arrival time filter
            if (filterOptions.arrivalTime) {
                const [minHour, maxHour] = filterOptions.arrivalTime;
                const arrivalHour = flight.arrival.getHours() + (flight.arrival.getMinutes() / 60);
                
                if (arrivalHour < minHour || arrivalHour > maxHour) {
                    return false;
                }
            }

            // Journey time filter (total flight duration)
            if (filterOptions.journeyTime) {
                const [minHour, maxHour] = filterOptions.journeyTime;
                const durationParts = flight.duration.split(' ');
                const totalHours = parseInt(durationParts[0]) + (parseInt(durationParts[1]) / 60);
                
                if (totalHours < minHour || totalHours > maxHour) {
                    return false;
                }
            }

            return true;
        });
    };

    // Apply filters to flight data
    const flightData = useMemo(() => {
        return applyFilters(rawFlightData, filters);
    }, [rawFlightData, filters]);


    // Handle booking a flight
    const handleBookNow = (flight) => {
        console.log('=== BOOK NOW CLICKED ===');
        console.log('Booking flight:', flight);
        console.log('Search data (passenger info):', searchData);
        console.log('Attempting to navigate to /checkout');
        
        // Show alert to confirm click is working
        // alert('Book Now clicked! Navigating to checkout...');
        
        // // Create booking data object with both flight and passenger information
        const bookingData = {
            flight: flight,
            passengerInfo: {
                adults: searchData.passengers.adult || 1,
                children: searchData.passengers.children || 0,
                infants: searchData.passengers.infant || 0,
                totalPassengers: (searchData.passengers.adult || 1) + (searchData.passengers.children || 0) + (searchData.passengers.infant || 0)
            },
            // searchData: searchData // Store the complete search data for reference
        };
        
        // // Store booking data in sessionStorage
        try {
            sessionStorage.setItem('selectedFlight', JSON.stringify(bookingData));
            console.log('Booking data (flight + passenger info) stored in sessionStorage:', bookingData);
        } catch (error) {
            console.error('Error storing booking data:', error);
        }
        
        // // Use window.location.href for immediate navigation
        console.log('Using window.location.href for navigation');
        // window.location.href = '/checkout';
        // navigate('/');
        window.location.href = `/checkout?data=${encodeURIComponent(JSON.stringify(bookingData))}`;
        // navigate(`/checkout?data=${encodeURIComponent(JSON.stringify(bookingData))}`);

    };

    // Handle viewing flight details
    const handleViewDetails = (flight, isExpanded) => {
        console.log('Viewing details for flight:', flight, 'Expanded:', isExpanded);
    };

    return (
        <div className="w-full max-w-[875px] mx-auto">
            {/* Progress Stepper */}
            <div className="mb-8 md:inline-block hidden w-full">
                <ProgressStepper currentStep={currentStep} />
            </div>

            {/* Results Summary */}
            <div className="my-4 p-4 bg-gray-100 rounded-lg">
                <Text size="sm" color="dimmed">
                    {filters ? 
                        `Showing ${flightData.length} of ${rawFlightData.length} flights` : 
                        `Showing ${flightData.length} flights`
                    }
                </Text>
                {filters && flightData.length === 0 && rawFlightData.length > 0 && (
                    <Text size="sm" color="red" mt="xs">
                        No flights match your current filters. Try adjusting your search criteria.
                    </Text>
                )}
            </div>


            {/* Search Results */}
            <div className="space-y-6">
                {tripType === 'oneway' && flightData.map((flight, index) => (
                    <OneWayFlightResultCard
                        key={flight.id || index}
                        flight={flight}
                        onBookNow={handleBookNow}
                        onViewDetails={handleViewDetails}
                    />
                ))}

                {tripType === 'return' && flightData.map((flight, index) => (
                    <RoundTripFlightResultCard
                        key={flight.id || index}
                        flight={flight}
                        onBookNow={handleBookNow}
                        onViewDetails={handleViewDetails}
                    />
                ))}

                {tripType === 'multicity' && (
                    <MultiCityFlightResultCard
                        key="multicity"
                        flights={flightData}
                        onBookNow={handleBookNow}
                        onViewDetails={handleViewDetails}
                    />
                )}
            </div>


        </div>
    );
};

export default SearchResults;
