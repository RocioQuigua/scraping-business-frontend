import { LoadingOutlined } from "@ant-design/icons";
import { Form, Button, message } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { InputCustom } from "../../../../components/atoms/InputCustom/InputCustom";
import { auth as AuthActions } from "../../../../services/Auth/AuthActions";
import { CustomButton } from "../../../../components/atoms/CustomButton/CustomButton";

export const SendCode = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { error, success, loading } = useSelector((state) => state.auth);

  useEffect(() => {
    if (success.sendCode) {
      navigate("/verify-code");
    }
  }, [success.sendCode, dispatch, navigate]);

  useEffect(() => {
    if (error.sendCode) {
      message.error(
        "El correo electrónico no está registrado en nuestro sistema."
      );
      dispatch(AuthActions.setError("sendCode", undefined));
    }
  }, [error.sendCode, dispatch]);

  const onFinish = (values) => {
    dispatch(AuthActions.sendCode(values.email));
  };

  return (
    <div className="send-code">
      <div className="login__header">
        <span onClick={() => navigate("/")}>Udlavite</span>
        <img src="logo.png" alt="logo" onClick={() => navigate("/")}/>
      </div>
      <div className="send-code__info">
        <Form onFinish={onFinish} form={form}>
          <img
            className="send-code__image"
            src={require("../../../../assets/images/password.jpg")}
            alt="login avatar"
          />
          <h1 className="send-code__title">Olvidé mi contraseña</h1>
          <label className="send-code__label">
            Correo
            <strong>*</strong>
          </label>
          <Form.Item
            name="email"
            rules={[{ type: "email", message: "El correo no es valido  " }]}
          >
            <InputCustom placeholder="example@tucorreo.com" />
          </Form.Item>
          <Form.Item shouldUpdate noStyle>
            {() => (
              <CustomButton
                type="primary"
                htmlType="submit"
                disabled={!form.getFieldValue("email") && !loading.sendCode}
                block
              >
                {loading.sendCode && <LoadingOutlined />}
                {!loading.sendCode && "Enviar código"}
              </CustomButton>
            )}
          </Form.Item>
        </Form>
        <div className="send-code__footer">
          <div className="send-code__footer send-code__footer--row">
            <label>Recuerdas tu contraseña?</label>
            <Button
              className="send-code__link"
              type="link"
              onClick={() => navigate("/login")}
            >
              Ingresar
            </Button>
          </div>
        </div>
      </div>
      <span />
    </div>
  );
};
