export default [
    {
        path: "/wallet/transactions",
        name: "wallet-transactions-index",
        component: () => import("@/views/wallet-transactions/index.vue"),
        meta: {
            action: 'backend.wallets.transactions.index',
            resource: 'wallets'
        }
    },
    {
        path: "/wallet/transactions/:id/show",
        name: "wallet-transactions-show",
        component: () => import("@/views/wallet-transactions/show.vue"),
        meta: {
            action: 'backend.wallets.transactions.show',
            resource: 'wallets'
        }
    }
];
