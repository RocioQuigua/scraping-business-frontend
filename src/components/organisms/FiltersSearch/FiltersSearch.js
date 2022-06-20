import { DoubleLeftOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { Button, Checkbox, Input } from "antd";
import { useSelector } from "react-redux";

export const FiltersSearch = ({ visible, setVisible }) => {
  const { filters } = useSelector((state) => state.search);

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
              <h2>Tipos</h2>
            </div>
            <div className="filters-search__content">
              {filters?.languages.map((type, index) => (
                <Checkbox className="filters-search__checkbox" key={index}>
                  {type.name === "undefined" ? "Otros" : type.name} (
                  <strong>{type.value}</strong>)
                </Checkbox>
              ))}
            </div>
          </div>
          <div className="filters-search__item">
            <div className="filters-search__item-title filters-search__item-title--row">
              <h2>Año</h2>
            </div>
            <div className="filters-search__content">
              {filters?.years.map((type, index) => (
                <Checkbox className="filters-search__checkbox" key={index}>
                  {type.name === "undefined" ? "Otros" : type.name} (
                  <strong>{type.value}</strong>)
                </Checkbox>
              ))}
            </div>
            <h3>Intervalo especifico</h3>
            <div className="filters-search__content">
              <div className="filters-search__select">
                <Input type="tel" keyboardtype="number-pad" maxLength={4} />
                <Input type="tel" keyboardtype="number-pad" maxLength={4} />
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
                  {type.name === "undefined" ? "Otros" : type.name} (
                  <strong>{type.value}</strong>)
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
