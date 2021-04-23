const request = new XMLHttpRequest();
const dataset = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";
const svg = d3.select('svg');


////Global variables
const width = 700;
const height = 500;
const padding = 50;
let dataValues = [];
let xAxisScale;
let yAxisScale;
let heighScl;
let xScale;


const dataChart = () => {
  svg.attr("width", width);
  svg.attr("height", height);
};

const createScales = () => {
  heighScl = d3.scaleLinear().domain([0, d3.max(dataValues, (e) => e[1])])
        .range([0, height - (2*padding)]);
  xScale = d3.scaleLinear().domain([0, dataValues.length - 1])
        .range([padding, width - padding]);
  let dates = dataValues.map(e => {
    return new Date(e[0]);
  });
  console.log(dates);
   xAxisScale = d3.scaleTime().domain([d3.min(dates), d3.max(dates)])
                    .range([padding, width-padding])

  yAxisScale = d3.scaleLinear().domain([0, d3.max(dataValues, (e) => {
                        return e[1]
                    })]).range([height - padding, padding])
}

const createBars = () => {
  let tooltip = d3
  .select("body")
  .append("div")
  .attr("id", "tooltip")
  .style("opacity", 0);

  svg.selectAll("rect").data(dataValues).enter().append("rect")
    .attr("class", "bar").attr("width", (width - (2 * padding)) / dataValues.length)
    .attr("data-date", (e) => e[0])
    .attr("data-gdp", (e) => e[1])
    .attr("height", (e) => {
      return heighScl(e[1])})
    .attr("x", (e, index) => {
      return xScale(index)})
    .attr("y", (e) => {
      return (height - padding) - heighScl(e[1])})
    .on("mouseover", (d) => {
        tooltip.transition().style("opacity", 1)
        tooltip.text(d[0])
        document.querySelector("#tooltip").setAttribute("data-date", d[0])
      })
    .on("mouseout", (d) => {
        tooltip.transition().style("opacity", 0)
        // tooltip.removeAttribute("data-date", e[1]) 
      })
      ////Color of Graphic
    .attr("cx",150).attr("cy",100).attr("r",20).style("fill", d3.color("yellow"));  
}

const createAxis = () => {
  let xAxis = d3.axisBottom(xAxisScale);
  svg.append('g').call(xAxis)
    .attr("id","x-axis").attr("color", "white")
    .attr("transform", "translate(0, " + (height-padding) + ")")
  let yAxis = d3.axisLeft(yAxisScale);
  svg.append('g').call(yAxis)
    .attr("id", "y-axis").attr("color", "white")
    .attr("transform", "translate(" + (padding)+ ", 0)")
}


request.open("GET", dataset, true);
request.onload = () => {
 let data = JSON.parse(request.responseText);
 dataValues = data.data;
 console.log(dataValues);
 dataChart();
 createScales();
 createBars();
 createAxis();
}
request.send()