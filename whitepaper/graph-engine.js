(() => {
  const SVG_NS = "http://www.w3.org/2000/svg";
  const DASH_PATTERNS = ["", "9 4", "3 3", "11 3 3 3", "1 4"];
  const BAR_FILLS = ["#ffffff", "#dddddd", "#bfbfbf", "#a3a3a3", "#e6e6e6"];
  const CHART_TYPES = new Set(["line", "bar", "scatter"]);

  const normalizeChartType = (value) => {
    const token = String(value || "")
      .trim()
      .toLowerCase();
    return CHART_TYPES.has(token) ? token : "line";
  };

  const defaultState = () => {
    return {
      chartType: "line",
      chartTitle: "Chart Title",
      xTitle: "",
      yTitle: "Y Axis",
      caption: "Graph caption",
      grid: true,
      x: ["1", "2", "3", "4"],
      series: [
        {
          name: "Series 1",
          values: [2, 4, 3, 6]
        }
      ]
    };
  };

  const toFiniteNumber = (value) => {
    if (value === null || typeof value === "undefined" || value === "") return null;
    const numeric = Number(value);
    return Number.isFinite(numeric) ? numeric : null;
  };

  const normalizeState = (raw) => {
    const fallback = defaultState();
    const source = raw && typeof raw === "object" ? raw : {};

    let xValues = Array.isArray(source.x)
      ? source.x.map((entry) => String(entry || "").trim()).filter(Boolean)
      : [];
    if (xValues.length === 0) {
      xValues = [...fallback.x];
    }

    const normalizeSeriesEntry = (entry, index) => {
      const next = entry && typeof entry === "object" ? entry : {};
      const name =
        typeof next.name === "string" && next.name.trim() ? next.name.trim() : `Series ${index + 1}`;
      const values = Array.isArray(next.values) ? next.values.map(toFiniteNumber) : [];
      while (values.length < xValues.length) {
        values.push(null);
      }
      if (values.length > xValues.length) {
        values.length = xValues.length;
      }
      return { name, values };
    };

    let series;
    if (Array.isArray(source.series)) {
      series = source.series.map((entry, index) => normalizeSeriesEntry(entry, index));
      if (series.length === 0) {
        series = [
          {
            name: "Series 1",
            values: Array(xValues.length).fill(null)
          }
        ];
      }
    } else {
      series = fallback.series.map((entry, index) => normalizeSeriesEntry(entry, index));
    }

    return {
      chartType: normalizeChartType(source.chartType || fallback.chartType),
      chartTitle: typeof source.chartTitle === "string" ? source.chartTitle : fallback.chartTitle,
      xTitle: typeof source.xTitle === "string" ? source.xTitle : fallback.xTitle,
      yTitle: typeof source.yTitle === "string" ? source.yTitle : fallback.yTitle,
      caption: typeof source.caption === "string" ? source.caption : fallback.caption,
      grid: source.grid !== false,
      x: xValues,
      series
    };
  };

  const splitCells = (row) => {
    if (row.includes("\t")) return row.split("\t");
    if (row.includes(",")) return row.split(",");
    return [row];
  };

  const parseXTable = (text) => {
    const lines = String(text || "")
      .replace(/\r/g, "")
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    const values = [];
    lines.forEach((line) => {
      splitCells(line).forEach((cell) => {
        const normalized = String(cell || "").trim();
        if (normalized) values.push(normalized);
      });
    });
    return values;
  };

  const parseSeriesTable = (text, xCountInput) => {
    const xCount = Math.max(1, Number(xCountInput) || 1);
    const lines = String(text || "")
      .replace(/\r/g, "")
      .split("\n")
      .map((line) => line.trim())
      .filter(Boolean);

    const rows = lines.map((line, index) => {
      const cells = splitCells(line).map((cell) => String(cell || "").trim());
      const name = cells[0] || `Series ${index + 1}`;
      const values = cells.slice(1).map(toFiniteNumber);
      while (values.length < xCount) {
        values.push(null);
      }
      if (values.length > xCount) {
        values.length = xCount;
      }
      return { name, values };
    });

    return rows;
  };

  const toXTable = (state) => normalizeState(state).x.join("\t");

  const toSeriesTable = (state) => {
    const normalized = normalizeState(state);
    return normalized.series
      .map((series, index) => {
        const name = series.name || `Series ${index + 1}`;
        return [name, ...series.values.map((value) => (value == null ? "" : String(value)))].join("\t");
      })
      .join("\n");
  };

  const createSvgNode = (tagName, attributes = {}) => {
    const node = document.createElementNS(SVG_NS, tagName);
    for (const [key, value] of Object.entries(attributes)) {
      node.setAttribute(key, String(value));
    }
    return node;
  };

  const formatTickNumber = (value) => {
    const rounded = Number(value);
    if (!Number.isFinite(rounded)) return "0";
    return rounded.toFixed(2).replace(/\.?0+$/, "");
  };

  const formatLegendLabel = (value, fallback) => {
    const raw = String(value || "").trim() || fallback;
    if (raw.length <= 28) return raw;
    return raw.slice(0, 27) + "...";
  };

  const niceNumber = (value, round) => {
    if (!Number.isFinite(value) || value <= 0) return 1;
    const exponent = Math.floor(Math.log10(value));
    const fraction = value / Math.pow(10, exponent);
    let niceFraction = 1;
    if (round) {
      if (fraction < 1.5) niceFraction = 1;
      else if (fraction < 3) niceFraction = 2;
      else if (fraction < 7) niceFraction = 5;
      else niceFraction = 10;
    } else {
      if (fraction <= 1) niceFraction = 1;
      else if (fraction <= 2) niceFraction = 2;
      else if (fraction <= 5) niceFraction = 5;
      else niceFraction = 10;
    }
    return niceFraction * Math.pow(10, exponent);
  };

  const buildNiceScale = (minValue, maxValue, tickCount = 5) => {
    let min = Number(minValue);
    let max = Number(maxValue);
    if (!Number.isFinite(min) || !Number.isFinite(max)) {
      min = 0;
      max = 1;
    }
    if (min === max) {
      const pad = Math.abs(min || 1) * 0.12;
      min -= pad;
      max += pad;
    }
    if (min > max) {
      const temp = min;
      min = max;
      max = temp;
    }
    const targetTicks = Math.max(2, Math.round(tickCount));
    const rawRange = Math.max(Number.EPSILON, max - min);
    const niceRange = niceNumber(rawRange, false);
    const step = niceNumber(niceRange / (targetTicks - 1), true);
    const tickMin = Math.floor(min / step) * step;
    const tickMax = Math.ceil(max / step) * step;
    const ticks = [];
    for (let value = tickMin; value <= tickMax + step * 0.5; value += step) {
      const fixed = Number(value.toFixed(10));
      ticks.push(fixed);
    }
    return {
      min: tickMin,
      max: tickMax,
      step,
      ticks
    };
  };

  const resolveNumericXInfo = (xValues) => {
    const numeric = xValues.map((entry) => Number(entry));
    const allNumeric = numeric.length > 0 && numeric.every((entry) => Number.isFinite(entry));
    if (!allNumeric) {
      return {
        numeric: false,
        values: numeric,
        scale: null
      };
    }
    const xScale = buildNiceScale(Math.min(...numeric), Math.max(...numeric), 6);
    return {
      numeric: true,
      values: numeric,
      scale: xScale
    };
  };

  const pointFillForSeries = (seriesIndex) => {
    if (seriesIndex % 3 === 1) return "#000000";
    if (seriesIndex % 3 === 2) return "#b3b3b3";
    return "#ffffff";
  };

  const legendMarker = ({
    chartType,
    group,
    x,
    y,
    width,
    seriesIndex
  }) => {
    if (!(group instanceof SVGElement)) return;

    if (chartType === "bar") {
      group.append(
        createSvgNode("rect", {
          x,
          y: y - 5,
          width: Math.max(8, width - 2),
          height: 10,
          fill: BAR_FILLS[seriesIndex % BAR_FILLS.length],
          stroke: "#000000",
          "stroke-width": 1
        })
      );
      return;
    }

    if (chartType === "scatter") {
      group.append(
        createSvgNode("circle", {
          cx: x + width * 0.5,
          cy: y,
          r: 3.8,
          fill: pointFillForSeries(seriesIndex),
          stroke: "#000000",
          "stroke-width": 1.2
        })
      );
      return;
    }

    group.append(
      createSvgNode("line", {
        x1: x,
        y1: y,
        x2: x + width,
        y2: y,
        stroke: "#000000",
        "stroke-width": 2,
        "stroke-linecap": "round",
        "stroke-dasharray": DASH_PATTERNS[seriesIndex % DASH_PATTERNS.length]
      })
    );
  };

  const render = (svg, rawState, options = {}) => {
    if (!(svg instanceof SVGElement)) return;

    const state = normalizeState(rawState);
    const chartType = normalizeChartType(state.chartType);
    const plottedSeries = state.series
      .map((series, index) => ({
        series,
        seriesIndex: index
      }))
      .filter(({ series }) => series.values.some((value) => Number.isFinite(value)));
    const width = Math.max(320, Number(options.width) || 620);
    const height = Math.max(200, Number(options.height) || 320);
    svg.style.aspectRatio = `${width} / ${height}`;
    svg.style.minHeight = "220px";
    svg.setAttribute("viewBox", `0 0 ${width} ${height}`);
    svg.innerHTML = "";

    const longestLegendLabel = plottedSeries.reduce((max, { series, seriesIndex }) => {
      const label = formatLegendLabel(series.name, `Series ${seriesIndex + 1}`);
      return Math.max(max, label.length);
    }, 0);
    const legendWidth =
      plottedSeries.length > 0 ? Math.min(220, Math.max(118, 64 + longestLegendLabel * 6)) : 0;

    const margin = {
      top: 38,
      right: 24 + legendWidth,
      bottom: 56,
      left: 68
    };
    const plotLeft = margin.left;
    const plotTop = margin.top;
    const plotWidth = Math.max(80, width - margin.left - margin.right);
    const plotHeight = Math.max(80, height - margin.top - margin.bottom);
    const plotBottom = plotTop + plotHeight;
    const plotRight = plotLeft + plotWidth;
    const xCount = Math.max(1, state.x.length);
    const xInfo =
      chartType === "bar"
        ? {
            numeric: false,
            values: state.x.map((entry) => Number(entry)),
            scale: null
          }
        : resolveNumericXInfo(state.x);
    const xValues = xInfo.values;

    const values = [];
    state.series.forEach((series) => {
      series.values.forEach((value) => {
        if (Number.isFinite(value)) {
          values.push(value);
        }
      });
    });
    if (chartType === "bar") {
      values.push(0);
    }
    if (values.length === 0) {
      values.push(0, 1);
    }
    const yScale = buildNiceScale(Math.min(...values), Math.max(...values), 6);
    const minY = yScale.min;
    const maxY = yScale.max;
    const ySpan = Math.max(Number.EPSILON, maxY - minY);
    const categoryBandWidth = Math.max(8, plotWidth / xCount);
    const barGroupWidth = Math.max(6, categoryBandWidth * 0.78);
    const barSeriesCount = Math.max(1, plottedSeries.length);
    const barSlotWidth = barGroupWidth / barSeriesCount;
    const barWidth = Math.max(2, barSlotWidth * 0.84);
    const xAtCategoryCenter = (index) => plotLeft + categoryBandWidth * (index + 0.5);
    const barXFor = (xIndex, plottedSeriesIndex) =>
      xAtCategoryCenter(xIndex) - barGroupWidth * 0.5 + plottedSeriesIndex * barSlotWidth + (barSlotWidth - barWidth) * 0.5;

    const xAtIndex = (index) => {
      if (chartType === "bar") {
        return xAtCategoryCenter(index);
      }
      if (xInfo.numeric && xInfo.scale) {
        const minX = xInfo.scale.min;
        const maxX = xInfo.scale.max;
        const xSpan = Math.max(Number.EPSILON, maxX - minX);
        const xValue = xValues[index];
        return plotLeft + ((xValue - minX) / xSpan) * plotWidth;
      }
      if (xCount === 1) return plotLeft + plotWidth / 2;
      return plotLeft + (index * plotWidth) / (xCount - 1);
    };

    const xAtValue = (value) => {
      if (!xInfo.numeric || !xInfo.scale) return plotLeft;
      const minX = xInfo.scale.min;
      const maxX = xInfo.scale.max;
      const xSpan = Math.max(Number.EPSILON, maxX - minX);
      return plotLeft + ((value - minX) / xSpan) * plotWidth;
    };

    const yAt = (value) => plotBottom - ((value - minY) / ySpan) * plotHeight;

    const yAxisX = (() => {
      if (chartType === "bar") return plotLeft;
      if (!xInfo.numeric || !xInfo.scale) return plotLeft;
      if (xInfo.scale.min <= 0 && xInfo.scale.max >= 0) return xAtValue(0);
      return xInfo.scale.min > 0 ? plotLeft : plotRight;
    })();
    const xAxisY = (() => {
      if (minY <= 0 && maxY >= 0) return yAt(0);
      return minY > 0 ? plotBottom : plotTop;
    })();

    if (state.grid) {
      const gridGroup = createSvgNode("g", { stroke: "#000000", "stroke-width": 0.8, opacity: 0.34 });
      yScale.ticks.forEach((value) => {
        const y = yAt(value);
        gridGroup.append(createSvgNode("line", { x1: plotLeft, y1: y, x2: plotRight, y2: y }));
      });
      if (chartType === "bar") {
        for (let index = 0; index < xCount; index += 1) {
          const x = xAtCategoryCenter(index);
          gridGroup.append(createSvgNode("line", { x1: x, y1: plotTop, x2: x, y2: plotBottom }));
        }
      } else if (xInfo.numeric && xInfo.scale) {
        xInfo.scale.ticks.forEach((value) => {
          const x = xAtValue(value);
          gridGroup.append(createSvgNode("line", { x1: x, y1: plotTop, x2: x, y2: plotBottom }));
        });
      } else {
        for (let index = 0; index < xCount; index += 1) {
          const x = xAtIndex(index);
          gridGroup.append(createSvgNode("line", { x1: x, y1: plotTop, x2: x, y2: plotBottom }));
        }
      }
      svg.append(gridGroup);
    }

    const axisGroup = createSvgNode("g", { stroke: "#000000", "stroke-width": 1.6, fill: "none" });
    axisGroup.append(createSvgNode("line", { x1: plotLeft, y1: xAxisY, x2: plotRight, y2: xAxisY }));
    axisGroup.append(createSvgNode("line", { x1: yAxisX, y1: plotTop, x2: yAxisX, y2: plotBottom }));
    svg.append(axisGroup);

    const yLabels = createSvgNode("g", { fill: "#000000", "font-size": 11, "font-family": "Times New Roman" });
    yScale.ticks.forEach((value) => {
      const y = yAt(value);
      const label = createSvgNode("text", {
        x: yAxisX - 8,
        y: y + 4,
        "text-anchor": "end"
      });
      label.textContent = formatTickNumber(value);
      yLabels.append(label);
    });
    svg.append(yLabels);

    const xLabels = createSvgNode("g", { fill: "#000000", "font-size": 11, "font-family": "Times New Roman" });
    if (chartType === "bar") {
      for (let index = 0; index < xCount; index += 1) {
        const label = createSvgNode("text", {
          x: xAtCategoryCenter(index),
          y: xAxisY + 16,
          "text-anchor": "middle"
        });
        label.textContent = state.x[index] || "";
        xLabels.append(label);
      }
    } else if (xInfo.numeric && xInfo.scale) {
      xInfo.scale.ticks.forEach((value) => {
        const label = createSvgNode("text", {
          x: xAtValue(value),
          y: xAxisY + 16,
          "text-anchor": "middle"
        });
        label.textContent = formatTickNumber(value);
        xLabels.append(label);
      });
    } else {
      for (let index = 0; index < xCount; index += 1) {
        const label = createSvgNode("text", {
          x: xAtIndex(index),
          y: xAxisY + 16,
          "text-anchor": "middle"
        });
        label.textContent = state.x[index] || "";
        xLabels.append(label);
      }
    }
    svg.append(xLabels);

    if (chartType === "bar") {
      plottedSeries.forEach(({ series, seriesIndex }, plottedIndex) => {
        series.values.forEach((value, valueIndex) => {
          if (!Number.isFinite(value)) return;
          const valueY = yAt(value);
          const top = Math.min(xAxisY, valueY);
          const heightPx = Math.max(1, Math.abs(valueY - xAxisY));
          const rect = createSvgNode("rect", {
            x: barXFor(valueIndex, plottedIndex),
            y: top,
            width: barWidth,
            height: heightPx,
            fill: BAR_FILLS[seriesIndex % BAR_FILLS.length],
            stroke: "#000000",
            "stroke-width": 1,
            class: "graph-hover-point",
            "data-series": formatLegendLabel(series.name, `Series ${seriesIndex + 1}`),
            "data-label": state.x[valueIndex] || String(valueIndex + 1),
            "data-value": formatTickNumber(value)
          });
          svg.append(rect);
        });
      });
    } else if (chartType === "scatter") {
      plottedSeries.forEach(({ series, seriesIndex }) => {
        series.values.forEach((value, valueIndex) => {
          if (!Number.isFinite(value)) return;
          const point = createSvgNode("circle", {
            cx: xAtIndex(valueIndex),
            cy: yAt(value),
            r: 4,
            fill: pointFillForSeries(seriesIndex),
            stroke: "#000000",
            "stroke-width": 1.2,
            class: "graph-hover-point",
            "data-series": formatLegendLabel(series.name, `Series ${seriesIndex + 1}`),
            "data-label": state.x[valueIndex] || String(valueIndex + 1),
            "data-value": formatTickNumber(value)
          });
          svg.append(point);
        });
      });
    } else {
      plottedSeries.forEach(({ series, seriesIndex }) => {
        let pathData = "";
        let segmentOpen = false;

        series.values.forEach((value, valueIndex) => {
          if (!Number.isFinite(value)) {
            segmentOpen = false;
            return;
          }
          const x = xAtIndex(valueIndex);
          const y = yAt(value);
          if (!segmentOpen) {
            pathData += `M ${x} ${y}`;
            segmentOpen = true;
          } else {
            pathData += ` L ${x} ${y}`;
          }
        });

        if (!pathData) return;

        const path = createSvgNode("path", {
          d: pathData,
          fill: "none",
          stroke: "#000000",
          "stroke-width": 2,
          "stroke-linejoin": "round",
          "stroke-linecap": "round",
          "stroke-dasharray": DASH_PATTERNS[seriesIndex % DASH_PATTERNS.length]
        });
        svg.append(path);

        series.values.forEach((value, valueIndex) => {
          if (!Number.isFinite(value)) return;
          const point = createSvgNode("circle", {
            cx: xAtIndex(valueIndex),
            cy: yAt(value),
            r: 3.2,
            fill: pointFillForSeries(seriesIndex),
            stroke: "#000000",
            "stroke-width": 1.1,
            class: "graph-hover-point",
            "data-series": formatLegendLabel(series.name, `Series ${seriesIndex + 1}`),
            "data-label": state.x[valueIndex] || String(valueIndex + 1),
            "data-value": formatTickNumber(value)
          });
          svg.append(point);
        });
      });
    }

    if (plottedSeries.length > 0) {
      const legendX = plotRight + 10;
      const legendY = plotTop + 6;
      const legendRowHeight = 18;
      const legendPaddingX = 10;
      const legendPaddingY = 8;
      const legendLineWidth = 26;
      const legendHeight = legendPaddingY * 2 + plottedSeries.length * legendRowHeight;

      const legendBox = createSvgNode("rect", {
        x: legendX,
        y: legendY,
        width: Math.max(88, legendWidth - 8),
        height: legendHeight,
        fill: "#ffffff",
        stroke: "#000000",
        "stroke-width": 1
      });
      svg.append(legendBox);

      const legendGroup = createSvgNode("g", {
        fill: "#000000",
        "font-size": 11,
        "font-family": "Times New Roman"
      });

      plottedSeries.forEach(({ series, seriesIndex }, rowIndex) => {
        const rowY = legendY + legendPaddingY + rowIndex * legendRowHeight + 8;
        legendMarker({
          chartType,
          group: legendGroup,
          x: legendX + legendPaddingX,
          y: rowY,
          width: legendLineWidth,
          seriesIndex
        });

        const label = createSvgNode("text", {
          x: legendX + legendPaddingX + legendLineWidth + 8,
          y: rowY + 4
        });
        label.textContent = formatLegendLabel(series.name, `Series ${seriesIndex + 1}`);
        legendGroup.append(label);
      });

      svg.append(legendGroup);
    }

    if (state.chartTitle) {
      const chartTitle = createSvgNode("text", {
        x: width / 2,
        y: 20,
        "text-anchor": "middle",
        fill: "#000000",
        "font-size": 16,
        "font-family": "Times New Roman",
        "font-weight": 700
      });
      chartTitle.textContent = state.chartTitle;
      svg.append(chartTitle);
    }

    if (state.xTitle) {
      const xTitle = createSvgNode("text", {
        x: width / 2,
        y: height - 12,
        "text-anchor": "middle",
        fill: "#000000",
        "font-size": 13,
        "font-family": "Times New Roman"
      });
      xTitle.textContent = state.xTitle;
      svg.append(xTitle);
    }

    if (state.yTitle) {
      const yTitle = createSvgNode("text", {
        x: 16,
        y: height / 2,
        transform: `rotate(-90 16 ${height / 2})`,
        "text-anchor": "middle",
        fill: "#000000",
        "font-size": 13,
        "font-family": "Times New Roman"
      });
      yTitle.textContent = state.yTitle;
      svg.append(yTitle);
    }
  };

  window.PaperGraphEngine = Object.freeze({
    createDefaultState: defaultState,
    normalizeChartType,
    normalizeState,
    parseXTable,
    parseSeriesTable,
    toXTable,
    toSeriesTable,
    render
  });
})();
