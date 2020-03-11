//set the dimensions of the svg area
var margin = {top: 20, right: 20, bottom: 70, left: 40},
	width = 1080 - margin.left - margin.right,
	height = 900 - margin.top - margin.bottom;
	

	
//set the ranges
var x = d3.scaleLinear().range([0, width]);
var r = d3.scaleLinear().range([3, 8]);
var y = d3.scaleLinear().range([height, 0])
var color = d3.scaleOrdinal(d3["schemeCategory10"]);
	

//add the SVG element
var svg = d3.select("#dataContainer").append("svg")
	.attr("width", width + margin.left + margin.right)
	.attr("height", height + margin.top + margin.bottom)
    .append("g")
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");
	
//load the data
var cars;			//define the cars object
d3.json("./cars_dataset.json").then(function(data)
{
	cars = data;		//load data into cars object
	var year = [];		//empty array for holding the year of cars
	var cylinders=[];	//empty array for holding the cylinder number of cars
	var mpg = [];		//empty array for holding the mpg for cars
	var weight = [];	//empty array for holding the weight of cars
	var origin = [];	//empty array for holding the origin of cars
	
	
	var bmw = data.filter(d => d.Model == "bmw 2002");	//first find the car we are comparing all other cars to
	
	var carData = data.filter(d => d.Model != "bmw 2002");	//then find all cars that are NOT the car we are coparing to
	
	for(var i = 0; i < carData.length; i++)		//loop through array of car objects
	{
			year = carData[i].Year;				//store the attributes of each car object in separate variables
			cylinders = carData[i].Cylinders;
			mpg = carData[i].MPG;
			weight = carData[i].Weight;
			origin = carData[i].Origin;
		
	}
}
			
		
		//set the domains for the x and y variables
		x.domain([0, d3.max(carData.map(d => d.MPG))]);
		y.domain([0, d3.max(carData.map(d => d.Acceleration))]);
		
		r.domain([0, d3.max(carData.map(d => d.Horsepower))]);
		
		svg.append("g")
		.attr("transform", "translate(0," + height + ")")
		.call(d3.axisBottom(x).ticks())
		
		svg.append("g")
			.call(d3.axisLeft(y));
	  
		svg.selectAll("dot")
		  .data(data)
		.enter().append("circle")
		  .attr("r", function(d) {
			  if(d.Model=="bmw 2002") 
				  return 12;
			else
				  return r(d.Horsepower);
			  })
		  .attr("cx", function(d) { return x(d.MPG); })
		  .attr("cy", function(d) { return y(d.Acceleration); })
		  .attr("fill", function(d) { 
		  if(d.Model=="bmw 2002") 
				  return "yellow";
			else
				return color(d.Cylinders); });
 
})