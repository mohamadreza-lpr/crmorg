export default [
    {
        path: "/settings/sms",
        name: "settings-sms",
        component: () => import("@/views/settings/sms/Sms.vue"),
        meta: {
            action: "backend.users.send-sms",
            resource: "users",
        },
    },
    {
        path: "/settings/otp",
        name: "otp",
        component: () => import("@/views/settings/sms/Otp.vue"),
        meta: {
            action: "default",
            resource: "default",
        },
    },
    {
        path: "/settings/credits",
        name: "settings-credits",
        component: () => import("@/views/settings/credits/Credits.vue"),
        meta: {
            action: "default",
            resource: "default",
        },
    },
];
