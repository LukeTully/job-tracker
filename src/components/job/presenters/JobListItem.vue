<template>
  <el-menu-item :class="status">
    <span>{{ title }} ></span>
  </el-menu-item>
</template>

<script>
import { ElMenuItem } from 'element-plus';
import { jobProps } from '../../../constants';
import { computed } from 'vue';

export default {
    name: 'JobListItem',
    setup(props) {
        const status = computed(() => {
            /*
              Determine how long it's been since this job was added to our inventory,
              then use this information to style our list of jobs in the backlog
            */
            const createdDate = props.timeCreated;
            const currentDate = Date.now();
            const elapsed = currentDate - createdDate;
            const elapsedTimeInWeeks = elapsed / 6.048e8;
            if (elapsedTimeInWeeks > 1.5) {
                return 'stale';
            }
            return props.applied ? 'current applied' : 'current';
        });
        return {
            status,
        };
    },
    props: {
        ...jobProps,
    },
    components: {
        [ElMenuItem.name]: ElMenuItem,
    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.el-menu-item {
  max-width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  text-align: left;
}

.el-menu-item.current {
  color: red;
}
.current {
  color: red;
}
.current.applied {
  color: green;
}
.stale {
  color: grey;
}
</style>
