import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

// Add Font Awesome
const fontAwesome = document.createElement("link");
fontAwesome.rel = "stylesheet";
fontAwesome.href = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css";
fontAwesome.integrity = "sha512-iecdLmaskl7CVkqkXNQ/ZH/XLlvWZOJyj7Yy7tcenmpD1ypASozpmT/E0iPtmFIB46ZmdtAc9eNBvH0H/ZpiBw==";
fontAwesome.crossOrigin = "anonymous";
fontAwesome.referrerPolicy = "no-referrer";
document.head.appendChild(fontAwesome);

// Add Google Fonts
const googleFonts = document.createElement("link");
googleFonts.rel = "stylesheet";
googleFonts.href = "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Poppins:wght@300;400;500;600;700&display=swap";
document.head.appendChild(googleFonts);

// Add global styles for fonts
const style = document.createElement("style");
style.textContent = `
  :root {
    --font-heading: 'Poppins', sans-serif;
    --font-body: 'Inter', sans-serif;
  }
  
  body {
    font-family: var(--font-body);
    overflow-x: hidden;
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
