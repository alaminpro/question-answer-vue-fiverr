import VueRouter from 'vue-router';
import routes from './routes';

export default new VueRouter({
    mode: 'history',
    routes,
    scrollBehavior() {
        return { x: 0, y: 0 }
    }
});


