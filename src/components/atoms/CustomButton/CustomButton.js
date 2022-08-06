import { Button } from "antd";
import React from "react";

export const CustomButton = ({ children, ...props }) => {
  return (
    <Button className="custom-button" {...props}>
      {children}
    </Button>
  );
};
