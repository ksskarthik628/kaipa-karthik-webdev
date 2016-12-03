module.exports = function () {

    var mongoose = require('mongoose');
    mongoose.Promise = require('bluebird');
    var UserSchema = require('./user.schema.server')();
    var User = mongoose.model('User', UserSchema);

    var api = {
        createUser: createUser,
        findAllUsers: findAllUsers,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        likeMovie: likeMovie,
        undoLikeMovie: undoLikeMovie,
        isMovieLiked: isMovieLiked,
        addFollower: addFollower,
        addFollowing: addFollowing,
        removeFollowing: removeFollowing,
        removeFollower: removeFollower,
        isAlreadyFollowing: isAlreadyFollowing,
        findAllFollowingUsers: findAllFollowingUsers,
        findAllFollowerUsers: findAllFollowerUsers,
        updateUser: updateUser,
        deleteUser: deleteUser
    };
    return api;

    function createUser(user) {
        return User.create(user);
    }
    
    function findAllUsers() {
        return User.find();
    }

    function findUserById(userId) {
        return User.findById(userId);
    }

    function findUserByUsername(username) {
        return User.findOne({username: username});
    }
    
    function findUserByCredentials(username, password) {
        return User.findOne({username: username, password: password});
    }
    
    function likeMovie(userId, mid, movieId) {
        return User.update({_id: userId}, {$addToSet: {movieLikes: movieId, likes: mid}});
    }
    
    function undoLikeMovie(userId, mid, movieId) {
        return User.update({_id: userId}, {$pullAll: {movieLikes: [movieId], likes: [mid]}});
    }

    function isMovieLiked(userId, mid, movieId) {
        return User.findOne({_id: userId}, {$and: [{movieLikes: {$in: [movieId]}}, {likes: {$in: [mid]}}]});
    }

    function addFollower(userId, followerId) {
        return User.update({_id: userId}, {$addToSet: {followers: followerId}});
    }

    function addFollowing(userId, followingId) {
        return User.update({_id: userId}, {$addToSet: {following: followingId}});
    }

    function removeFollowing(userId, followingId) {
        return User.update({_id: userId}, {$pullAll: {following: followingId}});
    }

    function removeFollower(userId, followerId) {
        return User.update({_id: userId}, {$pullAll: {followers: followerId}});
    }
    
    function isAlreadyFollowing(userId, followId) {
        return User.findOne({_id: userId, following: {$in: [followId]}});
    }
    
    function findAllFollowingUsers(userIds) {
        return User.find({_id: {$in: userIds}});
    }

    function findAllFollowerUsers(userIds) {
        return User.find({_id: {$in: userIds}});
    }

    function updateUser(userId, user) {
        delete user._id;
        return User.update({_id: userId}, {$set: user});
    }

    function deleteUser(userId) {
        return User.remove({_id: userId});
    }

};