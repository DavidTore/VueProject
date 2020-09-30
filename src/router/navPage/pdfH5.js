export default {
    label: 'pdfH5',
    children: [
        {
        path: '/pdf-preview',
        label: 'pdfH5',
        name: 'pdf-preview',
        permission: '',
        component: () => import('@/views/pdfPreview/index')}
    ]
}