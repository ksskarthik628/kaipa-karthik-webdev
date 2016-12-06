module.exports = function (database, passport) {

    var LocalStrategy = require('passport-local').Strategy;
    var FacebookStrategy = require('passport-facebook').Strategy;
    var bcrypt = require('bcrypt-nodejs');

    var wamFacebookConfig = {
        clientID: process.env.WAM_FACEBOOK_CLIENT_ID,
        clientSecret: process.env.WAM_FACEBOOK_CLIENT_SECRET,
        callbackURL: process.env.WAM_FACEBOOK_CALLBACK_URL
    };

    var bbbFacebookConfig = {
        clientID: process.env.WAM_FACEBOOK_CLIENT_ID,
        clientSecret: process.env.WAM_FACEBOOK_CLIENT_SECRET,
        callbackURL: process.env.WAM_FACEBOOK_CALLBACK_URL
    };

    var assignmentModel = database.wamModels().userModel;
    var projectModel = database.bbbModels().userModel;

    passport.use('wam', new LocalStrategy(wamStrategy));
    passport.use('wamFacebook', new FacebookStrategy(wamFacebookConfig, wamFacebookStrategy));
    passport.use('bbb', new LocalStrategy(bbbStrategy));
    passport.use('bbbFacebook', new FacebookStrategy(bbbFacebookConfig, bbbFacebookStrategy));
    passport.serializeUser(serializeUser);
    passport.deserializeUser(deserializeUser);

    var api = {
        getPassport: getPassport,
        getBCrypt: getBCrypt
    };
    return api;

    function wamStrategy(username, password, done) {
        assignmentModel
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

    function wamFacebookStrategy(token, refreshToken, profile, done) {
        assignmentModel
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
                    assignmentModel
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

    function bbbStrategy(username, password, done) {
        projectModel
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

    function bbbFacebookStrategy(token, refreshToken, profile, done) {
        projectModel
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
                    projectModel
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
        if (user.type === 'wam') {
            assignmentModel
                .findUserById(user._id)
                .then(function (user) {
                    done(null, user);
                }, function (err) {
                    done(err, null);
                });
        } else if(user.type === 'bbb') {
            projectModel
                .findUserById(user._id)
                .then(function (user) {
                    done(null, user);
                }, function (err) {
                    done(err, null);
                });
        }
    }

    function getPassport() {
        return passport;
    }

    function getBCrypt() {
        return bcrypt;
    }

};