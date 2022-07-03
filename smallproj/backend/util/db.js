const mongodb = require('mongodb').MongoClient;

let db;

async function connectDB() {
    if (!db) {
        await mongodb
            .connect('mongodb://127.0.0.1:27017/shop')
            .then(_client => {
                db = _client.db();
                console.log('Connected to DB.');
            });
    }
}

function getDB() {
    if (!db) {
        throw new Error('DB not ready!');
    }

    return db;
}

module.exports = {
    connectDB,
    getDB,
};
