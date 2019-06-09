module.exports = {
    title: '个人主页',
    description: 'fyj0846的博客',
    head: [
        ['link', { rel: 'icon', href: '/img/logo.ico' }],
        ['link', { rel: 'manifest', href: '/manifest.json' }],
    ],
    themeConfig: {
        nav: [
            { text: '主页', link: '/' },
            {
                text: '文章',
                items: [
                    { text: 'Javascript', link: '/Javascript/function' }
                ]
            },
            { text: '关于', link: '/about/' },
            { text: 'Github', link: 'https://github.com/fyj0846' },
        ],
        sidebar: [
            '/',
            {
                title: 'Javascript',
                collapsable: false,
                children: [
                    '/Javascript/function',
                    '/Javascript/object'
                ]
            },
            {
                title: 'HTML',
                collapsable: false,
                children: [
                    '/HTML/test'
                ]
            }
        ],
        sidebarDepth: 2,
        lastUpdated: 'Last Updated',
    },
    serviceWorker: true
}