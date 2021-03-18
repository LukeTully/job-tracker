<template>
  <el-menu-item :class="status">
    <span>{{ title }} ></span>
  </el-menu-item>
</template>

<script>
import { MenuItem } from 'element-ui';
import { jobProps } from '../../../constants';

export default {
  name: 'JobListItem',
  props: {
    ...jobProps,
  },
  computed: {
    status() {
      const createdDate = this.timeCreated;
      const currentDate = Date.now();
      const elapsed = currentDate - createdDate;
      const timeInWeeks = elapsed / 6.048e8;
      if (timeInWeeks > 1.5) {
        return 'stale';
      }
      return this.applied ? 'current applied' : 'current';
    },
  },
  components: {
    [MenuItem.name]: MenuItem,
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
