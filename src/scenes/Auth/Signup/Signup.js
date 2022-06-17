import React from "react";
import { Form, Button, Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import { InputCustom } from "../../../components/atoms/InputCustom/InputCustom";

export const Signup = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.error("Values", values);
  };

  return (
    <div className="signup">
      <div className="signup__info">
        <Form onFinish={onFinish} form={form}>
          <h1>Registro</h1>
          <h2>Información personal</h2>
          <label className="signup__title">
            Nombres<strong className="signup__title signup__title--s">*</strong>
          </label>
          <Form.Item name="name">
            <InputCustom />
          </Form.Item>
          <label className="signup__title">
            Apellidos
            <strong className="signup__title signup__title--s">*</strong>
          </label>
          <Form.Item name="surname">
            <InputCustom />
          </Form.Item>
          <label className="signup__title">
            Celular<strong className="signup__title signup__title--s">*</strong>
          </label>
          <Form.Item name="phone">
            <Input className="signu__input" maxLength={10} />
          </Form.Item>
          <label className="signup__title">
            Correo<strong className="signup__title signup__title--s">*</strong>
          </label>
          <Form.Item name="email">
            <InputCustom
              placeholder="example@tucorreo.com"
            />
          </Form.Item>
          <label className="signup__title">
            Contraseña
            <strong className="signup__title signup__title--s">*</strong>
          </label>
          <Form.Item name="password">
            <Input.Password
              className="signu__input signu__input--password"
              placeholder="********"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>
          <Form.Item shouldUpdate noStyle>
            {() => (
              <Button
                className="signup__button"
                type="primary"
                htmlType="submit"
                disabled={
                  !form.getFieldValue("name") ||
                  !form.getFieldValue("surname") ||
                  !form.getFieldValue("phone") ||
                  !form.getFieldValue("email") ||
                  !form.getFieldValue("password")
                }
                block
              >
                Siguiente
              </Button>
            )}
          </Form.Item>
          <div className="signup__footer">
              <label>Tienes una cuenta?</label>
              <Button
                className="signup__footer signup__footer--button"
                type="link"
                onClick={() => navigate("/login")}
              >
                Ingresar
              </Button>
            </div>
        </Form>
      </div>
    </div>
  );
};
