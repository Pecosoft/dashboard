import Frame from '@/apps/dashboard/components/frame'
import Index from '@/apps/dashboard/modules/Index'
const Repair = () => import(/* webpackChunkName: "Repair" */ '@/apps/dashboard/modules/Repair')
const Suggest = () => import(/* webpackChunkName: "Suggest" */ '@/apps/dashboard/modules/Suggest')
const Complain = () => import(/* webpackChunkName: "Complain" */ '@/apps/dashboard/modules/Complain')
const Department = () => import(/* webpackChunkName: "Org" */ '@/apps/dashboard/modules/Org/department')
const Employee = () => import(/* webpackChunkName: "Org" */ '@/apps/dashboard/modules/Org/employee')
const Product = () => import(/* webpackChunkName: "Product" */ '@/apps/dashboard/modules/Product')
const ProductCate = () => import(/* webpackChunkName: "Product" */ '@/apps/dashboard/modules/Product/cate')

export default [
  {
    path: '/',
    component: Frame,
    children: [
      {
        name: 'Index',
        path: '',
        component: Index,
        meta: {
          title: '首页'
        }
      }
    ]
  },
  {
    title: '产品管理',
    path: '/product/',
    component: Frame,
    children: [
      {
        name: 'ProductCate',
        path: 'cate',
        component: ProductCate,
        meta: {
          title: '产品分类'
        }
      },
      {
        name: 'Product',
        path: '',
        component: Product,
        meta: {
          title: '产品列表'
        }
      }
    ]
  },
  {
    title: '组织架构管理',
    path: '/org/',
    component: Frame,
    children: [
      {
        name: 'Department',
        path: 'department',
        component: Department,
        meta: {
          title: '部门管理'
        }
      },
      {
        name: 'Employee',
        path: 'employee',
        component: Employee,
        meta: {
          title: '员工管理'
        }
      }
    ]
  },
  {
    title: '报修管理',
    path: '/repair/',
    component: Frame,
    children: [
      {
        name: 'Repair',
        path: '',
        component: Repair,
        meta: {
          title: '客户报修'
        }
      }
    ]
  },
  {
    title: '投诉管理',
    path: '/complain/',
    component: Frame,
    children: [
      {
        name: 'Complain',
        path: '',
        component: Complain,
        meta: {
          title: '客户投诉'
        }
      }
    ]
  },
  {
    title: '建议管理',
    path: '/suggest/',
    component: Frame,
    children: [
      {
        name: 'Suggest',
        path: '',
        component: Suggest,
        meta: {
          title: '客户建议'
        }
      }
    ]
  }
]
