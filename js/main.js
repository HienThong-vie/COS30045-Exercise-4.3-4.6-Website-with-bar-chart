// Exercises 4.3 – 4.7: horizontal bar chart of TV models per brand

// 4.3 – set up
const viewWidth = 600;
const viewHeight = 700;

const svg = d3
  .select(".responsive-svg-container")
  .append("svg")
  .attr("viewBox", `0 0 ${viewWidth} ${viewHeight}`)
  .attr("role", "img")
  .attr(
    "aria-label",
    "Horizontal bar chart of the number of TV models registered by each brand",
  );

// 4.4 – load data
d3.csv("data/tvBrandCount.csv", (d) => {
  return {
    brand: d.brand,
    count: +d.count,
  };
}).then((data) => {
  console.log("Loaded data:", data);
  console.log("Number of brands:", data.length);
  console.log(
    "Max count:",
    d3.max(data, (d) => d.count),
  );
  console.log(
    "Min count:",
    d3.min(data, (d) => d.count),
  );
  console.log(
    "Extent [min, max]:",
    d3.extent(data, (d) => d.count),
  );

  data.sort((a, b) => b.count - a.count);
  console.log("Sorted data:", data);

  drawBarChart(data);
});

// 4.5 – 4.7: bind data, scale, label
const drawBarChart = (data) => {
  const labelSpace = 120;

  // 4.6 – scales
  const xScale = d3
    .scaleLinear()
    .domain([0, 1200])
    .range([0, viewWidth - labelSpace - 20]);

  const yScale = d3
    .scaleBand()
    .domain(data.map((d) => d.brand))
    .range([0, viewHeight])
    .padding(0.35);

  // EXTRA: average line (drawn first so it is behind the bars)
  const average = d3.mean(data, (d) => d.count);
  svg
    .append("line")
    .attr("class", "average-line")
    .attr("x1", labelSpace + xScale(average))
    .attr("x2", labelSpace + xScale(average))
    .attr("y1", 0)
    .attr("y2", viewHeight)
    .attr("stroke", "#d97706")
    .attr("stroke-width", 2)
    .attr("stroke-dasharray", "6 4")
    .attr("opacity", 0.7);
  svg
    .append("text")
    .attr("x", labelSpace + xScale(average) + 6)
    .attr("y", viewHeight - 8)
    .text(`Average: ${Math.round(average)} models`)
    .style("font-size", "12px")
    .style("fill", "#b45309");

  // 4.5 / 4.7 – one group per brand
  const barAndLabel = svg
    .selectAll("g.bar-group")
    .data(data)
    .join("g")
    .attr("class", "bar-group")
    .attr("transform", (d) => `translate(0, ${yScale(d.brand)})`);

  barAndLabel
    .append("rect")
    .attr("class", (d) => `bar bar-${d.count}`)
    .attr("x", labelSpace)
    .attr("y", 0)
    .attr("height", yScale.bandwidth())
    .attr("fill", "#2563eb")
    .attr("width", 0) // EXTRA: bars grow in
    .transition()
    .duration(800)
    .delay((d, i) => i * 40)
    .attr("width", (d) => xScale(d.count));

  // brand label
  barAndLabel
    .append("text")
    .attr("class", "brand-label")
    .text((d) => d.brand)
    .attr("x", labelSpace - 8)
    .attr("y", yScale.bandwidth() / 2)
    .attr("dominant-baseline", "middle")
    .attr("text-anchor", "end")
    .style("font-size", "13px");

  // value label
  barAndLabel
    .append("text")
    .attr("class", "value-label")
    .text((d) => d.count)
    .attr("x", (d) => labelSpace + xScale(d.count) + 5)
    .attr("y", yScale.bandwidth() / 2)
    .attr("dominant-baseline", "middle")
    .style("font-size", "12px")
    .style("fill", "#3f3f46")
    // EXTRA: white outline so the average line doesn't cross the numbers
    .style("stroke", "#fff")
    .style("stroke-width", 4)
    .style("paint-order", "stroke");

  // EXTRA: hover highlight
  barAndLabel
    .on("mouseenter", function () {
      d3.select(this).classed("is-hovered", true);
    })
    .on("mouseleave", function () {
      d3.select(this).classed("is-hovered", false);
    });
};
