const request = new XMLHttpRequest();
const dataset = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";
const svg = d3.select('svg');

const data 
const dataValues

const heighScl
const xScale
const xAxissScale
const yAxissScale

const width = 1000;
const height = 800;
const svgPadding = 40;


const dataChart = () => {
  svg.attr("width", width);
  svg.attr("height", height);
};

let createScales = () => {

}

let createBars = () => {

}

let createAxis = () => {

}


request.open("GET", dataset, true);
request.onload = () => {
  console.log(request.responseText);
}
