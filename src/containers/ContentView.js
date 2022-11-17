import { Route, Routes } from "react-router-dom";
import { Navigate } from "react-router-dom";
import ChatAppView from "./ChatAppView";

export default function ContentView() {

    return (
        <div>
            <Routes>

                <Route path="/app" element={<ChatAppView/>} />
                
                {/* Handles invalid urls back to /about */}
                <Route
                    path="*"
                    element={<Navigate to="/app" replace />}
                />
            </Routes>
        </div>
    )
}