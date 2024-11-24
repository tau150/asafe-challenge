import { ChartOptions } from "chart.js";

export const datasetProp = {
  label: "Total Units Sold",
  backgroundColor: "rgba(75, 192, 192, 0.6)",
  borderColor: "rgba(75, 192, 192, 1)",
  borderWidth: 1,
};

export const options: ChartOptions<"bar"> = {
  indexAxis: "y",
  responsive: true,
  maintainAspectRatio: true,
  aspectRatio: 2,
  animation: {
    duration: 0,
  },
  scales: {
    x: {
      beginAtZero: true,
    },
  },
};
