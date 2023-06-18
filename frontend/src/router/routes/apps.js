export default [
    {
        path: "/apps/calendar",
        name: "apps-calendar",
        component: () => import("@/views/apps/calendar/Calendar.vue")
    },

    // *===============================================---*
    // *--------- EMAIL & IT'S FILTERS N LABELS -------------------------------*
    // *===============================================---*
    {
        path: "/apps/email",
        name: "apps-email",
        component: () => import("@/views/apps/email/Email.vue"),
        meta: {
            contentRenderer: "sidebar-left",
            contentClass: "email-application"
        }
    },
    {
        path: "/apps/email/:folder",
        name: "apps-email-folder",
        component: () => import("@/views/apps/email/Email.vue"),
        meta: {
            contentRenderer: "sidebar-left",
            contentClass: "email-application",
            navActiveLink: "apps-email"
        },
        beforeEnter(to, _, next) {
            if (
                ["sent", "draft", "starred", "spam", "trash"].includes(
                    to.params.folder
                )
            )
                next();
            else next({ name: "error-404" });
        }
    },
    {
        path: "/apps/email/label/:label",
        name: "apps-email-label",
        component: () => import("@/views/apps/email/Email.vue"),
        meta: {
            contentRenderer: "sidebar-left",
            contentClass: "email-application",
            navActiveLink: "apps-email"
        },
        beforeEnter(to, _, next) {
            if (
                ["personal", "company", "important", "private"].includes(
                    to.params.label
                )
            )
                next();
            else next({ name: "error-404" });
        }
    },

    // *===============================================---*
    // *--------- TODO & IT'S FILTERS N TAGS ---------------------------------------*
    // *===============================================---*
    {
        path: "/apps/todo",
        name: "apps-todo",
        component: () => import("@/views/apps/todo/Todo.vue"),
        meta: {
            contentRenderer: "sidebar-left",
            contentClass: "todo-application"
        }
    },
    {
        path: "/apps/todo/:filter",
        name: "apps-todo-filter",
        component: () => import("@/views/apps/todo/Todo.vue"),
        meta: {
            contentRenderer: "sidebar-left",
            contentClass: "todo-application",
            navActiveLink: "apps-todo"
        },
        beforeEnter(to, _, next) {
            if (
                ["important", "completed", "deleted"].includes(to.params.filter)
            )
                next();
            else next({ name: "error-404" });
        }
    },
    {
        path: "/apps/todo/tag/:tag",
        name: "apps-todo-tag",
        component: () => import("@/views/apps/todo/Todo.vue"),
        meta: {
            contentRenderer: "sidebar-left",
            contentClass: "todo-application",
            navActiveLink: "apps-todo"
        },
        beforeEnter(to, _, next) {
            if (
                ["team", "low", "medium", "high", "update"].includes(
                    to.params.tag
                )
            )
                next();
            else next({ name: "error-404" });
        }
    },

    // *===============================================---*
    // *--------- CHAT  ---------------------------------------*
    // *===============================================---*
    {
        path: "/apps/chat",
        name: "apps-chat",
        component: () => import("@/views/apps/chat/Chat.vue"),
        meta: {
            contentRenderer: "sidebar-left",
            contentClass: "chat-application"
        }
    },

    // *===============================================---*
    // *--------- ECOMMERCE  ---------------------------------------*
    // *===============================================---*
    {
        path: "/apps/e-commerce/shop",
        name: "apps-e-commerce-shop",
        component: () =>
            import("@/views/apps/e-commerce/e-commerce-shop/ECommerceShop.vue"),
        meta: {
            contentRenderer: "sidebar-left-detached",
            contentClass: "ecommerce-application",
            pageTitle: "Shop",
            breadcrumb: [
                {
                    text: "ECommerce"
                },
                {
                    text: "Shop",
                    active: true
                }
            ]
        }
    },
    {
        path: "/apps/e-commerce/wishlist",
        name: "apps-e-commerce-wishlist",
        component: () =>
            import(
                "@/views/apps/e-commerce/e-commerce-wishlist/ECommerceWishlist.vue"
            ),
        meta: {
            pageTitle: "Wishlist",
            contentClass: "ecommerce-application",
            breadcrumb: [
                {
                    text: "ECommerce"
                },
                {
                    text: "Wishlist",
                    active: true
                }
            ]
        }
    },
    {
        path: "/apps/e-commerce/checkout",
        name: "apps-e-commerce-checkout",
        component: () =>
            import(
                "@/views/apps/e-commerce/e-commerce-checkout/ECommerceCheckout.vue"
            ),
        meta: {
            pageTitle: "Checkout",
            contentClass: "ecommerce-application",
            breadcrumb: [
                {
                    text: "ECommerce"
                },
                {
                    text: "Checkout",
                    active: true
                }
            ]
        }
    },
    {
        path: "/apps/e-commerce/:slug",
        name: "apps-e-commerce-product-details",
        component: () =>
            import(
                "@/views/apps/e-commerce/e-commerce-product-details/ECommerceProductDetails.vue"
            ),
        meta: {
            pageTitle: "Product Details",
            contentClass: "ecommerce-application",
            breadcrumb: [
                {
                    text: "ECommerce"
                },
                {
                    text: "Shop",
                    active: true
                },
                {
                    text: "Product Details",
                    active: true
                }
            ]
        }
    },

    //invoices
    {
        path: "/invoices/list",
        name: "invoices-list",
        component: () => import("@/views/invoices/List.vue")
    },
    //rateHistory
    {
        path: "/rateHistory/list",
        name: "rateHistory-list",
        component: () => import("@/views/rateHistory/List.vue")
    },
    // myInfo
    {
        path: "/info/profile",
        name: "info-me",
        component: () => import("@/views/info/MyProfile.vue")
    },
    // *===============================================---*
    // *--------- USER ---- ---------------------------------------*
    // *===============================================---*
    {
        path: "/users/list",
        name: "apps-users-list",
        component: () => import("@/views/apps/user/users-list/UsersList.vue"),
        meta: {
            action: "backend.users.index",
            resource: "users"
        }
    },
    {
        path: "/users/permissons",
        name: "admin-permissons",
        component: () =>
            import("@/views/apps/user/users-permissons/Permissons.vue")
    },
    {
        path: "/users/create",
        name: "apps-users-create",
        component: () => import("@/views/apps/user/users-list/UserCreate.vue"),
        meta: {
            action: "backend.users.create",
            resource: "users"
        }
    },
    {
        path: "/apps/users/edit/:id",
        name: "apps-users-edit",
        component: () => import("@/views/apps/user/users-list/UsersEdit.vue"),
        meta: {
            action: "backend.users.edit",
            resource: "users"
        }
    },
    {
        path: "/apps/users/view/:id",
        name: "apps-users-view",
        component: () => import("@/views/apps/user/users-view/UsersView.vue")
    },
    {
        path: "/apps/users/edit/:id",
        name: "apps-users-edit",
        component: () => import("@/views/apps/user/users-edit/UsersEdit.vue")
    },

    // Settings
    {
        path: "/settings/branding",
        name: "settings-branding",
        component: () => import("@/views/settings/Branding.vue")
    },
    {
        path: "/settings/order/audience",
        name: "settings-order-audience",
        component: () => import("@/views/settings/orderTypes/Audience.vue")
    },
    {
        path: "/settings/order/audience/setting/:index",
        name: "settings-order-audience-setting",
        component: () =>
            import("@/views/settings/orderTypes/AudienceSetting.vue")
    },
    {
        path: "/settings/order/audience/create",
        name: "settings-order-audience-create",
        component: () =>
            import("@/views/settings/orderTypes/AudienceCreate.vue")
    },
    {
        path: "/settings/order/sales-invoice",
        name: "settings-order-sales-invoice",
        component: () => import("@/views/settings/orderTypes/SalesInvoice.vue")
    },
    {
        path: "/settings/order/sales-invoice/create",
        name: "settings-order-sales-invoice-create",
        component: () =>
            import("@/views/settings/orderTypes/SalesInvoiceCreate.vue")
    },
    {
        path: "/settings/order/sales-invoice/setting/:index",
        name: "settings-order-sales-invoice-setting",
        component: () =>
            import("@/views/settings/orderTypes/SalesInvoiceSetting.vue")
    },
    {
        path: "/settings/order/return-invoice",
        name: "settings-order-return-invoice",
        component: () => import("@/views/settings/orderTypes/ReturnInvoice.vue")
    },
    {
        path: "/settings/order/return-invoice/create",
        name: "settings-order-return-invoice-create",
        component: () =>
            import("@/views/settings/orderTypes/ReturnInvoiceCreate.vue")
    },
    {
        path: "/settings/order/return-invoice/setting/:index",
        name: "settings-order-return-invoice-setting",
        component: () =>
            import("@/views/settings/orderTypes/ReturnInvoiceSetting.vue")
    },

    //Merchants
    {
        path: "/merchants",
        name: "merchants",
        component: () => import("@/views/merchants/MerchantsList.vue"),
        meta: {
            action: "backend.branches.index",
            resource: "branches"
        }
    },
    {
        path: "/merchantsCategory",
        name: "merchants-category",
        component: () => import("@/views/merchants/MerchantsCategory.vue"),
        meta: {
            action: "backend.branches.index",
            resource: "branches"
        }
    },
    {
        path: "/merchants/users/:id",
        name: "merchants-users",
        component: () => import("@/views/merchants/MerchantsUsers.vue")
    },
    {
        path: "/merchants/report",
        name: "merchants-report",
        component: () => import("@/views/merchants/MerchantsReport.vue")
    },
    {
        path: "/merchants/users/edit/:id",
        name: "merchants-users-edit",
        component: () => import("@/views/merchants/MerchantsUsersEdit.vue")
    },
    {
        path: "/merchants/rewards/:id",
        name: "merchants-rewards",
        component: () => import("@/views/merchants/MerchantsRewards.vue")
    },
    {
        path: "/merchants/rewards/edit/:id",
        name: "merchants-rewards-edit",
        component: () => import("@/views/merchants/MerchantsRewardsEdit.vue")
    },
    {
        path: "/merchants/create",
        name: "merchants-create",
        component: () => import("@/views/merchants/MerchantsCreate.vue"),
        meta: {
            action: "backend.branches.create",
            resource: "branches"
        }
    },
    {
        path: "/merchants/edit/:id",
        name: "merchants-edit",
        component: () => import("@/views/merchants/MerchantsEdit.vue"),
        meta: {
            action: "backend.branches.edit",
            resource: "branches"
        }
    },
    {
        path: "/merchants/categories",
        name: "merchants-categories",
        component: () => import("@/views/merchants/MerchantsCategories.vue")
    },
    {
        path: "/merchants/list/users",
        name: "merchants-list-users",
        component: () =>
            import("@/views/merchants/usersMerchants/MerchantsListUsers.vue")
    },
    {
        path: "/merchants/users/create",
        name: "merchants-users-create",
        component: () =>
            import("@/views/merchants/usersMerchants/MerchantsUsersCreate.vue")
    },
    {
        path: "/merchants/users/edit/user/:id",
        name: "merchants-users-edit-user",
        component: () =>
            import(
                "@/views/merchants/usersMerchants/MerchantsUsersEdituser.vue"
            )
    },
    {
        path: "/merchants/branch/licenses",
        name: "merchants-branch-licenses",
        component: () =>
            import(
                "@/views/merchants/usersMerchants/MerchantsBranchLicenses.vue"
            )
    },
    {
        path: "/merchants/admin/permission/:id",
        name: "admin-permission",
        component: () => import("@/views/merchants/EditPermission.vue"),
        meta: {
            action: "backend.branches.admin.add",
            resource: "branches"
        }
    },
    //Merchants

    //loyalty
    {
        path: "/loyalty/plans",
        name: "loyalty-plans",
        component: () => import("@/views/loyalty/LoyaltyPlans.vue"),
        meta: {
            action: "backend.loyalties.index",
            resource: "loyalties"
        }
    },
    {
        path: "/loyalty/levels",
        name: "loyalty-levels",
        component: () => import("@/views/loyalty/LoyaltyLevels.vue")
    },
    {
        path: "/loyalty/actions/history",
        name: "loyalty-actions-history",
        component: () => import("@/views/loyalty/ActionsHistory.vue")
    },

    //loyaltyPlans
    {
        path: "/loyalty/plans/purchase",
        name: "loyalty-plans-purchase",
        component: () => import("@/views/loyalty/plans/Purchase.vue"),
        meta: {
            action: "backend.loyalties.edit.BillCreated",
            resource: "loyalties"
        }
    },
    {
        path: "/loyalty/plans/registerInClub",
        name: "loyalty-plans-registerInClub",
        component: () => import("@/views/loyalty/plans/RegisterInClub.vue"),
        meta: {
            action: "backend.loyalties.edit.UserRegistered",
            resource: "loyalties"
        }
    },
    {
        path: "/loyalty/plans/completeProfile",
        name: "loyalty-plans-completeProfile",
        component: () => import("@/views/loyalty/plans/CompleteProfile.vue"),
        meta: {
            action: "backend.loyalties.edit.ProfileCompleted",
            resource: "loyalties"
        }
    },
    {
        path: "/loyalty/plans/survey",
        name: "loyalty-plans-survey",
        component: () => import("@/views/loyalty/plans/Survey.vue"),
        meta: {
            action: "backend.loyalties.edit.SurveyParticipated",
            resource: "loyalties"
        }
    },
    {
        path: "/loyalty/plans/giftPoint",
        name: "loyalty-plans-giftPoint",
        component: () => import("@/views/loyalty/plans/GiftPoint.vue"),
        meta: {
            action: "backend.loyalties.edit.BirthdayOccurred",
            resource: "loyalties"
        }
    },
    {
        path: "/loyalty/plans/inviteFriends",
        name: "loyalty-plans-inviteFriends",
        component: () => import("@/views/loyalty/plans/InviteFriends.vue"),
        meta: {
            action: "backend.loyalties.edit.ReferralUserRegistered",
            resource: "loyalties"
        }
    },
    {
        path: "/loyalty/plans/Anniversary",
        name: "loyalty-plans-anniversary",
        component: () => import("@/views/loyalty/plans/Anniversary.vue"),
        meta: {
            action: "backend.loyalties.edit.AnniversaryOccurred",
            resource: "loyalties"
        }
    },
    //loyaltyPlans

    //loyaltyLevels
    {
        path: "/loyalty/levels/createNewLevel",
        name: "loyalty-levels-createNewLevel",
        component: () => import("@/views/loyalty/levels/CreateNewLevel.vue")
    },
    {
        path: "/loyalty/levels/editLoyaltyLevel",
        name: "loyalty-levels-editLoyaltyLevel",
        component: () => import("@/views/loyalty/levels/EditLoyaltyLevel.vue")
    },
    {
        path: "/loyalty/levels/editRewardsLoyalty",
        name: "loyalty-levels-editRewardsLoyalty",
        component: () => import("@/views/loyalty/levels/EditRewardsLoyalty.vue")
    },
    //loyaltyLevels

    //loyalty

    //customers management
    {
        path: "/customers/list",
        name: "customers-list",
        component: () =>
            import("@/views/customers-management/CustomersList.vue"),
        meta: {
            action: "backend.users.index",
            resource: "users"
        }
    },
    {
        path: "/customers/createPerson",
        name: "customers-createPerson",
        component: () =>
            import("@/views/customers-management/CreatePerson.vue"),
        meta: {
            action: "backend.users.create",
            resource: "users"
        }
    },
    {
        path: "/customers/tags",
        name: "customers-tag",
        component: () =>
            import("@/views/customers-management/CustomersTags.vue"),
        meta: {
            action: "backend.tags.users.index",
            resource: "tags"
        }
    },
    {
        path: "/customers/category",
        name: "customers-category",
        component: () =>
            import("@/views/customers-management/CustomersCategories.vue"),
        meta: {
            action: "backend.tags.users.index",
            resource: "tags"
        }
    },
    {
        path: "/customers/editPerson/:id",
        name: "customers-editPerson",
        component: () => import("@/views/customers-management/EditPerson.vue"),
        meta: {
            action: "backend.users.edit",
            resource: "users"
        }
    },
    {
        path: "/customers/categories",
        name: "customers-categories",
        component: () => import("@/views/customers-management/Categories.vue"),
        meta: {
            action:  "backend.groups.users.index",
            resource: "groups"
        }
    },
    {
        path: "/customers/createPersonQuick",
        name: "customers-createPersonQuick",
        component: () =>
            import("@/views/customers-management/CreatePersonQuick.vue"),
        meta: {
            action: "backend.users.create",
            resource: "users"
        }
    },
    {
        path: "/customers/tags",
        name: "customers-tags",
        component: () => import("@/views/customers-management/Tags.vue"),
        meta: {
            action:  "backend.tags.users.index",
            resource: "tags"
        }
    },
    {
        path: "/customers/addTag",
        name: "customers-addTag",
        component: () => import("@/views/customers-management/AddTag.vue"),
        meta: {
            action: "backend.tags.create",
            resource: "tags"
        }
    },
    {
        path: "/customers/createLevels",
        name: "customers-createLevels",
        component: () =>
            import("@/views/customers-management/CreateLevels.vue"),
        meta: {
            action: "backend.levels.index",
            resource: "levels"
        }
    },
    {
        path: "/customers/levels",
        name: "customers-levels",
        component: () =>
            import("@/views/customers-management/CustomersLevels.vue"),
        meta: {
            action: "backend.users.index",
            resource: "users"
        }
    },
    {
        path: "/customers/editLevels/:id",
        name: "customers-editLevels",
        component: () =>
            import("@/views/customers-management/EditLevels.vue"),
        meta: {
            action: "backend.users.index",
            resource: "users"
        }
    },
    {
        path: "/customers/editTag/:id",
        name: "customers-editTag",
        component: () => import("@/views/customers-management/EditTag.vue"),
        meta: {
            action: "backend.tags.edit",
            resource: "tags"
        }
    },
    {
        path: "/customers/import",
        name: "customers-importCustomers",
        component: () =>
            import("@/views/customers-management/ImportCustomers.vue"),
        meta: {
            action: "backend.users.import",
            resource: "users"
        }
    },
    {
        path: "/customers/assignCustomers",
        name: "customers-assignCustomers",
        component: () =>
            import("@/views/customers-management/AssignCustomers.vue")
    },
    {
        path: "/customers/settings",
        name: "customers-settings",
        component: () =>
            import("@/views/customers-management/CustomersSettings.vue")
    },
    {
        path: "/customers/statusSettings",
        name: "customers-statusSettings",
        component: () =>
            import("@/views/customers-management/CustomerStatusSettings.vue")
    },
    {
        path: "/customers/valueRates",
        name: "customers-valueRates",
        component: () =>
            import("@/views/customers-management/CustomerValueRates.vue")
    },
    //customers management
    //Information
    {
        path: "/my",
        name: "customer-information",
        component: () =>
            import("@/views/customers-management/EditInformation.vue"),
        meta: {
            action: "backend.users.edit",
            resource: "users"
        }
    },
    //sales management
    {
        path: "/sales/list",
        name: "sales-list",
        component: () =>
            import("@/views/sales-management/sales-invoice/List.vue"),
        meta: {
            action: "backend.bills.index",
            resource: "bills"
        }
    },
    {
        path: "/sales/editInvoice/:id",
        name: "invoice-edit",
        component: () =>
            import("@/views/sales-management/sales-invoice/Edit.vue")
    },
    {
        path: "/sales/createInvoice",
        name: "sales-createInvoice",
        component: () =>
            import("@/views/sales-management/sales-invoice/CreateInvoice.vue"),
        meta: {
            action: "backend.bills.create",
            resource: "bills"
        }
    },
    {
        path: "/sales/importInvoice",
        name: "sales-importInvoice",
        component: () =>
            import("@/views/sales-management/sales-invoice/ImportInvoice.vue")
    },
    {
        path: "/sales/settings",
        name: "sales-settings",
        component: () =>
            import("@/views/sales-management/sales-invoice/Settings.vue")
    },
    {
        path: "/sales/report",
        name: "sales-report",
        component: () =>
            import("@/views/sales-management/sales-invoice/Report.vue")
    },
    {
        path: "/sales/analyse",
        name: "sales-analyse",
        component: () =>
            import("@/views/sales-management/sales-invoice/Analyse.vue")
    },

    {
        path: "/sales/return/list",
        name: "sales-return-list",
        component: () =>
            import("@/views/sales-management/return-invoice/List.vue")
    },
    {
        path: "/sales/return/createInvoice",
        name: "sales-return-createInvoice",
        component: () =>
            import("@/views/sales-management/return-invoice/CreateInvoice.vue")
    },
    {
        path: "/sales/return/settings",
        name: "sales-return-settings",
        component: () =>
            import("@/views/sales-management/return-invoice/Settings.vue")
    },
    {
        path: "/sales/return/report",
        name: "sales-return-report",
        component: () =>
            import("@/views/sales-management/return-invoice/Report.vue")
    },
    {
        path: "/sales/return/analyse",
        name: "sales-return-analyse",
        component: () =>
            import("@/views/sales-management/return-invoice/Analyse.vue")
    },
    //sales management

    //products management
    {
        path: "/products/list",
        name: "products-list",
        component: () => import("@/views/products-management/ProductsList.vue"),
        meta: {
            action: "backend.products.index",
            resource: "products"
        }
    },
    {
        path: "/products/category",
        name: "products-category",
        component: () => import("@/views/products-management/ProductCategories.vue"),
        meta: {
            action: "backend.products.index",
            resource: "products"
        }
    },
    {
        path: "/products/create",
        name: "products-create",
        component: () =>
            import("@/views/products-management/CreateProduct.vue"),
        meta: {
            action: "backend.products.create",
            resource: "products"
        }
    },
    {
        path: "/products/editProduct/:id",
        name: "products-editProduct",
        component: () => import("@/views/products-management/EditProduct.vue"),
        meta: {
            action: "backend.products.edit",
            resource: "products"
        }
    },
    {
        path: "/products/categories",
        name: "products-categories",
        component: () => import("@/views/products-management/Categories.vue"),
        meta: {
            action: "backend.groups.products.index",
            resource: "groups"
        }
    },
    {
        path: "/products/importProducts",
        name: "products-importProducts",
        component: () =>
            import("@/views/products-management/ImportProducts.vue")
    },
    //products management

    //connections
    {
        path: "/connections/lineSettingsList",
        name: "connections-lineSettingsList",
        component: () => import("@/views/connections/LineSettingsList.vue")
    },
    {
        path: "/connections/createLineSettings",
        name: "connections-createLineSettings",
        component: () => import("@/views/connections/CreateLineSettings.vue")
    },
    {
        path: "/connections/editLineSettings/:id",
        name: "connections-editLineSettings",
        component: () => import("@/views/connections/EditLineSettings.vue")
    },
    //connections

    // gift
    {
        path: "/gift/coupones/list",
        name: "gift-coupones-list",
        component: () => import("@/views/gift/coupons/List.vue"),
        meta: {
            action: "backend.discounts.index",
            resource: "discounts"
        }
    },
    {
        path: "/gift/coupones/create",
        name: "gift-coupones-create",
        component: () => import("@/views/gift/coupons/CreateCoupone.vue"),
        meta: {
            action: "backend.discounts.create",
            resource: "discounts"
        }
    },
    {
        path: "/gift/coupones/edit/:id",
        name: "gift-coupones-edit",
        component: () => import("@/views/gift/coupons/EditCoupone.vue"),
        meta: {
            action: "backend.discounts.edit",
            resource: "discounts"
        }
    },
    {
        path: "/gift/coupones/assignedCustomers/:id",
        name: "gift-coupones-assignedCustomers",
        component: () => import("@/views/gift/coupons/AssignedCustomers.vue")
    },
    {
        path: "/gift/coupones/assignCustomers/:id",
        name: "gift-coupones-assignCustomers",
        component: () => import("@/views/gift/coupons/AssignCustomers.vue")
    },
    // gift

    //lottery
    {
        path: "/lottery/list",
        name: "lottery-list",
        component: () => import("@/views/lottery/LotteryList.vue"),
        meta: {
            action: "backend.lotteries.index",
            resource: "lotteries"
        }
    },
    {
        path: "/lotteries/create",
        name: "lottery-create",
        component: () => import("@/views/lottery/CreateLottery.vue"),
        meta: {
            action: "backend.lotteries.create",
            resource: "lotteries"
        }
    },
    {
        path: "/lottery/editLottery/:id",
        name: "lottery-edit",
        component: () => import("@/views/lottery/EditLottery.vue"),
        meta: {
            action: "backend.lotteries.edit",
            resource: "lotteries"
        }
    },
    //lottery

    //blog
    {
        path: "/blog/list",
        name: "blog-list",
        component: () => import("@/views/blog/BlogList.vue"),
        meta: {
            action: "default",
            resource: "default"
        }
    },
    {
        path: "/blog/createBlog",
        name: "blog-create",
        component: () => import("@/views/blog/CreateBlog.vue"),
        meta: {
            action: "backend.tags.blogs.create",
            resource: "tags"
        }
    },
    {
        path: "/blog/tags",
        name: "blog-tags",
        component: () => import("@/views/blog/BlogTags.vue"),
        meta: {
            action:"backend.tags.blogs.index",
            resource: "tags"
        }
    },
    {
        path: "/blog/categories",
        name: "blog-categories",
        component: () => import("@/views/blog/BlogCategories.vue"),
        meta: {
            action: "backend.groups.blogs.index",
            resource: "groups"
        }
    },
    {
        path: "/blog/editBlog/:id",
        name: "blog-edit",
        component: () => import("@/views/blog/EditBlog.vue"),
        meta: {
            action: "default",
            resource: "default"
        }
    },
    //blog

    
    //lostCards
    {
        path: "/missingCards",
        name: "missingCards",
        component: () => import("@/views/missing-cards/MissingCards.vue")
    },
    //lostCards

    //Survey
    {
        path: "/survey/list",
        name: "survey-list",
        component: () => import("@/views/survey/List.vue"),
        meta: {
            action: "backend.surveys.index",
            resource: "surveys"
        }
    },
    {
        path: "/survey/:id/edit",
        name: "survey-edit",
        component: () => import("@/views/survey/Edit.vue"),
        meta: {
            action: "backend.surveys.edit",
            resource: "surveys"
        }
    },
    {
        path: "/survey/create",
        name: "survey-create",
        component: () => import("@/views/survey/Create.vue"),
        meta: {
            action: "backend.surveys.create",
            resource: "surveys"
        }
    },
    /* {
        path: "/survey/create",
        name: "survey-create",
        component: () => import("@/views/survey/Create.vue"),
        meta: {
            action: "backend.surveys.create",
            resource: "surveys"
        }
    },
    {
        path: "/survey/results/:id",
        name: "survey-results",
        component: () => import("@/views/survey/results/Results.vue")
    },
    {
        path: "/survey/result/:id",
        name: "survey-result",
        component: () => import("@/views/survey/results/Result.vue")
    },
    {
        path: "/survey/settings/:id",
        name: "survey-settings",
        component: () => import("@/views/survey/settings/SurveySettings.vue")
    },
    {
        path: "/survey/questions/:id",
        name: "survey-questions",
        component: () => import("@/views/survey/questions/List.vue")
    },
    {
        path: "/survey/questions/create/:id",
        name: "survey-questions-create",
        component: () => import("@/views/survey/questions/CreateQuestion.vue")
    },
    {
        path: "/survey/questions/edit/:id",
        name: "survey-questions-edit",
        component: () => import("@/views/survey/questions/EditQuestion.vue")
    },
    {
        path: "/survey/satisfactions/:id",
        name: "survey-satisfactions",
        component: () => import("@/views/survey/satisfactions/List.vue")
    },
    {
        path: "/survey/satisfactions/create/:id",
        name: "survey-satisfactions-create",
        component: () =>
            import("@/views/survey/satisfactions/CreateSatisfaction.vue")
    },
    {
        path: "/survey/satisfactions/edit/:id",
        name: "survey-satisfactions-edit",
        component: () =>
            import("@/views/survey/satisfactions/EditSatisfaction.vue")
    },
    {
        path: "/survey/options/:id",
        name: "survey-options",
        component: () => import("@/views/survey/options/List.vue")
    },
    {
        path: "/survey/options/create/:id",
        name: "survey-options-create",
        component: () => import("@/views/survey/options/CreateOption.vue")
    },
    {
        path: "/survey/options/edit/:id",
        name: "survey-options-edit",
        component: () => import("@/views/survey/options/EditOption.vue")
    },
    {
        path: "/survey/rules/:id",
        name: "survey-rules",
        component: () => import("@/views/survey/rules/List.vue")
    },
    {
        path: "/survey/rules/create/:id",
        name: "survey-rules-create",
        component: () => import("@/views/survey/rules/CreateRule.vue")
    },
    {
        path: "/survey/rules/edit/:id",
        name: "survey-rules-edit",
        component: () => import("@/views/survey/rules/EditRule.vue")
    },
    //Survey */

    // Invoice
    {
        path: "/apps/invoice/list",
        name: "apps-invoice-list",
        component: () =>
            import("@/views/apps/invoice/invoice-list/InvoiceList.vue")
    },
    {
        path: "/apps/invoice/preview/:id",
        name: "apps-invoice-preview",
        component: () =>
            import("@/views/apps/invoice/invoice-preview/InvoicePreview.vue")
    },
    {
        path: "/apps/invoice/add/",
        name: "apps-invoice-add",
        component: () =>
            import("@/views/apps/invoice/invoice-add/InvoiceAdd.vue")
    },
    {
        path: "/apps/invoice/edit/:id",
        name: "apps-invoice-edit",
        component: () =>
            import("@/views/apps/invoice/invoice-edit/InvoiceEdit.vue")
    }
];
