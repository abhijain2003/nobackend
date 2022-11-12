import React, { useEffect, useState } from "react";
import "./App.css";
import Main from "./component/Main";
import { Link } from 'react-router-dom';
import About from "./component/About";
import BottomNav from "./component/BottomNav";
import { useNavigate } from "react-router-dom";

function App() {
  const [showSideBar, setshowSideBar] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (window.localStorage.getItem("backbackUser") !== null) {
      // alert(window.localStorage.getItem("backbackUser"));
      navigate("/createSchema");
    } else {
      navigate("/")
    }
  }, [])


  return (
    <div id="Main" style={{ display: "grid" }}>
      {/* navbar */}
      <div style={{ gridArea: "1/1" }}>
        <div id="navbar">
          <img
            onClick={() => alert("fnbf")}
            alt="logo"
            src={require("./Assets/logo.png")}
            width={150}
            height={150}
          />
          <div className="authbar">
            <Link style={{ display: window.localStorage.getItem("backbackUser") === null ? 'flex' : 'none' }} to='/signup'>sign up</Link>
            <Link style={{ display: window.localStorage.getItem("backbackUser") === null ? 'flex' : 'none' }} to='/login'>log in</Link>
          </div>
          <svg
            onClick={() => setshowSideBar(true)}
            className="hamburger"
            fill="none"
            stroke="white"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </div>
        <Main />
        <About />
        <BottomNav />
      </div>
      {/* sidebar */}
      <div
        style={{
          gridArea: "1/1",
          transform: showSideBar ? "translateX(0%)" : "translateX(150%)",
        }}
        className="sidebar"
      >
        <svg onClick={() => setshowSideBar(false)} className="closeBurger" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path></svg>
        <div className="sidebar-link">
            <Link style={{ display: window.localStorage.getItem("backbackUser") === null ? 'flex' : 'none' }} to='/signup'>sign up</Link>
          </div>
            <div className="sidebar-link">
              <Link style={{ display: window.localStorage.getItem("backbackUser") === null ? 'flex' : 'none' }} to='/login'>log in</Link>
            </div>
      </div>
    </div>
  );
}

export default App;
