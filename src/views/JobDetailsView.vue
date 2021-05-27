<template>
  <div>
    <router-link :to="{ name: 'editJob', params: { ...job } }">
      <el-button>Edit this job</el-button>
    </router-link>
    <div id="details-container" v-if="loaded">
      <h2>{{ job.title }} at {{ job.company }}</h2>
      <pre class="job-desc">{{ job.description }}</pre>
      <el-tag v-for="tag in job.tech" :key="tag" disable-transitions>
        {{ tag }}
      </el-tag>
      <el-table :data="stats" style="width: 50%">
        <el-table-column prop="attribute" label="Attribute"></el-table-column>
        <el-table-column prop="val" label="Value"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<style scoped>
.el-tag {
  margin-right: 1em;
}
</style>
<script>
import jobDefaults from '../store/jobDefaults.js';
import store from '../store/index.js';
import {
  Button,
  Table,
  TableColumn,
  Main,
  Tag,
  Progress,
} from 'element-ui';
import {
  jobPropLabels,
  EXP_LEVEL_LIST,
  TECH_LIST,
} from '../constants';

export default {
  name: 'JobDetailsView',
  data() {
    return {
      job: jobDefaults,
      loaded: false,
    };
  },
  computed: {
    stats() {
      const tableKeys = [
        'salaryMin',
        'salaryMax',
        'experienceLevel',
        'applied',
        'interviewCount',
        'easyApply',
        'requiresPreInterviewTest',
        'requiresHomework',
        'timeCreated',
        'timeEdited',
      ];
      const table = [];
      tableKeys.forEach((tableKey) => {
        if (this.job[tableKey] != undefined) {
          table.push({
            attribute: jobPropLabels[tableKey],
            val: this.job[tableKey].toString(),
          });
        }
      });
      return table;
    },
    percentageComplete() {
      const {
        applied,
      } = this.job;
      if (applied) {
        return 100;
      }
      return 0;
    },
  },
  created() {
    this.setData(this.$store.state.currentJob);
  },
  beforeRouteEnter(to, from, next) {
    next(async (vm) => {
      await store.dispatch('setActiveJob', to.params.id);
      vm.setData({
        ...store.state.currentJob,
      });
    });
  },
  beforeRouteUpdate(to, from, next) {
    store.dispatch('setActiveJob', to.params.id).then(() => {
      this.setData(this.$store.state.currentJob);
      next();
    }); // handle the error here
  },
  watch: {
    job() {
      const duration = 0.2; // In seconds
      this.loaded = false;
      window.setTimeout(() => {
        this.loaded = true;
      }, duration * 1000);
    },
  },
  components: {
    [Button.name]: Button,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Main.name]: Main,
    [Tag.name]: Tag,
    [Progress.name]: Progress,
  },
  methods: {
    setData(job) {
      this.job = {
        experienceLevels: EXP_LEVEL_LIST,
        techList: TECH_LIST,
        ...job,
      };
      this.loaded = true;
    },
  },
};
</script>
<style>
.job-desc {
  text-align: left;
  white-space: pre-line;
  font-family: Georgia, "Times New Roman", Times, serif;
}
</style>
