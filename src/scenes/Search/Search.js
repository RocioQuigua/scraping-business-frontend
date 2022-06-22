import { LoadingOutlined } from "@ant-design/icons";
import { Button, message } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { InputSearch } from "../../components/atoms/InputSearch/InputSearch";
import { CardPublication } from "../../components/organisms/CardPublication/CardPublication";
import { FiltersSearch } from "../../components/organisms/FiltersSearch/FiltersSearch";
import { search as SearchActions } from "../../services/Search/SearchActions";
import { favorite as FavoriteActions } from "../../services/Favorite/FavoriteActions";

export const Search = () => {
  const dispatch = useDispatch();

  const { success } = useSelector(state => state.favorite);
  const { profile } = useSelector((state) => state.user);
  const { publications, publicationsFilter, loading } = useSelector((state) => state.search);
  const [visibleFilter, setVisibleFilters] = useState(true);

  useEffect(() => {
    if (success.create) {
      dispatch(FavoriteActions.setSuccess('create', undefined));
      message.success('Se ha agregado un elemento a favoritos!')
    }
  }, [success.create, dispatch]);

  const onSearch = (text) => {
    dispatch(SearchActions.createSearch(text));
  };

  const onClickStart = (item) => {
    dispatch(
      FavoriteActions.create({
        ...item,
        userId: parseInt(profile.id, 10),
        typeKey: item?.type?.key,
      })
    );
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
        {(publicationsFilter || publications)?.length === 0 && !loading.createSearch && (
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
        {(publicationsFilter || publications)?.length > 0 && !loading.createSearch && (
          <>
            <div className="search search__results">
              <h1>Resultados({(publicationsFilter || publications)?.length})</h1>
              <Button
                className="search search__results--button"
                type="link"
                //onClick={}
              >
                📊 Analizar resultados
              </Button>
            </div>
            {(publicationsFilter || publications)?.map((publication, index) => (
              <CardPublication
                key={index}
                title={publication.title}
                description={publication.description}
                //words={publication.words}
                authors={publication.authors}
                origin={publication.origin}
                website={publication.siteUrl}
                language={publication?.language}
                journal={`${publication?.journal || ""} ${
                  publication.year || ""
                }`}
                type={`[${publication?.type?.name || 'Web'}]`}
                onClickStart={() => onClickStart(publication)}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};
