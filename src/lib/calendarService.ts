

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
            throw new Error("Failed to save calendar credentials");
        }
        const result = await response.json();
        return { isSynced: result.data.is_synced };
    } catch (error) {
        console.error("Error saving calendar credentials:", error);
        throw error;
    }
};

export const getCalendarEvents = async (): Promise<{ events: any[] }> => {
    try {
        const response = await fetch(`http://localhost:8000/calendar/events`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            
        });
        if (!response.ok) {
            throw new Error("Failed to save calendar credentials");
        }
        const result = await response.json();
        return { events: result.data.events };
    } catch (error) {
        console.error("Error saving calendar credentials:", error);
        throw error;
    }
};