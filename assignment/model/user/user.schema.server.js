module.exports = function (mongoose) {

    var UserSchema = mongoose.Schema({
        username: {type: String, required: true, unique: true},
        password: String,
        firstName: String,
        lastName: String,
        facebook: {id: String, token: String},
        email: String,
        phone: String,
        websites: [{type: mongoose.Schema.Types.ObjectId, ref: 'Website'}],
        dateCreated: {type: Date, default: Date.now()},
        type: {type: String, default: 'wam'}
    }, {collection: "assignment.user"});

    return UserSchema;

};