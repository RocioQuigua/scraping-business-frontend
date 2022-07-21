import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

export const DoughnutChart = ({ labels, values, labelName, ...props }) => {
  const data = {
    labels,
    datasets: [
      {
        label: labelName,
        data: values,
        backgroundColor: ["#9BECD7", "#99C9FF", "#D5ECF3", "#1D74FB"],
        borderColor: ["#67BDA7", "#99C9FF", "#D5ECF3", "#1D74FB"],
        borderWidth: 4,
      },
    ],
  };

  const options = {
    plugins: {
      legend: {
        labels: {
          font: {
            family: 'Poppins',
            size: 30,
            weight: 'bold'
          },
        },
      },
    },
  };
  return <Doughnut data={data} options={options} {...props} />;
};
