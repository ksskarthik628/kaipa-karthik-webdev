module.exports = function () {

    var mongoose = require('mongoose');
    var ReviewSchema = mongoose.Schema({
        title: String,
        description: String,
        timestamp: {type: Date, default: Date.now()},
        movieId: String,
        _movie: {type: mongoose.Schema.Types.ObjectId, ref: 'BBBMovie'},
        _user: {type: mongoose.Schema.Types.ObjectId, ref: 'BBBUser'},
        rating: String
    }, {collection: 'bbb.review'});
    return ReviewSchema;

};