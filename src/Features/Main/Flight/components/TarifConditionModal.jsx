import { Modal, Table, Text, Group, Button, Stack } from '@mantine/core';
import { IconX } from '@tabler/icons-react';

const TarifConditionModal = ({ opened, onClose, cancelTicket, changeTicket, currency = 'GHS' }) => {
    // Format cancellation ticket information
    // console.log('TarifConditionModal - cancelTicket:', cancelTicket);
    const formatCancelTicket = (cancelTicket) => {
        if (!cancelTicket) return null;

        const currencySymbol = currency === 'GHS' ? 'GH₵' : currency;
        const beforeAmount = parseFloat(cancelTicket.amountBeforeDeparture || 0);
        const afterAmount = parseFloat(cancelTicket.amountAfterDeparture || 0);
        
        let description = '';
        if (cancelTicket.included === 'Charged') {
            if (beforeAmount === afterAmount && beforeAmount > 0) {
                description = `Cancellation fee: ${currencySymbol}${beforeAmount.toLocaleString()} (same fee before and after departure)`;
            } else if (beforeAmount > 0 && afterAmount > 0) {
                description = `Cancellation fees: ${currencySymbol}${beforeAmount.toLocaleString()} before departure, ${currencySymbol}${afterAmount.toLocaleString()} after departure`;
            } else {
                description = 'Cancellation fees apply. Amount varies based on timing.';
            }
        } else {
            description = 'Cancellation policy varies. Please check details.';
        }

        return {
            condition: "Cancellation",
            description: description,
            details: "View Details"
        };
    };

    // Format change ticket information
    const formatChangeTicket = (changeTicket) => {
        if (!changeTicket) return null;

        const currencySymbol = currency === 'GHS' ? 'GH₵' : currency;
        const beforeAmount = parseFloat(changeTicket.amountBeforeDeparture || 0);
        const afterAmount = parseFloat(changeTicket.amountAfterDeparture || 0);
        
        let description = '';
        if (changeTicket.included === 'Charged') {
            if (beforeAmount === afterAmount && beforeAmount > 0) {
                description = `Change fee: ${currencySymbol}${beforeAmount.toLocaleString()} (same fee before and after departure)`;
            } else if (beforeAmount > 0 && afterAmount > 0) {
                description = `Change fees: ${currencySymbol}${beforeAmount.toLocaleString()} before departure, ${currencySymbol}${afterAmount.toLocaleString()} after departure`;
            } else {
                description = 'Change fees apply. Amount varies based on timing.';
            }
        } else {
            description = 'Change policy varies. Please check details.';
        }

        return {
            condition: "Changes",
            description: description,
            details: "View Details"
        };
    };

    const cancelInfo = formatCancelTicket(cancelTicket);
    const changeInfo = formatChangeTicket(changeTicket);

    // Build tarif data with API data if available, otherwise use defaults
    const tarifData = [
        cancelInfo || {
            condition: "Cancellation",
            description: "Free cancellation up to 24 hours before departure. After that, cancellation fees may apply.",
            details: "View Details"
        },
        changeInfo || {
            condition: "Changes",
            description: "Changes allowed up to 2 hours before departure. Change fees may apply based on fare type.",
            details: "View Details"
        },
        {
            condition: "Refunds",
            description: "Refunds processed within 7-14 business days. Processing fees may apply.",
            details: "View Details"
        },
        {
            condition: "Baggage",
            description: "Standard baggage allowance included. Additional baggage charges apply for excess weight/size.",
            details: "View Details"
        },
        {
            condition: "Seat Selection",
            description: "Standard seat assignment included. Premium seats available for additional fee.",
            details: "View Details"
        },
        {
            condition: "Meals",
            description: "Complimentary snacks and beverages on board. Full meals available for purchase.",
            details: "View Details"
        },
        {
            condition: "Check-in",
            description: "Online check-in available 24 hours before departure. Airport check-in closes 45 minutes before departure.",
            details: "View Details"
        },
        {
            condition: "Boarding",
            description: "Boarding begins 30 minutes before departure. Priority boarding available for additional fee.",
            details: "View Details"
        }
    ];

    return (
        <Modal
            radius="xl"
            opened={opened}
            onClose={onClose}
            title={
                <Text size="lg" fw={600} c="#364A9C" className='text-center md:text-xl'>
                    Tarif Conditions and Terms
                </Text>
            }
            size="2xl"
            centered
            styles={{
                header: {
                    backgroundColor: '#f8f9fa',
                    borderBottom: '1px solid #e9ecef',
                    padding: '16px 20px',
                },
                body: {
                    padding: '16px 20px',
                },
            }}
        >
            <Stack className='max-h-screen overflow-y-auto'>
                <div className="overflow-x-auto">
                    <Table striped highlightOnHover verticalSpacing="md" className="min-w-full">
                        <Table.Thead>
                            <Table.Tr className='text-xs md:text-sm'>
                                <Table.Th><span className='text-xs md:text-sm text-[#364A9C] font-medium'>Condition</span></Table.Th>
                                <Table.Th><span className='text-xs md:text-sm text-[#364A9C] font-medium'>Description</span></Table.Th>
                                {/* <Table.Th><span className='text-xs md:text-sm text-[#364A9C] font-medium'>Details</span></Table.Th> */}
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {tarifData.map((item, index) => (
                                <Table.Tr key={index}>
                                    <Table.Td className="min-w-[120px]">
                                        <Text size="xs" fw={500} className="md:text-sm">
                                            {item.condition}
                                        </Text>
                                    </Table.Td>
                                    <Table.Td className="min-w-[200px]">
                                        <Text size="xs" className="md:text-sm">
                                            {item.description}
                                        </Text>
                                    </Table.Td>
                                    {/* <Table.Td>
                                        <Text 
                                            size="xs" 
                                            c="#364A9C" 
                                            className="md:text-sm"
                                            style={{ textDecoration: 'underline', cursor: 'pointer' }}
                                            onClick={() => console.log('Details clicked for condition:', item.condition)}
                                        >
                                            {item.details}
                                        </Text>
                                    </Table.Td> */}
                                </Table.Tr>
                            ))}
                        </Table.Tbody>
                    </Table>
                </div>
                
                {/* Additional information text */}
                <div className="space-y-2 md:space-y-3 text-xs md:text-sm text-gray-800">
                    <p>
                        <strong>Important Notes:</strong>
                    </p>
                    <p>
                        • All conditions are subject to airline policies and may vary by route and fare type.
                    </p>
                    <p>
                        • Additional fees may apply for services not included in your fare.
                    </p>
                    <p>
                        • Please review all terms and conditions before confirming your booking.
                    </p>
                    <p>
                        • For specific questions about your booking, please contact our customer service team.
                    </p>
                    <p>
                        • Changes to government regulations or airline policies may affect these conditions.
                    </p>
                </div>
            </Stack>
            {/* Decorative illustration */}
            <div className="relative mt-4 md:mt-6 hidden lg:block">
                <div className="absolute -bottom-10 -right-6">
                    <img className='h-[120px] md:h-[160px]' src="/modal-corner.png" alt="" />
                </div>
            </div>
        </Modal>
    );
};

export default TarifConditionModal;
