
const routes = [
  {
    path: '/',
    component: () => import('layouts/Layout.vue'),
    children: [
      {
        path: '',
        component: () => import('pages/OrderMenu.vue')
      },
      {
        path: '/settings',
        component: () => import('pages/Settings.vue')
      },
      {
        path: '/addorder',
        component: () => import('pages/AddOrder.vue')
      },
      {
        path: '/addbatch',
        component: () => import('pages/AddBatch.vue')
      },
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
