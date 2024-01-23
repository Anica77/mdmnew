import React from "react";

import Navbar from "../Navbar/Navbar";
import Corporate from "../Corporate/Corporate";
import Portrait from "../portrait/portrait";
import Fashion from "../fashion/fashion";

export const Main = () => {
  return (
    <div>
      <Navbar />
      <Corporate />
      <Portrait />
      <Fashion />
    </div>
  );
};
