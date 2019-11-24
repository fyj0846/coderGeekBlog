var nav = require('./nav')
var sidebar = require('./sidebar')
module.exports = {
    title: 'CdrGeek',
    description: '个人博客',
    head: [
        ['link', { rel: 'icon', href: '/cdrgeek.png' }],
        ['link', { rel: 'manifest', href: '/manifest.json' }],
    ],
    themeConfig: {
        nav,
        sidebar,
        sidebarDepth: 2,
        lastUpdated: 'Last Updated',
    },
    serviceWorker: true
}