import { createRoot } from "react-dom/client";

import Site from "./components/Site.jsx";
import "./styles.css";
import "./styles/site.css";
import "./styles/envelope.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error("Root element not found");
}

createRoot(rootElement).render(<Site />);
