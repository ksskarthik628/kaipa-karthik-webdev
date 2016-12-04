module.exports = function (app, models) {

    var movieModel = models.movieModel;
    var userModel = models.userModel;

    var bcrypt = require('bcrypt-nodejs');
    var FacebookStrategy = require('passport-facebook').Strategy;
    var LocalStrategy = require('passport-local').Strategy;
    var multer = require('multer');
    var passport = require('passport');

    var auth = authorized;
    var facebookConfig = {
        clientID: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
        callbackURL: process.env.FACEBOOK_CALLBACK_URL
    };
    var upload = multer({dest: __dirname + '/../../public/uploads'});

    passport.use(new LocalStrategy(localStrategy));
    passport.use('facebook', new FacebookStrategy(facebookConfig, facebookStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    // Login and logout requests
    app.post('/bbb/login', passport.authenticate('local'), login);
    app.post('/bbb/logout', logout);
    app.post('/bbb/register', register);
    app.get('/bbb/loggedin', loggedIn);
    app.get('/bbb/auth/facebook', passport.authenticate('facebook', {scope: 'email'}));
    app.get('/bbb/auth/callback',
        passport.authenticate('facebook', {
            successRedirect: '/project/#/user',
            failureRedirect: '/project/#/login'
        }));

    // CRUD requests
    // app.post('/bbb/user', createUser);
    app.get('/bbb/user/:uid', findUserById);
    app.put('/bbb/user/:uid/movie/:mid/like', likeMovie);
    app.put('/bbb/user/:uid/movie/:mid/unlike', unlikeMovie);
    app.get('/bbb/user/:uid/movie/:mid/isLiked', isLiked);
    app.put('/bbb/user/:uid/follow/:followid', followUser);
    app.put('/bbb/user/:uid/unfollow/:unfollowid', unfollowUser);
    app.get('/bbb/user/:uid/isfollowing/:followingid', isFollowing);
    app.get('/bbb/user/:uid/following', findAllFollowingUsers);
    app.get('/bbb/user/:uid/followers', findAllFollowers);
    app.get('/bbb/user/:uid/likes', findAllLikedMovies);
    app.post('/bbb/user/:uid', upload.single('profilePic'), uploadUserImage);
    app.put('/bbb/user/:uid', updateUser);
    app.delete('/bbb/user/:uid', deleteUser);

    // Admin requests
    app.post('/bbb/admin/user', auth, createUserByAdmin);
    app.get('/bbb/admin/users', auth, findAllUsersForAdmin);
    app.put('/bbb/admin/user/:uid', auth, updateUserByAdmin);
    app.delete('/bbb/admin/user/:uid', auth, deleteUserByAdmin);

    function authorized(req, res, next) {
        if (!req.isAuthenticated()) {
            res.send(401);
        } else {
            next();
        }
    }

    function localStrategy(username, password, done) {
        userModel
            .findUserByUsername(username)
            .then(function (user) {
                if (user && bcrypt.compareSync(password, user.password)) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            }, function (err) {
                if (err) {
                    return done(err);
                }
            });
    }

    function facebookStrategy(token, refreshToken, profile, done) {
        userModel
            .findUserByFacebookId(profile.id)
            .then(function (user) {
                if (user) {
                    return done(null, user);
                } else {
                    var newUser = {
                        username: profile.displayName.replace(/ /g, ""),
                        facebook: {
                            token: token,
                            id: profile.id
                        }
                    };
                    userModel
                        .createUser(newUser)
                        .then(function (user) {
                            return done(null, user);
                        }, function (err) {
                            console.log(err);
                            return done(err, null);
                        });
                }
            }, function (err) {
                console.log(err);
                return done(err, null);
            });
    }

    function serializeUser(user, done) {
        done(null, user);
    }

    function deserializeUser(user, done) {
        userModel
            .findUserById(user._id)
            .then(function (user) {
                done(null, user);
            }, function (err) {
                done(err, null);
            });
    }

    function login(req, res) {
        var user = req.user;
        res.json(user);
    }

    function logout(req, res) {
        req.logOut();
        res.sendStatus(200);
    }

    function loggedIn(req, res) {
        res.send(req.isAuthenticated() ? req.user : '0');
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
            }, function (err) {
                if (err.code === 11000)
                    res.status(409).send("Duplicate username");
                else
                    res.status(400).send(err);
            });
    }

    function findUserById(req, res) {
        var userId = req.params['uid'];
        userModel
            .findUserById(userId)
            .then(function (user) {
                res.json(user);
            }, function (err) {
                res.status(404).send(err);
            });
    }

    function likeMovie(req, res) {
        var userId = req.params['uid'];
        var mid = req.params['mid'];
        userModel
            .likeMovie(userId, mid)
            .then(function (stats) {
                res.sendStatus(200);
            }, function (err) {
                res.status(400).send(err);
            });
    }

    function unlikeMovie(req, res) {
        var userId = req.params['uid'];
        var mid = req.params['mid'];
        userModel
            .unlikeMovie(userId, mid)
            .then(function (stats) {
                res.sendStatus(200);
            }, function (err) {
                res.status(400).send(err);
            });
    }

    function isLiked(req, res) {
        var userId = req.params['uid'];
        var mid = req.params['mid'];
        userModel
            .isLiked(userId, mid)
            .then(function (user) {
                if (user) {
                    res.sendStatus(200);
                } else {
                    res.sendStatus(404);
                }
            }, function (err) {
                res.status(400).send(err);
            });
    }

    function followUser(req, res) {
        var userId = req.params['uid'];
        var followId = req.params['followid'];
        userModel
            .addFollowing(userId, followId)
            .then(function (stats) {
                return userModel
                    .addFollower(followId, userId);
            }, function (err) {
                res.status(400).send(err);
            })
            .then(function (stats) {
                res.sendStatus(200);
            }, function (err) {
                res.status(400).send(err);
            });
    }

    function unfollowUser(req, res) {
        var userId = req.params['uid'];
        var unfollowId = req.params['unfollowid'];
        userModel
            .removeFollowing(userId, unfollowId)
            .then(function (stats) {
                return userModel
                    .removeFollower(unfollowId, userId);
            }, function (err) {
                res.status(400).send(err);
            })
            .then(function (stats) {
                res.sendStatus(200);
            }, function (err) {
                res.status(400).send(err);
            });
    }

    function isFollowing(req, res) {
        var userId = req.params['uid'];
        var followingId = req.params['followingid'];
        userModel
            .isFollowing(userId, followingId)
            .then(function (user) {
                if (user) {
                    res.sendStatus(200);
                } else {
                    res.sendStatus(404);
                }
            }, function (err) {
                res.status(400).send(err);
            });
    }

    function findAllFollowingUsers(req, res) {
        var userId = req.params['uid'];
        userModel
            .findUserById(userId)
            .then(function (user) {
                return userModel
                    .findAllFollowingUsers(user.following);
            }, function (err) {
                res.status(400).send(err);
            })
            .then(function (users) {
                res.json(users);
            }, function (err) {
                res.status(400).send(err);
            });
    }

    function findAllFollowers(req, res) {
        var userId = req.params['uid'];
        userModel
            .findUserById(userId)
            .then(function (user) {
                return userModel
                    .findAllFollowers(user.followers);
            }, function (err) {
                res.status(400).send(err);
            })
            .then(function (users) {
                res.json(users);
            }, function (err) {
                res.status(400).send(err);
            });
    }

    function findAllLikedMovies(req, res) {
        var userId = req.params['uid'];
        userModel
            .findUserById(userId)
            .then(function (user) {
                return movieModel
                    .findAllLikedMovies(user.likes);
            }, function (err) {
                res.status(400).send(err);
            })
            .then(function (movies) {
                res.json(movies);
            }, function (err) {
                res.status(400).send(err);
            });
    }
    
    function uploadUserImage(req, res) {
        var userId = req.params['uid'];
        var image = req.file;
        var user = {
            imgUrl: '/uploads/' + image.filename
        };

        userModel
            .updateUser(userId, user)
            .then(function (stats) {
                return userModel
                    .findUserById(userId);
            }, function (err) {
                res.status(400).send(err);
            })
            .then(function (user) {
                req.session.currentUser = user;
                res.redirect('/project/#/profile/' + userId + '/edit-profile');
            }, function (err) {
                res.status(400).send(err);
            });
    }

    function updateUser(req, res) {
        var userId = req.params['uid'];
        var user = req.body;
        userModel
            .updateUser(userId, user)
            .then(function (stats) {
                return userModel
                    .findUserById(userId);
            }, function (err) {
                res.status(400).send(err);
            })
            .then(function (user) {
                req.session.currentUser = user;
                res.sendStatus(200);
            }, function (err) {
                res.status(400).send(err);
            });
    }

    function deleteUser(req, res) {
        var userId = req.params['uid'];
        userModel
            .deleteUser(userId)
            .then(function (stats) {
                res.sendStatus(200);
            }, function (err) {
                res.status(400).send(err);
            });
    }

    function isAdmin(user) {
        return (user.role.indexOf("admin") > -1);
    }

    function createUserByAdmin(req, res) {
        var user = req.user;
        if (isAdmin(user)) {
            var newUser = req.body;
            user.password = bcrypt.hashSync(newUser.password);
            userModel
                .createUser(newUser)
                .then(function (user) {
                    return userModel
                        .findAllUsers();
                }, function (err) {
                    if (err.code === 11000)
                        res.status(409).send("Duplicate username");
                    else
                        res.status(400).send(err);
                })
                .then(function (users) {
                    res.json(users);
                }, function (err) {
                    res.status(400).send(err);
                });
        } else {
            res.sendStatus(403);
        }

    }

    function findAllUsersForAdmin(req, res) {
        var user = req.user;
        if (isAdmin(user)) {
            userModel
                .findAllUsers()
                .then(function (users) {
                    res.json(users);
                }, function (err) {
                    res.status(400).send(err);
                });
        } else {
            res.sendStatus(403);
        }
    }

    function updateUserByAdmin(req, res) {
        var user = req.user;
        if (isAdmin(user)) {
            var newUser = req.body;
            newUser.password = bcrypt.hashSync(newUser.password);
            var newUserId = req.params['uid'];
            userModel
                .updateUser(newUserId, newUser)
                .then(function (stats) {
                    return userModel
                        .findAllUsers();
                }, function (err) {
                    res.status(400).send(err);
                })
                .then(function (users) {
                    res.json(users);
                }, function (err) {
                    res.status(400).send(err);
                })
        } else {
            res.sendStatus(403);
        }
    }

    function deleteUserByAdmin(req, res) {
        var user = req.user;
        if (isAdmin(user)) {
            var newUserId = req.params['uid'];
            userModel
                .deleteUser(newUserId)
                .then(function (stats) {
                    return userModel
                        .findAllUsers();
                }, function (err) {
                    res.status(400).send(err);
                })
                .then(function (users) {
                    res.json(users);
                }, function (err) {
                    res.status(400).send(err);
                })
        } else {
            res.sendStatus(403);
        }
    }

};