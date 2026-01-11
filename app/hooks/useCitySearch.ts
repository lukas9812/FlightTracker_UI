'use client'
import { useState } from 'react';
import {UrlStrings} from "@/app/models/urlStrings";

export interface City {
    id: string;
    name: string;
}

export const useCitySearch = () => {
    const [from, setFrom] = useState('');
    const [destination, setDestination] = useState('');
    const [fromSuggestions, setFromSuggestions] = useState<City[]>([]);
    const [destSuggestions, setDestSuggestions] = useState<City[]>([]);
    const [showFromDropdown, setShowFromDropdown] = useState(false);
    const [showDestDropdown, setShowDestDropdown] = useState(false);

    const handleSearch = async (query: string, type: 'from' | 'destination') => {
        if (type === 'from') setFrom(query);
        else setDestination(query);

        if (query.length < 3) {
            type === 'from' ? setShowFromDropdown(false) : setShowDestDropdown(false);
            return;
        }

        try {
            const response = await fetch(UrlStrings.searchCities(query), { credentials: 'include' });

            if (response.ok) {
                const data = await response.json();
                const cities: City[] = Object.entries(data).map(([id, name]) => ({
                    id: id as string,
                    name: name as string
                }));

                if (type === 'from') {
                    setFromSuggestions(cities);
                    setShowFromDropdown(true);
                } else {
                    setDestSuggestions(cities);
                    setShowDestDropdown(true);
                }
            }
        } catch (error) {
            console.error("Chyba při vyhledávání měst:", error);
        }
    };

    return {
        from, destination,
        fromSuggestions, destSuggestions,
        showFromDropdown, showDestDropdown,
        handleSearch,
        setFrom, setDestination
    };
};