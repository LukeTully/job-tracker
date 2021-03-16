import Vue from "vue";
import Vuex from "vuex";
import VueRouter from "vue-router";
import App from "./App.vue";
import store from "./store";
import JobDetailsView from "./views/JobDetailsView.vue";
import JobEditor from "./components/job/JobEditor.vue";
import JobCreator from "./components/job/JobCreator.vue"
import Summary from "./views/SummaryView.vue";

Vue.config.productionTip = false;

Vue.use(VueRouter);

const routes = [
  { name: "newJob", path: "/job/new", component: JobCreator, props: true },
  { name: "job", path: "/job/:id", component: JobDetailsView, props: true },
  { name: "editJob", path: "/job/:id/edit", component: JobEditor, props: true },
  { name: "summary", path: "/summary", component: Summary, props: true }
];

const router = new VueRouter({
  routes // short for `routes: routes`
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
