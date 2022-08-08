import React, { useEffect, useState } from "react";
import { Form, Button, Input, Select, message, InputNumber } from "antd";
import {
  EyeInvisibleOutlined,
  EyeTwoTone,
  LoadingOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { InputCustom } from "../../../components/atoms/InputCustom/InputCustom";
import { auth as AuthActions } from "../../../services/Auth/AuthActions";
import { CustomButton } from "../../../components/atoms/CustomButton/CustomButton";

const MAX_LENGTH_PHONE = 10;

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

  const validatorMinPhone = ({ getFieldValue }) => ({
    validator(rule, value) {
      if (
        !value ||
        getFieldValue("phone").toString().length === MAX_LENGTH_PHONE
      )
        return Promise.resolve();

      //No borrar el catch, evita que los errores de consola pongan lenta los selects
      return Promise.reject("El teléfono debe ser valido").catch();
    },
  });

  return (
    <div className="signup">
      <div className="login__header">
        <span onClick={() => navigate("/")}>Udlavite</span>
        <img src="logo.png" alt="logo" onClick={() => navigate("/")} />
      </div>
      {visibleInfo ? (
        <div className="signup__info">
          <Form onFinish={onFinishUser} form={form}>
            <h1 className="signup__title">Registro</h1>
            <h2 className="signup__description">Información personal</h2>
            <label className="signup__label">
              Nombres
              <strong>*</strong>
            </label>
            <Form.Item name="name" rules={[{ required: true, message: "" }]}>
              <InputCustom placeholder="Escribe tu(s) nombre(s)" />
            </Form.Item>
            <label className="signup__label">
              Apellidos
              <strong>*</strong>
            </label>
            <Form.Item
              name="lastname"
              rules={[{ required: true, message: "" }]}
            >
              <InputCustom placeholder="Escribe tu(s) apellidos(s)" />
            </Form.Item>
            <label className="signup__label">
              Celular
              <strong>*</strong>
            </label>
            <Form.Item
              name="phone"
              rules={[{ required: true, message: "" }, validatorMinPhone]}
            >
              <InputNumber
                type="tel"
                keyboardtype="number-pad"
                className="signup__input"
                maxLength={MAX_LENGTH_PHONE}
                placeholder="Escribe tu celular"
                controls={false}
              />
            </Form.Item>
            <label className="signup__label">
              Correo
              <strong>*</strong>
            </label>
            <Form.Item
              name="email"
              rules={[
                { required: true, message: "" },
                { type: "email", message: "El correo no es valido  " },
              ]}
            >
              <InputCustom placeholder="example@tucorreo.com" />
            </Form.Item>
            <label className="signup__label">
              Tipo de actividad
              <strong>*</strong>
            </label>
            <Form.Item
              name="categoryId"
              rules={[{ required: true, message: "" }]}
            >
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
            <label className="signup__label">
              Contraseña
              <strong>*</strong>
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
            <br />
            <Form.Item shouldUpdate noStyle>
              {() => (
                <CustomButton
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
                </CustomButton>
              )}
            </Form.Item>
            <div className="signup__footer signup__footer--row">
              <label>Tienes una cuenta?</label>
              <Button
                className="signup__link"
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
            <h1 className="signup__title">Registro</h1>
            <h2 className="signup__description">
              Información de la empresa (Opcional)
            </h2>
            <br />
            <label className="signup__label">Nombre de la empresa</label>
            <Form.Item name="businessName">
              <InputCustom placeholder="Escribe el nombre de tu empresa" />
            </Form.Item>
            <label className="signup__label">Nit</label>
            <Form.Item name="nit">
              <InputCustom
                maxLength={10}
                placeholder="Escribe el NIT"
              />
            </Form.Item>
            <br />
            <Form.Item shouldUpdate noStyle>
              {() => (
                <CustomButton type="primary" htmlType="submit" block>
                  {loading.signup && <LoadingOutlined />}
                  {!loading.signup && "Crear cuenta"}
                </CustomButton>
              )}
            </Form.Item>
            <br />
            <br />
            <div className="signup__footer">
              <Button
                className="signup__link"
                type="link"
                onClick={() => setVisibleInfo(true)}
              >
                {"< "}Atras
              </Button>
            </div>
          </Form>
        </div>
      )}
    </div>
  );
};
