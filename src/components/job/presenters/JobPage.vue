<template>
  <div></div>
</template>

<script>
import jobDefaults from '../../../store/jobDefaults.js';
const EXP_LEVEL_LIST = [
    'Senior',
    'Intermediate',
    'Junior',
    'Lead',
    'Principal',
];

const TECH_LIST = [
    'TypeScript',
    'JavaScript',
    'Webpack',
    'React.js',
    'Node.js',
    'Redux',
];

function getJob(id, cb) {
    cb(null, this.$store.state.jobs[id]);
}

export default {
    name: 'JobPage',
    data() {
        return {
            ...jobDefaults,
        };
    },
    beforeRouteEnter(to, from, next) {
        next(vm => vm.setData(this.$store.state.activeJob));
    },
    beforeRouteUpdate(to, from, next) {
        this.setData(this.$store.state.activeJob);
        next();
    },
    methods: {
        setData(job) {
            this.job = {
                experienceLevels: EXP_LEVEL_LIST,
                techList: TECH_LIST,
                ...job,
            };
        },
    },
};
</script>
