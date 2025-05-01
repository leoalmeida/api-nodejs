const mongoose = require('mongoose');


const {
    MONGO_USERNAME,
    MONGO_PASSWORD,
    MONGO_HOSTNAME,
    MONGO_DB,
    MONGO_URL
} = process.env;

function main () {
    try {
        //const url = `mongodb+srv://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}/${MONGO_DB}?retryWrites=true&w=majority&appName=ClusterLeo`
        const url = `${MONGO_URL}`
        //const url = `mongodb+srv://api-nodejs:8VNergbNwt06HL7R@clusterleo.sckgivp.mongodb.net/db?retryWrites=true&w=majority&appName=ClusterLeo`
        mongoose.connect(url);
    } catch (error) {
        console.error("Mongoose connection or check failed:", error);
    } finally {
        console.error("Finally");
    }
}

main();
