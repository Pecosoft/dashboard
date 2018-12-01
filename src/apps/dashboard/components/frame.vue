<template lang="pug">
.page
  el-container
    el-header(height='60px' style='padding: 0; background-color: #0769ad')
      el-container
        el-aside(width='200px' style='padding: 0 20px')
          p.peco-logo-bar Taikan
        el-main.no-padding
        el-aside(width='100px')
          el-dropdown
            i.el-icon-setting(style='margin-right: 15px')
            el-dropdown-menu(slot='dropdown')
              el-dropdown-item 退出登录
          span admin
    el-container
      el-aside(width='200px' style='border-right: solid 1px #e6e6e6; background-color: #fff')
        el-menu(:router='true' @select='onSelect')
          div(v-for='menu in menus' :key='menu.path')
            el-submenu(:index='menu.path' v-if='menu.children')
              span(slot='title') {{ menu.title }}
              el-menu-item(v-for='submenu in menu.children' :index='submenu.path') {{ submenu.title }}
            el-menu-item(:index='menu.path' v-else) {{ menu.title }}
      el-main.no-padding
        .peco-breadcrumb
          el-breadcrumb(separator='/')
            el-breadcrumb-item(v-for='navItem in nav' :to='{ path: navItem.path }' :key='navItem.path') {{ navItem.title }}
        router-view
</template>

<script>
import routes from '../router/routes'

export default {
  data () {
    const menus = []
    routes.forEach(route => {
      let suffix = route.path
      if (suffix === '/') {
        menus.push({ path: route.redirect, title: '首页' })
      } else {
        menus.push({ title: route.title, path: route.path, children: [] })
        let submenu = menus[menus.length - 1].children
        route.children.forEach(page => {
          submenu.push({ path: suffix + page.path, title: page.meta.title })
        })
      }
    })
    return {
      menus,
      nav: [{ title: '首页', path: '/' }]
    }
  },
  methods: {
    onSelect (index, indexPath) {
      let menus = this.menus
      let nav = []
      menus.forEach(menu => {
        if (menu.path === indexPath[0]) {
          nav[0] = { title: menu.title, path: menu.path }
          if (menu.children && menu.children.length) {
            menu.children.forEach(submenu => {
              if (submenu.path === indexPath[1]) {
                nav[1] = { title: submenu.title, path: submenu.path }
              }
            })
          }
        }
      })
      this.nav = nav
    }
  }
}
</script>

<style lang="stylus">
.no-padding
  padding: 0

.el-header
  line-height: 60px

.el-menu
  border-right: none

.peco-logo-bar
  color: #fff
  font-size: 25px
  line-height: 60px

.peco-breadcrumb
  background: #fff
  border-bottom: solid 1px #e6e6e6
  padding: 10px
</style>
