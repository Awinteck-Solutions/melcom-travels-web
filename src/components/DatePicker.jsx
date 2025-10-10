import { useState, useEffect } from 'react';

const DatePicker = ({
    title,
    value,
    onChange,
    placeholder = "Select Date",
    className = "",
    disabled = false,
    type = "oneway"
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(value ? new Date(value) : null);

    // Update selectedDate when value prop changes
    useEffect(() => {
        if (value) {
            setSelectedDate(new Date(value));
        } else {
            setSelectedDate(null);
        }
    }, [value]);

    // Month names
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];

    // Days of the week
    const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

    // Get days in month
    const getDaysInMonth = (year, month) => {
        return new Date(year, month + 1, 0).getDate();
    };

    // Get first day of month
    const getFirstDayOfMonth = (year, month) => {
        return new Date(year, month, 1).getDay();
    };

    // Check if date is today
    const isToday = (date) => {
        const today = new Date();
        return date.getDate() === today.getDate() &&
            date.getMonth() === today.getMonth() &&
            date.getFullYear() === today.getFullYear();
    };

    // Check if date is in the past
    const isPastDate = (date) => {
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Reset time to start of day
        date.setHours(0, 0, 0, 0); // Reset time to start of day
        return date < today;
    };

    // Check if date is selected
    const isSelected = (date) => {
        if (!selectedDate) return false;
        return date.getDate() === selectedDate.getDate() &&
            date.getMonth() === selectedDate.getMonth() &&
            date.getFullYear() === selectedDate.getFullYear();
    };

    // Check if date is in current month
    const isCurrentMonth = (date) => {
        return date.getMonth() === currentDate.getMonth() &&
            date.getFullYear() === currentDate.getFullYear();
    };

    // Navigate to previous month
    const goToPreviousMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
    };

    // Navigate to next month
    const goToNextMonth = () => {
        setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
    };

    // Handle date selection
    const handleDateSelect = (date) => {
        setSelectedDate(date);
        onChange(date);
        setIsOpen(false);
    };

    // Generate calendar days
    const generateCalendarDays = () => {
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();
        const daysInMonth = getDaysInMonth(year, month);
        const firstDayOfMonth = getFirstDayOfMonth(year, month);

        const days = [];

        // Add previous month's days
        const prevMonth = month === 0 ? 11 : month - 1;
        const prevYear = month === 0 ? year - 1 : year;
        const daysInPrevMonth = getDaysInMonth(prevYear, prevMonth);

        for (let i = firstDayOfMonth - 1; i >= 0; i--) {
            const day = daysInPrevMonth - i;
            days.push({
                date: new Date(prevYear, prevMonth, day),
                isCurrentMonth: false,
                isToday: false,
                isSelected: false
            });
        }

        // Add current month's days
        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, month, day);
            days.push({
                date,
                isCurrentMonth: true,
                isToday: isToday(date),
                isSelected: isSelected(date)
            });
        }

        // Add next month's days to fill the grid
        const remainingDays = 42 - days.length; // 6 rows × 7 days
        const nextMonth = month === 11 ? 0 : month + 1;
        const nextYear = month === 11 ? year + 1 : year;

        for (let day = 1; day <= remainingDays; day++) {
            days.push({
                date: new Date(nextYear, nextMonth, day),
                isCurrentMonth: false,
                isToday: false,
                isSelected: false
            });
        }

        return days;
    };

    // Format selected date for display
    const formatSelectedDate = () => {
        const dateToFormat = selectedDate || new Date();
        let data = {
            month: monthNames[dateToFormat.getMonth()],
            day: dateToFormat.getDate(),
            year: dateToFormat.getFullYear(),
            dayName: dayNames[dateToFormat.getDay()]
        }
        return data
    };

    // Close popup when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (isOpen && !event.target.closest('.date-picker-container')) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [isOpen]);

    const calendarDays = generateCalendarDays();
    return (
        <div className={`date-picker-container w-fit h-fit relative ${className}`}>
            {/* Input Field */}
            <div
                className={`
           h-[60px]l rounded-lg 
          flex items-center justify-center gap-2  cursor-pointer
          ${disabled ? 'bg-gray-100 cursor-not-allowed' : 'bg-white hover:border-[#364A9C]'}
          ${selectedDate ? 'border-[#364A9C]' : ''}
          ${type === "roundtrip" ? 'w-fit' : 'w-[200px]'}
        `}
                onClick={() => !disabled && setIsOpen(!isOpen)}
            >
                <span className={`hover:text-[#364A9C] font-semibold hover:border-b-2 hover:border-[#364A9C]`}>
                    {title}
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
            {type === "roundtrip" ? <div
                 onClick={() => !disabled && setIsOpen(!isOpen)}
                className='text-left cursor-pointer'>
                <div className='flex items-end gap-2'>
                    <span className='text-[25px] font-bold p-0'>{formatSelectedDate().day}</span>
                    <span className='text-base p-0'>{formatSelectedDate().month}</span>
                </div>
                <p className='font-medium'>{formatSelectedDate().dayName}, {formatSelectedDate().year}</p>
            </div> :
                <div
                onClick={() => !disabled && setIsOpen(!isOpen)}
                    className='text-left cursor-pointer'>
                    <div className='flex items-end gap-2'>
                        <span className='text-[35px] font-bold h-[40px] p-0'>{formatSelectedDate().day}</span>
                        <span className='text-lg h-[21px] p-0'>{formatSelectedDate().month}, {formatSelectedDate().year}</span>
                    </div>
                    <p className='font-medium'>{formatSelectedDate().dayName}</p>
                </div>
            }



            {/* Calendar Popup */}
            {isOpen && (
                <div className="absolute top-full -left-10 md:left-0  mt-2 bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-50 min-w-[280px]">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                        <button
                            onClick={goToPreviousMonth}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                            </svg>
                        </button>

                        <div className="text-center">
                            <div className="text-lg font-semibold text-gray-900">
                                {monthNames[currentDate.getMonth()]}
                            </div>
                            <div className="text-sm text-gray-500">
                                {currentDate.getFullYear()}
                            </div>
                        </div>

                        <button
                            onClick={goToNextMonth}
                            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                        >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>

                    {/* Days of Week */}
                    <div className="grid grid-cols-7 gap-1 mb-2">
                        {dayNames.map(day => (
                            <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
                                {day}
                            </div>
                        ))}
                    </div>

                    {/* Calendar Grid */}
                    <div className="grid grid-cols-7 gap-1">
                        {calendarDays.map((day, index) => (
                            <button
                                key={index}
                                onClick={() => !isPastDate(day.date) && handleDateSelect(day.date)}
                                disabled={isPastDate(day.date)}
                                className={`
                  w-8 h-8 text-sm rounded-lg transition-colors
                  ${day.isCurrentMonth
                                        ? 'text-gray-900 hover:bg-gray-100'
                                        : 'text-gray-400'
                                    }
                  ${day.isToday
                                        ? 'bg-blue-100 text-blue-600 font-semibold'
                                        : ''
                                    }
                  ${day.isSelected
                                        ? 'bg-[#364A9C] text-white hover:bg-[#364A9C]'
                                        : ''
                                    }
                  ${day.isSelected && day.isToday
                                        ? 'bg-[#364A9C] text-white'
                                        : ''
                                    }
                  ${isPastDate(day.date)
                                        ? 'text-gray-300 cursor-not-allowed opacity-50'
                                        : 'cursor-pointer'
                                    }
                `}
                            >
                                {day.date.getDate()}
                            </button>
                        ))}
                    </div>

                    {/* Today Button */}
                    <div className="mt-4 pt-3 border-t border-gray-200">
                        <button
                            onClick={() => handleDateSelect(new Date())}
                            className="w-full py-2 px-4 text-sm font-medium text-[#364A9C] hover:bg-blue-50 rounded-lg transition-colors"
                        >
                            Today
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default DatePicker;
