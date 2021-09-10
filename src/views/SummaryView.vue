<template>
  <div>
    <el-table :data="jobs" style="width: 100%">
      <el-table-column prop="title" label="Title" width="180"></el-table-column>
      <el-table-column
        prop="company"
        label="Company"
        width="180"
      ></el-table-column>
      <el-table-column prop="salaryMax" label="Max Salary"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import {
    ElTable,
    ElTableColumn,
    ElMain,
} from 'element-plus';

export default {
    name: 'Summary',
    computed: {
        jobs() {
            return this.$store.state.jobs;
        },
    },
    components: {
        [ElTable.name]: ElTable,
        [ElTableColumn.name]: ElTableColumn,
        [ElMain.name]: ElMain,
    },
};
</script>
