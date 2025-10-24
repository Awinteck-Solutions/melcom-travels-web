import { useState, useEffect } from 'react';
import { useSearchContext } from '../../../../context';
import { Button, Card, Text, Group, Badge, Stack, Grid, Loader, Alert } from '@mantine/core';
import { IconPlane, IconClock, IconUsers, IconMapPin, IconCalendar } from '@tabler/icons-react';
import { 
  LoadingSpinner, 
  FlightCardSkeleton, 
  StaggerContainer,
  StaggerItem,
  AnimatedDiv,
  fadeInUp
} from '../../../../components/animations';

const FlightResults = () => {
    const { searchData, results, loading, error, setResults, setError } = useSearchContext();
    const [mockResults, setMockResults] = useState([]);

    // Debug logging
    console.log('FlightResults - searchData:', searchData);
    console.log('FlightResults - results:', results);
    console.log('FlightResults - loading:', loading);
    console.log('FlightResults - error:', error);

    // Generate mock flight results based on search data
    useEffect(() => {
        if (searchData && !results) {
            // Simulate API call delay
            const timer = setTimeout(() => {
                const mockFlights = generateMockResults(searchData);
                setResults(mockFlights);
            }, 2000);

            return () => clearTimeout(timer);
        }
    }, [searchData, results, setResults]);

    const generateMockResults = (searchData) => {
        const airlines = [
            'Emirates', 'British Airways', 'Lufthansa', 'KLM', 'Air France', 
            'Turkish Airlines', 'Emirate Airline', 'RwandaAir', 'EgyptAir', 
            'Kenya Airways', 'Qatar Airways', 'Air Force', 'Royal Air Maroc'
        ];
        const flightResults = [];

        if (searchData?.searchType === 'multicity' && searchData?.multiCityItems?.length > 0) {
            // Generate results for multi-city search
            searchData.multiCityItems.forEach((item, index) => {
                for (let i = 0; i < 3; i++) {
                    const airline = airlines[Math.floor(Math.random() * airlines.length)];
                    const departure = new Date(item.dateValue);
                    const departureHour = Math.floor(Math.random() * 12) + 6; // 6 AM to 6 PM
                    const departureMinute = Math.floor(Math.random() * 60);
                    departure.setHours(departureHour, departureMinute, 0, 0);

                    const flightDurationHours = Math.floor(Math.random() * 8) + 2; // 2-10 hours
                    const flightDurationMinutes = Math.floor(Math.random() * 60);
                    const arrival = new Date(departure.getTime() + (flightDurationHours * 60 + flightDurationMinutes) * 60000);

                    flightResults.push({
                        id: `${index}-${i}`,
                        from: item.fromLocation,
                        to: item.toLocation,
                        departure: departure,
                        arrival: arrival,
                        airline: airline,
                        price: Math.floor(Math.random() * 800) + 200, // 200-1000
                        duration: `${flightDurationHours}h ${flightDurationMinutes}m`,
                        stops: Math.floor(Math.random() * 3),
                        flightNumber: `${airline.substring(0, 2).toUpperCase()}${Math.floor(Math.random() * 9000) + 1000}`,
                        segment: index + 1
                    });
                }
            });
        } else {
            // Generate results for one-way or round-trip
            const from = searchData?.fromLocation || searchData?.from || 'Unknown';
            const to = searchData?.toLocation || searchData?.to || 'Unknown';
            const departure = searchData?.dateValue || searchData?.departureDate || new Date();

            for (let i = 0; i < 12; i++) {
                const airline = airlines[Math.floor(Math.random() * airlines.length)];
                const departureDate = new Date(departure);
                const departureHour = Math.floor(Math.random() * 12) + 6; // 6 AM to 6 PM
                const departureMinute = Math.floor(Math.random() * 60);
                departureDate.setHours(departureHour, departureMinute, 0, 0);

                const flightDurationHours = Math.floor(Math.random() * 8) + 2; // 2-10 hours
                const flightDurationMinutes = Math.floor(Math.random() * 60);
                const arrival = new Date(departureDate.getTime() + (flightDurationHours * 60 + flightDurationMinutes) * 60000);

                flightResults.push({
                    id: i,
                    from: from,
                    to: to,
                    departure: departureDate,
                    arrival: arrival,
                    return: searchData?.returnDateValue || searchData?.returnDate,
                    airline: airline,
                    price: Math.floor(Math.random() * 800) + 200, // 200-1000
                    duration: `${flightDurationHours}h ${flightDurationMinutes}m`,
                    stops: Math.floor(Math.random() * 3),
                    flightNumber: `${airline.substring(0, 2).toUpperCase()}${Math.floor(Math.random() * 9000) + 1000}`,
                    segment: null
                });
            }
        }

        return flightResults.sort((a, b) => a.price - b.price);
    };

    const formatDate = (date) => {
        if (!date) return 'N/A';
        const dateObj = date instanceof Date ? date : new Date(date);
        return dateObj.toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const formatTime = (date) => {
        if (!date) return 'N/A';
        const dateObj = date instanceof Date ? date : new Date(date);
        return dateObj.toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center py-16">
                <Stack align="center" spacing="md">
                    <LoadingSpinner size={60} />
                    <Text size="lg" color="dimmed">Searching for flights...</Text>
                </Stack>
            </div>
        );
    }

    if (error) {
        return (
            <Alert color="red" title="Search Error">
                {error}
            </Alert>
        );
    }

    if (!searchData) {
        return (
            <Alert color="blue" title="No Search Data">
                Please perform a flight search to see results.
            </Alert>
        );
    }

    if (!results || results.length === 0) {
        return (
            <Alert color="yellow" title="No Results Found">
                No flights found for your search criteria. Please try different dates or destinations.
            </Alert>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-6 py-8">
            {/* Search Summary */}
            <Card className="mb-8" shadow="sm" padding="lg">
                <Group position="apart" align="flex-start">
                    <div>
                        <Text size="xl" weight={700} className="mb-2">
                            Flight Search Results
                        </Text>
                        <Text size="sm" color="dimmed">
                            {results.length} flights found
                        </Text>
                    </div>
                    <Badge color="blue" size="lg">
                        {typeof searchData.searchType === 'string' ? searchData.searchType.toUpperCase() : 'SEARCH'}
                    </Badge>
                </Group>
            </Card>

            {/* Flight Results */}
            <Grid>
                {results.map((flight) => (
                    <Grid.Col key={flight.id} span={12} md={6} lg={4}>
                        <Card shadow="sm" padding="lg" className="h-full">
                            <Stack spacing="md">
                                {/* Flight Header */}
                                <Group position="apart">
                                    <Text weight={600} size="lg">
                                        {flight.airline}
                                    </Text>
                                    <Text weight={700} size="xl" color="blue">
                                        ${flight.price}
                                    </Text>
                                </Group>

                                {/* Flight Details */}
                                <div className="space-y-3">
                                    <Group>
                                        <IconMapPin size={16} color="gray" />
                                        <Text size="sm">
                                            <strong>{flight.from}</strong> → <strong>{flight.to}</strong>
                                        </Text>
                                    </Group>

                                    <Group>
                                        <IconCalendar size={16} color="gray" />
                                        <Text size="sm">
                                            {formatDate(flight.departure)}
                                        </Text>
                                    </Group>

                                    <Group>
                                        <IconClock size={16} color="gray" />
                                        <Text size="sm">
                                            Departure: {formatTime(flight.departure)}
                                        </Text>
                                    </Group>

                                    {flight.return && (
                                        <Group>
                                            <IconClock size={16} color="gray" />
                                            <Text size="sm">
                                                Return: {formatTime(flight.return)}
                                            </Text>
                                        </Group>
                                    )}

                                    <Group>
                                        <IconPlane size={16} color="gray" />
                                        <Text size="sm">
                                            Duration: {flight.duration}
                                        </Text>
                                    </Group>

                                    <Group>
                                        <IconUsers size={16} color="gray" />
                                        <Text size="sm">
                                            Flight: {flight.flightNumber}
                                        </Text>
                                    </Group>
                                </div>

                                {/* Stops Badge */}
                                <Group position="apart">
                                    <Badge 
                                        color={flight.stops === 0 ? 'green' : flight.stops === 1 ? 'yellow' : 'red'}
                                        variant="light"
                                    >
                                        {flight.stops === 0 ? 'Direct' : `${flight.stops} Stop${flight.stops > 1 ? 's' : ''}`}
                                    </Badge>
                                    
                                    {flight.segment && (
                                        <Badge color="blue" variant="outline">
                                            Segment {flight.segment}
                                        </Badge>
                                    )}
                                </Group>

                                {/* Book Button */}
                                <Button 
                                    fullWidth 
                                    color="blue" 
                                    size="md"
                                    onClick={() => {
                                        console.log('Booking flight:', flight);
                                        // Handle booking logic here
                                    }}
                                >
                                    Select Flight
                                </Button>
                            </Stack>
                        </Card>
                    </Grid.Col>
                ))}
            </Grid>

            {/* Load More Button */}
            {results.length >= 8 && (
                <div className="text-center mt-8">
                    <Button variant="outline" size="lg">
                        Load More Flights
                    </Button>
                </div>
            )}
        </div>
    );
};

export default FlightResults;
