export default {
    label: '二次签章',
    children: [
        {
        path: '/recheck/list',
        label: '二次签章列表',
        name: 'recheck-list',
        permission: '',
        component: () => import('@/views/recheck/list.vue')}
    ]
}