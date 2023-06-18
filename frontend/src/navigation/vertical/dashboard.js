export default [
    {
        title: "پیشخوان",
        icon: "HomeIcon",
        tag: "2",
        tagVariant: "light-warning",
        children: [
            {
                title: "صفحه اصلی",
                route: "dashboard-ecommerce",
                action: "backend.dashboard.index",
                resource: "dashboard",
            },
            {
                title: "مشتری",
                route: "dashboard-customer",
                action: "default",
                resource: "default",
            },
            {
                title: "فروش",
                route: "dashboard-sale",
                action: "default",
                resource: "default",
            },
            {
                title: "تحلیل",
                route: "dashboard-analysis",
                action: "default",
                resource: "default",
            },
            {
                title: "تحلیل نظرسنجی",
                route: "dashboard-survey",
                action: "backend.dashboard.survey",
                resource: "dashboard",
            },
        ],
    },
];
