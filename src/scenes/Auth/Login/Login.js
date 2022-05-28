import React from "react";
import { Form } from "antd";

import { InputCustom } from "../../../components/atoms/InputCustom/InputCustom";

export const Login = () => {
  return (
    <div className="login">
      <div>
        <Form>
          <Form.Item>
            <InputCustom />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
