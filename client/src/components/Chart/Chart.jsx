import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import "./Chart.scss";

const Chart = props => {
  const [data] = useState({
    labels: props.labels,
    datasets: [
      {
        label: "Increase %",
        data: props.data
      }
    ]
  });

  return (
    <div className="chart">
      <Bar
        data={data}
        options={{
          maintainAspectRatio: false,
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  fontFamily: "Raleway",
                  fontSize: 18,
                  fontColor: "#0e1113"
                },
                gridLines: {
                  color: "#c5c5ce"
                }
              }
            ],
            xAxes: [
              {
                ticks: {
                  fontFamily: "Raleway",
                  fontSize: 18,
                  fontWeight: 600,
                  fontColor: "#0e1113",
                  fontStyle: "600"
                },
                gridLines: {
                  color: "#c5c5ce"
                }
              }
            ]
          },
          legend: {
            display: false
          },
          elements: {
            rectangle: {
              backgroundColor: "#003eff"
            }
          },
          animation: {
            duration: 1440
          }
        }}
      />
    </div>
  );
};

export default Chart;
