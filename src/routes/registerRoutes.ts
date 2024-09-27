

import { Server, Request, ResponseToolkit } from '@hapi/hapi'; // Adjust based on your server framework

interface RouteMethodConfig {
    handler: (request: Request, h: ResponseToolkit) => void; // Adjust the types based on your handler
    options?: Record<string, any>; // You can be more specific with options if needed
}

interface RouteConfig {
    path: string;
    methods: Record<string, RouteMethodConfig>;
}

type RoutesTree = Record<string, RouteConfig>;

const registerRoutes = (server: Server, routesTree: RoutesTree): void => {
    const routeConfigs:any = Object.entries(routesTree).reduce((acc: Array<{ method: string; path: string; handler: (request: Request, h: ResponseToolkit) => void; options?: Record<string, any> }>, [routeGroup, { path, methods }]: [string, RouteConfig]) => {
        // Iterate over the methods of each route (GET, POST, PUT, DELETE)
        const routeEntries = Object.entries(methods).map(([method, { handler, options }]: [string, RouteMethodConfig]) => ({
            method,
            path,
            handler,
            options
        }));
        return acc.concat(routeEntries);
    }, []);

    // Register all routes to the server
    server.route(routeConfigs);
};

export default registerRoutes;