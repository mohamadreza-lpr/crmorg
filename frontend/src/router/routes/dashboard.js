export default [
    {
        path: "/dashboard/customer",
        name: "dashboard-customer",
        component: () => import("@/views/dashboard/analytics/Analytics.vue"),
        meta: {
            action: "default",
            resource: "default",
        },
    },
    {
        path: "/dashboard/index",
        name: "dashboard-ecommerce",
        component: () => import("@/views/dashboard/ecommerce/Ecommerce.vue"),
        meta: {
            action: "backend.dashboard.index",
            resource: "dashboard",
        },
    },
    {
        path: "/dashboard/sale",
        name: "dashboard-sale",
        component: () => import("@/views/dashboard/sale/Sale.vue"),
        meta: {
            action: "default",
            resource: "default",
        },
    },
    {
        path: "/dashboard/analysis",
        name: "dashboard-analysis",
        component: () => import("@/views/dashboard/analysis/Analysis.vue"),
        meta: {
            action: "default",
            resource: "default",
        },
    },
    {
        path: "/dashboard/survey",
        name: "dashboard-survey",
        component: () => import("@/views/dashboard/survey/Survey.vue"),
        meta: {
            action: "backend.dashboard.survey",
            resource: "dashboard",
        },
    },
];
