'use client';

import React, {useState} from 'react';
import {UrlStrings} from "@/app/models/urlStrings";

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const loginData = {email, password};

        const response = await fetch(UrlStrings.login, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(loginData),
            credentials: 'include'
        });

        if (response.ok) {
            alert('Přihlášení úspěšné!');
        } else {
            alert('Chyba při přihlášení.');
        }
    };

    return (
        <main className="flex w-full flex-col items-center justify-center py-20">
            <div className="rounded-xl bg-slate-700 px-6 max-w-md w-full shadow-sm">
                <div className="mt-10 mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-linear-to-r from-blue-600 via-purple-500 to-red-500">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="bg-white" className="size-6">
                        <path fill-rule="evenodd"
                              d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM8.547 4.505a8.25 8.25 0 1 0 11.672 8.214l-.46-.46a2.252 2.252 0 0 1-.422-.586l-1.08-2.16a.414.414 0 0 0-.663-.107.827.827 0 0 1-.812.21l-1.273-.363a.89.89 0 0 0-.738 1.595l.587.39c.59.395.674 1.23.172 1.732l-.2.2c-.211.212-.33.498-.33.796v.41c0 .409-.11.809-.32 1.158l-1.315 2.191a2.11 2.11 0 0 1-1.81 1.025 1.055 1.055 0 0 1-1.055-1.055v-1.172c0-.92-.56-1.747-1.414-2.089l-.654-.261a2.25 2.25 0 0 1-1.384-2.46l.007-.042a2.25 2.25 0 0 1 .29-.787l.09-.15a2.25 2.25 0 0 1 2.37-1.048l1.178.236a1.125 1.125 0 0 0 1.302-.795l.208-.73a1.125 1.125 0 0 0-.578-1.315l-.665-.332-.091.091a2.25 2.25 0 0 1-1.591.659h-.18c-.249 0-.487.1-.662.274a.931.931 0 0 1-1.458-1.137l1.279-2.132Z"
                              clip-rule="evenodd"/>
                    </svg>

                </div>

                <h3 className="mb-6 text-center text-white text-2xl uppercase font-bold">Quick Login</h3>

                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="mb-1 block text-sm font-medium text-white">Email or Username</label>
                        <input value={email}
                               onChange={(e) => setEmail(e.target.value)}
                               type="text"
                               className="w-full rounded-lg border border-gray-300 px-3 py-2 transition outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"/>
                    </div>

                    <div className="mb-6">
                        <label className="mb-1 block text-sm font-medium text-white">Password</label>
                        <input value={password}
                               onChange={(e) => setPassword(e.target.value)}
                                   type="password"
                                   className="w-full rounded-lg border px-3 py-2 transition outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"/>
                        </div>

                        <button type="submit"
                                className="mx-auto mt-4 flex justify-center gap-1 rounded-md py-3 px-4 cursor-pointer max-md:w-full max-md:py-1 bg-linear-to-r from-blue-600 via-purple-500 to-red-500 text-black hover:from-red-500 hover:via-purple-500 hover:to-blue-600 transition-colors">
                        Login
                        </button>

                        <div className="mt-4 text-center">
                            <a href="#" className="text-sm text-blue-500 hover:text-blue-600">Forgot Password?</a>
                        </div>
                        <p className='text-center py-8'>
                            Do not have an account? <a href="/signup" className="flex flex-col items-center bg-linear-to-r from-blue-600 via-purple-500 to-red-500 bg-clip-text text-transparent">Sign up</a>
                        </p>
                    </form>
            </div>
        </main>
    )
}