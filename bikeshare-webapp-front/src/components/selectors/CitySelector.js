"use client";
import React, { useState } from "react";
import { RadioGroup } from "@headlessui/react";
import RadioButton from "../../app/RadioButton";
import { useSelect } from "../../app/custom hooks/useSelect";
const cities = [
  { name: "New York City", id: "NYC" },
  { name: "Chicago", id: "CHI" },
  { name: "Washington", id: "WA" },
];
function CitySelector(props) {
  const [selected, setSelected] = useSelect(cities[0].name, props.setCity);

  return (
    <div className="flex flex-col space-y-3">
      <RadioGroup
        value={selected}
        onChange={setSelected}
        className={"space-y-4"}
      >
        <RadioGroup.Label
          className={"text-xl flex flex-col items-center"}
        ></RadioGroup.Label>
        {cities.map((city) => {
          return <RadioButton key={city.name} text={city.name} />;
        })}
      </RadioGroup>
    </div>
  );
}

export default CitySelector;
