import { createRoot } from "react-dom/client";
import "#/app/styles/index.scss";
import { App } from "#/app/App";

import "#/shared/config/i18n/i18n";

document.body.innerHTML = '<div id="app"></div>';

const root = createRoot(document.getElementById("app"));
root.render(<App />);
