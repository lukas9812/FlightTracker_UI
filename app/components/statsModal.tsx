'use client'
import {useFlightStore} from "@/app/models/store";
interface SettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
}
export default function SettingsModal({ isOpen, onClose } : SettingsModalProps) {


    const flights = useFlightStore((state) => state.flights);
    const totalDistance = flights.reduce((sum, flight) => sum + flight.distance, 0);
    const totalLength = flights.reduce((sum, flight) => sum + flight.length,0)

    if (!isOpen) return null;

    return (
        <div className="fixed text-center inset-0 z-100 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
            <div className="bg-slate-800 border border-slate-700 p-6 rounded-xl shadow-2xl w-full max-w-md">
                <h2 className="text-xl font-bold mb-4">Flights Statistics</h2>
                <p className="text-slate-400 mb-6">Check your overall flights results</p>
                <div className="max-w-sm rounded overflow-hidden text-center shadow-lg">
                    <div className="px-6 py-4">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="black" viewBox="0 0 24 24" stroke-width="0.5"
                             stroke="gray" className="size-60">
                            <path stroke-linecap="round" stroke-linejoin="round"
                                  d="m20.893 13.393-1.135-1.135a2.252 2.252 0 0 1-.421-.585l-1.08-2.16a.414.414 0 0 0-.663-.107.827.827 0 0 1-.812.21l-1.273-.363a.89.89 0 0 0-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.212.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 0 1-1.81 1.025 1.055 1.055 0 0 1-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.655-.261a2.25 2.25 0 0 1-1.383-2.46l.007-.042a2.25 2.25 0 0 1 .29-.787l.09-.15a2.25 2.25 0 0 1 2.37-1.048l1.178.236a1.125 1.125 0 0 0 1.302-.795l.208-.73a1.125 1.125 0 0 0-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 0 1-1.591.659h-.18c-.249 0-.487.1-.662.274a.931.931 0 0 1-1.458-1.137l1.411-2.353a2.25 2.25 0 0 0 .286-.76m11.928 9.869A9 9 0 0 0 8.965 3.525m11.928 9.868A9 9 0 1 1 8.965 3.525"/>
                        </svg>

                        <div className="font-bold text-xl mb-2">The Plane Stats</div>
                        <p className="text-slate-400 text-base">
                            You travel {totalDistance} kilometres by plane.
                        </p>
                    </div>
                    <div className="px-6 pt-4 pb-2">
                        <span
                            className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#photography</span>
                        <span
                            className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#travel</span>
                        <span
                            className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#winter</span>
                    </div>
                </div>
                <button
                    onClick={onClose}
                    className="w-full py-2 bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors"
                >
                    Close
                </button>
            </div>
        </div>
    );
}