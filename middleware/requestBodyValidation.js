let bodyvalidation = (body) => {
    if (body && body.hasOwnProperty("topicsName") && body.hasOwnProperty("rankings")) return true
    return false
}


let rankingValidation = rank => {
    if (1 <= rank && rank <= 100) return true;

    return false
}

let trimName = (obj) => {
    try {
        if (obj === null || obj === undefined) return null;
        return obj.trimRight().trimLeft()

    } catch (error) {
        throw error
    }
}

let passwordValidation = (obj) => {
    try {
        if (obj.length < 7) return false

        return true
    } catch (error) {
        throw error
    }
}

module.exports = {
    bodyvalidation,
    rankingValidation,
    trimName,
    passwordValidation
}
