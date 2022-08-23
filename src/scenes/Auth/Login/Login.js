import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LoadingOutlined
} from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

import { CustomButton } from "../../../components/atoms/CustomButton/CustomButton";
import { InputCustom } from "../../../components/atoms/InputCustom/InputCustom";
import { auth as AuthActions } from "../../../services/Auth/AuthActions";

import packageJSON from "../../../../package.json";

export const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);

  const { loading, error } = useSelector((state) => state.auth);

  const [form] = Form.useForm();

  useEffect(() => {
    if (error.login === "USER_NOT_EXIST") {
      message.error("El correo y/o contraseña son incorrectos");
      dispatch(AuthActions.setError("login", undefined));
    }

    if (error.login === "USER_UNVERIFIED") {
      message.warn("El usuario tiene la cuenta sin verificar, revisa tu correo electrónico, hemos enviado un correo electrónico de verificación.", 20 );
      dispatch(AuthActions.setError("login", undefined));
    }

    if (error.login === "USER_INACTIVE") {
      message.error("El usuario tiene la cuenta inactiva");
      dispatch(AuthActions.setError("login", undefined));
    }


    dispatch(AuthActions.setError("login", undefined));

  }, [error.login, dispatch]);

  const onFinish = (values) => {
    const code = queryParams.get('code');
    if (code)
      values.code = code;

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
          <h1 className="login__title">Iniciar sesión</h1>
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
                disabled={!isValid() || loading.auth}
                block
              >
                {loading.login ? <LoadingOutlined /> : "Ingresar"}
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
