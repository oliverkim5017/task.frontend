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
            {
                path: 'State',
                name: 'State',
                component: () => import('../components/views/State.vue')
            },
            {
                path: 'OperationLog',
                name: 'OperationLog',
                component: () => import('../components/views/OperationLog.vue')
            }
        ]
    }
];

const router = createRouter({
    history: createWebHistory('/'),
    routes,
});

router.beforeEach((to, from, next) => {
    const isAuthenticated = localStorage.getItem('token');
    if (!isAuthenticated && to.name !== 'Login') {
        next({name: 'Login'});
    } else if (isAuthenticated && to.path === '/DashBoard') {
        next({name: 'MyInfo'});
    } else {
        next();
    }
});


export default router;
