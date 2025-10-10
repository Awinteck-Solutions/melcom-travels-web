import { useState, useEffect } from 'react';
import { 
    Checkbox, 
    Slider, 
    SegmentedControl, 
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
    const { setFilters } = useSearchContext();
    
    // State for all filters
    const [selectedClass, setSelectedClass] = useState('economy');
    const [priceRange, setPriceRange] = useState([100, 1200]);
    const [wayToggle, setWayToggle] = useState('way-there');
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

    // Airlines data
    const airlines = [
        'Emirate Airline',
        'RwandaAir',
        'EgyptAir',
        'Kenya Airways',
        'Qatar Airways',
        'Air Force',
        'Royal Air Maroc',
        'Turkish Airways'
    ];

    // Stops data
    const stops = [
        { label: 'Direct flight (0)', value: 'direct', count: 0 },
        { label: '1 Stop', value: '1-stop', count: 0 },
        { label: '1+ Stops', value: '1-plus-stops', count: 0 }
    ];

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

    // Update filters in context whenever any filter changes
    useEffect(() => {
        const currentFilters = {
            selectedClass,
            priceRange,
            wayToggle,
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
        wayToggle, 
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

    return (
        <Card className="w-96" radius="lg" shadow="sm" withBorder>
            <Stack gap="lg">
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
                                min={100}
                                max={1200}
                                step={50}
                                marks={[
                                    { value: 100, label: '₵100' },
                                    { value: 600, label: '₵600' },
                                    { value: 1200, label: '₵1200' }
                                ]}
                                color="#364A9C"
                                size="xs"
                                styles={{
                                    thumb: {
                                        background: 'linear-gradient(to right, #243167, #364A9C)',
                                        border: 'none'
                                    },
                                    track: {
                                        '&[data-filled]': {
                                            background: 'linear-gradient(to right, #243167, #364A9C)'
                                        }
                                    }
                                }}
                            />
                        </Stack>
                    </Collapse>
                </div>

                {/* Way Back / Way There Toggle */}
                <div>
                    <Group justify="space-between" mb="md">
                        <Text fw={600} size="md" c="#364A9C">
                            Flight Direction
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
                        <Stack gap="md">
                            <SegmentedControl
                                value={wayToggle}
                                onChange={setWayToggle}
                                data={[
                                    { label: 'Way there', value: 'way-there' },
                                    { label: 'Way back', value: 'way-back' }
                                ]}
                                size="sm"
                                color="#364A9C"
                                styles={{
                                    control: {
                                        '&[data-active]': {
                                            background: 'linear-gradient(to right, #243167, #364A9C)',
                                            color: 'white'
                                        }
                                    }
                                }}
                            />

                            {/* Time Filters */}
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
                                                '&[data-filled]': {
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
                                                '&[data-filled]': {
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
                                                '&[data-filled]': {
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
                                                '&[data-filled]': {
                                                    background: 'linear-gradient(to right, #243167, #364A9C)'
                                                }
                                            }
                                        }}
                                    />
                                </div>
                            </Stack>
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
                                    <Badge variant="light" color="gray" size="sm">
                                        ₵25,000
                                    </Badge>
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
