import { useState } from "react";

import { InputSearch } from "../../components/atoms/InputSearch/InputSearch";
import { CardPublication } from "../../components/organisms/CardPublication/CardPublication";
import { FiltersSearch } from "../../components/organisms/FiltersSearch/FiltersSearch";

import { Button } from 'antd';

export const Search = () => {
  const [visibleFilter, setVisibleFilters] = useState(true);

  const publications = [
    {
      title: "The standard Lorem Ipsum passage, used since the 1500s",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt adipiscing elit, sed do eiusmod tempor ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud...",
      date: "10/06/2021",
      isActive: true,
      words: [
        {
          name: "leche",
          count: 10,
        },
        {
          name: "queso",
          count: 19,
        },
        {
          name: "cuajada",
          count: 11,
        },
        {
          name: "arroz con leche",
          count: 15,
        },
      ],
      siteUrl:
        "https://stackoverflow.com/questions/47406344/how-to-open-a-page-in-new-tab-on-click-of-a-button-in-react-i-want-to-send-some",
    },
    {
      title: "The standard Lorem Ipsum, used since the 2500s",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt adipiscing elit, sed do eiusmod tempor ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud...",
      date: "10/12/2021",
      words: [
        {
          name: "pan",
          count: 10,
        },
        {
          name: "sandwich",
          count: 19,
        },
        {
          name: "calados",
          count: 11,
        },
        {
          name: "pan leche",
          count: 15,
        },
      ],
      siteUrl:
        "https://thewebdev.info/2021/10/03/how-to-open-a-component-in-new-window-on-a-click-in-react/",
    },
    {
      title: "The standard Lorem Ipsum, since the 3500s",
      description:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt adipiscing elit, sed do eiusmod tempor ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud...",
      date: "10/06/2021",
      siteUrl: "https://es.reactjs.org/docs/handling-events.html",
      isActive: true,
    },
  ];

  return (
    <div className={`search search--${!visibleFilter && "hide-filters"}`}>
      <div
        className={`search__filter search__filter--${!visibleFilter && "hide"}`}
      >
        <FiltersSearch visible={visibleFilter} setVisible={setVisibleFilters} />
      </div>
      <div className="search__container">
        <InputSearch placeholder="Que estas buscando?" allowClear />
        <div className="search search__results">
          <h1>Resultados()</h1>
          <Button
          className="search search__results--button"
          type="link"
          //onClick={}
          >📊 Analizar resultados</Button>
        </div>
        {publications.map((publication, index) => (
          <CardPublication
            key={index}
            title={publication.title}
            description={publication.description}
            date={publication.date}
            words={publication.words}
            website={publication.siteUrl}
            isActive={publication.isActive}
          />
        ))}
      </div>
    </div>
  );
};
