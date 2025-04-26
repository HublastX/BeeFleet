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
    events: DriverEvent[];
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
    totalOdometer: number;
}
