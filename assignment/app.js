module.exports = function (app, database, security) {
    var models = database.wamModels();
    require("./services/user.service.server")(app, models, security);
    require("./services/website.service.server")(app, models);
    require("./services/page.service.server")(app, models);
    require("./services/widget.service.server")(app, models);
};