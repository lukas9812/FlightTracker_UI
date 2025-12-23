"use client";
import { useRouter } from 'next/navigation';
import {UrlStrings} from "@/app/models/urlStrings";

export default function LogoutButton() {
    const router = useRouter();

    const handleLogout = async () => {
        const response = await fetch(UrlStrings.logout, {
            cache: 'no-store',
            method: 'POST',
            credentials: 'include',
        });

        if (response.ok) {
            localStorage.clear();
            router.push('/login');
            router.refresh();
        }
    };

    return (
        <button
            type="button"
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
            Logout
        </button>
    );
}