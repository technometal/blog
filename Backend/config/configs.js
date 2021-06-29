const { env } = process;

const config = {
    env: env.NODE_ENV || "development"
}

// CONFIGURATION PARAMETERS FOR THE LOCAL ENVIRONMENT
const devConfig = {
    db: "mongodb+srv://Hertiberto:hrh4e1974@cluster0.rnomd.mongodb.net/blog?retryWrites=true&w=majority",
    jwt_key: "FBW43-2-110%"
}


// CONFIGURATION PARAMETERS FOR THE PRODUCTIVE environment
const prodConfig = {
    // USING PROD_recordShop AS A PRODUCTIVE DATABASE ON THE SAME MONGODB CLUSTER
    db: "mongodb+srv://Hertiberto:hrh4e1974@cluster0.rnomd.mongodb.net/PROD_blog?retryWrites=true&w=majority",
    // USING A DIFFERENT JWT KEY FOR THE PRODUCTIVE ENVIRONMENT
    jwt_key: "PROD_FBW43-2-110%"
}


// CHOOSE THE devConfig OR THE prodConfig DEPENDING ON THE config.env VALUE
const currentConfig = config.env === "productive" ? prodConfig : devConfig;


// EXPORT THE ENV, DB AND JWT KEY
module.exports = Object.assign({}, config, currentConfig);
