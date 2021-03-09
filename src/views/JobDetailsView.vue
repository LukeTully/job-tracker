<template>
  <div>
    <router-link :to="{ name: 'editJob', params: { ...job } }">
      <el-button>Edit this job</el-button>
    </router-link>
    <div id="details-container" v-if="loaded">
      <h2>{{ job.title }} at {{ job.company }}</h2>
      <pre class="job-desc">{{ job.description }}</pre>
      <el-tag v-for="tag in job.tech" :key="tag">
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
import jobDefaults from "../store/jobDefaults.js";
import store from "../store/index.js";
import { Button, Table, TableColumn, Main, Tag } from "element-ui";
import { jobPropLabels } from "../constants";

const EXP_LEVEL_LIST = [
  "Senior",
  "Intermediate",
  "Junior",
  "Lead",
  "Principal"
];

const TECH_LIST = [
  "TypeScript",
  "JavaScript",
  "Webpack",
  "React.js",
  "Node.js",
  "Redux"
];

function getJob(id, cb) {
  cb(null, store.state.jobs[id]);
}

export default {
  name: "JobDetailsView",
  data() {
    return {
      job: jobDefaults,
      loaded: false
    };
  },
  computed: {
    stats() {
      const tableKeys = [
        "salaryMin",
        "salaryMax",
        "experienceLevel",
        "applied"
      ];
      const table = [];

      tableKeys.forEach(tableKey => {
        if (this.job[tableKey] != undefined) {
          table.push({
            attribute: jobPropLabels[tableKey],
            val: this.job[tableKey]
          });
        }
      });

      return table;
    }
  },
  created() {
    this.setData(this.$store.state.currentJob);
  },
  beforeRouteEnter(to, from, next) {
    next(async vm => {
      await store.dispatch("setActiveJob", to.params.id);
      vm.setData({ ...store.state.currentJob });
    });
  },
  beforeRouteUpdate(to, from, next) {
    store.dispatch("setActiveJob", to.params.id).then(() => {
      this.setData(this.$store.state.currentJob);
      next();
    });
    // handle the error here
  },
  components: {
    [Button.name]: Button,
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Main.name]: Main,
    [Tag.name]: Tag
  },
  methods: {
    setData(job) {
      this.job = {
        experienceLevels: EXP_LEVEL_LIST,
        techList: TECH_LIST,
        ...job
      };
      this.loaded = true;
    }
  }
};
</script>
<style>
.job-desc {
  text-align: left;
  white-space: pre-line;
  font-family: Georgia, "Times New Roman", Times, serif;
}
</style>
