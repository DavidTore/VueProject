export default {
    label: '收货单台账',
    children: [
        {
        path: '/receipts/list',
        label: '收货单台账',
        name: 'receipts-list',
        permission: '',
        component: () => import('@/views/all-receipts/index')}
    ]
}