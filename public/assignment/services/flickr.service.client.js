(function () {
    angular
        .module('WebAppMaker')
        .factory('FlickrService', FlickrService);
    
    function FlickrService($http) {

        var key = "775c38b0ad260f2f3192be99da822f2c";
        var urlBase = "https://api.flickr.com/services/rest/?method=flickr.photos.search&format=json&api_key=API_KEY&text=TEXT";

        var api = {
            searchPhotos: searchPhotos
        };
        return api;

        function searchPhotos(searchText) {
            var url = urlBase.replace("API_KEY", key).replace("TEXT", searchText);
            return $http.get(url);
        }

    }
})();