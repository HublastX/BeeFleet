export type EventType = "CHECKOUT" | "RETURN" | "REPAIR";
export type CarStatus = "AVAILABLE" | "IN_USE" | "IN_REPAIR";
export type EventStatus = "ACTIVE" | "COMPLETED";

export interface CreateEventRequestBody {
    eventType: EventType;
    odometer: number;
    createdAt: Date;
    managerId: string;
    driverId: string;
    carId: string;
    checkoutEventId?: string;
}
