"use client";

import React, { useState } from "react";
import AddUser from "./AddUser";
import AllUsers from "./AllUsers";

const NavigationTabs = () => {
  const [selectedTab, setSelectedTab] = useState(0);

  console.log(selectedTab, "selectedTab");

  const tabs = [
    { label: "Add User", content: <AddUser /> },
    { label: "View All", content: <AllUsers selectedTab={selectedTab} /> },
    { label: "Edit User", content: <AllUsers selectedTab={selectedTab} /> },
  ];
  return (
    <>
      {" "}
      <div>
        <div className="flex space-x-4">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => setSelectedTab(index)}
              className={`px-4 py-2 rounded-md ${
                selectedTab === index
                  ? "bg-blue-500 text-white"
                  : "bg-gray-300 text-gray-700"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="mt-4">{tabs[selectedTab].content}</div>
      </div>
    </>
  );
};

export default NavigationTabs;
