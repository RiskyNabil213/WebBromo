import React from "react";
import { createRoot } from "react-dom/client";
import App from "./app.jsx"; // matches your actual file: app.jsx (lowercase)
import "./styles/tailwind.css";
import "./styles/index.css";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(<App />);
