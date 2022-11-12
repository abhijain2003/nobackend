import React from "react";
import { Link } from "react-router-dom";
import "../Styles/Main.css";

const Main = () => {
    

    return (
        <section id="Main">
            <div className="title">
                <p>create backend with no code.</p>
                <div className="subtitle">
                    build product without code, Join the community.
                </div>
                <div className="button">
                    <Link to={'/createSchema'} >Start Building</Link>
                </div>
            </div>
        </section>
    );
};

export default Main;
