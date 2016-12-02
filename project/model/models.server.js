module.exports = function () {

    var connectionString = process.env.BBB_TEST_MONGODB;

    if(process.env.WEB_CONCURRENCY ) {
        connectionString = process.env.PROJECT_MONGO_URI;
    }

    var mongoose = require('mongoose');
    mongoose.connect(connectionString);

    var models = {
        userModel: require('./user/user.model.server')(),
        movieModel: require('./movie/movie.model.server')(),
        reviewModel: require('./review/review.model.server')()
    };

    return models;

};