import React from 'react';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';

import { Search } from "../../Auth/Search/Search";

export const Private = () => {
  return (
    <>
    <Router>
      <Routes>
        <Route exact path="/search" element={<Search />} />
      </Routes>
    </Router>
    </>
  );
}