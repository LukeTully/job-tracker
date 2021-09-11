<template>
  <el-form
    :model="form"
    :rules="formRules"
    ref="jobFormRef"
    :label-position="labelPosition"
    label-width="200px"
  >
    <h2>{{ form.title }}</h2>
    <el-form-item label="Job Title" prop="title">
      <el-input name="title" type="text" v-model="form.title" />
    </el-form-item>

    <el-form-item label="Company" prop="company">
      <el-input type="text" v-model="form.company" />
    </el-form-item>
    <el-form-item label="Salary Range">
      <el-col :span="11">
        <el-form-item prop="salaryMin">
          <el-input-number
          v-model.number="form.salaryMin"
          :step="10000"
          :min="0"
          :max="form.salaryMax"
        ></el-input-number>
        </el-form-item>
      </el-col>
      <el-col :span="2"
        >&nbsp;&nbsp;&nbsp;&nbsp;-&nbsp;&nbsp;&nbsp;&nbsp;</el-col
      >
      <el-col :span="11">
        <el-form-item prop="salaryMax">
          <el-input-number
          v-model.number="form.salaryMax"
          :step="10000"
          :min="form.salaryMin"
        ></el-input-number>
        </el-form-item>
      </el-col>
    </el-form-item>
    <el-form-item label="Description" prop="description">
      <el-input type="textarea" v-model="form.description"></el-input>
    </el-form-item>
    <el-form-item label="Tech Experience" prop="experienceLevel">
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
        v-model.number="form.interviewCount"
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
    ElInput,
    ElInputNumber,
    ElFormItem,
    ElForm,
    ElSelect,
    ElOption,
    ElButton,
    ElCol,
    ElSwitch,
    ElProgress,
} from 'element-plus';

import {
    ref,
    reactive,
    computed,
} from 'vue';

export default {
    name: 'JobForm',
    setup(props, {
        emit, 
    }) {
        const form = reactive({
            title: props.title,
            company: props.company,
            salaryMin: props.salaryMin,
            salaryMax: props.salaryMax,
            description: props.description,
            experienceLevel: props.experienceLevel,
            tech: props.tech,
            applied: props.applied,
            interviewCount: props.interviewCount,
            easyApply: props.easyApply,
            requiresPreInterviewTest: props.requiresPreInterviewTest,
            requiresHomework: props.requiresHomework,
        });

        const jobFormRef = ref();

        /* Default form select element value initializers */
        const experienceLevels = ref(EXP_LEVEL_LIST);
        const techList = ref(TECH_LIST);
        const labelPosition = ref('left');

        /* Computer properties */
        const formType = computed(() => {
            if (props.type === 'edit') {
                return 'Update';
            }
            return 'Create';
        });

        const handleSubmit = (event) => {
            if (typeof event.preventDefault === 'function') {
                event.preventDefault();
            }
            emit('submit-form', {
                formData: {
                    ...form,
                },
            });
        };

        const formRules = ref({
            title: [
                { required: true, message: 'Please input a title for this job', trigger: 'blur' },
                { min: 1, max: 150, message: 'Length should be 1 to 150', trigger: 'blur' },
            ],
            company: [
                { required: true, message: 'Please enter the company name that posted this job.', trigger: 'change' },
            ],
            salaryMin: [
                { type: 'number', message: 'Please enter a number that represents the lower salary range for this job, if one was indicated.', trigger: 'blur' },
            ],
            salaryMax: [
                { type: 'date', message: 'Please enter a number that represents the upper salary range for this job, if one was indicated.', trigger: 'blur' },
            ],
            description: [
                { required: true, message: 'Add the body of the job posting here.', trigger: 'blur' },
            ],
            experienceLevel: [
                { type: 'array', required: true, message: 'Select a technical skill level that applies to this job', trigger: 'blur' },
            ],
        });

        return {
            form,
            formRules,
            jobFormRef,
            experienceLevels,
            techList,
            labelPosition,
            formType,
            handleSubmit,
        };
    },
    components: {
        [ElInput.name]: ElInput,
        [ElFormItem.name]: ElFormItem,
        [ElForm.name]: ElForm,
        [ElSelect.name]: ElSelect,
        [ElOption.name]: ElOption,
        [ElButton.name]: ElButton,
        [ElCol.name]: ElCol,
        [ElInputNumber.name]: ElInputNumber,
        [ElSwitch.name]: ElSwitch,
        [ElProgress.name]: ElProgress,
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
