import React from "react";
import { Drawer, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

import { auth as AuthActions } from "../../../services/Auth/AuthActions";

export const Sidebar = ({ visible, setVisible }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const options = [
    {
      name: "Mi informacion",
      description: "Gestion de tu informacion",
      image: require("../../../assets/images/my-information.png"),
      onClick: () => handleNavigate("/profile")
    },
    {
      name: "Mi empresa",
      description: "Gestion de tu empresa",
      image: require("../../../assets/images/my-business.png"),
      onClick: () => handleNavigate("/business")
    },
    {
      name: "Mis favoritos",
      description: "Gestion de tus favoritos",
      image: require("../../../assets/images/my-favorite.png"),
      onClick: () => handleNavigate("/favorites")
    },
    {
      name: "Buscador",
      description: "Realizar busqueda",
      image: require("../../../assets/images/searcher.png"),
      onClick: () => handleNavigate("/search")
    },
  ];

  const handleNavigate = (route) => {
    navigate(route);
    onClose();
  }

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
      <div className="sidebar__title">
        <div className="sidebar__options">
          <img
            className="sidebar__img"
            src= "../../../assets/images/user.png"
            alt="user logo"
          />
          <div>
            <h2>Juan Camilo Castillo</h2>
            <p>Administrador</p>
          </div>
        </div>
      </div>

      <div className="sidebar__menu">
        {options.map((option, index) => (
          <div className="sidebar__options" key={index} onClick={option.onClick}>
            <img
              className="sidebar__img"
              src={option.image}
              alt="logo"
            />
            <div className="sidebar__info">
              <h2>{option.name}</h2>
              <p>{option.description}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="sidebar__close">
        <h2>v1.2</h2>
        <Button className="sidebar__button" type="link" onClick={() => dispatch(AuthActions.logout())}>
          Cerrar sesion
        </Button>
      </div>
    </Drawer>
  );
};
