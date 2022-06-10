import React from "react";
import { Form, Button, Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons"; 

import { InputCustom } from "../../../components/atoms/InputCustom/InputCustom";

export const Signup = () => {
  return (
    <div className="signup">
      <div>
        <Form>
          <h1>Registro</h1>
          <h2>Información personal</h2>
          <Form.Item>
            <label className="name">Nombres*</label>
            <InputCustom />
          </Form.Item>
          <Form.Item>
            <label className="surname">Apellidos*</label>
            <InputCustom />
          </Form.Item>
          <Form.Item>
            <label>Celular*</label>
            <Input maxLength={10} />
          </Form.Item>
          <Form.Item>
            <label>Correo*</label>
            <InputCustom  placeholder="example@tucorreo.com"/>
          </Form.Item>
          <Form.Item>
            <label>Contraseña*</label>
            <Input.Password
            placeholder="********"
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" block >Siguiente</Button>
          </Form.Item>
          <Form.Item>
            <label>Tienes una cuenta?</label>
            <a href="../Login/Login.js">Ingresar</a>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
