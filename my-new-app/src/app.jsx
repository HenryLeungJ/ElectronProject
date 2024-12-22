import * as React from "react";
import { createRoot } from "react-dom/client";
import { HashRouter, Routes, Route } from "react-router";
import Home from "./components/home.jsx";
import "./index.css";

const root = createRoot(document.body);
root.render(
  <HashRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      {/* <Route path="dashboard" element={<Dashboard />}>
        <Route index element={<RecentActivity />} />
        <Route path="project/:id" element={<Project />} />
      </Route> */}
    </Routes>
  </HashRouter>
);
