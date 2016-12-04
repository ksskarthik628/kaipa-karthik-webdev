(function () {

    angular
        .module('BBBApp')
        .factory('MovieService', MovieService);

    function MovieService($http) {

        var addMovieUrl = "/bbb/movie";

        var TMDKey = "6f081b3289041063cec304a78e9c00a5";
        var baseUrl = "http://api.themoviedb.org/3/SEARCH_PARAM?api_key=API_KEY&language=en";

        var popularSearch = "discover/movie";
        var popularSort = "&sort_by=popularity.desc";
        var popularPage = "&page=PAGE";

        var similarMovies = "movie/MOVIE_ID/similar";

        var topMovies = "movie/top_rated";

        var upcomingMovies = "movie/upcoming";

        var genreList = "genre/movie/list";

        var getImage = "http://image.tmdb.org/t/p/original/";

        var movieCredits = "movie/MOVIE_ID/credits";

        var movieDetails = "movie/MOVIE_ID";

        var movieSearch = "search/movie";
        var movieName = "&query=TITLE";
        var moviePage = "&page=PAGE";

        var movieVideos = "movie/MOVIE_ID/videos";

        var youtubeEmbed = "https://www.youtube.com/embed/KEY";

        var currentMovies = "movie/now_playing";

        var movieReviews = "movie/MOVIE_ID/reviews";

        var api = {
            addMovie: addMovie,
            findPopularMovies: findPopularMovies,
            findSimilarMovies: findSimilarMovies,
            findTopMovies: findTopMovies,
            findUpcomingMovies: findUpcomingMovies,
            getGenreList: getGenreList,
            getImageUrl: getImageUrl,
            getMovieCredits: getMovieCredits,
            getMovieDetailsById: getMovieDetailsById,
            getMoviesByTitle: getMoviesByTitle,
            getVideoKey: getVideoKey,
            getYoutubeEmbed: getYoutubeEmbed
        };
        return api;

        function addMovie(movie) {
            return $http.post(addMovieUrl, movie);
        }
        
        function findPopularMovies(page) {
            var url = baseUrl
                .replace("SEARCH_PARAM", popularSearch)
                .replace("API_KEY", TMDKey)
                + popularSort
                + popularPage.replace("PAGE", page);
            return $http.get(url);
        }
        
        function findSimilarMovies(movieId) {
            var url = baseUrl
                .replace("SEARCH_PARAM", similarMovies)
                .replace("API_KEY", TMDKey)
                .replace("MOVIE_ID", movieId);
            return $http.get(url);
        }
        
        function findTopMovies() {
            var url = baseUrl
                .replace("SEARCH_PARAM", topMovies)
                .replace("API_KET", TMDKey);
            return $http.get(url);
        }

        function findUpcomingMovies() {
            var url = baseUrl
                .replace("SEARCH_PARAM", upcomingMovies)
                .replace("API_KET", TMDKey);
            return $http.get(url);
        }
        
        function getGenreList() {
            var url = baseUrl
                .replace("SEARCH_PARAM", genreList)
                .replace("API_KET", TMDKey);
            return $http.get(url);
        }

        function getImageUrl() {
            return getImage;
        }

        function getMovieCredits(movieId) {
            var url = baseUrl
                .replace("SEARCH_PARAM", movieCredits)
                .replace("API_KEY", TMDKey)
                .replace("MOVIE_ID", movieId);
            return $http.get(url);
        }
        
        function getMovieDetailsById(movieId) {
            var url = baseUrl
                .replace("SEARCH_PARAM", movieDetails)
                .replace("API_KEY", TMDKey)
                .replace("MOVIE_ID", movieId);
            return $http.get(url);
        }
        
        function getMoviesByTitle(movieTitle, page) {
            var url = baseUrl
                .replace("SEARCH_PARAM", movieSearch)
                .replace("API_KEY", TMDKey)
                + movieName.replace("TITLE", movieTitle)
                + moviePage.replace("PAGE", page);
            return $http.get(url);
        }

        function getVideoKey(movieId) {
            var url = baseUrl
                .replace("SEARCH_PARAM", movieVideos)
                .replace("API_KEY", TMDKey)
                .replace("MOVIE_ID", movieId);
            return $http.get(url);
        }
        
        function getYoutubeEmbed(key) {
            var url = youtubeEmbed
                .replace("KEY", key);
            return url;
        }

    }

})();