<template>
  <el-menu-item>
    {{ title }}
  </el-menu-item>
</template>

<script>
import { MenuItem } from "element-ui";
import { jobProps } from "../../../constants";

export default {
  name: "JobListItem",
  props: {
    ...jobProps
  },
  components: {
    [MenuItem.name]: MenuItem
  }
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
</style>
