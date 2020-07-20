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
    ],
  }