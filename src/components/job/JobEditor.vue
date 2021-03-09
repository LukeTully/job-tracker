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
import JobForm from "../components/JobForm";
import { TECH_LIST, EXP_LEVEL_LIST } from "../../constants";

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
  },
  methods: {
    async submitJob(event) {
      const oldJobData = this.futureJob;
      const newJob = new Job(event.formData);

      // The update service needs the old key to update the same item in localstorage
      const oldIndex = newJob.setIndex(oldJobData.name, oldJobData.company);
      await this.$store.dispatch("updateJob", newJob.toObject());

      const newIndex = newJob.setIndex(); // Generate index with the new form data that was used to generate the job

      if (oldIndex != newIndex) {
        this.$router.push({ name: "job", params: { id: newIndex } }); // Navigate to the new url
      }
    },
    async getJobToEdit(id, cb) {
      this.loading = true;
    },
  },
};
</script>
