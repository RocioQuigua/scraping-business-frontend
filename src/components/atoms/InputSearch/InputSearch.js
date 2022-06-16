import React from 'react';
import { Button, Input } from "antd";
import { SearchOutlined } from '@ant-design/icons';

export const InputSearch = ({placeholder, ...props}) => {
  return (
    <Input className="input-search" placeholder={placeholder} {...props} suffix={
      <Button className='input-search__button'>
        <SearchOutlined />
      </Button>
    } />
  );
};