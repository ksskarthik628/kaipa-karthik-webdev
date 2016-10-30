(function () {
    angular
        .module('WebAppMaker')
        .factory('WebsiteService', WebsiteService);

    function WebsiteService($http) {

        var urlUser = "/api/user/";
        var urlWebsite = "/api/website/";

        var api = {
            createWebsite: createWebsite,
            findWebsitesByUser: findWebsitesByUser,
            findWebsiteById: findWebsiteById,
            updateWebsite: updateWebsite,
            deleteWebsite: deleteWebsite
        };
        return api;

        function createWebsite(userId, website) {
            return $http.post(urlUser + userId + "/website", website);
        }

        function findWebsitesByUser(userId) {
            return $http.get(urlUser + userId + "/website");
        }

        function findWebsiteById(websiteId) {
            return $http.get(urlWebsite + websiteId);
        }

        function updateWebsite(websiteId, website) {
            return $http.put(urlWebsite + websiteId, website);
        }
        
        function deleteWebsite(websiteId) {
            return $http.delete(urlWebsite + websiteId);
        }

    }
})();