module.exports = function (mongoose) {

    var MovieSchema = mongoose.Schema({
        movieId: String,
        title: String,
        imageUrl: String
    }, {collection: 'bbb.movie'});
    return MovieSchema;

};