import { LoadingOutlined } from "@ant-design/icons";
import { Form, Button, message } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { InputCustom } from "../../../../components/atoms/InputCustom/InputCustom";
import { auth as AuthActions } from "../../../../services/Auth/AuthActions";

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
      message.success(
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
      <div className="send-code__info">
        <Form onFinish={onFinish} form={form}>
          <h1>Olvidé mi contraseña</h1>
          <label>
            Correo
            <strong className="send-code__info send-code__info--required">
              *
            </strong>
          </label>
          <Form.Item name="email">
            <InputCustom
              className="send-code__input"
              placeholder="example@tucorreo.com"
            />
          </Form.Item>
          <Form.Item shouldUpdate noStyle>
            {() => (
              <Button
                className="send-code__button"
                type="primary"
                htmlType="submit"
                disabled={!form.getFieldValue("email") && !loading.sendCode}
                block
              >
                {loading.sendCode && <LoadingOutlined />}
                {!loading.sendCode && "Enviar código"}
              </Button>
            )}
          </Form.Item>
        </Form>
        <div className="send-code__footer">
          <div className="send-code__group">
            <label>Recuerdas tu contraseña?</label>
            <Button type="link" onClick={() => navigate("/login")}>
              Ingresar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
