var nav = require('./nav')
var sidebar = require('./sidebar')
module.exports = {
    title: 'coderTro',
    description: 'coderTro的博客',
    head: [
        ['link', { rel: 'icon', href: '/img/logo.ico' }],
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