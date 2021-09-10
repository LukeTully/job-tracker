import {
    createApp,
    configureCompat,
} from 'vue';
import {
    createRouter,
    createWebHistory,
} from 'vue-router';
import App from './App.vue';
import store from './store';
import JobDetailsView from './views/JobDetailsView.vue';
import JobEditor from './components/job/JobEditor.vue';
import JobCreator from './components/job/JobCreator.vue';
import Summary from './views/SummaryView.vue';

configureCompat({
    RENDER_FUNCTION: false,
    WATCH_ARRAY: false,
    COMPONENT_V_MODEL: false,
});

const routes = [
    {
        name: 'Home',
        path: '/',
        component: Summary,
        props: true,
    },
    {
        name: 'newJob',
        path: '/job/new',
        component: JobCreator,
        props: true,
    },
    {
        name: 'job',
        path: '/job/:id',
        component: JobDetailsView,
        props: true,
    },
    {
        name: 'editJob',
        path: '/job/:id/edit',
        component: JobEditor,
        props: true,
    },
    {
        name: 'summary',
        path: '/summary',
        component: Summary,
        props: true,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

const jobApp = createApp(App);
jobApp.use(router);
jobApp.use(store);

jobApp.mount('#app');