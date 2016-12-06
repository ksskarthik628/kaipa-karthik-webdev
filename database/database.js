module.exports = function (mongoose) {

    var connectionString = 'mongodb://127.0.0.1:27017/wamlocal';

    if(process.env.WEB_CONCURRENCY ) {
        connectionString = process.env.MONGODB_URI;
    }

    mongoose.connect(connectionString);

    var assignmentModels = require('../assignment/model/models.server')(mongoose);
    var projectModels = require('../project/model/models.server')(mongoose);

    var api = {
        wamModels: wamModels,
        bbbModels: bbbModels
    };
    return api;

    function wamModels() {
        return assignmentModels;
    }

    function bbbModels() {
        return projectModels;
    }

};

