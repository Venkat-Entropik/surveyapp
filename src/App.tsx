import React, { useState, useEffect } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import Home from "./Components/home/Home";
import VideoUpload from "./Components/pages/VideoPage";
import SurveyPage from "./Components/pages/SurveyPage";
import Database from "./Components/pages/Database";
import NavBar from "./Components/navBar/NavBar";
import SimpleSidebar from "./Components/sidebar/SideBar";
import { auth } from "./firebase";
import Analytics from "./Components/pages/Analytics";
import WelcomePage from "./Components/pages/WelcomePage/WelcomePage";
import FileUpload from "./Components/pages/ImagePage";

function App() {
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setUser(user);
      else setUser(null);
    });
  }, []);

  return (
    <div className="App">
      <NavBar user={user} />
      {user ? (
        <Routes>
          <Route path="/" element={<SimpleSidebar />}>
            <Route
              path=""
              element={
                <Home
                  user={user}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                />
              }
            />
            <Route path="Images" element={<FileUpload />} />
            <Route path="Videos" element={<VideoUpload />} />
            <Route path="Survey" element={<SurveyPage />} />
            <Route
              path="Database"
              element={
                <Database
                  user={user}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                />
              }
            />
            <Route path="Analytics" element={<Analytics />} />
            <Route path="/*" element={<FileUpload />} />
          </Route>
        </Routes>
      ) : (
        <WelcomePage />
      )}
    </div>
  );
}

export default App;
