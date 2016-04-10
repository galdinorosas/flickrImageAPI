$(document).ready(function() {

    var MAXPAGES = 10;
    var flickrResultsTotalPages = 0;

    /**
     *  Function that disables the pagination number link if the searched total page number is less than 10.
     *  @param {number} totalPageNumber - This is the total Page number from flickr API get call.
     */
    var disablePagination = function(totalPageNumber) {
        
        /**
         *  This if statements checks if totalPageNumber parameter is greater than or equal to MAXPAGES.
         */
        if (totalPageNumber >= MAXPAGES) {
            return;
        } else {
            var disableAmount = MAXPAGES - totalPageNumber;

            for (var i = 1; i < 6; i++) {
                var number = $("ul li:nth-child(" + i + ")").text();
                var numberInt = parseInt(number);
                for (var k = 10; k > flickrResultsTotalPages; k--) {
                    if (numberInt === k) {
                        $("ul li:nth-child(" + i + ")").addClass('disabled');
                        $("ul li:nth-child(" + i + ") a").unbind('click');
                    }
                }
            }
        }
    };

    /**
     *  Function that waits for the click event on the pagination page links. This function uses
     *  the flickrSearch and paginationUpdate functions.
     */

    $("ul").on('click', 'a', function(event) {

        if ($('ul li').hasClass('disabled')) {
            return;
        } else {
            var selected = $(this).text();
            flickrSearch(userSearch, selected);
            paginationUpdate(selected);
        }
    });

    /**
     *  Function that performs a get request to Flickr api. This also appends the images to the imagearea div.
     *  @param {string} topic - This is string used for the Flickr API search.
     *  @param {number} pageNumber - This is the requested page number from Flickr API.
     */
    function flickrSearch(topic, pageNumber) {
        $(".imageArea").empty();

        $.get("https://api.flickr.com/services/rest/", {
            method: "flickr.photos.search",
            api_key: "080047a6f8b1c7aba461cb0f76ec0796",
            per_page: "52",
            page: pageNumber,
            text: topic,
            format: "json",
            nojsoncallback: "1"

        }, function(results) {
            flickrResultsTotalPages = results.photos.pages;


            disablePagination(flickrResultsTotalPages);
            var imageTotal = parseInt(results.photos.total);

            /**
             *  This if statement will display a message if the total image results is zero. If the image results
             *  is greater than zero then the images will be displayed to the imageArea div.
             */
            if (imageTotal === 0) {
                $(".imageArea").append("<p class='zeroImages'>No Available Images For Current Search</p>");

            } else {

                for (var i = 0; i < 52; i++) {

                    var userID = results.photos.photo[i].owner;

                    var photoTitle1 = results.photos.photo[i].title.substring(0, 25);
                    var photoTitle2 = results.photos.photo[i].title.substring(25, 50);
                    var photoTitle3 = results.photos.photo[i].title.substring(50, 75);

                    var userLink = "https://www.flickr.com/people/" + userID + "/";

                    var url = "https://farm" + results.photos.photo[i].farm + ".staticflickr.com/" + results.photos.photo[i].server + "/" + results.photos.photo[i].id + "_" + results.photos.photo[i].secret + "_n.jpg";

                    $(".imageArea").append("<a href='" + url + "' target='_blank' id='imageContainer' class='imageLink' > <h1 class='linkTitle'>" + photoTitle1 + " </br> " + photoTitle2 + " </br> " + photoTitle3 + " ...</h1> <img class='flickrImage' src=" + url + "></img></a>");
                }
            }
        });
    }

    /**
     *  Function that updates the pagination bars numbers. The selected page number will always be centered
     *  on the middle of the pagination bar unless its at the end of the MAXPAGES alotment.
     *  @param {string} pageNumber - The pagination seleceted page number.
     */

    function paginationUpdate(pageNumber) {
        var selectedPage = parseInt(pageNumber);

        if (selectedPage < 4) {
            $("ul").empty();

            for (var i = 1; i < 6; i++) {
                // var string = i.toString();
                $("ul").append("<li id='pageLinks'><a href='#top'>" + i + "</a></li>");
            }
            $("ul li:nth-child(" + pageNumber + ")").addClass("active");

            disablePagination(flickrResultsTotalPages);

        } else if (selectedPage > 7) {
            $("ul").empty();

            for (var i = 6; i < 11; i++) {
                $("ul").append("<li id='pageLinks'><a href='#top'>" + i + "</a></li>");
            }
            $("ul li:nth-child(" + (pageNumber - 5) + ")").addClass("active");
            disablePagination(flickrResultsTotalPages);
        } else {

            $("ul").empty();

            for (var i = -2; i < 3; i++) {
                var sidePage = selectedPage + i;
                $("ul").append("<li id='pageLinks'><a class='active' href='#top'>" + sidePage + "</a></li>");
            }
            $("ul li:nth-child(3)").addClass("active");
            disablePagination(flickrResultsTotalPages);
        }
    }
    /**
     *  Function that resets the imageArea div and ul pagination numbers when a user searches from the top bar.
     */
    var topBarSearchReset = function() {
        $(".imageArea").empty();
        $("ul").empty();

        userSearch = $("#topBarSearch").val();

        flickrSearch(userSearch, 1);

        for (var i = 1; i < 6; i++) {
            $("ul").append("<li id='pageLinks'><a href='#top'>" + i + "</a></li>");
        }

        $("#pageLinks:nth-child(1)").addClass("active");
    };

    /**
     *  Function that hides the intro container and displays the "next page" elements when the user searches from the intro page.
     */
    var introSearchReset = function() {
        $(".introContentContainer").css("display", "none");
        $(".topBarContainer, .imageArea, .bottomBarContainer, #positioning, #topPaginationLinks").css("display", "inline-block");

        userSearch = $(".introSearch").val();

        flickrSearch(userSearch, 1);
        $("#pageLinks:nth-child(1)").addClass("active");
    };

    var userSearch;

    /**
     *  Top bar search event handlers that wait for click or enter keypress.
     */
    $("#topBarSubmit").on("click", function() {
        topBarSearchReset();
    });

    $("#topBarSearch").keypress(function(event) {
        if (event.which == 13) {
            topBarSearchReset();
        }
    });

    /**
     *  Intro search event handlers that wait for click or enter keypress.
     */
    $(".introSearch").keypress(function(event) {
        if (event.which == 13) {
            introSearchReset();
        }
    });

    $(".introSubmit").on("click", function() {
        introSearchReset();
    });

});
