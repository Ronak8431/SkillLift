import React, { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { useDispatch } from "react-redux";
import { setSearchedQuery } from "@/redux/jobSlice";

const fitlerData = [
  {
    fitlerType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"],
  },
 
  {
    fitlerType: "Type",
    array: ["Part Time", "Full Time"],
  },
];

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setSearchedQuery(selectedValue));
  }, [selectedValue]);

  return (
    <div className="sticky top-6 w-full rounded-2xl bg-white/70 backdrop-blur-md shadow-lg border border-slate-200 p-5 pb-10">
      
      {/* Header */}
      <h1 className="text-xl font-extrabold text-slate-900">
        Filter Jobs
      </h1>
      <p className="text-sm text-slate-500 mt-1">
        Refine your search
      </p>
      <hr className="my-4 border-slate-200" />

      <RadioGroup
        value={selectedValue}
        onValueChange={(value) => setSelectedValue(value)}
        className="space-y-6"
      >
        {/* ALL */}
        <label
          htmlFor="all"
          className={`flex items-center gap-3 cursor-pointer rounded-xl px-3 py-2 transition
            ${selectedValue === "" ? "bg-indigo-50 text-indigo-600" : "hover:bg-slate-100"}
          `}
        >
          <RadioGroupItem value="" id="all" />
          <span className="font-medium">All Jobs</span>
        </label>

        {fitlerData.map((data, index) => (
          <div key={index}>
            <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide mb-3">
              {data.fitlerType}
            </h2>

            <div className="space-y-2">
              {data.array.map((item, idx) => {
                const itemId = `id${index}-${idx}`;
                const isActive = selectedValue === item;

                return (
                  <label
                    key={itemId}
                    htmlFor={itemId}
                    className={`flex items-center gap-3 cursor-pointer rounded-xl px-3 py-2 transition
                      ${isActive ? "bg-indigo-50 text-indigo-600" : "hover:bg-slate-100"}
                    `}
                  >
                    <RadioGroupItem value={item} id={itemId} />
                    <span className="text-sm font-medium">{item}</span>
                  </label>
                );
              })}
            </div>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;
