import { generateIndex, generateTimestamp } from "../utilities";
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
  validateRequiresHomework
} from "../validators";
import { error } from "../services/errors";
import { TECH_LIST, EXP_LEVEL_LIST } from "../constants";

export default function({
  title = "",
  company = "",
  salaryMin = 0,
  salaryMax = 0,
  description = "",
  experienceLevel = "Senior",
  tech = [],
  applied = false,
  interviewCount = 0,
  easyApply = false,
  requiresPreInterviewTest = false,
  requiresHomework = false,
  timeCreated = null,
  timeEdited = null
}) {
  validateTitle(title);
  validateCompany(company);
  validateSalaryMin(salaryMin);
  validateSalaryMax(salaryMax);
  validateDescription(description);
  validateExperienceLevel(experienceLevel);
  validateTech(tech);
  validateApplied(applied);
  validateInterviewCount(interviewCount);
  validateEasyApply(easyApply);
  validateRequiresPreInterviewTest(requiresPreInterviewTest);
  validateRequiresHomework(requiresHomework);

  const getIndex = () => index;
  const setIndex = (newTitle = null, newCompany = null) => {
    if (newTitle !== null && newCompany !== null) {
      index = generateIndex(newTitle, newCompany);
      return index;
    }

    // No extra validation needed here, since the index is generated here.
    // Default to generating index with current data
    index = generateIndex(title, company);
    return index;
  };

  const getTimeCreated = () => timeCreated;
  const setTimeCreated = () => {
    timeCreated = generateTimestamp();
  };

  const getTimeEdited = () => timeEdited;
  const setTimeEdited = () => {
    timeEdited = generateTimestamp();
  };

  const getTitle = () => title;
  const setTitle = t => {
    try {
      validateTitle(t);
      title = t;
    } catch (err) {
      error(err);
    }
  };

  const getCompany = () => company;
  const setCompany = c => {
    try {
      validateCompany(c);
      company = c;
    } catch (err) {
      error(err);
    }
  };

  const getSalaryMin = () => salaryMin;
  const setSalaryMin = newSalaryMin => {
    try {
      validateSalaryMin(newSalaryMin);
      salaryMin = newSalaryMin;
    } catch (err) {
      error(err);
    }
  };

  const getSalaryMax = () => salaryMax;
  const setSalaryMax = newSalaryMax => {
    try {
      validateSalaryMax(newSalaryMax);
      salaryMax = newSalaryMax;
    } catch (err) {
      error(err);
    }
  };

  const getDescription = () => description;
  const setDescription = newDescription => {
    try {
      validateDescription(newDescription);
      description = newDescription;
    } catch (err) {
      error(err);
    }
  };

  const getExperienceLevel = () => experienceLevel;
  const setExperienceLevel = newExperienceLevel => {
    try {
      validateExperienceLevel(newExperienceLevel, EXP_LEVEL_LIST);
      experienceLevel = newExperienceLevel;
    } catch (err) {
      error(err);
    }
  };
  const getTech = () => tech;
  const setTech = newTech => {
    try {
      validateTech(newTech, TECH_LIST);
      tech = newTech;
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

  const getEasyApply = () => easyApply;
  const setEasyApply = newEasyApply => {
    try {
      validateEasyApply(newEasyApply);
      easyApply = newEasyApply;
    } catch (err) {
      error(err);
    }
  };

  const getRequiresPreInterviewTest = () => requiresPreInterviewTest;
  const setRequiresPreInterviewTest = newRequiresPreInterviewTest => {
    try {
      validateRequiresPreInterviewTest(newRequiresPreInterviewTest);
      requiresPreInterviewTest = newRequiresPreInterviewTest;
    } catch (err) {
      error(err);
    }
  };

  const getRequiresHomework = () => requiresHomework;
  const setRequiresHomework = newRequiresHomework => {
    try {
      validateRequiresHomework(newRequiresHomework);
      requiresHomework = newRequiresHomework;
    } catch (err) {
      error(err);
    }
  };

  const toObject = () => {
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
      timeCreated;
  };

  index = generateIndex(title, company);

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
