export default {
    label: '  ',
    children: [
        {
        path: '/recheck/list',
        label: '  列表',
        name: 'recheck-list',
        permission: '',
        component: () => import('@/views/recheck/list.vue')
        },
        {
            path: '/recheck/result',
            label: '质检结果',
            name: 'recheck-result',
            permission:'',
            component: () => import('@/views/recheck/recheck-result.vue')
        }
    ]
}