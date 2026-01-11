"use client";
import {FlightRecord} from "@/app/interfaces/flightRecord";
import React, {useEffect, useRef, useState} from "react";
import NotificationSuccess from "@/app/components/customNotification";
import {UrlStrings} from "@/app/models/urlStrings";
import {useFlightStore} from "@/app/models/store";
import EditFlightModal from "@/app/components/editFlightModal";

type Props = { flightRecords: FlightRecord[]; };

export default function FlightsTable({flightRecords}: Props) {

    const headers = ["Origin City", "Origin Country", "Destination City", "Destination Country", "Distance", "Note", "Actions"];
    const [showSuccess, setShowSuccess] = useState(false);
    const [editId, setEditId] = useState("");

    const [isEditOpen, setIsEditOpen] = useState(false);
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
            {showSuccess && (
                <div className="fixed top-5 right-5 z-50 animate-in fade-in slide-in-from-right-5">
                    <NotificationSuccess headerText="Successfully deleted"
                                         description="Flight record was deleted successfully."/>
                </div>
            )}
            <div
                className="relative h-80 lg:h-96 overflow-x-auto overflow-y-auto rounded-lg bg-black shadow-xs rounded-base">
                <table className="w-full text-sm text-left rtl:text-right text-body">
                    <thead
                        className="sticky top-0 z-10 bg-linear-to-r from-blue-600 via-purple-500 to-red-500 text-black hover:from-red-500 hover:via-purple-500 hover:to-blue-600 transition-colors">
                    <tr>
                        {headers.map((text) => (
                            <th key={text}
                                scope="col"
                                className="text-white px-6 py-3 text-center text-sm font-medium uppercase whitespace-nowrap">
                                {text}
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-600">
                    {flights.length > 0 && flights.map((flight) => (
                        <tr key={flight.id} className="hover:bg-slate-600 text-slate-500 text-sm">
                            <td className="px-6 py-4 text-center whitespace-nowrap text-white">{flight.fromCity}</td>
                            <td className="px-6 py-4 text-center whitespace-nowrap">{flight.fromCountry}</td>
                            <td className="px-6 py-4 text-center whitespace-nowrap text-white">{flight.toCity}</td>
                            <td className="px-6 py-4 text-center whitespace-nowrap">{flight.toCountry}</td>
                            <td className="px-6 py-4 text-center whitespace-nowrap text-white">{flight.distance} km</td>
                            <td className="px-6 py-4 text-center whitespace-nowrap">{flight.note}</td>
                            <td className="px-6 py-4 text-center whitespace-nowrap font-medium">
                                <div className="flex gap-2 justify-center">
                                    <button type='button'
                                            onClick={() =>
                                            {
                                                setEditId(flight.id);
                                                setIsEditOpen(true);
                                            }}
                                            className="inline-flex items-center text-sm font-semibold rounded-lg border border-transparent text-blue-600 hover:text-blue-800 focus:outline-none focus:text-blue-800 disabled:opacity-50 disabled:pointer-events-none">
                                        Edit
                                    </button>
                                    <button type='button'
                                            onClick={() => handleDelete(flight.id)}
                                            className="inline-flex items-center text-sm font-semibold rounded-lg border border-transparent text-red-600 hover:text-red-800 focus:outline-none focus:text-red-800 disabled:opacity-50 disabled:pointer-events-none">
                                        Delete
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
            <EditFlightModal
                key={editId}
                id={editId}
                isOpen={isEditOpen}
                onClose={() => setIsEditOpen(false)}>
            </EditFlightModal>
        </div>
    )
}