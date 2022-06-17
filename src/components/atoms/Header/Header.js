import React, { useState } from "react";
import { Button } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { Sidebar } from "../../organisms/Sidebar/Sidebar";
import { useNavigate } from "react-router-dom";

export const Header = () => {
  const navigate = useNavigate();

  const [visibleMenu, setVisibleMenu] = useState();

  return (
    <div className="header">
      <div className="header__information">
        <h1 onClick={() => navigate("/")}>
          Search<strong>GO</strong>
        </h1>
        <h2>Juan Camilo</h2>
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
