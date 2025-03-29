export interface Middleware {
    route?: {
        methods: Record<string, boolean>;
        path: string;
    };
    name?: string;
    handle?: {
        stack: Middleware[];
    };
    regexp?: RegExp;
}

export interface App {
    _router: {
        stack: Middleware[];
    };
}

export interface JwtPayload {
    [key: string]: any;
}
