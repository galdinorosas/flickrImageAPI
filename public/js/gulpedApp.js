!function t(a,i,e){function o(n,s){if(!i[n]){if(!a[n]){var l="function"==typeof require&&require;if(!s&&l)return l(n,!0);if(r)return r(n,!0);var p=new Error("Cannot find module '"+n+"'");throw p.code="MODULE_NOT_FOUND",p}var c=i[n]={exports:{}};a[n][0].call(c.exports,function(t){var i=a[n][1][t];return o(i?i:t)},c,c.exports,t,a,i,e)}return i[n].exports}for(var r="function"==typeof require&&require,n=0;n<e.length;n++)o(e[n]);return o}({1:[function(t,a,i){$(document).ready(function(){function t(t,a){$(".imageArea").empty(),$.get("https://api.flickr.com/services/rest/",{method:"flickr.photos.search",api_key:"080047a6f8b1c7aba461cb0f76ec0796",per_page:"52",page:a,text:t,format:"json",nojsoncallback:"1"},function(t){e=t.photos.pages,o(e);var a=parseInt(t.photos.total);if(0===a)$(".imageArea").append("<p class='zeroImages'>No available images for current search.</p>");else for(var i=0;52>i;i++){var r=(t.photos.photo[i].owner,t.photos.photo[i].title.substring(0,25)),n=t.photos.photo[i].title.substring(25,50),s=t.photos.photo[i].title.substring(50,75),l="https://farm"+t.photos.photo[i].farm+".staticflickr.com/"+t.photos.photo[i].server+"/"+t.photos.photo[i].id+"_"+t.photos.photo[i].secret+"_n.jpg";$(".imageArea").append("<a href='"+l+"' target='_blank' id='imageContainer' class='imageLink' > <h1 class='linkTitle'>"+r+" </br> "+n+" </br> "+s+" ...</h1> <img class='flickrImage' src="+l+"></img></a>")}})}function a(t){var a=parseInt(t);if(4>a){$("ul").empty();for(var i=1;6>i;i++)$("ul").append("<li id='pageLinks'><a href='#top'>"+i+"</a></li>");$("ul li:nth-child("+t+")").addClass("active"),o(e)}else if(a>7){$("ul").empty();for(var i=6;11>i;i++)$("ul").append("<li id='pageLinks'><a href='#top'>"+i+"</a></li>");$("ul li:nth-child("+(t-5)+")").addClass("active"),o(e)}else{$("ul").empty();for(var i=-2;3>i;i++){var r=a+i;$("ul").append("<li id='pageLinks'><a class='active' href='#top'>"+r+"</a></li>")}$("ul li:nth-child(3)").addClass("active"),o(e)}}var i=10,e=0,o=function(t){if(!(t>=i))for(var a=1;6>a;a++)for(var o=$("ul li:nth-child("+a+")").text(),r=parseInt(o),n=10;n>e;n--)r===n&&($("ul li:nth-child("+a+")").addClass("disabled"),$("ul li:nth-child("+a+") a").unbind("click"))};$("ul").on("click","a",function(i){if(!$("ul li").hasClass("disabled")){var e=$(this).text();t(r,e),a(e)}});var r,n=function(){$(".imageArea").empty(),$("ul").empty(),r=$("#topBarSearch").val(),t(r,1);for(var a=1;6>a;a++)$("ul").append("<li id='pageLinks'><a href='#top'>"+a+"</a></li>");$("#pageLinks:nth-child(1)").addClass("active")},s=function(){$(".introContentContainer").css("display","none"),$(".topBarContainer, .imageArea, .bottomBarContainer, #positioning, #topPaginationLinks").css("display","inline-block"),r=$(".introSearch").val(),t(r,1),$("#pageLinks:nth-child(1)").addClass("active")};$("#topBarSubmit").on("click",function(){n()}),$("#topBarSearch").keypress(function(t){13==t.which&&n()}),$(".introSearch").keypress(function(t){13==t.which&&s()}),$(".introSubmit").on("click",function(){s()})})},{}]},{},[1]);