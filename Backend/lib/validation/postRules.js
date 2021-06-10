// VALIDATION rules

// IMPORT EXPRESS VALIDATOR
const {body} = require('express-validator');

// before module.exports (when using non-express router design)

exports.postValidationRules = [
    body('slug').notEmpty(),
    body('title').notEmpty().isLength({ min: 5, max: 120 }).withMessage("Missing title"),
    body('content').notEmpty().isLength({ min: 20, max: 5000 }).withMessage("Content length is out of bounds")
];