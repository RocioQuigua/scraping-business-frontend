import { LoadingOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { auth as AuthActions } from "../../../../services/Auth/AuthActions";

export const ChangePassword = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const { loading, success } = useSelector((state) => state.auth);

  useEffect(() => {
    if (success.changePassword) {
      navigate("/");
      message.success("Cambio de contraseña exitoso!");
      dispatch(AuthActions.setSuccess("changePassword", undefined));
    }
  }, [success.changePassword, dispatch, navigate]);

  useEffect(() => {
    if (!success.verifyCode) navigate("/verify-code");

    return () => {
      dispatch(AuthActions.setSuccess("verifyCode", undefined));
    };
  }, [dispatch, success.verifyCode, navigate]);

  const onFinish = (values) => {
    dispatch(AuthActions.changePassword(values.password));
  };

  return (
    <div className="verify-code">
      <div className="verify-code__info">
        <Form onFinish={onFinish} form={form}>
          <div className="verify-code__container-title">
            <h1>Cambiar contraseña</h1>
            <p>Escribe tu nueva contraseña</p>
          </div>
          <label>Nueva contraseña</label>
          <Form.Item name="password">
            <Input.Password className="send-code__input" placeholder="******" />
          </Form.Item>
          <label>Confirmar contraseña</label>
          <Form.Item name="confirmPassword">
            <Input.Password className="send-code__input" placeholder="******" />
          </Form.Item>
          <Form.Item shouldUpdate noStyle>
            {() => (
              <Button
                className="verify-code__button"
                type="primary"
                htmlType="submit"
                disabled={
                  !form.getFieldValue("password") ||
                  form.getFieldValue("password") !==
                    form.getFieldValue("confirmPassword") ||
                  loading.changePassword
                }
                block
              >
                {loading.changePassword && <LoadingOutlined />}
                {!loading.changePassword && "Cambiar contraseña"}
              </Button>
            )}
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
