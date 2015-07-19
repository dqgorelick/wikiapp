var fs 				= require('fs');
var request 		= require('request')
var cheerio		 	= require('cheerio');
var _ 				= require('underscore');
var express 		= require('express');
var app 			= express();
var port 			= 8000;

/**********************
	Server
**********************/
app.use('/', express.static(__dirname+'/'));

app.get('/api', function(req, res){
	getData("https://en.wikipedia.org/wiki/NASA",function(data){
		res.send(data);
	})
});

app.listen(port, function(){
	console.log("Listening on port " + port);
});

/**********************
	Wiki Proxy
**********************/
var getData = function(url, cb){
	request(url, function(err, response, data){
		if (err) console.log(err);
		if (!err && response.statusCode == 200){
			$ = cheerio.load(data);
			var filtered = [];
			var checking = [];
			var links = $('#bodyContent p a');
			var body = $('#mw-content-text').children('p').text();
			var page = $("h1").text();
			console.log("Requested " + page + "...");
			links.each(function(index, link){
				var result = {};
				result.title = $(link)[0].attribs.title;
				if ($(link)[0].attribs.title !== undefined){
					if (checking.indexOf(result.title) === -1) {
						var occurences = getCount($(link).text(), body);
						if (occurences > 0) {
							result.count = occurences;
						}
						filtered.push(result);
						// find a better way to do this w/o creating another array
						checking.push(result.title);
					}
				}
			})
			filtered.push({title:page,count:getCount(page, body)})
			// console.log(getCount(page, body) + " >>>> " + page);
			// console.log("There were " + filtered.length + " links.");

			var ordered = _.sortBy(filtered, function(it){return -it.count});
			var dataToSend = JSON.stringify(ordered);
			cb(dataToSend);
			console.log("SENT " + filtered.length + " links\n");
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
