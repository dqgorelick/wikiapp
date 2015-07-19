var fs 				= require('fs');
var request 		= require('request')
var cheerio		 	= require('cheerio');
var _ 				= require('underscore');


var getData = function(url){
	request(url, function(err, response, data){
		if (err) console.log(err);
		if (!err && response.statusCode == 200){
			console.log("hello")
			$ = cheerio.load(data);
			var filtered = [];
			var links = $('#bodyContent p a');
			var body = $('#mw-content-text').children('p').text();
			var page = $("h1").text();

			console.log("          ")
			console.log("NEW BATCH:")
			console.log("          ")

			links.each(function(index, link){
				var title = $(link).text();
				if ($(link)[0].attribs.title !== undefined){
					// if (_.contains(filtered, title) === false){
					if (filtered.indexOf(title) === -1) {
						filtered.push(title);
						var occurences = getCount($(link).text(), body);
						if (occurences > 0) {
							console.log(occurences + " >>>> " + $(link)[0].attribs.title );
						}
					}
				}
			})

			console.log(getCount(page, body) + " >>>> " + page);
			console.log("There were " + filtered.length + " links.");

			var query = new RegExp('\\b'+page+'\\b',"gi");
			console.log("page title: " + page)
			console.log("RegExp " + query);
		}
	});
}

var getCount = function(regexp, string){
	var query = new RegExp('\\b'+regexp+'\\b',"gi");
	var matches = 0;
	while(query.exec(string)) {
		matches++;
	}
	return matches;
};

getData("https://en.wikipedia.org/wiki/NASA");