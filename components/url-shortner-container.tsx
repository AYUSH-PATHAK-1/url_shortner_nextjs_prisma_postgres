"use client";

import React, { useState } from "react";
import Urllist from "./url-list";
import Shorterform from "./shorter-form";

const Urlshortnercontainer = () => {
  const [refresh, setRefresh] = useState(0);

  const urlhandlershortner = () => {
    setRefresh((prev) => prev + 1);
  };

  return (
    <div>
      <Shorterform urlhandlershortner={urlhandlershortner} />
      <Urllist key={refresh} />
    </div>
  );
};

export default Urlshortnercontainer;
