const req = new XMLHttpRequest();
req.open(
"GET",
"https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json",
true);

req.send();
let data = [];
req.onload = () => {
  data = JSON.parse(req.responseText).data;

  const display = document.getElementById("display");
  const padding = 60;
  const w = display.clientWidth * 0.7;
  const barWidth = w / 320;
  const h = w * (140 / 350);

  d3.select("#title").
  style("width", w + "px").
  style("max-width", w + "px");

  d3.select("#dummyNav").
  style("width", w + "px").
  style("max-width", w + "px");

  const svg = d3.
  select("#display").
  style("width", w + "px").

  style("max-width", w + "px").
  append("svg").
  attr("width", w).
  attr("height", h);

  svg.
  append("text").
  attr("transform", "rotate(-90)").
  attr("x", -h / 2 - padding - 15).
  attr("y", padding - 5).
  attr("id", "y-label").
  text("Gross Domestic Product (Billion USD)");

  svg.
  append("text").
  attr("x", padding).
  attr("y", h - padding / 10).
  attr("id", "x-label").
  text(
  "Data source: https://raw.githubusercontent.com/FreeCodeCamp/ProjectReferenceData/master/GDP-data.json");


  const yScale = d3.scaleLinear().domain([0, d3.max(data, d => d[1])]);
  // .range([h - 2* padding, 0]);

  const yAxis = d3.axisLeft(yScale.range([h - 2 * padding, 0]));

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
  })]).

  range([0, barWidth * data.length]);

  const xAxis = d3.axisBottom(xScale);

  svg.
  append("g").
  attr("id", "x-axis").
  attr(
  "transform",
  "translate(" + padding + ", " + (h - padding / 1.3) + ")").

  call(xAxis);

  svg.
  append("g").
  attr("id", "y-axis").
  attr("transform", "translate(" + padding / 1.3 + ", " + padding + ")").
  call(yAxis);

  const rect = d3.
  select("#display").
  append("div").
  attr("id", "tooltip").
  style("opacity", 0);

  const bind = svg.selectAll("rect").data(data).enter();

  bind.
  append("rect").
  attr("fill", "#f9f8f8").
  attr("stroke", "#f9f8f8").
  style("opacity", 0.7).
  attr("x", (d, i) => {
    return (
      xScale(new Date(d[0])) + padding + (barWidth / 1.5 - barWidth / 2) / 2);

  }).
  attr("y", (d, i) => {
    return h - yScale.range([0, h - padding * 2])(d[1]) - padding;
  }).
  attr("width", (d, i) => {
    return barWidth / 2;
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
  }).
  on("mouseover", (d, i) => {
    const da = new Date(d[0]);
    let qua = null;
    switch (da.getMonth()) {
      case 0:
        qua = "Q1";
        break;
      case 3:
        qua = "Q2";
        break;
      case 6:
        qua = "Q3";
        break;
      case 9:
        qua = "Q4";
        break;
      default:
        qua = "";}

    rect.
    attr("data-date", d[0]).
    style("top", h / 2 - padding + "px").
    style("left", xScale(da) + padding - 10 + "px").
    text("$" + d[1] + "B" + "\n" + da.getFullYear() + " " + qua).
    transition().
    duration(200).
    style("opacity", 1);
  }).
  on("mouseout", () => {
    rect.transition().duration(500).style("opacity", 0);
  });

  const maxy = d3.max(data, d => {
    return new Date(d[0]);
  });
  const maxm = d3.max(data, d => {
    return d[1];
  });
  const minm = d3.min(data, d => {
    return d[1];
  });

  rect.
  style("top", h - padding * 1.9 + "px").
  style("left", xScale(maxy) + padding - 15 + "px").
  style("opacity", 1).
  transition().
  style("top", padding / 10 + "px").
  duration(10000);

  const text = rect.append("text").text("$" + minm + "B");

  text.
  transition().
  tween("text", function () {
    var selection = d3.select(this); // selection of node being transitioned
    var start = d3.select(this).text(); // start value prior to transition
    var end = maxm; // specified end value
    var interpolator = d3.interpolateString(start, end); // d3 interpolator

    return function (t) {
      selection.text("$" + Math.round(interpolator(t)) + "B");
    }; // return value
  }).
  duration(10000);

  bind.
  append("rect").
  attr("fill", "#f695b1").
  attr("stroke", "#f695b1").
  style("opacity", 1).
  attr("x", (d, i) => {
    return xScale(new Date(d[0])) + padding;
  }).
  attr("y", (d, i) => {
    return h - yScale.range([0, h - padding * 2])(d[1]) - padding;
  }).
  attr("width", (d, i) => {
    return barWidth / 1.5;
  }).
  attr("height", (d, i) => {
    return yScale.range([0, h - padding * 2])(d[1]);
  }).
  transition().
  attr("height", 0).
  duration(10000);

  bind.
  append("rect").
  attr("fill", "#f695b1").
  attr("stroke", "#f695b1").
  attr("x", (d, i) => {
    return xScale(new Date(d[0])) + padding;
  }).
  attr("y", (d, i) => {
    return padding;
  }).
  attr("width", (d, i) => {
    return barWidth / 1.5;
  }).
  attr("height", (d, i) => {
    return h - padding * 2 - yScale.range([0, h - padding * 2])(d[1]);
  });
};

/*
   
   User Story #9: Each bar element's height should accurately represent the data's corresponding GDP.
   
   User Story #10: The data-date attribute and its corresponding bar element should align with the corresponding value on the x-axis.
   
   User Story #11: The data-gdp attribute and its corresponding bar element should align with the corresponding value on the y-axis.
   
   User Story #12: I can mouse over an area and see a tooltip with a corresponding id="tooltip" which displays more information about the area.
   
   User Story #13: My tooltip should have a data-date property that corresponds to the data-date of the active area.
   */