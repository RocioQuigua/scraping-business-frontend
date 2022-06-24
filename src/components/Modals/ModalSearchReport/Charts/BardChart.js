import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
      labels: {
        font: {
          family: 'Poppins',
          size: 16,
          weight: 'bold'
        },
      },
    },
  },
};

export const BardChart = ({ labels, values, labelName, ...props }) => {
  const data = {
    labels,
    datasets: [
      {
        label: labelName,
        data: values,
        backgroundColor: "#FFAE6B",
        fontSize: 50
      },
    ],
  };

  return <Bar options={options} data={data} {...props} />;
};
