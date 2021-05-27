<template>
  <el-form :model="form" ref="form" label-position="left" label-width="240px">
    <el-form-item label="Job Title">
      <el-input name="title" type="text" v-model="form.title" />
    </el-form-item>
    <el-form-item label="Company">
      <el-input type="text" v-model="form.company" />
    </el-form-item>
    <el-form-item label="Salary Range">
      <el-col :span="11">
        <el-input-number
          v-model="form.salaryMin"
          :step="10000"
          :min="0"
          :max="form.salaryMax"
        ></el-input-number>
      </el-col>
      <el-col :span="2"> - </el-col>
      <el-col :span="11">
        <el-input-number
          v-model="form.salaryMax"
          :step="10000"
          :min="form.salaryMin"
        ></el-input-number>
      </el-col>
    </el-form-item>
    <el-form-item label="Description">
      <el-input type="textarea" v-model="form.description"></el-input>
    </el-form-item>
    <el-form-item label="Tech Experience">
      <el-select
        placeholder="Select level"
        v-model="form.experienceLevel"
        allow-create
        filterable
      >
        <el-option
          v-for="(option, index) in experienceLevels"
          :value="option"
          :key="index"
          :label="option"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="Technical Skills">
      <el-select
        placeholder="Select skills"
        v-model="form.tech"
        multiple
        allow-create
        filterable
      >
        <el-option
          v-for="option in techList"
          :value="option"
          :key="option"
          :label="option"
        >
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item label="Interview Count">
      <el-input-number
        v-model="form.interviewCount"
        :step="1"
        :min="0"
        :max="form.salaryMax"
      ></el-input-number>
    </el-form-item>
    <el-form-item label="Applied or not?">
      <el-switch v-model="form.applied"></el-switch>
    </el-form-item>
    <el-form-item label="Easy Apply Available?">
      <el-switch v-model="form.easyApply"></el-switch>
    </el-form-item>
    <el-form-item label="Requires pre-interview test">
      <el-switch v-model="form.requiresPreInterviewTest"></el-switch>
    </el-form-item>
    <el-form-item label="Requires homework?">
      <el-switch v-model="form.requiresHomework"></el-switch>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="handleSubmit" native-type="submit">{{
        formType
      }}</el-button>
      <el-button>Cancel</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import {
  jobProps,
  EXP_LEVEL_LIST,
  TECH_LIST,
} from '../../../constants';
import {
  Input,
  InputNumber,
  FormItem,
  Form,
  Select,
  Option,
  Button,
  Col,
  Switch,
  Progress,
} from 'element-ui';

export default {
  name: 'JobForm',
  data() {
    return {
      experienceLevels: EXP_LEVEL_LIST,
      techList: TECH_LIST,
      form: {
        title: this.title,
        company: this.company,
        salaryMin: this.salaryMin,
        salaryMax: this.salaryMax,
        description: this.description,
        experienceLevel: this.experienceLevel,
        tech: this.tech,
        applied: this.applied,
        interviewCount: this.interviewCount,
        easyApply: this.easyApply,
        requiresPreInterviewTest: this.requiresPreInterviewTest,
        requiresHomework: this.requiresHomework,
      },
      labelPosition: 'left',
    };
  },
  computed: {
    formType() {
      if (this.type === 'edit') {
        return 'Update';
      }
      return 'Create';
    },
  },
  components: {
    [Input.name]: Input,
    [FormItem.name]: FormItem,
    [Form.name]: Form,
    [Select.name]: Select,
    [Option.name]: Option,
    [Button.name]: Button,
    [Col.name]: Col,
    [InputNumber.name]: InputNumber,
    [Switch.name]: Switch,
    [Progress.name]: Progress,
  },
  props: {
    salaryMin: {
      type: Number,
      default: 0,
    },
    salaryMax: {
      type: Number,
      default: 100000,
    },
    type: {
      validator: function (value) {
        const options = ['create', 'edit'];
        // The value must match one of these strings
        return options.indexOf(value) !== -1;
      },
    },
    ...jobProps,
  },
  methods: {
    handleSubmit(event) {
      if (typeof event.preventDefault === 'function') {
        event.preventDefault();
      }
      this.$emit('submit-form', {
        formData: {
          ...this.form,
        },
      });
    },
  },
};
</script>

<style scoped>
.el-select {
  float: left;
}
.el-button {
  float: left;
}
.el-form-item {
  max-width: 45rem;
}
</style>
