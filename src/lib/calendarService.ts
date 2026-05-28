import { Event } from "@/interface/events";
import { eventSchema } from "@/schema/event";
import { z } from "zod";

export const saveCredentials = async (credentials: string) => {
    try {
        const response = await fetch(`http://localhost:8000/calendar/google/callback?${credentials}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            
        });
        if (!response.ok) {
            throw new Error("Failed to save calendar credentials");
        }
        return await response.json();
    } catch (error) {
        console.error("Error saving calendar credentials:", error);
        throw error;
    }
};

export const getCalendarSyncStatus = async (): Promise<{ isSynced: boolean }> => {
    try {
        const response = await fetch(`http://localhost:8000/calendar/sync/status`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            
        });
        if (!response.ok) {
            throw new Error("Failed to get calendar sync status");
        }
        const result = await response.json();
        return { isSynced: result.data.is_synced };
    } catch (error) {
        console.error("Error getting calendar sync status:", error);
        throw error;
    }
};

export const getCalendarEvents = async (): Promise<{ google_events: Event[], local_events: z.infer<typeof eventSchema>[] }> => {
    try {
        const response = await fetch(`http://localhost:8000/calendar/events`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            
        });
        if (!response.ok) {
            console.error("Failed to fetch calendar events:", response);
            throw new Error("Failed to get calendar events");
        }
        const result = await response.json();
        return { google_events: result.data.google_events, local_events: result.data.local_events };
    } catch (error) {
        console.error("Error saving calendar credentials:", error);
        throw error;
    }
};

export const deleteCalendarEventById = async (eventId: string) => {
    try {
        const response = await fetch(`http://localhost:8000/events/delete/${eventId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            
        });
        if (!response.ok) {
            throw new Error("Failed to delete calendar event");
        }
        return;
    } catch (error) {
        console.error("Error deleting calendar event:", error);
        throw error;
    }
}

export const getLocalEventById = async (eventId: string): Promise<z.infer<typeof eventSchema>> => {
    try {
        const response = await fetch(`http://localhost:8000/events/${eventId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            
        });
        if (!response.ok) {
            throw new Error("Failed to get calendar event");
        }
        const result = await response.json();
        return result.data;
    } catch (error) {
        console.error("Error getting calendar event:", error);
        throw error;
    }   

}