import { create } from 'zustand'
import {FlightRecord} from "@/app/interfaces/flightRecord";

interface FlightStore {
    setFlights: (flights: FlightRecord[]) => void;
    addRecord: (record: FlightRecord) => void;
    removeRecord: (record: FlightRecord) => void;
    flights: FlightRecord[];
}

export const useFlightStore = create<FlightStore>((set) => ({
    flights: [],

    setFlights: (flights: FlightRecord[]) => set({ flights: flights }),
    addRecord: (record) => set((state) => ({
        flights: [...state.flights, record]
    })),
    removeRecord: (recordToRemove) => set((state) => ({
        flights: state.flights.filter((f) => f.id !== recordToRemove.id)
    })),
}))