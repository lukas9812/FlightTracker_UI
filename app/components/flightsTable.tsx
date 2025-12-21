"use client";
import {FlightRecord} from "@/app/interfaces/flightRecord";
import React, {useRef, useState} from "react";
import NotificationSuccess from "@/app/components/customNotification";
import {UrlStrings} from "@/app/models/urlStrings";
import {useFlightStore} from "@/app/models/store";

type Props = { flightRecords: FlightRecord[]; };

export default function FlightsTable({flightRecords}: Props) {

    const headers = ["Origin City", "Origin Country", "Destination City", "Destination Country", "Date", "Distance", "Note", "Action"];
    const [showSuccess, setShowSuccess] = useState(false);
    const flights = useFlightStore((state) => state.flights);
    const initialized = useRef(false);
    const removeRecord = useFlightStore((state) => state.removeRecord);

    if (!initialized.current) {
        useFlightStore.getState().setFlights(flightRecords);
        initialized.current = true;
    }

    const handleDelete = async (id: string) => {
        const response = await fetch(UrlStrings.deleteOneFlight(id), {
            cache: 'no-store',
            method: 'DELETE'
        });

        if (response.ok) {
            removeRecord(id)
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 5000);
        } else {
            console.error("Error during delete in ASP.NET Server.");
        }
    }

    return (
        <div>
            { showSuccess && (
                <div className="fixed top-5 right-5 z-50 animate-in fade-in slide-in-from-right-5">
                    <NotificationSuccess headerText="Successfully deleted" description="Flight record was deleted successfully."/>
                </div>
            )}
            <div className="w-full max-w-6xl">
                <div className="p-1.5 inline-block align-middle">
                    <div className="rounded-lg overflow-y-auto max-h-60">
                        <table className="divide-y divide-gray-400 bg-white shadow-lg">
                            <thead className="sticky top-0 bg-white z-10">
                            <tr>
                                {headers.map((text) => (
                                    <th key={text} scope="col" className="px-6 py-3 text-center text-sm font-medium uppercase">
                                        {text}
                                    </th>
                                ))}
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                            {flights.length > 0 && flights.map((flight) => (
                                <tr key={flight.id} className="px-6 py-4 text-center whitespace-nowrap hover:bg-gray-100 text-gray-500 text-sm">
                                    <td>{flight.fromCity}</td>
                                    <td>{flight.fromCountry}</td>
                                    <td >{flight.toCity}</td>
                                    <td>{flight.toCountry}</td>
                                    <td>{flight.length}</td>
                                    <td>{flight.distance} km</td>
                                    <td>{flight.note}</td>
                                    <td className="px-6 py-4 font-medium">
                                        <button type='button'
                                                onClick={() => handleDelete(flight.id)}
                                                className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-red-600 hover:text-red-800 focus:outline-hidden focus:text-red-800 disabled:opacity-50 disabled:pointer-events-none">
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}