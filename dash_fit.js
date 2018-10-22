/**
 *
 */
// var colorBars   = dc.barChart("#picker");        
// var table2      	= 		dc.dataTable(".dc-data-table");
var table2      	= 		dc.dataTable('#my_table')

var acc1Bars		= 		dc.barChart("#acc1_histog"); 
// var composite = dc.barChart("#acc1_histog");
// var composite = dc.compositeChart("#acc1_histog");

var speed1Bars		= 		dc.barChart("#speed1_histog");
var acc2Bars		= 		dc.barChart("#acc2_histog");  
var speed2Bars		= 		dc.barChart("#speed2_histog"); 
var powerBars		= 		dc.barChart("#power_histog");
var agilityBars		= 		dc.barChart("#agility_histog"); 
var enduranceBars	= 		dc.barChart("#endurance_histog"); 

var myCharts = [acc1Bars, speed1Bars, acc2Bars, speed2Bars, enduranceBars, powerBars, agilityBars];
// chartClass = {
// 	html_element_id, column_name, extent, 
// }
// var colHeaders;
var jqtable;
var xdata;
var data_props;
var columns     = ["Name",
					"Pos",
					"Acc1",
					"Speed1", 
					"Acc2",
					"Speed2",
					"Endurance",
					"Power",
					"Agility"
					];

/*function makeChart(chart, col, xdata, extent, width, num, labelx) {
	var f   =   function(d) {return d[col];},
		dim =   xdata.dimension(f),
		grp = dim.group(function(d){ return Math.floor(d/width)*bin_width; });
			   
	chart
		// .height(255)
		.x(d3.scaleLinear().domain(extent))
		.xUnits(function(){return num;}) 
		.xAxisLabel(labelx)
		.yAxisLabel("Count")
		.dimension(dim)
		.group(grp);
		// .round(function(val){return Math.round(val*10)/10;}) can see if this makes brush on col filter entire col, not just the litle selection
	speed1Bars.xAxis().ticks(3);
	speed1Bars.yAxis().ticks(2);  
	speed1Bars.render();
}*/

/**
 * should prolly have a list of categorical labels and numerical labels
 */
function convert_numerals(data) {
	data.forEach(function(x) {            
		x.Pos       =	x.Pos;
		x.Name      =	x.Name;
		x.Speed1	=	+x.Speed1;
		x.Speed2	=	+x.Speed2;
		x.Power		=	+x.Power;
		x.Agility	=	+x.Agility;
		x.Acc1		=	+x.Acc1;
		x.Acc2		=	+x.Acc2;
		x.Endurance	=	+x.Endurance;
	});
	return data;
}

/*
d3.csv("chart_props.csv").then(function(data) {
	// colHeaders = d3.keys(data[0]);
	// console.log(colHeaders)
	data.forEach(function(x) {
		data_props.col_name 	= 	x.chart_min;
		data_props.chart_min 	= 	+x.chart_min;
		data_props.chart_max 	= 	+x.chart_max;
		data_props.bin_width 	= 	+x.bin_width;
		data_props.num_bins 	= 	+x.num_bins;
	}
});
*/

/**
 *
 */
d3.csv("dat.csv").then(function(data) {
	colHeaders = d3.keys(data[0]);
	// console.log(colHeaders)

	data 	= 	convert_numerals(data);
	xdata 	= 	crossfilter(data);	
	var i = 0;
	redraw();
});

function getHeight() {
	var h;
	return h;
}

function getWidth() {
	var w;
	return w;
}


/**
 *
 */
