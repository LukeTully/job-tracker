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
import store from "../../store/index.js";
import JobForm from "./presenters/JobForm";
import { TECH_LIST, EXP_LEVEL_LIST } from "../../constants";
import Job from "../../models/Job";

export default {
  components: { JobForm },
  name: "JobEditor",
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
      // Activate the new job
      await store.dispatch("setActiveJob", to.params.id);

      // Set the new current job in local state
      vm.setJobData();
    });
  },
  beforeRouteUpdate(to, from, next) {
    store.dispatch("setActiveJob", to.params.id).then(() => {
      this.setJobData();
      next();
    });
  },
  methods: {
    async submitJob(event) {
      const oldJobData = this.futureJob;
      const newJob = new Job(event.formData);

      // The update service needs the old key to update the same item in localstorage
      const oldIndex = newJob.setIndex(oldJobData.name, oldJobData.company);
      await this.$store.dispatch("updateJob", newJob.toObject());

      const newIndex = newJob.setIndex(); // Generate index with the new form data that was used to generate the job

      this.$router.push({ name: "job", params: { id: newIndex } }); // Navigate to the new url
    },
    setJobData(job) {
      this.futureJob = { ...store.state.currentJob };
    },
    async getJobToEdit(id, cb) {
      this.loading = true;
    },
  },
};
</script>
