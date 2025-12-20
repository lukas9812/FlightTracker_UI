export interface FlightRecord {
    id: string;
    fromCity: string;
    toCity: string;
    fromCountry: string;
    toCountry: string;
    note: string;
    distance: number;
    length: number;
}