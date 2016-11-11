module.exports = function () {

    var mognoose = require('mongoose');
    var WebsiteScema = mongoose.Schema({
        _user: {type: mognoose.Schema.Types.ObjectId, ref: 'User'},
        name: {type: String, required: true},
        description: String,
        pages: [{type: mognoose.Schema.Types.ObjectId, ref: 'Page'}],
        dateCreated: {type: Date, default: Date.now()}
    }, {collection: "assignment.website"});

    return WebsiteScema;

};