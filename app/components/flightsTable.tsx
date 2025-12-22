"use client";
import {FlightRecord} from "@/app/interfaces/flightRecord";
import React, {useEffect, useRef, useState} from "react";
import NotificationSuccess from "@/app/components/customNotification";
import {UrlStrings} from "@/app/models/urlStrings";
import {useFlightStore} from "@/app/models/store";

type Props = { flightRecords: FlightRecord[]; };

export default function FlightsTable({flightRecords}: Props) {

    const headers = ["Origin City", "Origin Country", "Destination City", "Destination Country", "Distance", "Note", "Action"];
    const [showSuccess, setShowSuccess] = useState(false);
    const flights = useFlightStore((state) => state.flights);
    const initialized = useRef(false);
    const removeRecord = useFlightStore((state) => state.removeRecord);
    const setFlights = useFlightStore((state) => state.setFlights);

    useEffect(() => {
        if (!initialized.current) {
            setFlights(flightRecords);
            initialized.current = true;
        }
    }, [flightRecords, setFlights]);

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
            <div className="w-full max-w-6xl text-slate-500">
                <div className="p-1.5 inline-block align-middle">
                    <div className="border  rounded-lg overflow-y-auto overflow-hidden max-h-60">
                        <table className="w-full border-separate border-spacing-0 bg-slate-700">
                            <thead className="sticky top-0 bg-black z-10">
                            <tr>
                                {headers.map((text) => (
                                    <th key={text} scope="col" className="text-white px-6 py-3 text-center text-sm font-medium uppercase">
                                        {text}
                                    </th>
                                ))}
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-600">
                            {flights.length > 0 && flights.map((flight) => (
                                <tr key={flight.id} className="px-6 py-4 text-center whitespace-nowrap hover:bg-slate-600 text-slate-500 text-sm">
                                    <td className="text-white">{flight.fromCity}</td>
                                    <td>{flight.fromCountry}</td>
                                    <td className="text-white">{flight.toCity}</td>
                                    <td>{flight.toCountry}</td>
                                    <td className="text-white">{flight.distance} km</td>
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