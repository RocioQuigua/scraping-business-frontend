import { CheckOutlined, LoadingOutlined } from "@ant-design/icons";
import { message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatterDate } from "../../common/Utils/FormatterDateUtils";
import { AlertMessage } from "../../components/Modals/AlertMessage/AlertMessage";

import { CardPublication } from "../../components/organisms/CardPublication/CardPublication";
import { DownloadReport } from "../../components/organisms/DownloadReport/DownloadReport";
import { favorite as FavoriteActions } from "../../services/Favorite/FavoriteActions";
import { modal as ModalActions } from "../../services/Modal/ModalActions";

export const Favorites = () => {
  const [visibleAlert, setVisibleAlert] = useState();
  const [itemsSelected, setItemsSelected] = useState([]);
  const [isSelectAll, setIsSelectAll] = useState(false);

  const { favorites, loading, success } = useSelector(
    (state) => state.favorite
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (success.remove) {
      dispatch(ModalActions.setModal("alertMessage", false, undefined));
      dispatch(FavoriteActions.setSuccess("remove", undefined));
      message.success("Se ha removido un elemento de favoritos");
    }
  }, [success.remove, dispatch]);

  useEffect(() => {
    dispatch(FavoriteActions.getAll());
  }, [dispatch]);

  const handleRemove = (item) => {
    dispatch(
      ModalActions.setModal("alertMessage", true, {
        title: "¿Estas seguro de remover el actual item?",
        onClick: () => removeItem(item),
      })
    );
  };

  const removeItem = (item) => {
    dispatch(FavoriteActions.remove(item.id));
  };

  const handleAddSelected = (item, id) => {
    if (getItemSelected(id)) {
      let newsItems = itemsSelected.filter((item) => item.id !== id);
      setItemsSelected(newsItems);
    } else {
      setItemsSelected([...itemsSelected, { ...item.publication, ...item }]);
    }
  };

  const handleAllSelected = () => {
    let newsItems;
    if (isSelectAll) {
      newsItems = [];
    } else {
      newsItems = favorites;
    }

    setItemsSelected(newsItems);
    setIsSelectAll(!isSelectAll);
  };

  const getItemSelected = (id) => {
    return itemsSelected.find((item) => item.id === id);
  };

  return (
    <div className="favorites">
      <div className="favorites__container">
        <h1 className="favorites__title">Favoritos ({favorites?.length}) ⭐</h1>
        <div className="search__container-download">
          <div
            className={`card-publication__checkbox card-publication__checkbox--${
              isSelectAll && "check"
            }`}
            onClick={handleAllSelected}
          >
            {isSelectAll && <CheckOutlined />}
          </div>
          <h3 onClick={handleAllSelected}>Seleccionar todos</h3>
          <DownloadReport
            name={`Exportar(${itemsSelected.length})`}
            disabled={itemsSelected.length === 0}
            data={itemsSelected}
          />
        </div>
        <div className="favorites__favorites">
          {favorites?.map((item, index) => (
            <CardPublication
              key={index}
              title={item.publication.title}
              description={item?.publication?.description}
              website={item.publication.siteUrl}
              origin={item.publication.origin}
              journal={`${item.publication.journal} (${item.publication.year})`}
              authors={item.publication.authors}
              type={`[${item.publication?.type?.name || "Web"}]`}
              isActive={true}
              date={formatterDate(item.publication.createdAt)}
              onClickStart={() => handleRemove(item)}
              isCheck={true}
              onSelect={() => handleAddSelected(item, item?.id)}
              isSelected={getItemSelected(item?.id)}
            />
          ))}
        </div>
        {favorites?.length === 0 && !loading.getAll && (
          <div className="favorites__feedback">
            <img
              src={require("../../assets/images/favorites_1.png")}
              alt="img"
            />
            <h2>
              Aun no tienes favoritos guardados, recuerda que puedes <br />
              realizar <strong> busquedas</strong> y guardar tus intereses!
            </h2>
          </div>
        )}
        <div className="favorites__loading">
          {loading.getAll && <LoadingOutlined />}
        </div>
      </div>
      <AlertMessage visible={visibleAlert} setVisible={setVisibleAlert} />
    </div>
  );
};
