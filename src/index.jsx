import React from "react";
import { createRoot } from "react-dom/client";
import App from "./app"; // resolves to src/app/index.jsx
import "./styles/tailwind.css";
import "./styles/index.css";

const container = document.getElementById("root");
const root = createRoot(container);

root.render(<App />);
