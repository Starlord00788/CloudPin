import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Upload from "./Pages/Upload";
import MyFiles from "./Pages/MyFiles";
import FileViewer from "./Pages/FileViewer";
import Footer from "./components/Footer";
import PrivateRoute from "../src/components/privateRoute.jsx";

function App() {
  return (
    <Router>
      <Navbar />
      <div className="p-4 max-w-4xl mx-auto min-h-[calc(100vh-160px)]">
        <Routes>
          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/f/:shortId" element={<FileViewer />} />

          {/* Protected Routes */}
          <Route
            path="/upload"
            element={
              <PrivateRoute>
                <Upload />
              </PrivateRoute>
            }
          />
          <Route
            path="/my-files"
            element={
              <PrivateRoute>
                <MyFiles />
              </PrivateRoute>
            }
          />

          {/* Redirect / to /upload if logged in */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Upload />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
      
    </Router>
  );
}

export default App;
