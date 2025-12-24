'use client'
import React, {useEffect, useState} from "react";
import {UrlStrings} from "@/app/models/urlStrings";
import {useRouter} from 'next/navigation';
import Image from "next/image";
import LogoutButton from "@/app/components/logoutButton";

export default function RegisterPage() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const registrationData = {
            email: email,
            password: password,
            name: name,
        };

        try {
            const response = await fetch(UrlStrings.register, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(registrationData),
            });

            if (response.ok) {
                setName("");
                setEmail("");
                setPassword("");
                router.push('/flight-tracker');
            } else {
                console.error("Error", response.statusText);
            }
        } catch (error) {
            console.error("Network error:", error);
        }
    };

    return (
        <div className="relative min-h-screen">
            <Image
                src="/test.jpg"
                alt="Register page background"
                fill
                unoptimized={true}
                priority
            />

            <div
                className="pb-20 relative z-10 flex min-h-screen flex-col lg:flex-row items-center justify-center gap-8 lg:gap-32 w-full">
                <div className="p-8 lg:p-16 flex flex-col max-w-md">
                    <h1 className="text-4xl font-medium bg-linear-to-r from-blue-600 via-purple-500 to-red-500 bg-clip-text text-transparent">
                        Create your FREE account
                    </h1>
                    <p className="pt-7 text-white font-light">
                        Nice to meet you! Enter your details to register.
                    </p>
                    <form onSubmit={handleSubmit} className="mt-8 mb-2 rounded-lg w-80 sm:w-96">
                        <div className="mb-1 flex flex-col gap-6">
                            <div className="w-full max-w-sm min-w-50">
                                <label className="block mb-2 text-sm text-white">
                                    Your Name
                                </label>
                                <input type="text"
                                       className="w-full rounded-lg border border-gray-300 px-3 py-2 transition outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                       placeholder="Your Name"
                                       value={name}
                                       onChange={e => setName(e.target.value)}
                                />
                            </div>
                            <div className="w-full max-w-sm min-w-50">
                                <label className="block mb-2 text-sm text-white">
                                    Email
                                </label>
                                <input type="email"
                                       className="w-full rounded-lg border border-gray-300 px-3 py-2 transition outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                       placeholder="Your Email"
                                       value={email}
                                       onChange={e => setEmail(e.target.value)}/>
                            </div>
                            <div className="w-full max-w-sm min-w-50">
                                <label className="block mb-2 text-sm text-white">
                                    Password
                                </label>
                                <input type="password"
                                       className="w-full rounded-lg border border-gray-300 px-3 py-2 transition outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                                       placeholder="Your Password"
                                       value={password}
                                       onChange={e => setPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="inline-flex items-center mt-2">
                            <label className="flex items-center cursor-pointer relative" htmlFor="check-2">
                                <input type="checkbox"
                                       className="peer h-5 w-5 cursor-pointer transition-all appearance-none rounded shadow hover:shadow-md border border-slate-300 checked:bg-slate-800 checked:border-slate-800"
                                       id="check-2"/>
                                <span
                                    className="absolute text-white opacity-0 pointer-events-none peer-checked:opacity-100 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 20 20"
                                     fill="currentColor"
                                     stroke="currentColor" stroke-width="1">
                                <path fill-rule="evenodd"
                                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                      clip-rule="evenodd"></path>
                                </svg>
                        </span>
                            </label>
                            <label className="cursor-pointer ml-2 text-white text-sm" htmlFor="check-2">
                                Remember Me
                            </label>
                        </div>

                        <div className="mt-4 flex items-center justify-center gap-4">
                            <button
                                type="button"
                                onClick={() => router.push("/loginpagetest")}
                                className="flex w-auto items-center justify-center rounded-lg p-3 bg-linear-to-r from-blue-600 via-purple-500 to-red-500 text-black hover:from-red-500 hover:via-purple-500 hover:to-blue-600 transition-colors">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                     className="size-5">
                                    <path fill-rule="evenodd"
                                          d="M17 10a.75.75 0 0 1-.75.75H5.612l4.158 3.96a.75.75 0 1 1-1.04 1.08l-5.5-5.25a.75.75 0 0 1 0-1.08l5.5-5.25a.75.75 0 1 1 1.04 1.08L5.612 9.25H16.25A.75.75 0 0 1 17 10Z"
                                          clip-rule="evenodd"/>
                                </svg>
                                Back
                            </button>
                            <button
                                className="flex w-auto items-center justify-center rounded-lg p-3 bg-linear-to-r from-blue-600 via-purple-500 to-red-500 text-black hover:from-red-500 hover:via-purple-500 hover:to-blue-600 transition-colors"
                                type="submit">
                                Sign Up
                            </button>
                        </div>
                    </form>
                </div>

                <div className="max-w-xs">
                    <h2 className="font-semibold mb-6 text-4xl">Why join us?</h2>
                    <ul className="space-y-4">
                        <li className="flex items-start gap-3">
                            <div
                                className="mt-1 h-5 w-5 flex-none rounded-full bg-blue-600/20 flex items-center justify-center">
                                <div className="h-2 w-2 rounded-full bg-blue-500"/>
                            </div>
                            <p className="text-slate-400 text-sm">
                                <strong className="text-white block">Global Access</strong>
                                Connect with travelers from all around the world instantly.
                            </p>
                        </li>
                        <li className="flex items-start gap-3">
                            <div
                                className="mt-1 h-5 w-5 flex-none rounded-full bg-purple-600/20 flex items-center justify-center">
                                <div className="h-2 w-2 rounded-full bg-purple-500"/>
                            </div>
                            <p className="text-slate-400 text-sm">
                                <strong className="text-white block">Smart Analytics</strong>
                                Track your flight distances and statistics in real-time.
                            </p>
                        </li>
                        <li className="flex items-start gap-3">
                            <div
                                className="mt-1 h-5 w-5 flex-none rounded-full bg-red-600/20 flex items-center justify-center">
                                <div className="h-2 w-2 rounded-full bg-red-500"/>
                            </div>
                            <p className="text-slate-400 text-sm">
                                <strong className="text-white block">100% Free</strong>
                                No hidden fees, no credit card required to start.
                            </p>
                        </li>
                        <li className="flex items-start gap-3">
                            <div
                                className="mt-1 h-5 w-5 flex-none rounded-full bg-green-600/20 flex items-center justify-center">
                                <div className="h-2 w-2 rounded-full bg-green-500"/>
                            </div>
                            <p className="text-slate-400 text-sm">
                                <strong className="text-white block">No email spams</strong>
                                Any sending of annoying email spam
                            </p>
                        </li>
                    </ul>
                </div>
            </div>


        </div>
    )
}