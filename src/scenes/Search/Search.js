import {
  CheckOutlined,
  InfoCircleOutlined,
  LoadingOutlined,
} from "@ant-design/icons";
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
import { DownloadReport } from "../../components/organisms/DownloadReport/DownloadReport";

const COUNTS = [20, 50, 100];

export const Search = () => {
  const dispatch = useDispatch();

  const { success, favorites } = useSelector((state) => state.favorite);
  const { profile } = useSelector((state) => state.user);
  const { publications, publicationsFilter, loading, pageGlobal } = useSelector(
    (state) => state.search
  );

  const [visibleFilter, setVisibleFilters] = useState(true);
  const [quantity, setQuantity] = useState(COUNTS[COUNTS.length - 1]);
  const [page, setPage] = useState(1);
  const [q, setQ] = useState();
  const [itemsSelected, setItemsSelected] = useState([]);
  const [isSelectAll, setIsSelectAll] = useState(false);

  useEffect(() => {
    if (success.create) {
      dispatch(FavoriteActions.setSuccess("create", undefined));
      message.success("Se ha agregado un elemento a favoritos!");
    }
  }, [success.create, dispatch]);

  useEffect(() => {
    dispatch(FavoriteActions.getAll());
  }, [dispatch]);

  useEffect(() => {
    dispatch(SearchActions.getHistory());
  }, [dispatch, loading.createSearch]);

  useEffect(() => {
    if (q && page > pageGlobal)
      dispatch(SearchActions.createSearch(q, quantity, page));
    else dispatch(SearchActions.getCacheSearch(page));
  }, [quantity, page, dispatch]);

  const onClickStart = (item) => {
    dispatch(
      FavoriteActions.create({
        ...item,
        userId: parseInt(profile.id, 10),
        typeKey: item?.type?.key,
        year: item.year !== 'undefined' && item.year
       })
    );
  };

  const onSearch = (text) => {
    dispatch(SearchActions.clearAll());
    dispatch(SearchActions.setState("filterValues", []));
    dispatch(SearchActions.createSearch(text, quantity, page));
    setQ(text);
    setPage(1);
    setItemsSelected([]);
    setIsSelectAll();
  };

  const isShowPagination = () => {
    return (
      ((publications?.length > 0 && !loading.createSearch) || page > 1) &&
      publicationsFilter?.length === 0
    );
  };

  const isFavorite = (code) => {
    return favorites.find(e => e.publication.code === code);
  }

  const handleAddSelected = (item) => {
    if (getItemSelected(item.code)) {
      let newsItems = itemsSelected.filter((e) => e.code !== item.code);
      setItemsSelected(newsItems);
    } else {
      delete item.type;
      delete item.words;
      setItemsSelected([...itemsSelected, item]);
    }
  };

  const handleAllSelected = () => {
    let newsItems;
    if (isSelectAll) {
      newsItems = itemsSelected.filter((item) => item.page !== page);
    } else {
      newsItems = (publicationsFilter || publications).map((item, index) => {
        delete item.type;
        delete item.words;

        return {
          ...item,
          page,
        };
      });

      if (isSelectAll) {
        newsItems = [...itemsSelected, ...newsItems];
      }
    }

    setItemsSelected(newsItems);
    setIsSelectAll(!isSelectAll);
  };

  const getItemSelected = (code) => {
    return itemsSelected.find((item) => item.code === code) !== undefined;
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
          placeholder="¿Qué estás buscando?"
          onSearch={onSearch}
          allowClear
        />
        <span className="search__alert">
          <InfoCircleOutlined /> Puedes usar búsquedas condicionales en español
          (<strong>y</strong> = AND / <strong>o</strong> = OR).
        </span>
        <div className="search search__results">
          {publications?.length > 0 ? (
            <h1>Resultados({(publicationsFilter || publications)?.length})</h1>
          ) : (
            <h1>Resultados</h1>
          )}
          <Button
            className="search__button-chart"
            disabled={
              !(publicationsFilter || publications)?.length ||
              loading.createSearch
            }
            type="link"
            onClick={() =>
              dispatch(ModalActions.setModal("modalSearchReport", true))
            }
          >
            📊 Gráficos
          </Button>
          <div className="search__container-count">
            <h3>Publicaciones por página</h3>
            <Select value={quantity} onChange={(value) => setQuantity(value)}>
              {COUNTS.map((item, index) => (
                <Select.Option key={index} value={item}>
                  {item}
                </Select.Option>
              ))}
            </Select>
          </div>
        </div>
        {loading.createSearch && (
          <div className="search__loading">
            <span>Consultar información...</span>
            <LoadingOutlined />
          </div>
        )}
        {(publicationsFilter || publications)?.length === 0 &&
          !loading.createSearch && (
            <div className="search__feedback">
              <span>
                ¡ups! no hemos encontrado ningún resultado
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
              ¡Encuentra todo lo que necesitas para hacer
              <br />
              <strong>crecer tu negocio</strong>!
            </span>
          </div>
        )}
        {(publicationsFilter || publications)?.length > 0 &&
          !loading.createSearch && (
            <>
              <div className="search__container-download">
                <div
                  className={`card-publication__checkbox card-publication__checkbox--${
                    isSelectAll && "check"
                  }`}
                  onClick={handleAllSelected}
                >
                  {isSelectAll && <CheckOutlined />}
                </div>
                <h3 onClick={handleAllSelected}>Seleccionar la página</h3>
                <DownloadReport
                  name={`Exportar(${itemsSelected.length})`}
                  disabled={itemsSelected.length === 0}
                  data={itemsSelected}
                />
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
                      publication.year === 'undefined' ? '' : publication.year
                    }`}
                    type={`[${publication?.type?.name || "Web"}]`}
                    onClickStart={() => onClickStart(publication)}
                    isCheck={true}
                    isActive={isFavorite(publication.code)}
                    onSelect={() => handleAddSelected(publication)}
                    isSelected={getItemSelected(publication.code)}
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
