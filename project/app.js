module.exports = function(app) {
    var models = require('./model/models.server')();
    require('./services/user.service.server')(app, models);
    require('./services/movie.service.server')(app, models);
    require('./services/review.service.server')(app, models);
};