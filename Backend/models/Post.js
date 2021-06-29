const mongoose = require("mongoose");
// DESTRUCTURING SCHEMA FROM MONGOOSE
const { Schema } = mongoose;



// DECLARATION OF THE POST SCHEMA
// PostSchema:
// 1. slug: type: String,
// 		required: true
// 2. title: type: String,
// 		required: true
// 3. content: type: [{insert: String}],
// 		required: true
//         
const PostSchema = new Schema(
    {
        slug: {
            type: String,
            required: true
        },
        title: {
            type: String,
            required: true
        },
        content: {
            type: String,
            required: true
        }
    }
);





// CREATE AND EXPORT THE MODEL
module.exports = mongoose.model("Post", PostSchema);