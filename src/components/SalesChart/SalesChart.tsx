"use client";

import React from "react";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from "chart.js";
import { Bar } from "react-chartjs-2";
import { options, datasetProp } from "./SalesChart.constants";

interface SalesChartProps {
  data: {
    labels: string[];
    values: number[];
  };
}

ChartJS.register(CategoryScale, LinearScale, BarElement);

export function SalesChart({ data }: SalesChartProps) {
  const { labels, values } = data;

  const graphData = {
    labels,
    datasets: [
      {
        data: values,
        ...datasetProp,
      },
    ],
  };

  return (
    <div className="min-h-[200px] lg:min-h-[400px]">
      <Bar data={graphData} options={options} />
    </div>
  );
}
