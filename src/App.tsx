import React,{useState} from 'react';
import './App.css';
import NavBar from './Components/navBar/NavBar';
import SimpleSidebar from './Components/sidebar/SideBar';
import {Routes,Route} from 'react-router-dom'
import ImagePage from './Components/Pages/ImagePage';
import { AuthModal } from './Components/Authentication/AuthModal';

function App() {
  const[user,setUser]=useState<any>(null)
  return (
    <div className="App">
      <NavBar/>
      <AuthModal/>
      <Routes>
        <Route path='/' element={<SimpleSidebar/>}>
          <Route path='/' element={<ImagePage/>}/>
          <Route path='/*' element={<ImagePage/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
