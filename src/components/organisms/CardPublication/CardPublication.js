import React from "react";
import { Button } from "antd";
import { StarFilled, StarOutlined } from "@ant-design/icons";

export const CardPublication = ({
  title,
  description,
  date,
  words,
  onClick,
  website,
  isActive,
}) => {
  return (
    <div className="card-publication">
      <div className="card-publication__card">
        <h1>{title}</h1>
        <div className="card-publication__card card-publication__card--group">
          <h2>{date}</h2>
          <button className="card-publication__start">
            {isActive ? <StarFilled /> : <StarOutlined />}
          </button>
        </div>
      </div>
      <p>{description}</p>
      <div className="card-publication__website">
        <div className="card-publication__button">
          {words?.map((word, index) => (
            <Button
              className="card-publication__button card-publication__button--results"
              key={index}
            >
              {word.name}(<strong>{word.count}</strong>)
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
    </div>
  );
};
