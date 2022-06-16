import React from "react";
import { Drawer, Button, Image } from "antd";

export const Sidebar = ({ visible, setVisible }) => {
  const onClose = () => {
    setVisible(false);
  };
  return (
    <Drawer
      className="sidebar"
      placement="right"
      visible={visible}
      onClose={onClose}
    >
      <div className="sidebar__options">
        <Image
          className="sidebar__img"
          src="../../../img/user.png"
          alt="user logo"
        />
        <div>
          <h1>Juan Camilo Castillo</h1>
          <p>Administrador</p>
        </div>
      </div>
      <div className="sidebar__options">
                <Image
          className="sidebar__img"
          src="../../../img/my-information.png"
          alt="user logo"
        />
        <div className="sidebar__info">
        <h2>Mi informacion</h2>
        <p>Gestion de tu informacion</p>
        </div>
        </div>
        <div className="sidebar__options">
        <Image
          className="sidebar__img"
          src="../../../img/my-business.png"
          alt="user logo"
        />
        <div className="sidebar__info">
        <h2>Mi empresa</h2>
        <p>Gestion de tu empresa</p>
        </div>
        </div>
      <div className="sidebar__close">
        <h2>v1.0</h2>
        <Button className="sidebar__button" type="link">
          Cerrar sesion
        </Button>
      </div>
    </Drawer>
  );
};
