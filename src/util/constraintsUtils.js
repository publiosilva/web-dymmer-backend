function getConstraintVariables(constraint) {
    const constraintStr = constraint.value;

    return constraintStr.replace("~", "").split(" or ");
}

module.exports = { getConstraintVariables };
