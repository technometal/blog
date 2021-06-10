// HANDLE THE VALIDATION PROCESS USING THE VALIDATOR


const { validationResult } = require("express-validator");

// const validateInputs = rules => {
  // HANDLE THE VALIDATION RESULT

const validateInputs = someRules => {
  return ([...someRules, (req, res, next) => {
    const errors = validationResult(req);

    if (errors.isEmpty()) {
      return next();
    }
    const extractedErrors = [];
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }));
    return res.status(422).json({ errors: extractedErrors });
  }]);
}

module.exports = { validateInputs };