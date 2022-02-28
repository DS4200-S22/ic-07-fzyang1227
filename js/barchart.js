/*

In-class activity 08 starter code
Prof. Mosca 
Modified: 12/08/21 

*/

// Build your bar charts in this file 


// Set dimensions and margins for plots 
const width = 900; 
const height = 450; 
const margin = {left:50, right:50, bottom:50, top:50}; 
const yTooltipOffset = 15; 


// add an svg to build within
const svg1 = d3
  .select("#hard-coded-bar")
  .append("svg")
  .attr("width", width-margin.left-margin.right)
  .attr("height", height - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width, height]);

const svg2 = d3
    .select("#csv-bar")
    .append("svg")
    .attr("width", width-margin.left-margin.right)
    .attr("height", height - margin.top - margin.bottom)
    .attr("viewBox", [0, 0, width, height]);

// Hardcoded barchart data
const data1 = [
  {name: 'A', score: 92},
  {name: 'B', score: 15},
  {name: 'C', score: 67},
  {name: 'D', score: 89},
  {name: 'E', score: 53},
  {name: 'F', score: 91},
  {name: 'G', score: 18}
];

/*

  Axes

*/ 

// get the max score from the data
let maxY1 = d3.max(data1, function(d) { return d.score; });

let yScale1 = d3.scaleLinear() // makes linear scale
            .domain([0,maxY1]) // inputs for function
            .range([height-margin.bottom,margin.top]);
            // ^ outputs for function

let xScale1 = d3.scaleBand() // categorical dimension
            .domain(d3.range(data1.length)) // inputs for function
            .range([margin.left, width - margin.right]) // outputs
            .padding(0.1); // spacing between bars

// adds a y axis to svg1 
svg1.append("g") // placeholder svg
   .attr("transform", `translate(${margin.left}, 0)`) // move axis inside left margin
   .call(d3.axisLeft(yScale1)) // left axis given scale
   .attr("font-size", '20px'); // set font

// adds an x axis to svg1
svg1.append("g") // placeholder svg
    .attr("transform", `translate(0,${height - margin.bottom})`) // move axis to bottom
    .call(d3.axisBottom(xScale1)            // set ticks for
            .tickFormat(i => data1[i].name))// each categorical name  
    .attr("font-size", '20px'); // set font

/* 

  Tooltip Set-up  

*/

// set information tooltip
const tooltip1 = d3.select("#hard-coded-bar") // select id
                .append("div") // make div
                .attr('id', "tooltip1") // set id of div
                .style("opacity", 0) // style div invisible
                .attr("class", "tooltip"); // set class

// mouseover event handler
const mouseover1 = function(event, d) {
  tooltip1.html("Name: " + d.name + "<br> Score: " + d.score + "<br>") // text within div
          .style("opacity", 1); // make visible
}

// mousemove event handler
const mousemove1 = function(event, d) {
  tooltip1.style("left", (event.x)+"px") 
          .style("top", (event.y + yTooltipOffset) +"px"); 
          // set position of tooltip
}

// mouseleave event handler
const mouseleave1 = function(event, d) { 
  tooltip1.style("opacity", 0); // set invisible
}

/* 

  Bars 

*/

// add event listeners
svg1.selectAll(".bar") 
   .data(data1) 
   .enter()  // give data to the bars
   .append("rect") 
     .attr("class", "bar") 
     .attr("x", (d,i) => xScale1(i)) 
     .attr("y", (d) => yScale1(d.score)) 
     .attr("height", (d) => (height - margin.bottom) - yScale1(d.score)) 
     .attr("width", xScale1.bandwidth()) //^^^ add attributes to each bar
     .on("mouseover", mouseover1) 
     .on("mousemove", mousemove1)
     .on("mouseleave", mouseleave1);

/*

  Build 2nd bar

*/

// get data from csv
d3.csv("/data/barchart.csv").then((data) => {

  // get the max score from the data
  let maxY2 = d3.max(data, function(d) { return d.score; });

  let yScale2 = d3.scaleLinear() // makes linear scale
                .domain([0,maxY2]) // inputs for function
                .range([height-margin.bottom,margin.top]);
                // ^ outputs for function

  let xScale2 = d3.scaleBand() // categorical dimension
                .domain(d3.range(data.length)) // inputs for function
                .range([margin.left, width - margin.right]) // outputs
                .padding(0.1); // spacing between bars

  // adds a y axis to svg1 
  svg2.append("g") // placeholder svg
     .attr("transform", `translate(${margin.left}, 0)`) // move axis inside left margin
     .call(d3.axisLeft(yScale2)) // left axis given scale
     .attr("font-size", '20px'); // set font

  // adds an x axis to svg1
  svg2.append("g") // placeholder svg
      .attr("transform", `translate(0,${height - margin.bottom})`) // move axis to bottom
      .call(d3.axisBottom(xScale2)            // set ticks for
              .tickFormat(i => data[i].name))// each categorical name  
      .attr("font-size", '20px'); // set font

  // set information tooltip
  const tooltip2 = d3.select("#csv-bar") // select id
                    .append("div") // make div
                    .attr('id', "tooltip2") // set id of div
                    .style("opacity", 0) // style div invisible
                    .attr("class", "tooltip"); // set class

  svg2.selectAll(".bar") 
   .data(data) 
   .enter()  // give data to the bars
   .append("rect") 
     .attr("class", "bar") 
     .attr("x", (d,i) => xScale2(i)) 
     .attr("y", (d) => yScale2(d.score)) 
     .attr("height", (d) => (height - margin.bottom) - yScale2(d.score)) 
     .attr("width", xScale2.bandwidth()) //^^^ add attributes to each bar
     .on("mouseover", mouseover1) 
     .on("mousemove", mousemove1)
     .on("mouseleave", mouseleave1);
});




