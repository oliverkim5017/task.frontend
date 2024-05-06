import {createRouter, createWebHistory} from 'vue-router';

const routes = [
    {
        path: '/',
        redirect: '/DashBoard'
    },
    {
        path: '/Login',
        name: 'Login',
        component: () => import('../components/views/Login.vue')
    },
    {
        path: '/DashBoard',
        name: 'DashBoard',
        component: () => import('../components/views/DashBoard.vue'),
        children: [
            {
                path: 'TaskBoard',
                name: 'TaskBoard',
                component: () => import('../components/views/TaskBoard.vue')
            },
            {
                path: 'TaskManagement',
                name: 'TaskManagement',
                component: () => import('../components/views/TaskManagement.vue')
            },
            {
                path: 'MyInfo',
                name: 'MyInfo',
                component: () => import('../components/views/MyInfo.vue')
            },
            {
                path: 'Project',
                name: 'Project',
                component: () => import('../components/views/Project.vue')
            },
            {
                path: 'Department',
                name: 'Department',
                component: () => import('../components/views/Department.vue')
            },
            {
                path: 'User',
                name: 'User',
                component: () => import('../components/views/User.vue')
            },
            {
                path: 'Role',
                name: 'Role',
                component: () => import('../components/views/Role.vue')
            },
            {
                path: 'Status',
                name: 'Status',
                component: () => import('../components/views/Status.vue')
            },
        ]
    }
];

const router = createRouter({
    history: createWebHistory('/'),
    routes,
});

router.beforeEach((to, from, next) => {
    const isAuthenticated = localStorage.getItem('token');
    // 检查用户是否已经登录，如果尝试访问的不是登录页面，并且没有 token，则重定向到登录页面
    if (to.name !== 'Login' && !isAuthenticated) {
        next({name: 'Login'});
    } else {
        next(); // 否则继续
    }
});

export default router;
