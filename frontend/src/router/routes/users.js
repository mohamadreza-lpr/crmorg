export default [
  {
    path: '/users/index',
    name: 'users-show',
    component: () => import('@/views/users/Users.vue'),
  },
  {
    path: '/user/create',
    name: 'user-create',
    component: () => import('@/views/users/CreateUser.vue'),
  },
  {
    path: '/access-control/roles',
    name: 'roles-list',
    component: () => import('@/views/access-control/roles/List.vue'),
    meta: {
      action: "backend.roles.index",
      resource: 'roles',
    }
  },
  {
    path: '/access-control/roles/create',
    name: 'roles-create',
    component: () => import('@/views/access-control/roles/Create.vue'),
    meta: {
      action: "backend.roles.create",
      resource: 'roles',
    }
  },
  {
    path: '/access-control/roles/:id/edit',
    name: 'roles-edit',
    component: () => import('@/views/access-control/roles/Edit.vue'),
    meta: {
      action: "backend.roles.edit",
      resource: 'roles',
    }
  },
  {
    path: '/access-control/:id/permission-assign',
    name: 'permission-assign',
    component: () => import('@/views/access-control/permissions/PermissionAssign.vue'),
    meta: {
      action: "backend.roles.edit",
      resource: 'roles',
    }
  }
]
