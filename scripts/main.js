$(document).ready(function() {
    retrieveData();
});

var wideText =      '<li class="feedItem row">' +
                    '<div class="post-image col-2">\n' +
                    '<a href=""><img src="" alt="No Image" /></a>\n' +
                    '<\/div>\n' +
                    '<div class="post-details col-10">\n' +
                    '<h2 class="post-title"><a href="">a<\/a></h2>\n' +
                    '<span class="post-author"><a href="">Post Author<\/a></span>\n' +
                    '<span class="post-published">Published <span class="date"></span> at <span class="time"></span><\/span>\n' +
                    '<span class="post-link"><a href="">View on Flickr<\/a></span>\n' +
                    '<\/div>\n' +
                    '</li>';

var thinText =      '<li class="feedItem row">\n' +
                    '<div class="post-image col-2">\n' +
                    '<a href=""><img src="" alt="No Image" /></a>\n' +
                    '</div>\n' +
                    '<div class="post-details col-10">\n' +
                    '<h2 class="post-title"><a href=""></a></h2>\n' +
                    '<span class="post-published">Published <span class="date"></span> at <span class="time"></span><\/span><br />\n' +
                    '<span class="post-author"><a href="">Post Author</a></span>\n' +
                    '<span class="post-link"><a href="">View on Flickr</a></span>\n' +
                    '</div>\n' +
                    '</li>';

function retrieveData() {
    var width = $(window).width();
    var url = "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?&tags=space&tagmode=all&format=json";
    $.getJSON(url, {}, function(data) {
        var items = data.items;
        $.each(items, function(index, value) {
            var newIndex = parseInt(index) + 1;
            if(width < 800) {
                $("#feed ul").append(thinText);
                $(".row").css("height", "40vh");
            } else {
                $("#feed ul").append(wideText);
            }
            var postLink = "";
            /* Set variable as link for post. */
            $("#feed ul li:nth-child(" + newIndex + ") img").attr("src", value["media"]["m"]);
            $("#feed ul li:nth-child(" + newIndex + ") a").attr("href", postLink);
            $("#feed ul li:nth-child(" + newIndex + ") .post-title a").text(value["title"]).attr("href", postLink);
            var author = "https://www.flickr.com/photos/" + value['author_id'];
            $("#feed ul li:nth-child(" + newIndex + ") .post-author a").attr("href", author);
            $("#feed ul li:nth-child(" + newIndex + ") .post-link a").attr("href", value["link"]);
            var date = value["published"].substring(0, 10);
            var time = value["published"].substring(11, 16);
            $("#feed ul li:nth-child(" + newIndex + ") .post-published .date").text(date);
            $("#feed ul li:nth-child(" + newIndex + ") .post-published .time").text(time);
        });
    });
}