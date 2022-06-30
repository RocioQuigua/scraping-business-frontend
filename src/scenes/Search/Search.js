import { LoadingOutlined } from "@ant-design/icons";
import { Button, message, Select } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { InputSearch } from "../../components/atoms/InputSearch/InputSearch";
import { CardPublication } from "../../components/organisms/CardPublication/CardPublication";
import { FiltersSearch } from "../../components/organisms/FiltersSearch/FiltersSearch";
import { search as SearchActions } from "../../services/Search/SearchActions";
import { modal as ModalActions } from "../../services/Modal/ModalActions";
import { favorite as FavoriteActions } from "../../services/Favorite/FavoriteActions";
import { ModalSearchReport } from "../../components/Modals/ModalSearchReport/ModalSearchReport";
import { Pagination } from "../../components/organisms/Pagination/Pagination";

const COUNTS = [20, 40, 60, 80, 100, 120, 140, 160, 180, 200];

export const Search = () => {
  const dispatch = useDispatch();

  const { success } = useSelector((state) => state.favorite);
  const { profile } = useSelector((state) => state.user);
  const { publications, publicationsFilter, loading } = useSelector(
    (state) => state.search
  );

  const [visibleFilter, setVisibleFilters] = useState(true);
  const [quantity, setQuantity] = useState(COUNTS[COUNTS.length - 1]);
  const [page, setPage] = useState(1);
  const [q, setQ] = useState();

  useEffect(() => {
    if (success.create) {
      dispatch(FavoriteActions.setSuccess("create", undefined));
      message.success("Se ha agregado un elemento a favoritos!");
    }
  }, [success.create, dispatch]);

  useEffect(() => {
    dispatch(SearchActions.getHistory());
  }, [dispatch, loading.createSearch]);

  useEffect(() => {
    if (q) dispatch(SearchActions.createSearch(q, quantity, page));
  }, [quantity, page, dispatch]);

  const onClickStart = (item) => {
    dispatch(
      FavoriteActions.create({
        ...item,
        userId: parseInt(profile.id, 10),
        typeKey: item?.type?.key,
      })
    );
  };

  const onSearch = (text) => {
    dispatch(SearchActions.createSearch(text, quantity, page));
    setQ(text);
    setPage(1);
  };

  const isShowPagination = () => {
    return (publications?.length > 0 && !loading.createSearch) || page > 1;
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
        <div className="search__actions">
          <div className="search__container-count">
            <h2>Publicaciones por pagina</h2>
            <Select value={quantity} onChange={(value) => setQuantity(value)}>
              {COUNTS.map((item, index) => (
                <Select.Option key={index} value={item}>
                  {item}
                </Select.Option>
              ))}
            </Select>
          </div>
          {
            //<Pagination page={page} setPage={setPage} />
          }
        </div>
        {loading.createSearch && (
          <div className="search__loading">
            <span>Consultando informacion...</span>
            <LoadingOutlined />
          </div>
        )}
        {(publicationsFilter || publications)?.length === 0 &&
          !loading.createSearch && (
            <div className="search__feedback">
              <span>
                Ups! no hemos encontrado ningun resultado
                <br />
                <strong>Vuelve a intentarlo</strong>!
              </span>
            </div>
          )}
        {!publicationsFilter && !publications && !loading.createSearch && (
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
        {(publicationsFilter || publications)?.length > 0 &&
          !loading.createSearch && (
            <>
              <div className="search search__results">
                <h1>
                  Resultados({(publicationsFilter || publications)?.length})
                </h1>
                <Button
                  className="search search__results--button"
                  type="link"
                  onClick={() =>
                    dispatch(ModalActions.setModal("modalSearchReport", true))
                  }
                >
                  📊 Reporte de resultados
                </Button>
              </div>
              {(publicationsFilter || publications)?.map(
                (publication, index) => (
                  <CardPublication
                    key={index}
                    title={publication.title}
                    description={publication.description}
                    words={publication.words}
                    authors={publication.authors}
                    origin={publication.origin}
                    website={publication.siteUrl}
                    language={publication?.language}
                    journal={`${publication?.journal || ""} ${
                      publication.year || ""
                    }`}
                    type={`[${publication?.type?.name || "Web"}]`}
                    onClickStart={() => onClickStart(publication)}
                  />
                )
              )}
            </>
          )}
        {isShowPagination() && (
          <div className="search__footer">
            <Pagination page={page} setPage={setPage} />
          </div>
        )}
      </div>
      <ModalSearchReport />
    </div>
  );
};
