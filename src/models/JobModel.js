import {
    generateIndex, generateTimestamp
} from "../utilities";
import {
    validateIndex,
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
import {
    error
} from "../services/errors";
import {
    TECH_LIST,
    EXP_LEVEL_LIST
} from "../constants";

export default class Job {
    constructor({
        index = 0,
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
        this.timeEdited = timeEdited;
        this.timeCreated = timeCreated;
    }
    get index() {
        return this.index;
    }

    
    setIndex(title, company) {
        // No extra validation needed here, since the index is generated here.
        this.index = generateIndex(title, company);
    }

    get timeCreated() {
        return this.timeCreated;
    }

    setTimeCreated(newTime) {
        this.timeCreated = generateTimestamp();
    }

    get timeEdited() {
        return this.timeEdited;
    }
    setTimeEdited(newTime) {
        this.timeEdited = generateTimestamp();
    }

    get title() {
        return this.title;
    }
    setTitle(title) {
        try {
            validateTitle(title);
            this.title = title;
        } catch (err) {
            error(err);
        }
    }
    get company() {
        return this.company;
    }
    setCompany(company) {
        try {
            validateCompany(company);
            this.company = company;
        } catch (err) {
            error(err);
        }
    }
    get salaryMin() {
        return this.salaryMin;
    }
    setSalaryMin(salaryMin) {
        try {
            validateSalaryMin(salaryMin);
            this.salaryMin = salaryMin;
        } catch (err) {
            error(err);
        }
    }
    get salaryMax() {
        return this.salaryMax;
    }
    setSalaryMax(salaryMax) {
        try {
            validateSalaryMax(salaryMax);
            this.salaryMax = salaryMax;
        } catch (err) {
            error(err);
        }
    }
    get description(description) {
        return description;
    }
    setDescription(description) {
        try {
            validateDescription(description);
            this.description = description;
        } catch (err) {
            error(err);
        }

    }
    get experienceLevel() {
        return this.experienceLevel;
    }
    setExperienceLevel(experienceLevel) {
        try {
            validateExperienceLevel(experienceLevel, EXP_LEVEL_LIST);
        } catch (err) {
            this.experienceLevel = experienceLevel;
        }
    }
    get tech() {
        return this.tech;
    }
    setTech(tech) {
        try {
            validateTech(tech, TECH_LIST);
            this.tech = tech;
        } catch (err) {
            error(err);
        }
    }
    get applied() {
        return this.applied;
    }
    setApplied(applied) {
        try {
            validateApplied(applied);
            this.applied = applied;
        } catch (err) {
            error(err);
        }
    }
    get interviewCount() {
        return this.interviewCount;
    }
    setInterviewCount(interviewCount) {
        try {
            validateInterviewCount(interviewCount);
            this.interviewCount = interviewCount;
        } catch (err) {
            error(err);
        }
    }
    get easyApply() {
        return this.easyApply;
    }
    setEasyApply(easyApply) {
        try {
            validateEasyApply(easyApply);
            this.easyApply = easyApply;
        } catch (err) {
            error(err);
        }
    }
    get requiresPreInterviewTest() {
        return this.requiresPreInterviewTest;
    }
    setRequiresPreInterviewTest(requiresPreInterviewTest) {
        try {
            validateRequiresPreInterviewTest(requiresPreInterviewTest);
            this.requiresPreInterviewTest = requiresPreInterviewTest;
        } catch (err) {
            error(err);
        }
    }
    get requiresHomework() {
        return this.requiresHomework;
    }
    setRequiresHomework(requiresHomework) {
        try {
            validateRequiresHomework(requiresHomework);
            this.requiresHomework = requiresHomework;
        } catch (err) {
            error(err);
        }
    }
    toObject() {
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
        }
    }
}