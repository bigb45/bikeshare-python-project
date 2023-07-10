import { useEffect } from "react";
import { Chart } from "chart.js";
function BarChart(props) {
  const dataLables = props.data["data"]["day"];
  const maleData = props.data["data"]["rides male"];
  const femaleData = props.data["data"]["rides female"];
  const label = props.data["label"];
  const title = props.data["title"];
  console.log(props.data);
  useEffect(() => {
    var ctx = document.getElementById("BarChart").getContext("2d");
    var BarChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: dataLables,
        datasets: [
          {
            label: "Male",
            data: maleData,
            borderColor: "rgb(75, 192, 192)",
            backgroundColor: "rgb(75, 192, 192,0.5)",
            borderWidth: 2,
          },
          {
            label: "Female",
            data: femaleData,
            borderColor: "rgb(255, 99, 132)",
            backgroundColor: "rgb(255, 99, 132,0.5)",
            borderWidth: 2,
          },
        ],
      },
    });
  }, []);

  return (
    <>
      {/* Bar chart */}
      <h1 className=" mx-auto mt-10 text-xl font-semibold capitalize ">
        {title}
      </h1>
      <div className="w-[1100px]  flex mx-auto my-auto">
        <div className="border border-gray-400 pt-0 rounded-xl  w-full h-fit my-auto  shadow-xl">
          <canvas id="BarChart"></canvas>
        </div>
      </div>
    </>
  );
}

export default BarChart;
