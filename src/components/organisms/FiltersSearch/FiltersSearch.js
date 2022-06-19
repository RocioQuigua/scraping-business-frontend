import {
  DoubleLeftOutlined,
  MenuFoldOutlined,
  PlusCircleFilled,
} from "@ant-design/icons";
import { Button, Checkbox, Select } from "antd";
import React from "react";
import { useSelector } from "react-redux";

export const FiltersSearch = ({ visible, setVisible }) => {
  const { filters } = useSelector((state) => state.search);

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

  const years = [2021, 2022, 2000, 2010, 2013];
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

  return (
    <div className="filters-search">
      {visible ? (
        <>
          <div className="filters-search__title">
            <div className="filters-search__title filters-search__title--group">
              <h1>Filtros</h1>
              <Button
                className="filters-search__button filters-search__button--filter"
                onClick={() => setVisible(!visible)}
              >
                <MenuFoldOutlined />
              </Button>
            </div>
            <Button
              className="filters-search__button filters-search__button--hide"
              onClick={() => setVisible(!visible)}
            >
              <DoubleLeftOutlined />
            </Button>
          </div>
          <div className="filters-search__item">
            <div className="filters-search__item-title filters-search__item-title--row">
              <h2>Año</h2>
            </div>
            <div className="filters-search__content">
              {filters?.years.map((type, index) => (
                <Checkbox className="filters-search__checkbox" key={index}>
                  {type.name} (<strong>{type.value}</strong>)
                </Checkbox>
              ))}
            </div>
            <div className="filters-search__content">
              <div className="filters-search__select">
                <Select
                  className="filters-search__select filters-search__select--year"
                  defaultValue={years[0]}
                >
                  {years.map((year, index) => (
                    <Select.Option key={index}>{year}</Select.Option>
                  ))}
                </Select>
                <Select
                  className="filters-search__select filters-search__select--year"
                  defaultValue={years[1]}
                >
                  {years.map((year, index) => (
                    <Select.Option key={index}>{year}</Select.Option>
                  ))}
                </Select>
              </div>
            </div>
          </div>
          <div className="filters-search__item">
            <div className="filters-search__item-title filters-search__item-title--row">
              <h2>Tipos</h2>
            </div>
            <div className="filters-search__content">
              {filters?.type.map((type, index) => (
                <Checkbox className="filters-search__checkbox" key={index}>
                  {type.name} (<strong>{type.value}</strong>)
                </Checkbox>
              ))}
            </div>
          </div>
          <div className="filters-search__item">
            <div className="filters-search__item-title filters-search__item-title--row">
              <h2>Revistas</h2>
            </div>
            <div className="filters-search__content">
              {filters?.journals.map((type, index) => (
                <Checkbox className="filters-search__checkbox" key={index}>
                  {type.name} (<strong>{type.value}</strong>)
                </Checkbox>
              ))}
            </div>
          </div>
        </>
      ) : (
        <Button
          className="filters-search__button filters-search__button--filter"
          onClick={() => setVisible(!visible)}
        >
          <MenuFoldOutlined />
        </Button>
      )}
    </div>
  );
};
