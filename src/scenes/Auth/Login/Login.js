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
import packageJSON from "../../../../package.json";
import { CustomButton } from "../../../components/atoms/CustomButton/CustomButton";

export const Login = () => {
  const dispatch = useDispatch();
  const { loading: loadingAuth, error } = useSelector((state) => state.auth);

  const navigate = useNavigate();
  const [form] = Form.useForm();

  useEffect(() => {
    if (error.login === "USER_NOT_EXIST") {
      message.error("El correo y/o contraseña son incorrestos");
      dispatch(AuthActions.setError("login", undefined));
    }
  }, [error.login, dispatch]);

  const onFinish = (values) => {
    dispatch(AuthActions.login(values));
  };

  const isValid = () => {
    return (
      form.getFieldValue("email") &&
      form.getFieldValue("password") &&
      form.getFieldsError().filter(({ errors }) => errors.length).length === 0
    );
  };

  return (
    <div className="login">
      <div className="login__header">
        <span onClick={() => navigate("/")}>Udlavite</span>
        <img src="logo.png" alt="logo" onClick={() => navigate("/")}/>
      </div>
      <div className="login__info">
        <Form onFinish={onFinish} form={form}>
          <h1 className="login__title">Iniciar sesion</h1>
          <img
            className="login__image"
            src={require("../../../assets/images/favorites_1.png")}
            alt="login avatar"
          />
          <label className="login__label">
            Correo
            <strong>*</strong>
          </label>
          <Form.Item
            name="email"
            rules={[{ type: "email", message: "El correo no es valido  " }]}
          >
            <InputCustom placeholder="example@tucorreo.com" />
          </Form.Item>
          <label className="login__label">
            Contraseña
            <strong>*</strong>
          </label>
          <Form.Item name="password">
            <Input.Password
              className="login__input"
              placeholder="********"
              iconRender={(visible) =>
                visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
              }
            />
          </Form.Item>
          <Form.Item shouldUpdate noStyle>
            {() => (
              <CustomButton
                type="primary"
                htmlType="submit"
                disabled={!isValid() || loadingAuth.auth}
                block
              >
                {loadingAuth.login ? <LoadingOutlined /> : "Ingresar"}
              </CustomButton>
            )}
          </Form.Item>
          <div className="login__footer">
            <div className="login__footer login__footer--row">
              <label>No tienes una cuenta?</label>
              <Button
                className="login__link"
                type="link"
                onClick={() => navigate("/signup")}
              >
                Registrarse
              </Button>
            </div>
            <Button
              className="login__link"
              type="link"
              onClick={() => navigate("/send-code")}
            >
              Olvidé mi contraseña
            </Button>
          </div>
        </Form>
      </div>
      <p>
        v{packageJSON.version} ({new Date().getFullYear()})
      </p>
    </div>
  );
};
