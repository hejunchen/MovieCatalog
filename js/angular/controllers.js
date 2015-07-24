/**
 * Created by hejchen on 7/23/2015.
 */
app.controller("MovieController", function($scope, $http, MovieService){


    //define the initialization function
    $scope.Initialization = function(){

        //define and initialize the properties
        $scope.RawData = null;

        $scope.ViewModel = {
            MovieList: null,
            SelectedMovie: null,
            Page: {
                CurrentPageNo: 1,
                IsFirst: true,
                IsLast: false,
                Pagination: {
                    GoToFirst:      function () { if($scope.ViewModel.Page.CurrentPageNo == 1) return false; else $scope.Action.LoadMovieList(1); },
                    GoToPrevious:   function () { if($scope.ViewModel.Page.CurrentPageNo == 1) return false; else $scope.Action.LoadMovieList($scope.ViewModel.Page.CurrentPageNo - 1); },
                    GoToNext:       function () { if($scope.ViewModel.Page.CurrentPageNo == $scope.ViewModel.TotalNumOfPages) return false; else $scope.Action.LoadMovieList($scope.ViewModel.Page.CurrentPageNo + 1); },
                    GoToLast:       function () { if($scope.ViewModel.Page.CurrentPageNo == $scope.ViewModel.TotalNumOfPages) return false; else $scope.Action.LoadMovieList($scope.ViewModel.TotalNumOfPages); }
                }
            },
            IsLoading: false,
            LimitPerPage: null,
            TotalNumOfPages: null,
            TotalMovieCount: null
        };

        $scope.Action = {
            LoadMovieList: function(page_number){

                $scope.ViewModel.IsLoading = true;
                //$.blockUI();

                MovieService.GetMovieList(page_number, $scope.ViewModel.LimitPerPage)
                            .then(function(data){
                                $scope.RawData = data;
                                SetProperties(data);
                                $scope.ViewModel.IsLoading = false;

                                //$.unblockUI();
                });
            },
            LoadMovie: function(movie_id){
                $scope.ShowLoadingAnimation = true;
                MovieService.GetMovieDetails(movie_id).then(function(data){
                    $scope.CurrentMovieDetails = data;
                    $scope.ShowLoadingAnimation = false;
            })},
            GetImageTooltip: function(imageUrl) {
                return overlib("<img class='thumbnail' width=150em src='" + imageUrl + "' border=2>");
            }
        };




    };


    //private functions

    var GetTotalPageNumber = function(totalCount, limit){
        var remaining = parseInt(totalCount) % parseInt(limit);
        var numOfPages = (parseInt(totalCount) - remaining) / parseInt(limit);
        if (remaining > 0)
            numOfPages += 1;
        return numOfPages;
    };

    var SetProperties = function(jsonData){

        $scope.RawData = jsonData;
        $scope.ViewModel.MovieList = $scope.RawData.data.movies;
        $scope.ViewModel.Page.CurrentPageNo = $scope.RawData.data.page_number;
        $scope.ViewModel.LimitPerPage = $scope.RawData.data.limit;
        $scope.ViewModel.TotalMovieCount = $scope.RawData.data.movie_count;

        $scope.ViewModel.TotalNumOfPages = GetTotalPageNumber($scope.ViewModel.TotalMovieCount, $scope.ViewModel.LimitPerPage);

        if($scope.ViewModel.Page.CurrentPageNo < 1)
            $scope.ViewModel.Page.CurrentPageNo = 1;
        if($scope.ViewModel.Page.CurrentPageNo > $scope.ViewModel.TotalNumOfPages)
            $scope.ViewModel.Page.CurrentPageNo = $scope.ViewModel.TotalNumOfPages

        $scope.ViewModel.Page.IsFirst = ($scope.ViewModel.Page.CurrentPageNo == 1);
        $scope.ViewModel.Page.IsLast = ($scope.ViewModel.Page.CurrentPageNo == $scope.ViewModel.TotalNumOfPages);


    };

});