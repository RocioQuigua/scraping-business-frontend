import React, { useState } from "react";
import { Button, Input } from "antd";
import { SearchOutlined } from "@ant-design/icons";

export const InputSearch = ({ placeholder, onSearch, ...props }) => {
  const [value, setValue] = useState();

  return (
    <div className="input-search">
      <Input
        className="input-search__input"
        placeholder={placeholder}
        onChange={({ target: { value } }) => setValue(value)}
        {...props}
      />
      <Button
        className="input-search__button"
        onClick={() => onSearch(value)}
        disabled={!value}
        block
      >
        <SearchOutlined /> Buscar
      </Button>
    </div>
  );
};
