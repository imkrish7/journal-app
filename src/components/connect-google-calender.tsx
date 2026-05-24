"use client";

import { http } from '@/http-service/http';
import Image from 'next/image'
import React, { startTransition } from 'react'

const ConnectGoogleCalender = () => {

    const connectGoogleCalendar = () => {
        startTransition(async () => {
            // Handle the Google Calendar connection logic here
            console.log("Initiating Google Calendar connection...");
            try {
                const response = await http<{ redirect: string }>("http://localhost:8000/calendar/google/connect", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    }
                });
                window.location.href = response.redirect; // Redirect to Google OAuth URL
            } catch (error) {
                console.error("Error connecting to Google Calendar:", error);
            }
        });
    };

    return (<div className='relative w-full h-full'>
        {/* <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary/5 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/5 rounded-full blur-[80px]"></div> */}
        <div className="max-w-4xl mx-auto py-12">
            <div className="glass-card rounded-[24px] p-card-inner primary-shadow relative z-10 p-5">
                <div className="text-center mb-section-gap">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-100 rounded-2xl mb-6">
                        <span className="material-symbols-outlined text-indigo-600 text-[32px]">calendar_month</span>
                    </div>
                    <h2 className="font-headline-lg text-headline-lg text-on-surface mb-2">Sync Your Schedule</h2>
                    <p className="text-body-md font-body-md text-on-surface-variant max-w-lg mx-auto">
                        Connect your Google Calendar to Aura to create a unified view of your professional and personal life.
                    </p>
                </div>
                <div className="grid md:grid-cols-2 gap-gutter items-start">
                    <div className="space-y-6">
                        <div className="p-6 bg-surface-container-low rounded-[20px]">
                            <h3 className="font-title-md text-title-md text-primary mb-4 flex items-center gap-2">
                                <span className="material-symbols-outlined">info</span>
                                Purpose Disclosure
                            </h3>
                            <div className="space-y-4">
                                <div className="flex gap-4">
                                    <span className="material-symbols-outlined text-primary mt-1">event_busy</span>
                                    <p className="text-label-sm font-label-sm text-on-surface-variant">
                                        <span className="font-bold text-on-surface">Prevent Overlaps:</span> Aura analyzes your existing appointments to ensure you never double-book critical focus time.
                                    </p>
                                </div>
                                <div className="flex gap-4">
                                    <span className="material-symbols-outlined text-primary mt-1">auto_schedule</span>
                                    <p className="text-label-sm font-label-sm text-on-surface-variant">
                                        <span className="font-bold text-on-surface">Auto-Scheduling:</span> Smartly fit new tasks into the gaps of your real-world calendar availability.
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="p-6 rounded-[20px]">
                            <h3 className="font-label-sm text-label-sm font-bold uppercase tracking-wider text-on-surface-variant/60 mb-4">Why trust us?</h3>
                            <ul className="space-y-3">
                                <li className="flex items-center gap-2 text-label-sm font-label-sm text-on-surface-variant">
                                    <span className="material-symbols-outlined text-on-secondary-fixed-variant text-[18px]">verified_user</span>
                                    Encryption at rest and in transit
                                </li>
                                <li className="flex items-center gap-2 text-label-sm font-label-sm text-on-surface-variant">
                                    <span className="material-symbols-outlined text-on-secondary-fixed-variant text-[18px]">gpp_good</span>
                                    GDPR &amp; SOC2 Type II Compliant
                                </li>
                                <li className="flex items-center gap-2 text-label-sm font-label-sm text-on-surface-variant">
                                    <span className="material-symbols-outlined text-on-secondary-fixed-variant text-[18px]">shield_person</span>
                                    We never sell your calendar data
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="space-y-6">
                        <div className="p-8 bg-white rounded-[20px] shadow-sm flex flex-col items-center text-center">
                            <Image width={48} height={48} alt="Google G Logo" className="w-12 h-12 mb-6" data-alt="The iconic Google 'G' logo rendered with crisp, clean vector lines on a pure white background. The colors are the standard Google primary palette: blue, red, yellow, and green. The lighting is perfectly even, conveying a high-quality, professional tech integration environment. This logo symbolizes global connectivity and secure authentication within the modern SaaS ecosystem." src="https://lh3.googleusercontent.com/aida-public/AB6AXuA8pbgqj79i9BTj1wsm7ZPy9kn43CsLUDxtXHTxMb-TcfN6hZtZjV28R9nfAW0hjBKO4Xx_VmODij9yyGG7SPN8WIKvD-b_5vdQWSPU_IuwAFLlTq3MB6h--i53zftN0P-gRDyYtLqSvrFkOMJMJF0_X91JavcCpCLNQU9yUbK6rBANkoD86o6--gfczA6gZP7rY_ocMtG_PsO6zwn8qXTSI7EtLhNwxSqoYFLnhXPiRWWxs4jBtdsUKwaZzdiXTKC4xcT5azkxb0Ox" />
                            <h4 className="font-title-md text-title-md text-on-surface mb-6">Authorize Aura</h4>
                            <button onClick={connectGoogleCalendar} className="w-full py-4 bg-indigo-600 text-white rounded-full font-bold text-body-md flex items-center justify-center gap-3 hover:scale-[1.02] active:scale-[0.98] transition-all shadow-lg shadow-primary/20">
                                <span className="material-symbols-outlined" style={{"fontVariationSettings": "'FILL' 1"}}>login</span>
                                Connect Google Calendar
                            </button>
                            <p className="mt-4 text-[11px] text-on-surface-variant italic">You&apos;ll be redirected to Google for secure authentication.</p>
                        </div>
                        <div className="p-6 bg-secondary-container/30 rounded-[20px] border border-secondary-container">
                            <h3 className="font-label-sm text-label-sm font-bold text-on-secondary-container mb-6 flex items-center gap-2">
                                <span className="material-symbols-outlined">security</span>
                                Privacy Controls
                            </h3>
                            <div className="space-y-6">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1">
                                        <p className="font-label-sm text-label-sm font-bold text-on-surface">Privacy-First Masking</p>
                                        <p className="text-[11px] text-on-surface-variant">Show external event titles as &apos;Busy&apos; to keep details private within Aura.</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer mt-1">
                                        <input onChange={()=>{
                                             console.log("Toggled incremental auth")
                                        }}  checked={false} className="sr-only peer" type="checkbox" />
                                        <div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                    </label>
                                </div>
                                <div className="flex items-start justify-between gap-4">
                                    <div className="flex-1">
                                        <p className="font-label-sm text-label-sm font-bold text-on-surface">Incremental Authorization</p>
                                        <p className="text-[11px] text-on-surface-variant">Request read-only access first. Grant edit permissions only when you need them.</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer mt-1">
                                        <input onChange={()=>{
                                            console.log("Toggled incremental auth")
                                        }} checked={false} className="sr-only peer" type="checkbox" />
                                        <div className="w-11 h-6 bg-surface-container-highest peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary"></div>
                                    </label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="mt-section-gap pt-8 border-t border-surface-variant flex flex-col items-center gap-4">
                    <a className="text-label-sm font-label-sm text-on-surface-variant hover:text-primary transition-colors underline underline-offset-4" href="#">Skip for now</a>
                    <p className="text-[10px] text-on-surface-variant/50 max-w-sm text-center">
                        By connecting your calendar, you agree to Aura&apos;s <a className="underline" href="#">Terms of Service</a> and <a className="underline" href="#">Privacy Policy</a>. We use 2026-standard OAuth 2.1 for all connections.
                    </p>
                </div>
            </div>
            {/* <div className="mt-gutter grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-primary/5 p-6 rounded-[24px] border border-primary/10">
                    <span className="material-symbols-outlined text-primary mb-3">auto_fix_high</span>
                    <h5 className="text-label-sm font-bold mb-2">Smart Flattening</h5>
                    <p className="text-[11px] text-on-surface-variant">Aggregate multiple Google accounts into one single source of truth.</p>
                </div>
                <div className="bg-secondary/5 p-6 rounded-[24px] border border-secondary/10">
                    <span className="material-symbols-outlined text-secondary mb-3">palette</span>
                    <h5 className="text-label-sm font-bold mb-2">Color Mirroring</h5>
                    <p className="text-[11px] text-on-surface-variant">Aura automatically matches your existing Google color IDs for familiarity.</p>
                </div>
                <div className="bg-surface-container-highest p-6 rounded-[24px] border border-outline-variant">
                    <span className="material-symbols-outlined text-on-surface mb-3">update</span>
                    <h5 className="text-label-sm font-bold mb-2">Instant Syncing</h5>
                    <p className="text-[11px] text-on-surface-variant">Changes made in Google or Aura reflect instantly across all platforms.</p>
                </div>
            </div> */}
        </div>
    </div>
    )
}

export default ConnectGoogleCalender