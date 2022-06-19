import React, { useEffect, useState } from "react";
import { Form, Button, Input, Select, message } from "antd";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LoadingOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { InputCustom } from "../../../components/atoms/InputCustom/InputCustom";
import { auth as AuthActions } from "../../../services/Auth/AuthActions";

export const Signup = () => {
  const [values, setValues] = useState({});

  const { categories } = useSelector((state) => state.utils);
  const { loading, error, success } = useSelector((state) => state.auth);
  const [visibleInfo, setVisibleInfo] = useState(true);

  const [form] = Form.useForm();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (error.signup) {
      message.error(error.signup.detail);
      dispatch(AuthActions.setError("signup", undefined));
    }
  }, [error, dispatch]);

  useEffect(() => {
    if (success.signup) {
      message.success("Se ha creado exitosamente tu cuenta, bienvenido!");
      dispatch(AuthActions.setSuccess("signup", undefined));
    }
  }, [success, dispatch]);

  const onFinishUser = (values) => {
    setValues(values);
    setVisibleInfo(false);
  };

  const onFinishBusiness = (fields) => {
    dispatch(AuthActions.signup({ ...values, ...fields }));
  };

  return (
    <div className="signup">
      {visibleInfo ? (
        <div className="signup__info">
          <Form onFinish={onFinishUser} form={form}>
            <h1 className="signup__titlep">Registro</h1>
            <h2 className="signup__titles">Información personal</h2>
            <label className="signup__title">
              Nombres
              <strong className="signup__title signup__title--s">*</strong>
            </label>
            <Form.Item name="name" rules={[{ required: true, message: "" }]}>
              <InputCustom />
            </Form.Item>
            <label className="signup__title">
              Apellidos
              <strong className="signup__title signup__title--s">*</strong>
            </label>
            <Form.Item
              name="lastname"
              rules={[{ required: true, message: "" }]}
            >
              <InputCustom />
            </Form.Item>
            <label className="signup__title">
              Celular
              <strong className="signup__title signup__title--s">*</strong>
            </label>
            <Form.Item name="phone" rules={[{ required: true, message: "" }]}>
              <Input className="signup__input" maxLength={10} />
            </Form.Item>
            <label className="signup__title">
              Correo
              <strong className="signup__title signup__title--s">*</strong>
            </label>
            <Form.Item name="email" rules={[{ required: true, message: "" }]}>
              <InputCustom placeholder="example@tucorreo.com" />
            </Form.Item>
            <label className="signup__title">
              Tipo de actividad
              <strong className="signup__title signup__title--s">*</strong>
            </label>
            <Form.Item name="categoryId" rules={[{ required: true, message: "" }]}>
              <Select
                className="signup__options"
                placeholder="Selecciona una opción"
              >
                {categories?.map((busines, index) => (
                  <Select.Option key={index} value={busines.id}>
                    {busines.name}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <label className="signup__title">
              Contraseña
              <strong className="signup__title signup__title--s">*</strong>
            </label>
            <Form.Item
              name="password"
              rules={[{ required: true, message: "" }]}
            >
              <Input.Password
                className="signup__input"
                placeholder="********"
                iconRender={(visible) =>
                  visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />
                }
              />
            </Form.Item>
            <Form.Item shouldUpdate noStyle>
              {() => (
                <Button
                  className="signup__button"
                  type="primary"
                  htmlType="submit"
                  disabled={
                    !form.getFieldValue("name") ||
                    !form.getFieldValue("lastname") ||
                    !form.getFieldValue("phone") ||
                    !form.getFieldValue("email") ||
                    !form.getFieldValue("password") || 
                    !form.getFieldValue("categoryId") ||
                    form.getFieldsError().filter(({ errors }) => errors.length)
                      .length > 0
                  }
                  block
                >
                  Siguiente
                </Button>
              )}
            </Form.Item>
            <div className="signup__footer">
              <label>Tienes una cuenta?</label>
              <Button
                className="signup__footer signup__footer--button"
                type="link"
                onClick={() => navigate("/login")}
              >
                Ingresar
              </Button>
            </div>
          </Form>
        </div>
      ) : (
        <div className="signup__info">
          <Form onFinish={onFinishBusiness} form={form}>
            <h1 className="signup__titlep signup__titlep-b">Registro</h1>
            <h2 className="signup__titles signup__titles-b">
              Información de la empresa (Opcional)
            </h2>
            <label className="signup__title">Nombre de la empresa</label>
            <Form.Item name="businessName">
              <InputCustom className="signu__input" />
            </Form.Item>
            <label className="signup__title">Nit</label>
            <Form.Item name="nit">
              <Input className="signup__input" maxLength={10} />
            </Form.Item>
            <Form.Item shouldUpdate noStyle>
              {() => (
                <Button
                  className="signup__button signup__button--created"
                  type="primary"
                  htmlType="submit"
                  block
                >
                  {loading.signup && <LoadingOutlined />}
                  {!loading.signup && "Crear cuenta"}
                </Button>
              )}
            </Form.Item>
            <Button
              className="signup__footer signup__footer--back"
              type="link"
              onClick={() => setVisibleInfo(true)}
            >
              Atras
            </Button>
          </Form>
        </div>
      )}
    </div>
  );
};
