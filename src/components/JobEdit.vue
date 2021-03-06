<template>
  <div id="form-container">
    <h1 v-if="error">Error!: {{ error.message }}</h1>
    <h1 v-else-if="loading">The current job is loading, please wait.</h1>
    <job-form
      v-bind="futureJob"
      v-if="futureJob.title"
      @submit-form="submitJob"
      type="edit"
    ></job-form>
  </div>
</template>

<script>
import jobDefaults from "../store/jobDefaults";
import store from "../store/index.js";
import JobForm from "../components/JobForm";
import { generateIndex } from "../utilities";
import { TECH_LIST, EXP_LEVEL_LIST } from "../constants";

export default {
  components: { JobForm },
  name: "JobEdit",
  data() {
    return {
      experienceLevels: EXP_LEVEL_LIST,
      techList: TECH_LIST,
      futureJob: {},
      message: this.$store.state.message,
      loading: false,
      error: null,
    };
  },
  props: ["formData", "id"],
  beforeRouteEnter(to, from, next) {
    next(async (vm) => {
      await store.dispatch("setActiveJob", to.params.id);
      vm.futureJob = { ...store.state.currentJob };
    });
  },
  beforeRouteUpdate(to, from, next) {
    store.dispatch("setActiveJob", to.params.id).then(() => {
      this.futureJob = this.$store.state.currentJob;
      next();
    });
    // handle the error here
  },
  methods: {
    async submitJob(event) {
      const oldIndex = this.futureJob.index;
      const newJobData = { ...event.formData, index: oldIndex };
      await this.$store.dispatch("updateJob", newJobData);

      const newIndex = generateIndex(newJobData.title, newJobData.company);
      this.$router.push({ name: "job", params: { id: newIndex } });
    },
    async getJobToEdit(id, cb) {
      this.loading = true;
    },
  },
};
</script>
// props: [
//     "index",
//     "title",
//     "company",
//     "salaryMin",
//     "salaryMax",
//     "description",
//     "experienceLevel",
//     "tech"
//   ],