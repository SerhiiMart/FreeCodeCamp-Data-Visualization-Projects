////Fetching original data
fetch('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json').then(res => res.json()).then(res => { objectData(res.map(e => [
    convertTime(e.Time), e.Year, e.Nationality, e.Doping, e.Name, e.Time]));
});
// function convertTime(item){
//   return new Date(`2010 01 01 00:${item}`);
// }

////Global Variables
const width = 700;
const height = 500;
const padding = 40;
const radius = 5;
const svg = d3.select("main").append("svg").attr("width", width).attr("height", height);
const tooltip = d3.select('main').append('div')
.attr('class', 'tooltip')
.attr('id', 'tooltip')
.style('opacity', 0);


function objectData (data) {

const yScale = d3.scaleLinear()
                .domain([d3.max(data, d => d[0]), d3.min(data, d => d[0])])
                .range([height, padding * 2]);
  
const xScale = d3.scaleTime()
                  .domain([d3.min(data, d => new Date(d[1] - 1)), d3.max(data, d => new Date(d[1] + 1))])
                  .range([padding, width - padding]);  
  tooltip.attr('data-date', i[0])
               .html(`<p>"${i[0]}"<br><b>$${timeFormat.format(i[1])} Billions Dollars</p>`)
               .transition()
               .duration(100)
               .style('opacity', '1')
               .style("display", "block");



// .catch(function(error){
//   console.log(error);
// });

}