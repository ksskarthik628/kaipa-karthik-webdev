module.exports = function(app) {
    var models = require('./model/models.server')();
    require('./server/user.service.server')(app, models);
    require('./server/movie.service.server')(app, models);
    require('./server/review.service.server')(app, models);
};