function redraw() {
	// var w = getHeight();
	// var h = (viewport().height/100)/3.0;



	drawTable();
	// for (var c in data_props.col_name) {
	// 	makeChart(c, )
	// }

	/**
	 *  acc1
	 */
	var acc1Func 		=   function(d){ return d.Acc1; },
		acc1Dim 		=   xdata.dimension(acc1Func),     
		acc1Extent 		=   [3.8, 5.6],
		acc1_bin_width  = 	0.2,
		acc1_num_bins   = 	9,
		acc1Grp			=   acc1Dim.group(
								function(d) {
									return Math.floor(d/acc1_bin_width)*acc1_bin_width;
								}
							);			
	acc1Bars
		.x(d3.scaleLinear().domain(acc1Extent))
		.xUnits(function(){return 9;}) 
		.xAxisLabel("Acceleration 0-10m (m/s/s)")
		.yAxisLabel("Count")
		.dimension(acc1Dim)
		.group(acc1Grp);
		// .on( 'renderlet', function() { return apply_verticals(acc1Bars); });	
	acc1Bars.xAxis().ticks(4);
	acc1Bars.yAxis().ticks(2);
	acc1Bars.render();

	/**
	 *  acc2
	 */            
	var acc2Func    	=   function(d){ return d.Acc2; },
		acc2Dim     	=   xdata.dimension(acc2Func),
		acc2Extent  	=   [2.3, 3.2],
		acc2_bin_width  =   0.1,
		acc2_num_bins   =   9,
		acc2Grp			=   acc2Dim.group(
					function(d) {
						return Math.floor(d/acc2_bin_width)*acc2_bin_width;
					}
				);
	acc2Bars
        // .width(400)
		// .height(255)
        // .brushOn(false)
		.x(d3.scaleLinear().domain(acc2Extent))
		.xUnits(function(){return 9;})
		.xAxisLabel("Acceleration 0-20m (m/s/s)")
		.yAxisLabel("Count")
		.dimension(acc2Dim)
		.group(acc2Grp);            
	acc2Bars.xAxis().ticks(4);
	acc2Bars.yAxis().ticks(2);
	acc2Bars.render();  
				
	/**
	 *  speed1
	 */                          
	var speed1Func         =   function(d) {return d.Speed1;},
		speed1Dim          =   xdata.dimension(speed1Func),
		speed1Grp          =   speed1Dim.group(),
		speed1Extent       =   [6.4, 8.8],
		speed1_bin_width   = 0.4,
		speed1Grp
			= speed1Dim.group(
				function(d) {
					return Math.floor(d/speed1_bin_width)*speed1_bin_width;
				}
			);
			   
	speed1Bars            
		// .height(255)
		.x(d3.scaleLinear().domain(speed1Extent))
		.xUnits(function(){return 6;}) 
		.xAxisLabel("Speed 10-20m (m/s)")
		.yAxisLabel("Count")
		.dimension(speed1Dim)
		.group(speed1Grp);
	speed1Bars.xAxis().ticks(3);
	speed1Bars.yAxis().ticks(2);  
	speed1Bars.render();          
				
	/**
	 *  speed2
	 */            
	var speed2Func         =   function(d) {return d.Speed2;},
		speed2Dim          =   xdata.dimension(speed2Func),
		speed2Grp          =   speed2Dim.group(),
		speed2Extent       =   [7.0, 8.6],  
		speed2_bin_width   = 0.2,
		speed2Grp
			=   speed2Dim.group(
					function(d) {
						return Math.floor(d/speed2_bin_width)*speed2_bin_width;
					}
				);	
	speed2Bars            
		// .height(255)
		.x(d3.scaleLinear().domain(speed2Extent))
		.xUnits(function(){return 8;})
		.xAxisLabel("Speed 20-30m (m/s)")
		.yAxisLabel("Count")
		.dimension(speed2Dim)
		.group(speed2Grp);
	speed2Bars.xAxis().ticks(3);
	speed2Bars.yAxis().ticks(2);  
	speed2Bars.render();
	
	/**
	 *  power
	 */				
	var powerDim        =   xdata.dimension(function(d) {return +d.Power;}),
		power_bin_width =   2,                
		powerExtent     =   [24, 38],
		powerGrp
			=   powerDim.group(
					function(d) {
						return Math.floor(d/power_bin_width)
									*power_bin_width;                                
					}
				);
	powerBars
		// .height(255)
		.x(d3.scaleLinear().domain(powerExtent))
		.xUnits(function(){return 7;})
		.xAxisLabel("Power (cm)")
		.yAxisLabel("Count")
		.dimension(powerDim)
		.group(powerGrp);                        
	powerBars.xAxis().ticks(3);
	powerBars.yAxis().ticks(2);
	powerBars.render();
	   
	/**
	 *      agility
	 */
	var agilityFunc =   function(d){ return +d.Agility; },
		agilityDim  =   xdata.dimension( agilityFunc ),
		agilityExtent = [0.54, 0.61],
		agility_bin_width   =   0.01,
		agilityScale = d3.scaleLinear().domain([0.54, 0.61]),
		agilityGrp  
			=   agilityDim.group(
					function(d) {
						return Math.round(d/agility_bin_width)*agility_bin_width;
					}
			);
	/**
	 *
	 *  VERY ANNOYING!!! have to use round here...be careful!!!
	 *
	 */
	agilityBars
		// .height(255)
		.x(agilityScale)
		.xUnits(function(){return 7;})
		.yAxisLabel("Count")
		.xAxisLabel("Agility ....")
		.dimension(agilityDim)
		.group(agilityGrp)
		;
	agilityBars.xAxis().ticks(3);
	agilityBars.yAxis().ticks(2);
	agilityBars.render();
				
	/**
	 *  endurance
	 * note:
	 *		for consistency with other charts
	 *		endurance is measured in m/s not seconds
	 *		thus higher scores are better on all charts
	 */
	var enduranceFunc =   function(d){ return +d.Endurance; },
		enduranceDim  =   xdata.dimension( enduranceFunc ),
		// enduranceExtent = [200, 250],
		// endurance_bin_width   =   10,
		enduranceExtent = [4.0, 4.9],
		endurance_bin_width   =   0.1,
		enduranceGrp  
			=   enduranceDim.group(
					function(d) {
						return Math.floor(d/endurance_bin_width)
								*endurance_bin_width;
					}
				);

	enduranceBars
		// .height(255)
		.x(d3.scaleLinear().domain(enduranceExtent))
		.xUnits(function(){return 9;})
		// .xUnits(function(){return 5;})
		.xAxisLabel("Endurance (s)")
		.yAxisLabel("Count")
		.dimension(enduranceDim)
		.group(enduranceGrp);
	enduranceBars.xAxis().ticks(3);
	enduranceBars.yAxis().ticks(2);
	enduranceBars.render();  
}      

