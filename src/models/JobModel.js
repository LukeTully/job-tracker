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

    
    set index(title, company) {
        // No extra validation needed here, since the index is generated here.
        this.index = generateIndex(title, company);
    }

    get timeCreated() {
        return this.timeCreated;
    }

    set timeCreated(newTime) {
        this.timeCreated = generateTimestamp();
    }

    get timeEdited() {
        return this.timeEdited;
    }
    set timeEdited(newTime) {
        this.timeEdited = generateTimestamp();
    }

    get title() {
        return this.title;
    }
    set title(title) {
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
    set company(company) {
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
    set salaryMin(salaryMin) {
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
    set salaryMax(salaryMax) {
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
    set description(description) {
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
    set experienceLevel(experienceLevel) {
        try {
            validateExperienceLevel(experienceLevel, EXP_LEVEL_LIST);
        } catch (err) {
            this.experienceLevel = experienceLevel;
        }
    }
    get tech() {
        return this.tech;
    }
    set tech(tech) {
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
    set applied(applied) {
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
    set interviewCount(interviewCount) {
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
    set easyApply(easyApply) {
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
    set requiresPreInterviewTest(requiresPreInterviewTest) {
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
    set requiresHomework(requiresHomework) {
        try {
            validateRequiresHomework(requiresHomework);
            this.requiresHomework = requiresHomework;
        } catch (err) {
            error(err);
        }
    }
}