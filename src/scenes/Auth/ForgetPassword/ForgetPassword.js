import { Form, Button } from "antd";
import React from "react";

import { InputCustom } from "../../../components/atoms/InputCustom/InputCustom";

export const ForgetPassword = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.error("Values", values);
  };

  return (
    <div className="forget">
      <div className="forget__info">
        <Form onFinish={onFinish} form={form}>
          <h1>Olvidé mi contraseña</h1>
          <label>Correo<strong className="forget__info forget__info--s">*</strong></label>
          <Form.Item name="email">
            <InputCustom className="forget__input" placeholder="example@tucorreo.com" />
          </Form.Item>
          <Form.Item shouldUpdate noStyle>
            {() => (
              <Button
                className="forget__button"
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
