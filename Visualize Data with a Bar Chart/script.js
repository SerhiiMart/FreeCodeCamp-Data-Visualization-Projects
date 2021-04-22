const request = new XMLHttpRequest();
const dataset = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";
const svg = d3.select('svg');


////Global variables
let dataValues = [];
const width = 700;
const height = 500;
const padding = 40;


const dataChart = () => {
  svg.attr("width", width);
  svg.attr("height", height);
};

const createScales = () => {
  let heighScl = d3.scaleLinear().domain([0, d3.max(dataValues, (e) => e[1])])
  .range([0, height - (2*padding)]);
  let xScale = d3.scaleLinear().domain([0, dataValues.length - 1])
  .range([padding, width - padding]);
  let dates = dataValues.map(e => {
    return new Date(e[0]);
  });
  let xAxisScale = d3.scaleTime().domain([d3.min(dates), d3.max(dates)])
                    .range([padding, width-padding])

  let yAxisScale = d3.scaleLinear().domain([0, d3.max(dataValues, (e) => {
                        return e[1]
                    })]).range([height - padding, padding ])
}

const createBars = () => {

}

const createAxis = () => {

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