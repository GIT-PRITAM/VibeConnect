import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import '../App.css'

export default function Landingpage() {

    const router = useNavigate();

    return (
        <div className='landingPageContainer'>
            <nav>
                <div className='navHeader'>
                    <h2>VibeConnect</h2>
                </div>
                <div className='navlist'>
                    <p onClick={() => {
                        router("/home/p123qas");
                    }}>Join as Guest</p>
                    <p onClick={() => {
                        router("/auth")
                    }}>Register</p>
                    <div onClick={() => {
                        router("/auth")
                    }} role='button'>
                        <p>Login</p>
                    </div>
                </div>
            </nav>

            <div className="landingMainContainer">
                <div>
                    <h1><span style={{ color: "#FF9839" }}>Connect</span> with your loved ones</h1>
                    <p>Real moments, real vibes with VibeConnect</p>
                    <div role='button'>
                        <Link to={"/auth"}>Get Started</Link>
                    </div>
                </div>
                <div>
                    <img src="../mobile.png" alt="" />
                </div>
            </div>

        </div>
    )
}
