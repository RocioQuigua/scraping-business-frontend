import {
  BookOutlined,
  CheckOutlined,
  StarFilled,
  StarOutlined,
  TeamOutlined,
} from "@ant-design/icons";
import { Button } from "antd";
import React from "react";

export const CardPublication = ({
  title,
  description,
  date,
  words,
  authors,
  journal,
  origin,
  website,
  type,
  language,
  isActive,
  onClickStart,
  isSelected,
  isCheck,
  onSelect,
}) => {
  return (
    <div
      className={`card-publication card-publication--${isSelected && "selected"}`}
    >
      <div className="card-publication__card">
        {isCheck && (
          <div
            className={`card-publication__checkbox card-publication__checkbox--${
              isSelected && "check"
            }`}
            onClick={onSelect}
          >
            {isSelected && <CheckOutlined />}
          </div>
        )}
        {!isCheck && <span />}
        <div className="card-publication__container-start">
          <h2>{date}</h2>
          <button className="card-publication__start" onClick={onClickStart}>
            {isActive ? <StarFilled /> : <StarOutlined />}
          </button>
        </div>
      </div>
      <div className="card-publication__card">
        <h1>
          {language?.band} {title}
        </h1>
      </div>
      <p>{description}</p>
      <div className="card-publication__website">
        <div className="card-publication__container-button">
          {words?.map((word, index) => (
            <div className="card-publication__button" key={index}>
              <span>
                {word.name}(<strong>{word.value}</strong>)
              </span>
            </div>
          ))}
        </div>
        <Button
          className="card-publication__button-sitie"
          type="link"
          onClick={() => window.open(website, "_blank")}
        >
          Visitar sitio
        </Button>
      </div>
      <div className="card-publication__detail">
        <h3>
          {origin} {language?.name}{" "}
          {authors && (
            <>
              / {authors} <TeamOutlined />
            </>
          )}
          {journal && (
            <>
              / {journal} <BookOutlined /> <strong>{type}</strong>
            </>
          )}
        </h3>
      </div>
    </div>
  );
};
