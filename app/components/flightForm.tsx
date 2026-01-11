'use client';
import React, {useState} from "react";
import NotificationSuccess from "@/app/components/customNotification";
import {UrlStrings} from "@/app/models/urlStrings";
import {FlightRecord} from "@/app/interfaces/flightRecord";
import {useFlightStore} from "@/app/models/store";

export default function NewFlightRecord() {

    // States for Departure
    const [from, setFrom] = useState('');
    const [fromId, setFromId] = useState('');
    const [fromSuggestion, setFromSuggestion] = useState<{ id: string; name: string }[]>([]);
    const [showFromDropdown, setShowFromDropdown] = useState(false);

    // States for Destination
    const [destination, setDestination] = useState('');
    const [destinationId, setDestinationId] = useState('');
    const [destSuggestions, setDestSuggestions] = useState<{ id: string; name: string }[]>([]);
    const [showDestDropdown, setShowDestDropdown] = useState(false);

    // Notification
    const [showSuccess, setShowSuccess] = useState(false);
    const [note, setNote] = useState('');

    const addRecord = useFlightStore((state) => state.addRecord);

    const handleSearch = async (query: string, type: 'from' | 'destination') => {
        if (type === 'from') setFrom(query);
        else setDestination(query);

        if (query.length >= 3) {
            const response = await fetch(UrlStrings.searchCities(query), {credentials: 'include'});

            if (response.ok) {
                const data = await response.json();
                const cities = Object.entries(data).map(([id, name]) => ({
                    id: id as string,
                    name: name as string
                }));
                if (type === 'from') {
                    setFromSuggestion(cities);
                    setShowFromDropdown(true);
                } else {
                    setDestSuggestions(cities);
                    setShowDestDropdown(true);
                }
            }
        } else {
            if (type === 'from') setShowFromDropdown(false);
            else setShowDestDropdown(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const flightData = {
            from: from,
            fromId: fromId,
            destination: destination,
            destinationId: destinationId,
            note: note,
        };

        try {
            const response = await fetch(UrlStrings.insertOneFlight, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(flightData),
            });

            if (response.ok) {
                setFrom("");
                setFromId("");
                setDestination("");
                setDestinationId("");
                setNote("");

                setShowSuccess(true);
                setTimeout(() => setShowSuccess(false), 5000);

                const backendRecord: FlightRecord = await response.json();
                addRecord(backendRecord);

            } else {
                console.error("Error", response.statusText);
            }
        } catch (error) {
            console.error("Network error:", error);
        }
    };

    return (
        <div>
            {showSuccess && (
                <div className="fixed top-5 right-5 z-50 animate-in fade-in slide-in-from-right-5">
                    <NotificationSuccess headerText="Successfully saved"
                                         description="Flight record was saved successfully."/>
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="flex flex-col w-full lg:flex-row gap-4 items-center justify-center">
                    <div>
                        <div className="flex items-center gap-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="green"
                                 className="size-5">
                                <path fillRule="evenodd"
                                      d="M5.22 14.78a.75.75 0 0 0 1.06 0l7.22-7.22v5.69a.75.75 0 0 0 1.5 0v-7.5a.75.75 0 0 0-.75-.75h-7.5a.75.75 0 0 0 0 1.5h5.69l-7.22 7.22a.75.75 0 0 0 0 1.06Z"
                                      clipRule="evenodd"/>
                            </svg>
                            <label htmlFor="departureInput" className="text-white">Departure</label>
                        </div>
                        <input list='departures' id="departureInput" type="text"
                               value={from}
                               onChange={(e) => handleSearch(e.target.value, 'from')}
                               autoComplete="off"
                               className="w-full lg:w-auto bg-black text-white rounded border px-3 py-1.5 mt-1.5 text-sm outline-none"
                               placeholder="Type here" required
                        />
                        {showFromDropdown && fromSuggestion?.length > 0 && (
                            <ul className="absolute z-10 min-w-45 overflow-auto rounded-lg border border-slate-200 bg-white p-1.5 shadow-sm focus:outline-none"
                                role="menu"
                                data-popover="menu"
                                data-popover-placement="bottom">
                                {fromSuggestion.map((city) => (
                                    <li className="px-3 py-2 hover:bg-blue-50 cursor-pointer text-sm text-gray-700"
                                        key={city.name}
                                        onClick={() => {
                                            setFrom(city.name);
                                            setFromId(city.id);
                                            setShowFromDropdown(false);
                                        }}>
                                        {city.name}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div>
                        <div className='flex items-center gap-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="red"
                                 className="size-5">
                                <path
                                    d="M6.28 5.22a.75.75 0 0 0-1.06 1.06l7.22 7.22H6.75a.75.75 0 0 0 0 1.5h7.5a.747.747 0 0 0 .75-.75v-7.5a.75.75 0 0 0-1.5 0v5.69L6.28 5.22Z"/>
                            </svg>
                            <label htmlFor="arrivalInput" className="text-white">Arrival</label>
                        </div>
                        <input list='arrivals' id="arrivalInput" type="text"
                               value={destination}
                               onChange={(e) => handleSearch(e.target.value, 'destination')}
                               autoComplete="off"
                               className="bg-black text-white rounded border px-3 py-1.5 mt-1.5 text-sm outline-none"
                               placeholder="Type here" required
                        />
                        {showDestDropdown && destSuggestions?.length > 0 && (
                            <ul className="absolute z-10 min-w-45 overflow-auto rounded-lg border border-slate-200 bg-white p-1.5 shadow-sm focus:outline-none"
                                role="menu"
                                data-popover="menu"
                                data-popover-placement="bottom">
                                {destSuggestions.map(city => (
                                    <li
                                        className="px-3 py-2 hover:bg-blue-50 cursor-pointer text-sm text-gray-700"
                                        key={city.name}
                                        onClick={() => {
                                            setDestination(city.name);
                                            setDestinationId(city.id);
                                            setShowDestDropdown(false);
                                        }}>
                                        {city.name}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    <div>
                        <div className='flex items-center gap-2'>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="gray"
                                 className="size-5">
                                <path
                                    d="m5.433 13.917 1.262-3.155A4 4 0 0 1 7.58 9.42l6.92-6.918a2.121 2.121 0 0 1 3 3l-6.92 6.918c-.383.383-.84.685-1.343.886l-3.154 1.262a.5.5 0 0 1-.65-.65Z"/>
                                <path
                                    d="M3.5 5.75c0-.69.56-1.25 1.25-1.25H10A.75.75 0 0 0 10 3H4.75A2.75 2.75 0 0 0 2 5.75v9.5A2.75 2.75 0 0 0 4.75 18h9.5A2.75 2.75 0 0 0 17 15.25V10a.75.75 0 0 0-1.5 0v5.25c0 .69-.56 1.25-1.25 1.25h-9.5c-.69 0-1.25-.56-1.25-1.25v-9.5Z"/>
                            </svg>

                            <label htmlFor="notesInput" className="text-white">Note</label>
                        </div>
                        <input id="notesInput" type="text"
                               className="bg-transparent text-white w-full lg:w-auto rounded border px-3 py-1.5 mt-1.5 text-sm outline-none"
                               placeholder="Type here" required
                               value={note}
                               onChange={e => setNote(e.target.value)}
                        />
                    </div>
                </div>
                <div className='w-full flex justify-center mt-4 items-center'>
                    <button
                        className="flex items-center justify-center gap-1 rounded-md py-3 px-2 cursor-pointer bg-linear-to-r from-blue-600 via-purple-500 to-red-500 text-black hover:from-red-500 hover:via-purple-500 hover:to-blue-600 transition-all font-medium shadow-md active:scale-95">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                             className="size-5">
                            <path
                                d="M10.75 4.75a.75.75 0 0 0-1.5 0v4.5h-4.5a.75.75 0 0 0 0 1.5h4.5v4.5a.75.75 0 0 0 1.5 0v-4.5h4.5a.75.75 0 0 0 0-1.5h-4.5v-4.5Z"/>
                        </svg>
                        <span>Add</span>
                    </button>
                </div>
            </form>
        </div>
    );
}