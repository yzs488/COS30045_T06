// Load the CSV data and initialize visualizations
d3.csv("data/Ex6_TVdata.csv", d => ({
    brand: d.brand,
    model: d.model,
    screenSize: +d.screenSize,
    screenTech: d.screenTech,
    energyConsumption: +d.energyConsumption,
    star: +d.star
})).then(data => {
    // 1. Data cleaning: filter out extreme values
    const cleanData = data.filter(d => d.energyConsumption > 0 && d.energyConsumption <= 1800);

    // 2. Render Exercise 1 components
    drawHistogram(cleanData);
    populateFilters(cleanData);

    // 3. Render Exercise 2 components
    drawScatterplot(cleanData);
    createTooltip();
    handleMouseEvents();
}).catch(error => {
    console.error("Error loading the CSV file:", error);
});