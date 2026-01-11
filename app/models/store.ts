import {create} from 'zustand'
import {FlightRecord} from "@/app/interfaces/flightRecord";

interface FlightStore {
    setFlights: (flights: FlightRecord[]) => void;
    addRecord: (record: FlightRecord) => void;
    removeRecord: (record: string) => void;
    flights: FlightRecord[];
    getRecordById: (id: string) => FlightRecord;
    updateRecord: (record: FlightRecord) => void;
}

const EMPTY_FLIGHT_RECORD: FlightRecord = {
    id: '',
    fromId: '',
    fromCity: '',
    fromCountry: '',
    toId: '',
    toCity: '',
    toCountry: '',
    note: '',
    distance: 0,
    length: 0,
}

export const useFlightStore = create<FlightStore>((set, get) => ({
    flights: [],
    setFlights: (flights: FlightRecord[]) => set({flights: flights}),
    addRecord: (record) => set((state) => ({
        flights: [...state.flights, record]
    })),
    removeRecord: (id: string) => set((state) => ({
        flights: state.flights.filter((f) => f.id !== id)
    })),
    getRecordById: (id: string): FlightRecord => {
        return get().flights.find(f => f.id === id) ?? EMPTY_FLIGHT_RECORD;
    },
    updateRecord: (updatedRecord: FlightRecord) => set((state) => ({
        flights: state.flights.map((f) =>
            f.id === updatedRecord.id ? updatedRecord : f) ?? EMPTY_FLIGHT_RECORD
    }))
}))