export default [
  {
    header: 'مدیریت',
    icon: 'PackageIcon',
    children: [
      {
        title: 'مدیریت کاربران',
        icon: 'UserIcon',
        children: [
          {
            title: 'مشاهده کاربران',
            route: 'apps-users-list',
          },
          {
            title: 'مجوز های مدیران',
            route: 'admin-permissons',
          },
          // {
          //   title: 'List',
          //   route: 'apps-users-list',
          // },
          // {
          //   title: 'View',
          //   route: { name: 'apps-users-view', params: { id: 21 } },
          // },
          // {
          //   title: 'Edit',
          //   route: { name: 'apps-users-edit', params: { id: 21 } },
          // },
        ],
      },
      {
        title: 'تنظیمات',
        icon: 'SettingsIcon',
        children: [
          {
            title: 'برندینگ',
            route: 'settings-branding',
          },
          {
            title: 'نوع های سفارشی',
            icon: 'ToolIcon',
            children: [
              {
                title: 'مخاطب',
                route: 'settings-order-audience',
              },
              {
                title: 'فاکتور فروش',
                route: 'settings-order-sales-invoice',
              },
              {
                title: 'فاکتور برگشتی',
                route: 'settings-order-return-invoice',
              },
            ]
          },
          // {
          //   title: 'View',
          //   route: { name: 'apps-users-view', params: { id: 21 } },
          // },
          // {
          //   title: 'Edit',
          //   route: { name: 'apps-users-edit', params: { id: 21 } },
          // },
        ],
      },
      {
        title: 'شعب یا فروشگاه‌ها',
        icon: 'CpuIcon',
        children: [
          {
            title: 'مشاهده شعب',
            route: 'merchants',
          },
          {
            title: 'شعبه جدید',
            route: 'merchants-create',
          },
          {
            title: 'زمینه های فعالیت',
            route: 'merchants-categories',
          },
          {
            title: 'کاربران شعبه',
            icon: 'UsersIcon',
            children: [
              {
                title: 'مشاهده کابران',
                route: 'merchants-list-users',
              },
              {
                title: 'کاربر جدید',
                route: 'merchants-users-create',
              },
              {
                title: 'مجوز های شعبه',
                route: 'merchants-branch-licenses',
              },
            ]
          },
        ],
      },
      {
        title: 'گام های وفاداری',
        icon: 'StarIcon',
        children: [
          {
            title: 'برنامه های وفاداری',
            route: 'loyalty-plans',
          },
          {
            title: 'سطوح وفاداری',
            route: 'loyalty-levels',
          },
          {
            title: 'تاریخچه فعالیت ها',
            route: 'loyalty-actions-history',
          },
        ]
      },
      {
        title: 'مدیریت مشتریان',
        icon: 'UserCheckIcon',
        children: [
          {
            title: 'مشاهده مشتریان',
            route: 'customers-list',
          },
          {
            title: 'مشتری جدید',
            route: 'customers-createPerson',
          },
          {
            title: 'برچسب ها',
            icon: 'TagIcon',
            children: [
              {
                title: 'مشاهده برچسب ها',
                route: 'customers-tags',
              },
              {
                title: 'برچسب جدید',
                route: 'customers-addTag',
              },
            ],
          },
          {
            title: 'گروه بندی مشتریان',
            route: 'customers-categories',
          },
          {
            title: 'ورود مشتریان',
            route: 'customers-importCustomers',
          },
          {
            title: 'تخصیص مشتریان',
            route: 'customers-assignCustomers',
          },
          {
            title: 'تنظیمات مشتریان',
            route: 'customers-settings',
          },
          {
            title: 'تحلیل رفتار مشتریان',
            icon: 'TagIcon',
            children: [
              {
                title: 'تنظیمات',
                route: 'customers-statusSettings',
              },
              {
                title: 'گزارش',
                route: 'customers-valueRates',
              },
            ],
          },
        ],
      },
      {
        title: 'مدیریت فروش',
        icon: 'ShoppingBagIcon',
        children: [
          {
            title: 'فاکتور های فروش',
            children: [
              {
                title: 'مشاهده',
                route: 'sales-list',
              },
              {
                title: 'فاکتور فروش جدید',
                route: 'sales-createInvoice',
              },
              {
                title: 'ورود فاکتور',
                route: 'sales-importInvoice',
              },
              {
                title: 'تنظیمات فروش',
                route: 'sales-settings',
              },
            ],
          },
          {
            title: 'فاکتور های برگشتی',
            children: [
              {
                title: 'مشاهده',
                route: 'sales-return-list',
              },
              {
                title: 'تنظیمات برگشتی',
                route: 'sales-return-settings',
              },
            ],
          },
        ],
      },

      {
        title: 'مدیریت محصولات',
        icon: 'PackageIcon',
        children: [
          {
            title: 'مشاهده محصولات',
            route: 'products-list',
          },
          {
            title: 'محصول جدید',
            route: 'products-create',
          },
          {
            title: 'گروه بندی محصولات',
            route: 'products-categories',
          },
          {
            title: 'ورود محصولات',
            route: 'products-importProducts',
          },
        ],
      },
      {
        title: 'ارتباطات',
        icon: 'MessageSquareIcon',
        children: [
          {
            title: 'تنظیمات پیام کوتاه',
            route: 'connections-lineSettingsList',
          },
        ],
      },
      {
        title: 'قرعه کشی',
        icon: 'SunriseIcon',
        children: [
          {
            title: 'مشاهده قرعه کشی',
            route: 'lottery-list',
          },
          {
            title: 'ایجاد قرعه کشی',
            route: 'lottery-create',
          },
        ],
      },
      {
        title: 'هدیه و تخفیف',
        icon: 'GiftIcon',
        children: [
          {
            title: 'کوپن های تخفیف',
            route: 'gift-coupones-list',
          },
          {
            title: 'کارت هدیه',
            route: '',
            disabled: true,
            children: [
              {
                title: 'زیر گروه',
                route: '',
              },
            ]
          },
        ],
      },

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

    ],
  },
]
