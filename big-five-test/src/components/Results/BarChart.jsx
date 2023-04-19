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

const MyBarChart = ({ data, labels }) => {
    const chartRef = useRef(null);
    const chartInstance = useRef(null);

    const colors = [
        "rgba(75, 192, 192, 1)",
        "rgba(255, 206, 86, 1)",
        "rgba(255, 99, 132, 1)",
        "rgba(153, 102, 255, 1)",
        "rgba(255, 159, 64, 1)",
    ];

    const backgroundColors = colors.map(color => color.replace("1)", "0.2)"));
    
    useEffect(() => {
        if (chartRef && chartRef.current) {
            if (chartInstance.current) {
                chartInstance.current.destroy();
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
                        },
                    ],
                },
                options: {
                    scales: {
                        y: {
                            min: 0,
                            max: 100,
                            beginAtZero: true,
                        },
                    },
                },
            });
        }

        return () => {
            if (chartInstance.current) {
                chartInstance.current.destroy();
            }
        };
    }, [data, labels]);

    return <canvas ref={chartRef}></canvas>;
};

export default MyBarChart;
