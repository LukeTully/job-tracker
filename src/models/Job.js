import {
  generateIndex,
  generateTimestamp, 
} from '../utilities';
import {
  validateTitle,
  validateCompany,
  validateSalaryMin,
  validateSalaryMax,
  validateDescription,
  validateExperienceLevel,
  validateTech,
  validateApplied,
  validateInterviewCount,
  validateEasyApply,
  validateRequiresPreInterviewTest,
  validateRequiresHomework,
} from '../validators';
import {
  error, 
} from '../services/errors';
import {
  TECH_LIST,
  EXP_LEVEL_LIST, 
} from '../constants';
import defaults from '../store/jobDefaults';
import {
  required, 
} from '../utilities';

export default function (
  {
    index,
    title,
    company,
    salaryMin,
    salaryMax,
    description,
    experienceLevel,
    tech,
    applied,
    interviewCount,
    easyApply,
    requiresPreInterviewTest,
    requiresHomework,
    timeCreated,
    timeEdited,
  } = {
    title: required('title'),
    company: required('company'),
    ...defaults,
  },
) {
  this.index = index;
  this.title = title;
  this.company = company;
  this.salaryMin = salaryMin;
  this.salaryMax = salaryMax;
  this.description = description;
  this.experienceLevel = experienceLevel;
  this.tech = tech;
  this.applied = applied;
  this.interviewCount = interviewCount;
  this.easyApply = easyApply;
  this.requiresPreInterviewTest = requiresPreInterviewTest;
  this.requiresHomework = requiresHomework;
  this.timeCreated = timeCreated;
  this.timeEdited = timeEdited;

  const getIndex = () => this.index;
  const setIndex = (newTitle = null, newCompany = null) => {
    let newIndex = generateIndex(title, company);
    if (newTitle !== null && newCompany !== null) {
      newIndex = generateIndex(newTitle, newCompany);
    }
    return (this.index = newIndex);
  };

  const getTimeCreated = () => this.timeCreated;
  const setTimeCreated = () => {
    this.timeCreated = generateTimestamp();
  };

  const getTimeEdited = () => this.timeEdited;
  const setTimeEdited = () => {
    this.timeEdited = generateTimestamp();
  };

  const getTitle = () => this.title;
  const setTitle = t => {
    try {
      validateTitle(t);
      this.title = t;
    } catch (err) {
      error(err);
    }                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             
  };

  const getCompany = () => this.company;
  const setCompany = c => {
    try {
      validateCompany(c);
      this.company = c;
    } catch (err) {
      error(err);
    }
  };

  const getSalaryMin = () => this.salaryMin;
  const setSalaryMin = newSalaryMin => {
    try {
      validateSalaryMin(newSalaryMin);
      this.salaryMin = newSalaryMin;
    } catch (err) {
      error(err);
    }
  };

  const getSalaryMax = () => this.salaryMax;
  const setSalaryMax = newSalaryMax => {
    try {
      validateSalaryMax(newSalaryMax);
      this.salaryMax = newSalaryMax;
    } catch (err) {
      error(err);
    }
  };

  const getDescription = () => this.description;
  const setDescription = newDescription => {
    try {
      validateDescription(newDescription);
      this.description = newDescription;
    } catch (err) {
      error(err);
    }
  };

  const getExperienceLevel = () => this.experienceLevel;
  const setExperienceLevel = newExperienceLevel => {
    try {
      validateExperienceLevel(newExperienceLevel, EXP_LEVEL_LIST);
      this.experienceLevel = newExperienceLevel;
    } catch (err) {
      error(err);
    }
  };
  const getTech = () => this.tech;
  const setTech = newTech => {
    try {
      validateTech(newTech, TECH_LIST);
      this.tech = newTech;
    } catch (err) {
      error(err);
    }
  };
  const getApplied = () => applied;
  const setApplied = newApplied => {
    try {
      validateApplied(newApplied);
      applied = newApplied;
    } catch (err) {
      error(err);
    }
  };

  const getInterviewCount = () => interviewCount;
  const setInterviewCount = newInterviewCount => {
    try {
      validateInterviewCount(newInterviewCount);
      interviewCount = newInterviewCount;
    } catch (err) {
      error(err);
    }
  };

  const getEasyApply = () => this.easyApply;
  const setEasyApply = newEasyApply => {
    try {
      validateEasyApply(newEasyApply);
      this.easyApply = newEasyApply;
    } catch (err) {
      error(err);
    }
  };

  const getRequiresPreInterviewTest = () => this.requiresPreInterviewTest;
  const setRequiresPreInterviewTest = newRequiresPreInterviewTest => {
    try {
      validateRequiresPreInterviewTest(newRequiresPreInterviewTest);
      this.requiresPreInterviewTest = newRequiresPreInterviewTest;
    } catch (err) {
      error(err);
    }
  };

  const getRequiresHomework = () => this.requiresHomework;
  const setRequiresHomework = newRequiresHomework => {
    try {
      validateRequiresHomework(newRequiresHomework);
      this.requiresHomework = newRequiresHomework;
    } catch (err) {
      error(err);
    }
  };

  const migrate = () => {
    const schema = defaults;
    for (let key in schema) {
      if (this[key] === undefined) {
        this[key] = defaults[key];
      }
    }
  };

  const toObject = () => {
    return {
      index: this.index,
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
      timeEdited: this.timeEdited,
      timeCreated: this.timeCreated,
    };
  };

  // Patch new fields into existing jobs
  migrate();
  this.index = generateIndex(title, company);

  return {
    index,
    title,
    company,
    salaryMin,
    salaryMax,
    description,
    experienceLevel,
    tech,
    applied,
    interviewCount,
    easyApply,
    requiresPreInterviewTest,
    requiresHomework,
    timeEdited,
    timeCreated,
    getIndex,
    setIndex,
    getRequiresHomework,
    setRequiresHomework,
    toObject
  };
}
