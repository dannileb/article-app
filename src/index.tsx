import { createRoot } from "react-dom/client";
import { AppProvider } from "./AppProvider";

document.body.innerHTML = '<div id="app"></div>';

const root = createRoot(document.getElementById("app"));
root.render(<AppProvider />);
