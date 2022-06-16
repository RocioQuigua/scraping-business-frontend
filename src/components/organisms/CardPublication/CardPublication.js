import React from "react";
import { Button } from "antd";
import { StarOutlined } from "@ant-design/icons";

export const CardPublication = ({
  title,
  description,
  date,
  words,
  onClick,
  website,
}) => {
  return (
    <div className="card-publication">
      <div className="card-publication__card">
        <h1>{title}</h1>
        <h2>{date}</h2>
        <Button className="card-publication__start">
          <StarOutlined />
        </Button>
      </div>
      <p>{description}</p>
      <div className="card-publication__website">
        <div className="card-publication__button">
          {words?.map((word, index) => (
            <Button className="card-publication__button card-publication__button--results"
              key={index}>
              {word.name} 
              (<strong>{word.count}</strong>)
            </Button>
          ))}
        </div>
        <Button className="card-publication__button card-publication__button--sitie" type="link" onClick={() => window.open(website, "_blank")}>
          Visitar sitio
        </Button>
      </div>
    </div>
  );
};
