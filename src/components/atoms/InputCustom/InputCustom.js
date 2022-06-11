import React from "react";
import { Input } from "antd";

export const InputCustom = ({ placeholder, ...props }) => {
  return (
    <Input className="input-custom" placeholder={placeholder} {...props} />
  );
};
