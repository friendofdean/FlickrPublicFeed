$(document).ready(function() {
    retrieveData();
});

var wideText =      '<li class="feedItem row">' +
                    '<div class="post-image col-2">\n' +
                    '<img src="img/Connor.png" alt="No Image" />\n' +
                    '<\/div>\n' +
                    '<div class="post-details col-10">\n' +
                    '<h2 class="post-title"><a href="">a<\/a></h2>\n' +
                    '<span class="post-author"><a href="">Post Author<\/a></span>\n' +
                    '<span class="post-published">Published <span class="date"></span> at <span class="time"></span><\/span>\n' +
                    '<span class="post-link"><a href="">View on Flickr<\/a></span>\n' +
                    '<\/div>' +
                    '</li>';

var thinText =  '<li class="feedItem">\n' +
                    '<div class="post-image col-3">' +
                        '<img  src="img/Connor.png" alt="No Image" />' +
                    '</div>' +
                    '<div class="post-details col-10">' +
                        '<h2 class="post-title"><a href=""></a></h2>' +
                    '<span class="post-published">Published <span class="date"></span> at <span class="time"></span><\/span>\n' +
                        '<span class="post-author"><a href="">Post Author</a></span>' +
                        '<span class="post-link"><a href="">View on Flickr</a></span>' +
                    '</div>' +
                '</li>';

function retrieveData() {
    var url = "https://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?&tags=space&tagmode=all&format=json";
    $.getJSON(url, {}, function(data) {
        var items = data.items;
        console.log(items);
        $.each(items, function(index, value) {
//            alert("test");
            var newIndex = parseInt(index) + 1;
            $("#feed ul").append(wideText);
            $("#feed ul li:nth-child(" + newIndex + ") img").attr("src", value["media"]["m"]);
            var postLink = "";
            /* Set variable as link for post. */
            $("#feed ul li:nth-child(" + newIndex + ") .post-title a").text(value["title"]).attr("href", postLink);
            var author = "https://www.flickr.com/photos/" + value['author_id'];
            $("#feed ul li:nth-child(" + newIndex + ") .post-author a").attr("href", author);
            $("#feed ul li:nth-child(" + newIndex + ") .post-link a").attr("href", value["link"]);
            var date = value["published"].substring(0, 10);
            var time = value["published"].substring(11, 16);
            $("#feed ul li:nth-child(" + newIndex + ") .post-published .date").text(date);
            $("#feed ul li:nth-child(" + newIndex + ") .post-published .time").text(time);
            
            console.log(value);
            
        });
    });
}