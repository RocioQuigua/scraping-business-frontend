import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import { Search } from "../../../scenes/Search/Search";
import { Header } from "../../../components/atoms/Header/Header";
import { Profile } from "../../../scenes/Profile/Profile";
import { Favorites } from "../../Favorites/Favorites";
import { Business } from "../../Business/Business";

export const Private = () => {
  return (
    <Router>
      <div>
        <Header />
        <div>
          <Routes>
            <Route exact path="/search" element={<Search />} />
            <Route exact path="/" element={<Search />} />
            <Route exact path="/profile" element={<Profile />} />
            <Route exact path="/favorites" element={<Favorites />} />
            <Route exact path="/business" element={<Business />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
};
