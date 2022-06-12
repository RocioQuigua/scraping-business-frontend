import React, { useRef } from "react";
import { Form, Button, Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import { InputCustom } from "../../../components/atoms/InputCustom/InputCustom";

export const Login = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.error("Values: ", values);
  };

  return (
    <div className="login">
      <div>
        <Form onFinish={onFinish} form={form}>
          <h1 className="title-one">Iniciar sesion</h1>
          <label className="title-two">Correo*</label>
          <Form.Item name="email">
            <InputCustom placeholder="example@tucorreo.com" />
          </Form.Item>
          <label className="title-two">Contraseña*</label>
          <Form.Item name="password">
            <Input.Password
              placeholder="********"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>
          <Form.Item shouldUpdate noStyle>
            {() => (
              <Button
                className="button-primary"
                type="primary"
                htmlType="submit"
                disabled={!form.getFieldValue("email") || !form.getFieldValue('password')}
                block
              >
                Ingresar
              </Button>
            )}
          </Form.Item>
          <Form.Item className="footer" noStyle>
            <label>No tienes una cuenta?</label>
            <Button type="link" onClick={() => navigate("/signup")}>
              Registrarse
            </Button>
            <Button type="link" onClick={() => navigate("/forgetpassword")}>
              Olvidé mi contraseña
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};