import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Add global styles for fonts
const style = document.createElement("style");
style.textContent = `
  :root {
    --font-heading: 'Poppins', sans-serif;
    --font-body: 'Inter', sans-serif;
  }
  
  body {
    font-family: var(--font-body);
  }
  
  h1, h2, h3, h4, h5, h6 {
    font-family: var(--font-heading);
  }
  
  .gradient-text {
    background: linear-gradient(90deg, #22c55e, #06b6d4);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }
`;
document.head.appendChild(style);

createRoot(document.getElementById("root")!).render(<App />);
