import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGlobalContext } from '../../../context';
import Container from '../../../components/Container';
import Header from '../../../components/Header';
import {
    Card,
    Text,
    Group,
    Stack,
    Button,
    Badge,
    Collapse,
    ActionIcon,
    Divider,
    Timeline
} from '@mantine/core';
import { IconChevronDown, IconShare, IconLuggage, IconDownload, IconPrinter } from '@tabler/icons-react';

const FlightPreviewPage = () => {
  const navigate = useNavigate();
  const { bookingId } = useParams();
  const { user } = useGlobalContext();
  const [showDetails, setShowDetails] = useState(false);

  // Mock flight booking data - in real app, this would come from API
  const flightBooking = {
    id: bookingId || '1',
    bookingNumber: 'BK-2025-001234',
    status: 'Confirmed',
    bookingDate: '2025-01-15',
    passenger: {
      name: user?.name || 'Honya Bright',
      email: user?.email || 'Honyabright4278@gmail.com',
      phone: '+233 24 123 4567',
      passport: 'G12345678'
    },
    flight: {
      airline: 'Emirates',
      airlineLogo: '/emirates.svg',
      flightNumber: 'EK123',
      aircraft: 'Boeing 777-300ER',
      class: 'First Class',
      price: 100,
      currency: 'GH₵',
      from: 'Kotoka International Airport, Accra',
      fromCode: 'ACC',
      to: 'Dubai International Airport, Dubai',
      toCode: 'DXB',
      departure: '2025-09-05T08:30:00',
      arrival: '2025-09-05T15:33:00',
      duration: '7hrs 3m',
      stops: 0,
      baggage: {
        checked: '23kg included',
        carryOn: '7kg included'
      },
      seat: '1A',
      gate: 'A12',
      terminal: 'Terminal 3'
    },
    payment: {
      method: 'Credit Card',
      amount: 100,
      currency: 'GH₵',
      transactionId: 'TXN-789456123'
    }
  };

  const handleBack = () => {
    navigate('/bookings');
  };

  const handleDownloadTicket = () => {
    console.log('Downloading ticket for booking:', flightBooking.bookingNumber);
    // In real app, this would trigger PDF download
  };

  const handlePrintTicket = () => {
    console.log('Printing ticket for booking:', flightBooking.bookingNumber);
    // In real app, this would trigger print dialog
  };

  const handleShareBooking = () => {
    console.log('Sharing booking:', flightBooking.bookingNumber);
    // In real app, this would open share dialog
  };

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

  // Flight route visualization
  const FlightRoute = () => (
    <div className="flex justify-start items-center m-auto md:m-0">
      <div className="w-2.5 h-2.5 p-0.5 bg-indigo-800 rounded-xl shadow-[0px_0px_7.99px_0.74px_rgba(118,149,255,0.62)]"></div>
      <div className="flex justify-start items-center gap-7">
        <div className="w-14 h-0 border-t-[1.48px] border-dashed border-neutral-200"></div>
        <div className="w-8 h-6 flex items-center justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 1200 1200">
            <path fill="#364A9C" d="M321 1164h120l269.28-480.06H1020s180 0 180-83.94c0-84-180-84-180-84H710.28L441 36H321l149.28 480H255.06L120 395.94H0l96.06 204L0 804h120l135.06-120.06h215.22z" />
          </svg>
        </div>
        <div className="w-12 h-0 border-t-[1.48px] border-dashed border-neutral-200"></div>
      </div>
      <div className="w-2.5 h-2.5 p-0.5 bg-indigo-800 rounded-xl shadow-[0px_0px_7.99px_0.74px_rgba(118,149,255,0.62)]"></div>
    </div>
  );

  return (
    <Container>
      {/* Header */}
      <Header currentPage="flights" />
      <div className='relative'>
        <div className="absolute md:-top-20 -top-12 left-0 w-full h-full">
          <img src="/contact-dots.svg" alt="stars" className="md:w-1/2 w-4/5 m-auto object-cover" />
        </div>
      </div>

      <div className='md:mx-20 mx-4 rounded-3xl border mb-5 overflow-hidden h-fit'>
        {/* Back Button */}
        <div className="flex items-center m-4">
          <button
            onClick={handleBack}
            className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
          >
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center mr-3">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </div>
            <span className="font-medium">Back to Bookings</span>
          </button>
        </div>

        <div className="bg-white flex justify-center md:px-4">
          <div className="w-full max-w-4xl">
            {/* Page Header */}
            <div className="text-center mb-8 relative z-10">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Flight Booking Details</h1>
              <p className="text-gray-600">Booking Reference: {flightBooking.bookingNumber}</p>
              <Badge 
                color="green" 
                variant="light" 
                size="lg" 
                className="mt-2"
              >
                {flightBooking.status}
              </Badge>
            </div>

            {/* Flight Details Card */}
            <Card className="w-full mb-6" radius="xl" shadow="sm" withBorder>
              <Stack gap="lg">
                {/* Header with airline, class, and price */}
                <Group justify="space-between" align="center">
                  <Group gap="sm">
                    <div className='w-12 h-12 rounded-full overflow-hidden bg-gray-100 flex items-center justify-center'>
                      <img src={flightBooking.flight.airlineLogo} alt={flightBooking.flight.airline} className="w-8 h-8" />
                    </div>
                    <div>
                      <Text size="lg" fw={500} c="gray.6">
                        {flightBooking.flight.airline}
                      </Text>
                      <Text size="sm" c="gray.5">
                        {flightBooking.flight.flightNumber}
                      </Text>
                    </div>
                  </Group>

                  <Badge
                    variant="light"
                    color="#364A9C"
                    size="lg"
                  >
                    {flightBooking.flight.class}
                  </Badge>

                  <div className="text-right">
                    <p className='text-3xl font-bold text-gray-800'>
                      {flightBooking.flight.currency}{flightBooking.flight.price}
                    </p>
                    <Text size="sm" c="gray.5">
                      Paid on {formatDate(flightBooking.bookingDate)}
                    </Text>
                  </div>
                </Group>

                {/* Flight route */}
                <Group justify="space-between" align="center">
                  <Stack gap="xs" align="center" className='m-auto md:m-0'>
                    <p className='text-xl font-bold text-gray-800'>
                      {formatTime(flightBooking.flight.departure)}
                    </p>
                    <Badge variant="light" color="#364A9C" size="lg">
                      {flightBooking.flight.fromCode}
                    </Badge>
                    <Text size="xs" c="gray.5" className="text-center max-w-24">
                      {flightBooking.flight.from}
                    </Text>
                  </Stack>

                  <FlightRoute />

                  <Stack gap="xs" align="center" className='m-auto md:m-0'>
                    <p className='text-xl font-bold text-gray-800'>
                      {formatTime(flightBooking.flight.arrival)}
                    </p>
                    <Badge variant="light" color="#364A9C" size="lg">
                      {flightBooking.flight.toCode}
                    </Badge>
                    <Text size="xs" c="gray.5" className="text-center max-w-24">
                      {flightBooking.flight.to}
                    </Text>
                  </Stack>
                </Group>

                {/* Flight details */}
                <Group justify="space-between" align="center">
                  <Group gap="lg">
                    <Stack gap="xs" className='m-auto md:m-0'>
                      <p className='text-sm text-gray-600'>Departure Date</p>
                      <Badge variant="light" color="gray" size="lg">
                        <p className='text-sm font-semibold capitalize text-gray-800'>
                          {formatDate(flightBooking.flight.departure)}
                        </p>
                      </Badge>
                    </Stack>
                    <Stack gap="xs" className='m-auto md:m-0'>
                      <p className='text-sm text-gray-600'>Duration</p>
                      <Badge variant="light" color="gray" size="lg">
                        <p className='text-sm font-semibold capitalize text-gray-800'>
                          {flightBooking.flight.duration}
                        </p>
                      </Badge>
                    </Stack>
                    <Stack gap="xs" className='m-auto md:m-0'>
                      <p className='text-sm text-gray-600'>Stops</p>
                      <Badge variant="light" color="gray" size="lg">
                        <p className='text-sm font-semibold capitalize text-gray-800'>
                          {flightBooking.flight.stops} stops
                        </p>
                      </Badge>
                    </Stack>
                  </Group>
                </Group>

                {/* View Details button */}
                <div>
                  <Button
                    variant="outline"
                    color="#364A9C"
                    size="md"
                    width="fit"
                    radius="xl"
                    rightSection={<IconChevronDown size={16} />}
                    onClick={() => setShowDetails(!showDetails)}
                  >
                    {showDetails ? 'Hide Details' : 'View Details'}
                  </Button>
                </div>

                {/* Expanded details */}
                <Collapse in={showDetails}>
                  <Timeline active={4} lineWidth={2} bulletSize={20} color="#364A9C">
                    <div className='border-l-2 border-[#364A9C] h-20 m-0'>
                      <div className='w-full p-3 bg-[#FEEDDB] flex gap-2 items-center'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24">
                          <g fill="none" stroke="#364A9C" strokeLinecap="round" strokeWidth="1.5">
                            <path strokeLinejoin="round" d="M2 15q.215.641.5 1.245m1.625 2.501q.476.553 1.016 1.035M9 22a11 11 0 0 1-1.304-.518" />
                            <path d="M12 13.5a1.5 1.5 0 1 0-1.5-1.5m1.5 1.5a1.5 1.5 0 0 1-1.5-1.5m1.5 1.5V16m-1.5-4H6" />
                            <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2S2 6.477 2 12" />
                          </g>
                        </svg>
                        <p>Journey time: <span className='font-bold'>{flightBooking.flight.duration}</span></p>
                      </div>
                    </div>
                    <Timeline.Item m={0} ml={2} h={10}>
                      <div className="grid grid-cols-6">
                        <p className='col-span-2 text-gray-500 text-sm'>
                          {formatTime(flightBooking.flight.departure)} {formatDate(flightBooking.flight.departure)}
                        </p>
                        <p className='col-span-3 text-sm font-semibold'>{flightBooking.flight.from}</p>
                      </div>
                    </Timeline.Item>
                    <Timeline.Item ml={2}>
                      <div className="grid grid-cols-6">
                        <p className='col-span-2 text-gray-500 text-sm'>
                          {formatTime(flightBooking.flight.arrival)} {formatDate(flightBooking.flight.arrival)}
                        </p>
                        <p className='col-span-3 text-sm font-semibold'>{flightBooking.flight.to}</p>
                      </div>
                    </Timeline.Item>
                    <div className='border-l-2 border-[#364A9C] h-24 m-0 pl-5 text-sm mt-4 space-y-2'>
                      <p className='text-gray-500'>
                        Flight Number: <span className='font-bold text-gray-800'>{flightBooking.flight.flightNumber}</span>
                      </p>
                      <p className='text-gray-500'>
                        Aircraft: <span className='font-bold text-gray-800'>{flightBooking.flight.aircraft}</span>
                      </p>
                      <p className='text-gray-500'>
                        Seat: <span className='font-bold text-gray-800'>{flightBooking.flight.seat}</span> | 
                        Gate: <span className='font-bold text-gray-800'>{flightBooking.flight.gate}</span> | 
                        Terminal: <span className='font-bold text-gray-800'>{flightBooking.flight.terminal}</span>
                      </p>
                    </div>
                  </Timeline>
                </Collapse>

                <Divider />

                {/* Bottom action bar */}
                <Group justify="space-between" align="center">
                  <Group gap="sm">
                    <ActionIcon variant="subtle" color="#364A9C">
                      <IconLuggage size={20} />
                    </ActionIcon>
                    <Text size="sm" c="#364A9C" fw={500}>
                      {flightBooking.flight.baggage.checked} | {flightBooking.flight.baggage.carryOn}
                    </Text>
                  </Group>

                  <Group gap="lg">
                    <Text size="sm" c="#364A9C" fw={500} style={{ textDecoration: 'underline' }}>
                      Tariff Conditions
                    </Text>
                    <Group gap="xs">
                      <ActionIcon variant="subtle" color="#364A9C" onClick={handleShareBooking}>
                        <IconShare size={16} />
                      </ActionIcon>
                      <Text size="sm" c="#364A9C" fw={500}>
                        Share
                      </Text>
                    </Group>
                  </Group>
                </Group>
              </Stack>
            </Card>

            {/* Passenger Information Card */}
            <Card className="w-full mb-6" radius="xl" shadow="sm" withBorder>
              <Stack gap="md">
                <Text size="lg" fw={600} c="gray.8">Passenger Information</Text>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Text size="sm" c="gray.6" fw={500}>Full Name</Text>
                    <Text size="md" fw={500}>{flightBooking.passenger.name}</Text>
                  </div>
                  <div>
                    <Text size="sm" c="gray.6" fw={500}>Email</Text>
                    <Text size="md" fw={500}>{flightBooking.passenger.email}</Text>
                  </div>
                  <div>
                    <Text size="sm" c="gray.6" fw={500}>Phone</Text>
                    <Text size="md" fw={500}>{flightBooking.passenger.phone}</Text>
                  </div>
                  <div>
                    <Text size="sm" c="gray.6" fw={500}>Passport Number</Text>
                    <Text size="md" fw={500}>{flightBooking.passenger.passport}</Text>
                  </div>
                </div>
              </Stack>
            </Card>

            {/* Payment Information Card */}
            <Card className="w-full mb-6" radius="xl" shadow="sm" withBorder>
              <Stack gap="md">
                <Text size="lg" fw={600} c="gray.8">Payment Information</Text>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Text size="sm" c="gray.6" fw={500}>Payment Method</Text>
                    <Text size="md" fw={500}>{flightBooking.payment.method}</Text>
                  </div>
                  <div>
                    <Text size="sm" c="gray.6" fw={500}>Amount Paid</Text>
                    <Text size="md" fw={500}>{flightBooking.payment.currency}{flightBooking.payment.amount}</Text>
                  </div>
                  <div>
                    <Text size="sm" c="gray.6" fw={500}>Transaction ID</Text>
                    <Text size="md" fw={500}>{flightBooking.payment.transactionId}</Text>
                  </div>
                  <div>
                    <Text size="sm" c="gray.6" fw={500}>Booking Date</Text>
                    <Text size="md" fw={500}>{formatDate(flightBooking.bookingDate)}</Text>
                  </div>
                </div>
              </Stack>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
              <Button
                color="#364A9C"
                size="lg"
                radius="xl"
                leftSection={<IconDownload size={20} />}
                onClick={handleDownloadTicket}
                className="w-full sm:w-auto"
              >
                Download Ticket
              </Button>
              <Button
                variant="outline"
                color="#364A9C"
                size="lg"
                radius="xl"
                leftSection={<IconPrinter size={20} />}
                onClick={handlePrintTicket}
                className="w-full sm:w-auto"
              >
                Print Ticket
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default FlightPreviewPage;
