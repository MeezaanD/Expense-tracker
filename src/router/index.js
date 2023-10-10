import {
	createRouter,
	createWebHistory,
	RouteRecordRaw
} from 'vue-router'
import DashboardView from '../views/DashboardView.vue'

const routes = [{
	path: '/',
	name: 'dashboard',
	component: DashboardView
},
{
	path: '/budget',
	name: 'budget',
	component: () => import('../views/BudgetView.vue')
},
{
	path: '/expenses',
	name: 'expenses',
	component: () => import('../views/ExpensesView.vue')
}
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
})

export default router
