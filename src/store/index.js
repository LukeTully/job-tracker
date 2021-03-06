import Vue from "vue";
import Vuex from "vuex";
import initialData from "./exampleData.js";
import * as localForage from "localforage";
import {
  read,
  all,
  update,
  create
} from "../services/index";
import {
  generateTimestamp
} from "../utilities";
import {error, errorSavingJob } from "../services/errors";
import Job from "../models/JobModel.js";

Vue.use(Vuex);

localForage.config({
  name: 'job-accounting',
  driver: localForage.INDEXEDDB,
  version: 1,
  storeName: 'jobstore',
  description: 'Database of jobs.'
});

export default new Vuex.Store({
  state: {
    jobs: [],
    currentJob: {},
    message: ""
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
    }
  },
  actions: {
    async initJobs({
      commit,
      dispatch
    }) {

      const jobCount = await localForage.length();
      // If there are jobs in localStorage, bring those into VUEX
      if (jobCount > 0) {
        syncJobsToLocalState(commit)
      } else {
        // Use some initial data from a static file
        // commit('setJobs', initialData);
        initialData.forEach(job => {
          dispatch('SAVE_JOB', job)
        })
      }
    },
    async SAVE_JOB({
      commit,
      state,
      dispatch
    }, newJob) {
      try {
        const job = new Job(newJob);
        job.setTimeCreated();
        commit("saveJob", job);
        create(null, job);
      } catch (err) {
        dispatch('saveError', err);
      }

    },
    async updateJob({
      commit,
      dispatch,
      state
    }, newJob) {
      const job = new Job(job);
      job.setTimeEdited();
      try {
        await update(job.index, job.toObject());
        dispatch('getAllJobs');
      } catch (err) {
        dispatch('saveError', err);
      }
    },
    async getAllJobs({
      commit
    }) {
      const jobs = await all();
      jobs.map(job => new Job(job));
      commit('setJobs', jobs);
    },
    async setActiveJob({
      commit
    }, id) {
      const job = await read(id);
      commit("activeJob", job);
    },
    saveError({ commit }, err) {
      commit('error');
      errorSavingJob(err);
    }
  },
  modules: {},
});

function syncJobsToLocalState(commit) {
  // Get the items from localForage
  localForage.iterate((job) => {
    commit('saveJob', job);
  });
}