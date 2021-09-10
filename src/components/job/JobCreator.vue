<template>
  <div id="form-container">
    <h1 v-if="error">Error!: {{ error.message }}</h1>
    <h1 v-else-if="loading">The current job is loading, please wait.</h1>
    <job-form
      @submit-form="submitJob"
      type="create"
      v-bind="futureJob"
    ></job-form>
  </div>
</template>

<script>
import JobForm from '../../components/job/presenters/JobForm';
import Job from '../../models/Job';
import {
    EXP_LEVEL_LIST,
    TECH_LIST,
} from '../../constants';
import defaults from '../../store/jobDefaults';

export default {
    components: {
        JobForm,
    },
    name: 'JobCreator',
    data() {
        return {
            experienceLevels: EXP_LEVEL_LIST,
            techList: TECH_LIST,
            futureJob: {
                ...defaults,
            },
            message: this.$store.state.message,
            loading: false,
            error: null,
        };
    },
    methods: {
        async submitJob(event) {
            const newJobData = event.formData;
            const job = new Job(newJobData);
            const index = job.getIndex();
            // Create the new job
            await this.$store.dispatch('saveJob', {
                ...newJobData,
                index,
            });

            // Refresh the whole list of jobs that has changed
            await this.$store.dispatch('getAllJobs');

            // Set the active job as the current one
            this.$store.dispatch('setActiveJob', index);

            // Navigate to the newly added job
            this.$router.push({
                name: 'job',
                params: {
                    id: index,
                },
            });
        },
        async getJobToEdit(id, cb) {
            this.loading = true;
        },
    },
};
</script>
