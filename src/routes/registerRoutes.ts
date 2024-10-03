

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
    const routeConfigs: any | Array<{ method: string; path: string; handler: (request: Request, h: ResponseToolkit) => void; options?: Record<string, any> }> = [];

    // We iterate over the entries in the route tree
    for (const [routeGroup, { path, methods }] of Object?.entries(routesTree)) {
        // We iterate over each method (GET, POST, etc.)
        for (const [method, { handler, options }] of Object?.entries(methods)) {
            // We add the route configuration directly to the array
            routeConfigs.push({
                method,
                path,
                handler,
                options
            });
        }
    }

    // We register all routes to the server
    server.route(routeConfigs);
};
export default registerRoutes;
