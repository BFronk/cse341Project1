const dotenv = require('dotenv');
dotenv.config();
const { MongoClient } = require('mongodb');

let database

const initDb =  (callback) => {
    if (database) {
        console.log('Database connection already established');
        return callback(null, database);
    }
        console.log(process.env.MONGODB_URL);
        MongoClient.connect(process.env.MONGODB_URL)
            .then((client) => {
                database = client.db();
                return callback(null, database);
            })
            .catch((err) => {
                callback(err);
            });
}

console.log('Connecting to MongoDB...');

const getDb = () => {
    if (!database) {
        throw Error('Database connection not established');
    }
    return database;
};

module.exports = {
    initDb,
    getDb
}