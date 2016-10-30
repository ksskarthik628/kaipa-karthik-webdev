(function () {
    angular
        .module('WebAppMaker')
        .factory('PageService', PageService);

    function PageService($http) {

        var urlWebsite = "/api/website/";
        var urlPage = "/api/page/";

        var api = {
            createPage: createPage,
            findPagesByWebsiteId: findPagesByWebsiteId,
            findPageById: findPageById,
            updatePage: updatePage,
            deletePage: deletePage
        };
        return api;
        
        function createPage(websiteId, page) {
            return $http.post(urlWebsite + websiteId + "/page", page);
        }

        function findPagesByWebsiteId(websiteId) {
            return $http.get(urlWebsite + websiteId + "/page");
        }

        function findPageById(pageId) {
            return $http.get(urlPage + pageId);
        }

        function updatePage(pageId, page) {
            return $http.put(urlPage + pageId, page);
        }

        function deletePage(pageId) {
            return $http.delete(urlPage + pageId);
        }

    }
})();