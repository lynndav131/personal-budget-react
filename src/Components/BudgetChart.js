import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

function BudgetChart({ chartData }) {
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

  // Force backgroundColor to use palette if missing or invalid
  const coloredData = {
    ...chartData,
    datasets: chartData.datasets.map(ds => ({
      ...ds,
      backgroundColor:
        Array.isArray(ds.backgroundColor) &&
        ds.backgroundColor.length > 0 &&
        ds.backgroundColor.some(c => c) // at least one truthy color
            ? ds.backgroundColor
            : chartData.labels.map((_, i) => palette[i % palette.length])

    }))
  };

  return (
    <Bar
      data={coloredData}
      options={{
        responsive: true,
        plugins: {
          legend: { position: "top" },
          title: { display: true, text: "Budget Allocation" },
          tooltip: {
            callbacks: {
              label: (context) => `$${context.raw}`
            }
          }
        },
        scales: {
          x: { title: { display: true, text: "Categories" } },
          y: { beginAtZero: true, title: { display: true, text: "Amount ($)" } }
        },
        elements: {
          bar: { borderRadius: 6 }
        }
      }}
    />
  );
}

export default BudgetChart;
