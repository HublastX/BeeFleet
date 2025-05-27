export interface CarUsageReport {
    id: string;
    renavam: string;
    chassis: string;
    plate: string;
    brand: string;
    model: string;
    year: number;
    color: string;
    status: string;
    createdAt: Date;
    totalUsageTimes: number;
    totalOdometerChange: number;
    lastUsed: Date | null;
    averageDailyUsage: string | number;
    currentOdometer: number;
}

export interface DriverEvent {
    id: string;
    eventType: string;
    odometer: number;
    createdAt: Date;
    car: {
        id: string;
        renavam: string;
        chassis: string;
        plate: string;
        brand: string;
        model: string;
        year: number;
        color: string;
        status: string;
    };
}

export interface Driver {
    id: string;
    name: string;
    phone: string;
    license: string;
    createdAt: Date;
    events: DriverEvent[];
}

export interface CarEvent {
    id: string
    eventType: string;
    odometer: number;
    createdAt: Date;
    driver: {
        id: string;
        name: string;
        phone: string;
        license: string;
    }
}

export interface Car {
    id: string;
    renavam: string;
    chassis: string;
    plate: string;
    brand: string;
    model: string;
    year: number;
    color: string;
    status: string;
    createdAt: Date;
    events: CarEvent[];
}

export interface DriverUsageDetail {
    driverId: string;
    name: string;
    phone: string;
    license: string;
    totalUsageTimes: number;
    totalOdometerChange: number;
}

export interface CarUsageDetail {
    carId: string;
    renavam: string;
    chassis: string;
    plate: string;
    brand: string;
    model: string;
    year: number;
    color: string;
    status: string;
    usageTimes: number;
    totalOdometerChange: number;
}

export interface DriverReport {
    id: string;
    name: string;
    phone: string;
    license: string;
    totalUsageTimes: number;
    uniqueCarsUsed: number;
    totalOdometerChange: number;
    lastUsed: Date | null;
    carUsageDetails: CarUsageDetail[];
}

export interface CarReport {
    id: string;
    renavam: string;
    chassis: string;
    plate: string;
    brand: string;
    model: string;
    year: number;
    color: string;
    status: string;
    uniqueDriversUsed: number;
    totalOdometerChange: number;
    driverUsageDetails: DriverUsageDetail[];
}

export interface DriverUsageReportRequest {
    startDate: string;
    endDate: string;
    driverId?: string;
    managerId?: string;
}

export interface DriverUsage {
    driverId: string;
    name: string;
    phone: string;
    usageCount: number;
    cars: string[];
    totalOdometer: number;
}

export interface DriverUsageReport {
    totalEvents: number;
    drivers: DriverUsage[];
}

export interface CarUsageReportRequest {
    startDate: string;
    endDate: string;
    carId?: string;
    managerId?: string;
}

export interface CarUsageReportResponse {
    totalEvents: number;
    cars: CarUsage[];
    startDate: Date;
    endDate: Date;
}

export interface CarUsage {
    carId: string;
    renavam: string;
    chassis: string;
    plate: string;
    brand: string;
    model: string;
    year: number;
    color: string;
    status: string;
    usageCount: number;
    drivers: string[];
    totalOdometer: number;
}

export interface Event {
    id: string;
    eventType: string;
    odometer: number;
    isActive: boolean;
    status: string;
    createdAt: Date;
    endedAt: Date | null;
    managerId: string;
    driverId: string;
    carId: string;
    checkoutEventId: string | null;
}

export interface EventReport {
    id: string;
    eventType: string;
    odometer: number;
    isActive: boolean;
    status: string;
    createdAt: Date;
    endedAt: Date | null;
    managerId: string;
    driverId: string;
    carId: string;
    checkoutEventId: string | null;
    driverDetails: {
        name: string;
        phone: string;
        license: string;
    };
    carDetails: {
        renavam: string;
        chassis: string;
        plate: string;
        brand: string;
        model: string;
        year: number;
        color: string;
        status: string;
    };
}

export interface EventDetail {
    eventId: string;
    eventType: string;
    isActive: boolean;
    status: string;
    createAt: Date;
    endedAt: Date | null;
    managerId: string;
    driverId: string;
    carId: string;
    checkoutEventId: string | null;
    driverDetails: {
        id: string;
        name: string;
        phone: string;
        license: string;
    };
    carDetails: {
        id: string;
        renavam: string;
        chassis: string;
        plate: string;
        brand: string;
        model: string;
        year: number;
        color: string;
        status: string;
    };
}


export interface Manager {
    id: string;
    email: string;
    password: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    events: ManagerEvent[];
}

export interface DriverManag {
    id: string;
    name: string;
    phone: string;
    license: string;
}

export interface CarManag {
    id: string;
    renavam: string;
    chassis: string;
    plate: string;
    brand: string;
    model: string;
    year: number;
    color: string;
    status: string;
}

export interface ManagerReport {
    id: string;
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    drivers: DriverManag[];
    cars: CarManag[];
    events: Event[];
}

export interface ManagerEvent {
    id: string;
    eventType: string;
    odometer: number;
    createdAt: Date;
    driver: {
        id: string;
        name: string;
        phone: string;
        license: string;
    };
    car: {
        id: string;
        renavam: string;
        chassis: string;
        plate: string;
        brand: string;
        model: string;
        year: number;
        color: string;
        status: string;
    };
}

export interface ManagerGlobalReport {
    id: string;
    name: string;
    email: string;
    createdAt: Date;
    updatedAt: Date;
    drivers: any[];
    deletedDrivers: any[];
    cars: any[];
    deletedCars: any[];
    events: any[];
    deletedEvents: any[];
    summary: {
        totalDrivers: number;
        totalDeletedDrivers: number;
        totalCars: number;
        totalDeletedCars: number;
        totalEvents: number;
        totalDeletedEvents: number;
    };
}
