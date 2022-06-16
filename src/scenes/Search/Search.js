import React from "react";

import { InputSearch } from "../../components/atoms/InputSearch/InputSearch";
import { CardPublication } from "../../components/organisms/CardPublication/CardPublication";

import { Button, Checkbox, Select } from "antd";
import {
  DoubleLeftOutlined,
  MenuFoldOutlined,
  PlusCircleOutlined,
} from "@ant-design/icons";

export const Search = () => {
  const interests = [
    {
      name: "Lacteos",
      count: 50,
    },
    {
      name: "Yogurt",
      count: 100,
    },
    {
      name: "Queso",
      count: null,
    },
  ];

  const years = [2021, 2022, 2000, 2010, 2013];

  const types = [
    {
      name: "Documentos",
      count: 44,
    },
    {
      name: "Articulos",
      count: 1300,
    },
    {
      name: "Trabajos de grado",
      count: null,
    },
  ];

  const countries = [
    {
      name: "Colombia",
      count: 1340,
    },
    {
      name: "Peru",
      count: 4,
    },
    {
      name: "Estados Unidos",
      count: 170,
    },
  ];

  const publications = [
    {
      title: "The standard Lorem Ipsum passage, used since the 1500s",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt adipiscing elit, sed do eiusmod tempor ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud...",
      date: "10/06/2021",
      words: [
        {
          name: "leche",
          count: 10,
        },
        {
          name: "queso",
          count: 19,
        },
        {
          name: "cuajada",
          count: 11,
        },
        {
          name: "arroz con leche",
          count: 15,
        },
      ],
      siteUrl:
        "https://stackoverflow.com/questions/47406344/how-to-open-a-page-in-new-tab-on-click-of-a-button-in-react-i-want-to-send-some",
    },
    {
      title: "The standard Lorem Ipsum, used since the 2500s",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt adipiscing elit, sed do eiusmod tempor ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud...",
      date: "10/12/2021",
      words: [
        {
          name: "pan",
          count: 10,
        },
        {
          name: "sandwich",
          count: 19,
        },
        {
          name: "calados",
          count: 11,
        },
        {
          name: "pan leche",
          count: 15,
        },
      ],
      siteUrl:
        "https://thewebdev.info/2021/10/03/how-to-open-a-component-in-new-window-on-a-click-in-react/",
    },
    {
      title: "The standard Lorem Ipsum, since the 3500s",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt adipiscing elit, sed do eiusmod tempor ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud...",
      date: "10/06/2021",
      siteUrl: "https://es.reactjs.org/docs/handling-events.html",
    },
  ];

  return (
    <div className="search">
      <div className="search__filter">
        <div className="search__title">
          <h1>Filtros</h1>
          <Button className="search__button search__button--filter">
            <MenuFoldOutlined />
          </Button>
          <Button 
            className="search__button search__button--hide"
            >
            <DoubleLeftOutlined />
          </Button>
        </div>
        <div className="search__item">
          <div className="search__item-title search__item-title--row">
            <h2>Intereses</h2>
            <Button className="search__button search__button--agg">
              <PlusCircleOutlined />
            </Button>
          </div>
          <div className="search__content">
            {interests.map((interest, index) => (
              <Checkbox className="search__checkbox">
                {interest.name} (<strong>{interest.count}</strong>)
              </Checkbox>
            ))}
            <Button className="search__button search__button--link" type="link">Mostrar mas...</Button>
          </div>
        </div>
        <div className="search__item">
          <div className="search__item-title">
            <h2>Año</h2>
          </div>
          <div className="search__content">
            <div  className="search__select">
            <Select className="search__select search__select--year" defaultValue={years[0]}>
              {years.map((year, index) => (
                <Select.Option key={index}>{year}</Select.Option>
              ))}
            </Select>
            <Select className="search__select search__select--year" defaultValue={years[1]}>
              {years.map((year, index) => (
                <Select.Option key={index}>{year}</Select.Option>
              ))}
            </Select>
            </div>
          </div>
        </div>
        <div className="search__item">
          <div className="search__item-title">
            <h2>Tipos</h2>
          </div>
          <div className="search__content">
            {types.map((type, index) => (
              <Checkbox className="search__checkbox">
                {type.name} (<strong>{type.count}</strong>)
              </Checkbox>
            ))}
          </div>
        </div>
        <div className="search__item">
          <div className="search__item-title">
            <h2>Ubicación</h2>
          </div>
          <div className="search__content">
            {countries.map((country, index) => (
              <Checkbox className="search__checkbox">
                {country.name} (<strong>{country.count}</strong>)
              </Checkbox>
            ))}
          </div>
        </div>
      </div>
      <div className="search__container">
        <InputSearch placeholder="Que estas buscando?" allowClear />
        {publications.map((publication, index) => (
          <CardPublication
            key={index}
            title={publication.title}
            description={publication.description}
            date={publication.date}
            words={publication.words}
            website={publication.siteUrl}
          />
        ))}
      </div>
    </div>
  );
};
