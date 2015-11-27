$(document).ready( function(){


	function flickrSearch(topic,start,stop){

		$.get( "https://api.flickr.com/services/rest/",{
			method:"flickr.photos.search",
			api_key: "080047a6f8b1c7aba461cb0f76ec0796",
			per_page: "260",
			text: topic,
			format: "json",
			nojsoncallback: "1"

		}, function(results){



			for( var i = start; i< stop;i++){

				var userID = results.photos.photo[i].owner;

				var photoTitle1 = results.photos.photo[i].title.substring(0,25);
				var photoTitle2 = results.photos.photo[i].title.substring(25,50);
				var photoTitle3 = results.photos.photo[i].title.substring(50,75);

				var userLink = "https://www.flickr.com/people/"+userID+"/"

				var url="https://farm"+results.photos.photo[i].farm+".staticflickr.com/"+results.photos.photo[i].server+"/"+results.photos.photo[i].id+"_"+results.photos.photo[i].secret+"_n.jpg";

				$(".imageArea").append("<a href='"+userLink+"' target='_blank' id='imageContainer' class='imageLink' > <h1 class='linkTitle'>"+photoTitle1+" </br> "+photoTitle2+" </br> "+photoTitle3+" ...</h1> <img class='flickrImage' src="+url+"></img></a>");



			};


		});



	};

	var userSearch;



	$("#topBarSubmit").on("click", function(){


		$(".imageArea").empty();

		userSearch = $("#topBarSearch").val();

		flickrSearch(userSearch, 0, 52);
		$("#firstPage").addClass("active");
		$("#secondPage, #thirdPage, #fourthPage, #fifthPage").removeClass("active");


	});

	$("#topBarSearch").keypress(function(event) {
	    if (event.which == 13) {

	    	$(".imageArea").empty();

			userSearch = $("#topBarSearch").val();

			flickrSearch(userSearch, 0, 52);
		$("#firstPage").addClass("active");
		$("#secondPage, #thirdPage, #fourthPage, #fifthPage").removeClass("active");

	    }
	});

	$(".introSearch").keypress(function(event) {
	    if (event.which == 13) {

	    	$(".introContentContainer").css("display","none");
	    	$(".topBarContainer,.imageArea, #bottomBarContainer, #positioning").css("display","block");

			userSearch = $(".introSearch").val();

			flickrSearch(userSearch, 0 , 52);

	    }
	});

	$(".introSubmit").on("click", function(){


    	$(".introContentContainer").css("display","none");
    	$(".topBarContainer,.imageArea, #bottomBarContainer, #positioning").css("display","block");
		userSearch = $(".introSearch").val();

		flickrSearch(userSearch, 0, 52);
	});


	$("#firstPage").on("click",function(){
		$(".imageArea").empty();
		flickrSearch(userSearch, 0, 52);
		$("#firstPage").addClass("active");
		$("#secondPage, #thirdPage, #fourthPage, #fifthPage").removeClass("active");
	});

	$("#secondPage").on("click",function(){
		$(".imageArea").empty();
		flickrSearch(userSearch, 52, 104);
		$("#secondPage").addClass("active");
		$("#firstPage, #thirdPage, #fourthPage, #fifthPage").removeClass("active");

	});

	$("#thirdPage").on("click",function(){
		$(".imageArea").empty();
		flickrSearch(userSearch, 104, 156);
		$("#thirdPage").addClass("active");
		$("#firstPage, #secondPage, #fourthPage, #fifthPage").removeClass("active");

	});

	$("#fourthPage").on("click",function(){
		$(".imageArea").empty();
		flickrSearch(userSearch, 156, 208);
		$("#fourthPage").addClass("active");
		$("#firstPage, #secondPage, #thirdPage, #fifthPage").removeClass("active");

	});

	$("#fifthPage").on("click",function(){
		$(".imageArea").empty();
		flickrSearch(userSearch, 208, 260);
		$("#fifthPage").addClass("active");
		$("#firstPage, #secondPage, #thirdPage, #fourthPage").removeClass("active");

	});



	

});