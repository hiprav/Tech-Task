import React, { useState } from "react";
import LoginForm from "./Signin/SigninForm";
import SignupForm from "./Signup/SignupForm";
import "./Auth.css";

const Auth = () => {
  const [isRegister, setIsRegister] = useState(false);

  const togglePanel = () => {
    setIsRegister(!isRegister);
  };

  return (
    <div className="flex justify-center h-screen items-center overflow-hidden ">
      <div className="box  lg:max-w-4xl">
        <div className={`cover ${isRegister ? "rotate-active" : ""}`}>
          <div className="front">

            <div className="text">
              <span className="text-1">
                Sign In
              </span>
            </div>
          </div>
          <div className="back">

            <div className="text">
              <span className="text-1">
                Sign Up
              </span>
            </div>
          </div>
        </div>
        <div className="forms h-full">
          <div className="form-content h-full ">
            <div className="login-form ">
              <LoginForm togglePanel={togglePanel} />
            </div>
            <div className="signup-form">
              <SignupForm togglePanel={togglePanel} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
