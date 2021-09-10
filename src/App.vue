<template>
  <div id="app">
    <el-container>
      <JobList :jobs="jobs"></JobList>
      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import JobList from './components/job/presenters/JobList.vue';
import {
    ElTable,
    ElTableColumn,
    ElMain,
    ElContainer,
    ElButton,
} from 'element-plus';
import 'element-plus/lib/theme-chalk/index.css';
import {
    TECH_LIST,
    EXP_LEVEL_LIST,
} from './constants';
import { ref } from '@vue/reactivity';
import { computed } from '@vue/runtime-core';
import { useStore } from 'vuex';

export default {
    name: 'App',
    setup() {
        const experienceLevels = ref(EXP_LEVEL_LIST);
        const techList = ref(TECH_LIST);
        const store = useStore();
        const jobs = computed(() => {
            return store.state.jobs;
        });

        /* Initialize the jobs in our global store if none have been loaded yet */
        if (store.state.jobs.length === 0) {
            store.dispatch('initJobs');
        }

        return {
            experienceLevels,
            techList,
            jobs,
        };
    },
    components: {
        JobList,
        [ElTable.name]: ElTable,
        [ElTableColumn.name]: ElTableColumn,
        [ElMain.name]: ElMain,
        [ElContainer.name]: ElContainer,
        [ElButton.name]: ElButton,
    },
};
</script>

<style lang="scss" scoped>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
.el-container {
  position: absolute;
  height: 100%;
  width: 100%;
}
.el-main {
  padding-left: 2rem;
  padding-right: 2rem;
}
body {
  margin: 0;
  padding: 0;
}
</style>
