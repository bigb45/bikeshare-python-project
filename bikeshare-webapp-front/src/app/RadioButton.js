import { RadioGroup } from "@headlessui/react";
import React from "react";

function RadioButton(props) {
  return (
    <div>
      <div>
        <RadioGroup.Option
          value={props.text}
          className={({ checked }) =>
            `${
              checked
                ? "bg-slate-900 text-slate-100  border-sky-950 "
                : "bg-slate-100 text-gray-900 border-slate-200"
            } px-8 py-3 rounded-xl text-center border-[4px] shadow-lg hover:cursor-pointer transition-colors`
          }
        >
          {props.text}
        </RadioGroup.Option>
      </div>
    </div>
  );
}

export default RadioButton;
