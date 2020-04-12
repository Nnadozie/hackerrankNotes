const req = new XMLHttpRequest();
req.open(
"GET",
"https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json",
true);

req.send();
let data = [];
req.onload = () => {
  data = JSON.parse(req.responseText).data;

  const padding = 60;
<<<<<<< HEAD
  const barWidth = 2;
=======
  const barWidth = 3;
>>>>>>> 280fa15dac89fb2ca9bd593f057a02dc6abe218d
  const w = 350 * barWidth;
  const h = 200 * barWidth;

  const svg = d3.
  select("body").
  append("svg").
  attr("width", w).
  attr("height", h);

  const yScale = d3.scaleLinear().domain([0, d3.max(data, d => d[1])]);
  // .range([h - 2* padding, 0]);

  const yAxis = d3.axisLeft(yScale.range([h - 2 * padding, 0]));

<<<<<<< HEAD
  //   const xScale = d3
  //     .scaleLinear()
  //     .domain([
  //       d3.min(data, (d) => {
  //         const regex = /([0-9]{4})-/g;
  //         const match = regex.exec(d[0]);
  //         return match[1];
  //       }),

  //       d3.max(data, (d) => {
  //         const regex = /([0-9]{4})-/g;
  //         const match = regex.exec(d[0]);
  //         return match[1];
  //       })
  //     ])
  //     .range([0, barWidth * data.length]);

  // const xScale = d3
  //   .scaleBand()
  //   .range([0, barWidth * data.length])
  //   .domain(data.map((d) => d[0]));

  const xScale = d3.
  scaleTime().
  domain([
  d3.min(data, d => {
    return new Date(d[0]);
  }),

  d3.max(data, d => {
    return new Date(d[0]);
=======
  const xScale = d3.
  scaleLinear().
  domain([
  d3.min(data, d => {
    const regex = /([0-9]{4})-/g;
    const match = regex.exec(d[0]);
    return match[1];
  }),

  d3.max(data, d => {
    const regex = /([0-9]{4})-/g;
    const match = regex.exec(d[0]);
    return match[1];
>>>>>>> 280fa15dac89fb2ca9bd593f057a02dc6abe218d
  })]).

  range([0, barWidth * data.length]);

  const xAxis = d3.axisBottom(xScale);

  svg.
  append("g").
  attr("id", "x-axis").
  attr("transform", "translate(" + padding + ", " + (h - padding) + ")").
  call(xAxis);

  svg.
  append("g").
  attr("id", "y-axis").
  attr("transform", "translate(" + padding + ", " + padding + ")").
  call(yAxis);

<<<<<<< HEAD
  const rect = svg.
  append("circle").
  attr("id", "tooltip").
  attr("r", 50).
  style("opacity", 0);

=======
>>>>>>> 280fa15dac89fb2ca9bd593f057a02dc6abe218d
  svg.
  selectAll("rect").
  data(data).
  enter().
  append("rect").
  attr("x", (d, i) => {
<<<<<<< HEAD
    return xScale(new Date(d[0])) + padding;
=======
    return i * barWidth + padding;
>>>>>>> 280fa15dac89fb2ca9bd593f057a02dc6abe218d
  }).
  attr("y", (d, i) => {
    return h - yScale.range([0, h - padding * 2])(d[1]) - padding;
  }).
  attr("width", (d, i) => {
    return barWidth;
  }).
  attr("height", (d, i) => {
    return yScale.range([0, h - padding * 2])(d[1]);
  }).
  attr("class", "bar").
  attr("data-date", (d, i) => {
    return d[0];
  }).
  attr("data-gdp", (d, i) => {
    return d[1];
<<<<<<< HEAD
  }).
  on("mouseover", (d, i) => {
    rect.
    attr("cx", xScale(new Date(d[0])) + padding).
    attr("cy", h / 2).
    transition().
    duration(200).
    style("opacity", 0.9);
  }).
  on("mouseout", () => {
    rect.transition().duration(500).style("opacity", 0);
=======
>>>>>>> 280fa15dac89fb2ca9bd593f057a02dc6abe218d
  });
};

/*
   
   User Story #9: Each bar element's height should accurately represent the data's corresponding GDP.
   
   User Story #10: The data-date attribute and its corresponding bar element should align with the corresponding value on the x-axis.
   
   User Story #11: The data-gdp attribute and its corresponding bar element should align with the corresponding value on the y-axis.
   
   User Story #12: I can mouse over an area and see a tooltip with a corresponding id="tooltip" which displays more information about the area.
   
   User Story #13: My tooltip should have a data-date property that corresponds to the data-date of the active area.
   */