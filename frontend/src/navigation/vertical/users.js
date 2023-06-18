export default [
    {
      title: 'مدیریت کاربران',
      icon: 'UsersIcon',
      children: [
        {
          title: 'مشاهده کاربران',
          route: 'users-show',
          action: 'backend.users.index',
          resource: 'users'
        },
        {
          title: 'کاربر جدید',
          route: 'user-create',
          action: 'backend.users.create',
          resource: 'users'
        },
        {
          title: 'مجوز های مدیران',
          route: 'dashboard-sale',
        },
      ],
    },
  ]
  