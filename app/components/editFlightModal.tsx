'use client'

import {UrlStrings} from "@/app/models/urlStrings";
import {useFlightStore} from "@/app/models/store";
import {useState} from "react";
import NewFlightRecord from "@/app/components/flightForm";

interface SettingsModalProps {
    key: string;
    id: string;
    isOpen: boolean;
    onClose: () => void;
}

export default function EditFlightModal({id, isOpen, onClose}: SettingsModalProps) {

    const currentRecord = useFlightStore(state => state.getRecordById(id));

    const [fromSuggestion, setFromSuggestion] = useState<{ id: string; name: string }[]>([]);
    const [showFromDropdown, setShowFromDropdown] = useState(false);

    // States for Destination
    const [fromId, setFromId] = useState(currentRecord?.fromId ?? '');
    const [destinationId, setDestinationId] = useState(currentRecord?.toId ?? '');
    const [destSuggestions, setDestSuggestions] = useState<{ id: string; name: string }[]>([]);
    const [showDestDropdown, setShowDestDropdown] = useState(false);

    const [from, setFrom] = useState(currentRecord?.fromCity ?? '');
    const [destination, setDestination] = useState(currentRecord?.toCity ?? '');
    const [note, setNote] = useState(currentRecord?.note ?? '');

    const updateFlight = useFlightStore((state) => state.updateRecord)

    // Notification
    const [showSuccess, setShowSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent, id: string) => {
        e.preventDefault();

        const dto = {
            id: id,
            from: from,
            fromId: fromId,
            destination: destination,
            destinationId: destinationId,
            note: note,
            year: new Date().getFullYear()
        };

        try {
            const response = await fetch(UrlStrings.updateFlight, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(dto),
            });

            if (response.ok) {
                setFrom(dto.from);
                setFromId(dto.fromId);
                setDestination(dto.destination);
                setDestinationId(dto.destinationId);
                setNote(dto.note);
                setShowSuccess(true);
                updateFlight(currentRecord)
                setTimeout(() => setShowSuccess(false), 5000);
            } else {
                console.error("Error -- Response not ok", response.statusText);
            }
        } catch (error) {
            console.error("Network error:", error);
        }
    };
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

    if (!isOpen) return null;

    return (
        <div
            className="fixed text-center inset-0 z-100 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-slate-800 border border-slate-700 p-6 rounded-xl shadow-2xl w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Edit Flight {id}</h2>
                <p className="text-white mb-6">{currentRecord?.fromCity} - {currentRecord?.toCity}</p>

                <form onSubmit={(e) => handleSubmit(e, id)}>
                    <div className="flex w-full flex-col gap-4 items-center justify-center">
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
                                   className="bg-black text-white w-full lg:w-auto rounded border px-3 py-1.5 mt-1.5 text-sm outline-none"
                                   placeholder="Type here" required
                                   value={note}
                                   onChange={e => setNote(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className='w-full flex justify-center mt-4 items-center'>
                        <button
                            className="flex items-center justify-center gap-1 rounded-md py-3 px-2 cursor-pointer bg-linear-to-r from-blue-600 via-purple-500 to-red-500 text-black hover:from-red-500 hover:via-purple-500 hover:to-blue-600 transition-all font-medium shadow-md active:scale-95">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="2"
                                 stroke="currentColor" className="size-4">
                                <path stroke-linecap="round" stroke-linejoin="round"
                                      d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0 3.181 3.183a8.25 8.25 0 0 0 13.803-3.7M4.031 9.865a8.25 8.25 0 0 1 13.803-3.7l3.181 3.182m0-4.991v4.99"/>
                            </svg>
                            <span>Update</span>
                        </button>
                    </div>
                </form>

                <button
                    onClick={() => {
                        onClose();
                    }}
                    className="mt-8 py-2 bg-transparent rounded-lg items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                         stroke="currentColor" className="size-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12"/>
                    </svg>
                </button>
            </div>
        </div>
    );
}