import { LoadingOutlined } from "@ant-design/icons";
import { Button } from "antd";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { InputSearch } from "../../components/atoms/InputSearch/InputSearch";
import { CardPublication } from "../../components/organisms/CardPublication/CardPublication";
import { FiltersSearch } from "../../components/organisms/FiltersSearch/FiltersSearch";
import { search as SearchActions } from "../../services/Search/SearchActions";

export const Search = () => {
  const dispatch = useDispatch();

  const { publications, filters, loading } = useSelector(
    (state) => state.search
  );
  const [visibleFilter, setVisibleFilters] = useState(true);

  const onSearch = (text) => {
    dispatch(SearchActions.createSearch(text));
  };

  return (
    <div className={`search search--${!visibleFilter && "hide-filters"}`}>
      <div
        className={`search__filter search__filter--${!visibleFilter && "hide"}`}
      >
        <FiltersSearch visible={visibleFilter} setVisible={setVisibleFilters} />
      </div>
      <div className="search__container">
        <InputSearch
          placeholder="Que estas buscando?"
          onSearch={onSearch}
          allowClear
        />
        {loading.createSearch && (
          <div className="search__loading">
            <span>Consultando informacion...</span>
            <LoadingOutlined />
          </div>
        )}
        {publications?.length === 0 && !loading.createSearch && (
          <div className="search__feedback">
            <img
              src={require("../../assets/images/feedback.png")}
              alt="feedback_img"
            />
            <span>
              !Encuentra todo lo que necesites para que
              <br />
              <strong>tu negocio crezca</strong>!
            </span>
          </div>
        )}
        {publications?.length > 0 && !loading.createSearch && (
          <>
            <div className="search search__results">
              <h1>Resultados({publications?.length})</h1>
              <Button
                className="search search__results--button"
                type="link"
                //onClick={}
              >
                📊 Analizar resultados
              </Button>
            </div>
            {publications?.map((publication, index) => (
              <CardPublication
                key={index}
                title={publication.title}
                description={publication.description}
                //words={publication.words}
                authors={publication.authors}
                origin={publication.origin}
                website={publication.siteUrl}
                journal={`${publication?.journal || ""} ${
                  publication.year || ""
                }`}
                //isActive={publication.isActive}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};