/**
 *
 */
/*function apply_verticals(chart) {
	var x_vert = 5;
	var extra_data = [
		{x: chart.x()(x_vert), y: 0},
		{x: chart.x()(x_vert), y: chart.effectiveHeight()}
	];
	var line = d3.line()
				.x(function(d) { return d.x; })
				.y(function(d) { return d.y; });
				// .curve(d3.curveLinear);
	var chartBody = chart.select('g');
	var path = chartBody.selectAll('path.extra').data([extra_data]);
	path = path.enter()
	    .append('path')
	    // .attr('class', 'oeExtra')
	    .attr('stroke', 'red')
	    // .attr('id', 'oeLine')
	    // .attr("stroke-width", 1)
	    // .style("stroke-dasharray", ("10,3"))
	.merge(path);
	path.attr('d', line);
}*/
function apply_verticals(player) {
	for(var i = 0; i < myCharts.length; i++) {
		var chart = myCharts[i];
		var x_vert = +player[i+2];
		var extra_data = [
			{x: chart.x()(x_vert) + chart.margins().left, y: 0 + chart.margins().top},
			{x: chart.x()(x_vert) + chart.margins().left, y: chart.effectiveHeight() + chart.margins().top}
		];
		var line = d3.line()
					.x(function(d) { return d.x; })
					.y(function(d) { return d.y; });
					// .curve(d3.curveLinear);
		var chartBody = chart.select('g');
		var path = chartBody.selectAll('path.extra').data([extra_data]);
		path = path.enter()
		    .append('path')
		    // .attr('class', 'oeExtra')
		    .attr('stroke', 'red')
		    // .attr('id', 'oeLine')
		    .attr("stroke-width", 2)
		    // .style("stroke-dasharray", ("10,3"))
		.merge(path);
		path.attr('d', line);
		// chart.render();
	}
}

/**
 *
 */
function drawTable() {
	/**
	 *      TABLE
	 */
	var nameFunc    =   function(d){ return 'Name'; }
	// var nameFunc    =   function(d){ return d.Name; }
	var nameDim     =   xdata.dimension( nameFunc );
	table2  
		.dimension( nameDim )
		.sortBy( nameFunc )
		.order( d3.ascending )
		.group(nameFunc)
		.showGroups(false)
		.columns(columns)
		// .columns(colHeaders)
		// see...http://mikezawitkowski.github.io/hardwareDemo/              
		.size(xdata.size()) /* default is 25...what the hell... */
		// .on('renderlet.c', function(table){color_by_rank(table);});
		// .on( 'renderlet.c', function(table) { $('#my_table').DataTable(); } );
		.on( 'renderlet.c', function() { return apply_style_to_table(); })
		;
	table2.render();	
}

/**
 *
 */
function apply_style_to_table() {            
	if ( $.fn.dataTable.isDataTable('#my_table') ) {
		$('#my_table').dataTable().fnDestroy();
	 }
	 // create jQuery DataTable
	 jqtable = $('#my_table').DataTable({select:true});
}

// $("tbody", "#example")
// 	.on("click", "td",
// 		function() {alert(this.innerText); }
// 	);

// td.dc-table-column._0 
// this works anyway!!!

// $("tbody>tr>td:first-child")
$("#my_table")
	.on("click",  'tr', 
		function () {
			// console.log(jqtable.row(this).data());
			var c = jqtable.rows({selected:true}).count();
			var row = jqtable.row(this);
			// var player = row.data();

			var player = row.data();			
			remove_verticals();
			if ( c == 0 ) {
				apply_verticals(player);
			}
		}
	);

// $(window).resize(function() {
//   console.log('window was resized');
//   redraw();
// });

function remove_verticals() {
	$('.my-chart>svg>g>path').remove();
}

/*
function apply_highlight_row(row) {
	// row.node.css('border', '2px solid red');
	row[0].fill('red');
}*/