import React from "react";
import { Drawer, Button } from "antd";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { auth as AuthActions } from "../../../services/Auth/AuthActions";
import packageJSON from "../../../../package.json";

export const Sidebar = ({ visible, setVisible }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { profile } = useSelector(state => state.user);

  const options = [
    {
      name: "Mi información",
      description: "Gestión de tu información",
      image: require("../../../assets/images/my-information.png"),
      onClick: () => handleNavigate("/profile")
    },
    {
      name: "Mi empresa",
      description: "Gestión de tu empresa",
      image: require("../../../assets/images/my-business.png"),
      onClick: () => handleNavigate("/business")
    },
    {
      name: "Mis favoritos",
      description: "Gestión de tus favoritos",
      image: require("../../../assets/images/my-favorite.png"),
      onClick: () => handleNavigate("/favorites")
    },
    {
      name: "Buscador",
      description: "Realizar búsqueda",
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
            src={require('../../../assets/images/user.png')}
            alt="user logo"
          />
          <div>
            <h2>{`${profile?.person.name} ${profile?.person.lastname}`}</h2>
            <p>{profile?.rol?.name || '__'}</p>
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
        <h2>v{packageJSON.version}</h2>
        <Button className="sidebar__button" type="link" onClick={() => dispatch(AuthActions.logout())}>
          Cerrar sesión
        </Button>
      </div>
    </Drawer>
  );
};
