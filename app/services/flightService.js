import React from "react";

export async function getFlights() {
    const res = await fetch('http://localhost:5288/api/flight-tracker/all', {
        cache: 'no-store',
    });
    if (!res.ok) return [];
    return res.json();
}

export default function DeleteButton({id, handleDelete}) {
    return (
        <button type='button'
                onClick={() => handleDelete(id)}
                className="inline-flex items-center gap-x-2 text-sm font-semibold rounded-lg border border-transparent text-red-600 hover:text-red-800 focus:outline-hidden focus:text-red-800 disabled:opacity-50 disabled:pointer-events-none">
        Delete
        </button>
    );
}