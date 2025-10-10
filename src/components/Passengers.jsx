import { useEffect, useState } from 'react';

const Passengers = ({
    value = { adult: 1, children: 0, infant: 0 },
    onChange,
    placeholder = "Select Passengers",
    className = "",
    disabled = false
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [passengers, setPassengers] = useState(value);

    // Update passengers when value prop changes
    useEffect(() => {
        setPassengers(value);
    }, [value]);

    // Passenger types with their age ranges and icons
    const passengerTypes = [
        {
            key: 'adult',
            label: 'Adult',
            description: 'Age 12 or older',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 1200 1200"><path fill="currentColor" d="M605.096 480c-135.542-2.098-239.082-111.058-239.999-240C367.336 105.667 477.133.942 605.096 0c135.662 5.13 239.036 108.97 240.001 240c-2.668 134.439-111.907 239.09-240.001 240m194.043 49.788c170.592 1.991 257.094 151.63 257.881 301.269V1200H889.784l.001-324.254c-4.072-22.416-19.255-30.018-33.164-27.82c-13.022 2.059-24.929 12.701-25.56 27.82V1200h-464.67V875.746c-3.557-21.334-17.128-29.537-30.331-28.709c-14.138.889-27.853 12.135-28.393 28.709V1200h-164.68V831.057c-.98-159.475 99.901-300.087 259.137-301.269z"/></svg>
            )
        },
        {
            key: 'children',
            label: 'Children',
            description: 'Age 2 to 12',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20.666666666666668" viewBox="0 0 384 512"><path fill="currentColor" d="M256 64a64 64 0 1 0-128 0a64 64 0 1 0 128 0M152.9 169.3c-23.7-8.4-44.5-24.3-58.8-45.8L74.6 94.2C64.8 79.5 45 75.6 30.2 85.4s-18.7 29.7-8.9 44.4L40.9 159c18.1 27.1 42.8 48.4 71.1 62.4V480c0 17.7 14.3 32 32 32s32-14.3 32-32v-96h32v96c0 17.7 14.3 32 32 32s32-14.3 32-32V221.6c29.1-14.2 54.4-36.2 72.7-64.2l18.2-27.9c9.6-14.8 5.4-34.6-9.4-44.3s-34.6-5.5-44.3 9.4L291 122.4c-21.8 33.4-58.9 53.6-98.8 53.6c-12.6 0-24.9-2-36.6-5.8c-.9-.3-1.8-.7-2.7-.9"/></svg>
            )
        },
        {
            key: 'infant',
            label: 'Infant',
            description: 'Age below 2',
            icon: (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 48 48"><defs><mask id="IconifyId1990ef51ebc461da05"><g fill="none"><path fill="#fff" fill-rule="evenodd" stroke="#fff" stroke-width="4" d="M24 43.6c8.432 0 15.56-6.68 17.894-14.35C42.418 27.526 46 27.526 46 23.8s-3.616-3.94-4.201-5.752C39.372 10.535 32.32 4 24 4C15.675 4 8.62 10.54 6.197 18.06C5.615 19.87 2 20.01 2 23.8s3.592 3.79 4.135 5.542C8.497 36.964 15.602 43.6 24 43.6Z" clip-rule="evenodd"/><path stroke="#fff" stroke-linecap="round" stroke-width="4" d="M41.799 18.048C39.372 10.535 32.32 4 24 4"/><path fill="#000" stroke="#000" d="M19.1 21.6c0 .826-.224 1.552-.56 2.056c-.339.508-.751.744-1.14.744s-.8-.236-1.14-.744c-.336-.504-.56-1.23-.56-2.056s.224-1.552.56-2.056c.34-.508.752-.744 1.14-.744c.389 0 .801.236 1.14.744c.336.504.56 1.23.56 2.056Zm13.2 0c0 .826-.224 1.552-.56 2.056c-.339.508-.752.744-1.14.744s-.801-.236-1.14-.744c-.336-.504-.56-1.23-.56-2.056s.224-1.552.56-2.056c.339-.508.752-.744 1.14-.744s.801.236 1.14.744c.336.504.56 1.23.56 2.056Z"/><path fill="#000" fill-rule="evenodd" d="M18.498 31.75q2.896 1.95 5.511 1.95q2.613 0 5.18-1.945" clip-rule="evenodd"/><path stroke="#000" stroke-linecap="round" stroke-width="4" d="M18.498 31.75q2.896 1.95 5.511 1.95q2.613 0 5.18-1.945"/><path stroke="#fff" stroke-linecap="round" stroke-width="4" d="M31.728 6.2q.402 2.901-1.769 4.239t-7.055 1.254"/></g></mask></defs><path fill="currentColor" d="M0 0h48v48H0z" mask="url(#IconifyId1990ef51ebc461da05)"/></svg>
            )
        }
    ];

    // Calculate total passengers
    const totalPassengers = passengers.adult + passengers.children + passengers.infant;

    // Update passenger count
    const updatePassengerCount = (type, operation) => {
        const newPassengers = { ...passengers };

        if (operation === 'increase') {
            newPassengers[type]++;
        } else if (operation === 'decrease') {
            newPassengers[type] = Math.max(0, newPassengers[type] - 1);
        }

        // Ensure at least 1 adult
        if (type === 'adult' && newPassengers.adult < 1) {
            newPassengers.adult = 1;
        }

        setPassengers(newPassengers);
        onChange(newPassengers);
    };

    // Format display text
    const formatDisplayText = () => {
        if (totalPassengers === 0) return placeholder;

        const parts = [];
        if (passengers.adult > 0) parts.push(`${passengers.adult} Adult${passengers.adult > 1 ? 's' : ''}`);
        if (passengers.children > 0) parts.push(`${passengers.children} Child${passengers.children > 1 ? 'ren' : ''}`);
        if (passengers.infant > 0) parts.push(`${passengers.infant} Infant${passengers.infant > 1 ? 's' : ''}`);

        return parts.join(', ');
    };

    // Close popup when clicking outside
  
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isOpen && !event.target.closest('.passengers-container')) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    return (
        <div className={`passengers-container relative ${className}`}>
            {/* Input Field */}
            <div
                className={`
          w-[200px] h-[60px]l rounded-lg 
          flex items-center justify-center cursor-pointer
          ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white hover:border-[#364A9C]'}
          ${isOpen ? 'border-[#364A9C]' : ''}
        `}
                onClick={() => !disabled && setIsOpen(!isOpen)}
            >
                <span className={`hover:text-[#364A9C] font-semibold hover:border-b-2 hover:border-[#364A9C]`}>
                    Passengers
                </span>

                <svg
                    className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
            </div>

            <div className='flex items-end justify-center gap-2'>
                <span className='text-[35px] font-bold h-[40px] p-0'>
                    {totalPassengers} 
                </span>
                <span className='text-lg h-[21px] p-0'>
                    Passenger{totalPassengers !== 1 ? 's' : ''}
                </span>
            </div>
            <div className='text-xs text-gray-500 text-center mt-2'>
                 {formatDisplayText()}
            </div>



            {/* Passenger Picker Popup */}
            {isOpen && (
                <div className="absolute top-full md:-right-8 -right-14 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-50 min-w-64 md:w-[380px] w-[300px]">
                    <div className="space-y-4">
                        {passengerTypes.map((type) => (
                            <div key={type.key} className="flex items-center justify-between">
                                <div className="flex items-center space-x-3">
                                    <div className='rounded-full text-[#364A9C] bg-[#364A9C]/10 md:p-4 p-2'>
                                    {type.icon}
                                   </div>
                                    <div className='text-left'>
                                        <div className="font-medium text-gray-800">{type.label}</div>
                                        <p className='md:text-sm text-xs text-gray-500'>{ type.description}</p>
                                    </div>
                                </div>
                                

                                <div className="flex items-center space-x-2 border rounded-full p-1">
                                    <button
                                        onClick={() => updatePassengerCount(type.key, 'decrease')}
                                        disabled={type.key === 'adult' && passengers[type.key] <= 1}
                                        className={`
                      md:w-8 w-6 md:h-8 h-6 border border-gray-300 bg-[#364A9C]/10 rounded-full flex items-center justify-center 
                      hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed
                      ${type.key === 'adult' && passengers[type.key] <= 1 ? 'cursor-not-allowed' : 'cursor-pointer'}
                    `}
                                    >
                                        <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                                        </svg>
                                    </button>

                                    <span className="w-8 text-center font-medium text-gray-900">
                                        {passengers[type.key]}
                                    </span>

                                    <button
                                        onClick={() => updatePassengerCount(type.key, 'increase')}
                                        className="md:w-8 w-6 md:h-8 h-6 border border-gray-300 bg-[#364A9C]/10 rounded-full flex items-center justify-center hover:bg-gray-50 transition-colors cursor-pointer"
                                    >
                                        <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                            
                        ))}
                    </div>

                    {/* Total Summary */}
                    <div className="mt-4 pt-3 border-t border-gray-200">
                        <div className="flex justify-between items-center mb-2">
                            <span className="text-sm font-medium text-gray-700">Total Passengers:</span>
                            <span className="text-lg font-bold text-[#364A9C]">{totalPassengers}</span>
                        </div>

                        {/* Close Button */}
                        <button
                            onClick={() => setIsOpen(false)}
                            className="w-full py-2 px-4 text-sm font-medium bg-[#364A9C] hover:bg-blue-50 rounded-lg transition-colors"
                        >
                            Done
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Passengers;
