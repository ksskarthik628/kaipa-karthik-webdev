module.exports = function (app, models, security) {

    var userModel = models.userModel;
    var auth = authorized;
    var bcrypt = security.getBCrypt();
    var passport = security.getPassport();

    // Login and logout requests
    app.post("/api/login", passport.authenticate('wam'), login);
    app.post("/api/logout", logout);
    app.post("/api/register", register);
    app.get("/api/loggedin", loggedIn);
    app.get("/auth/facebook", passport.authenticate('wamFacebook', {scope: 'email'}));
    app.get("/auth/facebook/callback",
        passport.authenticate('wamFacebook', {
            successRedirect: '/assignment/#/user',
            failureRedirect: '/assignment/#/login'
        }));

    // CRUD requests
    app.post("/api/user", auth, createUser);
    app.get("/api/user", auth, findUser);
    app.get("/api/user/:uid", auth, findUserById);
    app.put("/api/user/:uid", auth, updateUser);
    app.delete("/api/user/:uid", auth, deleteUser);

    function authorized (req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }
    
    function login(req, res) {
        var user = req.user;
        res.json(user);
    }
    
    function logout(req, res) {
        req.logOut();
        res.sendStatus(200);
    }
    
    function register(req, res) {
        var user = req.body;
        user.password = bcrypt.hashSync(user.password);
        userModel
            .createUser(user)
            .then(function (user) {
                if (user) {
                    req.login(user, function (err) {
                        if (err) {
                            res.status(400).send(err);
                        } else {
                            res.json(user);
                        }
                    });
                }
            }, function (error) {
                if (error.code === 11000)
                    res.status(409).send("Duplicate username");
                else
                    res.status(400).send(error);
            });
    }
    
    function loggedIn(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
    }

    function createUser(req, res) {
        var user = req.body;
        userModel
            .createUser(user)
            .then(function (user) {
                res.json(user);
            }, function (error) {
                if (error.code === 11000)
                    res.status(409).send("Duplicate username");
                else
                    res.status(400).send(error);
            });
    }

    function findUser(req, res) {
        var username = req.query['username'];
        var password = req.query['password'];
        if (password) {
            findUserByCredentials(username, password, res);
        } else {
            findUserByUsername(username, res);
        }
    }

    function findUserByCredentials(username, password, res) {
        userModel
            .findUserByCredentials(username, password)
            .then(function (user) {
                res.json(user);
            }, function (error) {
                res.status(404).send(error);
            });
    }

    function findUserByUsername(username, res) {
        userModel
            .findUserByUsername(username)
            .then(function (user) {
                res.json(user);
            }, function (error) {
                res.status(404).send(error);
            });
    }

    function findUserById(req, res) {
        var userId = req.params['uid'];
        userModel
            .findUserById(userId)
            .then(function (user) {
                res.json(user);
            }, function (error) {
                res.status(404).send(error);
            });
    }
    
    function updateUser(req, res) {
        var userId = req.params['uid'];
        var user = req.body;
        userModel
            .updateUser(userId, user)
            .then(function (stats) {
                res.sendStatus(200);
            }, function (error) {
                res.sendStatus(400);
            });
    }

    function deleteUser(req, res) {
        var userId = req.params['uid'];
        userModel
            .deleteUser(userId)
            .then(function (stats) {
                res.sendStatus(200);
            }, function (error) {
                res.sendStatus(400);
            });
    }

};