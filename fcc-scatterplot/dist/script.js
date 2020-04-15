// User Story #1: I can see a title element that has a corresponding id="title".
d3.select("body").
append("h1").
attr("id", "title").
text("Doping in Professional Bicycle Racing");

// User Story #2: I can see an x-axis that has a corresponding id="x-axis".
let xScale = d3.scaleTime();

// User Story #3: I can see a y-axis that has a corresponding id="y-axis".
let yScale = d3.scaleTime();

// User Story #4: I can see dots, that each have a class of dot, which represent the data being plotted.
d3.json(
"https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json").
then(data => {
  plot(data);
});

const w = h = 450;
const p = 50;

const svg = d3.
select("body").
append("svg").
attr("width", w + 2 * p).
attr("height", h + 2 * p);
//selectAll("circle").data(data);
svg.
append("rect").
attr("width", w + 2 * p).
attr("height", h + 2 * p).
attr("fill", "yellow");

const plot = data => {
  let join = svg.selectAll("circle").data(data);

  join.
  enter().
  append("circle").
  attr("class", "dot").
  attr("cx", (d, i) => {
    return i * 20;
  }).
  attr("cy", (d, i) => {
    return i * 20;
  }).
  attr("r", 5).
  attr("fill", "green");

  // User Story #5: Each dot should have the properties data-xvalue and data-yvalue containing their corresponding x and y values.
  // .attr("data-xvalue", (d) => {
  //   return d.Year;
  // })
  // .attr("data-yvalue", (d) => {
  //   return d.Time;
  // });

  // User Story #6: The data-xvalue and data-yvalue of each dot should be within the range of the actual data and in the correct data format. For data-xvalue, integers (full years) or Date objects are acceptable for test evaluation. For data-yvalue (minutes), use Date objects.
  minY = d3.min(data, d => {
    return new Date(
    null,
    null,
    null,
    null,
    d.Time.slice(0, 2),
    d.Time.slice(3));

  });
  maxY = d3.max(data, d => {
    return new Date(
    null,
    null,
    null,
    null,
    d.Time.slice(0, 2),
    d.Time.slice(3));

  });
  minX = d3.min(data, d => {
    return new Date(d.Year, null, null);
  });
  maxX = d3.max(data, d => {
    return new Date(d.Year, null, null);
  });

  xScale = xScale.domain([minX, maxX]).range([0, w]);
  yScale = yScale.domain([minY, maxY]).range([0, h]);

  join = svg.
  selectAll("circle").
  data(data).
  attr("data-xvalue", d => {
    return new Date(d.Year, null, null).toISOString();
  }).
  attr("data-yvalue", d => {
    // return new Date(
    //   null,
    //   null,
    //   null,
    //   null,
    //   d.Time.slice(0, 2),
    //   d.Time.slice(3)
    // );
    return d3.timeParse("%M:%S")(d.Time).toISOString();
  });

  // User Story #7: The data-xvalue and its corresponding dot should align with the corresponding point/value on the x-axis.
  let xAxis = d3.axisBottom(xScale);
  svg.
  append("g").
  attr("id", "x-axis").
  attr("transform", "translate(" + p + ", " + (h + p) + ")").
  call(xAxis);

  join.attr("cx", d => {
    return xScale(new Date(d.Year, null, null)) + p;
  });

  // User Story #8: The data-yvalue and its corresponding dot should align with the corresponding point/value on the y-axis.
  let yAxis = d3.axisLeft(yScale).tickFormat(d3.timeFormat("%M:%S"));
  svg.
  append("g").
  attr("id", "y-axis").
  attr("transform", "translate(" + p + ", " + p + ")").
  call(yAxis);

  join.attr("cy", d => {
    return (
      yScale(
      new Date(null, null, null, null, d.Time.slice(0, 2), d.Time.slice(3))) +
      p);

  });
};
// User Story #9: I can see multiple tick labels on the y-axis with %M:%S time format.

// User Story #10: I can see multiple tick labels on the x-axis that show the year.

// User Story #11: I can see that the range of the x-axis labels are within the range of the actual x-axis data.

// User Story #12: I can see that the range of the y-axis labels are within the range of the actual y-axis data.

// User Story #13: I can see a legend containing descriptive text that has id="legend".

// User Story #14: I can mouse over an area and see a tooltip with a corresponding id="tooltip" which displays more information about the area.

// User Story #15: My tooltip should have a data-year property that corresponds to the data-xvalue of the active area.