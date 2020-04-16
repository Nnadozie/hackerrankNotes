// User Story #1: I can see a title element that has a corresponding id="title".
d3.select("*").style("font-family", "arial");
d3.select("body").
append("div").
style("height", "100vh").
attr("id", "container").
style("text-align", "center").
style("margin", "0, auto");

d3.select("#container").
append("h1").
attr("id", "title").
style("font-size", "2rem").
text("Doping in Professional Bicycle Racing");
d3.select("#container").
append("h2").
style("font-size", "1rem").
text("35 Fastest times up Alpe d'Huez");

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

const h = 450;
const w = 700;
const p = 50;

const svg = d3.
select("#container").
append("svg").
attr("width", w + 3 * p).
attr("height", h + 2 * p).
attr("cursor", "pointer");

svg.
append("text").
text("Time in Minutes").
attr("y", p + 20).
attr("x", -100).
style("font-size", "1rem").
attr("transform", "rotate(-90 50 50)");
//selectAll("circle").data(data);
svg.
append("rect").
attr("width", w + 3 * p).
attr("height", h + 2 * p).
attr("opacity", 0);
const plot = data => {
  let join = svg.selectAll("circle").data(data);

  join.
  enter().
  append("circle").
  attr("class", "dot")
  // .attr("cx", (d, i) => {
  //   return i * 20;
  // })
  // .attr("cy", (d, i) => {
  //   return i * 20;
  // })
  .attr("r", 5).
  style("fill", d => {
    return d.Doping === "" ? "orange" : "blue";
  }).
  attr("stroke", "black").
  style("opacity", 0.7);

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
  attr("transform", "translate(" + p * 2 + ", " + (h + p) + ")").
  call(xAxis);

  const positonX = d => {
    return xScale(new Date(d.Year, null, null)) + p * 2;
  };

  join.attr("cx", d => {
    return positonX(d);
  });

  // User Story #8: The data-yvalue and its corresponding dot should align with the corresponding point/value on the y-axis.
  let yAxis = d3.axisLeft(yScale).tickFormat(d3.timeFormat("%M:%S"));
  svg.
  append("g").
  attr("id", "y-axis").
  attr("transform", "translate(" + p + ", " + p + ")").
  call(yAxis);

  const positonY = d => {
    return (
      yScale(
      new Date(null, null, null, null, d.Time.slice(0, 2), d.Time.slice(3))) +
      p);

  };
  join.attr("cy", d => {
    return positonY(d);
  });

  // User Story #9: I can see multiple tick labels on the y-axis with %M:%S time format.

  // User Story #10: I can see multiple tick labels on the x-axis that show the year.

  // User Story #11: I can see that the range of the x-axis labels are within the range of the actual x-axis data.

  // User Story #12: I can see that the range of the y-axis labels are within the range of the actual y-axis data.

  // User Story #13: I can see a legend containing descriptive text that has id="legend".

  const legend = svg.
  append("svg").
  attr("id", "legend").
  attr("w", 150).
  attr("h", 150).
  attr("x", w + p * 2 - 150).
  attr("y", h - 300);

  legend.
  append("rect").
  attr("width", 20).
  attr("height", 20).
  attr("x", 150 - 20).
  attr("y", 0).
  attr("fill", "orange").
  style("opacity", 0.7);
  legend.
  append("rect").
  attr("width", 20).
  attr("height", 20).
  attr("x", 150 - 20).
  attr("y", 20 + 10).
  attr("fill", "blue").
  style("opacity", 0.7);
  legend.
  append("text").
  attr("textLength", 120).
  text("Riders, no doping allegations").
  attr("textLength", 120).
  attr("x", 0).
  attr("y", 20).
  style("font-size", "0.7rem");
  legend.
  append("text").
  text("Riders with doping allegations").
  attr("textLength", 120).
  attr("x", 0).
  attr("y", 50).
  style("font-size", "0.7rem");

  // User Story #14: I can mouse over an area and see a tooltip with a corresponding id="tooltip" which displays more information about the area.
  const tooltip = svg.append("svg");
  tooltip.
  style("opacity", 0).
  attr("x", -1000).
  attr("id", "tooltip").
  append("rect").
  attr("width", 350).
  attr("height", 100).
  attr("rx", 15).
  attr("stroke", "black").
  attr("fill", "blue");
  const tiptext = tooltip.
  append("text").
  style("font-size", "0.7rem").
  attr("fill", "white");

  tiptext.append("tspan").attr("y", 20).attr("x", 10);
  tiptext.append("tspan").attr("y", 30).attr("x", 10);
  tiptext.append("tspan").attr("y", 50).attr("x", 10);

  join.
  attr("cursor", "pointer").
  on("mouseover", d => {
    tooltip.
    attr("data-year", new Date(d.Year, null, null).toISOString()).
    style("opacity", 0.7).
    attr("y", () => {
      if (positonY(d) > h / 2) {
        return positonY(d) - 100 - p / 2;
      }
      return positonY(d) + p / 2;
    }).
    attr("x", () => {
      if (positonX(d) > w / 2) {
        return positonX(d) - 300 - p / 3;
      }
      return positonX(d) - p / 3;
    });

    tiptext.
    select("tspan:nth-child(1)").
    text(`${d.Name}, Nationality: ${d.Nationality}`);
    tiptext.
    select("tspan:nth-child(2)").
    text(`Year: ${d.Year}, Time: ${d.Time}`);
    tiptext.select("tspan:nth-child(3)").text(`${d.Doping}`);
  }).
  on("mouseout", d => {
    tooltip.style("opacity", 0).attr("x", -1000);
  });
  // User Story #15: My tooltip should have a data-year property that corresponds to the data-xvalue of the active area.
};