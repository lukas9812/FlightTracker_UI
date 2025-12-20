"use client";
import {FlightRecord} from "@/app/interfaces/flightRecord";
import React, {useState} from "react";
import NotificationSuccess from "@/app/components/customNotification";
import {UrlStrings} from "@/app/models/urlStrings";

type Props = { flightRecords: FlightRecord[]; };

export default function FlightsTable({flightRecords}: Props) {

    const [showSuccess, setShowSuccess] = useState(false);
    const [flights, setFlights] = useState(flightRecords)

    const handleDelete = async (id: string) => {
        const response = await fetch(UrlStrings.deleteOneFlight(id), {
            cache: 'no-store',
            method: 'DELETE'
        });
        if (response.ok) {
            setFlights((prevFlights) => prevFlights.filter(flight => flight.id !== id));
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 5000);
        } else {
            console.error("Error during delete in ASP.NET Server.");
        }
    }

    return (
        <div>
            {showSuccess && (
                <div className="fixed top-5 right-5 z-50 animate-in fade-in slide-in-from-right-5">
                    <NotificationSuccess
                        headerText="Successfully deleted"
                        description="Flight record was deleted successfully."/>
                </div>
            )}
            <div className="w-full max-w-6xl">
                <div className="p-1.5 inline-block align-middle">
                    <div className="rounded-lg overflow-y-auto">
                        <table className="divide-y divide-gray-400 bg-white shadow-lg">
                            <thead className="sticky top-0 bg-white z-10">
                            <tr>
                                <th scope="col"
                                    className="px-6 py-3 text-center text-sm font-medium uppercase">Origin City
                                </th>
                                <th scope="col"
                                    className="px-6 py-3 text-center text-sm font-medium uppercase">Origin Country
                                </th>
                                <th scope="col"
                                    className="px-6 py-3 text-center text-sm font-medium uppercase">Destination City
                                </th>
                                <th scope="col"
                                    className="px-6 py-3 text-center text-sm font-medium uppercase">Destination Country
                                </th>
                                <th scope="col"
                                    className="px-6 py-3 text-center text-sm font-medium uppercase">Date
                                </th>
                                <th scope="col"
                                    className="px-6 py-3 text-center text-sm font-medium uppercase">Distance
                                </th>
                                <th scope="col"
                                    className="px-6 py-3 text-center text-sm font-medium uppercase">Note
                                </th>
                                <th scope="col"
                                    className="px-6 py-3 text-center text-sm font-medium uppercase">Actions
                                </th>
                            </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                            {flights.length > 0 && flights.map((flight) => (
                                <tr key={flight.id} className="hover:bg-gray-100">
                                    <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-500">{flight.fromCity}</td>
                                    <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-500">{flight.fromCountry}</td>
                                    <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-500">{flight.toCity}</td>
                                    <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-500">{flight.toCountry}</td>
                                    <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-500">{flight.length}</td>
                                    <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-500">{flight.distance} km</td>
                                    <td className="px-6 py-4 text-center whitespace-nowrap text-sm text-gray-500">{flight.note}</td>
                                    <td className="px-6 py-4 text-center whitespace-nowrap text-sm font-medium">
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