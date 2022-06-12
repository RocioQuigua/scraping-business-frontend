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
      <div>
        <Form onFinish={onFinish} form={form}>
          <h1>Registro</h1>
          <h2>Información personal</h2>
          <label className="name">Nombres*</label>
          <Form.Item name="name">
            <InputCustom />
          </Form.Item>
          <label className="surname">Apellidos*</label>
          <Form.Item name="surname">
            <InputCustom />
          </Form.Item>
          <label>Celular*</label>
          <Form.Item name="phone">
            <Input maxLength={10} />
          </Form.Item>
          <label>Correo*</label>
          <Form.Item name="email">
            <InputCustom  placeholder="example@tucorreo.com"/>
          </Form.Item>
          <label>Contraseña*</label>
          <Form.Item name="password">
            <Input.Password
            placeholder="********"
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />
          </Form.Item>
          <Form.Item shouldUpdate noStyle>
            {() => (
              <Button 
              className="button-primary"
              type="primary" 
              htmlType="submit"
              disabled={!form.getFieldValue("name") || !form.getFieldValue("surname") || !form.getFieldValue("phone") || !form.getFieldValue("email") || !form.getFieldValue("password")}
              block >
                Siguiente</Button>
            )}
          </Form.Item > 
          <label>Tienes una cuenta?</label>
          <Form.Item noStyle>
            <Button type="link" onClick={() => navigate('/login')}>
              Ingresar</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};