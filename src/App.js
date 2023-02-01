
import React,{useState,useEffect} from 'react';
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import General from "./Components/General/General";
import Login from './Components/Login/Login';
const App = () => {
  


    useEffect(() => {
        let token = document.cookie.split("=")[1];
      
        console.log(token);
        const intervalId = setInterval(async () => {
          try {
              const res = await fetch("https://se.selopian.us/api/user/refresh",{
                method:'GET',
                headers:{
                  'content-type':'application/json',
                  'Authorization':`bearer ${token} `
                }
              })
            const data = await res.json();
            if(res.status ===200){
                // document.cookie = `accessToken=${}`;
            }
            console.log(data)
            
          } catch (error) {
            console.error(error);
           
          }
        },10*1000);
        return () => clearInterval(intervalId);
      }, []);




    return (
        <div className="App">
    

            <BrowserRouter>
            <Routes>
                <Route exact path="/" element={<General />}></Route>
                <Route path="/login" element={<Login/>}></Route>
            
            </Routes>
        </BrowserRouter>


        </div>
    );
};

export default App;
