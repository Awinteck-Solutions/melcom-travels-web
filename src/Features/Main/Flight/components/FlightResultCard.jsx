import { useState } from 'react';
import { 
    Card, 
    Text, 
    Group, 
    Stack, 
    Button, 
    Badge, 
    Collapse, 
    ActionIcon,
    Avatar,
    Divider
} from '@mantine/core';
import { IconPlane, IconChevronDown, IconShare, IconLuggage } from '@tabler/icons-react';

const FlightResultCard = ({ flight, onBookNow, onViewDetails }) => {
    const [showDetails, setShowDetails] = useState(false);

    // Airline logo component (placeholder for now)
    const AirlineLogo = ({ airline, className = "" }) => {
        // This would typically be an actual airline logo
        return (
            <div className={`w-9 h-9 relative bg-red-600 rounded-full overflow-hidden ${className}`}>
                <div className="w-1 h-3 left-[17.39px] top-[7.01px] absolute bg-white"></div>
                <div className="w-2.5 h-2 left-[13.40px] top-[10.78px] absolute bg-white"></div>
                <div className="w-1 h-2.5 left-[14.57px] top-[7px] absolute bg-white"></div>
                <div className="w-1.5 h-[4.89px] left-[12.94px] top-[14.02px] absolute bg-white"></div>
                <div className="w-6 h-2.5 left-[5px] top-[15.35px] absolute bg-white"></div>
            </div>
        );
    };

    // Flight route visualization
    const FlightRoute = () => (
        <div className="flex justify-start items-center m-auto md:m-0">
            <div className="w-2.5 h-2.5 p-0.5 bg-indigo-800 rounded-xl shadow-[0px_0px_7.99px_0.74px_rgba(118,149,255,0.62)]"></div>
            <div className="flex justify-start items-center gap-7">
                <div className="w-14 h-0 border-t-[1.48px] border-dashed border-neutral-200"></div>
                <div className="w-8 h-6 flex items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 1200 1200"><path fill="#364A9C" d="M321 1164h120l269.28-480.06H1020s180 0 180-83.94c0-84-180-84-180-84H710.28L441 36H321l149.28 480H255.06L120 395.94H0l96.06 204L0 804h120l135.06-120.06h215.22z"/></svg>
                </div>
                <div className="w-12 h-0 border-t-[1.48px] border-dashed border-neutral-200"></div>
            </div>
            <div className="w-2.5 h-2.5 p-0.5 bg-indigo-800 rounded-xl shadow-[0px_0px_7.99px_0.74px_rgba(118,149,255,0.62)]"></div>
        </div>
    );

    // Format time for display
    const formatTime = (date) => {
        if (!date) return '00:00';
        const d = new Date(date);
        return d.toLocaleTimeString('en-US', { 
            hour: '2-digit', 
            minute: '2-digit',
            hour12: true 
        });
    };

    // Format date for display
    const formatDate = (date) => {
        if (!date) return 'Unknown Date';
        const d = new Date(date);
        return d.toLocaleDateString('en-US', { 
            year: 'numeric', 
            month: 'long', 
            day: 'numeric' 
        });
    };

    // Calculate duration
    const calculateDuration = (departure, arrival) => {
        if (!departure || !arrival) return 'Unknown';
        const dep = new Date(departure);
        const arr = new Date(arrival);
        const diffMs = arr - dep;
        const hours = Math.floor(diffMs / (1000 * 60 * 60));
        const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
        return `${hours} hrs ${minutes} mins`;
    };

    return (
        <Card className="w-full max-w-[835px]" radius="xl" shadow="sm" withBorder>
            <Stack gap="lg">
                {/* Header with airline, class, and price */}
                <Group justify="space-between" align="center">
                    <Group gap="sm">
                        <div className='w-10 h-10 rounded-full overflow-hidden'>
                            <img src={flight.airlineLogo} alt={flight.airline} />
                        </div>
                        <Text size="lg" fw={500} c="gray.6">
                            {flight.airline}
                        </Text>
                    </Group>
                    
                    <Badge 
                        variant="light" 
                        color="#364A9C" 
                        size="lg"
                        rightSection={<IconChevronDown size={12} />}
                    >
                        Economy Lite
                    </Badge>
                    
                    <p className='text-3xl font-bold text-gray-800'>
                        GH₵{flight.price?.toLocaleString() || '10,000'}
                    </p>
                </Group>

                {/* Flight route */}
                <Group justify="space-between" align="center">
                    <Stack gap="xs" align="center" className='m-auto md:m-0'>
                        <p className='text-xl font-bold text-gray-800'>
                            {formatTime(flight.departure)}
                        </p>
                        <Badge variant="light" color="#364A9C" size="lg">
                            {flight.from}
                        </Badge>
                    </Stack>
                    
                    <FlightRoute />
                    
                    <Stack gap="xs" align="center" className='m-auto md:m-0'>
                        <p className='text-xl font-bold text-gray-800'>
                            {formatTime(flight.arrival || flight.departure)}
                        </p>
                        <Badge variant="light" color="#364A9C" size="lg">
                            {flight.to}
                        </Badge>
                    </Stack>
                </Group>

                {/* Flight details and booking */}
                <Group justify="space-between" align="center">
                    <Group gap="lg">
                        <Stack gap="xs" className='m-auto md:m-0 '>
                            <p className='text-sm text-gray-600'>Departure</p>
                            <Badge variant="light" color="gray" size="lg">
                                <p className='text-sm font-semibold capitalize text-gray-800'>{formatDate(flight.departure)}</p>
                            </Badge>
                        </Stack>
                        <Stack gap="xs" className='m-auto md:m-0'>
                            <p className='text-sm  text-gray-600'>Duration</p>
                            <Badge variant="light" color="gray" size="lg">
                                <p className='text-sm font-semibold capitalize text-gray-800'>{flight.duration || calculateDuration(flight.departure, flight.arrival)}</p>
                            </Badge>
                        </Stack>
                    </Group>
                    
                    <Button 
                        color="#364A9C" 
                        size="md" 
                        radius="xl"
                        onClick={() => onBookNow && onBookNow(flight)}
                    >
                        Book Now
                    </Button>
                </Group>

                <Divider />

                {/* Bottom action bar */}
                <Group justify="space-between" align="center">
                    <Group gap="sm">
                        <ActionIcon variant="subtle" color="#364A9C">
                            <IconLuggage size={20} />
                        </ActionIcon>
                        <Text size="sm" c="#364A9C" fw={500}>
                            Luggage Info
                        </Text>
                    </Group>
                    
                    <Group gap="lg">
                        <Text size="sm" c="#364A9C" fw={500} style={{ textDecoration: 'underline' }}>
                            Tarif Condition
                        </Text>
                        <Group gap="xs">
                            <ActionIcon variant="subtle" color="#364A9C">
                                <IconShare size={16} />
                            </ActionIcon>
                            <Text size="sm" c="#364A9C" fw={500}>
                                Share
                            </Text>
                        </Group>
                    </Group>
                </Group>

                {/* View Details button */}
                <Button 
                    variant="outline" 
                    color="#364A9C" 
                    size="md" 
                    radius="xl"
                    rightSection={<IconChevronDown size={16} />}
                    onClick={() => {
                        setShowDetails(!showDetails);
                        onViewDetails && onViewDetails(flight, !showDetails);
                    }}
                >
                    View Details
                </Button>

                {/* Expanded details (when showDetails is true) */}
                <Collapse in={showDetails}>
                    <Card withBorder radius="md" bg="gray.0">
                        <Stack gap="sm">
                            <Group justify="space-between">
                                <Text size="sm" c="gray.6">Flight Number:</Text>
                                <Text size="sm" fw={500}>{flight.flightNumber || 'EK123'}</Text>
                            </Group>
                            <Group justify="space-between">
                                <Text size="sm" c="gray.6">Aircraft:</Text>
                                <Text size="sm" fw={500}>Boeing 777-300ER</Text>
                            </Group>
                            <Group justify="space-between">
                                <Text size="sm" c="gray.6">Stops:</Text>
                                <Text size="sm" fw={500}>{flight.stops || 0} stops</Text>
                            </Group>
                            <Group justify="space-between">
                                <Text size="sm" c="gray.6">Baggage:</Text>
                                <Text size="sm" fw={500}>23kg included</Text>
                            </Group>
                        </Stack>
                    </Card>
                </Collapse>
            </Stack>
        </Card>
    );
};

export default FlightResultCard;
