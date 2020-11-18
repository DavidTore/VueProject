export default {
    label: ' ',
    name: 'receive-goods',
    permission: '',
    children: [
      {
        path: '/shipped/get-receipts',
        label: '获取 单',
        name: 'get-receipts',
        permission: '',
        component: () => import('@/views/shipped-goods/get-receipts.vue')
      },
      {
        path: '/shipped/fill-in-receipts',
        label: '填写 数据',
        name: 'fill-in-receipts',
        component: () => import('@/views/shipped-goods/fill-in-receipts.vue')
      },
      {
        path: '/shipped/receipts-detail',
        label:' 数据详情',
        name: 'receipts-detail',
        component: () => import('@/views/shipped-goods/receipts-detail.vue')
      }
    ],
  }