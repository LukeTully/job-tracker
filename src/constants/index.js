export const jobPropLabels = {
  title: 'Title',
  company: 'Company',
  salaryMin: 'Minimum Salary',
  salaryMax: 'Maximum Salary',
  description: 'Description',
  experienceLevel: 'Experience Level',
  tech: 'Technology',
  applied: 'Applied?',
  interviewCount: 'Number of Interviews',
  easyApply: 'Easy Apply Available?',
  requiresPreInterviewTest: 'Requires Pre-interview test',
  requiresHomework: 'Requires homework',
};

export const jobProps = {
  title: String,
  company: String,
  salaryMin: Number,
  salaryMax: Number,
  description: String,
  experienceLevel: String,
  tech: Array,
  applied: Boolean,
  interviewCount: Number,
  easyApply: Boolean,
  requiresPreInterviewTest: Boolean,
  requiresHomework: Boolean,
};

export const EXP_LEVEL_LIST = [
  'Senior',
  'Intermediate',
  'Junior',
  'Lead',
  'Principal',
];

export const TECH_LIST = [
  'TypeScript',
  'JavaScript',
  'Webpack',
  'React.js',
  'Node.js',
  'Redux',
];
