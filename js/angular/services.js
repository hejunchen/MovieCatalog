/**
 * Created by hejchen on 7/23/2015.
 */
app.service("MovieService", ['$http', '$q', function($http, $q){

    //define the function to read the movie list json
    var getMovieList = function(page_number, limit, query_term){

        var deferred = $q.defer();
        var movieList = [];
        var url = "https://yts.io/api/v2/list_movies.json?";

        if (page_number == undefined || page_number == null)
        {
            page_number = 1;
        }
        url += "page=" + page_number;

        if (limit == undefined || limit == null)
        {
            limit = 20;
        }
        url += "&limit=" + limit;

        if (query_term == undefined || query_term == null || query_term == '') {
            query_term = '';
        } else {
            url += "&query_term=" + query_term;
        }

        url += "&sort_by=date_added";

        console.log("Movie List JSON: " + url);

        //make ajax call to get json of movie list
        $.getJSON(url)
            .success(function(data){
                movieList = data;
                deferred.resolve(movieList);
                console.log("Got movie list, count: " + movieList.data.movies.length + " out of " + movieList.data.movie_count);
            })
            .error(function(data){
                alert('error: ' + JSON.stringify(data));
                movieList = data;
                deferred.resolve(movieList);
            });

        return deferred.promise;

    };

    var getMovieDetails = function(movie_id){

        var deferred = $q.defer();
        var movieDetails = null;
        var url = "https://yts.io/api/v2/movie_details.json?movie_id=" + movie_id;
        console.log("Movie List JSON: " + url);

        //make ajax call to get json of movie details for a give movie id
        $.getJSON(url)
            .success(function(data){
                movieDetails = data;
                deferred.resolve(movieDetails);
                console.log("Got movie list json returned successfully");
            })
            .error(function(data){
                alert('error: ' + JSON.stringify(data));
                movieDetails = data;
                deferred.resolve(movieDetails);
            });

        return deferred.promise;
    };

    return {
        GetMovieList: getMovieList,
        GetMovieDetails: getMovieDetails
    };

}]);