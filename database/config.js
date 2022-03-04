const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect( process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('DB Connected');
    } catch (err) {
        console.error(err);
        throw new Error('Error connecting db');
    }
}

module.exports = {
    dbConnection,
}