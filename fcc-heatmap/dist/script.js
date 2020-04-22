// User Story #1: My heat map should have a title with a corresponding id="title".
d3.selection().append("div").attr("id", "container");
d3.select("#container").
append("h1").
attr("id", "title").
text("Monthly Global Land-Surface Temperature");
// User Story #2: My heat map should have a description with a corresponding id="description".
d3.select("#container").
append("h2").
attr("id", "description").
text("1753 - 2015: base temperature 8.66℃");

// User Story #3: My heat map should have an x-axis with a corresponding id="x-axis".
const svg = d3.
select("#container").
append("svg").
attr("width", 1000).
attr("height", 500);
let xScale = d3.scaleTime();
let xAxis = d3.axisBottom(xScale);
svg.append("g").attr("id", "x-axis").call(xAxis);

// User Story #4: My heat map should have a y-axis with a corresponding id="y-axis".
let yScale = d3.scaleTime();
let yAxis = d3.axisLeft(yScale);
svg.append("g").attr("id", "y-axis").call("yAxis");
// User Story #5: My heat map should have rect elements with a class="cell" that represent the data.

// User Story #6: There should be at least 4 different fill colors used for the cells.

// User Story #7: Each cell will have the properties data-month, data-year, data-temp containing their corresponding month, year, and temperature values.

// User Story #8: The data-month, data-year of each cell should be within the range of the data.

// User Story #9: My heat map should have cells that align with the corresponding month on the y-axis.

// User Story #10: My heat map should have cells that align with the corresponding year on the x-axis.

// User Story #11: My heat map should have multiple tick labels on the y-axis with the full month name.

// User Story #12: My heat map should have multiple tick labels on the x-axis with the years between 1754 and 2015.

// User Story #13: My heat map should have a legend with a corresponding id="legend".

// User Story #14: My legend should contain rect elements.

// User Story #15: The rect elements in the legend should use at least 4 different fill colors.

// User Story #16: I can mouse over an area and see a tooltip with a corresponding id="tooltip" which displays more information about the area.

// User Story #16: My tooltip should have a data-year property that corresponds to the data-year of the active area.