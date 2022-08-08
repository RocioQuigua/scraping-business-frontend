import React, { useState } from "react";
import { AutoComplete, Button } from "antd";
import { HistoryOutlined, SearchOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";

export const InputSearch = ({ placeholder, onSearch, ...props }) => {
  const [value, setValue] = useState();
  const { loading } = useSelector(state => state.search);

  const { history } = useSelector((state) => state.search);

  return (
    <div className="input-search">
      <AutoComplete
        className="input-search__input"
        placeholder={placeholder}
        onChange={(value) => setValue(value)}
        {...props}
      >
        {history.map((item, index) => (
          <AutoComplete.Option key={index} value={item.text}>
            <HistoryOutlined /> {item.text}
          </AutoComplete.Option>
        ))}
      </AutoComplete>
      <Button
        className="input-search__button"
        onClick={() => onSearch(value)}
        disabled={!value || loading.createSearch }
        block
      >
        <SearchOutlined /> <span className="text">Buscar</span>
      </Button>
    </div>
  );
};
