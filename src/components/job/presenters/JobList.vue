<template>
  <el-aside>
    <router-link :to="{ name: 'newJob' }">
      <el-button>New Job</el-button>
    </router-link>
    <el-menu id="job-list" router>
      <router-link :to="{ name: 'summary' }">Overview</router-link>
      <router-link
        v-for="job in jobs"
        :key="job.index"
        :to="{ name: 'job', params: { id: job.index } }"
      >
        <job-list-item v-bind="job"></job-list-item>
      </router-link>
    </el-menu>
  </el-aside>
</template>

<script>
import {
    ElAside,
    ElMenuItem,
    ElMenu,
    ElButton,
} from 'element-plus';
import JobListItem from './JobListItem';

export default {
    name: 'JobList',
    props: {
        jobs: Array,
    },
    components: {
        [ElAside.name]: ElAside,
        [ElMenuItem.name]: ElMenuItem,
        [ElMenu.name]: ElMenu,
        [ElButton.name]: ElButton,
        JobListItem,
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.el-menu {
  height: 100%;
  margin-top: 2rem;
  padding: 1rem;
  border: 0;
}
.el-aside {
  border-right: 1px solid #ddd;
  padding-top: 1rem;
}
</style>
