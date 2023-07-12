"use client";
import { useEffect, useState } from "react";
import CitySelector from "../components/selectors/CitySelector";
import DaySelector from "../components/selectors/DaySelector";
import MonthSelector from "../components/selectors/MonthSelector";
import { Button, Loading } from "@nextui-org/react";
import Container from "../components/Container";
import { SSRProvider } from "@react-aria/ssr";
import useRows from "./custom hooks/useRows";
import useRequest from "./custom hooks/useRequest";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import LineChart from "../components/charts/LineChart";
import BarChart from "@/components/charts/BarChart";
export default function Home() {
  const [city, setCity] = useState(["New York City"]);
  const [days, setDays] = useState(["monday"]);
  const [months, setMonths] = useState(["january"]);
  const [sorting, setSorting] = useState({
    column: "",
    ascending: false,
  });
  const [rowData, rowCount, setRowData] = useRows([]);
  const [
    columns,
    records,
    loading,
    hourlyChartData,
    dailyChartData,
    hasData,
    error,
    fetch,
  ] = useRequest();

  useEffect(() => {
    setRowData(
      records[0]?.map((_, i) =>
        records.map((record) => {
          return record[i];
        })
      )
    );
  }, [records]);

  const handleHeaderClick = (column, ascending, index) => {
    sortRows(index);
    setSorting({ column: column, ascending: ascending });
    console.log("sorting by column #", index);
  };

  const sortRows = (columnIndex) => {
    setRowData((prev) => {
      return prev.sort((a, b) => {
        const rowA = a[columnIndex];
        const rowB = b[columnIndex];
        return sorting.ascending
          ? rowA.localeCompare(rowB)
          : rowB.localeCompare(rowA);
      });
    });
  };

  const fetchTable = () => {
    let localHost = "";
    let googleServer = "";
    const daysArray = Array.from(days).length;
    const monthsArray = Array.from(months).length;

    console.log(daysArray, monthsArray);
    googleServer = `http://34.32.137.18:8000/api/bikeshare/?days=${Array.from(
      days
    )}&months=${Array.from(months)}&city=${city}&count=${rowCount}`;
    localHost = `http://127.0.0.1:8000/api/bikeshare/?days=${Array.from(
      days
    )}&months=${Array.from(months)}&city=${city}&count=${rowCount}`;
    if (daysArray && monthsArray) {
      fetch(googleServer);
    } else {
      alert("PLEASE FILL THE FILTERS");
    }

    fetch(googleServer);
  };

  return (
    <SSRProvider>
      <SkeletonTheme
        baseColor="#666"
        highlightColor="#444"
        enableAnimation={false}
      >
        <main className="flex min-h-screen flex-col p-24 justify-between w-full items-center bg-gradient-to-r from-blue-200">
          <div className="flex  sm:flex-col  md:flex-row lg:items-start lg:space-x-40 justify-center">
            <Container>
              <div className="flex flex-row items-center space-x-20">
                <h1 className="text-slate-500 text-xl">City:</h1>
                <div className="flex flex-col justify-center ">
                  <CitySelector setCity={setCity} />
                </div>

                <h1 className="text-slate-500 text-xl">Filters:</h1>
                <div className="flex flex-col justify-center items-center space-y-20">
                  <DaySelector setDay={setDays} />
                  <MonthSelector setMonths={setMonths} />
                </div>
              </div>
              <Button className="m-0" onPress={fetchTable}>
                Load Data
              </Button>
            </Container>
          </div>

          <div className="flex flex-row flex-wrap  justify-center">
            {loading ? (
              <Container>
                <Skeleton width={400} height={200} className="animate-pulse" />
              </Container>
            ) : (
              hasData && (
                <div>
                  <Container>
                    <LineChart data={hourlyChartData}></LineChart>
                  </Container>
                  <Container>
                    <BarChart data={dailyChartData}></BarChart>
                  </Container>
                </div>
              )
            )}
          </div>

          <div>
            {loading ? (
              <Container>
                <Skeleton count={15} width={1000} className="animate-pulse" />
              </Container>
            ) : (
              hasData && (
                <Container>
                  {
                    <table className="">
                      <thead>
                        <tr className="space-x-1 gap-3">
                          {columns.map((column, index) => {
                            return (
                              <th
                                onClick={() => {
                                  handleHeaderClick(
                                    column,
                                    !sorting.ascending,
                                    index
                                  );
                                }}
                                className="border-b border-slate-500 px-10 py-1 text-white bg-blue-500 hover:bg-blue-600 transition-colors duration-200 ease-in-out "
                                key={column}
                              >
                                {column}
                              </th>
                            );
                          })}
                        </tr>
                      </thead>
                      <tbody className="">
                        {rowData?.map((row, i) => {
                          return (
                            <tr key={i} className="h-[80px]">
                              {row.map((cell, index) => {
                                return (
                                  <td
                                    className={`align-middle space-x-1 space-y-3 px-10  ${
                                      i % 2 ? "bg-slate-200" : "bg-inherit"
                                    }`}
                                    key={index}
                                  >
                                    {cell}
                                  </td>
                                );
                              })}
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  }
                  <Button className="m-0" onPress={fetchTable}>
                    Load More
                  </Button>
                </Container>
              )
            )}
          </div>
        </main>
      </SkeletonTheme>
    </SSRProvider>
  );
}
// TODO:
// add charts and graphs showing the stats of the selected data
// lazyload data instead of button
//
