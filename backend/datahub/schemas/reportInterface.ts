export interface CarUsageReport {
    id: string;
    plate: string;
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
        plate: string;
        model: string;
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
    plate: string;
    model: string;
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
    vehicles: string[];
    totalOdometer: number;
}

export interface DriverUsageReport {
    totalEvents: number;
    drivers: DriverUsage[];
}

export interface VehicleUsageReportRequest {
    startDate: string;
    endDate: string;
    carId?: string;
    managerId?: string;
}

export interface VehicleUsageReportResponse {
    totalEvents: number;
    vehicles: VehicleUsage[];
    startDate: Date;
    endDate: Date;
}

export interface VehicleUsage {
    carId: string;
    plate: string;
    model: string;
    usageCount: number;
    totalOdometer: number;
}
