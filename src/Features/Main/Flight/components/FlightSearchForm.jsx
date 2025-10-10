import { useState } from 'react';

const FlightSearchForm = () => {
  const [searchType, setSearchType] = useState('oneway');
  const [fromLocation, setFromLocation] = useState('Accra');
  const [toLocation, setToLocation] = useState('Amsterdam');
  const [departureDate, setDepartureDate] = useState('3');
  const [passengers, setPassengers] = useState({ adult: 1, children: 1, infant: 1 });
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showPassengerPicker, setShowPassengerPicker] = useState(false);
  const [tolerance, setTolerance] = useState(2);

  const handleSwapLocations = () => {
    const temp = fromLocation;
    setFromLocation(toLocation);
    setToLocation(temp);
  };

  const updatePassengerCount = (type, operation) => {
    setPassengers(prev => ({
      ...prev,
      [type]: operation === 'increase' ? prev[type] + 1 : Math.max(0, prev[type] - 1)
    }));
  };

  const totalPassengers = passengers.adult + passengers.children + passengers.infant;

  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 max-w-5xl mx-auto">
      {/* Search Type Tabs */}
      <div className="flex items-center space-x-1 mb-6">
        <button
          onClick={() => setSearchType('oneway')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            searchType === 'oneway'
              ? 'bg-[#364A9C] text-white' 
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          One way
        </button>
        <button
          onClick={() => setSearchType('roundtrip')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            searchType === 'roundtrip' 
              ? 'bg-[#364A9C] text-white' 
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          Round Trip
        </button>
        <button
          onClick={() => setSearchType('multicity')}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
            searchType === 'multicity' 
              ? 'bg-[#364A9C] text-white' 
              : 'bg-white text-gray-700 hover:bg-gray-50'
          }`}
        >
          Multi-City
        </button>
        
        <div className="ml-4">
          <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white">
            <option>Economy</option>
            <option>Business</option>
            <option>First Class</option>
          </select>
        </div>
        
        <button className="ml-4 px-3 py-2 border border-[#364A9C] text-[#364A9C] rounded-lg text-sm hover:bg-blue-50 transition-colors">
          Promo Code
        </button>
      </div>

      {/* Origin and Destination */}
      <div className="flex items-center space-x-4 mb-6">
        {/* From Location */}
        <div className="flex-1">
          <label className="block text-xs text-gray-500 mb-1">From</label>
          <div className="p-3 border border-gray-300 rounded-lg">
            <div className="text-lg font-bold text-gray-800">{fromLocation}</div>
            <div className="text-xs text-gray-500">Kotoka International Airport</div>
          </div>
        </div>

        {/* Swap Button */}
        <button
          onClick={handleSwapLocations}
          className="w-10 h-10 bg-[#364A9C] rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors"
        >
          <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
          </svg>
        </button>

        {/* To Location */}
        <div className="flex-1">
          <label className="block text-xs text-gray-500 mb-1">To</label>
          <div className="p-3 border border-gray-300 rounded-lg">
            <div className="text-lg font-bold text-gray-800">{toLocation}</div>
            <div className="text-xs text-gray-500">Amsterdam Airport Schiphol</div>
          </div>
        </div>
      </div>

      {/* Departure and Passengers */}
      <div className="flex items-center space-x-4 mb-6">
        {/* Departure Date */}
        <div className="flex-1 relative">
          <label className="block text-xs text-gray-500 mb-1">Departure</label>
          <div 
            className="p-3 border border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors"
            onClick={() => setShowDatePicker(!showDatePicker)}
          >
            <div className="text-lg font-bold text-gray-800">{departureDate}</div>
            <div className="text-xs text-gray-500">August 2025</div>
            <svg className="w-5 h-5 text-gray-400 absolute right-3 top-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
            </svg>
          </div>

          {/* Date Picker Popup */}
          {showDatePicker && (
            <div className="absolute top-full left-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-10">
              <div className="text-center mb-3">
                <h3 className="font-semibold text-gray-800">August 2025</h3>
              </div>
              <div className="grid grid-cols-7 gap-1 text-xs">
                {['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'].map(day => (
                  <div key={day} className="p-2 text-center text-gray-500 font-medium">{day}</div>
                ))}
                {Array.from({ length: 31 }, (_, i) => i + 1).map(date => (
                  <button
                    key={date}
                    onClick={() => {
                      setDepartureDate(date.toString());
                      setShowDatePicker(false);
                    }}
                    className={`p-2 text-center rounded hover:bg-blue-50 transition-colors ${
                      date.toString() === departureDate ? 'bg-[#364A9C] text-white' : 'text-gray-700'
                    } ${
                      [2, 3, 9, 10, 16, 17, 23, 24, 30, 31].includes(date) ? 'text-red-500' : ''
                    }`}
                  >
                    {date}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Passengers */}
        <div className="flex-1 relative">
          <label className="block text-xs text-gray-500 mb-1">Passenger</label>
          <div 
            className="p-3 border border-gray-300 rounded-lg cursor-pointer hover:border-blue-500 transition-colors"
            onClick={() => setShowPassengerPicker(!showPassengerPicker)}
          >
            <div className="text-lg font-bold text-gray-800">{totalPassengers} Passenger</div>
            <div className="text-xs text-gray-500">Adult, Children, Infant</div>
            <svg className="w-5 h-5 text-gray-400 absolute right-3 top-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </div>

          {/* Passenger Picker Popup */}
          {showPassengerPicker && (
            <div className="absolute top-full left-0 mt-2 bg-white border border-gray-300 rounded-lg shadow-lg p-4 z-10 min-w-64">
              <div className="space-y-4">
                {/* Adult */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <div className="font-medium text-gray-800">Adult (12+)</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updatePassengerCount('adult', 'decrease')}
                      className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50"
                    >
                      <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <span className="w-8 text-center font-medium">{passengers.adult}</span>
                    <button
                      onClick={() => updatePassengerCount('adult', 'increase')}
                      className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50"
                    >
                      <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Children */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <div className="font-medium text-gray-800">Children (2y - 12y)</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updatePassengerCount('children', 'decrease')}
                      className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50"
                    >
                      <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <span className="w-8 text-center font-medium">{passengers.children}</span>
                    <button
                      onClick={() => updatePassengerCount('children', 'increase')}
                      className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50"
                    >
                      <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>

                {/* Infant */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <svg className="w-6 h-6 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <div className="font-medium text-gray-800">Infant (Below 2y)</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => updatePassengerCount('infant', 'decrease')}
                      className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50"
                    >
                      <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                    <span className="w-8 text-center font-medium">{passengers.infant}</span>
                    <button
                      onClick={() => updatePassengerCount('infant', 'increase')}
                      className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center hover:bg-gray-50"
                    >
                      <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Filters */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 bg-white">
            <option>Airline</option>
            <option>Emirates</option>
            <option>British Airways</option>
            <option>Lufthansa</option>
          </select>
          
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-700">Tolerance</span>
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                onClick={() => setTolerance(Math.max(0, tolerance - 1))}
                className="px-2 py-1 hover:bg-gray-50"
              >
                <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                </svg>
              </button>
              <span className="px-2 py-1 text-sm font-medium">{tolerance} days</span>
              <button
                onClick={() => setTolerance(tolerance + 1)}
                className="px-2 py-1 hover:bg-gray-50"
              >
                <svg className="w-4 h-4 text-gray-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        <button className="px-8 py-3 bg-[#364A9C] text-white rounded-lg font-medium hover:bg-blue-700 transition-colors">
          Search Flights
        </button>
      </div>
    </div>
  );
};

export default FlightSearchForm;
