var nav = require('./nav')
var sidebar = require('./sidebar')
module.exports = {
    title: ' ',
    description: '技术博客',
    head: [
        ['link', { rel: 'icon', href: '/cdrgeek.png' }],
        ['link', { rel: 'manifest', href: '/manifest.json' }],
    ],
    themeConfig: {
        nav,
        sidebar,
        sidebarDepth: 3,
        lastUpdated: 'Last Updated',
    },
    serviceWorker: true
}