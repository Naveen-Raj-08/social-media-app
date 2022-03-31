import React, { useEffect, useState } from "react";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

export const Homepage = () => {
  return (
    <>
      <title>Home Page</title>
      <div className="container">
        {/* The Page Header */}
        <Header />
        {/* The Page Footer */}
        <Footer />
      </div>
    </>
  );
};
