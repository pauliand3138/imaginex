import React from "react";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import jwt_decode from "jwt-decode";
import imaginexVideo from "../assets/login_video.mp4";
import logo from "../assets/imaginex_white.png";

import { client } from "../client";

const Login = () => {
    const navigate = useNavigate();

    const responseGoogle = (response) => {
        const decoded = jwt_decode(response.credential);

        localStorage.setItem("user", JSON.stringify(decoded));
        const name = decoded.name;
        const googleId = decoded.sub;
        const imageUrl = decoded.picture;

        const doc = {
            _id: googleId,
            _type: "user",
            userName: name,
            image: imageUrl,
        };

        client.createIfNotExists(doc).then(() => {
            navigate("/", { replace: true });
        });
    };

    return (
        <div className="flex justify-start items-center flex-col h-screen">
            <div className="relative w-full h-full">
                <video
                    src={imaginexVideo}
                    type="video/mp4"
                    loop
                    controls={false}
                    muted
                    autoPlay
                    className="w-full h-full object-cover"
                />
                <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
                    <div className="p-5">
                        <img src={logo} width="200px" alt="logo" />
                    </div>
                    <div className="shadow-2x1">
                        <GoogleLogin
                            onSuccess={responseGoogle}
                            onError={() => console.log("ERROR")}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
