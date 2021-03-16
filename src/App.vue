<template>
  <div id="app">
    <el-container>
      <JobList :jobs="jobs" />
      <el-main>
        <transition name="fade" mode="out-in">
          <router-view></router-view>
        </transition>
      </el-main>
    </el-container>
  </div>
</template>

<script>
import JobList from "./components/job/presenters/JobList.vue";
import { Table, TableColumn, Main, Container, Button } from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import { TECH_LIST, EXP_LEVEL_LIST } from "./constants";

export default {
  name: "App",
  data() {
    return {
      experienceLevels: EXP_LEVEL_LIST,
      techList: TECH_LIST,
    };
  },
  components: {
    JobList,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Main.name]: Main,
    [Container.name]: Container,
    [Button.name]: Button,
  },
  computed: {
    jobs() {
      return this.$store.state.jobs;
    },
  },
  created: function () {
    if (this.$store.state.jobs.length === 0) {
      this.$store.dispatch("initJobs");
    }
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
