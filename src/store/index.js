import { createStore } from 'vuex';
import initialData from './exampleData';
import * as localForage from 'localforage';
import {
    read,
    all,
    update,
    create,
} from '../services/index';
import {
    errorSavingJob,
} from '../services/errors';

import {
    ADD_JOB,
    SET_ACTIVE_JOB,
    SET_JOBS,
    ASSIGN_ERROR,
} from './mutationTypes';

import Job from '../models/Job';

localForage.config({
    name: 'job-accounting',
    driver: localForage.INDEXEDDB,
    version: 1,
    storeName: 'jobstore',
    description: 'Database of jobs.',
});

export default createStore({
    state: {
        jobs: [],
        currentJob: {
        },
        message: '',
    },
    mutations: {
        [ADD_JOB](state, job) {
            state.jobs.push(job);
        },
        [SET_JOBS](state, jobs) {
            state.jobs = jobs;
        },
        [SET_ACTIVE_JOB](state, job) {
            state.currentJob = job;
        },
        [ASSIGN_ERROR](state, err) {
            state.message = err.message;
        },
    },
    actions: {
        async initJobs({
            commit, dispatch,
        }) {
            const jobCount = await localForage.length();
            // If there are jobs in localStorage, bring those into VUEX
            if (jobCount > 0) {
                syncJobsToLocalState(commit);
            } else {
                // Use some initial data from a static file
                initialData.forEach(job => {
                    dispatch('saveJob', job);
                });
            }
        },
        async saveJob({
            commit, dispatch,
        }, newJob) {
            try {
                const job = new Job(newJob);
                const jobObj = job.toObject();
                commit(ADD_JOB, jobObj);
                create(null, jobObj);
            } catch (err) {
                dispatch('saveError', err);
            }
        },
        async updateJob({
            dispatch,
        }, newJob) {
            const job = new Job(newJob);
            job.setTimeEdited();
            const jobObj = job.toObject();

            try {
                await update(job.index, jobObj);
                dispatch('getAllJobs');
            } catch (err) {
                dispatch('saveError', err);
            }
        },
        async getAllJobs({
            commit,
        }) {
            const jobs = await all();
            jobs.map(job => new Job(job).toObject());
            commit(SET_JOBS, jobs);
        },
        async setActiveJob({
            commit,
        }, id) {
            const job = await read(id);
            commit(SET_ACTIVE_JOB, job);
        },
        saveError({
            commit,
        }, err) {
            commit(ASSIGN_ERROR, err);
            errorSavingJob(err);
        },
    },
});

function syncJobsToLocalState(commit) {
    // Get the items from localForage
    localForage.iterate(job => {
        commit(ADD_JOB, job);
    });
}
