import { Modal, Table, Text, Group, Button, Stack } from '@mantine/core';
import { IconX } from '@tabler/icons-react';

const LuggageInfoModal = ({ opened, onClose }) => {
    const baggageData = [
        {
            route: "Accra - Kotoka (ACC) → Amsterdam - Schiphol (AMS)",
            carryOn: "1 pc, 23 kg, max 158 cm",
            checkedBaggage: "1 pc, 23 kg, max 158 cm (extra charge may apply)",
            additionalChecked: "1 pc, 12 kg, max 115 cm",
            extraPersonal: "1 pc (Free)",
            link: "Details"
        },
        {
            route: "Amsterdam - Schiphol (AMS) → New York - JFK",
            carryOn: "1 pc, 23 kg, max 158 cm",
            checkedBaggage: "1 pc, 23 kg, max 158 cm (extra charge may apply)",
            additionalChecked: "1 pc, 12 kg, max 115 cm",
            extraPersonal: "1 pc (Free)",
            link: "Details"
        }
    ];

    return (
        <Modal
            radius="xl"
            opened={opened}
            onClose={onClose}
            title={
                <Text size="lg" fw={600} c="#364A9C" className='text-center md:text-xl'>
                    Allowed baggage, parameters and prices (per one passenger)
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
                                <Table.Th><span className='text-xs md:text-sm text-[#364A9C] font-medium'>Route</span></Table.Th>
                                <Table.Th><span className='text-xs md:text-sm text-[#364A9C] font-medium'>Carry-on baggage</span></Table.Th>
                                <Table.Th><span className='text-xs md:text-sm text-[#364A9C] font-medium'>Baggage to be checked in</span></Table.Th>
                                <Table.Th><span className='text-xs md:text-sm text-[#364A9C] font-medium'>Additional baggage to check in</span></Table.Th>
                                <Table.Th><span className='text-xs md:text-sm text-[#364A9C] font-medium'>Link</span></Table.Th>
                            </Table.Tr>
                        </Table.Thead>
                        <Table.Tbody>
                            {baggageData.map((item, index) => (
                                <Table.Tr key={index}>
                                    <Table.Td className="min-w-[200px]">
                                        <Text size="xs" fw={500} className="md:text-sm">
                                            {item.route}
                                        </Text>
                                    </Table.Td>
                                    <Table.Td className="min-w-[120px]">
                                        <Text size="xs" className="md:text-sm">
                                            {item.carryOn}
                                        </Text>
                                    </Table.Td>
                                    <Table.Td className="min-w-[150px]">
                                        <Text size="xs" className="md:text-sm">
                                            {item.checkedBaggage}
                                        </Text>
                                    </Table.Td>
                                    <Table.Td className="min-w-[120px]">
                                        <Text size="xs" className="md:text-sm">
                                            {item.additionalChecked}
                                        </Text>
                                    </Table.Td> 
                                    <Table.Td>
                                        <Text 
                                            size="xs" 
                                            c="#364A9C" 
                                            className="md:text-sm"
                                            style={{ textDecoration: 'underline', cursor: 'pointer' }}
                                            onClick={() => console.log('Details clicked for route:', index)}
                                        >
                                            {item.link}
                                        </Text>
                                    </Table.Td>
                                </Table.Tr>
                            ))}
                        </Table.Tbody>
                    </Table>
                </div>
                
                {/* Additional information text */}
                <div className="space-y-2 md:space-y-3 text-xs md:text-sm text-gray-800">
                    <p>
                        (*) The dimension is calculated as the sum of all three sides (width + height + depth)
                    </p>
                    <p>
                        (-) Detail not provided by the airline. Baggage for check-in is handed over to the airline at the counter before departure.
                    </p>
                    <p>
                        Baggage to be checked in is handed over to the airline at the counter before departure. Often, but not always, one piece of baggage is included in the price of the ticket. Additional baggage to check in is charged, and you have to pay for it at the airport before your flight. Carry-on baggage can take each passenger on board. Baggage usually has the prescribed maximum dimensions and / or weights that must be abided. If you have oversized baggage or are not sure, you can click on the link to look at the airline's website for more details, or to contact us.
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

export default LuggageInfoModal;
