

export interface Event {
    id: string;
    calendarId: string;
    eventId: string; // ID from the calendar provider (e.g., Google Calendar event ID)
    iCalUID?: string; // Optional iCal UID for compatibility with iCalendar format
    status: "confirmed" | "tentative" | "cancelled";
    startsAt: string; // ISO string
    endsAt: string; // ISO string
    title: string;
    description?: string;
    startTime: string; // ISO string
    endTime: string; // ISO string
    location?: string;
    attendees?: string[]; // List of attendee email addresses
    color?: string; // Optional color for event display
}