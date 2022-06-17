import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import { Search } from "../../../scenes/Search/Search";
import { Header } from "../../../components/atoms/Header/Header";
import { Profile } from "../../../scenes/Profile/Profile";
import { Favorites } from "../../Favorites/Favorites";
import { Business } from "../../Business/Business";

import { user as UserActions } from "../../../services/User/UserActions";

export const Private = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(UserActions.getProfile());
  }, [dispatch]);

  return (
    <Router>
      <Header />
      <div>
        <Routes>
          <Route exact path="/search" element={<Search />} />
          <Route exact path="/" element={<Search />} />
          <Route path="*" element={<Search />} />
          <Route exact path="/profile" element={<Profile />} />
          <Route exact path="/favorites" element={<Favorites />} />
          <Route exact path="/business" element={<Business />} />
        </Routes>
      </div>
    </Router>
  );
};
