import React from "react";
import { Button } from "antd";
import {
  BookOutlined,
  StarFilled,
  StarOutlined,
  TeamOutlined,
} from "@ant-design/icons";

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
}) => {
  return (
    <div className="card-publication">
      <div className="card-publication__card card-publication__card--group">
        <h2>{date}</h2>
        <button className="card-publication__start" onClick={onClickStart}>
          {isActive ? <StarFilled /> : <StarOutlined />}
        </button>
      </div>
      <div className="card-publication__card">
        <h1>{language?.band} {title}</h1>
      </div>
      <p>{description}</p>
      <div className="card-publication__website">
        <div className="card-publication__button">
          {words?.map((word, index) => (
            <Button
              className="card-publication__button card-publication__button--results"
              key={index}
            >
              {word.name}(<strong>{word.value}</strong>)
            </Button>
          ))}
        </div>
        <Button
          className="card-publication__button card-publication__button--sitie"
          type="link"
          onClick={() => window.open(website, "_blank")}
        >
          Visitar sitio
        </Button>
      </div>
      <div className="card-publication__detail">
        <h3>{origin} {language?.name}</h3>
        {authors && (
          <h3>
            {authors} <TeamOutlined />
          </h3>
        )}
        {journal && (
          <h3>
            {journal} <BookOutlined /> <strong>{type}</strong>
          </h3>
        )}
      </div>
    </div>
  );
};
