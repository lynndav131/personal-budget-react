import { useEffect, useRef } from "react";
import * as d3 from "d3";

function BudgetD3Chart({ data }) {
  const d3Ref = useRef();

  useEffect(() => {
    if (data) {
      const width = 500;
      const height = 300;
      const margin = { top: 30, right: 20, bottom: 50, left: 60 };

      const svg = d3.select(d3Ref.current);
      svg.selectAll("*").remove();

      svg.attr("width", width).attr("height", height);

      // Define a reusable color palette
      const palette = [
        "#4e79a7", // blue
        "#f28e2b", // orange
        "#e15759", // red
        "#76b7b2", // teal
        "#59a14f", // green
        "#edc949", // yellow
        "#af7aa1", // purple
        "#ff9da7"  // pink
      ];

      // Scales
      const x = d3.scaleBand()
        .domain(data.map(d => d.title))
        .range([margin.left, width - margin.right])
        .padding(0.2);

      const y = d3.scaleLinear()
        .domain([0, d3.max(data, d => d.budget) * 1.2])
        .range([height - margin.bottom, margin.top]);

      // Bars
      svg.selectAll("rect.bar")
        .data(data)
        .join("rect")
        .attr("class", "bar")
        .attr("x", d => x(d.title))
        .attr("y", d => y(d.budget))
        .attr("width", x.bandwidth())
        .attr("height", d => y(0) - y(d.budget))
        .attr("fill", (d, i) => d.color || palette[i % palette.length]) // fallback palette
        .attr("rx", 4); // rounded corners

      // Value labels
      svg.selectAll("text.value")
        .data(data)
        .join("text")
        .attr("class", "value")
        .attr("x", d => x(d.title) + x.bandwidth() / 2)
        .attr("y", d => y(d.budget) - 5)
        .attr("text-anchor", "middle")
        .style("font-size", "12px")
        .text(d => `$${d.budget}`);

      // X Axis
      svg.append("g")
        .attr("transform", `translate(0,${height - margin.bottom})`)
        .call(d3.axisBottom(x));

      // Y Axis
      svg.append("g")
        .attr("transform", `translate(${margin.left},0)`)
        .call(d3.axisLeft(y));
    }
  }, [data]);

  return <svg ref={d3Ref}></svg>;
}

export default BudgetD3Chart;
