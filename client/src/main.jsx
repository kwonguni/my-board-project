import React from "react";
import ReactDOM from "react-dom";
import App from "./App.jsx";
import { PostProvider } from "./context/PostContext.js";

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <PostProvider>
            <App />
        </PostProvider>
    </React.StrictMode>
)