////Global Variables
const width = 700;
const height = 500;
const padding = 30;

const tooltip = document.getElementById('tooltip');
const svg = d3.select('.main').append('svg')
.attr('width', width)
.attr('height', height);
let basicTemperature = undefined;


fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json').then(e => e.json()).then(e => {
  const { baseTemperature, monthlyVariance } = e; 
  workOnData(monthlyVariance);
})

function workOnData(data) {
  const barWidth = width / data.length; 
  const yScale = d3.scaleLinear()
      .domain([0, d3.max(data, d => d[1])])
      .range([height - padding, padding]);
  
  const xScale = d3.scaleTime()
      .domain([d3.min(data, d => new Date(d[0])), d3.max(data, d => new Date(d[0]))])
      .range([padding, width - padding])
      
  svg.selectAll('rect')
    .data(data)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('data-date', d => d[0])
    .attr('data-gdp', d => d[1])
    .attr('x', d => xScale(new Date(d[0])))
    .attr('y', d => yScale(d[1]))
    .attr('width', barWidth)
    .attr('height', d => height - yScale(d[1]) - padding)
    .on('mouseover', (d, i) => {
    
      tooltip.classList.add('show');
      tooltip.style.left = i * barWidth + padding * 2 + 'px';
      tooltip.style.top = height - padding * 4 + 'px';
      tooltip.setAttribute('data-date', d[0])

      tooltip.innerHTML = `
        <small>${d[0]}</small>
        $${d[1]} billions
      `;
  }).on('mouseout', () => {
     tooltip.classList.remove('show');
  });
  
  const xAxis = d3.axisBottom(xScale)
  const yAxis = d3.axisLeft(yScale)
  
  svg.append('g')
    .attr('id', 'x-axis')
    .attr('transform', `translate(0, ${height - padding})`)
    .call(xAxis);
  
  svg.append('g')
    .attr('id', 'y-axis')
    .attr('transform', `translate(${padding}, 0)`)
    .call(yAxis)
}