let currentTechFilter = "all";
let currentSizeFilter = "all";

const populateFilters = (data) => {
    // 1. Populate screen technology buttons
    d3.select("#filters_screen")
        .selectAll(".filter")
        .data(filters_screen)
        .join("button")
        .attr("class", d => `filter ${d.isActive ? "active" : ""}`)
        .text(d => d.label)
        .on("click", (e, d) => {
            if (!d.isActive) {
                filters_screen.forEach(f => f.isActive = (f.id === d.id));
                d3.selectAll("#filters_screen .filter").classed("active", f => f.id === d.id);
                currentTechFilter = d.id;
                applyFilters(data);
            }
        });

    // 2. Populate screen size buttons (Advance)
    d3.select("#filters_size")
        .selectAll(".filter")
        .data(filters_size)
        .join("button")
        .attr("class", d => `filter ${d.isActive ? "active" : ""}`)
        .text(d => d.label)
        .on("click", (e, d) => {
            if (!d.isActive) {
                filters_size.forEach(f => f.isActive = (f.id === d.id));
                d3.selectAll("#filters_size .filter").classed("active", f => f.id === d.id);
                currentSizeFilter = d.size;
                applyFilters(data);
            }
        });
};

const applyFilters = (data) => {
    let filtered = data;

    if (currentTechFilter !== "all") {
        filtered = filtered.filter(tv => tv.screenTech === currentTechFilter);
    }
    if (currentSizeFilter !== "all" && currentSizeFilter !== null) {
        filtered = filtered.filter(tv => tv.screenSize === currentSizeFilter);
    }

    const updatedBins = binGenerator(filtered);

    d3.selectAll("#histogram rect")
        .data(updatedBins)
        .transition()
        .duration(500)
        .ease(d3.easeCubicInOut)
        .attr("y", d => yScale(d.length))
        .attr("height", d => innerHeight - yScale(d.length));
};

// Exercise 2 Step 3: Create tooltip group for scatterplot
const createTooltip = () => {
    const tooltip = innerChartS
        .append("g")
        .attr("class", "tooltip")
        .style("opacity", 0)
        .style("pointer-events", "none");

    // Tooltip background rectangle
    tooltip
        .append("rect")
        .attr("width", tooltipWidth)
        .attr("height", tooltipHeight)
        .attr("rx", 4)
        .attr("ry", 4)
        .attr("fill", barColor)
        .attr("fill-opacity", 0.85);

    // Tooltip text
    tooltip
        .append("text")
        .text("NA")
        .attr("x", tooltipWidth / 2)
        .attr("y", tooltipHeight / 2 + 2)
        .attr("text-anchor", "middle")
        .attr("alignment-baseline", "middle")
        .attr("fill", "white")
        .style("font-weight", 700)
        .style("font-size", "13px");
};

// Exercise 2 Step 3.5: Handle mouse events for scatterplot circles
const handleMouseEvents = () => {
    const tooltip = innerChartS.select(".tooltip");

    innerChartS.selectAll("circle")
        .on("mouseenter", (e, d) => {
            tooltip.select("text")
                .text(`${d.screenSize} inches`);

            const cx = +e.target.getAttribute("cx");
            const cy = +e.target.getAttribute("cy");

            tooltip
                .interrupt()
                .attr("transform", `translate(${cx - 0.5 * tooltipWidth}, ${cy - 1.5 * tooltipHeight})`)
                .transition()
                .duration(200)
                .style("opacity", 1);
        })
        .on("mouseleave", () => {
            tooltip
                .interrupt()
                .transition()
                .duration(200)
                .style("opacity", 0);
        });
};