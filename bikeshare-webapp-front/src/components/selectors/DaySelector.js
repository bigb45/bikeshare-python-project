import React, { useState } from "react";
import { Dropdown } from "@nextui-org/react";
import { useSelect } from "../../app/custom hooks/useSelect";

function DaySelector(props) {
  const [days, setDays] = useSelect(new Set(["Monday"]), props.setDay);
  const selectedValue = React.useMemo(
    () => Array.from(days).join(", ").replaceAll("_", " "),
    [days]
  );
  return (
    <div>
      <Dropdown>
        <Dropdown.Button flat className="">
          {selectedValue || "Select a day"}
        </Dropdown.Button>
        <Dropdown.Menu
          selectionMode="multiple"
          selectedKeys={days}
          onSelectionChange={setDays}
          aria-label="Static Actions"
        >
          <Dropdown.Item key="Monday">Monday</Dropdown.Item>
          <Dropdown.Item key="Tuesday">Tuesday</Dropdown.Item>
          <Dropdown.Item key="Wednesday">Wednesday</Dropdown.Item>
          <Dropdown.Item key="Thursday">Thursday</Dropdown.Item>
          <Dropdown.Item key="Friday">Friday</Dropdown.Item>
          <Dropdown.Item key="Sunday">Sunday</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
}

export default DaySelector;
