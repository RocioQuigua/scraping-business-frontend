import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import { Login } from "../../Auth/Login/Login";
import { Signup } from "../../Auth/Signup/Signup";
import { ForgetPassword } from "../../Auth/ForgetPassword/ForgetPassword";

export const Public = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route path="*" element={ <Login/> } />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/forgetpassword" element={<ForgetPassword />} />
        </Routes>
      </Router>
    </>
  );
};
