'use client'

import '@tailwindplus/elements';
import {useState} from "react";
import LogoutButton from "@/app/components/logoutButton";
import SettingsModal from "@/app/components/statsModal";

export default function DropDownMenu() {
    const [open, setOpen] = useState(false);
    const [isSettingsOpen, setIsSettingsOpen] = useState(false);

    return (
        <div>
            <div className="animated-border">
                <button
                    onClick={() => setOpen(!open)}
                    id="dropdownDefaultButton"
                    data-dropdown-toggle="dropdown"
                    type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                         stroke="currentColor" className="size-6">
                        <path strokeLinecap="round" strokeLinejoin="round"
                              d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5"/>
                    </svg>
                </button>
            </div>

            {open && (
                <div id="dropdown"
                     className="flex justify-center text-center absolute right-0 mt-2 z-10 w-32 bg-black border border-gray-600 rounded-lg shadow-lg">
                    <ul className="p-2 text-sm text-body font-medium">
                        <li>
                            <a href="#"
                               className="inline-flex items-center w-full p-2 hover:bg-slate-900 hover:text-heading rounded">
                                Account
                            </a>
                        </li>
                        <li>
                            <button
                                onClick={() => setIsSettingsOpen(true)}
                                className="inline-flex items-center w-full p-2 hover:bg-slate-900 hover:text-heading rounded cursor-pointer text-left"
                            >
                                Statistics
                            </button>
                        </li>
                        <li>
                            <LogoutButton></LogoutButton>
                        </li>
                    </ul>
                    <SettingsModal
                        isOpen={isSettingsOpen}
                        onClose={() => setIsSettingsOpen(false)}
                    />
                </div>
            )}
        </div>
    )
}