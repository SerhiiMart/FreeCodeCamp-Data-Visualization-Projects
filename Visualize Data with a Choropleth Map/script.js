////Globals
const colors = [];
const width = 1000;
const height = 700;
const tooltip = document.getElementById('tooltip');


(async function edMap() {
  const eduResp = await fetch('https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json');
  const countiesResp = await fetch('https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json');
  const educations = await eduResp.json();
  const counties = await countiesResp.json();
  const path = d3.geoPath();
  const data = topojson.feature(counties, counties.objects.counties).features;
  const minEdu = d3.min(educations, edu => edu.bachelorsOrHigher);
  const maxEdu = d3.max(educations, edu => edu.bachelorsOrHigher);
  const step = (maxEdu - minEdu) / 8;
  const colorsScale = d3.scaleThreshold()
    .domain(d3.range(minEdu, maxEdu, step))
    .range(d3.schemePurples[9]);
  for(let i=minEdu; i<=maxEdu; i+=step) {
    colors.push(i);
  }
  
  const svg = d3.select('.main').append('svg')
    .attr('width', width)
    .attr('height', height);
  
  svg.append('g')
    .selectAll('path')
    .data(data)
    .enter()
    .append('path')
    .attr('class', 'county')
    .attr('fill', d => colorsScale(educations.find(edu => edu.fips === d.id).bachelorsOrHigher))
    .attr('d', path)
    .attr('data-fips', d => d.id)
    .attr('data-education', d => educations.find(edu => edu.fips === d.id).bachelorsOrHigher)
    .on('mouseover', (d, i) => {
      const { coordinates } = d.geometry;
      const [x, y] = coordinates[0][0];

      const education = educations.find(edu => edu.fips === d.id);

      tooltip.classList.add('show');
      tooltip.style.left = x - 50 + 'px';
      tooltip.style.top = y - 50 + 'px';
      tooltip.setAttribute('data-education', education.bachelorsOrHigher);

      tooltip.innerHTML = `
        <p>${education.area_name} - ${education.state}</p>
        <p>${education.bachelorsOrHigher}%</p>
      `;
  }).on('mouseout', () => {
    tooltip.classList.remove('show');
  });
  const legendWidth = 200;
  const legendHeight = 30;

  const legendRectWidth = legendWidth / colors.length;
  const legend = d3.select('.main')
    .append('svg')
    .attr('id', 'legend')
    .attr('class', 'legend')
    .attr('width', legendWidth)
    .attr('height', legendHeight)
   
  legend.selectAll('rect')
    .data(colors)
    .enter()
    .append('rect')
    .attr('x', (_, i) => i * legendRectWidth)
    .attr('y', 0)
    .attr('width', legendRectWidth)
    .attr('height', legendHeight)
    .attr('fill', c => colorsScale(c))
})();