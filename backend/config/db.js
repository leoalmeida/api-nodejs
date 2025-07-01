const mongoose = require('mongoose');


const connect = (url) => {

    try {
        mongoose.connect(url);
    } catch (error) {
        console.error("Mongoose connection or check failed:", error);
    } finally {
        console.error("Finally");
    }
}

module.exports = {connect};

