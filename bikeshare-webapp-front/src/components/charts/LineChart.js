import { useEffect } from "react";
import { Chart } from "chart.js";
function LineChart(props) {
  const dataLables = props.data["data"]["hour"];
  const data = props.data["data"]["rides"];
  const dataDuration = props.data["data"]["trip duration"];
  const label = props.data["label"]["0"];
  const durationLabel = props.data["label"]["1"];
  const title = props.data["title"];
  useEffect(() => {
    var ctx = document.getElementById("LineChart").getContext("2d");

    var LineChart = new Chart(ctx, {
      type: "line",
      data: {
        labels: dataLables,
        datasets: [
          {
            label: label,
            data: data,
            borderColor: "rgb(75, 192, 192)",
            backgroundColor: "rgb(75, 192, 192,0.5)",
            borderWidth: 2,
          },
          {
            label: durationLabel,
            data: dataDuration,
            borderColor: "rgb(109, 253, 181)",
            backgroundColor: "rgb(109, 253, 181,0.5)",
            borderWidth: 2,
          },
        ],
      },
    });
  }, []);
  return (
    <>
      {/* line chart */}
      <h1 className="mx-auto text-xl font-semibold capitalize">{title}</h1>
      <div className="w-[1100px] flex mx-auto my-auto">
        <div className="border border-gray-400 pt-0 rounded-xl w-full h-fit my-auto shadow-xl">
          <canvas id="LineChart"></canvas>
        </div>
      </div>
    </>
  );
}

export default LineChart;
