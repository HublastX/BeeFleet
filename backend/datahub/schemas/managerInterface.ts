export interface CreateManagerRequestBody {
    name: string;
    email: string;
    password: string;
}

export interface LoginRequestBody {
    email: string;
    password: string;
}

export interface Manager {
    id: string;
    email: string;
    password: string;
}
