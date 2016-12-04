module.exports = function () {

    var mongoose = require('mongoose');
    mongoose.Promise = require('bluebird');
    var UserSchema = require('./user.schema.server')();
    var BBBUser = mongoose.model('BBBUser', UserSchema);

    var api = {
        createUser: createUser,
        findAllUsers: findAllUsers,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        findUserByFacebookId: findUserByFacebookId,
        likeMovie: likeMovie,
        unlikeMovie: unlikeMovie,
        isLiked: isLiked,
        addFollower: addFollower,
        addFollowing: addFollowing,
        removeFollowing: removeFollowing,
        removeFollower: removeFollower,
        isFollowing: isFollowing,
        findAllFollowingUsers: findAllFollowingUsers,
        findAllFollowers: findAllFollowers,
        updateUser: updateUser,
        deleteUser: deleteUser
    };
    return api;

    function createUser(user) {
        return BBBUser.create(user);
    }
    
    function findAllUsers() {
        return BBBUser.find();
    }

    function findUserById(userId) {
        return BBBUser.findById(userId);
    }

    function findUserByUsername(username) {
        return BBBUser.findOne({username: username});
    }
    
    function findUserByCredentials(username, password) {
        return BBBUser.findOne({username: username, password: password});
    }

    function findUserByFacebookId(facebookId) {
        return BBBUser.findOne({'facebook.id': facebookId});
    }
    
    function likeMovie(userId, mid) {
        return BBBUser.update({_id: userId}, {$addToSet: {movieLikes: mid}});
    }
    
    function unlikeMovie(userId, mid) {
        return BBBUser.update({_id: userId}, {$pullAll: {movieLikes: [mid]}});
    }

    function isLiked(userId, mid) {
        return BBBUser.findOne({_id: userId}, {$and: [{movieLikes: {$in: [mid]}}]});
    }

    function addFollower(userId, followerId) {
        return BBBUser.update({_id: userId}, {$addToSet: {followers: followerId}});
    }

    function addFollowing(userId, followingId) {
        return BBBUser.update({_id: userId}, {$addToSet: {following: followingId}});
    }

    function removeFollowing(userId, followingId) {
        return BBBUser.update({_id: userId}, {$pullAll: {following: followingId}});
    }

    function removeFollower(userId, followerId) {
        return BBBUser.update({_id: userId}, {$pullAll: {followers: followerId}});
    }
    
    function isFollowing(userId, followId) {
        return BBBUser.findOne({_id: userId, following: {$in: [followId]}});
    }
    
    function findAllFollowingUsers(userIds) {
        return BBBUser.find({_id: {$in: userIds}});
    }

    function findAllFollowers(userIds) {
        return BBBUser.find({_id: {$in: userIds}});
    }

    function updateUser(userId, user) {
        delete user._id;
        return BBBUser.update({_id: userId}, {$set: user});
    }

    function deleteUser(userId) {
        return BBBUser.remove({_id: userId});
    }

};