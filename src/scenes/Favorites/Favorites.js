import { LoadingOutlined } from "@ant-design/icons";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { formatterDate } from "../../common/Utils/FormatterDateUtils";

import { CardPublication } from "../../components/organisms/CardPublication/CardPublication";
import { favorite as FavoriteActions } from "../../services/Favorite/FavoriteActions";

export const Favorites = () => {
  const { favorites, loading } = useSelector((state) => state.favorite);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(FavoriteActions.getAll());
  }, [dispatch]);

  const handleRemove = () => {
    
  }

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
              type={`[${item.publication?.type?.name}]`}
              isActive={true}
              date={formatterDate(item.publication.createdAt)}
              onClickStart={() => handleRemove(item)}
            />
          ))}
        </div>
        <div className="favorites__loading">
          {loading.getAll && (
            <LoadingOutlined />
          )}
        </div>
      </div>
    </div>
  );
};
