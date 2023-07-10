import React, { useState } from "react";

function useRows(initial = []) {
  const [state, setState] = useState(initial);
  const [rowCount, setRowCount] = useState(10);
  const setRowData = (rows) => {
    setState(rows);
    setRowCount(rowCount + 10);
  };
  return [state, rowCount, setRowData];
}

export default useRows;
