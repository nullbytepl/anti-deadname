import GramaticalGender from './gramatical_gender'

interface GenderedString {
    feminine: string
    masculine: string
    neutral: string
}

const replaceExpressions = (str: string, expressions: GenderedString[], targetGender: GramaticalGender) => {
    for (const expression of expressions) {
        str = replaceExpression(str, expression, targetGender)
    }

    return str
}

const replaceExpression = (str: string, expression: GenderedString, targetGender: GramaticalGender) => {
    // In all the cases we consider, the original strings are either feminine or masculine
    // so, what we do is we replace the feminine/masculine string with the target one.

    if (targetGender === GramaticalGender.FEMININE) {
        return str.replace(expression.masculine, expression.feminine)
    } else if (targetGender === GramaticalGender.MASCULINE) {
        return str.replace(expression.feminine, expression.masculine)
    } else {
        // neutral - change both feminine and masculine to neutral
        return str.replace(expression.feminine, expression.neutral).replace(expression.masculine, expression.neutral)
    }
}

export { GenderedString, replaceExpressions, replaceExpression }