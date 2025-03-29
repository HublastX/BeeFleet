import { Middleware, App } from "../../schemas/middlewareInterface";

export const listRoutes = (app: App): void => {
    const getRoutes = (stack: Middleware[], prefix: string = ""): void => {
        stack.forEach((middleware: Middleware) => {
            if (middleware.route) {
                const methods = Object.keys(middleware.route.methods)
                    .join(", ")
                    .toUpperCase();
                console.log(`${methods} ${prefix}${middleware.route.path}`);
            } else if (
                middleware.name === "router" &&
                middleware.handle?.stack
            ) {
                let newPrefix = prefix;

                if (middleware.regexp) {
                    const match = middleware.regexp
                        .toString()
                        .match(/\/\^(.*?)\\\//);
                    if (match && match[1]) {
                        const path = match[1]
                            .replace(/\\\//g, "/")
                            .replace(/\^/g, "");
                        newPrefix = path.startsWith("/") ? path : "/" + path;
                    }
                }

                getRoutes(middleware.handle.stack, newPrefix);
            }
        });
    };

    console.log("\n=== ROTAS DISPONÍVEIS ===");
    getRoutes(app._router.stack);
};
