
function getting(){
	$("#response").html("<h2>loading</h2>");

	$.ajax({
		url: '/api',
		success: function(data){
			var results = data;
			$("#response").html(results);
		}
	});

	// var url = "/api";
	// var req = new XMLHttpRequest();
	// req.onload = function(){
	// 	$("#response").html(req.response);
	// }
	// req.open("GET", url, true);
	// req.send();
}