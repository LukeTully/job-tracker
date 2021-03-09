<template>
  <el-main>
    <div>
      <el-table :data="jobList" style="width: 100%">
        <el-table-column
          prop="title"
          label="Title"
          width="180"
        ></el-table-column>
        <el-table-column
          prop="company"
          label="Company"
          width="180"
        ></el-table-column>
        <el-table-column prop="salaryMax" label="Max Salary"></el-table-column>
      </el-table>
    </div>
  </el-main>
</template>

<script>
import { Table, TableColumn, Main } from "element-ui";

export default {
  name: "Summary",
  computed: {
    jobList() {
      console.log(this.$store.state.jobs.length);
      return this.$store.state.jobs;
    }
  },
  components: {
    [Table.name]: Table,
    [TableColumn.name]: TableColumn,
    [Main.name]: Main
  }
};
</script>
