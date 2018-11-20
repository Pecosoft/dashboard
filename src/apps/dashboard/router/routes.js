import Frame from '@/apps/dashboard/components/frame'
import Index from '@/apps/dashboard/modules/Index'
const Repair = () => import(/* webpackChunkName: "Repair" */ '@/apps/dashboard/modules/Repair')
const Suggest = () => import(/* webpackChunkName: "Suggest" */ '@/apps/dashboard/modules/Suggest')
const Complain = () => import(/* webpackChunkName: "Complain" */ '@/apps/dashboard/modules/Complain')

export default [
  {
    path: '/',
    component: Frame,
    redirect: '/dashboard',
    children: [
      {
        name: 'Index',
        path: 'dashboard',
        component: Index,
        meta: {
          title: '首页'
        }
      }
    ]
  },
  {
    title: '报修管理',
    path: '/repair',
    component: Frame,
    redirect: '/repair/',
    children: [
      {
        name: 'Repair',
        path: '/',
        component: Repair,
        meta: {
          title: '客户报修'
        }
      }
    ]
  },
  {
    title: '建议管理',
    path: '/suggest',
    component: Frame,
    redirect: '/suggest/',
    children: [
      {
        name: 'Suggest',
        path: '/',
        component: Suggest,
        meta: {
          title: '客户建议'
        }
      }
    ]
  },
  {
    title: '投诉管理',
    path: '/complain',
    component: Frame,
    redirect: '/complain/',
    children: [
      {
        name: 'Complain',
        path: '/',
        component: Complain,
        meta: {
          title: '客户投诉'
        }
      }
    ]
	}
]
