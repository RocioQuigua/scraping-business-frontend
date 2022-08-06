import { LoadingOutlined } from "@ant-design/icons";
import { Form, Input, message } from "antd";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { auth as AuthActions } from "../../../../services/Auth/AuthActions";
import { CustomButton } from "../../../../components/atoms/CustomButton/CustomButton";

export const ChangePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form] = Form.useForm();
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
    <div className="change-password">
      <div className="login__header">
        <span onClick={() => navigate("/")}>Udlavite</span>
        <img src="logo.png" alt="logo" onClick={() => navigate("/")} />
      </div>
      <div className="change-password__info">
        <Form onFinish={onFinish} form={form}>
          <div className="change-password__container-title">
            <h1 className="change-password__title">Cambiar contraseña</h1>
            <p>Escribe tu nueva contraseña</p>
          </div>
          <label className="change-password__label">Nueva contraseña</label>
          <Form.Item name="password">
            <Input.Password
              className="change-password__input"
              placeholder="******"
            />
          </Form.Item>
          <label className="change-password__label">Confirmar contraseña</label>
          <Form.Item name="confirmPassword">
            <Input.Password
              className="change-password__input"
              placeholder="******"
            />
          </Form.Item>
          <Form.Item shouldUpdate noStyle>
            {() => (
              <CustomButton
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
              </CustomButton>
            )}
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
