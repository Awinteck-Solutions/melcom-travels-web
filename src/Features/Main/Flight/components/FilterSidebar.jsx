import { useState, useEffect, useMemo } from 'react';
import { 
    Checkbox, 
    Slider, 
    RangeSlider, 
    Card, 
    Text, 
    Group, 
    Stack, 
    Button,
    Collapse,
    ActionIcon,
    Badge
} from '@mantine/core';
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import { useSearchContext } from '../../../../context';

const FilterSidebar = () => {
    const { setFilters, results } = useSearchContext();
    
    // Extract price range from results
    const priceRangeData = useMemo(() => {
        if (!results?.results?.flights || results.results.flights.length === 0) {
            return { min: 100, max: 1200 };
        }

        const prices = results.results.flights.map(flight => parseFloat(flight.price.total));
        const minPrice = Math.floor(Math.min(...prices));
        const maxPrice = Math.ceil(Math.max(...prices));
        
        return { min: minPrice, max: maxPrice };
    }, [results?.results?.flights]);

    // State for all filters
    const [selectedClass, setSelectedClass] = useState('economy');
    const [priceRange, setPriceRange] = useState([priceRangeData.min, priceRangeData.max]);
    const [departureTime, setDepartureTime] = useState([0, 24]);
    const [arrivalTime, setArrivalTime] = useState([0, 24]);
    const [transitionTime, setTransitionTime] = useState([0, 24]);
    const [journeyTime, setJourneyTime] = useState([0, 24]);
    const [selectedAirlines, setSelectedAirlines] = useState([]);
    const [selectedStops, setSelectedStops] = useState([]);
    
    // Collapse states for filter sections
    const [classExpanded, setClassExpanded] = useState(true);
    const [priceExpanded, setPriceExpanded] = useState(true);
    const [timeExpanded, setTimeExpanded] = useState(true);
    const [airlinesExpanded, setAirlinesExpanded] = useState(true);
    const [stopsExpanded, setStopsExpanded] = useState(true);

    // Extract unique airlines from results
    const airlines = useMemo(() => {
        if (!results?.results?.flights) {
            return [
                'Emirate Airline',
                'RwandaAir',
                'EgyptAir',
                'Kenya Airways',
                'Qatar Airways',
                'Air Force',
                'Royal Air Maroc',
                'Turkish Airways'
            ];
        }

        const uniqueAirlines = new Set();
        results.results.flights.forEach(flight => {
            flight.segments.forEach(segment => {
                if (segment.airline && segment.airline.name) {
                    uniqueAirlines.add(segment.airline.name);
                }
            });
        });

        return Array.from(uniqueAirlines).sort();
    }, [results?.results?.flights]);

    // Extract stops data from results
    const stops = useMemo(() => {
        if (!results?.results?.flights) {
            return [
                { label: 'Direct flight (0)', value: 'direct', count: 0 },
                { label: '1 Stop', value: '1-stop', count: 0 },
                { label: '1+ Stops', value: '1-plus-stops', count: 0 }
            ];
        }

        const stopCounts = {
            direct: 0,
            '1-stop': 0,
            '1-plus-stops': 0
        };

        results.results.flights.forEach(flight => {
            const flightStops = flight.segments.length - 1;
            if (flightStops === 0) {
                stopCounts.direct++;
            } else if (flightStops === 1) {
                stopCounts['1-stop']++;
            } else if (flightStops > 1) {
                stopCounts['1-plus-stops']++;
            }
        });

        return [
            { label: `Direct flight (${stopCounts.direct})`, value: 'direct', count: stopCounts.direct },
            { label: `1 Stop (${stopCounts['1-stop']})`, value: '1-stop', count: stopCounts['1-stop'] },
            { label: `1+ Stops (${stopCounts['1-plus-stops']})`, value: '1-plus-stops', count: stopCounts['1-plus-stops'] }
        ];
    }, [results?.results?.flights]);

    // Handle airline selection
    const handleAirlineChange = (airline, checked) => {
        if (checked) {
            setSelectedAirlines([...selectedAirlines, airline]);
        } else {
            setSelectedAirlines(selectedAirlines.filter(a => a !== airline));
        }
    };

    // Handle stops selection
    const handleStopChange = (stop, checked) => {
        if (checked) {
            setSelectedStops([...selectedStops, stop]);
        } else {
            setSelectedStops(selectedStops.filter(s => s !== stop));
        }
    };

    // Update price range when data changes
    useEffect(() => {
        setPriceRange([priceRangeData.min, priceRangeData.max]);
    }, [priceRangeData]);

    // Update filters in context whenever any filter changes
    useEffect(() => {
        const currentFilters = {
            selectedClass,
            priceRange,
            departureTime,
            arrivalTime,
            transitionTime,
            journeyTime,
            selectedAirlines,
            selectedStops
        };
        setFilters(currentFilters);
    }, [
        selectedClass, 
        priceRange, 
        departureTime, 
        arrivalTime, 
        transitionTime, 
        journeyTime, 
        selectedAirlines, 
        selectedStops, 
        setFilters
    ]);

    // Format time for display
    const formatTime = (hours) => {
        const hour = Math.floor(hours);
        const minute = Math.round((hours - hour) * 60);
        return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
    };

    // Clear all filters
    const clearAllFilters = () => {
        setSelectedClass('economy');
        setPriceRange([priceRangeData.min, priceRangeData.max]);
        setDepartureTime([0, 24]);
        setArrivalTime([0, 24]);
        setTransitionTime([0, 24]);
        setJourneyTime([0, 24]);
        setSelectedAirlines([]);
        setSelectedStops([]);
    };

    return (
        <Card className="w-96" radius="lg" shadow="sm" withBorder>
            <Stack gap="lg">
                {/* Clear Filters Button */}
                <Group justify="space-between" mb="md">
                    <Text fw={600} size="lg" c="#364A9C">
                        Filters
                    </Text>
                    <Button
                        variant="outline"
                        size="xs"
                        color="gray"
                        onClick={clearAllFilters}
                    >
                        Clear All
                    </Button>
                </Group>
                {/* Class Selection */}
                <div>
                    <Group justify="space-between" mb="md">
                        <Text fw={600} size="md" c="#364A9C">
                            Class
                        </Text>
                        <ActionIcon
                            variant="subtle"
                            color="#364A9C"
                            onClick={() => setClassExpanded(!classExpanded)}
                        >
                            {classExpanded ? <IconChevronUp size={16} /> : <IconChevronDown size={16} />}
                        </ActionIcon>
                    </Group>
                    
                    <Collapse in={classExpanded}>
                        <Group gap="xs">
                            {['Economy', 'First Class', 'Business'].map((className) => (
                                <Button
                                    key={className}
                                    variant={selectedClass === className.toLowerCase().replace(' ', '-') ? 'filled' : 'outline'}
                                    color={selectedClass === className.toLowerCase().replace(' ', '-') ? 'indigo' : 'gray'}
                                    size="sm"
                                    onClick={() => setSelectedClass(className.toLowerCase().replace(' ', '-'))}
                                    style={{ 
                                        minWidth: '80px',
                                        background: selectedClass === className.toLowerCase().replace(' ', '-') 
                                            ? 'linear-gradient(to right, #243167, #364A9C)' 
                                            : undefined
                                    }}
                                >
                                    {className}
                                </Button>
                            ))}
                        </Group>
                    </Collapse>
                </div>

                {/* Price Range */}
                <div className='m-2'>
                    <Group justify="space-between" mb="md">
                        <Text fw={600} size="md" c="#364A9C">
                            Prices
                        </Text>
                        <ActionIcon
                            variant="subtle"
                            color="#364A9C"
                            onClick={() => setPriceExpanded(!priceExpanded)}
                        >
                            {priceExpanded ? <IconChevronUp size={16} /> : <IconChevronDown size={16} />}
                        </ActionIcon>
                    </Group>
                    
                    <Collapse in={priceExpanded}>
                        <Stack gap="md">
                            <Group justify="space-between">
                                <Text size="sm" c="gray.6">₵{priceRange[0]}</Text>
                                <Text size="sm" c="gray.6">₵{priceRange[1]}</Text>
                            </Group>
                            
                            <RangeSlider
                                value={priceRange}
                                onChange={setPriceRange}
                                min={priceRangeData.min}
                                max={priceRangeData.max}
                                step={Math.max(1, Math.floor((priceRangeData.max - priceRangeData.min) / 20))}
                                marks={[
                                    { value: priceRangeData.min, label: `₵${priceRangeData.min}` },
                                    { value: Math.floor((priceRangeData.min + priceRangeData.max) / 2), label: `₵${Math.floor((priceRangeData.min + priceRangeData.max) / 2)}` },
                                    { value: priceRangeData.max, label: `₵${priceRangeData.max}` }
                                ]}
                                color="#364A9C"
                                size="xs"
                                styles={{
                                    thumb: {
                                        background: 'linear-gradient(to right, #243167, #364A9C)',
                                        border: 'none'
                                    },
                                    track: {
                                        '&[dataFilled]': {
                                            background: 'linear-gradient(to right, #243167, #364A9C)'
                                        }
                                    }
                                }}
                            />
                        </Stack>
                    </Collapse>
                </div>

                {/* Time Filters */}
                <div>
                    <Group justify="space-between" mb="md">
                        <Text fw={600} size="md" c="#364A9C">
                            Time Filters
                        </Text>
                        <ActionIcon
                            variant="subtle"
                            color="#364A9C"
                            onClick={() => setTimeExpanded(!timeExpanded)}
                        >
                            {timeExpanded ? <IconChevronUp size={16} /> : <IconChevronDown size={16} />}
                        </ActionIcon>
                    </Group>
                    
                    <Collapse in={timeExpanded}>
                        <Stack gap="lg">
                            {/* Departure Time */}
                            <div>
                                <Group justify="space-between" mb="xs">
                                    <Text size="sm" c="gray.6">Departure Time:</Text>
                                    <Text size="sm" c="gray.6">
                                        {formatTime(departureTime[0])} - {formatTime(departureTime[1])}
                                    </Text>
                                </Group>
                                <RangeSlider
                                    value={departureTime}
                                    onChange={setDepartureTime}
                                    min={0}
                                    max={24}
                                    step={0.5}
                                    color="#364A9C"
                                    size="xs"
                                    styles={{
                                        thumb: {
                                            background: 'linear-gradient(to right, #243167, #364A9C)',
                                            border: 'none'
                                        },
                                        track: {
                                            '&[dataFilled]': {
                                                background: 'linear-gradient(to right, #243167, #364A9C)'
                                            }
                                        }
                                    }}
                                />
                            </div>

                            {/* Time Of Arrival */}
                            <div>
                                <Group justify="space-between" mb="xs">
                                    <Text size="sm" c="gray.6">Time Of Arrival</Text>
                                    <Text size="sm" c="gray.6">
                                        {formatTime(arrivalTime[0])} - {formatTime(arrivalTime[1])}
                                    </Text>
                                </Group>
                                <RangeSlider
                                    value={arrivalTime}
                                    onChange={setArrivalTime}
                                    min={0}
                                    max={24}
                                    step={0.5}
                                    color="#364A9C"
                                    size="xs"
                                    styles={{
                                        thumb: {
                                            background: 'linear-gradient(to right, #243167, #364A9C)',
                                            border: 'none'
                                        },
                                        track: {
                                            '&[dataFilled]': {
                                                background: 'linear-gradient(to right, #243167, #364A9C)'
                                            }
                                        }
                                    }}
                                />
                            </div>

                            {/* Transition Time */}
                            <div>
                                <Group justify="space-between" mb="xs">
                                    <Text size="sm" c="gray.6">Transition Time</Text>
                                    <Text size="sm" c="gray.6">
                                        {formatTime(transitionTime[0])} - {formatTime(transitionTime[1])}
                                    </Text>
                                </Group>
                                <RangeSlider
                                    value={transitionTime}
                                    onChange={setTransitionTime}
                                    min={0}
                                    max={24}
                                    step={0.5}
                                    color="#364A9C"
                                    size="xs"
                                    styles={{
                                        thumb: {
                                            background: 'linear-gradient(to right, #243167, #364A9C)',
                                            border: 'none'
                                        },
                                        track: {
                                            '&[dataFilled]': {
                                                background: 'linear-gradient(to right, #243167, #364A9C)'
                                            }
                                        }
                                    }}
                                />
                            </div>

                            {/* Journey Time */}
                            <div>
                                <Group justify="space-between" mb="xs">
                                    <Text size="sm" c="gray.6">Journey Time</Text>
                                    <Text size="sm" c="gray.6">
                                        {formatTime(journeyTime[0])} - {formatTime(journeyTime[1])}
                                    </Text>
                                </Group>
                                <RangeSlider
                                    value={journeyTime}
                                    onChange={setJourneyTime}
                                    min={0}
                                    max={24}
                                    step={0.5}
                                    color="#364A9C"
                                    size="xs"
                                    styles={{
                                        thumb: {
                                            background: 'linear-gradient(to right, #243167, #364A9C)',
                                            border: 'none'
                                        },
                                        track: {
                                            '&[dataFilled]': {
                                                background: 'linear-gradient(to right, #243167, #364A9C)'
                                            }
                                        }
                                    }}
                                />
                            </div>
                        </Stack>
                    </Collapse>
                </div>

                {/* Airlines Filter */}
                <div>
                    <Group justify="space-between" mb="md">
                        <Text fw={600} size="md" c="#364A9C">
                            Airlines
                        </Text>
                        <ActionIcon
                            variant="subtle"
                            color="#364A9C"
                            onClick={() => setAirlinesExpanded(!airlinesExpanded)}
                        >
                            {airlinesExpanded ? <IconChevronUp size={16} /> : <IconChevronDown size={16} />}
                        </ActionIcon>
                    </Group>
                    
                    <Collapse in={airlinesExpanded}>
                        <Stack gap="sm">
                            {airlines.map((airline) => (
                                <Group key={airline} gap="xs">
                                    <Checkbox
                                        checked={selectedAirlines.includes(airline)}
                                        onChange={(event) => handleAirlineChange(airline, event.currentTarget.checked)}
                                        size="sm"
                                        color="#364A9C"
                                    />
                                    <Text size="sm" c="gray.6">
                                        {airline}
                                    </Text>
                                </Group>
                            ))}
                        </Stack>
                    </Collapse>
                </div>

                {/* Stops Filter */}
                <div>
                    <Group justify="space-between" mb="md">
                        <Text fw={600} size="md" c="#364A9C">
                            Stops from Amsterdam
                        </Text>
                        <ActionIcon
                            variant="subtle"
                            color="#364A9C"
                            onClick={() => setStopsExpanded(!stopsExpanded)}
                        >
                            {stopsExpanded ? <IconChevronUp size={16} /> : <IconChevronDown size={16} />}
                        </ActionIcon>
                    </Group>
                    
                    <Collapse in={stopsExpanded}>
                        <Stack gap="sm">
                            {stops.map((stop) => (
                                <Group key={stop.value} justify="space-between">
                                    <Group gap="xs">
                                        <Checkbox
                                            checked={selectedStops.includes(stop.value)}
                                            onChange={(event) => handleStopChange(stop.value, event.currentTarget.checked)}
                                            size="sm"
                                            color="#364A9C"
                                        />
                                        <Text size="sm" c="gray.6">
                                            {stop.label}
                                        </Text>
                                    </Group>
                                </Group>
                            ))}
                        </Stack>
                    </Collapse>
                </div>
            </Stack>
        </Card>
    );
};

export default FilterSidebar;
