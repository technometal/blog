// VALIDATION rules

// IMPORT EXPRESS VALIDATOR
const {body} = require('express-validator');

// before module.exports (when using non-express router design)

exports.userValidationRules = [
    body('email').isEmail(),
    body('firstName').notEmpty().withMessage("Missing first name"),
    body('lastName').notEmpty(),
    body('password').trim().notEmpty().isLength({ min: 8 }),
];