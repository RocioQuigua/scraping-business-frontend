import { LoadingOutlined } from "@ant-design/icons";
import { message } from "antd";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatterDate } from "../../common/Utils/FormatterDateUtils";
import { AlertMessage } from "../../components/Modals/AlertMessage";

import { CardPublication } from "../../components/organisms/CardPublication/CardPublication";
import { favorite as FavoriteActions } from "../../services/Favorite/FavoriteActions";
import { modal as ModalActions } from "../../services/Modal/ModalActions";

export const Favorites = () => {
  const [visibleAlert, setVisibleAlert] = useState();
  const { favorites, loading, success } = useSelector((state) => state.favorite);

  const dispatch = useDispatch();

  useEffect(() => {
    if (success.remove) {
      dispatch(ModalActions.setModal("alertMessage", false, undefined))
      dispatch(FavoriteActions.setSuccess('remove', undefined));
      message.success('Se ha removido un elemento de favoritos')
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

  return (
    <div className="favorites">
      <div className="favorites__container">
        <h1 className="favorites__title">Favoritos ({favorites?.length}) ⭐</h1>
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
              type={`[${item.publication?.type?.name || 'Web'}]`}
              isActive={true}
              date={formatterDate(item.publication.createdAt)}
              onClickStart={() => handleRemove(item)}
            />
          ))}
        </div>
        <div className="favorites__loading">
          {loading.getAll && <LoadingOutlined />}
        </div>
      </div>
      <AlertMessage visible={visibleAlert} setVisible={setVisibleAlert} />
    </div>
  );
};
