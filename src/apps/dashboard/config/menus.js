import routes from '@/apps/dashboard/router/routes'

const menus = []

console.log('routes', routes)

routes.forEach(route => {
  let suffix = route.path
  if (suffix === '/') {
    menus.push({ path: route.redirect, title: '首页' })
  } else {
    menus.push({ title: route.title, children: [] })
    let submenu = menus[menus.length - 1].children
    route.children.forEach(page => {
      submenu.push({ path: suffix + page.path, title: page.meta.title })
    })
  }
})

export default menus
