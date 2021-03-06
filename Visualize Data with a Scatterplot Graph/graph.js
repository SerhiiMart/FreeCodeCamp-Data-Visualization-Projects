////Fetch ititial data
fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json').then(t => t.json()).then(t => {
  workOnData(t.map(e => [convertMinAndSec(e.Time), e.Year, e.Doping, e.Name
  ]));
});

////Returning data for getTime function
function convertMinAndSec(str) {
  return new Date(`2010 01 01 00:${str}`);
}

function textForTooltip(d) {
  return ` <p>${d[3]}(${d[1]})</p>
<p>Time: <strong>${d[0].getMinutes()}:${d[0].getSeconds()}</strong></p>
${d[2] ? `${d[2]}` : ''}`;
}


////Global Variables   const width = 900;
  const height = 550;
  const width = 630;
  const padding = 40;
  const radius = 8;
  const tooltip = document.getElementById('tooltip');
  const svg = d3.select('.main').append('svg')
    .attr('width', width)
    .attr('height', height);


////Work on Data
function workOnData(data) {
  const yScale = d3.scaleTime().domain([d3.min(data, d => d[0]), d3.max(data, d => d[0])])
      .range([padding, height - padding]);
  
  const xScale = d3.scaleTime().domain([
      d3.min(data, d => new Date(d[1] - 1)), 
      d3.max(data, d => new Date(d[1] + 1))
      ])
      .range([padding, width - padding]);
  
  ////Work on SVG
  svg.selectAll('circle')
    .data(data)
    .enter()
    .append('circle')
    .attr('class', 'dot')
    .attr('data-xvalue', d => d[1])
    .attr('data-yvalue', d => d[0])
    .attr('cx', d => xScale(d[1]))
    .attr('cy', d => yScale(d[0]))
    .attr('fill', d => d[2] === '' ? 'red' : 'yellow')
    .attr('stroke', 'black')
    .attr('r', radius)
    .on('mouseover', (d, i) => {
      tooltip.classList.add('show');
      tooltip.style.left = xScale(d[1]) + 10 + 'px';
      tooltip.style.top = yScale(d[0]) - 10 + 'px';
      tooltip.setAttribute('data-year', d[1])
      tooltip.innerHTML = textForTooltip(d);
  }).on('mouseout', () => {
     tooltip.classList.remove('show');
  });
  
 ////Formating Data
  const timeFormatForMinAndSec = d3.timeFormat("%M:%S");
  const timeFormatForYear = d3.format("d");

  ////Creating xAxis and yAxis
  const xAxis = d3.axisBottom(xScale)
    .tickFormat(timeFormatForYear)
  const yAxis = d3.axisLeft(yScale)
    .tickFormat(timeFormatForMinAndSec)
  
  svg.append('g')
    .attr('id', 'x-axis')
    .attr('transform', `translate(0, ${height - padding})`)
    .call(xAxis);
  
  svg.append('g')
    .attr('id', 'y-axis')
    .attr('transform', `translate(${padding}, 0)`)
    .call(yAxis)
}