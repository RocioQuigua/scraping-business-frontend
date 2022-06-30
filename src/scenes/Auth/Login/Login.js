import React, { useEffect } from "react";
import { Form, Button, Input, message } from "antd";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LoadingOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { InputCustom } from "../../../components/atoms/InputCustom/InputCustom";
import { auth as AuthActions } from "../../../services/Auth/AuthActions";

export const Login = () => {
  const dispatch = useDispatch();

  const { loading: loadingAuth, error } = useSelector((state) => state.auth);

  const [form] = Form.useForm();
  const navigate = useNavigate();

  useEffect(() => {
    if (error.login === "USER_NOT_EXIST") {
      message.error("El correo y/o contraseña son incorrestos");
      dispatch(AuthActions.setError("login", undefined));
    }
  }, [error.login, dispatch]);

  const onFinish = (values) => {
    dispatch(AuthActions.login(values));
  };

  return (
    <div className="login">
      <div className="login__info">
        <Form onFinish={onFinish} form={form}>
          <h1 className="login__content login__content--titlep">
            Iniciar sesion
          </h1>
          <label className="login__content login__content--title">
            Correo
            <strong className="login__content login__content--s">*</strong>
          </label>
          <Form.Item name="email">
            <InputCustom
              className="login__content login__content--input"
              placeholder="example@tucorreo.com"
            />
          </Form.Item>
          <label className="login__content login__content--title">
            Contraseña
            <strong className="login__content login__content--s">*</strong>
          </label>
          <Form.Item name="password">
            <Input.Password
              className="login__content login__content--input"
              placeholder="********"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>
          <Form.Item shouldUpdate noStyle>
            {() => (
              <Button
                className="login__button"
                type="primary"
                htmlType="submit"
                disabled={
                  !form.getFieldValue("email") ||
                  !form.getFieldValue("password") ||
                  loadingAuth.login
                }
                block
              >
                {loadingAuth.login ? <LoadingOutlined /> : "Ingresar"}
              </Button>
            )}
          </Form.Item>
          <div className="login__footer">
            <div className="login__footer login__footer--group">
              <label>No tienes una cuenta?</label>
              <Button
                className="login__footer login__footer--button"
                type="link"
                onClick={() => navigate("/signup")}
              >
                Registrarse
              </Button>
            </div>
            <Button
              className="login__footer login__footer--buttonp"
              type="link"
              onClick={() => navigate("/forgetpassword")}
            >
              Olvidé mi contraseña
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
};
