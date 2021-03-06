<template>
  <div id="form-container">
    <h1 v-if="error">Error!: {{ error.message }}</h1>
    <h1 v-else-if="loading">The current job is loading, please wait.</h1>
    <job-form @submit-form="submitJob" type="create"></job-form>
  </div>
</template>

<script>
import jobDefaults from "../store/jobDefaults";
import store from "../store/index.js";
import JobForm from "../components/JobForm";
import { generateIndex } from "../utilities";

const EXP_LEVEL_LIST = [
  "Senior",
  "Intermediate",
  "Junior",
  "Lead",
  "Principal",
];

const TECH_LIST = [
  "TypeScript",
  "JavaScript",
  "Webpack",
  "React.js",
  "Node.js",
  "Redux",
];

export default {
  components: { JobForm },
  name: "JobCreate",
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
  methods: {
    async submitJob(event) {
      const newIndex = generateIndex(
        event.formData.title,
        event.formData.company
      );
      await this.$store.dispatch("SAVE_JOB", {
        ...event.formData,
        index: newIndex,
      });
      await this.$store.dispatch("getAllJobs");
      this.$router.push({ name: "job", params: { id: newIndex } });
    },
    async getJobToEdit(id, cb) {
      this.loading = true;
    },
  },
};
</script>