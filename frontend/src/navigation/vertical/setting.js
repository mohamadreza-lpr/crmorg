export default [
    {
        title: "تنظیمات",
        icon: "SettingsIcon",
        children: [
            {
                title: "تنظیمات پیامک",
                route: "settings-sms",
                action: "backend.users.send-sms",
                resource: "users",
            },
            {
                title: " پیامک کد ورود",
                route: "otp",
                action: "default",
                resource: "default",
            },
            {
                title: "تنظیمات اعتبارات",
                route: "settings-credits",
                action: "default",
                resource: "default",
            },
        ],
    },
];
