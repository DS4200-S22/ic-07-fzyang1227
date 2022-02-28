/*

In-class activity 08 starter code
Prof. Mosca 
Modified: 12/08/21 

*/

// Build your scatterplot in this file 

// add svg for scatterplot
const svg3 = d3
  .select("#csv-scatter")
  .append("svg")
  .attr("width", width-margin.left-margin.right)
  .attr("height", height - margin.top - margin.bottom)
  .attr("viewBox", [0, 0, width, height]);

// set information tooltip
const tooltip3 = d3.select("#csv-scatter") // select id
                .append("div") // make div
                .attr('id', "tooltip3") // set id of div
                .style("opacity", 0) // style div invisible
                .attr("class", "tooltip"); // set class

// mouseover event handler
const mouseover2 = function(event, d) {
  tooltip3.html("Day: " + d.day + "<br> Score: " + d.score + "<br>") // text within div
          .style("opacity", 1); // make visible
}

// mousemove event handler
const mousemove2 = function(event, d) {
  tooltip3.style("left", (event.pageX)+"px") 
          .style("top", (event.pageY + yTooltipOffset) +"px"); 
          // set position of tooltip
}

// mouseleave event handler
const mouseleave2 = function(event, d) { 
  tooltip3.style("opacity", 0); // set invisible
}



d3.csv("data/scatter.csv").then((data) => {

  // find max X
  let maxX3 = d3.max(data, (d) => { return d.day; }); 

  // find max Y 
  let maxY3 = d3.max(data, (d) => { return d.score; }); 

  let xScale3 = d3.scaleLinear() // linear scale
            .domain([0, maxX3])  // inputs for the function
            .range([margin.left, width - margin.right]); 
                // ^ outputs for the function 

  let yScale3 = d3.scaleLinear()
            .domain([0, maxY3])
            .range([height - margin.bottom, margin.top]); 

  // x-axis
  svg3.append("g")
      .attr("transform", `translate(0,${height - margin.bottom})`) 
            // ^ moves axis to bottom of svg 
      .call(d3.axisBottom(xScale3)) // built in function for bottom
                                         // axis given a scale function 
        .attr("font-size", '20px');  // set font size)

  // y-axis
  svg3.append("g") // g is a "placeholder" svg
      .attr("transform", `translate(${margin.left}, 0)`) 
          // ^ move axis inside of left margin
      .call(d3.axisLeft(yScale3))  // built in function for left
                                    // axis given a scale function 
        .attr("font-size", '20px'); // set font size

  // build scatterplot
  svg3.selectAll("circle") 
      .data(data)
      .enter()  
      .append("circle")
        .attr("class", "scatter")
        .attr("cx", (d) => xScale3(d.day))
        .attr("cy", (d) => yScale3(d.score))
        .attr("r", 10) 
        .on("mouseover", mouseover2) 
        .on("mousemove", mousemove2)
        .on("mouseleave", mouseleave2);

});

