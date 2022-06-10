import React from "react";
import { Form, Button, Input } from "antd";
import { EyeInvisibleOutlined, EyeTwoTone } from "@ant-design/icons"; 

import { InputCustom } from "../../../components/atoms/InputCustom/InputCustom";

<style>
@import url('https://fonts.googleapis.com/css2?family=Poppins&display=swap');
</style>

export const Login = () => {
  return (
    <div className="login">
      <div>
        <Form>
        <h1 className="title-one">Iniciar sesion</h1>
          <Form.Item>
            <label className="title-two">Correo*</label>
            <InputCustom  placeholder="example@tucorreo.com"/>
          </Form.Item>
          <Form.Item>
            <label className="title-two">Contraseña*</label>
            <Input.Password 
            placeholder="********" 
            iconRender={(visible) => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}
            />
          </Form.Item>
          <Form.Item>
            <Button type="primary" block className="button-primary">Ingresar</Button>
          </Form.Item>
          <Form.Item className="footer">
            <label>No tienes una cuenta?</label>
            <a href="../Signup">Registrarse</a>
            <a href="">Olvidé mi contraseña</a>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
