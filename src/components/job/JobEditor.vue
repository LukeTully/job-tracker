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
import store from '../../store/index.js';
import JobForm from './presenters/JobForm';
import {
    TECH_LIST,
    EXP_LEVEL_LIST, 
} from '../../constants';
import Job from '../../models/Job';

import { watch, ref, reactive, computed } from 'vue';
import { useRoute, onBeforeRouteUpdate, useRouter } from 'vue-router';
import { useStore } from 'vuex';

export default {
    components: {
        JobForm, 
    },
    name: 'JobEditor',
    setup () {

        const store = useStore();
        const router = useRouter();
        
        const experienceLevels = ref(EXP_LEVEL_LIST);
        const techList = ref(TECH_LIST);
        const futureJob = reactive({});
        const message = computed(() => store.state.message);
        const loading = ref(false);
        const error = ref(null);

        onBeforeRouteUpdate((to, next) => {
            store.dispatch('setActiveJob', to.params.id).then(() => {
                setJobData();
                next();
            });
        });
    
        function setJobData () {
            Object.assign(futureJob, store.state.currentJob);
        }

        async function submitJob(event) {
            const oldJobData = futureJob;
            const newJob = new Job(event.formData);

            // The update service needs the old key to update the same item in localstorage
            const oldIndex = newJob.getIndex();
            newJob.setIndex(oldJobData.name, oldJobData.company);
            await store.dispatch('updateJob', newJob.toObject());

            const newIndex = newJob.setIndex(); // Generate index with the new form data that was used to generate the job

            router.push({
                name: 'job',
                params: {
                    id: newIndex, 
                }, 
            }); // Navigate to the new url
        }
        
        async function getJobToEdit(id, cb) {
            loading.value = true;
        }

        return {
            experienceLevels,
            techList,
            futureJob,
            message,
            loading,
            error,
            setJobData,
            submitJob,
            getJobToEdit,
        };
    },
    props: {
        formData: {
            type: Object,
        },
        id: {
            type: String,
            default: '',
        },
    },
    beforeRouteEnter(to, from, next) {
        next(async (vm) => {
            // Activate the new job
            await store.dispatch('setActiveJob', to.params.id);

            // Set the new current job in local state
            vm.setJobData();
        });
    },
};
</script>
