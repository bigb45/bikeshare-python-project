import React, { useState, useEffect } from "react";
import Axios from "axios";
import useRows from "./useRows";
import { setRequestMeta } from "next/dist/server/request-meta";

function useRequest() {
  const [columns, setColmns] = useState([]);
  const [records, setRecords] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [hourlyChartData, setHourlyChartData] = useState(null);
  const [dailyChartData, setDailyChartData] = useState(null);
  const [hasData, setHasData] = useState(false);

  const fetch = async (url) => {
    setLoading(true);
    try {
      console.log(url);
      const res = await Axios.get(url, {
        maxRedirects: 0,
      });

      const tableData = res.data["0"];
      setHourlyChartData(res.data["1"]);
      setDailyChartData(res.data["2"]);

      setColmns(Object.keys(tableData));

      setRecords(
        Object.entries(tableData).map(([key, value]) => {
          return value;
        }) // take out the data from the table
      );
    } catch (e) {
      setError(e);
      console.log(e);
    } finally {
      setLoading(false);
      setHasData(true);
    }
  };
  return [
    columns,
    records,
    loading,
    hourlyChartData,
    dailyChartData,
    hasData,
    error,
    fetch,
  ];
}

export default useRequest;
