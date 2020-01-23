const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

const dbName = 'backend';
const host = process.env.DATABASE_POD_IP || 'localhost';
const port = process.env.DATABASE_POD_PORT || 27017;
const url = `mongodb://${host}:${port}/`;

const comments = 'comments';

exports.getComments = function () {
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, (err, db) => {
            if (err) reject(err);
            const dbo = db.db(dbName);
            dbo.collection(comments).find({}).toArray((err, result) => {
                if (err) reject(err);
                resolve(result);
                db.close();
            });
        });
    });
}

exports.getComment = function (id) {
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, (err, db) => {
            if (err) reject(err);
            const dbo = db.db(dbName);
            const id = { _id: new ObjectID(id) };
            dbo.collection(comments)
                .findOne(id, (err, result) => {
                    if (err) reject(err);
                    resolve(result);
                    db.close();
                });
        });
    });
}

exports.addComment = function (newComment) {
    return new Promise((resolve, reject) => {
        if (checkObject(newComment)) {
            MongoClient.connect(url, (err, db) => {
                if (err) reject(err);
                const dbo = db.db(dbName);
                dbo.collection(comments)
                    .insertOne(newComment, (err, res) => {
                        if (err) reject(err);
                        resolve(generateCreateRes(res));
                        db.close();
                    });
            });
        } else {
            reject(new Error('The object has missing properties'));
        }

    });
}

exports.editComment = function (id, newComment) {
    return new Promise((resolve, reject) => {
        if (checkObject(newComment)) {
            MongoClient.connect(url, (err, db) => {
                if (err) reject(err);
                const dbo = db.db(dbName);
                const objectId = { _id: new ObjectID(id) };
                const newObject = { $set: newComment };
                dbo.collection(comments)
                    .updateOne(objectId, newObject, (err, res) => {
                        if (err) reject(err);
                        resolve(generateUpdateRes(res, id, newComment));
                        db.close();
                    });
            });
        } else {
            reject(new Error('The object has missing properties'));
        }
    });
}

exports.deleteComment = function (id) {
    return new Promise((resolve, reject) => {
        MongoClient.connect(url, (err, db) => {
            if (err) reject(err);
            const dbo = db.db(dbName);
            const objectId = { _id: new ObjectID(id) };
            dbo.collection(comments)
                .deleteOne(objectId, (err, res) => {
                    if (err) reject(err);
                    resolve({id: id});
                    db.close();
                });
        });
    });
}

function generateCreateRes(res) {
    return {
        created: res.result.ok,
        newObject: res.ops[0]
    }
}

function generateUpdateRes(res, id, object) {
    object._id = id;
    return {
        updated: res.result.nModified,
        newObject: object
    }
}

function checkObject(object) {
    return (object.hasOwnProperty('user') &&
        object.hasOwnProperty('content') &&
        object.hasOwnProperty('stars') &&
        object.hasOwnProperty('filmTitle') &&
        object.hasOwnProperty('idFilm') &&
        Object.keys(object).length === 5);
}
