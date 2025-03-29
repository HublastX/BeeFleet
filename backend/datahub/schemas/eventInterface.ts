export type EventType = "CHECKOUT" | "RETURN";
export type CarStatus = "AVAILABLE" | "IN_USE";
export type EventStatus = "ACTIVE" | "COMPLETED";

export interface CreateEventRequestBody {
    eventType: EventType;
    odometer: number;
    managerId: string;
    driverId: string;
    carId: string;
    checkoutEventId?: string;
}
