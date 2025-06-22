import "./index.css";

import { createRoot } from "react-dom/client";
import { Toaster } from "react-hot-toast";
import { Provider } from "react-redux";
import { BrowserRouter as Router } from "react-router-dom";

import App from "./App.jsx";
import store from "./Redux/store.js";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <Router>
      <App />
      <Toaster />
    </Router>
  </Provider>
);
