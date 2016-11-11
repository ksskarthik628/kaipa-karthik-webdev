module.exports = function () {

    var connectionString = 'mongodb://127.0.0.1:27017/wamlocal';

    if(process.env.WEB_CONCURRENCY ) {
        connectionString = process.env.MONGODB_URI;
    }

    var mongoose = require("mongoose");
    mongoose.connect(connectionString);

    var models = {
        userModel: require("./user/user.model.server")(),
        websiteModel: require("./website/website.model.server")(),
        pageModel: require("./page/page.model.server")(),
        widgetModel: require("./widget/widget.model.server")()
    };

    return models;

};