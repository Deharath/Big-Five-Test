import React, { useEffect, useRef } from "react";
import {
  Chart,
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";

Chart.register(
  BarController,
  BarElement,
  CategoryScale,
  LinearScale,
  Title,
  Tooltip
);

const MyBarChart = ({ data, labels, onBarClick }) => {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);

  const colors = [
    "rgba(75, 192, 192, 1)",
    "rgba(255, 206, 86, 1)",
    "rgba(255, 99, 132, 1)",
    "rgba(153, 102, 255, 1)",
    "rgba(255, 159, 64, 1)",
  ];

  const backgroundColors = colors.map((color) =>
    color.replace("1)", "0.2)")
  );

  useEffect(() => {
    if (chartRef && chartRef.current) {
      if (chartInstance.current) {
        chartInstance.current.destroy();
        chartInstance.current = null;
      }

      chartInstance.current = new Chart(chartRef.current, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              data: data,
              backgroundColor: backgroundColors,
              borderColor: colors,
              borderWidth: 1,
              barThickness: 24,
              barPercentage: 0.5,
              categoryPercentage: 0.5,
            },
          ],
        },
        options: {
          onClick: (event) => {
            const activePoints = chartInstance.current.getElementsAtEventForMode(event, 'nearest', { intersect: true }, true);
            if (activePoints.length) {
              const selectedIndex = activePoints[0].index;
              onBarClick(selectedIndex + 1);
            }
          },
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            tooltip: {
              enabled: false,
            },
          },
          indexAxis: "y",
          layout: {
            padding: {
              left: 0,
              right: 25,
            }
          },
          scales: {
            y: {
              display: true,
              grid: {
                display: false,
              },
              ticks: {
                color: "#000",
                font: {
                  size: 15,
                  family: "Segoe UI",
                },
              },
            },
            x: {
              min: 0,
              max: 100,
              beginAtZero: true,
              grid: {
                display: false,
              },
              ticks: {
                display: false,
              },
            },
          },
          animation: {
            onComplete: () => {
              if (!chartInstance.current || !chartRef.current) return;
              const ctx = chartRef.current.getContext("2d");
              ctx.font = "14px Segoe UI";
              ctx.fillStyle = "#333";
              chartInstance.current.data.datasets.forEach((dataset, i) => {
                const meta = chartInstance.current.getDatasetMeta(i);
                meta.data.forEach((bar, index) => {
                  const data = dataset.data[index] + "%";
                  ctx.fillText(data, bar.x + 8, bar.y + 6);
                });
              });
            },
          },
        },
      });
    }
  }, [data, labels]);

  return <canvas ref={chartRef}></canvas>;
};

export default MyBarChart;
