const mongoose = require('mongoose');

const {
    MONGO_USERNAME,
    MONGO_PASSWORD,
    MONGO_HOSTNAME,
    MONGO_PORT,
    MONGO_DB
  } = process.env;

main().catch(err => console.log(err));

async function main() {
    const url = `mongodb://${MONGO_USERNAME}:${MONGO_PASSWORD}@${MONGO_HOSTNAME}:${MONGO_PORT}/${MONGO_DB}?authSource=admin`;
    const options = {
        useNewUrlParser: true,
        reconnectTries: Number.MAX_VALUE,
        reconnectInterval: 500,
        connectTimeoutMS: 10000,
    };
    await mongoose.connect(url, options)
            .then( function() {
                console.log('MongoDB is connected');
            })
                .catch( function(err) {
                console.log(err);
            })
}
