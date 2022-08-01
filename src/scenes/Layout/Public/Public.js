import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Login } from "../../Auth/Login/Login";
import { Signup } from "../../Auth/Signup/Signup";
import { SendCode } from "../../Auth/ForgetPassword/SendCode/SendCode";
import { VerifyCode } from "../../Auth/ForgetPassword/VerifyCode/VerifyCode";
import { ChangePassword } from "../../Auth/ForgetPassword/ChangePassword/ChangePassword";

export const Public = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route path="*" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/send-code" element={<SendCode />} />
          <Route exact path="/verify-code" element={<VerifyCode />} />
          <Route exact path="/change-password" element={<ChangePassword />} />
        </Routes>
      </Router>
    </>
  );
};
