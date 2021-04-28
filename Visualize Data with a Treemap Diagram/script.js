////Globals
const width = 1000;
const height = 600;

const tooltip = document.getElementById('tooltip');
const svg = d3.select('.main').append('svg')
.attr('width', width)
.attr('height', height);
const treeMap = d3.treemap().size([width, height]).padding(2);


(async function movies() {
  const movieSales = await fetch('https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json').then(e => e.json());
  
  const colors = d3.scaleOrdinal(d3.schemePaired);
  const main = d3.hierarchy(movieSales).sum(d => d.value);

  treeMap(main);

const part = svg.selectAll('g')
  .data(main.leaves())
  .enter().append('g')
  .attr('transform', d => `translate(${d.x0}, ${d.y0})`);

const tile = part.append('rect')
  .attr('class', 'tile')
  .attr('data-name', d => d.data.name)
  .attr('data-category', d => d.data.category)
  .attr('data-value', d => d.data.value)
  .attr('width', d => d.x1 - d.x0)
  .attr('height', d => d.y1 - d.y0)
  .attr('fill', d => colors(d.data.category))
  .on('mouseover', (d, i) => {
    const { name, category, value } = d.data;
    tooltip.classList.add('show');
    tooltip.style.left = (d3.event.pageX) + 'px';
    tooltip.style.top = (d3.event.pageY - 100) + 'px';
    tooltip.setAttribute('data-value', value);

    tooltip.innerHTML = `
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Category:</strong> ${category}</p>
      <p><strong>Value:</strong> ${value}</p>
    `;
}).on('mouseout', () => {
  tooltip.classList.remove('show');
});

part.append('text')
  .selectAll('tspan')
  .data(d => d.data.name.split(/(?=[A-Z][^A-Z])/g))
  .enter().append('tspan')
  .attr('style', 'font-size: 13px')
  .attr('x', 4)
  .attr('y', (d, i) => 15 + i * 15)
  .text(d => d)

const categories = main.leaves().map(n => n.data.category).filter((item, idx, arr) => arr.indexOf(item) === idx);

////categories variables
const sizeOfBlock = 20;
const widthofLegend = 200;
const heightofLegend = (sizeOfBlock + 10) * categories.length;


////Legend part
const legend = d3.select('.main')
  .append('svg')
  .attr('id', 'legend')
  .attr('width', widthofLegend)
  .attr('height', heightofLegend)
 
legend.selectAll('rect')
  .data(categories)
  .enter()
  .append('rect')
  .attr('class', 'legend-item')
  .attr('fill', d => colors(d))
  .attr('x', sizeOfBlock / 2)
  .attr('y', (_, i) => i * (sizeOfBlock + 1) + 10)
  .attr('width', sizeOfBlock)
  .attr('height', sizeOfBlock)
 
 legend.append('g')
    .selectAll('text')
    .data(categories)
    .enter()
    .append('text')
    .attr('fill', 'black')
    .attr('x', sizeOfBlock * 2)
    .attr('y', (_, i) => i * (sizeOfBlock + 1) + 25)
    .text(d => d)
})();