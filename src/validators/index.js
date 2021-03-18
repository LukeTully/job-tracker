export function validateTitle(title) {
    const min = 1;
    const max = 150;
    // Ensure a range of characters
    if (title.length > max) {
        throw new Error(`Title contained more than ${max} characters`);
    }
    if (title.length < min) {
        throw new Error(`Title contained less than ${min} characters`);
    }
    return true;
}
export function validateApplied(applied) {
    if (!validateBoolean(applied)) {
        throw new Error(`Applied was not true/false`);
    }
    return true;
}
export function validateCompany(company) {
    const min = 1;
    // Ensure a min of characters
  if (company.length < min) {
        throw new Error(`Company name contained less than ${min} characters`);
    }
    return true;
}
export function validateSalaryMin(lowerRange) {
    const min = 0;

    // A zero minimum salary means there isn't one, but that's the lowest it can go
    if (lowerRange < min) {
        throw new Error(`Minimum salary was set to less than ${min}`);
    }
    return true;
}
export function validateSalaryMax(lowerRange, upperRange) {
    if (upperRange < lowerRange) {
        throw new Error(`The upper range of salary was less than the lower range (Upper: ${upperRange}, Lower: ${lowerRange})`);
    }
    if (upperRange === lowerRange) {
        throw new Error(`The upper range of salary was the same as the lower range. If there is no lower range indicated, just set it to zero.`)
    }
    return true;
}
export function validateDescription(description) {
    const minLen = 100;
    const maxLen = 2000;
    const descLen = description.length;
    // Ensure a range of characters
    if (descLen > maxLen) {
        throw new Error(`Description contained more than ${max} characters`);
    }
    if (descLen < minLen) {
        throw new Error(`Description contained less than ${min} characters`);
    }
    return true;
}
export function validateExperienceLevel(level, availableLevels) {
    if (!availableLevels.includes(level)) {
        throw new Error(`The selected level (${level}) was not among the available seniority levels: ${availableLevels.join(',')}`);
    }
    return true;
}
export function validateTech() {}
export function validateInterviewCount(interviewCount) {
    const maxInterviews = 1000;
    if (isNaN(interviewCount)) {
        throw new Error(`Interview count was not a number: ${interviewCount}`)
    }
    if (interviewCount < 0) {
        throw new Error(`Interview count was less than 0: ${interviewCount}`)
    }
    if (interviewCount > maxInterviews) {
        throw new Error(`Interview count surpassed maximum of ${maxInterviews}: ${interviewCount}`)
    }
    return true;
}
export function validateEasyApply(
    easyApply
) {
    if (!validateBoolean(easyApply)) {
        throw new Error(`The setting for easy apply was not true/false`)
    }
    return true
}
export function validateRequiresPreInterviewTest(interviewTest) {
    if (!validateBoolean(interviewTest)) {
        throw new Error(`The setting for whether or not there's a pre interview test was not true/false`)
    }
    return true
}
export function validateRequiresHomework(requiresHomework) {
    if (!validateBoolean(requiresHomework)) {
        throw new Error(`The setting for a job requiring a take home assignment was not true/false`)
    }
    return true
}

function validateBoolean(val) {
  if (typeof val !== "boolean") {
        return false;
    }
    return true;
}