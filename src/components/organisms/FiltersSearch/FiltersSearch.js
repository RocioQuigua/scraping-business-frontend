import { DoubleLeftOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { Button, Checkbox } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { search as SearchActions } from "../../../services/Search/SearchActions";

export const FiltersSearch = ({ visible, setVisible }) => {
  const dispatch = useDispatch();
  const { filters, filterValues } = useSelector((state) => state.search);

  const [showItems, setShowItems] = useState({
    journals: false,
    year: false,
  });

  const handleFilter = (type, values) => {
    dispatch(SearchActions.filterResults(type, values));
  };

  const clearFilters = () => {
    dispatch(SearchActions.clearFilters());
  };

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
          {filterValues?.length > 0 && (
            <Button
              className="filters-search__btn-clean"
              type="primary"
              onClick={clearFilters}
              block
            >
              Limpiar filtros
            </Button>
          )}
          <div className="filters-search__item">
            <div className="filters-search__item-title filters-search__item-title--row">
              <h2>Idiomas</h2>
            </div>
            <div className="filters-search__content">
              <Checkbox.Group
                onChange={(values) => handleFilter("idiom", values)}
                value={
                  filterValues?.find((item) => item.type === "idiom")?.values
                }
              >
                {filters?.languages.map((type, index) => (
                  <Checkbox
                    className="filters-search__checkbox"
                    value={type.name}
                    key={index}
                  >
                    {type.name === "undefined" ? "Otros" : type.name} (
                    <strong>{type.value}</strong>)
                  </Checkbox>
                ))}
              </Checkbox.Group>
            </div>
          </div>
          <div className="filters-search__item">
            <div className="filters-search__item-title filters-search__item-title--row">
              <h2>Año</h2>
            </div>
            <div className="filters-search__content">
              <Checkbox.Group
                onChange={(values) => handleFilter("year", values)}
                value={
                  filterValues?.find((item) => item.type === "year")?.values
                }
              >
                {filters?.years
                  ?.slice(0, showItems.year ? filters?.years?.length : 10)
                  .map((type, index) => (
                    <Checkbox
                      className="filters-search__checkbox"
                      value={type.name}
                      key={index}
                    >
                      {type.name === "undefined" ? "Otros" : type.name} (
                      <strong>{type.value}</strong>)
                    </Checkbox>
                  ))}
              </Checkbox.Group>
            </div>
            {filters?.years.length > 0 && filters?.years?.length - 10 > 0 && (
              <Button
                type="link"
                onClick={() =>
                  setShowItems({ ...showItems, year: !showItems.year })
                }
              >
                {showItems.year ? "Ocultar" : "Mostrar mas"}... (
                <strong>{filters?.years?.length - 10}</strong>)
              </Button>
            )}
          </div>
          <div className="filters-search__item">
            <div className="filters-search__item-title filters-search__item-title--row">
              <h2>Origen</h2>
            </div>
            <div className="filters-search__content">
              <Checkbox.Group
                onChange={(values) => handleFilter("origin", values)}
                value={
                  filterValues?.find((item) => item.type === "origin")?.values
                }
              >
                {filters?.origins.map((type, index) => (
                  <Checkbox
                    className="filters-search__checkbox"
                    value={type.name}
                    key={index}
                  >
                    {type.name === "undefined" ? "Otros" : type.name} (
                    <strong>{type.value}</strong>)
                  </Checkbox>
                ))}
              </Checkbox.Group>
            </div>
          </div>
          <div className="filters-search__item">
            <div className="filters-search__item-title filters-search__item-title--row">
              <h2>Tipos</h2>
            </div>
            <div className="filters-search__content">
              <Checkbox.Group
                onChange={(values) => handleFilter("type", values)}
                value={
                  filterValues?.find((item) => item.type === "type")?.values
                }
              >
                {filters?.type.map((type, index) => (
                  <Checkbox
                    className="filters-search__checkbox"
                    value={type.name}
                    key={index}
                  >
                    {type.name === "undefined" ? "Otros" : type.name} (
                    <strong>{type.value}</strong>)
                  </Checkbox>
                ))}
              </Checkbox.Group>
            </div>
          </div>
          <div className="filters-search__item">
            <div className="filters-search__item-title filters-search__item-title--row">
              <h2>Revistas</h2>
            </div>
            <div className="filters-search__content">
              <Checkbox.Group
                onChange={(values) => handleFilter("journal", values)}
                value={
                  filterValues?.find((item) => item.type === "journal")?.values
                }
              >
                {filters?.journals
                  ?.slice(0, showItems.journals ? filters?.journals?.length : 6)
                  .map((type, index) => (
                    <Checkbox
                      className="filters-search__checkbox"
                      value={type.name}
                      key={index}
                    >
                      {type.name} (<strong>{type.value}</strong>)
                    </Checkbox>
                  ))}
              </Checkbox.Group>
            </div>
            {filters?.journals.length > 0 && filters?.journals?.length - 6 > 0 && (
              <Button
                type="link"
                onClick={() =>
                  setShowItems({ ...showItems, journals: !showItems.journals })
                }
              >
                {showItems.journals ? "Ocultar" : "Mostrar mas"}... (
                <strong>{filters?.journals?.length - 6}</strong>)
              </Button>
            )}
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
