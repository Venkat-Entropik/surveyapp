import React, { useState, useEffect } from "react";
import "./App.css";
import NavBar from "./Components/navBar/NavBar";
import SimpleSidebar from "./Components/sidebar/SideBar";
import { Routes, Route } from "react-router-dom";
import ImagePage from "./Components/pages/ImagePage";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import Home from "./Components/home/Home";
import WelcomePage from "./Components/pages/welcomepage/WelcomePage";
import VideoUpload from "./Components/pages/VideoPage";
import SurveyPage from "./Components/pages/SurveyPage";
import Database from "./Components/pages/Database";
import Analytics from "./Components/pages/Analytics";


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
            <Route path="Images" element={<ImagePage />} />
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
            <Route path="/*" element={<ImagePage />} />
          </Route>
        </Routes>
      ) : (
        <WelcomePage />
      )}
    </div>
  );
}

export default App;
