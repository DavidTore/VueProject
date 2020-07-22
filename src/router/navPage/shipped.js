export default {
    label: '收货',
    name: 'receive-goods',
    permission: '',
      children: [
      {
        path: '/shipped/get-receipts',
        label: '消息中心',
        name: 'get-receipts',
        permission: '',
        component: () => import('@/views/shipped-goods/get-receipts.vue')
      },
      {
        path: '/shipped/fill-in-receipts',
        label: '填写收货数据',
        name: 'fill-in-receipts',
        component: () => import('@/views/shipped-goods/fill-in-receipts.vue')
      }
    ],
  }