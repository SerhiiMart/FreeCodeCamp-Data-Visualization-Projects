fetch('https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/cyclist-data.json').then(res => res.json()).then(res => { objectData(res.map(r => [
    convertMinAndSec(r.Time), r.Year, r.Nationality, r.Doping, r.Name, r.Time]));
});


////Global Variables
const width = 800;
const height = 600;
const padding = 40;
const radius = 5;

const svg = d3.select("main").append("svg").attr("width", width).attr("height", height);

svg.selectAll("circle")
.data(data)
.enter()
.append("circle")
.attr("cx", (d, i) => width[0])
.attr("cy", (d, i) => height - d[1])
.attr("r", radius);

svg.selectAll("text")
.data(data)
.enter()
.append("text")
.attr("x", (d) => d[0] + 5)
.attr("y", (d) => h - d[1])
.text((d) => (d[0] + ", " + d[1]))