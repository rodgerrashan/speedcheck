import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route("new","routes/new-route.tsx"),
    route("landing","routes/landing.tsx"),
    route("analytics","routes/AnalyticsDashboardPage.tsx"),
    route("about","routes/About5GPage.tsx"),
] satisfies RouteConfig;
