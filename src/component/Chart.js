import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Traffic Pengunjung",
    },
  },
};

export default function Chart() {
  const [traffic, setTraffic] = useState([]);
  const axiosTrafficRecap = async () => {
    const dataTraffic = await axios.get("/v1/api/traffic-recap", {
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("token"),
      },
    });
    console.log(traffic);
    setTraffic(dataTraffic.data.data);
    console.log(traffic);
  };
  const labels = traffic.map((e) => e.date.substring(0, 10));
  const data = {
    labels,
    datasets: [
      {
        label: "Dataset 1",
        data: traffic.map((e) => e.visitors),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
    ],
  };
  useEffect(() => {
    axiosTrafficRecap();
  }, []);

  return (
    <>
      <Line options={options} data={data} />
    </>
  );
}
