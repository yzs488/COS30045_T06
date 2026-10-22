// Dimensions and margins
const margin = { top: 40, right: 30, bottom: 50, left: 70 };
const width = 800;
const height = 400;
const innerWidth = width - margin.left - margin.right;
const innerHeight = height - margin.top - margin.bottom;

// Inner chart reference for scatterplot
let innerChartS;

// Tooltip dimensions
const tooltipWidth = 110;
const tooltipHeight = 36;

// Bin generator for energy consumption
const binGenerator = d3.bin()
    .value(d => d.energyConsumption);

// Visual styles
const barColor = "#606464";
const bodyBackgroundColor = "#fffaf0";

// Global scales for Histogram
const xScale = d3.scaleLinear();
const yScale = d3.scaleLinear();

// Global scales for Scatterplot
const xScaleS = d3.scaleLinear();
const yScaleS = d3.scaleLinear();
const colorScale = d3.scaleOrdinal();

// Screen technology filters
const filters_screen = [
    { id: "all", label: "All", isActive: true },
    { id: "LED", label: "LED", isActive: false },
    { id: "LCD", label: "LCD", isActive: false },
    { id: "OLED", label: "OLED", isActive: false }
];

// Screen size filters (Advance)
const filters_size = [
    { id: "all", label: "All Sizes", size: null, isActive: true },
    { id: "24", label: "24\"", size: 24, isActive: false },
    { id: "32", label: "32\"", size: 32, isActive: false },
    { id: "55", label: "55\"", size: 55, isActive: false },
    { id: "65", label: "65\"", size: 65, isActive: false },
    { id: "98", label: "98\"", size: 98, isActive: false }
];