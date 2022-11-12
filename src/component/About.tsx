import React from "react";
import { Link } from "react-router-dom";
import "../Styles/About.css";

const About = () => {

  return (
    <section id="about">
      <div className="AddText">
        <div className="title">We take your backend Seriously.</div>
        <div className="subtitle">So you don't have to.</div>
        <div className="para">
          never get stress in writing backend code and deploying your api to other platforms with errors.
          build your custom api without code and deployment. we will do everything for you. so, your user
          will have better experience in your application.
        </div>
        <div className="button">
        <Link to={'/createSchema'} >Start Building</Link>
        </div>
      </div>
    </section>
  );
};

export default About;
