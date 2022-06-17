import React, { useState } from "react";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { MenuOutlined } from "@ant-design/icons";

import { Sidebar } from "../../organisms/Sidebar/Sidebar";

export const Header = () => {
  const navigate = useNavigate();
  const { profile } = useSelector(state => state.user);

  const [visibleMenu, setVisibleMenu] = useState();

  return (
    <div className="header">
      <div className="header__information">
        <h1 onClick={() => navigate("/")}>
          Search<strong>GO</strong>
        </h1>
        <h2>{profile?.person?.name}</h2>
        <Button
          className="header__btn-menu"
          onClick={() => setVisibleMenu(true)}
        >
          <MenuOutlined />
        </Button>
        <Sidebar visible={visibleMenu} setVisible={setVisibleMenu} />
        {}
      </div>
    </div>
  );
};
