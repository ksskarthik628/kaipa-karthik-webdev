module.exports = function (app, models) {

    var websites = [
        { "_id": "123", "name": "Facebook",    "developerId": "456" },
        { "_id": "234", "name": "Tweeter",     "developerId": "456" },
        { "_id": "456", "name": "Gizmodo",     "developerId": "456" },
        { "_id": "567", "name": "Tic Tac Toe", "developerId": "123" },
        { "_id": "678", "name": "Checkers",    "developerId": "123" },
        { "_id": "789", "name": "Chess",       "developerId": "234" }
    ];

    app.post("/api/user/:uid/website", createWebsite);
    app.get("/api/user/:uid/website", findAllWebsitesForUser);
    app.get("/api/website/:wid", findWebsiteById);
    app.put("/api/website/:wid", updateWebsite);
    app.delete("/api/website/:wid", deleteWebsite);

    function createWebsite(req, res) {
        var userId = req.params['uid'];
        var website = req.body;
        var newWebsite = {
            "_id": (new Date()).getTime() + "",
            "name": website.name,
            "description": website.description,
            "developerId": userId
        };
        websites.push(newWebsite);
        if (newWebsite) {
            res.json(newWebsite);
            return;
        }
        res.sendStatus(400);
    }

    function findAllWebsitesForUser(req, res) {
        var userId = req.params['uid'];
        var results = [];
        for (var i in websites) {
            if (websites[i].developerId === userId) {
                results.push(websites[i]);
            }
        }
        if (results) {
            res.json(results);
            return;
        }
        res.sendStatus(404);
    }

    function findWebsiteById(req, res) {
        var websiteId = req.params['wid'];
        for (var i in websites) {
            if (websites[i]._id === websiteId) {
                res.json(websites[i]);
                return;
            }
        }
        res.sendStatus(404);
    }

    function updateWebsite(req, res) {
        var websiteId = req.params['wid'];
        var website = req.body;
        for (var i in websites) {
            if (websites[i]._id === websiteId) {
                websites[i].name = website.name;
                websites[i].description = website.description;
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(400);
    }

    function deleteWebsite(req, res) {
        var websiteId = req.params['wid'];
        for (var i in websites) {
            if (websites[i]._id === websiteId) {
                websites.splice(i, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(400);
    }

};