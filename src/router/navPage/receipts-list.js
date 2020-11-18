export default {
    label: ' 单 ',
    children: [
        {
        path: '/receipts/list',
        label: ' 单 ',
        name: 'receipts-list',
        permission: '',
        component: () => import('@/views/all-receipts/index')}
    ]
}