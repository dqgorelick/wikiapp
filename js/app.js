
function getting(){
	$("#response").html("<h2>loading</h2>");

	$.ajax({
		url: '/api',
		success: function(data){
			var results = JSON.parse(data);
			console.log(results);
      render(results);
			$("#response").html(" ");
		}
	});
}

function render(data){
  var w = 500;
  var h = data.length*20;
  var width_factor = 4;
  var padding = 2;
  var dataset = [5, 10, 13, 19, 25, 11, 25, 22, 18, 7];

  var svg = d3.select("body").append("svg").attr("width", w).attr("height", h);

  svg.selectAll("rect").data(data).enter().append("rect").attr({
    x: 0,
    y: function(d, i) {
      return i * h/data.length;
    },
    height: h / data.length - padding,
    width: function(d) {
      return d.count * width_factor;
    },
    fill: function(d) {
      return "rgb(" + d.count * 10 + ", 0, 0)";
    }
  });

  svg.selectAll("text").data(data).enter().append("text").text(function(d) {
    return d.count + " " + d.title;
  }).attr({
    "text-anchor": "left",
    y: function(d, i) {
      return (i+0.75) * (h / data.length);
    },
    x: function(d) {
      return d.count * width_factor;
    },
    "font-family": "sans-serif",
    "fill": "#000000"
  });
}
