module.exports = function (mongoose) {

    var PageSchema = mongoose.Schema({
        _website: {type: mongoose.Schema.Types.ObjectId, ref: 'Website'},
        title: {type: String, required: true},
        name: String,
        description: String,
        widgets: [{type: mongoose.Schema.Types.ObjectId, ref: 'Widget'}],
        dateCreated: {type: Date, default: Date.now()}
    }, {collection: "assignment.page"});

    return PageSchema;

};