import Vue from 'vue'
import Router from 'vue-router'
import rootpage from '../components/rootpage'
import userNew from '../components/userNew'
import sessionsNew from '../components/sessionsNew'
import postNew from '../components/postNew'
import postIndex from '../components/postIndex'
import postEdit from '../components/postEdit'
import postShow from '../components/postShow'
import favoriteIndex from '../components/favoriteIndex'
import userShow from '../components/userShow'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'rootPage',
      component: rootpage
    },
    {
      path: '/user/new',
      name: 'userNew',
      component: userNew
    },
    {
      path: '/session/new',
      name: 'sessionNew',
      component: sessionsNew
    },
    {
      path: '/post/new',
      name: 'postNew',
      component: postNew
    },
    {
      path: '/post/index',
      name: 'postIndex',
      component: postIndex
    },
    {
      path: '/post/update/:id',
      name: 'postEdit',
      component: postEdit
    },
    {
      path: '/post/show/:id',
      name: 'postShow',
      component: postShow
    },
    {
      path: '/favorite/index',
      name: 'favoriteIndex',
      component: favoriteIndex
    },
    {
      path: '/user/show/:id',
      name: 'userShow',
      component: userShow
    }
  ]
})
