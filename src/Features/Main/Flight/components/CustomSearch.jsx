import { useEffect, useRef, useState } from "react";
import { searchAirports } from "../services/Flight.services";
import { IconChevronDown, IconFlagSearch, IconSearch } from "@tabler/icons-react";
import { LoadingSpinner } from "../../../../components/animations";
import { div } from "framer-motion/client";

export const CustomSearch = ({ value, label, selectedAirport }) => {
    const [input, setInput] = useState('');
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedItem, setSelectedItem] = useState(label === 'From' ? {
        "code": "ACC",
        "name": "Accra - Kotoka",
        "country": {
            "code": "GH",
            "name": "GH"
        },
        "state": null,
        "category": "airport",
        "parent": null
    } : null);
    const [show, setShow] = useState(false);
    const dropdownRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        if (value && value.code) {
            setSelectedItem(value);
        }
    }, [value]);
      // Handle click outside to close dropdown
      useEffect(() => {
          const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShow(false);
                setData([]);
                setInput('');
            }
        };
        if (show) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
      }, [show]);
    
       // Focus input when dropdown opens
       useEffect(() => {
        if (show && inputRef.current) {
            inputRef.current.focus();
        }
    }, [show]);
    
    const fetchData = async (query) => {
        setIsLoading(true);
        const response = await searchAirports(query);
        console.log('searchAirports', response.data.airports)
        if (response.status) {
            setData(response.data.airports);
        }
        setIsLoading(false);
    }
    const handleSearch = (value) => {
        setInput(value);
        if (value.length > 2) {
            fetchData(value);
        }
      
    }


    return (
        <div className="relative" ref={dropdownRef} >
            <p className="mt-0 text-black font-medium">{label}</p>
            <div className="md:mt-2 gap-2 max- w-80 borderl text-center space-y-3 cursor-pointer" onClick={() => setShow(!show)}>
                {selectedItem ? 
                    <div>
                        <p className="text-gray-900 lg:text-2xl text-base font-bold">{selectedItem?.code}</p>
                <p className="text-center text-sm text-gray-900 font-medium mt-1">{selectedItem?.name}, {selectedItem?.country?.code} ({selectedItem?.code})</p>
                    </div>
                    :
                    <div>
                        <p className="text-gray-400 lg:text-2xl text-base font-bold">Select an airport</p>
                    </div>
}
               </div>
            <div className={` ${show ? 'block' : 'hidden'} absolute top-20 left-0 md:w-96 w-full borderl border-gray-300 overflow-hidden rounded-md shadow-md bg-white  z-50`}>
                <div className="flex items-center gap-2 relative">
                    <IconSearch className="w-5 h-5 text-[#364A9C] absolute left-2 top-1/2 transform -translate-y-1/2" />
                    <input
                        className="pl-8 py-2 w-full border-b border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Search for an airport"
                        type="text"
                        ref={inputRef} 
                        value={input}
                        onChange={(e) => {
                            handleSearch(e.target.value)
                            if (e.target.value.length === 0) {
                                setData([])
                            }
                        }}
                    />
                    {isLoading && <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                        <LoadingSpinner size={20} color="#364A9C" />
                    </div>}
                </div>
                <div className="max-h-80 overflow-y-auto">
                    <CustomSearchResultsList customSearchData={data} setSelectedItem={(val) => { setSelectedItem(val); selectedAirport(val) }} searchValue={input} setShow={setShow} />
                </div>
            </div>
        </div>
    )
}

const RecentSearches = [
    {
        "code": "ACC",
        "name": "Accra - Kotoka",
        "country": {
            "code": "GH",
            "name": "GH"
        },
        "state": null,
        "category": "airport",
        "parent": null
    },
    {
        "code": "CBO",
        "name": "Cotabato",
        "country": {
            "code": "PH",
            "name": "PH"
        },
        "state": null,
        "category": "airport",
        "parent": null
    }, {
        "code": "COO",
        "name": "Cotonou",
        "country": {
            "code": "BJ",
            "name": "BJ"
        },
        "state": null,
        "category": "airport",
        "parent": null
    },
    {
        "code": "OTT",
        "name": "Cotriguacu",
        "country": {
            "code": "BR",
            "name": "BR"
        },
        "state": null,
        "category": "airport",
        "parent": null
    }]


export const CustomSearchResultsList = ({ customSearchData, setSelectedItem, searchValue, setShow }) => {
    return (
        <div>
            {customSearchData.length === 0 ? (
                <>
                    <p className=" text-left pl-2 py-1 text-gray-600 text-sm font-medium">Recent Searches</p>
                    {RecentSearches.map((item, key) => (
                        <div key={key} onClick={() => { setSelectedItem(item); setShow(false) }} className="flex items-center gap-1 cursor-pointer hover:bg-gray-100 p-2 py-1 border-t border-gray-50 rounded-md">
                             <div className="flex items-center justify-between w-full py-2">
                                <div className="flex flex-1 items-center space-x-1">
                                    <span className="text-[#364A9C]">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M17.657 5.304c-3.124-3.073-8.189-3.073-11.313 0a7.78 7.78 0 0 0 0 11.13L12 21.999l5.657-5.565a7.78 7.78 0 0 0 0-11.13M12 13.499c-.668 0-1.295-.26-1.768-.732a2.503 2.503 0 0 1 0-3.536c.472-.472 1.1-.732 1.768-.732s1.296.26 1.768.732a2.503 2.503 0 0 1 0 3.536c-.472.472-1.1.732-1.768.732" /></svg>
                                    </span>
                                    <div className="flex items-center justify-between w-full">
                                        <p><span className="font-semibold">{item.name}</span>, {item.country.name} </p>
                                        <p className="text-gray-500 text-sm font-semibold">{item.code}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </>
            ) : (
                <>
                    {searchValue.length > 0 && customSearchData.map((item, key) => (
                        <div key={key} onClick={() => { setSelectedItem(item); setShow(false) }} className="flex items-center gap-2 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
                            <div className="flex items-center justify-between w-full py-2">
                                <div className="flex flex-1 items-center space-x-1">
                                    <span className="text-[#364A9C]">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="currentColor" d="M17.657 5.304c-3.124-3.073-8.189-3.073-11.313 0a7.78 7.78 0 0 0 0 11.13L12 21.999l5.657-5.565a7.78 7.78 0 0 0 0-11.13M12 13.499c-.668 0-1.295-.26-1.768-.732a2.503 2.503 0 0 1 0-3.536c.472-.472 1.1-.732 1.768-.732s1.296.26 1.768.732a2.503 2.503 0 0 1 0 3.536c-.472.472-1.1.732-1.768.732" /></svg>
                                    </span>
                                    <div className="flex items-center justify-between w-full">
                                        <p><span className="font-semibold">{item.name}</span>, {item.country.name} </p>
                                        <p className="text-gray-500 text-sm font-semibold">{item.code}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </>
            )}
        </div>
    )
}