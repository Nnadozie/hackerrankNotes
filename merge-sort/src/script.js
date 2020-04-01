const w = 1000;
const h = 300;

slowChart = (selector, dataset, action) => {
  const div = d3
    .select(selector)
    .append("div")
    .attr("style", "min-width: 100%; text-align: center");
  div
    .selectAll("h2")
    .data(action)
    .enter()
    .append("h2")
    .text((d) => d);

  const svg = d3
    .select(selector)
    .append("svg")
    .attr("width", w)
    .attr("height", h);

  svg
    .selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("x", (d, i) => i * 20)
    .attr("y", (d, i) => h - d * 1 - 60)
    .attr("width", 6)
    .attr("height", (d, i) => {
      return d * 1;
    })
    .attr("class", "bar")
    .append("title")
    .text((d) => d);

  const text = svg.selectAll("text").data(dataset);
  text
    .enter()
    .append("text")
    .attr("x", (d, i) => i * 20)
    .attr("y", (d, i) => h - 1 * d - 63)
    .text((d) => d)
    .attr("fill", (d, i) => {
      return "white";
    });

  text.exit().remove();

  const xScale = d3.scaleLinear();
  xScale.range([0, 49 * 20]);
  xScale.domain([1, 50]);
  const xAxis = d3.axisBottom(xScale);
  svg
    .append("g")
    .attr("transform", "translate(3, " + (h - 50) + ")")
    .call(xAxis);
};

prepChart = (selector) => {
  const svg = d3
    .select(selector)
    .append("svg")
    .attr("width", w)
    .attr("height", h);
};

const makeChart = (selector, dataset) => {
  const svg = d3.select(`${selector} > svg`);

  const rect = svg.selectAll("rect").data(dataset);

  rect
    .enter()
    .append("rect")
    .attr("x", (d, i) => i * 20)
    .attr("y", (d, i) => h - d * 1 - 60)
    .attr("width", 6)
    .attr("height", (d, i) => {
      return d * 1;
    })
    .attr("class", "bar")
    .append("title")
    .text((d) => d);

  rect.exit().remove();

  const text = svg.selectAll("text").data(dataset);
  text
    .enter()
    .append("text")
    .attr("x", (d, i) => i * 20)
    .attr("y", (d, i) => h - 1 * d - 63)
    .text((d) => d)
    .attr("fill", (d, i) => {
      return "white";
    });

  text.exit().remove();

  const xScale = d3.scaleLinear();
  xScale.range([0, 49 * 20]);
  xScale.domain([1, 50]);
  const xAxis = d3.axisBottom(xScale);
  svg
    .append("g")
    .attr("transform", "translate(3, " + (h - 50) + ")")
    .call(xAxis);
};

var sortArray = function (nums, start = false) {
  slowChart("#during", nums, start ? [] : ["A divide"]);
  if (nums.length <= 1) {
    return nums;
  }
  //splitarray
  let a = sortArray(nums.slice(0, nums.length / 2));
  let b = sortArray(nums.slice(nums.length / 2));

  //merge a and b
  let i = 0;
  let j = 0;

  for (let k = 0; k < nums.length; k++) {
    if (a[i] < b[j]) {
      nums[k] = a[i];
      if (i === a.length - 1) {
        const r = nums.slice(0, k + 1).concat(b.slice(j));
        slowChart("#during", r, ["A merge"]);
        return r;
      }
      i++;
    } else if (b[j] <= a[i]) {
      nums[k] = b[j];
      if (j === b.length - 1) {
        const r = nums.slice(0, k + 1).concat(a.slice(i));
        slowChart("#during", r, ["A merge"]);
        return r;
      }
      j++;
    }
  }
};

let dataset = randomIntArray({ count: 50, max: 200, unique: true });

prepChart("#before");
prepChart("#after");
makeChart("#before", dataset);
makeChart("#after", sortArray(dataset, true));

const generate = () => {
  makeChart("#before", []);
  makeChart("#after", []);
  dataset = randomIntArray({ count: 50, max: 200, unique: true });
  makeChart("#before", dataset);
  makeChart("#after", sortArray(dataset));
};
