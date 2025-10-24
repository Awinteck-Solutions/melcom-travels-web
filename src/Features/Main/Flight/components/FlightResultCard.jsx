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
    Divider,
    Timeline
} from '@mantine/core';
import { IconPlane, IconChevronDown, IconShare, IconLuggage } from '@tabler/icons-react';
import LuggageInfoModal from './LuggageInfoModal';
import TarifConditionModal from './TarifConditionModal';
import { 
  AnimatedCard, 
  AnimatedButton, 
  StaggerContainer,
  StaggerItem,
  fadeInUp,
  scaleIn,
  fadeInRight
} from '../../../../components/animations';

export const OneWayFlightResultCard = ({ flight, onBookNow, onViewDetails }) => {
    const [showDetails, setShowDetails] = useState(false);
    const [luggageModalOpened, setLuggageModalOpened] = useState(false);
    const [tarifModalOpened, setTarifModalOpened] = useState(false);

    // console.log('OneWayFlightResultCard - flight:', flight);

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
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 1200 1200"><path fill="#364A9C" d="M321 1164h120l269.28-480.06H1020s180 0 180-83.94c0-84-180-84-180-84H710.28L441 36H321l149.28 480H255.06L120 395.94H0l96.06 204L0 804h120l135.06-120.06h215.22z" /></svg>
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
        <AnimatedCard 
            variant={fadeInRight} 
            delay={0}
            hoverX={true}
            className="w-full max-w-[835px] rounded-xl shadow-sm p-2 border border-gray-100 bg-white" 
            radius="xl" 
            shadow="sm" 
            withBorder
        >
            <Stack gap="lg">
                {/* Header with airline, class, and price */}
                <Group justify="space-between" align="center">
                    <Group gap="sm">
                        <div className='w-10 h-10 rounded-full overflow-hidden'>
                            <img src={flight.airlineLogo || '/emirates.svg'} alt={flight.airline || 'Airline'} />
                        </div>
                        <Text size="lg" fw={500} c="gray.6">
                            {flight.airline || 'Unknown Airline'}
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
                            {flight.from || 'N/A'}
                        </Badge>
                    </Stack>

                    <FlightRoute />

                    <Stack gap="xs" align="center" className='m-auto md:m-0'>
                        <p className='text-xl font-bold text-gray-800'>
                            {formatTime(flight.arrival || flight.departure)}
                        </p>
                        <Badge variant="light" color="#364A9C" size="lg">
                            {flight.to || 'N/A'}
                        </Badge>
                    </Stack>
                </Group>

                {/* Flight details and booking */}
                <Group justify="space-between" align="center">
                    <Group gap="lg">
                        <Stack gap="xs" className='md:m-auto md:m-0 '>
                            <p className='text-sm text-gray-600'>Departure</p>
                            <Badge variant="light" color="gray" size="lg">
                                <p className='text-sm font-semibold capitalize text-gray-800'>{formatDate(flight.departure)}</p>
                            </Badge>
                        </Stack>
                        <Stack gap="xs" className='md:m-auto md:m-0'>
                            <p className='text-sm  text-gray-600'>Duration</p>
                            <Badge variant="light" color="gray" size="lg">
                                <p className='text-sm font-semibold capitalize text-gray-800'>{flight.duration || calculateDuration(flight.departure, flight.arrival)}</p>
                            </Badge>
                        </Stack>
                        <Stack gap="xs" className='md:m-auto md:m-0'>
                            <p className='text-sm  text-gray-600'>Transfer</p>
                            <Badge variant="light" color="gray" size="lg">
                                <p className='text-sm font-semibold capitalize text-gray-800'>{flight?.segments?.length ? flight.segments.length - 1 : 0}</p>
                            </Badge>
                        </Stack>
                        {
                            flight.flightType === 'round-trip' && (
                                <Stack gap="xs" className='md:m-auto md:m-0'>
                                    <p className='text-sm text-gray-600'>Return</p>
                                    <Badge variant="light" color="gray" size="lg">
                                        <p className='text-sm font-semibold capitalize text-gray-800'>{formatDate(flight.returnDate)}</p>
                                    </Badge>
                                </Stack>
                            )
                        }
                    </Group>

                    {onBookNow &&
                        <div className='md:w-fit w-full'>
                            <Button
                                color="#364A9C"
                                size="md"
                                w="100%"
                                radius="xl"
                                onClick={() => onBookNow && onBookNow(flight)}
                            >
                                Book Now
                            </Button>
                        </div>
                    }
                </Group>

                {/* View Details button */}
                <div>
                    <div className='md:w-fit w-full'>
                        <Button
                            variant="outline"
                            color="#364A9C"
                            size="md"
                            w="100%"
                            radius="xl"
                            rightSection={<IconChevronDown size={16} />}
                            onClick={() => {
                                setShowDetails(!showDetails);
                                onViewDetails && onViewDetails(flight, !showDetails);
                            }}
                        >
                            View Details
                        </Button>
                    </div>
                </div>

                {/* Expanded details (when showDetails is true) */}
                <Collapse in={showDetails}>

                    {/* flight segments */}

                    {flight?.segments?.map((segment, index) => (
                         <Timeline key={index} active={4} lineWidth={2} bulletSize={20} color="#364A9C">
                            <div className='border-l-2 border-[#364A9C] h-20 m-0'>
                                {/* show bg-[#FEEDDB] if index is odd */}
                                <div className={`w-full p-3 ${index % 2 === 0 ? 'bg-[#FEEDDB]' : 'bg-[#E5FBE8]'} flex gap-2 items-center`}> 
                                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><g fill="none" stroke="#364A9C" strokeLinecap="round" strokeWidth="1.5"><path strokeLinejoin="round" d="M2 15q.215.641.5 1.245m1.625 2.501q.476.553 1.016 1.035M9 22a11 11 0 0 1-1.304-.518" /><path d="M12 13.5a1.5 1.5 0 1 0-1.5-1.5m1.5 1.5a1.5 1.5 0 0 1-1.5-1.5m1.5 1.5V16m-1.5-4H6" /><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12" /></g></svg>
                                    <p>Journey time: <span className='font-bold'>{segment?.duration || calculateDuration(segment?.departure?.time, segment?.arrival?.time)}</span></p>
                                </div>
                            </div>
                            <Timeline.Item m={0} ml={2} h={10}>
                                <div className="md:grid grid-cols-6">
                                    <p className='col-span-2 text-gray-500 text-sm'>{formatTime(segment?.departure?.time)} <span className=''>{formatDate(segment?.departure?.time)}</span></p>
                                    <p className='col-span-3 text-sm font-semibold'>{segment?.departure?.airport}</p>
                                </div>
                            </Timeline.Item>
                            <Timeline.Item ml={2} >
                                <div className="md:grid grid-cols-6">
                                    <p className='col-span-2 text-gray-500 text-sm'>{formatTime(segment?.arrival?.time)} <span className=''>{formatDate(segment?.arrival?.time)}</span></p>
                                    <p className='col-span-3 text-sm font-semibold'>{segment?.arrival?.airport}</p>
                                </div>
                            </Timeline.Item>
                            <div className='border-l-2 border-[#364A9C] h-24 m-0 pl-5 text-sm mt-4 space-y-2'>
                                <p className='text-gray-500'>Flight Number: <span className='font-bold text-gray-800'>{segment?.flightNumber || ''}</span></p>
                                <p className='text-gray-500'>Airline: <span className='font-bold text-gray-800'>{segment?.airline || ''}</span> | <span className='font-bold text-gray-800'> Flight Number: {segment?.flightNumber || ''}</span> | <span className='font-bold text-gray-800'> Class: {segment?.cabinClass || ''}</span></p>
                                <p className='text-gray-500'>Plane type: <span className='font-bold text-gray-800'>{segment?.aircraft || ''}</span></p>
                            </div>

                        </Timeline>
                    ))}
                    {/* <Timeline active={4} lineWidth={2} bulletSize={20} color="#364A9C">
                        <div className='border-l-2 border-[#364A9C] h-20 m-0'>
                            <div className='w-full p-3 bg-[#E5FBE8] flex gap-2 items-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><g fill="none" stroke="#364A9C" strokeLinecap="round" strokeWidth="1.5"><path strokeLinejoin="round" d="M2 15q.215.641.5 1.245m1.625 2.501q.476.553 1.016 1.035M9 22a11 11 0 0 1-1.304-.518" /><path d="M12 13.5a1.5 1.5 0 1 0-1.5-1.5m1.5 1.5a1.5 1.5 0 0 1-1.5-1.5m1.5 1.5V16m-1.5-4H6" /><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12" /></g></svg>
                                <p>Transfer time: <span className='font-bold'>{flight.duration || calculateDuration(flight.departure, flight.arrival)}</span></p>
                            </div>
                        </div>
                        <Timeline.Item m={0} ml={2} h={10}>
                            <div className="md:grid grid-cols-6">
                                <p className='col-span-2 text-gray-500 text-sm'>06:05 <span className=''>20.08 Wednesday</span></p>
                                <p className='col-span-3 text-sm font-semibold'>{flight.from}</p>
                            </div>
                        </Timeline.Item>
                        <Timeline.Item ml={2} >
                            <div className="md:grid grid-cols-6">
                                <p className='col-span-2 text-gray-500 text-sm'>22:06 <span className=''>20.08 Wednesday</span></p>
                                <p className='col-span-3 text-sm font-semibold'>{flight.to}</p>
                            </div>
                        </Timeline.Item>
                        <div className='border-l-2 border-[#364A9C] h-24 m-0 pl-5 text-sm mt-4 space-y-2'>
                            <p className='text-gray-500'>Flight Number: <span className='font-bold text-gray-800'>{flight.flightNumber || ''}</span></p>
                            <p className='text-gray-500'>Airline: <span className='font-bold text-gray-800'>{flight.airline || ''}</span> | <span className='font-bold text-gray-800'> Flight Number: {flight.flightNumber || ''}</span> | <span className='font-bold text-gray-800'> Class: {flight.class || ''}</span></p>
                            <p className='text-gray-500'>Plane type: <span className='font-bold text-gray-800'>{flight.planeType || ''}</span></p>
                        </div>

                    </Timeline> */}


                    {/* <Card withBorder radius="md" bg="gray.0">
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
                    </AnimatedCard> */}
                </Collapse>


                <Divider />
                {/* Bottom action bar */}
                <Group justify="space-between" align="center">
                    <Group gap="sm">
                        <ActionIcon
                            variant="subtle"
                            color="#364A9C"
                            onClick={() => setLuggageModalOpened(true)}
                            style={{ cursor: 'pointer' }}
                        >
                            <IconLuggage size={20} />
                        </ActionIcon>
                        <Text
                            size="sm"
                            c="#364A9C"
                            fw={500}
                            onClick={() => setLuggageModalOpened(true)}
                            style={{ cursor: 'pointer' }}
                        >
                            Luggage Info
                        </Text>
                    </Group>

                    <Group gap="lg">
                        <Text
                            size="sm"
                            c="#364A9C"
                            fw={500}
                            style={{ textDecoration: 'underline', cursor: 'pointer' }}
                            onClick={() => setTarifModalOpened(true)}
                        >
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
            </Stack>

            {/* Luggage Info Modal */}
            <LuggageInfoModal
                opened={luggageModalOpened}
                onClose={() => setLuggageModalOpened(false)}
            />

            {/* Tarif Condition Modal */}
            <TarifConditionModal
                opened={tarifModalOpened}
                onClose={() => setTarifModalOpened(false)}
            />
        </AnimatedCard>
    );
};

