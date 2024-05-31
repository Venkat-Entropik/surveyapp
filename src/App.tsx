import React, { useState, useEffect, Suspense } from "react";
import "./App.css";
import { Routes, Route } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import NavBar from "./Components/navBar/NavBar";
import SimpleSidebar from "./Components/sidebar/SideBar";
import { auth } from "./firebase";
import WelcomePage from "./Components/pages/welcomePage/WelcomePage";

const Home = React.lazy(() => import("./Components/home/Home"));
const FileUpload = React.lazy(() => import("./Components/pages/ImagePage"));
const VideoUpload = React.lazy(() => import("./Components/pages/VideoPage"));
const SurveyPage = React.lazy(() => import("./Components/pages/SurveyPage"));
const Database = React.lazy(() => import("./Components/pages/Database"));
const Analytics = React.lazy(() => import("./Components/pages/Analytics"));

function App() {
  const [user, setUser] = useState(null as any);
  const [isLoading, setIsLoading] = useState(false as boolean);

  useEffect(() => {
    onAuthStateChanged(auth, (user:any) => {
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
                <Suspense fallback={<div>Loading...</div>}>
                  <Home
                    user={user}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                  />
                </Suspense>
              }
            />
            <Route
              path="Images"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <FileUpload />
                </Suspense>
              }
            />
            <Route
              path="Videos"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <VideoUpload />
                </Suspense>
              }
            />
            <Route
              path="Survey"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <SurveyPage />
                </Suspense>
              }
            />
            <Route
              path="Database"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Database
                    user={user}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                  />
                </Suspense>
              }
            />
            <Route
              path="Analytics"
              element={
                <Suspense fallback={<div>Loading...</div>}>
                  <Analytics
                    user={user}
                    isLoading={isLoading}
                    setIsLoading={setIsLoading}
                  />
                </Suspense>
              }
            />
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
