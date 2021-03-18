import Vue from 'vue';
import Vuex from 'vuex';
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
  asdas,
} from '../services/errors';
import Job from '../models/Job';

Vue.use(Vuex);

localForage.config({
  name: 'job-accounting',
  driver: localForage.INDEXEDDB,
  version: 1,
  storeName: 'jobstore',
  description: 'Database of jobs.',
});

export default new Vuex.Store({
  state: {
    jobs: [],
    currentJob: {
    },
    message: '',
  },
  mutations: {
    saveJob(state, job) {
      state.jobs.push(job);
    },
    setJobs(state, jobs) {
      state.jobs = jobs;
    },
    activeJob(state, job) {
      state.currentJob = job;
    },
    error(state, err) {
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
        // commit('setJobs', initialData);
        initialData.forEach(job => {
          dispatch('SAVE_JOB', job);
        });
      }
    },
    async SAVE_JOB({
      commit, dispatch, 
    }, newJob) {
      try {
        const job = new Job(newJob);
        const jobObj = job.toObject();
        commit('saveJob', jobObj);
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
      commit('setJobs', jobs);
    },
    async setActiveJob({
      commit, 
    }, id) {
      const job = await read(id);
      commit('activeJob', job);
    },
    saveError({
      commit, 
    }, err) {
      commit('error', err);
      errorSavingJob(err);
    },
  },
  modules: {
  },
});

function syncJobsToLocalState(commit) {
  // Get the items from localForage
  localForage.iterate(job => {
    commit('saveJob', job);
  });
}