export const RoundTripFlightResultCard = ({ flight, onBookNow, onViewDetails }) => {
    const [showDetails, setShowDetails] = useState(false);
    const [showDetails2, setShowDetails2] = useState(false);
    const [luggageModalOpened, setLuggageModalOpened] = useState(false);
    const [tarifModalOpened, setTarifModalOpened] = useState(false);

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
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 1200 1200"><path fill="#364A9C" d="M321 1164h120l269.28-480.06H1020s180 0 180-83.94c0-84-180-84-180-84H710.28L441 36H321l149.28 480H255.06L120 395.94H0l96.06 204L0 804h120l135.06-120.06h215.22z" /></svg>
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
        <AnimatedCard 
            variant={fadeInUp} 
            delay={0}
            className="w-full max-w-[835px]" 
            radius="xl" 
            shadow="sm" 
            withBorder
        >
            <Stack gap="lg">
                {/* Header with airline, class, and price */}
                <Group justify="space-between" align="center">
                    <Group gap="sm">
                        <div className='w-10 h-10 rounded-full overflow-hidden'>
                            <img src={flight.airlineLogo || '/emirates.svg'} alt={flight.airline || 'Airline'} />
                        </div>
                        <Text size="lg" fw={500} c="gray.6">
                            {flight.airline || 'Unknown Airline'}
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
                            {flight.fromCode || 'N/A'}
                        </Badge>
                    </Stack>

                    <FlightRoute />

                    <Stack gap="xs" align="center" className='m-auto md:m-0'>
                        <p className='text-xl font-bold text-gray-800'>
                            {formatTime(flight.arrival || flight.departure)}
                        </p>
                        <Badge variant="light" color="#364A9C" size="lg">
                            {flight.toCode || 'N/A'}
                        </Badge>
                    </Stack>
                </Group>

                {/* Flight details and booking */}
                <Group justify="space-between" align="center">
                    <Group gap="lg">
                        <Stack gap="xs" className='md:m-auto md:m-0 '>
                            <p className='text-sm text-gray-600'>Departure</p>
                            <Badge variant="light" color="gray" size="lg">
                                <p className='text-sm font-semibold capitalize text-gray-800'>{formatDate(flight.departure)}</p>
                            </Badge>
                        </Stack>
                        <Stack gap="xs" className='md:m-auto md:m-0'>
                            <p className='text-sm  text-gray-600'>Duration</p>
                            <Badge variant="light" color="gray" size="lg">
                                <p className='text-sm font-semibold capitalize text-gray-800'>{flight.duration || calculateDuration(flight.departure, flight.arrival)}</p>
                            </Badge>
                        </Stack>
                        <Stack gap="xs" className='md:m-auto md:m-0'>
                            <p className='text-sm  text-gray-600'>Transfer</p>
                            <Badge variant="light" color="gray" size="lg">
                                <p className='text-sm font-semibold capitalize text-gray-800'>{1}</p>
                            </Badge>
                        </Stack>
                        {
                            flight.flightType === 'round-trip' && (
                                <Stack gap="xs" className='md:m-auto md:m-0'>
                                    <p className='text-sm text-gray-600'>Return</p>
                                    <Badge variant="light" color="gray" size="lg">
                                        <p className='text-sm font-semibold capitalize text-gray-800'>{formatDate(flight.returnDate)}</p>
                                    </Badge>
                                </Stack>
                            )
                        }
                    </Group>
                </Group>

                {/* View Details button */}
                <div>
                    <div className='md:w-fit w-full'>
                        <Button
                            variant="outline"
                            color="#364A9C"
                            size="md"
                            w="100%"
                            radius="xl"
                            rightSection={<IconChevronDown size={16} />}
                            onClick={() => {
                                setShowDetails(!showDetails);
                                onViewDetails && onViewDetails(flight, !showDetails);
                            }}
                        >
                            View Details
                        </Button>
                    </div>
                </div>

                {/* Expanded details (when showDetails is true) */}
                <Collapse in={showDetails}>

                    <Timeline active={4} lineWidth={2} bulletSize={20} color="#364A9C">
                        <div className='border-l-2 border-[#364A9C] h-20 m-0'>
                            <div className='w-full p-3 bg-[#FEEDDB] flex gap-2 items-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><g fill="none" stroke="#364A9C" strokeLinecap="round" strokeWidth="1.5"><path strokeLinejoin="round" d="M2 15q.215.641.5 1.245m1.625 2.501q.476.553 1.016 1.035M9 22a11 11 0 0 1-1.304-.518" /><path d="M12 13.5a1.5 1.5 0 1 0-1.5-1.5m1.5 1.5a1.5 1.5 0 0 1-1.5-1.5m1.5 1.5V16m-1.5-4H6" /><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12" /></g></svg>
                                <p>Journey time: <span className='font-bold'>{flight.duration || calculateDuration(flight.departure, flight.arrival)}</span></p>
                            </div>
                        </div>
                        <Timeline.Item m={0} ml={2} h={10}>
                            <div className="md:grid grid-cols-6">
                                <p className='col-span-2 text-gray-500 text-sm'>06:05 <span className=''>20.08 Wednesday</span></p>
                                <p className='col-span-3 text-sm font-semibold'>{flight.from}</p>
                            </div>
                        </Timeline.Item>
                        <Timeline.Item ml={2} >
                            <div className="md:grid grid-cols-6">
                                <p className='col-span-2 text-gray-500 text-sm'>22:06 <span className=''>20.08 Wednesday</span></p>
                                <p className='col-span-3 text-sm font-semibold'>{flight.to}</p>
                            </div>
                        </Timeline.Item>
                        <div className='border-l-2 border-[#364A9C] h-24 m-0 pl-5 text-sm mt-4 space-y-2'>
                            <p className='text-gray-500'>Flight Number: <span className='font-bold text-gray-800'>{flight.flightNumber || ''}</span></p>
                            <p className='text-gray-500'>Airline: <span className='font-bold text-gray-800'>{flight.airline || ''}</span> | <span className='font-bold text-gray-800'> Flight Number: {flight.flightNumber || ''}</span> | <span className='font-bold text-gray-800'> Class: {flight.class || ''}</span></p>
                            <p className='text-gray-500'>Plane type: <span className='font-bold text-gray-800'>{flight.planeType || ''}</span></p>
                        </div>

                    </Timeline>

                    <Timeline active={4} lineWidth={2} bulletSize={20} color="#364A9C">
                        <div className='border-l-2 border-[#364A9C] h-20 m-0'>
                            <div className='w-full p-3 bg-[#E5FBE8] flex gap-2 items-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><g fill="none" stroke="#364A9C" strokeLinecap="round" strokeWidth="1.5"><path strokeLinejoin="round" d="M2 15q.215.641.5 1.245m1.625 2.501q.476.553 1.016 1.035M9 22a11 11 0 0 1-1.304-.518" /><path d="M12 13.5a1.5 1.5 0 1 0-1.5-1.5m1.5 1.5a1.5 1.5 0 0 1-1.5-1.5m1.5 1.5V16m-1.5-4H6" /><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12" /></g></svg>
                                <p>Transfer time: <span className='font-bold'>{flight.duration || calculateDuration(flight.departure, flight.arrival)}</span></p>
                            </div>
                        </div>
                        <Timeline.Item m={0} ml={2} h={10}>
                            <div className="md:grid grid-cols-6">
                                <p className='col-span-2 text-gray-500 text-sm'>06:05 <span className=''>20.08 Wednesday</span></p>
                                <p className='col-span-3 text-sm font-semibold'>{flight.from}</p>
                            </div>
                        </Timeline.Item>
                        <Timeline.Item ml={2} >
                            <div className="md:grid grid-cols-6">
                                <p className='col-span-2 text-gray-500 text-sm'>22:06 <span className=''>20.08 Wednesday</span></p>
                                <p className='col-span-3 text-sm font-semibold'>{flight.to}</p>
                            </div>
                        </Timeline.Item>
                        <div className='border-l-2 border-[#364A9C] h-24 m-0 pl-5 text-sm mt-4 space-y-2'>
                            <p className='text-gray-500'>Flight Number: <span className='font-bold text-gray-800'>{flight.flightNumber || ''}</span></p>
                            <p className='text-gray-500'>Airline: <span className='font-bold text-gray-800'>{flight.airline || ''}</span> | <span className='font-bold text-gray-800'> Flight Number: {flight.flightNumber || ''}</span> | <span className='font-bold text-gray-800'> Class: {flight.class || ''}</span></p>
                            <p className='text-gray-500'>Plane type: <span className='font-bold text-gray-800'>{flight.planeType || ''}</span></p>
                        </div>
                    </Timeline>
                </Collapse>
            </Stack>
            <Stack gap="lg" mt={20}>
                {/* Header with airline, class, and price */}
                <Group justify="space-between" align="center">
                    <Group gap="sm">
                        <div className='w-10 h-10 rounded-full overflow-hidden'>
                            <img src={flight.airlineLogo || '/emirates.svg'} alt={flight.airline || 'Airline'} />
                        </div>
                        <Text size="lg" fw={500} c="gray.6">
                            {flight.airline || 'Unknown Airline'}
                        </Text>
                    </Group>

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
                            {flight.fromCode || 'N/A'}
                        </Badge>
                    </Stack>

                    <FlightRoute />

                    <Stack gap="xs" align="center" className='m-auto md:m-0'>
                        <p className='text-xl font-bold text-gray-800'>
                            {formatTime(flight.arrival || flight.departure)}
                        </p>
                        <Badge variant="light" color="#364A9C" size="lg">
                            {flight.toCode || 'N/A'}
                        </Badge>
                    </Stack>
                </Group>

                {/* Flight details and booking */}
                <Group justify="space-between" align="center">
                    <Group gap="lg">
                        <Stack gap="xs" className='md:m-auto md:m-0 '>
                            <p className='text-sm text-gray-600'>Departure</p>
                            <Badge variant="light" color="gray" size="lg">
                                <p className='text-sm font-semibold capitalize text-gray-800'>{formatDate(flight.departure)}</p>
                            </Badge>
                        </Stack>
                        <Stack gap="xs" className='md:m-auto md:m-0'>
                            <p className='text-sm  text-gray-600'>Duration</p>
                            <Badge variant="light" color="gray" size="lg">
                                <p className='text-sm font-semibold capitalize text-gray-800'>{flight.duration || calculateDuration(flight.departure, flight.arrival)}</p>
                            </Badge>
                        </Stack>
                        <Stack gap="xs" className='md:m-auto md:m-0'>
                            <p className='text-sm  text-gray-600'>Transfer</p>
                            <Badge variant="light" color="gray" size="lg">
                                <p className='text-sm font-semibold capitalize text-gray-800'>{1}</p>
                            </Badge>
                        </Stack>
                        {
                            flight.flightType === 'round-trip' && (
                                <Stack gap="xs" className='md:m-auto md:m-0'>
                                    <p className='text-sm text-gray-600'>Return</p>
                                    <Badge variant="light" color="gray" size="lg">
                                        <p className='text-sm font-semibold capitalize text-gray-800'>{formatDate(flight.returnDate)}</p>
                                    </Badge>
                                </Stack>
                            )
                        }
                    </Group>

                </Group>

                {/* View Details button */}
                <div>
                    <div className='md:w-fit w-full'>
                        <Button
                            variant="outline"
                            color="#364A9C"
                            size="md"
                            w="100%"
                            radius="xl"
                            rightSection={<IconChevronDown size={16} />}
                            onClick={() => {
                                setShowDetails2(!showDetails2);
                                onViewDetails && onViewDetails(flight, !showDetails2);
                            }}
                        >
                            View Details
                        </Button>
                    </div>
                </div>

                {/* Expanded details (when showDetails is true) */}
                <Collapse in={showDetails2}>

                    <Timeline active={4} lineWidth={2} bulletSize={20} color="#364A9C">
                        <div className='border-l-2 border-[#364A9C] h-20 m-0'>
                            <div className='w-full p-3 bg-[#FEEDDB] flex flex-wrap gap-2 items-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><g fill="none" stroke="#364A9C" strokeLinecap="round" strokeWidth="1.5"><path strokeLinejoin="round" d="M2 15q.215.641.5 1.245m1.625 2.501q.476.553 1.016 1.035M9 22a11 11 0 0 1-1.304-.518" /><path d="M12 13.5a1.5 1.5 0 1 0-1.5-1.5m1.5 1.5a1.5 1.5 0 0 1-1.5-1.5m1.5 1.5V16m-1.5-4H6" /><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12" /></g></svg>
                                <p>Journey time: <span className='font-bold'>{flight.duration || calculateDuration(flight.departure, flight.arrival)}</span></p>
                            </div>
                        </div>
                        <Timeline.Item m={0} ml={2} h={10}>
                            <div className="md:grid grid-cols-6">
                                <p className='col-span-2 text-gray-500 text-sm'>06:05 <span className=''>20.08 Wednesday</span></p>
                                <p className='col-span-3 text-sm font-semibold'>{flight.from}</p>
                            </div>
                        </Timeline.Item>
                        <Timeline.Item ml={2} >
                            <div className="md:grid grid-cols-6">
                                <p className='col-span-2 text-gray-500 text-sm'>22:06 <span className=''>20.08 Wednesday</span></p>
                                <p className='col-span-3 text-sm font-semibold'>{flight.to}</p>
                            </div>
                        </Timeline.Item>
                        <div className='border-l-2 border-[#364A9C] h-24 m-0 pl-5 text-sm mt-4 space-y-2'>
                            <p className='text-gray-500'>Flight Number: <span className='font-bold text-gray-800'>{flight.flightNumber || ''}</span></p>
                            <p className='text-gray-500'>Airline: <span className='font-bold text-gray-800'>{flight.airline || ''}</span> | <span className='font-bold text-gray-800'> Flight Number: {flight.flightNumber || ''}</span> | <span className='font-bold text-gray-800'> Class: {flight.class || ''}</span></p>
                            <p className='text-gray-500'>Plane type: <span className='font-bold text-gray-800'>{flight.planeType || ''}</span></p>
                        </div>

                    </Timeline>

                    <Timeline active={4} lineWidth={2} bulletSize={20} color="#364A9C">
                        <div className='border-l-2 border-[#364A9C] h-20 m-0'>
                            <div className='w-full p-3 bg-[#E5FBE8] flex gap-2 items-center'>
                                <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><g fill="none" stroke="#364A9C" strokeLinecap="round" strokeWidth="1.5"><path strokeLinejoin="round" d="M2 15q.215.641.5 1.245m1.625 2.501q.476.553 1.016 1.035M9 22a11 11 0 0 1-1.304-.518" /><path d="M12 13.5a1.5 1.5 0 1 0-1.5-1.5m1.5 1.5a1.5 1.5 0 0 1-1.5-1.5m1.5 1.5V16m-1.5-4H6" /><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12" /></g></svg>
                                <p>Transfer time: <span className='font-bold'>{flight.duration || calculateDuration(flight.departure, flight.arrival)}</span></p>
                            </div>
                        </div>
                        <Timeline.Item m={0} ml={2} h={10}>
                            <div className="md:grid grid-cols-6">
                                <p className='col-span-2 text-gray-500 text-sm'>06:05 <span className=''>20.08 Wednesday</span></p>
                                <p className='col-span-3 text-sm font-semibold'>{flight.from}</p>
                            </div>
                        </Timeline.Item>
                        <Timeline.Item ml={2} >
                            <div className="md:grid grid-cols-6">
                                <p className='col-span-2 text-gray-500 text-sm'>22:06 <span className=''>20.08 Wednesday</span></p>
                                <p className='col-span-3 text-sm font-semibold'>{flight.to}</p>
                            </div>
                        </Timeline.Item>
                        <div className='border-l-2 border-[#364A9C] h-24 m-0 pl-5 text-sm mt-4 space-y-2'>
                            <p className='text-gray-500'>Flight Number: <span className='font-bold text-gray-800'>{flight.flightNumber || ''}</span></p>
                            <p className='text-gray-500'>Airline: <span className='font-bold text-gray-800'>{flight.airline || ''}</span> | <span className='font-bold text-gray-800'> Flight Number: {flight.flightNumber || ''}</span> | <span className='font-bold text-gray-800'> Class: {flight.class || ''}</span></p>
                            <p className='text-gray-500'>Plane type: <span className='font-bold text-gray-800'>{flight.planeType || ''}</span></p>
                        </div>

                    </Timeline>
                </Collapse>


                <Divider />
                {/* Bottom action bar */}
                <Group justify="space-between" align="center">
                    <Group gap="sm">
                        <ActionIcon
                            variant="subtle"
                            color="#364A9C"
                            onClick={() => setLuggageModalOpened(true)}
                            style={{ cursor: 'pointer' }}
                        >
                            <IconLuggage size={20} />
                        </ActionIcon>
                        <Text
                            size="sm"
                            c="#364A9C"
                            fw={500}
                            onClick={() => setLuggageModalOpened(true)}
                            style={{ cursor: 'pointer' }}
                        >
                            Luggage Info
                        </Text>
                    </Group>

                    <Group gap="lg">
                        <Text
                            size="sm"
                            c="#364A9C"
                            fw={500}
                            style={{ textDecoration: 'underline', cursor: 'pointer' }}
                            onClick={() => setTarifModalOpened(true)}
                        >
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


                {/* <div className='text-center'> */}
                {onBookNow && <div className='md:w-fit w-full'>
                    <Button
                        color="#364A9C"
                        size="md"
                        radius="xl"
                        w="100%"
                        onClick={() => onBookNow && onBookNow(flight)}
                    >
                        Book Now
                    </Button>
                </div>}
                {/* </div> */}

            </Stack>

            {/* Luggage Info Modal */}
            <LuggageInfoModal
                opened={luggageModalOpened}
                onClose={() => setLuggageModalOpened(false)}
            />

            {/* Tarif Condition Modal */}
            <TarifConditionModal
                opened={tarifModalOpened}
                onClose={() => setTarifModalOpened(false)}
            />
        </AnimatedCard>
    );
};


