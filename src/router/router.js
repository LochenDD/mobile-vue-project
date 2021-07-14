import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/store'

const Layout = () => import('../views/Layout/Layout.vue')
const Login = () => import('../views/Login/Login.vue')
const Home = () => import('@/views/Layout/Home/Home.vue')
const User = () => import('@/views/Layout/User/User.vue')
const Search = () => import('@/views/Search/Search.vue')
const SearchResult = () => import('@/views/SearchResult/SearchResult.vue')
const Article = () => import('@/views/Article/Article.vue')
const UserProfile = () => import('@/views/Layout/UserProfile/UserProfile.vue')
const Chat = () => import('@/views/Layout/User/Chat/Chat.vue')

Vue.use(VueRouter)

// 获取原型对象上的push函数
const originalPush = VueRouter.prototype.push
// 修改原型对象中的push方法
VueRouter.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        path: '',
        redirect: 'home'
      },
      {
        name: 'home',
        path: 'home',
        component: Home,
        meta: {
          isKeepAlive: true
        }
      },
      {
        name: 'user',
        path: 'user',
        component: User
      }
    ]
  },
  {
    name: 'login',
    path: '/login',
    component: Login
  },
  {
    name: 'search',
    path: '/search',
    component: Search
  },
  {
    name: 'searchResult',
    path: '/searchResult/:keyword',
    component: SearchResult
  },
  {
    name: 'article',
    path: '/article/:id',
    component: Article
  },
  {
    name: 'userProfile',
    path: '/userProfile',
    component: UserProfile
  },
  {
    name: 'chat',
    path: '/chat',
    component: Chat
  }
]

const router = new VueRouter({
  routes
})

const NeedAuthenticationPage = ['/user', '/userProfile']

router.beforeEach((to, from, next) => {
  const token = store.state.user.tokenInfo.token
  if (to.path === '/login' && token) {
    router.push('/')
  }
  if (NeedAuthenticationPage.includes(to.path)) {
    if (token) {
      next()
    } else {
      router.push({
        name: 'login',
        query: {
          backTo: to.fullPath
        }
      })
    }
  } else {
    next()
  }
})

export default router
