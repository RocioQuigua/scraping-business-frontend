import React from "react";

import { Form, Button, Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";

import { InputCustom } from "../../components/atoms/InputCustom/InputCustom";

export const Profile = () => {
  const [form] = Form.useForm();

  const onFinish = (values) => {
    console.error("Values", values);
  };

  return (
    <div className="profile">
      <div className="profile__info">
        <Form onFinish={onFinish} form={form}>
          <h1 className="profile__titlep">Información personal</h1>
          <label className="profile__title">
            Nombres
            <strong className="profile__title profile__title--s">*</strong>
          </label>
          <Form.Item name="name">
            <InputCustom />
          </Form.Item>
          <label className="profile__title">
            Apellidos
            <strong className="profile__title profile__title--s">*</strong>
          </label>
          <Form.Item name="surname">
            <InputCustom />
          </Form.Item>
          <label className="profile__title">
            Celular
            <strong className="profile__title profile__title--s">*</strong>
          </label>
          <Form.Item name="phone">
            <Input className="profile__input" maxLength={10} />
          </Form.Item>
          <label className="profile__title">
            Correo
            <strong className="profile__title profile__title--s">*</strong>
          </label>
          <Form.Item name="email">
            <InputCustom placeholder="example@tucorreo.com" />
          </Form.Item>
          <label className="profile__title">
            Contraseña
            <strong className="profile__title profile__title--s">*</strong>
          </label>
          <Form.Item name="password">
            <Input.Password
              className="profile__input"
              placeholder="********"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>
          <Form.Item shouldUpdate noStyle>
            {() => (
              <Button
                className="profile__button"
                type="primary"
                htmlType="submit"
                block
              >
                Actualizar datos
              </Button>
            )}
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
