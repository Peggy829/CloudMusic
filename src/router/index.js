import Vue from 'vue'
import VueRouter from 'vue-router'
// 通过import xxx from xxx的方式加载组件，无论组件有没有被用到，都会被加载进来
// import Recommend from '../views/Recommend'
// import Rank from '../views/Rank'
// import Search from '../views/Search'
// import Singer from '../views/Singer'

// 实现vue组件按需加载
const Recommend = (reslove) => {
  import('../views/Recommend').then((module) => {
    reslove(module)
  })
}
const Account = (reslove) => {
  import('../views/Account').then((module) => {
    reslove(module)
  })
}
const Detail = (reslove) => {
  import('../views/Detail').then((module) => {
    reslove(module)
  })
}
const Rank = (reslove) => {
  import('../views/Rank').then((module) => {
    reslove(module)
  })
}
const Search = (reslove) => {
  import('../views/Search').then((module) => {
    reslove(module)
  })
}
const Singer = (reslove) => {
  import('../views/Singer').then((module) => {
    reslove(module)
  })
}

Vue.use(VueRouter)

const routes = [
  {path:'/',redirect:'/recommend'},
  {path:'/recommend',
    component:Recommend,
    children:[
      {
        path:'detail/:id/:type',
        component:Detail
      }
    ]
  },
  {path:'/rank',
    component:Rank,
    children:[
      {
        path:'detail/:id/:type',
        component:Detail
      }
    ]
  },
  {path:'/search',component:Search},
  {path:'/singer',
    component:Singer,
    children:[
      {
        path:'detail/:id/:type',
        component:Detail
      }
    ]
  },
  {path:'/account',component:Account}

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router