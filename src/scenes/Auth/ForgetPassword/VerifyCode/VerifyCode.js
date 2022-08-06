import { LoadingOutlined } from "@ant-design/icons";
import { Form, message, InputNumber, Button } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { auth as AuthActions } from "../../../../services/Auth/AuthActions";
import { CustomButton } from "../../../../components/atoms/CustomButton/CustomButton";

const MAX_LENGTH = 5;

export const VerifyCode = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { error, loading, success } = useSelector((state) => state.auth);

  useEffect(() => {
    if (success.verifyCode) navigate("/change-password");
  }, [success.verifyCode, navigate]);

  useEffect(() => {
    if (!success.sendCode) navigate("/send-code");

    return () => {
      dispatch(AuthActions.setSuccess("sendCode", undefined));
    };
  }, [dispatch, success.sendCode, navigate]);

  useEffect(() => {
    if (error.verifyCode) {
      message.error("El código no coincide con el que se envio.");
      dispatch(AuthActions.setError("verifyCode", undefined));
    }
  }, [error.verifyCode, dispatch]);

  const onFinish = (values) => {
    dispatch(AuthActions.verifyCode(values.code));
  };

  const isValid = () => {
    let { code } = form.getFieldsValue();
    code = code + "";

    return code && code.length === MAX_LENGTH;
  };

  return (
    <div className="verify-code">
      <div className="login__header">
        <span onClick={() => navigate("/")}>Udlavite</span>
        <img src="logo.png" alt="logo" onClick={() => navigate("/")}/>
      </div>
      <div className="verify-code__info">
        <Form onFinish={onFinish} form={form}>
          <img
            className="send-code__image"
            src={require("../../../../assets/images/password.jpg")}
            alt="login avatar"
          />
          <div className="verify-code__container-title">
            <h1 className="verify-code__title">Verificar codigo</h1>
            <p>Escribe el codigo que hemos enviado a tu correo.</p>
          </div>
          <Form.Item name="code">
            <InputNumber
              className="verify-code__input-number"
              placeholder="0 0 0 0 0"
              type="tel"
              keyboardtype="number-pad"
              maxLength={MAX_LENGTH}
              controls={false}
            />
          </Form.Item>
          <Form.Item shouldUpdate noStyle>
            {() => (
              <CustomButton
                type="primary"
                htmlType="submit"
                disabled={!isValid() || loading.verifyCode}
                block
              >
                {loading.verifyCode && <LoadingOutlined />}
                {!loading.verifyCode && "Verificar codigo"}
              </CustomButton>
            )}
          </Form.Item>
        </Form>
        <div className="send-code__footer">
          <div className="send-code__footer send-code__footer--row">
            <label>No llegó tu código?</label>
            <Button
              className="send-code__link"
              type="link"
              onClick={() => navigate("/")}
            >
              Volver a enviar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
