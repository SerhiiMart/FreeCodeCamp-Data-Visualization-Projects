const request = new XMLHttpRequest();
const dataset = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";
const svg = d3.select('svg');


////Global variables
let dataValues = [];
let xScale;
let xAxissScale;
let yAxissScale;

const width = 700;
const height = 500;
const svgPadding = 40;


const dataChart = () => {
  svg.attr("width", width);
  svg.attr("height", height);
};

let createScales = () => {
  let heighScl = d3.scaleLinear().domain([0, d3.max(dataValues, (e) => e[1])])
  .range([0, height(2*svgPadding)])
}

let createBars = () => {

}

let createAxis = () => {

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