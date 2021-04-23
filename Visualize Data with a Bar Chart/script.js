fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json').then(e => e.json()).then(e => {
    const {data} = e;
  workOnData(data.map(d => [d[0], d[1], d[0].split(" ")[0]])); 
});


////Global Variables
const height = 500;
const width = 700;
const padding = 40;
const svg = d3.select('svg').attr('width', width).attr('height', height);

function workOnData(data){

  ////Placement of the Chart
  const yScale = d3.scaleLinear()
                .domain([0, d3.max(data, d => d[1])])
                .range([height, padding * 2]);
  
  const xScale = d3.scaleTime()
                  .domain([d3.min(data, d => new Date(d[0])), d3.max(data, d => new Date(d[0]))])
                  .range([padding, width - padding]);
  
  const xAxis = d3.axisBottom(xScale);
  const yAxis = d3.axisLeft(yScale);

  const widthOfBar = (width - 2 * padding) / data.length;
    const tooltip = d3.select('body')
    .append('div')
    .attr('id', 'tooltip')
    .style('opacity', 0);  

  ////SVG Stuff
  svg.append('g')
  .attr('id', 'x-axis')
  .attr('transform', `translate(0, ${height - padding})`)
  .call(xAxis);

  svg.append('g')
  .attr('id', 'y-axis')
  .attr('transform', `translate(${padding}, ${-padding})`)
  .call(yAxis);

  svg.append('text')
  .attr('transform', 'rotate(-90)')
  .attr('x', -250)
  .attr('y', 80);

   ////Exc. goals
    svg.selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('x', (d, i) => i * widthOfBar + padding) 
        .attr('y', d => yScale(d[1]) - padding)
        .attr('width', widthOfBar)
        .attr('height', d => height - yScale(d[1]))
        .attr('class', 'bar')
        .attr('data-date', d => d[0])
        .attr('data-gdp', d => d[1])
        .on('mouseover', (d, i) => {
        var timeFormat = new Intl.NumberFormat();
     
      tooltip.attr('data-date', i[0])
               .html(`<p>"${i[0]}"<br><b>$${timeFormat.format(i[1])} Billions Dollars</p>`)
               .transition()
               .duration(100)
               .style('opacity', '1')
               .style("display", "block");
      
        }).on('mouseout', d => {
           tooltip.transition()
                .duration(100)
                .style('opacity', '0')
                .style('display', 'none');
       })
  
   
}