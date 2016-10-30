module.exports = function (app) {

    var widgets = [
        { "_id": "123", "widgetType": "HEADER", "pageId": "321", "size": 2, "text": "GIZMODO"},
        { "_id": "234", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
            "url": "http://lorempixel.com/400/200/"},
        { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
        { "_id": "567", "widgetType": "HEADER", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
        { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
            "url": "https://youtu.be/AM2Ivdi9c4E" },
        { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
    ];

    app.post("/api/page/:pid/widget", createWidget);
    app.get("/api/page/:pid/widget", findAllWidgetsForPage);
    app.get("/api/widget/:wgid", findWidgetById);
    app.put("/api/widget/:wgid", updateWidget);
    app.delete("/api/widget/:wgid", deleteWidget);

    function createWidget(req, res) {
        var pageId = req.params['pid'];
        var widget = req.body;
        var newWidget = {
            "_id": (new Date()).getTime() + "",
            "widgetType": widget.widgetType,
            "pageId": pageId,
            "size": 1,
            "text": "",
            "url": "",
            "width": "100%"
        };
        widgets.push(newWidget);
        if (newWidget) {
            res.json(newWidget);
            return;
        }
        res.sendStatus(400);
    }

    function findAllWidgetsForPage(req, res) {
        var pageId = req.params['pid'];
        var results = [];
        for (var i in widgets) {
            if (widgets[i].pageId === pageId) {
                results.push(widgets[i]);
            }
        }
        if (results) {
            res.json(results);
            return;
        }
        res.sendStatus(404);
    }

    function findWidgetById(req, res) {
        var widgetId = req.params['wgid'];
        for (var i in widgets) {
            if (widgets[i]._id === widgetId) {
                res.json(widgets[i]);
                return;
            }
        }
        res.sendStatus(404);
    }

    function updateWidget(req, res) {
        var widgetId = req.params['wgid'];
        var widget = req.body;
        for (var i in widgets) {
            if (widgets[i]._id === widgetId) {
                widgets[i].size = widget.size;
                widgets[i].text = widget.text;
                widgets[i].url = widget.url;
                widgets[i].width = widget.width;
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(400);
    }

    function deleteWidget(req, res) {
        var widgetId = req.params['wgid'];
        for (var i in widgets) {
            if (widgets[i]._id === widgetId) {
                widgets.splice(i, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(400);
    }

};