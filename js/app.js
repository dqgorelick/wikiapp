function getting(){
	$("#response").html("<h2>loading</h2>");
	var req = new XMLHttpRequest();
	req.onload = function(){
		$("#response").html(req.response);
	}
	req.open("GET","/api",true);
	req.send();
}