// import { useState } from 'react'

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/user/home/home";
import { useAppSelector } from "./redux/hooks";
import {Routes, Route, Outlet, Navigate, } from "react-router-dom";
import Post from "./pages/user/post/Post";
import Header from "./components/header/Header";
import Job from "./pages/user/job/Job";
import { Profile } from "./pages/user/profile/Profile";
function App() {
  // const [count, setCount] = useState(0)
  
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route element={<PrivateRoutes />} >
        <Route path="/post" element={<Post />} />
        <Route path="/jobs" element={<Job />} />
        <Route path="/profile" element={<Profile />} /> 
        </Route>
      </Routes>
    </>
  );
}
export const PrivateRoutes = () => {
  const user = useAppSelector((state) => state.loginReducers.user);
return (
  user ? <Outlet/> : <Navigate to='/'/>
  )
}
export default App;
