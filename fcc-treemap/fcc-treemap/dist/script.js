// User Story #1: My tree map should have a title with a corresponding id="title".

// User Story #2: My tree map should have a description with a corresponding id="description".

// User Story #3: My tree map should have rect elements with a corresponding class="tile" that represent the data.
const w = h = 1000;

const svg = d3.
select("#mapArea").
append("svg").
attr("width", w).
attr("height", h);

const legend = d3.
select("#mapArea").
append("svg").
attr("id", "legend").
attr("width", w).
attr("height", 50);

const tooltip = d3.
select("body").
append("div").
attr("id", "tooltip").
style("opacity", 0);

const plotMap = data => {
  //console.log(data);
  let root = d3.
  hierarchy(data).
  sum(d => d.value).
  sort((a, b) => b.value - a.value);
  const treemap = d3.treemap().size([w, h]).padding(1);
  root = treemap(root);
  //console.log(root.leaves());
  const leafJoin = svg.selectAll("g").data(root.leaves());
  const leaf = leafJoin.
  enter().
  append("g").
  attr("transform", d => `translate(${d.x0},${d.y0})`);
  const colorScale = d3.scaleOrdinal(d3.schemePaired);
  leaf.
  append("rect").
  attr("width", d => d.x1 - d.x0).
  attr("height", d => d.y1 - d.y0).
  attr("fill", d => {
    while (d.depth > 1) d = d.parent;
    console.log(d.data.name);
    return colorScale(d.data.name);
  }).
  attr("class", "tile").
  attr("data-name", d => d.data.name).
  attr("data-category", d => d.data.category).
  attr("data-value", d => d.data.value);
  leaf.
  append("text").
  attr("fill", "black").
  attr("y", 30).
  attr("x", 10).
  append("tspan").
  text(d => d.data.name);

  leaf.
  on("mouseover", function (d) {
    tooltip.
    style("top", d3.event.pageY + "px").
    style("left", d3.event.pageX + "px").
    transition().
    style("opacity", 0.9).
    attr("data-value", () => d.data.value);
    tooltip.html(() => {
      return `Category: ${d.data.category}<br>Name:${d.data.name}<br>Value:${d.data.value}`;
    });
  }).
  on("mouseout", function () {
    tooltip.transition().style("opacity", 0);
  });

  //code from example
  var categories = root.leaves().map(function (nodes) {
    return nodes.data.category;
  });
  categories = categories.filter(function (category, index, self) {
    return self.indexOf(category) === index;
  });
  //end of code from example

  console.log(categories);
  const ll = legend.
  selectAll("g").
  data(categories).
  enter().
  append("g").
  attr("transform", (d, i) => `translate(${i * 40}, 0)`);

  ll.append("rect").
  attr("width", 50).
  attr("height", 50).
  attr("class", "legend-item").
  attr("fill", d => colorScale(d));

  ll.append("text").
  append("tspan").
  text(d => d).
  attr("y", 20);
};

d3.json(
"https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json").
then(data => {
  plotMap(data);
});
// User Story #4: There should be at least 2 different fill colors used for the tiles.

// User Story #5: Each tile should have the properties data-name, data-category, and data-value containing their corresponding name, category, and value.

// User Story #6: The area of each tile should correspond to the data-value amount: tiles with a larger data-value should have a bigger area.

// User Story #7: My tree map should have a legend with corresponding id="legend".

// User Story #8: My legend should have rect elements with a corresponding class="legend-item".

// User Story #9: The rect elements in the legend should use at least 2 different fill colors.

// User Story #10: I can mouse over an area and see a tooltip with a corresponding id="tooltip" which displays more information about the area.

// User Story #11: My tooltip should have a data-value property that corresponds to the data-value of the active area.