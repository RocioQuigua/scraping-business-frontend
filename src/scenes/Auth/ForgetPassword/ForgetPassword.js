import { Form, Button } from "antd";
import React from "react";

import { InputCustom } from "../../../components/atoms/InputCustom/InputCustom";

export const ForgetPassword = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.error("Values", values);
  };

  return (
    <div className="ForgetPassword">
      <div>
        <Form onFinish={onFinish} form={form}>
          <h1>Olvidé mi contraseña</h1>
          <label>Correo*</label>
          <Form.Item name="email">
            <InputCustom placeholder="example@tucorreo.com" />
          </Form.Item>
          <Form.Item shouldUpdate noStyle>
            {() => (
              <Button
                className="button-primary"
                type="primary"
                htmlType="submit"
                disabled={!form.getFieldValue("email")}
                block
              >
                Enviar código
              </Button>
            )}
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
