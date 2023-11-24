import React,{useState,useEffect} from 'react';
import './App.css';
import NavBar from './Components/navBar/NavBar';
import SimpleSidebar from './Components/sidebar/SideBar';
import {Routes,Route} from 'react-router-dom'
import ImagePage from './Components/Pages/ImagePage';
import { AuthModal } from './Components/Authentication/AuthModal';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './firebase';

function App() {
  const[user,setUser]=useState<any>(null)

  useEffect(()=>{
    onAuthStateChanged(auth,user=>{
      if(user) setUser(user)
      else setUser(null)
    })
  },[])
  
  return (
    <div className="App">
      <NavBar user={user}/>
      {
        user ? (
          <Routes>
            <Route path='/' element={<SimpleSidebar/>}>
                <Route path='/' element={<ImagePage/>}/>
                <Route path='/*' element={<ImagePage/>}/>
            </Route>
          </Routes>
        ) : <AuthModal user={user}/>
      }
      
      
    </div>
  );
}

export default App;
