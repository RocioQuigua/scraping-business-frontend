import React, { useState } from "react";
import { Form, Button, Input, Select } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";

import { InputCustom } from "../../../components/atoms/InputCustom/InputCustom";
import { useSelector } from "react-redux";

export const Signup = () => {

  const { categories } = useSelector(state => state.utils);
  const [visibleInfo, setVisibleInfo] = useState(true);

  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = (values) => {
    console.error("Values", values);
  };

  return (
    <div className="signup">
      {visibleInfo ? (
        <div className="signup__info">
          <Form onFinish={onFinish} form={form}>
            <h1 className="signup__titlep">Registro</h1>
            <h2 className="signup__titles">Información personal</h2>
            <label className="signup__title">
              Nombres
              <strong className="signup__title signup__title--s">*</strong>
            </label>
            <Form.Item name="name" rules={[{ required: true, message: "" }]}>
              <InputCustom />
            </Form.Item>
            <label className="signup__title">
              Apellidos
              <strong className="signup__title signup__title--s">*</strong>
            </label>
            <Form.Item
              name="lastname"
              rules={[{ required: true, message: "" }]}
            >
              <InputCustom />
            </Form.Item>
            <label className="signup__title">
              Celular
              <strong className="signup__title signup__title--s">*</strong>
            </label>
            <Form.Item name="phone" rules={[{ required: true, message: "" }]}>
              <Input className="signup__input" maxLength={10} />
            </Form.Item>
            <label className="signup__title">
              Correo
              <strong className="signup__title signup__title--s">*</strong>
            </label>
            <Form.Item name="email" rules={[{ required: true, message: "" }]}>
              <InputCustom placeholder="example@tucorreo.com" />
            </Form.Item>
            <label className="signup__title">
              Tipo de actividad
              <strong className="signup__title signup__title--s">*</strong>
            </label>
            <Form.Item name="typeBusiness">
              <Select className="signup__options" placeholder="Selecciona una opción">
                {categories.map((busines, index) => (
                  <Select.Option key={index} value={busines.id}>{busines.name}</Select.Option>
                ))}
              </Select>
            </Form.Item>
            <label className="signup__title">
              Contraseña
              <strong className="signup__title signup__title--s">*</strong>
            </label>
            <Form.Item
              name="password"
              rules={[{ required: true, message: "" }]}
            >
              <Input.Password
                className="signup__input"
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
                    !form.getFieldValue("lastname") ||
                    !form.getFieldValue("phone") ||
                    !form.getFieldValue("email") ||
                    !form.getFieldValue("password")
                  }
                  onClick={() => setVisibleInfo(false)}
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
      ) : (
        <div className="signup__info">
          <Form onFinish={onFinish} form={form}>
            <h1 className="signup__titlep signup__titlep-b">Registro</h1>
            <h2 className="signup__titles signup__titles-b">
              Información de la empresa
            </h2>
            <label className="signup__title">
              Nombre de la empresa
              <strong className="signup__title signup__title--s">*</strong>
            </label>
            <Form.Item name="nameBusiness">
              <InputCustom className="signu__input" />
            </Form.Item>
            <label className="signup__title">Nit</label>
            <Form.Item name="nitBusiness">
              <Input className="signup__input" maxLength={10} />
            </Form.Item>
            <Form.Item shouldUpdate noStyle>
              {() => (
                <Button
                  className="signup__button signup__button--created"
                  type="primary"
                  htmlType="submit"
                  disabled={
                    !form.getFieldValue("nameBusiness") ||
                    !form.getFieldValue("nitBusiness") ||
                    !form.getFieldValue("typeBusiness")
                  }
                  block
                >
                  Crear cuenta
                </Button>
              )}
            </Form.Item>
            <Button
              className="signup__footer signup__footer--back"
              type="link"
              onClick={() => setVisibleInfo(true)}
            >
              Atras
            </Button>
          </Form>
        </div>
      )}
    </div>
  );
};
