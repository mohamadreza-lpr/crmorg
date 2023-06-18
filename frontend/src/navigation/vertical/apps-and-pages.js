export default [
    {
        header: "مدیریت"
    },
    {
        title: "مدیریت کاربران",
        icon: "UserIcon",
        children: [
            {
                title: "مشاهده کاربران",
                route: "apps-users-list",
                action: "backend.users.index",
                resource: "users"
            },
            {
                title: "کاربر جدید",
                route: "apps-users-create",
                action: "backend.users.create",
                resource: "users"
            }
            // {
            //   title: 'مجوز های مدیران',
            //   route: 'admin-permissons',
            // },
            // {
            //   title: 'Profile',
            //   route: 'pages-profile',
            // },
            // {
            //   title: 'View',
            //   route: { name: 'apps-users-view', params: { id: 21 } },
            // },
            // {
            //   title: 'Edit',
            //   route: { name: 'apps-users-edit', params: { id: 21 } },
            // },
        ]
    },
    // {
    //   title: 'تنظیمات',
    //   icon: 'SettingsIcon',
    //   children: [
    //     {
    //       title: 'برندینگ',
    //       route: 'settings-branding',
    //     },
    //     {
    //       title: 'نوع های سفارشی',
    //       icon: 'ToolIcon',
    //       children: [
    //         {
    //           title: 'مخاطب',
    //           route: 'settings-order-audience',
    //         },
    //         {
    //           title: 'فاکتور فروش',
    //           route: 'settings-order-sales-invoice',
    //         },
    //         {
    //           title: 'فاکتور برگشتی',
    //           route: 'settings-order-return-invoice',
    //         },
    //       ]
    //     },
    //   ],
    // },
    {
        title: "سطوح دسترسی",
        icon: "StarIcon",
        children: [
            {
                title: "لیست سطوح دسترسی",
                route: "roles-list",
                action: "backend.roles.index",
                resource: "roles"
            },
            {
                title: "سطح دسترسی جدید",
                route: "roles-create",
                action: "backend.roles.create",
                resource: "roles"
            }
        ]
    },
    {
        title: "شعب یا فروشگاه‌ها",
        icon: "CpuIcon",
        children: [
            {
                title: "مشاهده شعب",
                route: "merchants",
                action: "backend.branches.index",
                resource: "branches"
            },
            {
                title: "شعبه جدید",
                route: "merchants-create",
                action: "backend.branches.create",
                resource: "branches"
            },
            {
                title: "گروه بندی های شعب",
                route: "merchants-category",
                action: "backend.branches.index",
                resource: "branches"
            }
            // {
            //   title: 'زمینه های فعالیت',
            //   route: 'merchants-categories',
            // },
            // {
            //   title: 'کاربران شعبه',
            //   icon: 'UsersIcon',
            //   children: [
            //     {
            //       title: 'مشاهده کابران',
            //       route: 'merchants-list-users',
            //     },
            //     {
            //       title: 'کاربر جدید',
            //       route: 'merchants-users-create',
            //     },
            //     {
            //       title: 'مجوز های شعبه',
            //       route: 'merchants-branch-licenses',
            //     },
            //   ]
            // },
        ]
    },
    {
        title: "گام های وفاداری",
        icon: "StarIcon",
        children: [
            {
                title: "برنامه های وفاداری",
                route: "loyalty-plans",
                action: "backend.loyalties.index",
                resource: "loyalties"
            },
            // {
            //   title: 'سطوح وفاداری',
            //   route: 'loyalty-levels',
            // },
            {
                title: "تاریخچه فعالیت ها",
                route: "loyalty-actions-history"
            }
        ]
    },
    {
        title: "برچسب ها",
        icon: "TagIcon",
        children: [
            {
                title: "مشاهده برچسب ها",
                route: "customers-tags",
                action: "backend.tags.users.index",
                resource: "tags"
            },
            {
                title: "برچسب جدید",
                route: "customers-addTag",
                action: "backend.tags.create",
                resource: "tags"
            }
        ]
    },
    {
        title: "گروه بندی های سیستم",
        icon: "LayersIcon",
        route: "customers-categories",
        action: "backend.groups.create",
        resource: "groups"
    },
    {
        title: "مدیریت مشتریان",
        icon: "UserCheckIcon",
        children: [
            {
                title: "مشاهده مشتریان",
                route: "customers-list",
                action: "backend.users.index",
                resource: "users"
            },
            {
                title: "مشتری جدید",
                route: "customers-createPerson",
                action: "backend.users.create",
                resource: "users"
            },
            {
                title: "برچسب مشتریان",
                route: "customers-tag",
                action: "backend.tags.users.index",
                resource: "tags"
            },
            {
                title: "دسته بندی مشتریان",
                route: "customers-category",
                action: "backend.groups.users.index",
                resource: "groups"
            },
            {
                title: "ورود مشتریان",
                route: "customers-importCustomers",
                action: "backend.users.import",
                resource: "users"
            },
            {
                title: "سطوح مشتریان",
                route: "customers-levels",
                action: "backend.levels.index",
                resource: "levels"
            }
            // {
            //   title: 'تخصیص مشتریان',
            //   route: 'customers-assignCustomers',
            // },
            // {
            //   title: 'تنظیمات مشتریان',
            //   route: 'customers-settings',
            // },
            // {
            //   title: 'تحلیل رفتار مشتریان',
            //   icon: 'TagIcon',
            //   children: [
            //     {
            //       title: 'تنظیمات',
            //       route: 'customers-statusSettings',
            //     },
            //     {
            //       title: 'گزارش',
            //       route: 'customers-valueRates',
            //     },
            //   ],
            // },
        ]
    },

    {
        title: "فاکتور های فروش",
        icon: "ShoppingBagIcon",
        children: [
            {
                title: "لیست فاکتورها",
                route: "sales-list",
                action: "backend.bills.index",
                resource: "bills"
            },
            {
                title: "فاکتور فروش جدید",
                route: "sales-createInvoice",
                action: "backend.bills.create",
                resource: "bills"
            },
            {
                title: "ورود فاکتور",
                route: "sales-importInvoice"
            }
            // {
            //   title: 'تنظیمات فروش',
            //   route: 'sales-settings',
            // },
        ]
        // children: [
        //   {

        //   },
        // {
        //   title: 'فاکتور های برگشتی',
        //   children: [
        //     {
        //       title: 'مشاهده',
        //       route: 'sales-return-list',
        //     },
        //     {
        //       title: 'تنظیمات برگشتی',
        //       route: 'sales-return-settings',
        //     },
        //   ],
        // },
        // ],
    },

    {
        title: "مدیریت محصولات",
        icon: "PackageIcon",
        children: [
            {
                title: "مشاهده محصولات",
                route: "products-list",
                action: "backend.products.index",
                resource: "products"
            },
            {
                title: "محصول جدید",
                route: "products-create",
                action: "backend.products.create",
                resource: "products"
            },
            {
                title: "دسته بندی محصولات",
                route: "products-category",
                action: "backend.groups.products.index",
                resource: "groups"
            },
            // {
            //   title: 'گروه بندی محصولات',
            //   route: 'products-categories',
            // },
            {
                title: "ورود محصولات",
                route: "products-importProducts"
            }
        ]
    },

    {
        title: "اطلاعات من",
        icon: "UserIcon",
        route: {
            name: "customer-information",
            params: {
                id: JSON.parse(localStorage.getItem("userData")).id
            }
        },
        action: "backend.users.edit",
        resource: "users"
    },
    // {
    //   title: 'صورتحساب ها',
    //   icon: 'FileIcon',
    //   route: 'invoices-list',
    // },
    {
        title: "تاریخچه امتیازات",
        icon: "StarIcon",
        route: "rateHistory-list"
    },

    // {
    //   title: 'ارتباطات',
    //   icon: 'MessageSquareIcon',
    //   children: [
    //     {
    //       title: 'تنظیمات پیام کوتاه',
    //       route: 'connections-lineSettingsList',
    //     },
    //   ],
    // },

    {
        title: "هدیه و تخفیف",
        icon: "GiftIcon",
        children: [
            {
                title: "کوپن های تخفیف",
                route: "gift-coupones-list",
                action: "backend.discounts.index",
                resource: "discounts"
            },
            {
                title: "کوپن جدید",
                route: "gift-coupones-create",
                action: "backend.discounts.create",
                resource: "discounts"
            }
            // {
            //   title: 'کارت هدیه',
            //   route: '',
            //   disabled: true,
            //   children: [
            //     {
            //       title: 'زیر گروه',
            //       route: '',
            //     },
            //   ]
            // },
        ]
    },
    {
        title: "قرعه کشی",
        icon: "SunriseIcon",
        children: [
            {
                title: "مشاهده قرعه کشی",
                route: "lottery-list",
                action: "backend.lotteries.index",
                resource: "lotteries"
            },
            {
                title: "ایجاد قرعه کشی",
                route: "lottery-create",
                action: "backend.lotteries.create",
                resource: "lotteries"
            }
        ]
    },
    {
        title: "نظرسنجی",
        icon: "SmileIcon",
        children: [
            {
                title: "لیست نظرسنجی ها",
                route: "survey-list",
                action: "backend.surveys.index",
                resource: "surveys"
            },
            {
                title: "نظرسنجی جدید",
                route: "survey-create",
                action: "backend.surveys.create",
                resource: "surveys"
            }
        ]
    },
    {
        title: "بلاگ",
        icon: "BookOpenIcon",
        children: [
            {
                title: "لیست بلاگ ها",
                route: "blog-list",
                resource: "default",
                action: "default"
            },
            {
                title: "بلاگ جدید",
                route: "blog-create",
                resource: "default",
                action: "default"
            },
            {
                title: "برچسب های بلاگ",
                route: "blog-tags",
                action: "backend.tags.blogs.index",
                resource: "tags"
            },
            {
                title: "دسته بندی های بلاگ",
                route: "blog-categories",
                action: "backend.groups.blogs.index",
                resource: "groups"
            }
        ]
    }
    // {
    //   title: 'کارت های مفقودی',
    //   icon: 'CreditCardIcon',
    //   route: 'missingCards',
    // },

    // {
    //   title: 'Email',
    //   route: 'apps-email',
    //   icon: 'MailIcon',
    // },
    // {
    //   title: 'Chat',
    //   route: 'apps-chat',
    //   icon: 'MessageSquareIcon',
    // },
    // {
    //   title: 'Todo',
    //   route: 'apps-todo',
    //   icon: 'CheckSquareIcon',
    // },
    // {
    //   title: 'Calendar',
    //   route: 'apps-calendar',
    //   icon: 'CalendarIcon',
    // },
    // {
    //   title: 'Invoice',
    //   icon: 'FileTextIcon',
    //   children: [
    //     {
    //       title: 'List',
    //       route: 'apps-invoice-list',
    //     },
    //     {
    //       title: 'Preview',
    //       route: { name: 'apps-invoice-preview', params: { id: 4987 } },
    //     },
    //     {
    //       title: 'Edit',
    //       route: { name: 'apps-invoice-edit', params: { id: 4987 } },
    //     },
    //     {
    //       title: 'Add',
    //       route: { name: 'apps-invoice-add' },
    //     },
    //   ],
    // },
    // {
    //   title: 'eCommerce',
    //   icon: 'ShoppingCartIcon',
    //   children: [
    //     {
    //       title: 'Shop',
    //       route: 'apps-e-commerce-shop',
    //     },
    //     {
    //       title: 'Details',
    //       route: { name: 'apps-e-commerce-product-details', params: { slug: 'apple-watch-series-5-27' } },
    //     },
    //     {
    //       title: 'Wishlist',
    //       route: 'apps-e-commerce-wishlist',
    //     },
    //     {
    //       title: 'Checkout',
    //       route: 'apps-e-commerce-checkout',
    //     },
    //   ],
    // },

    // {
    //   title: 'Pages',
    //   icon: 'FileIcon',
    //   children: [
    //     {
    //       title: 'Authentication',
    //       icon: 'CircleIcon',
    //       children: [
    //         {
    //           title: 'Login v1',
    //           route: 'auth-login-v1',
    //           target: '_blank',
    //         },
    //         {
    //           title: 'Login v2',
    //           route: 'auth-login-v2',
    //           target: '_blank',
    //         },
    //         {
    //           title: 'Register v1',
    //           route: 'auth-register-v1',
    //           target: '_blank',
    //         },
    //         {
    //           title: 'Register v2',
    //           route: 'auth-register-v2',
    //           target: '_blank',
    //         },
    //         {
    //           title: 'Forgot Password v1',
    //           route: 'auth-forgot-password-v1',
    //           target: '_blank',
    //         },
    //         {
    //           title: 'Forgot Password v2',
    //           route: 'auth-forgot-password-v2',
    //           target: '_blank',
    //         },
    //         {
    //           title: 'Reset Password v1',
    //           route: 'auth-reset-password-v1',
    //           target: '_blank',
    //         },
    //         {
    //           title: 'Reset Password v2',
    //           route: 'auth-reset-password-v2',
    //           target: '_blank',
    //         },
    //       ],
    //     },
    //     {
    //       title: 'Account Settings',
    //       route: 'pages-account-setting',
    //     },
    //     {
    //       title: 'Profile',
    //       route: 'pages-profile',
    //     },
    //     {
    //       title: 'Faq',
    //       route: 'pages-faq',
    //     },
    //     {
    //       title: 'Knowledge Base',
    //       route: 'pages-knowledge-base',
    //     },
    //     {
    //       title: 'Pricing',
    //       route: 'pages-pricing',
    //     },
    //     {
    //       title: 'Blog',
    //       children: [
    //         {
    //           title: 'List',
    //           route: 'pages-blog-list',
    //         },
    //         {
    //           title: 'Detail',
    //           route: { name: 'pages-blog-detail', params: { id: 1 } },
    //         },
    //         {
    //           title: 'Edit',
    //           route: { name: 'pages-blog-edit', params: { id: 1 } },
    //         },
    //       ],
    //     },
    //     {
    //       title: 'Mail Templates',
    //       children: [
    //         {
    //           title: 'Welcome',
    //           href: 'https://pixinvent.com/demo/vuexy-mail-template/mail-welcome.html',
    //         },
    //         {
    //           title: 'Reset Password',
    //           href: 'https://pixinvent.com/demo/vuexy-mail-template/mail-reset-password.html',
    //         },
    //         {
    //           title: 'Verify Email',
    //           href: 'https://pixinvent.com/demo/vuexy-mail-template/mail-verify-email.html',
    //         },
    //         {
    //           title: 'Deactivate Account',
    //           href: 'https://pixinvent.com/demo/vuexy-mail-template/mail-deactivate-account.html',
    //         },
    //         {
    //           title: 'Invoice',
    //           href: 'https://pixinvent.com/demo/vuexy-mail-template/mail-invoice.html',
    //         },
    //         {
    //           title: 'Promotional',
    //           href: 'https://pixinvent.com/demo/vuexy-mail-template/mail-promotional.html',
    //         },
    //       ],
    //     },
    //     {
    //       title: 'Miscellaneous',
    //       icon: 'CircleIcon',
    //       children: [
    //         {
    //           title: 'Coming Soon',
    //           route: 'misc-coming-soon',
    //           target: '_blank',
    //         },
    //         {
    //           title: 'Not Authorized',
    //           route: 'misc-not-authorized',
    //           target: '_blank',
    //         },
    //         {
    //           title: 'Under Maintenance',
    //           route: 'misc-under-maintenance',
    //           target: '_blank',
    //         },
    //         {
    //           title: 'Error',
    //           route: 'misc-error',
    //           target: '_blank',
    //         },
    //       ],
    //     },
    //   ],
    // },
];