export const MultiCityFlightResultCard = ({ flights, onBookNow, onViewDetails }) => {
    const [showDetails, setShowDetails] = useState({});
    const [luggageModalOpened, setLuggageModalOpened] = useState(false);
    const [tarifModalOpened, setTarifModalOpened] = useState(false);
    // Flight route visualization
    const FlightRoute = () => (
        <div className="flex justify-start items-center m-auto md:m-0">
            <div className="w-2.5 h-2.5 p-0.5 bg-indigo-800 rounded-xl shadow-[0px_0px_7.99px_0.74px_rgba(118,149,255,0.62)]"></div>
            <div className="flex justify-start items-center gap-7">
                <div className="w-14 h-0 border-t-[1.48px] border-dashed border-neutral-200"></div>
                <div className="w-8 h-6 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 1200 1200"><path fill="#364A9C" d="M321 1164h120l269.28-480.06H1020s180 0 180-83.94c0-84-180-84-180-84H710.28L441 36H321l149.28 480H255.06L120 395.94H0l96.06 204L0 804h120l135.06-120.06h215.22z" /></svg>
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
        <AnimatedCard 
            variant={fadeInUp} 
            delay={0}
            className="w-full max-w-[835px]" 
            radius="xl" 
            shadow="sm" 
            withBorder
        >
            {flights.map((flight, index) => (
                <div key={index}>
                    <Stack gap="lg" className='mb-6'>

                        {/* Header with airline, class, and price */}
                        <Group justify="space-between" align="center">
                            <Group gap="sm">
                                <div className='w-10 h-10 rounded-full overflow-hidden'>
                                    <img src={flight.airlineLogo || '/emirates.svg'} alt={flight.airline || 'Airline'} />
                                </div>
                                <Text size="lg" fw={500} c="gray.6">
                                    {flight.airline || 'Unknown Airline'}
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
                                    {flight.fromCode || 'N/A'}
                                </Badge>
                            </Stack>

                            <FlightRoute />

                            <Stack gap="xs" align="center" className='m-auto md:m-0'>
                                <p className='text-xl font-bold text-gray-800'>
                                    {formatTime(flight.arrival || flight.departure)}
                                </p>
                                <Badge variant="light" color="#364A9C" size="lg">
                                    {flight.toCode || 'N/A'}
                                </Badge>
                            </Stack>
                        </Group>

                        {/* Flight details and booking */}
                        <Group justify="space-between" align="center">
                            <Group gap="lg">
                                <Stack gap="xs" className='md:m-auto md:m-0 '>
                                    <p className='text-sm text-gray-600'>Departure</p>
                                    <Badge variant="light" color="gray" size="lg">
                                        <p className='text-sm font-semibold capitalize text-gray-800'>{formatDate(flight.departure)}</p>
                                    </Badge>
                                </Stack>
                                <Stack gap="xs" className='md:m-auto md:m-0'>
                                    <p className='text-sm  text-gray-600'>Duration</p>
                                    <Badge variant="light" color="gray" size="lg">
                                        <p className='text-sm font-semibold capitalize text-gray-800'>{flight.duration || calculateDuration(flight.departure, flight.arrival)}</p>
                                    </Badge>
                                </Stack>
                                <Stack gap="xs" className='md:m-auto md:m-0'>
                                    <p className='text-sm  text-gray-600'>Transfer</p>
                                    <Badge variant="light" color="gray" size="lg">
                                        <p className='text-sm font-semibold capitalize text-gray-800'>{1}</p>
                                    </Badge>
                                </Stack>
                                {
                                    flight.flightType === 'round-trip' && (
                                        <Stack gap="xs" className='md:m-auto md:m-0'>
                                            <p className='text-sm text-gray-600'>Return</p>
                                            <Badge variant="light" color="gray" size="lg">
                                                <p className='text-sm font-semibold capitalize text-gray-800'>{formatDate(flight.returnDate)}</p>
                                            </Badge>
                                        </Stack>
                                    )
                                }
                            </Group>


                        </Group>

                        {/* View Details button */}
                        <div>
                            <div className='md:w-fit w-full'>
                                <Button
                                    variant="outline"
                                    color="#364A9C"
                                    size="md"
                                    w="100%"
                                    radius="xl"
                                    rightSection={<IconChevronDown size={16} />}
                                    onClick={() => {
                                        setShowDetails({ ...showDetails, [index]: !showDetails[index] });
                                        onViewDetails && onViewDetails(flight, !showDetails[index]);
                                    }}
                                >
                                    View Details
                                </Button>
                            </div>
                        </div>

                        {/* Expanded details (when showDetails is true) */}
                        <Collapse in={showDetails[index]}>

                            <Timeline active={4} lineWidth={2} bulletSize={20} color="#364A9C">
                                <div className='border-l-2 border-[#364A9C] h-20 m-0'>
                                    <div className='w-full p-3 bg-[#FEEDDB] flex gap-2 items-center'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><g fill="none" stroke="#364A9C" strokeLinecap="round" strokeWidth="1.5"><path strokeLinejoin="round" d="M2 15q.215.641.5 1.245m1.625 2.501q.476.553 1.016 1.035M9 22a11 11 0 0 1-1.304-.518" /><path d="M12 13.5a1.5 1.5 0 1 0-1.5-1.5m1.5 1.5a1.5 1.5 0 0 1-1.5-1.5m1.5 1.5V16m-1.5-4H6" /><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12" /></g></svg>
                                        <p>Journey time: <span className='font-bold'>{flight.duration || calculateDuration(flight.departure, flight.arrival)}</span></p>
                                    </div>
                                </div>
                                <Timeline.Item m={0} ml={2} h={10}>
                                    <div className="md:grid grid-cols-6">
                                        <p className='col-span-2 text-gray-500 text-sm'>06:05 <span className=''>20.08 Wednesday</span></p>
                                        <p className='col-span-3 text-sm font-semibold'>{flight.from}</p>
                                    </div>
                                </Timeline.Item>
                                <Timeline.Item ml={2} >
                                    <div className="md:grid grid-cols-6">
                                        <p className='col-span-2 text-gray-500 text-sm'>22:06 <span className=''>20.08 Wednesday</span></p>
                                        <p className='col-span-3 text-sm font-semibold'>{flight.to}</p>
                                    </div>
                                </Timeline.Item>
                                <div className='border-l-2 border-[#364A9C] h-24 m-0 pl-5 text-sm mt-4 space-y-2'>
                                    <p className='text-gray-500'>Flight Number: <span className='font-bold text-gray-800'>{flight.flightNumber || ''}</span></p>
                                    <p className='text-gray-500'>Airline: <span className='font-bold text-gray-800'>{flight.airline || ''}</span> | <span className='font-bold text-gray-800'> Flight Number: {flight.flightNumber || ''}</span> | <span className='font-bold text-gray-800'> Class: {flight.class || ''}</span></p>
                                    <p className='text-gray-500'>Plane type: <span className='font-bold text-gray-800'>{flight.planeType || ''}</span></p>
                                </div>

                            </Timeline>

                            <Timeline active={4} lineWidth={2} bulletSize={20} color="#364A9C">
                                <div className='border-l-2 border-[#364A9C] h-20 m-0'>
                                    <div className='w-full p-3 bg-[#E5FBE8] flex gap-2 items-center'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24"><g fill="none" stroke="#364A9C" strokeLinecap="round" strokeWidth="1.5"><path strokeLinejoin="round" d="M2 15q.215.641.5 1.245m1.625 2.501q.476.553 1.016 1.035M9 22a11 11 0 0 1-1.304-.518" /><path d="M12 13.5a1.5 1.5 0 1 0-1.5-1.5m1.5 1.5a1.5 1.5 0 0 1-1.5-1.5m1.5 1.5V16m-1.5-4H6" /><path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12" /></g></svg>
                                        <p>Transfer time: <span className='font-bold'>{flight.duration || calculateDuration(flight.departure, flight.arrival)}</span></p>
                                    </div>
                                </div>
                                <Timeline.Item m={0} ml={2} h={10}>
                                    <div className="md:grid grid-cols-6">
                                        <p className='col-span-2 text-gray-500 text-sm'>06:05 <span className=''>20.08 Wednesday</span></p>
                                        <p className='col-span-3 text-sm font-semibold'>{flight.from}</p>
                                    </div>
                                </Timeline.Item>
                                <Timeline.Item ml={2} >
                                    <div className="md:grid grid-cols-6">
                                        <p className='col-span-2 text-gray-500 text-sm'>22:06 <span className=''>20.08 Wednesday</span></p>
                                        <p className='col-span-3 text-sm font-semibold'>{flight.to}</p>
                                    </div>
                                </Timeline.Item>
                                <div className='border-l-2 border-[#364A9C] h-24 m-0 pl-5 text-sm mt-4 space-y-2'>
                                    <p className='text-gray-500'>Flight Number: <span className='font-bold text-gray-800'>{flight.flightNumber || ''}</span></p>
                                    <p className='text-gray-500'>Airline: <span className='font-bold text-gray-800'>{flight.airline || ''}</span> | <span className='font-bold text-gray-800'> Flight Number: {flight.flightNumber || ''}</span> | <span className='font-bold text-gray-800'> Class: {flight.class || ''}</span></p>
                                    <p className='text-gray-500'>Plane type: <span className='font-bold text-gray-800'>{flight.planeType || ''}</span></p>
                                </div>
                            </Timeline>
                        </Collapse>

                        {
                            // is last flight
                            index === flights.length - 1 && (
                                <>
                                    <Divider />
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
                                </>
                            )}

                        {index == flights.length - 1 && (

                            onBookNow && <div className='md:w-fit w-full'>
                                <Button
                                    color="#364A9C"
                                    size="md"
                                    w="100%"
                                    radius="xl"
                                    onClick={() => onBookNow && onBookNow(flight)}
                                >
                                    Book Now
                                </Button>
                            </div>
                        )}

                    </Stack>
                </div>

            ))}

            {/* Luggage Info Modal */}
            <LuggageInfoModal
                opened={luggageModalOpened}
                onClose={() => setLuggageModalOpened(false)}
            />

            {/* Tarif Condition Modal */}
            <TarifConditionModal
                opened={tarifModalOpened}
                onClose={() => setTarifModalOpened(false)}
            />
        </AnimatedCard>
    );
};


