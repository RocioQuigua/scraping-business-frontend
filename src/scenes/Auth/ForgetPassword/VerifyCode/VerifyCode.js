import { LoadingOutlined } from "@ant-design/icons";
import { Form, Button, message, InputNumber } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { auth as AuthActions } from "../../../../services/Auth/AuthActions";

export const VerifyCode = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const navigate = useNavigate();


  const { error, loading, success } = useSelector((state) => state.auth);

  useEffect(() => {
    if (success.verifyCode)
      navigate('/change-password')
  }, [success.verifyCode, navigate])

  useEffect(() => {
    if (!success.sendCode) 
      navigate('/send-code')

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

  return (
    <div className="verify-code">
      <div className="verify-code__info">
        <Form onFinish={onFinish} form={form}>
          <div className="verify-code__container-title">
            <h1>Verificar codigo</h1>
            <p>Escribe el codigo que hemos enviado a tu correo.</p>
          </div>
          <Form.Item name="code">
            <InputNumber
              className="verify-code__inputNumber"
              placeholder="0 0 0 0 0"
              type="tel"
              keyboardtype="number-pad"
              maxLength={5}
              controls={false}
            />
          </Form.Item>
          <Form.Item shouldUpdate noStyle>
            {() => (
              <Button
                className="verify-code__button"
                type="primary"
                htmlType="submit"
                disabled={!form.getFieldValue("code") || loading.verifyCode}
                block
              >
                {loading.verifyCode && <LoadingOutlined />}
                {!loading.verifyCode && "Verificar codigo"}
              </Button>
            )}
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
